import * as debugFactory from 'debug';
import { camelize } from 'inflection';
import { uniq } from 'lodash';
import * as path from 'path';
import * as postcss from 'postcss';
import * as sass from 'postcss-scss';
import * as through from 'through2';
import * as ts from 'typescript';

import handleComment from './handleComment';

const debug = debugFactory('matsy');

interface ItemRef {
  library: string;
  name: string;
}

interface ImportMap {
  material: ItemRef[];
  polished: string[];
}

export interface IOptions {
  imp: ImportMap;
  name: string;
  out: ts.Statement[];
  root: postcss.Root;
  vars: ItemRef[];
}

function getVariableName(value: string) {
  return camelize(value.replace(/\$mdc-/, '').replace(/-/g, '_'), true);
}

function getLibraryName(options: IOptions, value: string) {
  const name = value.replace('$mdc-', '');
  const imp = options.imp.material.find((i) => name.indexOf(i.library) === 0);
  return imp.library;
}

function getLocalLibName(name: string) {
  return camelize(`${name}Lib`, true);
}

function isPolishedFunction(value: string) {
  return /^rgb/.test(value);
}

function cleanValue(value: string) {
  return value.replace(/\s*!default\s*$/, '').replace(/^\s*\"?|\"?\s*$/g, '');
}

function parseValue(value: string) {
  const clean = cleanValue(value);
  if (/^\s*\d+\s*$/.test(clean)) {
    return parseInt(clean, 10);
  } else if (/^\s*\d*\.\d+\s*/.test(clean)) {
    return parseFloat(`0${clean}`);
  }

  return clean;
}

function extractArgs(value: string) {
  return value
    .replace(/^.+\(|\).*$/, '')
    .split(',')
    .map((v) => v.replace(/^\s|\s$/, ''))
    .map(parseValue);
}

function handlePolishedFunction(options: IOptions, node: postcss.Declaration) {
  debug(`Handle ${node.prop} as polished function`);
  const funcName = node.value.replace(/\(.+$/, '');
  const args = extractArgs(node.value);
  options.imp.polished.push(funcName);

  return ts.createCall(
    ts.createIdentifier(funcName),
    [],
    args.map(ts.createLiteral),
  );
}

function clone(node: any) {
  switch (node.kind) {
    case ts.SyntaxKind.PropertyAssignment:
      const n = node as ts.PropertyAssignment;
      return ts.createPropertyAssignment(clone(n.name), clone(n.initializer));

    case ts.SyntaxKind.StringLiteral:
      return ts.createLiteral(node.text);

    case ts.SyntaxKind.FirstLiteralToken:
      return ts.createIdentifier(node.text);
  }

  debug(ts.SyntaxKind[node.kind]);
  return node;
}

function handleMapValue(options: IOptions, node: postcss.Declaration) {
  debug(`Handle ${node.prop} as map`);

  const mapText = 'const map = ' + node.value.replace(/^\s*\(/, '{').replace(/\)\s*$/, '}');
  const src = ts.createSourceFile('map-value.ts', mapText, ts.ScriptTarget.ES2015, true, ts.ScriptKind.JS);
  const varDecl = (src.statements[0] as any).declarationList.declarations[0] as ts.VariableDeclaration;
  const expr = varDecl.initializer as ts.ObjectLiteralExpression;
  return ts.createObjectLiteral(expr.properties.map(clone), true);
}

function isMap(value: string) {
  // starts with '(', has spaces, and then groups of something-colon-something-comma
  return /^\([\s\S]*([\s\S]+\:[\s\S+],?)+[\s\S]*\)$/.test(value);
}

function isLiteral(value: string) {
  return !/\$/.test(value);
}

function handleLiteral(options: IOptions, node: postcss.Declaration) {
  debug(`Handle ${node.prop} as literal`);
  return ts.createLiteral(parseValue(node.value));
}

function isVariableReference(value) {
  return /\$/.test(value);
}

function isLocalVariable(localName, variableName) {
  let localValue = localName[0];
  let varValue = variableName[0];
  if (localValue !== varValue) {
    return false;
  }

  let localIndex = 1;
  let varIndex = 1;
  while (localValue === varValue && localIndex < localName.length && varIndex < variableName.length) {
    localValue = localName[localIndex++];
    varValue = varValue[varIndex++];
  }

  return localIndex > 3;
}

function handleVariableReference(options: IOptions, node: postcss.Declaration) {
  debug(`Handle ${node.prop} as variable reference`);
  const libName = getLibraryName(options, node.value);
  const varName = getVariableName(cleanValue(node.value));

  return ts.createPropertyAccess(ts.createIdentifier(libName), ts.createIdentifier(varName));
  // TODO: Check if this is a local variable or a reference to another library variable.
  // We should parse this expression.... but how?
}

function handleVariableValue(options: IOptions, node: postcss.Declaration) {
  const value = node.value;
  if (isPolishedFunction(value)) {
    return handlePolishedFunction(options, node);
  } else if (isMap(value)) {
    return handleMapValue(options, node);
  } else if (isLiteral(value)) {
    return handleLiteral(options, node);
  } else if (isVariableReference(value)) {
    return handleVariableReference(options, node);
  }

  debug('Cannot handle', node.prop, value, 'as variable');
  // return ts.createLiteral(value);
  return null;
}

function handleVariable(options: IOptions, node: postcss.Declaration) {
  options.vars.push({ library: options.name, name: node.prop });

  const name = getVariableName(node.prop);
  const varValue = handleVariableValue(options, node);
  if (!varValue) {
    debug('Cannot handle variable value', node.prop, node.value);
    return;
  }

  const varDecl = ts.createVariableDeclaration(ts.createIdentifier(name), undefined, varValue);

  const statement = ts.createVariableStatement(
    [ts.createToken(ts.SyntaxKind.ExportKeyword)],
    ts.createVariableDeclarationList([varDecl], ts.NodeFlags.Const),
  );

  options.out.push(statement);
}

function handleDeclaration(options: IOptions, node: postcss.Declaration) {
  const prop = node.prop;
  if (/^\$(\w+\-)+/.test(prop)) {
    handleVariable(options, node);
  } else {
    debug('Skipping declaration:', prop);
  }
}

function handleAtRule(options: IOptions, node: postcss.AtRule) {
  if (node.name === 'import') {
    const params = node.params.replace(/['"]/g, '');
    if (/@material\//.test(params)) {
      // @material import
      const library = params.replace(/@material\/([^\/]+)\/.+/, '$1');
      const name = params.replace(/.*\/(\w+)$/, '$1');
      options.imp.material.push({ library, name });
      debug(`Handle ${node.name} as ${library}/${name}`);
      return;
    } else if (/^\.\//.test(cleanValue(params))) {
      // local import
      const name = params.replace(/.*\/(\w+)$/, '$1');
      debug(`Handle ${node.name} as local /${name}`);
      options.imp.material.push({ library: options.name, name });
      return;
    }
  }

  debug('Cannot handle atRule', node.name, node.params);
}

function handleNode(options: IOptions) {
  return (node: postcss.Node) => {
    switch (node.type) {
      case 'comment':
        handleComment(options, node as postcss.Comment);
        break;

      case 'decl':
        handleDeclaration(options, node as postcss.Declaration);
        break;

      case 'atrule':
        handleAtRule(options, node as postcss.AtRule);
        break;

      default:
        debug(`Cannot handle postcss.${node.type}`);
        debug(node);
        break;
    }
  };
}

function importStatements(imp: ImportMap) {
  const out = [];
  if (imp.polished.length > 0) {
    out.push(
      ts.createImportDeclaration(
        [],
        [],
        ts.createImportClause(
          undefined,
          ts.createNamedImports(
            uniq(imp.polished)
              .map((name) => ts.createImportSpecifier(undefined, ts.createIdentifier(name))),
          ),
        ),
        ts.createLiteral('polished'),
      ),
    );
  }

  if (imp.material.length > 0) {
    imp.material.forEach((mlib) =>
      out.push(
        ts.createImportDeclaration(
          [],
          [],
          ts.createImportClause(
            undefined,
            ts.createNamespaceImport(ts.createIdentifier(getLocalLibName(mlib.library))),
          ),
          ts.createLiteral(`../matsy-${mlib.library}/${mlib.name}`),
        ),
      ),
    );
  }

  return out;
}

function compile(name, root: postcss.Root) {
  const imp = { material: [], polished: [] };
  const out = [];
  root.each(handleNode({ imp, name, out, root, vars: [] }));

  // const code = `
  //   import { ComponentClass, StatelessComponent } from 'react';
  //   import styled from 'styled-components';
  //   type Component<P> = ComponentClass<P> | StatelessComponent<P>;
  // `;
  const code = '';

  const source = ts.createSourceFile('matsy.ts', code, ts.ScriptTarget.ES2015, true, ts.ScriptKind.TS);
  const statements = importStatements(imp).concat(source.statements, out);
  const result = ts.updateSourceFileNode(source, statements);
  const printer = ts.createPrinter({});
  return printer.printFile(result);
}

function process(libName, input) {
  let output: string;
  const processor = postcss([(root: postcss.Root) => { output = compile(libName, root); }]);
  // tslint:disable-next-line
  processor.process(input, { syntax: sass }).css; // evaluate lazy result
  return output;
}

function format(input) {
  return Promise.resolve(
    input
      .replace(/^(?=export const)/mg, '\n'),
  );
}

const buildElevation = () =>
  through.obj(function(chunk, enc, cb) {
    const input = chunk.contents.toString(enc);
    const libName = path.dirname(chunk.path).match(/\/([^\/]+)$/)[1];
    format(process(libName, input))
      .then((output) => {
        const name = path.basename(chunk.path).replace(/^_|mdc-|\.scss/g, '');
        chunk.path = path.join(path.dirname(chunk.path), `${name}.ts`);
        chunk.contents = Buffer.from(output);
        this.push(chunk);

        cb();
      });
  });

export default buildElevation;
