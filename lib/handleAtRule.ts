import * as debugFactory from 'debug';
import * as postcss from 'postcss';

import { IOptions } from './handleNode';

const debug = debugFactory('matsy');

function handleAtRule(options: IOptions, rule: postcss.AtRule) {
  debug('Skipping AtRule:', rule.name, rule.params);
}

export default handleAtRule;
