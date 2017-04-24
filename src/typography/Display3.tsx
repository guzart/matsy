import * as React from 'react';
import styled from 'styled-components';

import Base from './Base';
import { colorContrastHigh } from './utils'

function Display3(props: any) {
  return <Base priority={2} {...props} />;
}

export default styled(Display3)`
  ${props => colorContrastHigh(props.colorContrast)}
  font-size: 56px;
  font-weight: 400;
  letter-spacing: -.02em;
  line-height: 1.35;
`;
