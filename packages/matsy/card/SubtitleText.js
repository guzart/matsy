'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  color: ', ';\n  font-size: ', ';\n  margin: 0;\n'], ['\n  color: ', ';\n  font-size: ', ';\n  margin: 0;\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _theme = require('../theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardSubtitleText = _styledComponents2.default.div(_templateObject, _theme.card.subtitleColor, _theme.card.subtitleFontsize);

exports.default = CardSubtitleText;