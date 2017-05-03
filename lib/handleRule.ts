import * as debugFactory from 'debug';
import { camelize } from 'inflection';
import * as postcss from 'postcss';
import * as ts from 'typescript';

import handleNode, { IOptions } from './handleNode';

const debug = debugFactory('matsy');

function handleChildRuleDeclarations(options: IOptions, rule: postcss.Rule) {
  const { out } = options;

  const declarations = rule.nodes
    .filter((n) => n.type === 'decl')
    .map((decl: postcss.Declaration) => (`${decl.prop}: ${decl.value};`));

  const tempHead = ts.createNode(ts.SyntaxKind.FirstTemplateToken, -1, -1) as ts.NoSubstitutionTemplateLiteral;
  // tslint:disable-next-line
  // synHeadNode.flags |= ts.NodeFlags.Synthesized;
  tempHead.text = declarations.join('\n');

  const buildExpr = ts.createCall(
    ts.createIdentifier('styled'),
    [],
    [ts.createIdentifier('Component')],
  );

  const styledExpr = ts.createTaggedTemplate(buildExpr, tempHead);

  const arrowExpr = ts.createArrowFunction(
    [],
    [],
    [ts.createParameter([], [], undefined, ts.createIdentifier('Component'))],
    undefined,
    ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
    styledExpr,
  );

  const varDecl = ts.createVariableDeclaration(ts.createIdentifier(options.name), undefined, arrowExpr);
  const statement = ts.createVariableStatement(
    [],
    ts.createVariableDeclarationList([varDecl], ts.NodeFlags.Const),
  );

  options.out.push(statement);
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
