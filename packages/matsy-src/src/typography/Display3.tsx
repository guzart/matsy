import * as React from 'react';
import styled from 'styled-components';

import Base from './Base';

function Display3(props: any) {
  return <Base {...props} priority={3} />;
}

export default styled(Display3)`
  margin-bottom: 24px;
  margin-top: 24px;
`;
