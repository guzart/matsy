import * as postcss from 'postcss';
import * as ts from 'typescript';

import debug from './debug';
import { IOptions } from './transpile';
import * as utils from './utils';

function isLiteral(value: string) {
  return !/\$/.test(value);
}

function transpileLiteralValue(options: IOptions, node: postcss.Declaration) {
  debug(`Handle ${node.prop} as literal`);
  return ts.createLiteral(utils.parseValue(node.value));
}

export { isLiteral, transpileLiteralValue };
