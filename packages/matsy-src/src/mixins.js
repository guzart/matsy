// @flow

import { css } from 'styled-components';
import { animation, typo } from './theme';

function focusShadow() {
  return 'box-shadow: 0 0 8px rgba(0, 0, 0, .18), 0 8px 16px rgba(0, 0, 0, .36);';
}

function materialAnimationDefault(duration: string = '0.2s') {
  return css`
    transition-duration: ${duration};
    transition-timing-function: ${animation.curveDefault};
  `;
}

function typoPreferredFont(usePreferred: boolean = true) {
  if (!usePreferred) { return ''; }
  return css`
    font-family: ${typo.preferredFont};
  `;
}

function typoButton(contrast: boolean = false, usePreferred: boolean = true) {
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

export { focusShadow, materialAnimationDefault, typoPreferredFont, typoButton };
