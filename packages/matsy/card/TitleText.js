'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  align-self: flex-end;\n  color: inherit;\n  display: block;\n  display: flex;\n  font-size: ', ';\n  font-weight: ', ';\n  line-height: normal;\n  margin: 0;\n  overflow: hidden;\n  transform-origin: ', ' ', ';\n'], ['\n  align-self: flex-end;\n  color: inherit;\n  display: block;\n  display: flex;\n  font-size: ', ';\n  font-weight: ', ';\n  line-height: normal;\n  margin: 0;\n  overflow: hidden;\n  transform-origin: ', ' ', ';\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Heading = require('../typography/Heading');

var _Heading2 = _interopRequireDefault(_Heading);

var _theme = require('../theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardTitleText = (0, _styledComponents2.default)(_Heading2.default)(_templateObject, _theme.card.titleFontSize, _theme.card.titleTextFontWeight, _theme.card.titleTextTransformOriginX, _theme.card.titleTextTransformOriginY);

exports.default = CardTitleText;