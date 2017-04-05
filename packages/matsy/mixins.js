// @flow

import { css } from 'styled-components';
import { animation, typo } from './theme';

export function materialAnimationDefault(duration: string = '0.2s') {
  return css`
    transition-duration: ${duration};
    transition-timing-function: ${animation.curveDefault};
  `;
}

export function typoPreferredFont(usePreferred: boolean = true) {
  if (!usePreferred) { return ''; }
  return css`
    font-family: ${typo.preferredFont};
  `;
}

export function typoButton(contrast: boolean = false, usePreferred: boolean = true) {
  const contrastStyle = contrast ? 'opacity: 0.87;' : '';
  return css`
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    line-height: 1;
    letter-spacing: 0;

    ${typoPreferredFont(usePreferred)}
    ${contrastStyle}
  `;
}
