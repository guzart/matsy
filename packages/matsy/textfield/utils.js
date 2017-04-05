'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n        min-height: ', ';\n        min-width: ', ';\n        width: auto;\n      '], ['\n        min-height: ', ';\n        min-width: ', ';\n        width: auto;\n      ']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n      background-color: transparent;\n      border-bottom: 1px dotted ', ';\n      color: ', ';\n    '], ['\n      background-color: transparent;\n      border-bottom: 1px dotted ', ';\n      color: ', ';\n    ']),
    _templateObject3 = (0, _taggedTemplateLiteral3.default)(['\n      border-color: ', ';\n      box-shadow: none;\n    '], ['\n      border-color: ', ';\n      box-shadow: none;\n    ']),
    _templateObject4 = (0, _taggedTemplateLiteral3.default)(['\n    &:after {\n      left: 0;\n      visibility: visible;\n      width: 100%;\n    }\n  '], ['\n    &:after {\n      left: 0;\n      visibility: visible;\n      width: 100%;\n    }\n  ']);

exports.alignment = alignment;
exports.width = width;
exports.isInputDisabled = isInputDisabled;
exports.isInputInvalid = isInputInvalid;
exports.isInputFocused = isInputFocused;
exports.isLabelDirty = isLabelDirty;
exports.isLabelFocused = isLabelFocused;

var _styledComponents = require('styled-components');

var _theme = require('../theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function alignment() {
  return function (props) {
    if (props.align === 'right') {
      return 'text-align: right';
    }

    return 'text-align: left;';
  };
}

function width() {
  return function (props) {
    if (props.width === 'full') {
      return 'width: 100%';
    } else if (props.width === 'expandable') {
      return (0, _styledComponents.css)(_templateObject, _theme.input.textButtonSize, _theme.input.textButtonSize);
    }

    return '';
  };
}

// INPUT

function isInputDisabled() {
  return function (props) {
    if (!props.isDisabled) {
      return '';
    }
    return (0, _styledComponents.css)(_templateObject2, _theme.input.textDisabledColor(), _theme.input.textDisabledTextColor());
  };
}

function isInputInvalid() {
  return function (props) {
    if (!props.isInvalid) {
      return '';
    }
    return (0, _styledComponents.css)(_templateObject3, _theme.input.textErrorColor);
  };
}

function isInputFocused() {
  return function (props) {
    if (!props.isFocused) {
      return '';
    }
    return 'outline: none;';
  };
}

// LABEL

function isLabelDirty(props) {
  if (props.isDirty) {
    return 'visibility: none;';
  }
  return '';
}

function isLabelFocused(props) {
  if (!props.isFocused) {
    return '';
  }
  return (0, _styledComponents.css)(_templateObject4);
}