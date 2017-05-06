import * as postcss from 'postcss';
import * as ts from 'typescript';

import debug from './debug';
import { IOptions } from './transpile';
import * as utils from './utils';

function isPolishedFunction(value: string) {
  return /^rgb/.test(value);
}

function transpilePolishedFunction(options: IOptions, node: postcss.Declaration) {
  debug(`Handle ${node.prop} as polished function`);
  const funcName = node.value.replace(/\(.+$/, '');
  const args = utils.extractArgs(node.value);
  options.imp.polished.push(funcName);

  return ts.createCall(
    ts.createIdentifier(funcName),
    [],
    args.map(ts.createLiteral),
  );
}

export { transpilePolishedFunction, isPolishedFunction };
