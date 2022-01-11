const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/renderer/**/*.tsx'],
  mode: 'jit',
  theme: {
    colors: {
      // add other colors in here

      // import all colors for a wide range of pick
      ...colors,
    },
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
};
