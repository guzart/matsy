import * as postcss from 'postcss';
import * as ts from 'typescript';

import debug from './debug';
import { IOptions } from './transpile';
import transpileAtRule from './transpileAtRule';
import transpileComment from './transpileComment';
import transpileDeclaration from './transpileDeclaration';
import transpileRule from './transpileRule';

function transpileNode(options: IOptions) {
  return (node: postcss.Node) => {
    switch (node.type) {
      case 'atrule':
        transpileAtRule(options, node as postcss.AtRule);
        break;

      case 'comment':
        transpileComment(options, node as postcss.Comment);
        break;

      case 'decl':
        transpileDeclaration(options, node as postcss.Declaration);
        break;

      case 'rule':
        transpileRule(options, node as postcss.Rule);
        break;

      default:
        debug(`Cannot handle postcss.${node.type}`, 'type');
        break;
    }
  };
}

export default transpileNode;
