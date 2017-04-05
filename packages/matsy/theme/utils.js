'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alpha = alpha;
function alpha(color, channel) {
  return color.replace(/^rgb/, 'rgba').replace(/\)$/, ', ' + channel + ')');
}

exports.default = alpha;