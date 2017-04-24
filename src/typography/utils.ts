import { typo } from 'matsy/theme';

type Alignment =
  | 'center'
  | 'left'
  | 'right';

export function colorContrast(useColorContrast: boolean) {
  if (!useColorContrast) { return ''; }
  return `
    opacity: 0.87;
  `;
}

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

