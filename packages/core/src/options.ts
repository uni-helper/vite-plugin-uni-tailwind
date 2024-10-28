import { isMp, isQuickapp } from "@uni-helper/uni-env";

export interface UniTailwindPluginUserOptions {
  /** 特殊字符映射 */
  characterMap?: [string, string][];
  /** Direct children 元素映射 */
  directChildrenElements?: string[];
  /** Divide width 元素映射 */
  divideWidthElements?: string[];
  /** 元素映射 */
  elementMap?: [string, string[]][];
  /**
   * 是否应用该插件
   *
   * 默认编译为小程序和快应用时应用
   */
  shouldApply?: ((currentPlatform: string) => boolean) | boolean;
  /**
   * 是否转换某个 attribute
   *
   * 默认转换以 class、Class、classname、className、ClassName、class-name 结尾的 attribute
   */
  shouldTransformAttribute?: (attribute: string) => boolean;
  /**
   * 是否转换某个脚本文件
   *
   * 默认转换 pages、components、layouts 开头的脚本文件
   */
  shouldTransformScript?: (fileName: string) => boolean;
  /** Space between 元素映射 */
  spaceBetweenElements?: string[];
}

export type UniTailwindPluginOptions = Omit<
  Required<UniTailwindPluginUserOptions>,
  "shouldApply"
> & {
  /**
   * 是否应用该插件
   *
   * 默认编译为小程序和快应用时应用
   */
  shouldApply: boolean;
};

/**
 * 是否应用该插件
 *
 * 默认编译为小程序和快应用时应用
 */
export const defaultShouldApply = isMp || isQuickapp;

/**
 * 是否转换某个 attribute
 *
 * 默认会转换以 class、Class、classname、className、ClassName、class-name 结尾的 attribute
 */
export const defaultShouldTransformAttribute = (attribute: string) =>
  ["class", "Class", "classname", "className", "ClassName", "class-name"].some(
    (item) => attribute.endsWith(item),
  );

/**
 * 是否转换某个脚本文件
 *
 * 默认会转换路径以 pages、components、layouts 开头的脚本文件
 */
export const defaultShouldTransformScript = (fileName: string) =>
  ["pages", "components", "layouts"].some((item) => fileName.startsWith(item));

/** 特殊字符映射 */
export const defaultCharacterMap: [string, string][] = [
  ["[", "-"],
  ["]", "-"],
  ["(", "-"],
  [")", "-"],
  ["$", "-v-"], // css variable
  ["#", "-h-"], // hash
  ["!", "-i-"], // important
  ["/", "-s-"], // slash
  [".", "-d-"], // dot
  [":", "_"], // colon
  ["%", "-p-"], // percentage
  ["'", "-q-"], // quote
  ["+", "-a-"], // add
  ["=", "-e-"], // equal
  ["&", "-n-"], // and
  ["?", "-qm-"], // question mark
  ["@", "-at-"], // at
  ["*", "-w-"], // wildcard
  [",\\s", "-c-"], // comma
  [",", "-c-"], // comma
  ["\\2c\\s", "-c-"], // comma
  ["\\2c", "-c-"], // comma
  ["\\\\2c\\s", "-c-"], // comma
  ["\\\\2c", "-c-"], // comma
];

/**
 * Space between 元素映射
 *
 * https://tailwindcss.com/docs/space
 */
export const defaultSpaceBetweenElements = ["view", "button", "text", "image"];

/**
 * Divide width 元素映射
 *
 * https://tailwindcss.com/docs/divide-width
 */
export const defaultDivideWidthElements = ["view", "button", "text", "image"];

/**
 * Direct Children 元素映射
 *
 * https://tailwindcss.com/docs/hover-focus-and-other-states#styling-direct-children
 */
export const defaultDirectChildrenElements = [
  "view",
  "button",
  "text",
  "image",
];

/** 元素映射 */
export const defaultElementMap: [string, string[]][] = [
  ["html", ["page"]],
  ["body", ["page"]],
  ["img", ["image"]],
  ["a", ["functional-page-navigator", "navigator"]],
  [
    "*",
    [
      "page",
      "cover-image",
      "cover-view",
      "match-media",
      "movable-area",
      "movable-view",
      "scroll-view",
      "swiper",
      "swiper-item",
      "view",
      "icon",
      "progress",
      "rich-text",
      "text",
      "button",
      "checkbox",
      "checkbox-group",
      "editor",
      "form",
      "input",
      "label",
      "picker",
      "picker-view",
      "picker-view-column",
      "radio",
      "radio-group",
      "slider",
      "switch",
      "textarea",
      "functional-page-navigator",
      "navigator",
      "audio",
      "camera",
      "image",
      "live-player",
      "live-pusher",
      "video",
      "voip-room",
      "map",
      "canvas",
      "ad",
      "ad-custom",
      "official-account",
      "open-data",
      "web-view",
      "navigation-bar",
      "page-meta",
    ],
  ],
];

export const defaultOptions: UniTailwindPluginOptions = {
  characterMap: defaultCharacterMap,
  directChildrenElements: defaultDirectChildrenElements,
  divideWidthElements: defaultDivideWidthElements,
  elementMap: defaultElementMap,
  shouldApply: defaultShouldApply,
  shouldTransformAttribute: defaultShouldTransformAttribute,
  shouldTransformScript: defaultShouldTransformScript,
  spaceBetweenElements: defaultSpaceBetweenElements,
} as const;
