import styled from 'styled-components';

import { typoButton } from 'matsy/mixins';
import animation from 'matsy/theme/animation';

import t from '../theme';
import { colored, disabled, raised, raisedAndColored, ButtonStyleProps } from '../utils';

export type Props = ButtonStyleProps;

const Button = styled.button`
  background: transparent;
  border-radius: ${t.borderRadius};
  border: none;
  color: ${t.secondaryColor};
  cursor: pointer;
  display: inline-block;
  height: ${t.height};
  line-height: ${t.height};
  margin: 0;
  min-width: ${t.minWidth};
  outline: none;
  overflow: hidden;
  padding: 0 ${t.padding};
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: box-shadow 0.2s ${animation.curveFastOutLinearIn},
              background-color 0.2s ${animation.curveDefault},
              color 0.2s ${animation.curveDefault};
  vertical-align: middle;
  will-change: box-shadow;

  &::-moz-focus-inner {
    border: 0;
  }

  &:hover {
    background-color: ${t.hoverColor};
  }

  &:focus:not(:active) {
    background-color: ${t.focusColor};
  }

  &:active {
    background-color: ${t.activeColor};
  }

  ${(props: Props) => typoButton(props.contrast)}
  ${(props: Props) => colored(props)}
  ${(props: Props) => raised(props)}
  ${(props: Props) => raisedAndColored(props)}
  ${(props: Props) => disabled(props)}
`;

export default Button;
