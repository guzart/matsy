import * as postcss from 'postcss';
import * as ts from 'typescript';

import debug from './debug';
import { IOptions } from './transpile';
import * as utils from './utils';

function isVariableReference(value) {
  return /\$/.test(value);
}

function transpileVariableReference(options: IOptions, node: postcss.Declaration) {
  debug(`Handle ${node.prop} as variable reference`);
  const libName = utils.getLibraryName(options, node.value);
  const varName = utils.getVariableName(libName, utils.cleanValue(node.value));
  const libImpName = utils.getLibraryImportName(libName);

  // TODO: Check if this is a local variable or a reference to another library variable.
  // We should parse this expression.... using scss-parser
  return ts.createPropertyAccess(ts.createIdentifier(libImpName), ts.createIdentifier(varName));
}

export { isVariableReference, transpileVariableReference };
