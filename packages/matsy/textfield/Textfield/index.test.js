'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Textfield = require('../../../src/matty/textfield/Textfield');

var _Textfield2 = _interopRequireDefault(_Textfield);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Textfield', function () {
  var props = void 0;
  var mountedTextfield = void 0;
  var textfield = function textfield() {
    if (!mountedTextfield) {
      mountedTextfield = (0, _enzyme.mount)(_react2.default.createElement(_Textfield2.default, props));
    }
    return mountedTextfield;
  };

  beforeEach(function () {
    props = {
      id: 'txtfield',
      label: 'field'
    };
    mountedTextfield = undefined;
  });

  it('always renders a div', function () {
    var divs = textfield().find('div');
    expect(divs.length).toBeGreaterThan(0);
  });
});