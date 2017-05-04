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

interface ImportMap {
  polished: string[];
}

export interface IOptions {
  imp: ImportMap;
  name: string;
  out: ts.Statement[];
  root: postcss.Root;
}

function isPolishedFunction(value: string) {
  return /^rgb/.test(value);
}

function parseValue(value: string) {
  if (/^\s*\d+\s*$/.test(value)) {
    return parseInt(value, 10);
  } else if (/^\s*\d*\.\d+\s*/.test(value)) {
    return parseFloat(`0${value}`);
  }

  return value.replace(/^\s*\"?|\"?\s*$/g, '');
}

function extractArgs(value: string) {
  return value
    .replace(/^.+\(|\).*$/, '')
    .split(',')
    .map((v) => v.replace(/^\s|\s$/, ''))
    .map(parseValue);
}

function handlePolishedFunction(options: IOptions, node: postcss.Declaration) {
  debug('Handle', node.prop, ' as polished function');
  const funcName = node.value.replace(/\(.+$/, '');
  const args = extractArgs(node.value);
  options.imp.polished.push(funcName);

  return ts.createCall(
    ts.createIdentifier(funcName),
    [],
    args.map(ts.createLiteral),
  );
}

function handleMapValue(options: IOptions, node: postcss.Declaration) {
  debug('Handle', node.prop, ' as map');

  // const mapText = 'const map = ' + node.value.replace(/^\s*\(/, '{').replace(/\)\s*$/, '}');
  // const src = ts.createSourceFile('map-value.ts', mapText, ts.ScriptTarget.ES2015, true, ts.ScriptKind.JS);
  // const statement = src.statements[0] as ts.VariableStatement;
  // const objectExpr = statement.declarationList.declarations[0].initializer as ts.ObjectLiteralExpression;
  // objectExpr.flags = ts.NodeFlags.Synthesized;
  // objectExpr.pos = -1;
  // objectExpr.end = -1;
  // objectExpr.parent = undefined;

  const groups = node.value.replace(/^\s*\(?\s*|\n|\s*\)\s*$/mg, '').split(',').map((g) => g.split(':'));
  debug(node.value.replace(/^\s*\(?\s*|\n|\s*\)\s*$/mg, ''));
  const objectExpr = ts.createObjectLiteral(
    groups.map(([a, b]) => {
      const name = ts.createIdentifier(a);
      return ts.createPropertyAssignment(name, ts.createLiteral(parseValue(b)));
    }),
    true,
  );

  return objectExpr;
}

function isMap(value: string) {
  // starts with '(', has spaces, and then groups of something-colon-something-comma
  return /^\([\s\S]*([\s\S]+\:[\s\S+],?)+[\s\S]*\)$/.test(value);
}

function handleVariableValue(options: IOptions, node: postcss.Declaration) {
  const value = node.value;
  if (isPolishedFunction(value)) {
    return handlePolishedFunction(options, node);
  } else if (isMap(value)) {
    return handleMapValue(options, node);
  }

  debug('Cannot handle', node.prop, value, 'as variable');
  // return ts.createLiteral(value);
  return null;
}

function handleVariable(options: IOptions, node: postcss.Declaration) {
  const name = camelize(node.prop.replace(/\$mdc-/, '').replace(/-/g, '_'), true);
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

function handleNode(options: IOptions) {
  return (node: postcss.Node) => {
    switch (node.type) {
      case 'comment':
        handleComment(options, node as postcss.Comment);
        break;

      case 'decl':
        handleDeclaration(options, node as postcss.Declaration);
        break;

      default:
        debug(`Cannot handle postcss.${node.type}`, 'type');
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

  return out;
}

function compile(root: postcss.Root) {
  const imp = { polished: [] };
  const out = [];
  root.each(handleNode({ imp, name: '', out, root }));

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

function process(input) {
  let output: string;
  const processor = postcss([(root: postcss.Root) => { output = compile(root); }]);
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

const buildElevation = through.obj(function(chunk, enc, cb) {
  const input = chunk.contents.toString(enc);
  format(process(input))
    .then((output) => {
      const name = path.basename(chunk.path).replace(/^_|mdc-|\.scss/g, '');
      chunk.path = path.join(path.dirname(chunk.path), `${name}.ts`);
      chunk.contents = Buffer.from(output);
      this.push(chunk);

      cb();
    });
});

export default buildElevation;
