// @flow

import palette, { black, white } from './colors';
import { alpha } from './utils';

const card = {
  actionsFontSize: '16px',
  backgroundColor: white,
  backgroundImageUrl: '',
  borderColor: 'rgba(0, 0, 0, .1)',
  coverImageHeight: '186px',
  fontSize: '16px',
  height: '200px',
  horizontalPadding: '16px',
  imagePlaceholderColor: palette.accent(),
  subtitleColor: alpha(black, 0.54),
  subtitleFontsize: '14px',
  supportingTextFontSize: '1rem',
  supportingTextLineHeight: '18px',
  supportingTextTextColor: black,
  textColor: black,
  titleFontSize: '24px',
  titlePerspectiveOriginX: '165px',
  titlePerspectiveOriginY: '56px',
  titleTextFontWeight: 300,
  titleTextTransformOriginX: '149px',
  titleTextTransformOriginY: '48px',
  titleTransformOriginX: '165px',
  titleTransformOriginY: '56px',
  verticalPadding: '16px',
  width: '330px',
  zIndex: 1,
};

export default card;
