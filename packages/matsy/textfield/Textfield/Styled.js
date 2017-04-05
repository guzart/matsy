'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n  box-sizing: border-box;\n  display: inline-block;\n  font-size: ', ';\n  margin: 0;\n  max-width: 100%;\n  padding: ', ' 0;\n  position: relative;\n  width: 300px;\n\n  ', '\n  ', '\n'], ['\n  box-sizing: border-box;\n  display: inline-block;\n  font-size: ', ';\n  margin: 0;\n  max-width: 100%;\n  padding: ', ' 0;\n  position: relative;\n  width: 300px;\n\n  ', '\n  ', '\n']);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _theme = require('../../theme');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextfieldStyle = _styledComponents2.default.div(_templateObject, _theme.input.textFontSize, _theme.input.textVerticalSpacing, (0, _utils.alignment)(), (0, _utils.width)());

// Align icon button
// .mdl-textfield--expandable .mdl-button--icon {
//   top: $input-text-expandable-icon-top;
// }

exports.default = TextfieldStyle;