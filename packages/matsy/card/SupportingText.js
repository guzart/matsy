'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  border-bottom: ', ';\n  color: ', ';\n  font-size: ', ';\n  line-height: ', ';\n  overflow: hidden;\n  padding: ', ' ', ';\n  width: 90%;\n'], ['\n  border-bottom: ', ';\n  color: ', ';\n  font-size: ', ';\n  line-height: ', ';\n  overflow: hidden;\n  padding: ', ' ', ';\n  width: 90%;\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _theme = require('../theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardSupportingText = _styledComponents2.default.div(_templateObject, function (props) {
  return props.border ? '1px solid ' + _theme.card.borderColor : '0';
}, _theme.card.supportingTextTextColor, _theme.card.supportingTextFontSize, _theme.card.supportingTextLineHeight, _theme.card.verticalPadding, _theme.card.horizontalPadding);

exports.default = CardSupportingText;