// @flow

import { css } from 'styled-components';

import { input as t } from '../theme';
import type {
  InputProps,
  LabelProps,
  TextfieldProps,
} from './types.js.flow';

export function alignment() {
  return (props: TextfieldProps) => {
    if (props.align === 'right') {
      return 'text-align: right';
    }

    return 'text-align: left;';
  };
}

export function width() {
  return (props: TextfieldProps) => {
    if (props.width === 'full') {
      return 'width: 100%';
    } else if (props.width === 'expandable') {
      return css`
        min-height: ${t.textButtonSize};
        min-width: ${t.textButtonSize};
        width: auto;
      `;
    }

    return '';
  };
}

// INPUT

export function isInputDisabled() {
  return (props: InputProps) => {
    if (!props.isDisabled) { return ''; }
    return css`
      background-color: transparent;
      border-bottom: 1px dotted ${t.textDisabledColor()};
      color: ${t.textDisabledTextColor()};
    `;
  };
}

export function isInputInvalid() {
  return (props: InputProps) => {
    if (!props.isInvalid) { return ''; }
    return css`
      border-color: ${t.textErrorColor};
      box-shadow: none;
    `;
  };
}

export function isInputFocused() {
  return (props: InputProps) => {
    if (!props.isFocused) { return ''; }
    return 'outline: none;';
  };
}

// LABEL

export function isLabelDirty(props: LabelProps) {
  if (props.isDirty) { return 'visibility: none;'; }
  return '';
}

export function isLabelFocused(props: LabelProps) {
  if (!props.isFocused) { return ''; }
  return css`
    &:after {
      left: 0;
      visibility: visible;
      width: 100%;
    }
  `;
}
