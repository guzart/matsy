import * as React from 'react';
import styled from 'styled-components';

import Base from './Base';

function Subheading(props: any) {
  return <Base priority={6} {...props} />;
}

export default styled(Subheading)`
  font-size: 16px;
  font-weight: 400;
  letter-spacing: .04em;
  line-height: 24px;
`;
