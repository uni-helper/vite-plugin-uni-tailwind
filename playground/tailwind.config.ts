import type { Config } from 'tailwindcss';
import { basePreset, elementPlusPreset, miniprogramBasePreset } from 'tailwind-extensions';
import { isMp, isQuickapp } from '@uni-helper/uni-env';

const presets: Config['presets'] = [basePreset];
if (isMp || isQuickapp) {
  presets.push(
    elementPlusPreset({
      baseSelectors: [':root', 'page'],
    }),
    miniprogramBasePreset,
  );
} else {
  presets.push(elementPlusPreset());
}

const theme: Config['theme'] = {};
if (isMp || isQuickapp) theme.screens = {};

const config: Config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  presets,
  theme,
};

export default config;
