import * as debugFactory from 'debug';
import { camelize } from 'inflection';
import * as postcss from 'postcss';
import * as ts from 'typescript';

import handleNode, { IOptions } from './transpile';
import transpileNode from './transpileNode';

const debug = debugFactory('matsy');

function handleChildRuleDeclarations(options: IOptions, rule: postcss.Rule) {
  const { out } = options;

  const declarations = rule.nodes
    .filter((n) => n.type === 'decl')
    .map((decl: postcss.Declaration) => (`${decl.prop}: ${decl.value};`));

  const tempHead = ts.createNode(ts.SyntaxKind.FirstTemplateToken, -1, -1) as ts.NoSubstitutionTemplateLiteral;
  // tslint:disable-next-line
  // synHeadNode.flags |= ts.NodeFlags.Synthesized;
  tempHead.text = '\n  ' + declarations.join('\n  ') + '\n';

  const buildExpr = ts.createCall(
    ts.createIdentifier('styled'),
    [],
    [ts.createIdentifier('Component')],
  );

  const styledExpr = ts.createTaggedTemplate(buildExpr, tempHead);

  const arrowExpr = ts.createArrowFunction(
    [],
    [ts.createTypeParameterDeclaration(ts.createIdentifier('P'), undefined, undefined)],
    [
      ts.createParameter(
        [],
        [],
        undefined,
        ts.createIdentifier('Component'),
        undefined,
        ts.createTypeReferenceNode(ts.createIdentifier('Component'), [ts.createTypeReferenceNode('P', [])]),
      ),
    ],
    undefined,
    ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
    styledExpr,
  );

  const varDecl = ts.createVariableDeclaration(ts.createIdentifier(options.name), undefined, arrowExpr);

  const statement = ts.createVariableStatement(
    [ts.createToken(ts.SyntaxKind.ExportKeyword)],
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
  otherNodes.forEach(transpileNode(nodeOpts));
}

function handleRule(options: IOptions, rule: postcss.Rule) {
  const { selector } = rule;

  if (/^\.mdc-([a-zA-Z]+-?)+$/.test(selector)) {
    // handle Block
    const name = rule.selector.replace(/\.mdc-/, '');
    const opts = Object.assign({}, options, { name });
    debug('Rule:', selector, 'as Block using name', name);
    handleChildRule(opts, rule);
    options.imp.react = true;
    options.imp.styled.push('styled');
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
