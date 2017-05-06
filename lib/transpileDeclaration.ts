import * as postcss from 'postcss';
import * as ts from 'typescript';

import debug from './debug';
import { IOptions } from './transpile';
import * as utils from './utils';

import { isLiteral, transpileLiteralValue } from './transpileLiteral';
import { isMap, transpileMapValue } from './transpileMap';
import { isPolishedFunction, transpilePolishedFunction } from './transpilePolished';
import { isVariableReference, transpileVariableReference } from './transpileVariableReference';

function handleVariableValue(options: IOptions, node: postcss.Declaration) {
  const value = node.value;

  if (isPolishedFunction(value)) { return transpilePolishedFunction(options, node); }
  if (isMap(value)) { return transpileMapValue(options, node); }
  if (isLiteral(value)) { return transpileLiteralValue(options, node); }
  if (isVariableReference(value)) { return transpileVariableReference(options, node); }

  debug('Cannot handle', node.prop, value, 'as variable');
  return null;
}

function handleVariable(options: IOptions, node: postcss.Declaration) {
  const name = utils.getVariableName(node.prop, options.name);
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

  options.vars.push({ library: options.name, name: node.prop });
  options.out.push(statement);
}

function transpileDeclaration(options: IOptions, node: postcss.Declaration) {
  const prop = node.prop;
  if (/^\$(\w+\-)+/.test(prop)) {
    handleVariable(options, node);
  } else {
    debug('Skipping declaration:', prop);
  }
}

export default transpileDeclaration;
