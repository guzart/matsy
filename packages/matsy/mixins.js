'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n    transition-duration: ', ';\n    transition-timing-function: ', ';\n  '], ['\n    transition-duration: ', ';\n    transition-timing-function: ', ';\n  ']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n    font-family: ', ';\n  '], ['\n    font-family: ', ';\n  ']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n    font-size: 14px;\n    font-weight: 500;\n    text-transform: uppercase;\n    line-height: 1;\n    letter-spacing: 0;\n\n    ', '\n    ', '\n  '], ['\n    font-size: 14px;\n    font-weight: 500;\n    text-transform: uppercase;\n    line-height: 1;\n    letter-spacing: 0;\n\n    ', '\n    ', '\n  ']);

exports.materialAnimationDefault = materialAnimationDefault;
exports.typoPreferredFont = typoPreferredFont;
exports.typoButton = typoButton;

var _styledComponents = require('styled-components');

var _theme = require('./theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function materialAnimationDefault() {
  var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '0.2s';

  return (0, _styledComponents.css)(_templateObject, duration, _theme.animation.curveDefault);
}

function typoPreferredFont() {
  var usePreferred = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  if (!usePreferred) {
    return '';
  }
  return (0, _styledComponents.css)(_templateObject2, _theme.typo.preferredFont);
}

function typoButton() {
  var contrast = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var usePreferred = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var contrastStyle = contrast ? 'opacity: 0.87;' : '';
  return (0, _styledComponents.css)(_templateObject3, typoPreferredFont(usePreferred), contrastStyle);
}