import styled from 'styled-components';

import shadow, { ShadowLevel } from 'matsy/shadow';

import t from '../theme';

interface Props {
  shadow: ShadowLevel,
}

const Card = styled.div`
  ${(props: Props) => shadow(props.shadow)}
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
