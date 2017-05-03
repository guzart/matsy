import * as babel from 'babel-core';
import * as debugFactory from 'debug';
import { camelize } from 'inflection';
import * as postcss from 'postcss';

import handleNode, { IOptions } from './handleNode';

const debug = debugFactory('matsy');

const decoratorTemplate = babel.template(`
  const NAME = (Component: any) => STYLE;
`, { plugins: ['flow'] });

function handleChildRuleDeclarations(options: IOptions, rule: postcss.Rule) {
  const { program, t } = options;

  const declarations = rule.nodes
    .filter((n) => n.type === 'decl')
    .map((decl: postcss.Declaration) => (`${decl.prop}: ${decl.value};`));

  const templateExpr = t.taggedTemplateExpression(
    t.callExpression(
      t.identifier('styled'),
      [t.identifier('Component')],
    ),
    t.templateLiteral(
      // TODO: improve indentation
      [t.templateElement({ raw: '\n  ' + declarations.join('\n  ') + '\n' })],
      [],
    ),
  );

  const componentNode = decoratorTemplate({
    NAME: t.identifier(options.name),
    STYLE: templateExpr,
  });

  program.body.push(componentNode as any);
}

function handleChildRule(options: IOptions, rule: postcss.Rule) {
  // First add css declarations
  handleChildRuleDeclarations(options, rule);

  // Now consider adding more components
  const otherNodes = rule.nodes.filter((n) => n.type !== 'decl');
  const nodeOpts = Object.assign({}, options, {});
  otherNodes.forEach(handleNode(nodeOpts));
}

function handleRule(options: IOptions, rule: postcss.Rule) {
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

export default handleRule;
