# @uni-helper/vite-plugin-uni-tailwind

[![License](https://img.shields.io/github/license/uni-helper/vite-plugin-uni-tailwind)](https://github.com/uni-helper/vite-plugin-uni-tailwind/blob/main/LICENSE)

[![npm](https://img.shields.io/npm/v/@uni-helper/vite-plugin-uni-tailwind)](https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-tailwind)

支持在 `uni-app` 中使用 `tailwindcss@3` 原有语法开发小程序。

## 使用

参考 [tailwindcss 文档](https://tailwindcss.com/) 在 `uni-app` 项目中安装配置 `tailwindcss`。你无需禁用 `preflight`，也无需调整原有语法（如 `.w-[200.5rpx]` 等），你只需要正常书写类名，该插件会替你处理剩下的事情。

安装依赖。

```shell
npm install @uni-helper/vite-plugin-uni-tailwind -D
```

配置 `vite.config.ts`。

```typescript
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import tailwindcss from 'tailwindcss';
// @ts-ignore
import nested from 'tailwindcss/nesting';
// @ts-ignore
import postcssPresetEnv from 'postcss-preset-env';
import uniTailwind from 'vite-plugin-uni-tailwind';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [
        nested(),
        tailwindcss(),
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

你可以查看这个 [uni-app 模板项目](https://github.com/MillCloud/presets/tree/main/uni-app) 了解更多。

## 配置项 `Options`

### `apply`

- 类型：`string[]`
- 默认值：`['MP', 'QUICKAPP']`

指定运行到什么平台时需要应用该插件。`APP` 使用 `WebView` 运行，`H5` 使用浏览器运行，基本都支持特殊字符，所以默认运行到小程序和快应用时才应用该插件。

### `getShouldApply`

- 类型：`(targets: string[], current: string) => boolean;`
- 默认值如下

```typescript
const getShouldApply = (targets: string[], current: string) =>
  targets.some(
    (item) => item === current || item.startsWith(`${current}-`) || current.startsWith(`${item}-`),
  );
```

`options.apply` 会作为 `targets` 传入，`current` 会取值为 `(process.env.UNI_PLATFORM || 'H5').toUpperCase()`。用户可手动调整逻辑，判断当前平台是否需要应用该插件。

### `characterMap`

- 类型：`[string, string][]`
- 默认值如下

```typescript
[
  ['[', '-'],
  [']', '-'],
  ['(', '-'],
  [')', '-'],
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
  [',', '-c-'], // comma
  [',\\s', '-c-'], // comma
  ['\\\\2c', '-c-'], // comma
  ['\\\\2c\\s', '-c-'], // comma
];
```

应用该插件时，所有生成的样式中特殊符号需要替换成什么。如果有需要可以自定义调整。

应用替换的顺序：`characterMap` -> `spaceBetweenElements` -> `divideWidthElements` -> `elementMap`。

### `spaceBetweenElements`

- 类型：`string[]`
- 默认值：`['view', 'button', 'text', 'image']`

应用该插件时，[Space Between](https://tailwindcss.com/docs/space) 生成的样式中，`*` 需要替换成什么元素，默认替换为 `view`、`button`、`text`、`image` 四个常用元素。如果有需要可以自定义调整。

应用替换的顺序：`characterMap` -> `spaceBetweenElements` -> `divideWidthElements` -> `elementMap`。

### `divideWidthElements`

- 类型：`string[]`
- 默认值：`['view', 'button', 'text', 'image']`

应用该插件时，[Divide Width](https://tailwindcss.com/docs/divide-width) 生成的样式中，`*` 需要替换成什么元素，默认替换为 `view`、`button`、`text`、`image` 四个常用元素。如果有需要可以自定义调整。

应用替换的顺序：`characterMap` -> `spaceBetweenElements` -> `divideWidthElements` -> `elementMap`。

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

应用该插件时，所有生成的样式中特定的元素需要替换成什么元素。如果有需要可以自定义调整。

应用替换的顺序：`characterMap` -> `spaceBetweenElements` -> `divideWidthElements` -> `elementMap`。

## 原理

`uni-app` + `tailwindcss` 不能编译出小程序正常代码的错误原因有两个：

- 样式文件中含有不支持的字符，如 `[]()#!/.:,%'` 等；
- 样式文件中含有不支持的元素，如 `html`, `body`、`img`、`span`、`a`、`*` 等。

那么，我们只需要做到以下两点就可以让 `tailwindcss` 跑在小程序中，而不需要调整 `tailwindcss` 的语法来增加开发时的心智负担：

- 使用 `postcss` 改写样式文件里面的 `selector`，包括字符和元素；
- 使用 `babel` 改写模板文件里面的 `class`，只包括字符，这是为了和样式文件里面的 `selector` 相匹配。

## FAQ

### rpx 转换

![rpx](./rpx.png)

简而言之，`rpx` 是一个跟屏幕宽度挂钩的响应式单位，不应该也不需要把所有用到 `px` 或者 `rem` 的地方换成 `rpx`。

什么时候必须要用 `rpx`？我个人的经验是 `aside` 的宽度需要随屏幕宽度变化、`main` 根据 `aside` 宽度变化时，才必须用到 `rpx` + `flexbox` 的组合，否则用 `flexbox` 就已经足够了。

所以，这个插件不支持 `rpx` 转换。你可以直接 [使用任意值](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values)，如 `.w-[750rpx]`、`.w-[200rpx]`，我相信可以满足绝大部分的需求。

如果你悲伤地发现这没法满足你的需求，可能这个插件不适合你，请看看以下几个项目是否满足你的需求。你也可以看看 [tailwind-extensions](https://www.npmjs.com/package/tailwind-extensions)，它扩展了大量默认配置。

- [mini-program-tailwind](https://github.com/dcasia/mini-program-tailwind)
- [unocss-preset-applet](https://github.com/unocss-applet/unocss-applet)
- [unocss-preset-weapp](https://github.com/MellowCo/unocss-preset-weapp)

### windicss / unocss 支持

`windicss` / `unocss` 是富具创造性的项目，尽管它们都声称支持 `tailwindcss` 所有功能，但它们问世时间都较短，我相信 `tailwindcss` 是目前更为稳妥的选择。

如果 `unocss` 未来成为 `windicss@4` 的底层引擎或者直接替代了 `windicss`（请阅读 [重新构想原子化 CSS](https://antfu.me/posts/reimagine-atomic-css-zh)），我非常乐意再写一个 `unocss-preset-uni-app`（如果有必要的话）。

## 资源

- [改动日志](https://github.com/uni-helper/vite-plugin-uni-tailwind/tree/main/CHANGELOG.md)

## 致谢

该项目从以下项目汲取了灵感并参考了代码。在此对它们的开发者表示由衷的感谢。

- [mini-program-tailwind](https://github.com/dcasia/mini-program-tailwind)
- [unocss-preset-applet](https://github.com/unocss-applet/unocss-applet)
- [unocss-preset-weapp](https://github.com/MellowCo/unocss-preset-weapp)

也感谢以下项目的开发者，如果没有他们，前端开发比现在更加困难。

- [tailwindcss](https://tailwindcss.com/)
- [windicss](https://windicss.org/)
- [unocss](https://github.com/unocss/unocss)
