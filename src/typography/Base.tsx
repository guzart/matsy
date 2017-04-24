import * as React from 'react';
import styled from 'styled-components';

import * as tu from './utils';

export type Priority = 1 | 2 | 3 | 4 | 5 | 6;

export interface Props {
  colorContrast: boolean,
  preferredFont: boolean,
  priority: Priority,
  textAlign: 'center' | 'left' | 'right',
}

function Base(props: Props) {
  const { priority, textAlign, ...other } = props;
  return React.createElement(`h${priority}`, other);
}

const BaseStyled: React.ComponentClass<Props> = styled(Base)`
  ${props => tu.colorContrastLow(props.colorContrast)}
  ${props => tu.font(props.preferredFont)}
  ${props => tu.textAlign(props.textAlign)}
  margin: 0;
  padding: 0;
`;

export default BaseStyled;
