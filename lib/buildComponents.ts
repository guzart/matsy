import * as babel from 'babel-core';
import * as debugFactory from 'debug';
import { camelize } from 'inflection';
import * as path from 'path';
import * as postcss from 'postcss';
import * as sass from 'postcss-scss';
import * as prettier from 'prettier';
import * as through from 'through2';

import handleNode from './handleNode';

const debug = debugFactory('matsy');
const traverse = babel.traverse;

interface IBabelPluginArg {
  types: typeof babel.types;
}

function babelPlugin({ types: t }: IBabelPluginArg) {
  // 'File', 'options', 'buildExternalHelpers', 'template', 'resolvePlugin', 'resolvePreset',
  // 'version', 'util', 'messages', 'traverse', 'OptionManager', 'Pipeline',
  // 'analyse', 'transform', 'transformFromAst', 'Plugin', 'transformFile', 'transformFileSync'
  return {
    inherits: require('babel-plugin-syntax-flow'),
    visitor: {
      Program(path, state) {
        const program = path.node as babel.types.Program;
        const root = state.opts as postcss.Root;
        const opts = { isRoot: true, name: '', program, root, t };
        root.each(handleNode(opts));

        program.body.push(
        );
      },
    },
  };
}

const prettierOpts = {
  singleQuote: true,
  trailingComma: 'es5',
};

const buildComponents = through.obj(function(chunk, enc, cb) {
  let output;
  function plugin(root: postcss.Root, opts: any) {
    output = babel.transform(`
      import styled from 'styled-components';
    `, { plugins: [[babelPlugin, root]] });
  }

  const input = chunk.contents.toString(enc);
  const root = postcss([plugin]).process(input, { syntax: sass });
  // tslint:disable-next-line
  root.css; // evaluate lazy result

  const name = path.basename(chunk.path).replace(/mdc-|\.scss/g, '');
  const { code } = babel.transformFromAst(output.ast);
  chunk.path = path.join(path.dirname(chunk.path), `${name}.ts`);
  chunk.contents = Buffer.from(prettier.format(code, prettierOpts));
  this.push(chunk);

  cb();
});

export default buildComponents;
