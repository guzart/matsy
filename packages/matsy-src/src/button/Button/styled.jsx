// @flow

import styled from 'styled-components';

import { typoButton } from '../../mixins';
import { animation, button as t } from '../../theme';
import { colored, disabled, raised, raisedAndColored } from '../utils';

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

  ${props => typoButton(props.contrast)}
  ${props => colored(props)}
  ${props => raised(props)}
  ${props => raisedAndColored(props)}
  ${props => disabled(props)}
`;

export default Button;
