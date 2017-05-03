import * as babel from 'babel-core';
import * as debugFactory from 'debug';
import { titleize } from 'lodash-inflection';
import * as path from 'path';
import * as prettier from 'prettier';
import * as postcss from 'postcss';
import * as sass from 'postcss-scss';
import * as through from 'through2';

const debug = debugFactory('matsy');
const traverse = babel.traverse;

interface Options {
  isRoot: boolean;
  name: string;
  program: babel.types.Program;
  root: postcss.Root;
  t: typeof babel.types;
  template: typeof babel.template;
}

function handleChildRule(options: Options, rule: postcss.Rule) {
  const { program, t, template } = options;
  const rootComponent = template(`
    const NAME = (Component: React.ReactType) => STYLE;
  `, { plugins: ['flow'] });

  const compCSS = [''];
  rule.nodes.forEach(node => {
    if (node.type !== 'decl') {
      const nodeOpts = Object.assign({}, options, { isRoot: false });
      handleNode(nodeOpts)(node);
      return;
    }

    const decl = <postcss.Declaration>node;
    compCSS.push(`${decl.prop}: ${decl.value};`);
  });

  const templateExpr = t.taggedTemplateExpression(
    t.callExpression(
      t.identifier('styled'),
      [t.identifier('Component')]
    ),
    t.templateLiteral(
      [t.templateElement({ raw: compCSS.join('\n') })],
      []
    )
  );

  const componentNode = rootComponent({
    NAME: t.identifier(options.name),
    STYLE: templateExpr
  });

  program.body.push(<any>componentNode);
}

function handleRule(options: Options, rule: postcss.Rule) {
  if (!options.isRoot) {
    // handleChildRule(program, options, rule);
    debug('Skipping child Rule: ', rule.selector);
    return;
  }

  const name = titleize(rule.selector.replace(/\.mdc-/, ''));
  const opts = Object.assign({}, options, { name });
  handleChildRule(opts, rule);
  options.program.body.push(options.t.exportDefaultDeclaration(options.t.identifier(name)));
}

function handleAtRule(options: Options, rule: postcss.AtRule) {
  debug('Skipping AtRule: ', rule.name);
}

function handleComment(options: Options, comment: postcss.Comment) {
  // ignore
}

function handleNode(options: Options) {
  return (node: postcss.Node) => {
    switch (node.type) {
      case 'atrule':
        handleAtRule(options, node as postcss.AtRule);
        break;

      case 'comment':
        handleComment(options, node as postcss.Comment);
        break;

      case 'rule':
        handleRule(options, node as postcss.Rule);
        break;
    }
  };
}

interface BabelPluginArg {
  template: typeof babel.template;
  types: typeof babel.types;
}

function babelPlugin({ template, types: t }: BabelPluginArg) {
  // 'File', 'options', 'buildExternalHelpers', 'template', 'resolvePlugin', 'resolvePreset',
  // 'version', 'util', 'messages', 'traverse', 'OptionManager', 'Pipeline',
  // 'analyse', 'transform', 'transformFromAst', 'Plugin', 'transformFile', 'transformFileSync'
  return {
    inherits: require('babel-plugin-syntax-flow'),
    visitor: {
      Program(path, state) {
        const program = <babel.types.Program>path.node;
        const root = <postcss.Root>state.opts;
        const opts = { isRoot: true, name: '', program, root, t, template };
        root.each(handleNode(opts));

        program.body.push(
        );
      }
    }
  };
}

const prettierOpts = {
  singleQuote: true,
  trailingComma: 'es5'
};

const buildComponents = through.obj(function(chunk, enc, cb) {
  let output;
  function plugin(root: postcss.Root, opts: any) {
    output = babel.transform(`
      import * as React from 'react';
      import * as styled from 'styled-components';
    `, { plugins: [[babelPlugin, root]]})
  }

  const input = chunk.contents.toString(enc);
  const root = postcss([plugin]).process(input, { syntax: sass })
  root.css; // evaluate lazy result

  const name = path.basename(chunk.path).replace(/mdc-/, '');
  const { code } = babel.transformFromAst(output.ast);
  chunk.path = path.join(path.dirname(chunk.path), `${name}.ts`);
  chunk.contents = Buffer.from(prettier.format(code, prettierOpts));
  this.push(chunk);

  cb();
});

export default buildComponents;
