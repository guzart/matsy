'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  ', '\n  ', '\n  ', '\n  margin: 0;\n  padding: 0;\n'], ['\n  ', '\n  ', '\n  ', '\n  margin: 0;\n  padding: 0;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _utils = require('./utils');

var tu = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TypographyBase(props) {
  var priority = props.priority,
      textAlign = props.textAlign,
      other = (0, _objectWithoutProperties3.default)(props, ['priority', 'textAlign']);

  return _react2.default.createElement('h' + priority, other);
}

exports.default = (0, _styledComponents2.default)(TypographyBase)(_templateObject, function (props) {
  return tu.colorContrast(props.colorContrast);
}, function (props) {
  return tu.font(props.preferredFont);
}, function (props) {
  return tu.textAlign(props.textAlign);
});