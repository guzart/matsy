import * as debugFactory from 'debug';
import * as postcss from 'postcss';
import * as ts from 'typescript';

import handleAtRule from './handleAtRule';
import handleComment from './handleComment';
import handleRule from './handleRule';

const debug = debugFactory('matsy');

export interface IOptions {
  name: string;
  out: ts.Statement[];
  root: postcss.Root;
}

function handleNode(options: IOptions) {
  return (node: postcss.Node) => {
    switch (node.type) {
      case 'atrule':
        handleAtRule(options, node as postcss.AtRule);
        break;

      case 'comment':
        handleComment(options, node as postcss.Comment);
        break;

      case 'rule':
        handleRule(options, node as postcss.Rule);
        break;

      default:
        debug(`Cannot handle postcss.${node.type}`, 'type');
        break;
    }
  };
}

export default handleNode;
