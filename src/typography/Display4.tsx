import * as React from 'react';
import styled from 'styled-components';

import Base from './Base';
import { colorContrastHigh } from './utils'

function Display4(props: any) {
  return <Base priority={1} {...props} />;
}

export default styled(Display4)`
  ${props => colorContrastHigh(props.colorContrast)}
  font-size: 112px;
  font-weight: 300;
  letter-spacing: -.04em;
  line-height: 1;
`;
