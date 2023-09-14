# @uni-helper/vite-plugin-uni-tailwind

[![License](https://img.shields.io/github/license/uni-helper/vite-plugin-uni-tailwind)](https://github.com/uni-helper/vite-plugin-uni-tailwind/blob/main/LICENSE)

[![npm](https://img.shields.io/npm/v/@uni-helper/vite-plugin-uni-tailwind)](https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-tailwind)

支持在 `uni-app` 中使用 `tailwindcss@3` 原有语法开发小程序。支持 vite v2，v3 和 v4，要求 `node >= 14.18`。

## 使用

参考 [tailwindcss 文档](https://tailwindcss.com/) 在 `uni-app` 项目中安装配置 `tailwindcss`。你无需禁用 `preflight`，也无需调整原有语法（如 `.w-[200.5rpx]` 等），你只需要正常书写类名，该插件会替你处理剩下的事情。

安装依赖。

```shell
npm install @uni-helper/vite-plugin-uni-tailwind -D
```

配置 `vite.config.ts`。

```typescript
import { defineConfig } from 'vite';
// @ts-ignore
import nested from 'tailwindcss/nesting';
import tailwindcss from 'tailwindcss';
import tailwindcssConfig from './tailwind.config.ts'; // 注意匹配实际文件
import postcssPresetEnv from 'postcss-preset-env';
import uni from '@dcloudio/vite-plugin-uni';
import uniTailwind from '@uni-helper/vite-plugin-uni-tailwind';

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
});
```

完整示例请查看 [playground](https://github.com/uni-helper/vite-plugin-uni-tailwind/tree/main/playground)。

## 配置项 `Options`

### `shouldApply`

- 类型：`boolean | ((currentPlatform: string) => boolean)`
- 默认值：`编译为小程序和快应用时应用`

是否应用该插件。

`APP` 使用 `WebView` 运行，`H5` 使用浏览器运行，基本都支持特殊字符，所以默认编译为小程序和快应用时应用该插件。

### `shouldTransformTemplateAttribute`

- 类型：`(attribute: string) => boolean`
- 默认值：`转换模板中以 class、Class、classname、className、ClassName、class-name 结尾的 attribute`

是否转换模板中某个 `attribute`。

### `characterMap`

- 类型：`[string, string][]`
- 默认值如下

```typescript
[
  ['[', '-'],
  [']', '-'],
  ['(', '-'],
  [')', '-'],
  ['$', '-v-'], // css variable
  ['#', '-h-'], // hash
  ['!', '-i-'], // important
  ['/', '-s-'], // slash
  ['.', '-d-'], // dot
  [':', '_'], // colon
  ['%', '-p-'], // percentage
  ["'", '-q-'], // quote
  ['+', '-a-'], // add
  ['=', '-e-'], // equal
  ['&', '-n-'], // and
  ['?', '-qm-'], // question mark
  [',', '-c-'], // comma
  [',\\s', '-c-'], // comma
  ['\\\\2c', '-c-'], // comma
  ['\\\\2c\\s', '-c-'], // comma
];
```

应用该插件时，所有生成样式中特殊字符需要替换成什么字符串。

如果不替换，可能会导致无法正常运行。如果确认无需替换，请设置为空数组。

替换顺序：`characterMap` -> `spaceBetweenElements` -> `divideWidthElements` -> `elementMap`。

### `spaceBetweenElements`

- 类型：`string[]`
- 默认值：`['view', 'button', 'text', 'image']`

应用该插件时，[Space Between](https://tailwindcss.com/docs/space) 生成的样式中，`*` 需要替换成什么元素。

如果不替换，可能会导致无法正常运行。如果确认无需替换，请设置为空数组。

替换顺序：`characterMap` -> `spaceBetweenElements` -> `divideWidthElements` -> `elementMap`。

### `divideWidthElements`

- 类型：`string[]`
- 默认值：`['view', 'button', 'text', 'image']`

应用该插件时，[Divide Width](https://tailwindcss.com/docs/divide-width) 生成的样式中，`*` 需要替换成什么元素。

如果不替换，可能会导致无法正常运行。如果确认无需替换，请设置为空数组。

替换顺序：`characterMap` -> `spaceBetweenElements` -> `divideWidthElements` -> `elementMap`。

### `elementMap`

- 类型：`[string, string[]][]`
- 默认值如下

```typescript
[
  ['html', ['page']],
  ['body', ['page']],
  ['img', ['image']],
  ['span', ['text']],
  ['a', ['functional-page-navigator', 'navigator']],
  [
    '*',
    [
      'page',
      'cover-image',
      'cover-view',
      'match-media',
      'movable-area',
      'movable-view',
      'scroll-view',
      'swiper',
      'swiper-item',
      'view',
      'icon',
      'progress',
      'rich-text',
      'text',
      'button',
      'checkbox',
      'checkbox-group',
      'editor',
      'form',
      'input',
      'label',
      'picker',
      'picker-view',
      'picker-view-column',
      'radio',
      'radio-group',
      'slider',
      'switch',
      'textarea',
      'functional-page-navigator',
      'navigator',
      'audio',
      'camera',
      'image',
      'live-player',
      'live-pusher',
      'video',
      'voip-room',
      'map',
      'canvas',
      'ad',
      'ad-custom',
      'official-account',
      'open-data',
      'web-view',
      'navigation-bar',
      'page-meta',
    ],
  ],
];
```

应用该插件时，所有生成样式中特定元素需要替换成什么元素。

如果不替换，可能会导致无法正常运行。如果确认无需替换，请设置为空数组。

替换顺序：`characterMap` -> `spaceBetweenElements` -> `divideWidthElements` -> `elementMap`。

## 原理

`uni-app` + `tailwindcss` 不能编译出小程序正常代码的错误原因有两个：

- 样式文件中含有不支持的字符，如 `[]()$#!/.:,%'` 等；
- 样式文件中含有不支持的元素，如 `html`, `body`、`img`、`span`、`a`、`*` 等。

那么，我们只需要做到以下两点就可以让 `tailwindcss` 跑在小程序中，而不需要调整 `tailwindcss` 的语法来增加开发时的心智负担：

- 使用 `postcss` 改写样式文件里面的 `selector`，包括字符和元素；
- 使用 `babel` 改写模板文件里面的 `class`，只包括字符，这是为了和样式文件里面的 `selector` 相匹配。

## FAQ

### windicss / unocss 支持

**请注意：请不要在新项目中使用 `windicss`！详见 [Windi CSS is Sunsetting](https://windicss.org/posts/sunsetting.html)。**

如果你没有使用 `windicss` / `unocss` 内的高级功能（如 [Attributify Mode](https://windicss.org/features/attributify.html)、[Tagify Mode](https://github.com/unocss/unocss/tree/main/packages/preset-tagify)），这个库也能正常工作。

[`unocss` 和该插件结合使用的项目参考](https://github.com/MillCloud/presets/tree/main/uni-app)

### rpx 转换

![rpx](./rpx.png)

简而言之，`rpx` 是一个跟屏幕宽度挂钩的响应式单位，不应该也不需要把所有用到 `px` 或者 `rem` 的地方换成 `rpx`。

什么时候必须要用 `rpx`？我个人的经验是 `aside` 的宽度需要随屏幕宽度变化、`main` 根据 `aside` 宽度变化时，才必须用到 `rpx` + `flexbox` 的组合，否则用 `flexbox` 就已经足够了。

所以，这个插件不支持 `rpx` 转换。你可以直接 [使用任意值](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values)，如 `.w-[750rpx]`、`.w-[200rpx]`，我相信可以满足绝大部分的需求。

如果你悲伤地发现这没法满足你的需求，可能这个插件不适合你，请看看以下几个项目是否满足你的需求。

- [tailwind-extensions](https://www.npmjs.com/package/tailwind-extensions)
- [mini-program-tailwind](https://github.com/dcasia/mini-program-tailwind)
- [unocss](https://unocss.dev)
- [unocss-applet](https://github.com/unocss-applet/unocss-applet)
- [unocss-preset-weapp](https://github.com/MellowCo/unocss-preset-weapp)

## 资源

- [改动日志](https://github.com/uni-helper/vite-plugin-uni-tailwind/tree/main/CHANGELOG.md)

## 致谢

该项目从以下项目汲取了灵感并参考了代码。在此对它们的开发者表示由衷的感谢。

- [mini-program-tailwind](https://github.com/dcasia/mini-program-tailwind)
- [unocss-applet](https://github.com/unocss-applet/unocss-applet)
- [unocss-preset-weapp](https://github.com/MellowCo/unocss-preset-weapp)

也感谢以下项目的开发者，如果没有他们，前端开发比现在更加困难。

- [tailwindcss](https://tailwindcss.com/)
- [windicss](https://windicss.org/)
- [unocss](https://github.com/unocss/unocss)
