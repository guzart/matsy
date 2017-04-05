// @flow

import styled from 'styled-components';

import { card as t } from '../../theme';
import shadow from '../../shadow';

const Card = styled.div`
  ${props => shadow(props.shadow)}
  background: ${t.backgroundColor};
  border-radius: 2px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-size: ${t.fontSize};
  font-weight: 400;
  min-height: ${t.height};
  overflow: hidden;
  position: relative;
  width: ${t.width};
  z-index: ${t.zIndex};
`;

export default Card;
