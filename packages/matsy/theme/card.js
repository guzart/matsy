'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _colors = require('./colors');

var _colors2 = _interopRequireDefault(_colors);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var card = {
  actionsFontSize: '16px',
  backgroundColor: _colors.white,
  backgroundImageUrl: '',
  borderColor: 'rgba(0, 0, 0, .1)',
  coverImageHeight: '186px',
  fontSize: '16px',
  height: '200px',
  horizontalPadding: '16px',
  imagePlaceholderColor: _colors2.default.accent(),
  subtitleColor: (0, _utils.alpha)(_colors.black, 0.54),
  subtitleFontsize: '14px',
  supportingTextFontSize: '1rem',
  supportingTextLineHeight: '18px',
  supportingTextTextColor: _colors.black,
  textColor: _colors.black,
  titleFontSize: '24px',
  titlePerspectiveOriginX: '165px',
  titlePerspectiveOriginY: '56px',
  titleTextFontWeight: 300,
  titleTextTransformOriginX: '149px',
  titleTextTransformOriginY: '48px',
  titleTransformOriginX: '165px',
  titleTransformOriginY: '56px',
  verticalPadding: '16px',
  width: '330px',
  zIndex: 1
};

exports.default = card;