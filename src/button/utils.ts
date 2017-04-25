import { css } from 'styled-components';

import { focusShadow } from 'matsy/mixins';
import shadow from 'matsy/shadow';

import t from './theme';

export interface ButtonStyleProps {
  accent?: boolean,
  colored?: boolean,
  contrast?: boolean,
  disabled?: boolean,
  raised?: boolean,
  type?: 'button' | 'submit',
};

function accentRaised(props: ButtonStyleProps) {
  if (!props.raised) { return ''; }
  return css`
    background-color: ${t.fabColorAlt};
    color: ${t.fabTextColorAlt};

    &:hover {
      background-color: ${t.fabHoverColorAlt};
    }

    &:active {
      background-color: ${t.fabActiveColorAlt};
    }

    &:focus:not(:active) {
      background-color: ${t.fabActiveColorAlt};
    }
  `;
}

export function accent(props: ButtonStyleProps) {
  if (!props.accent) { return ''; }
  return css`
    color: ${t.fabColorAlt};
    ${accentRaised}
  `;
}

function coloredRaised(props: ButtonStyleProps) {
  if (!props.raised) { return ''; }
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

export function colored(props: ButtonStyleProps) {
  if (!props.colored) { return ''; }
  return css`
    color: ${t.primaryColorAlt};

    &:focus:not(:active) {
      background-color: ${t.focusColorAlt};
    }

    ${coloredRaised}
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

export function raised(props: ButtonStyleProps) {
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
}

