'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Display = require('./Display1');

var _Display2 = _interopRequireDefault(_Display);

var _Display3 = require('./Display2');

var _Display4 = _interopRequireDefault(_Display3);

var _Display5 = require('./Display3');

var _Display6 = _interopRequireDefault(_Display5);

var _Headline = require('./Headline');

var _Headline2 = _interopRequireDefault(_Headline);

var _Subhead = require('./Subhead');

var _Subhead2 = _interopRequireDefault(_Subhead);

var _Title = require('./Title');

var _Title2 = _interopRequireDefault(_Title);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getComponent() {
  var priority = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  switch (priority) {
    case 1:
      return _Display6.default;
    case 2:
      return _Display4.default;
    case 3:
      return _Display2.default;
    case 4:
      return _Headline2.default;
    case 5:
      return _Title2.default;
    case 6:
      return _Subhead2.default;
    default:
      return _Display6.default;
  }
}

function Heading(props) {
  var priority = props.priority,
      other = (0, _objectWithoutProperties3.default)(props, ['priority']);

  var Component = getComponent(priority);
  return _react2.default.createElement(Component, (0, _extends3.default)({}, other, { priority: priority }));
}

Heading.defaultProps = {
  priority: 1
};

exports.default = Heading;