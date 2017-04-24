import * as React from 'react';
import styled from 'styled-components';

import Base from './Base';
import { colorContrastHigh } from './utils'

function Display2(props: any) {
  return <Base priority={3} {...props} />;
}

export default styled(Display2)`
  ${props => colorContrastHigh(props.colorContrast)}
  font-size: 45px;
  font-weight: 400;
  line-height: 48px;
`;

