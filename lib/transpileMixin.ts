import * as postcss from 'postcss';
import * as query from 'query-ast';
import * as scss from 'scss-parser';
import * as ts from 'typescript';

import debug from './debug';
import { IOptions } from './transpile';
import * as utils from './utils';

interface IMixinArgument {
  name: string;
}

function getArguments(mixinNode: query.QueryWrapper): IMixinArgument[] {
  const mixinArgs = mixinNode.children('arguments');
  const mixinArgsVars = mixinArgs.children('variable');
  // TODO: missing arguments with a default
  return mixinArgsVars.map((node) => ({ name: utils.getVariableName(node.node.value.toString()) }));
}

function createParameterDeclarations(mixinNode: query.QueryWrapper) {
  const mixinArgs = getArguments(mixinNode);
  return mixinArgs.map(
    (arg) =>
      ts.createParameter(
        undefined,
        undefined,
        undefined,
        ts.createIdentifier(arg.name),
        undefined,
        // TODO: improve type check by analizing internal mixin conditions
        ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
      ),
  );
}

function transpileMixin(options: IOptions, node: postcss.Node) {
  const ast = scss.parse(node.toString());
  const $ = query(ast);

  const mixinNode = $('stylesheet').children('atrule');
  const mixinName = utils.getVariableName(mixinNode.children('identifier').value(), options.name);

  return ts.createVariableStatement(
    [ts.createToken(ts.SyntaxKind.ExportKeyword)],
    ts.createVariableDeclarationList(
      [
        ts.createVariableDeclaration(
          ts.createIdentifier(mixinName), // ast.value[].type === 'identifier'
          undefined,
          ts.createArrowFunction(
            undefined,
            undefined,
            createParameterDeclarations(mixinNode),
            undefined,
            ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
            ts.createBlock([ts.createStatement(ts.createLiteral(''))]),
          ),
        ),
      ],
      ts.NodeFlags.Const,
    ),
  );
}

export default transpileMixin;
