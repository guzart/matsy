import { css } from 'styled-components';
import typo from './theme';

type Alignment =
  | 'center'
  | 'left'
  | 'right';

export function colorContrast(opacity: number = 0.87) {
  return (useColorContrast: boolean) => {
    if (!useColorContrast) { return ''; }
    return css`
      opacity: ${opacity};
    `;
  }
}

export const colorContrastLow = colorContrast();

export const colorContrastHigh = colorContrast(0.54);

export function font(usePreferred: boolean) {
  return `
    font-family: ${usePreferred ? typo.preferredFont : typo.performanceFont};
  `;
}

export function textAlign(alignment: Alignment = 'left') {
  return `
    text-align: ${alignment};
  `;
}

