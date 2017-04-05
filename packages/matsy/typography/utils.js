'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.colorContrast = colorContrast;
exports.font = font;
exports.textAlign = textAlign;

var _theme = require('../theme');

function colorContrast(useColorContrast) {
  if (!useColorContrast) {
    return '';
  }
  return '\n    opacity: 0.87;\n  ';
}

function font(usePreferred) {
  return '\n    font-family: ' + (usePreferred ? _theme.typo.preferredFont : _theme.typo.performanceFont) + ';\n  ';
}

function textAlign() {
  var alignment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'left';

  return '\n    text-align: ' + alignment + ';\n  ';
}