'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n    color: ', ';\n\n    &:focus:not(:active) {\n      background-color: ', ';\n    }\n  '], ['\n    color: ', ';\n\n    &:focus:not(:active) {\n      background-color: ', ';\n    }\n  ']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n    background-color: ', ';\n    box-shadow: none;\n    color: ', ';\n    cursor: default;\n\n    &:hover {\n      background-color: ', ';\n    }\n  '], ['\n    background-color: ', ';\n    box-shadow: none;\n    color: ', ';\n    cursor: default;\n\n    &:hover {\n      background-color: ', ';\n    }\n  ']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n      background: ', ';\n      ', '\n\n      &:active {\n        ', '\n        background-color: ', ';\n      }\n\n      &:focus:not(:active) {\n        ', '\n        background-color: ', ';\n      }\n    '], ['\n      background: ', ';\n      ', '\n\n      &:active {\n        ', '\n        background-color: ', ';\n      }\n\n      &:focus:not(:active) {\n        ', '\n        background-color: ', ';\n      }\n    ']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n    background: ', ';\n    color: ', ';\n\n    &:hover {\n      background-color: ', ';\n    }\n\n    &:active {\n      background-color: ', ';\n    }\n\n    &:focus:not(:active) {\n      background-color: ', ';\n    }\n  '], ['\n    background: ', ';\n    color: ', ';\n\n    &:hover {\n      background-color: ', ';\n    }\n\n    &:active {\n      background-color: ', ';\n    }\n\n    &:focus:not(:active) {\n      background-color: ', ';\n    }\n  ']);

exports.colored = colored;
exports.disabled = disabled;
exports.raised = raised;
exports.raisedAndColored = raisedAndColored;

var _styledComponents = require('styled-components');

var _theme = require('../theme');

var _shadow = require('../shadow');

var _shadow2 = _interopRequireDefault(_shadow);

var _mixins = require('../mixins');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function colored(props) {
  if (!props.colored) {
    return '';
  }
  return (0, _styledComponents.css)(_templateObject, _theme.button.primaryColorAlt, _theme.button.focusColorAlt);
}

function disabled(props) {
  if (!props.disabled) {
    return '';
  }
  return (0, _styledComponents.css)(_templateObject2, props.raised ? _theme.button.primaryColor : 'transparent', _theme.button.secondaryColorDisabled, props.raised ? _theme.button.primaryColor : 'transparent');
}

function raised() {
  return function (props) {
    if (!props.raised) {
      return '';
    }
    return (0, _styledComponents.css)(_templateObject3, _theme.button.primaryColor, (0, _shadow2.default)(2), (0, _shadow2.default)(4), _theme.button.activeColor, (0, _mixins.focusShadow)(), _theme.button.activeColor);
  };
}

function raisedAndColored(props) {
  if (!props.raised || !props.colored) {
    return '';
  }
  return (0, _styledComponents.css)(_templateObject4, _theme.button.primaryColorAlt, _theme.button.secondaryColorAlt, _theme.button.hoverColorAlt, _theme.button.activeColorAlt, _theme.button.activeColorAlt);
}