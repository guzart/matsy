'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  background-color: rgba(0, 0, 0, 0);\n  border-top: ', ';\n  box-sizing: border-box;\n  font-size: ', ';\n  line-height: normal;\n  padding: 8px;\n  width: 100%;\n'], ['\n  background-color: rgba(0, 0, 0, 0);\n  border-top: ', ';\n  box-sizing: border-box;\n  font-size: ', ';\n  line-height: normal;\n  padding: 8px;\n  width: 100%;\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _theme = require('../theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardActions = _styledComponents2.default.div(_templateObject, function (props) {
  return props.border ? '1px solid ' + _theme.card.borderColor : '0';
}, _theme.card.actionsFontSize);

exports.default = CardActions;