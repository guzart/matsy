// @flow

import { css } from 'styled-components';

import { button as t } from '../theme';
import type { ButtonStyleProps } from './types';

export function colored() {
  return (props: ButtonStyleProps) => {
    if (!props.colored) { return ''; }
    return css`
      color: ${t.primaryColorAlt};
      &:focus:not(:active) {
        background-color: ${t.focusColorAlt};
      }
    `;
  };
}

export function submitType() {
  return (props: ButtonStyleProps) => {
    if (props.type === 'submit') {
      return '-webkit-appearance:none;';
    }

    return '';
  };
}
