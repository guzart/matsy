'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  ', '\n  background: ', ';\n  borderRadius: 2px;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  font-size: ', '\n  font-weight: 400;\n  min-height: ', ';\n  overflow: hidden;\n  position: relative;\n  width: ', ';\n  z-index: ', ';\n'], ['\n  ', '\n  background: ', ';\n  borderRadius: 2px;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  font-size: ', '\n  font-weight: 400;\n  min-height: ', ';\n  overflow: hidden;\n  position: relative;\n  width: ', ';\n  z-index: ', ';\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _theme = require('../theme');

var _shadow = require('../shadow');

var _shadow2 = _interopRequireDefault(_shadow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Card = _styledComponents2.default.div(_templateObject, function (props) {
  return (0, _shadow2.default)(props.shadow);
}, _theme.card.backgroundColor, _theme.card.fontSize, _theme.card.height, _theme.card.width, _theme.card.zIndex);

exports.default = Card;