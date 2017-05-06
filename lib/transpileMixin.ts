import * as debugFactory from 'debug';
import * as postcss from 'postcss';
import { parse } from 'scss-parser';
import * as ts from 'typescript';

const debug = debugFactory('matsy');

function transpileMixin(node: postcss.Node) {
  const ast = parse(node.toString());
  debug(ast.value);
  debug(ast.value[0], ast.value[1]);

  return ts.createVariableStatement(
    [ts.createToken(ts.SyntaxKind.ExportKeyword)],
    [
      ts.createVariableDeclaration(
        ts.createIdentifier(''), // ast.value[].type === 'identifier'
        undefined,
        ts.createArrowFunction(
          undefined,
          undefined,
          // ast.value[].type === 'arguments'.value
          [ts.createParameter(undefined, undefined, undefined, ts.createIdentifier(''))],
          undefined,
          ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
          ts.createBlock([ts.createStatement(ts.createLiteral(''))]),
        ),
      ),
    ],
  );
}

export default transpileMixin;
