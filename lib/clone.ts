import * as ts from 'typescript';

import debug from './debug';

function clone(node: any) {
  switch (node.kind) {
    case ts.SyntaxKind.PropertyAssignment:
      const n = node as ts.PropertyAssignment;
      return ts.createPropertyAssignment(clone(n.name), clone(n.initializer));

    case ts.SyntaxKind.StringLiteral:
      return ts.createLiteral(node.text);

    case ts.SyntaxKind.FirstLiteralToken:
      return ts.createIdentifier(node.text);
  }

  debug(ts.SyntaxKind[node.kind]);
  return node;
}

export default clone;
