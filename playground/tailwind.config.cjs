const { basePreset, elementPlusPreset, miniprogramBasePreset } = require('tailwind-extensions');
const typography = require('@tailwindcss/typography');
const lineClamp = require('@tailwindcss/line-clamp');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [
    basePreset,
    elementPlusPreset({
      baseSelectors: [':root', 'page'],
    }),
    miniprogramBasePreset,
  ],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [typography, lineClamp],
  theme: {
    screens: {},
  },
};
