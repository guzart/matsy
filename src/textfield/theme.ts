import { black, red } from 'matsy/theme/colors';
import palette from 'matsy/theme/palette';
import { alpha } from 'matsy/theme/utils';

const input = {
  textBackgroundColor: 'transparent',
  textLabelColor: alpha(black, 0.26),
  textBottomBorderColor: alpha(black, 0.12),
  textHighlightColor: palette.primary,
  textDisabledColor: () => input.textBottomBorderColor,
  textDisabledTextColor: () => input.textLabelColor,
  textErrorColor: red.A700,
  textButtonSize: '32px',
  textExpandableIconTop: '16px',
  textFloatingLabelFontsize: '12px',
  textFontSize: '16px',
  textPadding: '4px',
  textVerticalSpacing: '20px',
  textWidth: '100%',
};

export default input;
