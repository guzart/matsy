import * as postcss from 'postcss';
import * as ts from 'typescript';

import clone from './clone';
import debug from './debug';
import { IOptions } from './transpile';

function transpileMapValue(options: IOptions, node: postcss.Declaration) {
  debug(`Handle ${node.prop} as map`);

  const mapText = 'const map = ' + node.value.replace(/^\s*\(/, '{').replace(/\)\s*$/, '}');
  const src = ts.createSourceFile('map-value.ts', mapText, ts.ScriptTarget.ES2015, true, ts.ScriptKind.JS);
  const varDecl = (src.statements[0] as any).declarationList.declarations[0] as ts.VariableDeclaration;
  const expr = varDecl.initializer as ts.ObjectLiteralExpression;
  return ts.createObjectLiteral(expr.properties.map(clone), true);
}

function isMap(value: string) {
  // starts with '(', has spaces, and then groups of something-colon-something-comma
  return /^\([\s\S]*([\s\S]+\:[\s\S+],?)+[\s\S]*\)$/.test(value);
}

export { isMap, transpileMapValue };
