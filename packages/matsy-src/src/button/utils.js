// @flow

import { css } from 'styled-components';

import { button as t } from '../theme';
import shadow from '../shadow';
import { focusShadow } from '../mixins';

import type { ButtonStyleProps } from './types.js.flow';

export function colored(props: ButtonStyleProps) {
  if (!props.colored) { return ''; }
  return css`
    color: ${t.primaryColorAlt};

    &:focus:not(:active) {
      background-color: ${t.focusColorAlt};
    }
  `;
}

export function disabled(props: ButtonStyleProps) {
  if (!props.disabled) { return ''; }
  return css`
    background-color: ${props.raised ? t.primaryColor : 'transparent'};
    box-shadow: none;
    color: ${t.secondaryColorDisabled};
    cursor: default;

    &:hover {
      background-color: ${props.raised ? t.primaryColor : 'transparent'};
    }
  `;
}

export function raised() {
  return (props: ButtonStyleProps) => {
    if (!props.raised) { return ''; }
    return css`
      background: ${t.primaryColor};
      ${shadow(2)}

      &:active {
        ${shadow(4)}
        background-color: ${t.activeColor};
      }

      &:focus:not(:active) {
        ${focusShadow()}
        background-color: ${t.activeColor};
      }
    `;
  };
}

export function raisedAndColored(props: ButtonStyleProps) {
  if (!props.raised || !props.colored) { return ''; }
  return css`
    background: ${t.primaryColorAlt};
    color: ${t.secondaryColorAlt};

    &:hover {
      background-color: ${t.hoverColorAlt};
    }

    &:active {
      background-color: ${t.activeColorAlt};
    }

    &:focus:not(:active) {
      background-color: ${t.activeColorAlt};
    }
  `;
}
