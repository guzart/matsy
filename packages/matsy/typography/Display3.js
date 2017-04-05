'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  margin-bottom: 24px;\n  margin-top: 24px;\n'], ['\n  margin-bottom: 24px;\n  margin-top: 24px;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _Base = require('./Base');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Display3(props) {
  return _react2.default.createElement(_Base2.default, (0, _extends3.default)({}, props, { priority: 3 }));
}

exports.default = (0, _styledComponents2.default)(Display3)(_templateObject);