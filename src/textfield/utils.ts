import { css } from 'styled-components';

import { input as t } from '../theme';

interface TextfieldProps {
  align?: 'right' | 'left',
  width?: 'expandable' | 'full' | void,
}

function alignment() {
  return (props: TextfieldProps) => {
    if (props.align === 'right') {
      return 'text-align: right';
    }

    return 'text-align: left;';
  };
}

function width() {
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

interface InputStyleProps {
  isDisabled?: boolean,
  isFocused?: boolean,
  isInvalid?: boolean,
}

function isInputDisabled() {
  return (props: InputStyleProps) => {
    if (!props.isDisabled) { return ''; }
    return css`
      background-color: transparent;
      border-bottom: 1px dotted ${t.textDisabledColor()};
      color: ${t.textDisabledTextColor()};
    `;
  };
}

function isInputInvalid() {
  return (props: InputStyleProps) => {
    if (!props.isInvalid) { return ''; }
    return css`
      border-color: ${t.textErrorColor};
      box-shadow: none;
    `;
  };
}

function isInputFocused() {
  return (props: InputStyleProps) => {
    if (!props.isFocused) { return ''; }
    return 'outline: none;';
  };
}

// LABEL

interface LabelProps {
  isDirty?: boolean,
  isFocused?: boolean,
}

function isLabelDirty() {
  return (props: LabelProps) => {
    if (props.isDirty) { return 'visibility: none;'; }
    return '';
  };
}

function isLabelFocused() {
  return (props: LabelProps) => {
    if (!props.isFocused) { return ''; }
    return css`
      &:after {
        left: 0;
        visibility: visible;
        width: 100%;
      }
    `;
  };
}

export {
  alignment,
  isInputDisabled,
  isInputFocused,
  isInputInvalid,
  isLabelDirty,
  isLabelFocused,
  width,
  InputStyleProps,
  LabelProps,
};
