'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var input = {
  textBackgroundColor: 'transparent',
  textLabelColor: (0, _utils.alpha)(_colors.black, 0.26),
  textBottomBorderColor: (0, _utils.alpha)(_colors.black, 0.12),
  textHighlightColor: _colors2.default.primary,
  textDisabledColor: function textDisabledColor() {
    return input.textBottomBorderColor;
  },
  textDisabledTextColor: function textDisabledTextColor() {
    return input.textLabelColor;
  },
  textErrorColor: _colors.red.A700,
  textButtonSize: '32px',
  textExpandableIconTop: '16px',
  textFloatingLabelFontsize: '12px',
  textFontSize: '16px',
  textPadding: '4px',
  textVerticalSpacing: '20px',
  textWidth: '100%'
};

exports.default = input;