'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var shadowAmbientShadowOpacity = 0.12;
var shadowKeyPenumbraOpacity = 0.14;
var shadowKeyUmbraOpacity = 0.2;

function shadow(level) {
  switch (level) {
    case 2:
      return '\n        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, ' + shadowKeyPenumbraOpacity + '),\n                    0 3px 1px -2px rgba(0, 0, 0, ' + shadowKeyUmbraOpacity + '),\n                    0 1px 5px 0 rgba(0, 0, 0, ' + shadowAmbientShadowOpacity + ');\n      ';

    case 3:
      return '\n        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, ' + shadowKeyPenumbraOpacity + '),\n                    0 3px 3px -2px rgba(0, 0, 0, ' + shadowKeyUmbraOpacity + '),\n                    0 1px 8px 0 rgba(0, 0, 0, ' + shadowAmbientShadowOpacity + ');\n      ';

    case 4:
      return '\n        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, ' + shadowKeyPenumbraOpacity + '),\n                    0 1px 10px 0 rgba(0, 0, 0, ' + shadowAmbientShadowOpacity + '),\n                    0 2px 4px -1px rgba(0, 0, 0, ' + shadowKeyUmbraOpacity + ');\n      ';

    case 6:
      return '\n        box-shadow: 0 6px 10px 0 rgba(0, 0, 0, ' + shadowKeyPenumbraOpacity + '),\n                    0 1px 18px 0 rgba(0, 0, 0, ' + shadowAmbientShadowOpacity + '),\n                    0 3px 5px -1px rgba(0, 0, 0, ' + shadowKeyUmbraOpacity + ');\n      ';

    case 8:
      return '\n        box-shadow: 0 8px 10px 1px rgba(0, 0, 0, ' + shadowKeyPenumbraOpacity + '),\n                    0 3px 14px 2px rgba(0, 0, 0, ' + shadowAmbientShadowOpacity + '),\n                    0 5px 5px -3px rgba(0, 0, 0, ' + shadowKeyUmbraOpacity + ');\n      ';

    case 16:
      return '\n        box-shadow: 0 16px 24px 2px rgba(0, 0, 0, ' + shadowKeyPenumbraOpacity + '),\n                    0  6px 30px 5px rgba(0, 0, 0, ' + shadowAmbientShadowOpacity + '),\n                    0  8px 10px -5px rgba(0, 0, 0, ' + shadowKeyUmbraOpacity + ');\n      ';

    case 24:
      return '\n        box-shadow: 0  9px 46px  8px rgba(0, 0, 0, ' + shadowKeyPenumbraOpacity + '),\n              0 11px 15px -7px rgba(0, 0, 0, ' + shadowAmbientShadowOpacity + '),\n              0 24px 38px  3px rgba(0, 0, 0, ' + shadowKeyUmbraOpacity + ');\n      ';

    default:
      return '';
  }
}

exports.default = shadow;