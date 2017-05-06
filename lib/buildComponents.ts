import * as debugFactory from 'debug';
import { camelize } from 'inflection';
import * as path from 'path';
import * as postcss from 'postcss';
import * as sass from 'postcss-scss';
import * as through from 'through2';
import * as ts from 'typescript';

import handleNode from './handleNode';

const debug = debugFactory('matsy');

function compile(root: postcss.Root) {
  const out = [];
  root.each(handleNode({ name: '', out, root }));

  const code = `
    import { ComponentClass, StatelessComponent } from 'react';
    import styled from 'styled-components';

    type Component<P> = ComponentClass<P> | StatelessComponent<P>;
  `;

  const source = ts.createSourceFile('matsy.ts', code, ts.ScriptTarget.ES2015, true, ts.ScriptKind.TS);
  const statements = source.statements.concat(out);
  const result = ts.updateSourceFileNode(source, statements);
  const printer = ts.createPrinter({});
  return printer.printFile(result);
}

function process(input: string) {
  let output: string;
  const processor = postcss([(root: postcss.Root) => { output = compile(root); }]);
  // tslint:disable-next-line
  processor.process(input, { syntax: sass }).css; // evaluate lazy result
  return output;
}

function format(input: string) {
  // TODO: tsfmt doesn't seem to provide much value
  return Promise.resolve(
    input
      .replace(/\\n/g, '\n')
      .replace(/\) `/g, ')`')
      .replace(/^(?=type)/mg, '\n')
      .replace(/^(?=export const)/mg, '\n'),
  );
}

const buildComponents = () => {
  through.obj(function(chunk, enc, cb) {
    const input = chunk.contents.toString(enc);
    format(process(input))
      .then((output) => {
        const name = path.basename(chunk.path).replace(/mdc-|\.scss/g, '');
        chunk.path = path.join(path.dirname(chunk.path), `${name}.ts`);
        chunk.contents = Buffer.from(output);
        this.push(chunk);

        cb();
      });
  });
};

export default buildComponents;
