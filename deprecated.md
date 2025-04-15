# 废弃 @uni-helper/vite-plugin-uni-tailwind

今日起，我们将正式废弃 @uni-helper/vite-plugin-uni-tailwind，并建议现有应用迁移至其它类似工具。

## 背景

@uni-helper/vite-plugin-uni-tailwind 最初创建的目的是为了解决在 uni-app 中使用 TailwindCSS 时遇到的各种兼容性问题。

这个插件通过转换特殊字符和元素选择器，使得开发者可以在小程序中使用原生 TailwindCSS 语法进行开发，而无需调整原有的开发习惯。

由于 UnoCSS 和 WindiCSS 使用 class 时语法和 TailwindCSS 几乎完全一致，所以这个插件实际上也支持 UnoCSS 和 WindiCSS 使用 class 的情况。

## 为什么

### 更好的方案

随着社区的发展，已经出现了更加完善和活跃的解决方案：

- [unocss-applet](https://github.com/unocss-applet/unocss-applet)
- [unocss-preset-weapp](https://github.com/MellowCo/unocss-preset-weapp)
- [weapp-tailwindcss](https://github.com/sonofmagic/weapp-tailwindcss)

这些工具不仅提供了与我们相似的功能，还具有更多高级特性，如：

- 更好的 rpx 单位支持
- 更完善的类名转换
- 更强大的可配置性
- 更活跃的维护和更新

### 插件实现

目前，该插件的实现存在难以解决的边界情况和性能瓶颈。在现有架构下，若不进行重大重构，短期内难以添加重要的全新功能。

### 团队重心

鉴于团队成员业余时间有限，且已将大量精力投入到公司项目及其他开源项目中，我们已难以确保本插件的维护质量及响应速度。

## 这意味着什么？

这意味着我们不会

- 修改代码，包括新增功能和安全性修复；
- 接受社区贡献。

但我们仍会：

- 保持现有文档的可访问性。

**总而言之，现有项目可以继续使用，但不保证更新相关依赖后此插件仍然能正常使用。**

## 建议

对于新项目，我们建议考虑以下替代方案：

对于 UnoCSS：

- [unocss-applet](https://github.com/unocss-applet/unocss-applet)
- [unocss-preset-weapp](https://github.com/MellowCo/unocss-preset-weapp)

对于 TailwindCSS：

- [weapp-tailwindcss](https://github.com/sonofmagic/weapp-tailwindcss)

这些替代方案都有更活跃的维护团队，能够确保更可持续和可靠的开发体验。

你也可以分叉并发布自己的版本。

## 致谢

我们要衷心感谢：

- 所有使用过该插件的开发者
- 为项目提供反馈和建议的社区成员
- 项目的贡献者们
- 赞助商们的慷慨支持

同时也要特别感谢以下项目，它们为我们提供了灵感和参考：

- [mini-program-tailwind](https://github.com/dcasia/mini-program-tailwind)
- [weapp-tailwindcss](https://github.com/sonofmagic/weapp-tailwindcss)
- [unocss-applet](https://github.com/unocss-applet/unocss-applet)
- [unocss-preset-weapp](https://github.com/MellowCo/unocss-preset-weapp)

最后，感谢 [TailwindCSS](https://tailwindcss.com/)、[WindiCSS](https://windicss.org/) 和 [UnoCSS](https://github.com/unocss/unocss) 的开发者们，是他们让前端开发变得更加美好。
