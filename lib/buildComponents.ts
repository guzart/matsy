import * as babel from 'babel-core';
import * as debugFactory from 'debug';
import { camelize } from 'inflection';
import * as path from 'path';
import * as prettier from 'prettier';
import * as postcss from 'postcss';
import * as sass from 'postcss-scss';
import * as through from 'through2';

const debug = debugFactory('matsy');
const traverse = babel.traverse;

interface Options {
  name: string;
  program: babel.types.Program;
  root: postcss.Root;
  t: typeof babel.types;
}

const decoratorTemplate = babel.template(`
  const NAME = (Component: React.ReactType) => STYLE;
`, { plugins: ['flow'] });

function handleChildRuleDeclarations(options: Options, rule: postcss.Rule) {
  const { program, t } = options;

  const declarations = rule.nodes
    .filter(n => n.type === 'decl')
    .map((decl: postcss.Declaration) => (`${decl.prop}: ${decl.value};`));

  const templateExpr = t.taggedTemplateExpression(
    t.callExpression(
      t.identifier('styled'),
      [t.identifier('Component')]
    ),
    t.templateLiteral(
      // TODO: improve indentation
      [t.templateElement({ raw: '\n  ' + declarations.join('\n  ') + '\n' })],
      []
    )
  );

  const componentNode = decoratorTemplate({
    NAME: t.identifier(options.name),
    STYLE: templateExpr
  });

  program.body.push(<any>componentNode);
}

function handleChildRule(options: Options, rule: postcss.Rule) {
  // First add css declarations
  handleChildRuleDeclarations(options, rule);

  // Now consider adding more components
  const otherNodes = rule.nodes.filter(n => n.type !== 'decl');
  const nodeOpts = Object.assign({}, options, {});
  otherNodes.forEach(handleNode(nodeOpts));
}

function handleRule(options: Options, rule: postcss.Rule) {
  const { selector } = rule;

  if (/^\.mdc-([a-zA-Z]+-?)+$/.test(selector)) {
    // handle Block
    const name = rule.selector.replace(/\.mdc-/, '');
    const opts = Object.assign({}, options, { name });
    debug('Rule:', selector, 'as Block using name', name);
    handleChildRule(opts, rule);
    // options.program.body.push(options.t.exportDefaultDeclaration(options.t.identifier(name)));
  } else if (/^&__([a-zA-Z]+-?)+$/.test(selector)) {
    // handle Element
    const name = options.name + camelize(rule.selector.replace('&__', '').replace(/-/g, '_'));
    const opts = Object.assign({}, options, { name });
    debug('Rule:', selector, 'as Element using name', name);
    handleChildRule(opts, rule);
  } else {
    debug('Skipping child Rule:', rule.selector);
  }
}

function handleAtRule(options: Options, rule: postcss.AtRule) {
  debug('Skipping AtRule:', rule.name, rule.params);
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
  types: typeof babel.types;
}

function babelPlugin({ types: t }: BabelPluginArg) {
  // 'File', 'options', 'buildExternalHelpers', 'template', 'resolvePlugin', 'resolvePreset',
  // 'version', 'util', 'messages', 'traverse', 'OptionManager', 'Pipeline',
  // 'analyse', 'transform', 'transformFromAst', 'Plugin', 'transformFile', 'transformFileSync'
  return {
    inherits: require('babel-plugin-syntax-flow'),
    visitor: {
      Program(path, state) {
        const program = <babel.types.Program>path.node;
        const root = <postcss.Root>state.opts;
        const opts = { isRoot: true, name: '', program, root, t };
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

const buildComponents = through.obj(function (chunk, enc, cb) {
  let output;
  function plugin(root: postcss.Root, opts: any) {
    output = babel.transform(`
      import * as React from 'react';
      import * as styled from 'styled-components';
    `, { plugins: [[babelPlugin, root]] })
  }

  const input = chunk.contents.toString(enc);
  const root = postcss([plugin]).process(input, { syntax: sass })
  root.css; // evaluate lazy result

  const name = path.basename(chunk.path).replace(/mdc-|\.scss/g, '');
  const { code } = babel.transformFromAst(output.ast);
  chunk.path = path.join(path.dirname(chunk.path), `${name}.ts`);
  chunk.contents = Buffer.from(prettier.format(code, prettierOpts));
  this.push(chunk);

  cb();
});

export default buildComponents;
