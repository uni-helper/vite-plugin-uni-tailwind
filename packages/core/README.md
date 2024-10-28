# @uni-helper/vite-plugin-uni-tailwind

<div style="display: flex; justify-content: center; align-items: center; gap: 8px;">
  <a href="https://github.com/uni-helper/vite-plugin-uni-tailwind/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/uni-helper/vite-plugin-uni-tailwind?style=for-the-badge" alt="License" />
  </a>
  <a href="https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-tailwind">
    <img src="https://img.shields.io/npm/v/%40uni-helper%2Fvite-plugin-uni-tailwind?style=for-the-badge" alt="npm" />
  </a>
  <a href="https://www.npmjs.com/package/@uni-helper/vite-plugin-uni-tailwind">
    <img src="https://img.shields.io/npm/dm/%40uni-helper%2Fvite-plugin-uni-tailwind?style=for-the-badge" alt="npm downloads" />
  </a>
</div>

支持在 uni-app 中使用 TailwindCSS v3 原有语法开发小程序。支持 Vite v2 ~ v5，要求 `node>=14.18`。

## 使用

参考 [TailwindCSS 文档](https://tailwindcss.com/) 在 `uni-app` 项目中安装配置 `TailwindCSS`。你无需禁用 `preflight`，也无需调整原有语法（如 `.w-[200.5rpx]` 等），你只需要正常书写类名，该插件会替你处理剩下的事情。

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
    // 只能在 Vite 配置文件内处理 postcss 配置
    // https://github.com/dcloudio/uni-app/issues/3367
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

### `shouldTransformAttribute`

- 类型：`(attribute: string) => boolean`
- 默认值：`转换以 class、Class、classname、className、ClassName、class-name 结尾的 attribute`

是否转换某个 `attribute`。

### `shouldTransformScript`

- 类型：`(fileName: string) => boolean`
- 默认值：`转换路径以 pages、components、layouts 开头的脚本文件`

是否转换某个脚本文件。

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
  ['@', '-at-'], // at
  ['*', '-w-'], // wildcard
  [',\\s', '-c-'], // comma
  [',', '-c-'], // comma
  ['\\2c\\s', '-c-'], // comma
  ['\\2c', '-c-'], // comma
  ['\\\\2c\\s', '-c-'], // comma
  ['\\\\2c', '-c-'], // comma
];
```

所有生成样式中特殊字符需要替换成什么字符串。

如果不替换，可能会导致无法正常运行。如果确认无需替换，请设置为空数组。

替换顺序：`directChildrenElements` -> `spaceBetweenElements` -> `divideWidthElements` -> `characterMap` -> `elementMap`。

### `spaceBetweenElements`

- 类型：`string[]`
- 默认值：`['view', 'button', 'text', 'image']`

[Space Between](https://tailwindcss.com/docs/space) 生成样式中，`*` 需要替换成什么元素。

如果不替换，可能会导致无法正常运行。如果确认无需替换，请设置为空数组。

替换顺序：`directChildrenElements` -> `spaceBetweenElements` -> `divideWidthElements` -> `characterMap` -> `elementMap`。

### `divideWidthElements`

- 类型：`string[]`
- 默认值：`['view', 'button', 'text', 'image']`

[Divide Width](https://tailwindcss.com/docs/divide-width) 生成样式中，`*` 需要替换成什么元素。

如果不替换，可能会导致无法正常运行。如果确认无需替换，请设置为空数组。

替换顺序：`directChildrenElements` -> `spaceBetweenElements` -> `divideWidthElements` -> `characterMap` -> `elementMap`。

### `directChildrenElements`

- 类型：`string[]`
- 默认值：`['view', 'button', 'text', 'image']`

[Direct Children](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-direct-children) 生成样式中，后一个 `*` 需要替换成什么元素。

如果不替换，可能会导致无法正常运行。如果确认无需替换，请设置为空数组。

替换顺序：`directChildrenElements` -> `spaceBetweenElements` -> `divideWidthElements` -> `characterMap` -> `elementMap`。

### `elementMap`

- 类型：`[string, string[]][]`
- 默认值如下

```typescript
[
  ['html', ['page']],
  ['body', ['page']],
  ['img', ['image']],
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

所有生成样式中特定元素需要替换成什么元素。

如果不替换，可能会导致无法正常运行。如果确认无需替换，请设置为空数组。

替换顺序：`directChildrenElements` -> `spaceBetweenElements` -> `divideWidthElements` -> `characterMap` -> `elementMap`。

## FAQ

### 可以支持 WindiCSS 吗？

**请注意：请不要在新项目中使用 WindiCSS！详见 [Windi CSS is Sunsetting](https://windicss.org/posts/sunsetting.html)。**

如果你没有使用 WindiCSS 内的高级功能（如 [Attributify Mode](https://windicss.org/features/attributify.html)），这个库可以正常工作。

### 可以支持 UnoCSS 吗？

**建议使用 [unocss-applet](https://github.com/unocss-applet/unocss-applet) 或 [unocss-preset-weapp](https://github.com/MellowCo/unocss-preset-weapp) 以获取更好的支持。**

如果你没有使用 UnoCSS 内的高级功能（如 [Attributify Mode](https://unocss.dev/presets/attributify)、[Tagify Mode](https://unocss.dev/presets/tagify)），这个库可以正常工作。

### 可以支持 rpx 转换吗？

引自 [微信小程序文档](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html#%E5%B0%BA%E5%AF%B8%E5%8D%95%E4%BD%8D)：

> rpx（responsive pixel）: 可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

简而言之，rpx 是一个跟屏幕宽度挂钩的响应式单位，不应该也不需要把所有用到 px 或者 rem 的地方换成 rpx。

什么时候必须要用 rpx？我个人的经验是侧边栏的宽度需要随屏幕宽度变化、页面主体根据侧边栏宽度变化时，才必须用到 rpx + flexbox 的组合，否则用 flexbox 就已经足够了。

所以，这个插件不支持 rpx 转换。你可以直接 [使用任意值](https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values)，如 `.w-[750rpx]`、`.w-[200rpx]`，我相信可以满足绝大部分的需求。

如果你悲伤地发现这没法满足你的需求，可能这个插件不适合你，请看看以下几个项目是否满足你的需求。

- [tailwind-extensions](https://www.npmjs.com/package/tailwind-extensions)
- [mini-program-tailwind](https://github.com/dcasia/mini-program-tailwind)
- [weapp-tailwindcss](https://github.com/sonofmagic/weapp-tailwindcss)
- [unocss](https://unocss.dev)
- [unocss-applet](https://github.com/unocss-applet/unocss-applet)
- [unocss-preset-weapp](https://github.com/MellowCo/unocss-preset-weapp)

### 这个插件的原理是什么？

uni-app + TailwindCSS 不能编译出小程序能正常运行的代码的错误原因有以下几种：

- 样式文件中含有不支持的字符，如 `()[]$#!/.:,%'` 等；
- 样式文件中含有不支持的元素，如 `html`, `body`、`img`、`a`、`*` 等；
- 自带组件传参，模板文件中含有不支持的字符，如 `()[]$#!/.:,%'` 等；
- 自定义组件传参，脚本文件中含有不支持的字符，如 `()[]$#!/.:,%'` 等，导致参数渲染不正常。

那么，我们只需要做到以下几点就可以让 TailwindCSS 跑在小程序中，而不需要调整 TailwindCSS 的语法来增加开发时的心智负担：

- 使用 PostCSS 改写样式文件里面的 `selector`，包括字符和元素；
- 使用 Babel 改写模板文件里面的 `class`，只包括字符，这是为了和样式文件里面的 `selector` 相匹配；
- 使用 Babel 改写脚本文件里面的 `class`，这也是为了和样式文件里面的 `selector` 相匹配。

但请注意，这个插件不是万能的。

- 插件无法突破小程序的限制，比如 `bg-[url(xxxx)]` 经过插件处理后可以正常使用，但是小程序平台不支持使用 `background-image`，此时仍然无法正常渲染出图片。
- 插件不支持特别复杂的情况，如果自定义组件传参过于复杂，仍然可能绕过插件处理。如果你发现这种情况，欢迎提交 Issue 或 PR 协助改进该插件，非常感谢！🙏

## 资源

- [改动日志](https://github.com/uni-helper/vite-plugin-uni-tailwind/tree/main/CHANGELOG.md)

## 致谢

该项目从以下项目汲取了灵感并参考了代码。在此对它们的开发者表示由衷的感谢。

- [mini-program-tailwind](https://github.com/dcasia/mini-program-tailwind)
- [weapp-tailwindcss](https://github.com/sonofmagic/weapp-tailwindcss)
- [unocss-applet](https://github.com/unocss-applet/unocss-applet)
- [unocss-preset-weapp](https://github.com/MellowCo/unocss-preset-weapp)

也感谢以下项目的开发者，如果没有他们，前端开发比现在更加困难。

- [TailwindCSS](https://tailwindcss.com/)
- [WindiCSS](https://windicss.org/)
- [UnoCSS](https://github.com/unocss/unocss)

## 贡献者们

该项目由 [ModyQyW](https://github.com/ModyQyW) 创建。

感谢 [所有贡献者](https://github.com/uni-helper/vite-plugin-uni-tailwind/graphs/contributors) 的付出！

## 赞助

如果这个包对你有所帮助，请考虑 [赞助](https://github.com/ModyQyW/sponsors) 支持，这将有利于项目持续开发和维护。

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/ModyQyW/sponsors/sponsorkit/sponsors.svg">
    <img src="https://cdn.jsdelivr.net/gh/ModyQyW/sponsors/sponsorkit/sponsors.svg"/>
  </a>
</p>
