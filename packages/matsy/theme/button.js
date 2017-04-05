'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var button = {
  activeColor: (0, _utils.alpha)(_colors.grey.C500, 0.4),
  activeColorAlt: _colors2.default.primary(),
  borderRadius: '2px',
  fabActiveColorAlt: _colors2.default.accent(),
  fabColorAlt: _colors2.default.accent(),
  fabFontSize: '24px',
  fabHoverColorAlt: _colors2.default.accent(),
  fabRippleColorAlt: _colors2.default.accentContrast(),
  fabSize: '56px',
  fabSizeMini: '40px',
  fabTextColorAlt: _colors2.default.accentContrast(),
  focusColor: (0, _utils.alpha)(_colors.black, 0.12),
  focusColorAlt: function focusColorAlt() {
    return button.focusColor;
  },
  height: '36px',
  hoverColor: function hoverColor() {
    return button.primaryColor;
  },
  hoverColorAlt: _colors2.default.primary(),
  iconColor: _colors.grey.C700,
  iconFocusColor: function iconFocusColor() {
    return button.focusColor;
  },
  iconSize: '32px',
  iconSizeMin: '24px',
  margin: '4px',
  minWidth: '64px',
  padding: '16px',
  primaryColor: (0, _utils.alpha)(_colors.grey.C500, 0.2),
  primaryColorAlt: _colors2.default.primary(),
  primaryColorDisabled: (0, _utils.alpha)(_colors.black, 0.12),
  rippleColorAlt: _colors2.default.primaryContrast(),
  secondaryColor: _colors.black,
  secondaryColorAlt: _colors2.default.primaryContrast(),
  secondaryColorDisabled: (0, _utils.alpha)(_colors.black, 0.26)
};

exports.default = button;