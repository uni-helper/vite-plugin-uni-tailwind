import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import tailwindcss from 'tailwindcss';
// @ts-ignore
import nested from 'tailwindcss/nesting';
// @ts-ignore
import postcssPresetEnv from 'postcss-preset-env';
import uniTailwind from '@uni-helper/vite-plugin-uni-tailwind';
import tailwindcssConfig from './tailwind.config.cjs'; // 注意匹配实际文件

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        nested(),
        tailwindcss({
          config: tailwindcssConfig,
        }),
        postcssPresetEnv({
          stage: 3,
          features: { 'nesting-rules': false },
        }),
      ],
    },
  },
  plugins: [
    uni(),
    uniTailwind({
      /* options */
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
});
