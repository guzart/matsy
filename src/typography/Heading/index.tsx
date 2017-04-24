import * as React from 'react';
import styled from 'styled-components';

import { Priority, Props } from '../Base';
import Display1 from '../Display1';
import Display2 from '../Display2';
import Display3 from '../Display3';
import Display4 from '../Display4';
import Headline from '../Headline';
import Title from '../Title';

function getComponent(priority: Priority = 1) {
  switch (priority) {
    case 1: return Display4;
    case 2: return Display3;
    case 3: return Display2;
    case 4: return Display1;
    case 5: return Headline;
    case 6: return Title;
  }
}

function Heading(props: Props) {
  const { priority, ...other } = props;
  const Component = getComponent(priority);
  return (<Component {...other} priority={priority} />);
}

const StyledHeading: React.ComponentClass<Props> = styled(Heading)`
  margin-bottom: ${(props: Props) => !props.priority || props.priority <= 3 ? '24px' : '16px'};
  margin-top: 24px;
`;

export default StyledHeading;
