// @flow

import React from 'react';

import Display1 from './Display1';
import Display2 from './Display2';
import Display3 from './Display3';
import Headline from './Headline';
import Subhead from './Subhead';
import Title from './Title';

type Priority = 1 | 2 | 3 | 4 | 5 | 6;

type Props = {
  priority?: Priority,
};

function getComponent(priority?: Priority = 1) {
  switch (priority) {
    case 1: return Display3;
    case 2: return Display2;
    case 3: return Display1;
    case 4: return Headline;
    case 5: return Title;
    case 6: return Subhead;
    default: return Display3;
  }
}

function Heading(props: Props) {
  const { priority, ...other } = props;
  const Component = getComponent(priority);
  return (<Component {...other} priority={priority} />);
}

Heading.defaultProps = {
  priority: 1,
};

export default Heading;
