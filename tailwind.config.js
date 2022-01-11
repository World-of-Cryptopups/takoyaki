const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/renderer/**/*.tsx'],
  mode: 'jit',
  theme: {
    colors: {
      'raisin-black': '#28262C',
      'blue-bell': '#998FC7',
      'lavender-blue': '#D4C2FC',
      magnolia: '#F9F5FF',
      'resolution-blue': '#14248A',
      ...colors,
    },

    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
};
