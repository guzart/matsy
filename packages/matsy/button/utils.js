'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n      color: ', ';\n      &:focus:not(:active) {\n        background-color: ', ';\n      }\n    '], ['\n      color: ', ';\n      &:focus:not(:active) {\n        background-color: ', ';\n      }\n    ']);

exports.colored = colored;
exports.submitType = submitType;

var _styledComponents = require('styled-components');

var _theme = require('../theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function colored() {
  return function (props) {
    if (!props.colored) {
      return '';
    }
    return (0, _styledComponents.css)(_templateObject, _theme.button.primaryColorAlt, _theme.button.focusColorAlt);
  };
}

function submitType() {
  return function (props) {
    if (props.type === 'submit') {
      return '-webkit-appearance:none;';
    }

    return '';
  };
}