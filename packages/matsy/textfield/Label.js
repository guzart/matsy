'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  bottom: 0;\n  color: ', ';\n  display: block;\n  font-size: ', ';\n  left: 0;\n  overflow: hidden;\n  pointer-events: none;\n  position: absolute;\n  right: 0;\n  text-align: left;\n  top: calc(', ' + ', ');\n  white-space: nowrap;\n  width: 100%;\n\n  &:after {\n    background-color: ', ';\n    bottom: ', ';\n    content: \'\';\n    height: 2px;\n    left: 45%;\n    position: absolute;\n    visibility: hidden;\n    width: 10px;\n\n    ', '\n  }\n\n  ', '\n  ', '\n'], ['\n  bottom: 0;\n  color: ', ';\n  display: block;\n  font-size: ', ';\n  left: 0;\n  overflow: hidden;\n  pointer-events: none;\n  position: absolute;\n  right: 0;\n  text-align: left;\n  top: calc(', ' + ', ');\n  white-space: nowrap;\n  width: 100%;\n\n  &:after {\n    background-color: ', ';\n    bottom: ', ';\n    content: \'\';\n    height: 2px;\n    left: 45%;\n    position: absolute;\n    visibility: hidden;\n    width: 10px;\n\n    ', '\n  }\n\n  ', '\n  ', '\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _mixins = require('../mixins');

var _theme = require('../theme');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextfieldLabel = _styledComponents2.default.label(_templateObject, _theme.input.textLabelColor, _theme.input.textFontSize, _theme.input.textPadding, _theme.input.textVerticalSpacing, _theme.input.textHighlightColor, _theme.input.textVerticalSpacing, (0, _mixins.materialAnimationDefault)(), function (props) {
  return (0, _utils.isLabelDirty)(props);
}, function (props) {
  return (0, _utils.isLabelFocused)(props);
});

exports.default = TextfieldLabel;