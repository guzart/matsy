'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  background: transparent;\n  border-radius: ', ';\n  border: none;\n  color: ', ';\n  cursor: pointer;\n  display: inline-block;\n  height: ', ';\n  line-height: ', ';\n  margin: 0;\n  min-width: ', ';\n  outline: none;\n  overflow: hidden;\n  padding: 0 ', ';\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  transition: box-shadow 0.2s ', ',\n              background-color 0.2s ', ',\n              color 0.2s ', ';\n  vertical-align: middle;\n  will-change: box-shadow;\n\n  &::-moz-focus-inner {\n    border: 0;\n  }\n\n  &:hover {\n    background-color: ', ';\n  }\n\n  &:focus:not(:active) {\n    background-color: ', ';\n  }\n\n  &:active {\n    background-color: ', ';\n  }\n\n  ', '\n  ', '\n  ', '\n'], ['\n  background: transparent;\n  border-radius: ', ';\n  border: none;\n  color: ', ';\n  cursor: pointer;\n  display: inline-block;\n  height: ', ';\n  line-height: ', ';\n  margin: 0;\n  min-width: ', ';\n  outline: none;\n  overflow: hidden;\n  padding: 0 ', ';\n  position: relative;\n  text-align: center;\n  text-decoration: none;\n  transition: box-shadow 0.2s ', ',\n              background-color 0.2s ', ',\n              color 0.2s ', ';\n  vertical-align: middle;\n  will-change: box-shadow;\n\n  &::-moz-focus-inner {\n    border: 0;\n  }\n\n  &:hover {\n    background-color: ', ';\n  }\n\n  &:focus:not(:active) {\n    background-color: ', ';\n  }\n\n  &:active {\n    background-color: ', ';\n  }\n\n  ', '\n  ', '\n  ', '\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _mixins = require('../mixins');

var _theme = require('../theme');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = _styledComponents2.default.button(_templateObject, _theme.button.borderRadius, _theme.button.secondaryColor, _theme.button.height, _theme.button.height, _theme.button.minWidth, _theme.button.padding, _theme.animation.curveFastOutLinearIn, _theme.animation.curveDefault, _theme.animation.curveDefault, _theme.button.hoverColor, _theme.button.focusColor, _theme.button.activeColor, function (props) {
  return (0, _mixins.typoButton)(props.contrast);
}, (0, _utils.colored)(), (0, _utils.submitType)());

exports.default = Button;