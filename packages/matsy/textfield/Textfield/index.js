'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Input = require('../Input');

var _Input2 = _interopRequireDefault(_Input);

var _Label = require('../Label');

var _Label2 = _interopRequireDefault(_Label);

var _Styled = require('./Styled');

var _Styled2 = _interopRequireDefault(_Styled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noop = function noop() {};

var Textfield = function (_React$Component) {
  (0, _inherits3.default)(Textfield, _React$Component);

  function Textfield() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Textfield);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Textfield.__proto__ || (0, _getPrototypeOf2.default)(Textfield)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isFocused: false
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Textfield, [{
    key: 'blurHandler',
    value: function blurHandler(event) {
      this.setState({ isFocused: false });
      if (this.props.onBlur) {
        return this.props.onBlur(event);
      }
      return null;
    }
  }, {
    key: 'focusHandler',
    value: function focusHandler(event) {
      this.setState({ isFocused: true });
      if (this.props.onFocus) {
        return this.props.onFocus(event);
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          id = _props.id,
          label = _props.label,
          other = (0, _objectWithoutProperties3.default)(_props, ['id', 'label']);
      var isFocused = this.state.isFocused;


      return _react2.default.createElement(
        _Styled2.default,
        null,
        _react2.default.createElement(_Input2.default, (0, _extends3.default)({}, other, {
          id: id,
          isFocused: isFocused,
          onBlur: function onBlur(e) {
            return _this2.blurHandler(e);
          },
          onFocus: function onFocus(e) {
            return _this2.focusHandler(e);
          }
        })),
        _react2.default.createElement(
          _Label2.default,
          {
            htmlFor: id,
            isFocused: isFocused
          },
          label
        )
      );
    }
  }]);
  return Textfield;
}(_react2.default.Component);

Textfield.defaultProps = {
  align: 'left',
  onBlur: noop,
  onFocus: noop,
  width: undefined
};
exports.default = Textfield;