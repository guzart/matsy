'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  background-attachment: scroll;\n  background-color: ', ';\n  background-origin: padding-box;\n  background-position: 50% 50%;\n  background-repeat: repeat;\n  background-size: cover;\n  box-sizing: border-box;\n'], ['\n  background-attachment: scroll;\n  background-color: ', ';\n  background-origin: padding-box;\n  background-position: 50% 50%;\n  background-repeat: repeat;\n  background-size: cover;\n  box-sizing: border-box;\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _theme = require('../theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardMedia = _styledComponents2.default.div(_templateObject, _theme.card.imagePlaceholderColor);

exports.default = CardMedia;