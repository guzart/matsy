import { black, grey } from 'matsy/theme/colors';
import palette from 'matsy/theme/palette';
import { alpha } from 'matsy/theme/utils';

const button = {
  activeColor: alpha(grey.C500, 0.4),
  activeColorAlt: palette.primary(),
  borderRadius: '2px',
  fabActiveColorAlt: palette.accent(),
  fabColorAlt: palette.accent(),
  fabFontSize: '24px',
  fabHoverColorAlt: palette.accent(),
  fabRippleColorAlt: palette.accentContrast(),
  fabSize: '56px',
  fabSizeMini: '40px',
  fabTextColorAlt: palette.accentContrast(),
  focusColor: alpha(black, 0.12),
  focusColorAlt: () => button.focusColor,
  height: '36px',
  hoverColor: () => button.primaryColor,
  hoverColorAlt: palette.primary(),
  iconColor: grey.C700,
  iconFocusColor: () => button.focusColor,
  iconSize: '32px',
  iconSizeMin: '24px',
  margin: '4px',
  minWidth: '64px',
  padding: '16px',
  primaryColor: alpha(grey.C500, 0.2),
  primaryColorAlt: palette.primary(),
  primaryColorDisabled: alpha(black, 0.12),
  rippleColorAlt: palette.primaryContrast(),
  secondaryColor: black,
  secondaryColorAlt: palette.primaryContrast(),
  secondaryColorDisabled: alpha(black, 0.26),
};

export default button;
