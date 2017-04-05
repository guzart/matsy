'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  align-items: center;\n  border-bottom: ', ';\n  box-sizing: border-box;\n  color: ', ';\n  display: block;\n  display: flex;\n  line-height: normal;\n  padding: ', ' ', ';\n  perspective-origin: ', ' ', ';\n  transform-origin: ', ' ', ';\n  ', '\n'], ['\n  align-items: center;\n  border-bottom: ', ';\n  box-sizing: border-box;\n  color: ', ';\n  display: block;\n  display: flex;\n  line-height: normal;\n  padding: ', ' ', ';\n  perspective-origin: ', ' ', ';\n  transform-origin: ', ' ', ';\n  ', '\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _theme = require('../theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardTitle = _styledComponents2.default.div(_templateObject, function (props) {
  return props.border ? '1px solid ' + _theme.card.borderColor : '0';
}, _theme.card.textColor, _theme.card.verticalPadding, _theme.card.horizontalPadding, _theme.card.titlePerspectiveOriginX, _theme.card.titlePerspectiveOriginY, _theme.card.titleTextTransformOriginX, _theme.card.titleTextTransformOriginY, function (props) {
  return props.expand ? 'flex-grow: 1;' : '';
});

exports.default = CardTitle;