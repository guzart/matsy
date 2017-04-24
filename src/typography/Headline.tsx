import * as React from 'react';
import styled from 'styled-components';

import Base from './Base';

function Headline(props: any) {
  return <Base priority={5} {...props} />;
}

export default styled(Headline)`
  -mos-osx-font-smoothing: grayscale;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
`;
