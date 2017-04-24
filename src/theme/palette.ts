import { black, indigo, pink, white } from './colors';

const palette = {
  accent: () => pink.A200,
  accentContrast: () => palette.darkContrast(),
  darkContrast: () => white,
  lightContrast: () => black,
  primary: () => indigo.C500,
  primaryContrast: () => palette.darkContrast(),
  primaryDark: () => indigo.C700,
};

export default palette;
