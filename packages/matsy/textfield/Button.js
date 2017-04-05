'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  position: absolute;\n  bottom: ', ';\n'], ['\n  position: absolute;\n  bottom: ', ';\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _theme = require('../theme');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = _styledComponents2.default.div(_templateObject, _theme.input.textVerticalSpacing);

// Align icon button
// .mdl-textfield--expandable .mdl-button--icon {
//   top: $input-text-expandable-icon-top;
// }

exports.default = Button;