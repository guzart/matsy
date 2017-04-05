'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var black = exports.black = 'rgb(0, 0, 0)';

var blueGrey = exports.blueGrey = {
  C50: 'rgb(236, 239, 241)',
  C100: 'rgb(207, 216, 220)',
  C200: 'rgb(176, 190, 197)',
  C300: 'rgb(144, 164, 174)',
  C400: 'rgb(120, 144, 156)',
  C500: 'rgb(96, 125, 139)',
  C600: 'rgb(84, 110, 122)',
  C700: 'rgb(69, 90, 100)',
  C800: 'rgb(55, 71, 79)',
  C900: 'rgb(38, 50, 56)'
};

var deepPurple = exports.deepPurple = {
  C50: 'rgb(237, 231, 246)',
  C100: 'rgb(209, 196, 233)',
  C200: 'rgb(179, 157, 219)',
  C300: 'rgb(149, 117, 205)',
  C400: 'rgb(126, 87, 194)',
  C500: 'rgb(103, 58, 183)',
  C600: 'rgb(94, 53, 177)',
  C700: 'rgb(81, 45, 168)',
  C800: 'rgb(69, 39, 160)',
  C900: 'rgb(49, 27, 146)',
  A100: 'rgb(179, 136, 255)',
  A200: 'rgb(124, 77, 255)',
  A400: 'rgb(101, 31, 255)',
  A700: 'rgb(98, 0, 234)'
};

var grey = exports.grey = {
  C50: 'rgb(250, 250, 250)',
  C100: 'rgb(245, 245, 245)',
  C200: 'rgb(238, 238, 238)',
  C300: 'rgb(224, 224, 224)',
  C400: 'rgb(189, 189, 189)',
  C500: 'rgb(158, 158, 158)',
  C600: 'rgb(117, 117, 117)',
  C700: 'rgb(97, 97, 97)',
  C800: 'rgb(66, 66, 66)',
  C900: 'rgb(33, 33, 33)'
};

var indigo = exports.indigo = {
  C50: 'rgb(232, 234, 246)',
  C100: 'rgb(197, 202, 233)',
  C200: 'rgb(159, 168, 218)',
  C300: 'rgb(121, 134, 203)',
  C400: 'rgb(92, 107, 192)',
  C500: 'rgb(63, 81, 181)',
  C600: 'rgb(57, 73, 171)',
  C700: 'rgb(48, 63, 159)',
  C800: 'rgb(40, 53, 147)',
  C900: 'rgb(26, 35, 126)',
  A100: 'rgb(140, 158, 255)',
  A200: 'rgb(83, 109, 254)',
  A400: 'rgb(61, 90, 254)',
  A700: 'rgb(48, 79, 254)'
};

var pink = exports.pink = { // eslint-disable-line no-unused-vars
  C50: 'rgb(252, 228, 236)',
  C100: 'rgb(248, 187, 208)',
  C200: 'rgb(244, 143, 177)',
  C300: 'rgb(240, 98, 146)',
  C400: 'rgb(236, 64, 122)',
  C500: 'rgb(233, 30, 99)',
  C600: 'rgb(216, 27, 96)',
  C700: 'rgb(194, 24, 91)',
  C800: 'rgb(173, 20, 87)',
  C900: 'rgb(136, 14, 79)',
  A100: 'rgb(255, 128, 171)',
  A200: 'rgb(255, 64, 129)',
  A400: 'rgb(245, 0, 87)',
  A700: 'rgb(197, 17, 98)'
};

var red = exports.red = {
  C50: 'rgb(255, 235, 238)',
  C100: 'rgb(255, 205, 210)',
  C200: 'rgb(239, 154, 154)',
  C300: 'rgb(229, 115, 115)',
  C400: 'rgb(239, 83, 80)',
  C500: 'rgb(244, 67, 54)',
  C600: 'rgb(229, 57, 53)',
  C700: 'rgb(211, 47, 47)',
  C800: 'rgb(198, 40, 40)',
  C900: 'rgb(183, 28, 28)',
  A100: 'rgb(255, 138, 128)',
  A200: 'rgb(255, 82, 82)',
  A400: 'rgb(255, 23, 68)',
  A700: 'rgb(213, 0, 0)'
};

var white = exports.white = 'rgb(255, 255, 255)';

var palette = {
  accent: function accent() {
    return pink.A200;
  },
  accentContrast: function accentContrast() {
    return palette.darkContrast();
  },
  darkContrast: function darkContrast() {
    return white;
  },
  lightContrast: function lightContrast() {
    return black;
  },
  primary: function primary() {
    return indigo.C500;
  },
  primaryContrast: function primaryContrast() {
    return palette.darkContrast();
  },
  primaryDark: function primaryDark() {
    return indigo.C700;
  }
};

exports.default = palette;