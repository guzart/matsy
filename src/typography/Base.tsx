import * as React from 'react';
import styled from 'styled-components';

import * as tu from './utils';

type Props = {
  colorContrast: boolean,
  preferredFont: boolean,
  priority: 1 | 2 | 3 | 4 | 5 | 6,
  textAlign: 'center' | 'left' | 'right',
};

function TypographyBase(props: Props) {
  const { priority, textAlign, ...other } = props;
  return React.createElement(`h${priority}`, other);
}

export default styled(TypographyBase)`
  ${props => tu.colorContrast(props.colorContrast)}
  ${props => tu.font(props.preferredFont)}
  ${props => tu.textAlign(props.textAlign)}
  margin: 0;
  padding: 0;
`;
