'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styled = require('./styled');

var _styled2 = _interopRequireDefault(_styled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Button(props) {
  return _react2.default.createElement(_styled2.default, props);
}

Button.defaultProps = {
  type: 'button'
};

exports.default = Button;