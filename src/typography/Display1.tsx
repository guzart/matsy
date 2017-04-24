import * as React from 'react';
import styled from 'styled-components';

import Base from './Base';
import { colorContrastHigh } from './utils'

function Display1(props: any) {
  return <Base priority={4} {...props} />;
}

export default styled(Display1)`
  ${props => colorContrastHigh(props.colorContrast)}
  font-size: 34px;
  font-weight: 400;
  line-height: 40px;
`;