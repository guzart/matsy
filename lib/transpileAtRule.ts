import * as debugFactory from 'debug';
import * as postcss from 'postcss';

import { IOptions } from './transpile';
import transpileMixin from './transpileMixin';
import * as utils from './utils';

const debug = debugFactory('matsy');

function handleAtRule(options: IOptions, node: postcss.AtRule) {
  if (node.name === 'import') {
    const params = node.params.replace(/['"]/g, '');
    if (/@material\//.test(params)) {
      // @material import
      const library = params.replace(/@material\/([^\/]+)\/.+/, '$1');
      const name = params.replace(/.*\/(\w+)$/, '$1');
      options.imp.material.push({ library, name });
      debug(`Handle ${node.name} as ${library}/${name}`);
      return;
    } else if (/^\.\//.test(utils.cleanValue(params))) {
      // local import
      const name = params.replace(/.*\/(\w+)$/, '$1');
      debug(`Handle ${node.name} as local /${name}`);
      options.imp.material.push({ library: options.name, name });
      return;
    }
  } else if (node.name === 'mixin') {
    options.out.push(transpileMixin(node));
  }

  debug('Cannot handle atRule', node.name, node.params);
}

export default handleAtRule;
