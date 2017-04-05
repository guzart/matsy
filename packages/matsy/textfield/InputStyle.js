'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  background: none;\n  border: none;\n  border-bottom: 1px solid ', ';\n  color: inherit;\n  display: block;\n  font-family: ', ';\n  font-size: ', ';\n  margin: 0;\n  padding: ', ' 0;\n  text-align: left;\n  width: ', ';\n\n  &[type="number"] {\n    -moz-appearance: textfield;\n  }\n\n  &[type="number"]::-webkit-inner-spin-button,\n  &[type="number"]::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n\n  ', '\n  ', '\n  ', '\n'], ['\n  background: none;\n  border: none;\n  border-bottom: 1px solid ', ';\n  color: inherit;\n  display: block;\n  font-family: ', ';\n  font-size: ', ';\n  margin: 0;\n  padding: ', ' 0;\n  text-align: left;\n  width: ', ';\n\n  &[type="number"] {\n    -moz-appearance: textfield;\n  }\n\n  &[type="number"]::-webkit-inner-spin-button,\n  &[type="number"]::-webkit-outer-spin-button {\n    -webkit-appearance: none;\n    margin: 0;\n  }\n\n  ', '\n  ', '\n  ', '\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _theme = require('../theme');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextfieldInputStyle = _styledComponents2.default.input(_templateObject, _theme.input.textBottomBorderColor, _theme.typo.performanceFont, _theme.input.textFontSize, _theme.input.textPadding, _theme.input.textWidth, (0, _utils.isInputDisabled)(), (0, _utils.isInputFocused)(), (0, _utils.isInputInvalid)());

// textarea.mdl-textfield__input { display: block; }

exports.default = TextfieldInputStyle;