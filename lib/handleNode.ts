import * as babel from 'babel-core';
import * as postcss from 'postcss';

import handleAtRule from './handleAtRule';
import handleComment from './handleComment';
import handleRule from './handleRule';

export interface IOptions {
  name: string;
  program: babel.types.Program;
  root: postcss.Root;
  t: typeof babel.types;
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
    }
  };
}

export default handleNode;
