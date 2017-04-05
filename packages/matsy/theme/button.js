// @flow

import colors, { black, grey } from './colors';
import { alpha } from './utils';

const button = {
  activeColor: alpha(grey.C500, 0.4),
  activeColorAlt: colors.primary(),
  borderRadius: '2px',
  fabActiveColorAlt: colors.accent(),
  fabColorAlt: colors.accent(),
  fabFontSize: '24px',
  fabHoverColorAlt: colors.accent(),
  fabRippleColorAlt: colors.accentContrast(),
  fabSize: '56px',
  fabSizeMini: '40px',
  fabTextColorAlt: colors.accentContrast(),
  focusColor: alpha(black, 0.12),
  focusColorAlt: () => button.focusColor,
  height: '36px',
  hoverColor: () => button.primaryColor,
  hoverColorAlt: colors.primary(),
  iconColor: grey.C700,
  iconFocusColor: () => button.focusColor,
  iconSize: '32px',
  iconSizeMin: '24px',
  margin: '4px',
  minWidth: '64px',
  padding: '16px',
  primaryColor: alpha(grey.C500, 0.2),
  primaryColorAlt: colors.primary(),
  primaryColorDisabled: alpha(black, 0.12),
  rippleColorAlt: colors.primaryContrast(),
  secondaryColor: black,
  secondaryColorAlt: colors.primaryContrast(),
  secondaryColorDisabled: alpha(black, 0.26),
};

export default button;
