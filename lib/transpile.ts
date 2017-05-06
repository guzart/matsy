import * as path from 'path';
import * as postcss from 'postcss';
import * as sass from 'postcss-scss';
import * as through from 'through2';
import * as ts from 'typescript';

import buildImportStatements from './buildImportStatements';
import debug from './debug';
import transpileNode from './transpileNode';

interface IItemRef {
  library: string;
  name: string;
}

interface IImportMap {
  material: IItemRef[];
  polished: string[];
  react: boolean;
}

interface IOptions {
  imp: IImportMap;
  name: string;
  out: ts.Statement[];
  root: postcss.Root;
  vars: IItemRef[];
}

function execute(name: string, root: postcss.Root) {
  // shared between nodes
  const out = [];
  const imp = { material: [], polished: [], react: false };
  const vars = [];

  root.each(transpileNode({ imp, name, out, root, vars }));

  const code = '';
  const source = ts.createSourceFile('matsy.ts', code, ts.ScriptTarget.ES2015, true, ts.ScriptKind.TS);
  const statements = buildImportStatements(imp).concat(source.statements.concat(out));
  const result = ts.updateSourceFileNode(source, statements);
  const printer = ts.createPrinter({});
  return printer.printFile(result);
}

function transpile(name: string, input: string) {
  let output: string;
  const processor = postcss([(root: postcss.Root) => { output = execute(name, root); }]);
  // tslint:disable-next-line
  processor.process(input, { syntax: sass }).css; // evaluate lazy result
  return output;
}

const transpilePlugin = () =>
  through.obj(function(chunk, enc, cb) {
    const input = chunk.contents.toString(enc);
    const libraryName = path.dirname(chunk.path).match(/\/([^\/]+)$/)[1];
    const output = transpile(libraryName, input);
    const filename = path.basename(chunk.path).replace(/^_|mdc-|\.scss/g, '');
    chunk.path = path.join(path.dirname(chunk.path), `${filename}.ts`);
    chunk.contents = Buffer.from(output);
    this.push(chunk);

    cb();
  });

export default transpilePlugin;
export { IImportMap, IOptions };
