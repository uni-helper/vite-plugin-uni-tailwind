import { isMp, isQuickapp } from '@uni-helper/uni-env';

export interface UniTailwindPluginUserOptions {
  /**
   * 是否应用该插件
   *
   * 默认编译为小程序和快应用时应用
   */
  shouldApply?: boolean | ((currentPlatform: string) => boolean);
  /**
   * 是否转换模板中某个 attribute
   *
   * 默认会转换模板中以 class、Class、classname、className、ClassName、class-name 结尾的 attribute
   */
  shouldTransformTemplateAttribute?: (attribute: string) => boolean;
  /** 特殊字符映射 */
  characterMap?: [string, string][];
  /** space between 元素映射 */
  spaceBetweenElements?: string[];
  /** divide width 元素映射 */
  divideWidthElements?: string[];
  /** 元素映射 */
  elementMap?: [string, string[]][];
}

export type UniTailwindPluginOptions = Omit<
  Required<UniTailwindPluginUserOptions>,
  'shouldApply'
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
 * 是否转换模板中某个 attribute
 *
 * 默认会转换模板中以 class、Class、classname、className、ClassName、class-name 结尾的 attribute
 */
export const defaultShouldTransformTemplateAttribute = (attribute: string) =>
  ['class', 'Class', 'classname', 'className', 'ClassName', 'class-name'].some((item) =>
    attribute.endsWith(item),
  );

/** 特殊字符映射 */
export const defaultCharacterMap: [string, string][] = [
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
  [',\\s', '-c-'], // comma
  [',', '-c-'], // comma
  ['\\2c\\s', '-c-'], // comma
  ['\\2c', '-c-'], // comma
  ['\\\\2c\\s', '-c-'], // comma
  ['\\\\2c', '-c-'], // comma
];

/**
 * space between 元素映射
 *
 * https://tailwindcss.com/docs/space
 */
export const defaultSpaceBetweenElements = ['view', 'button', 'text', 'image'];

/**
 * divide width 元素映射
 *
 * https://tailwindcss.com/docs/divide-width
 */
export const defaultDivideWidthElements = ['view', 'button', 'text', 'image'];

/** 元素映射 */
export const defaultElementMap: [string, string[]][] = [
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

export const defaultOptions: UniTailwindPluginOptions = {
  shouldApply: defaultShouldApply,
  shouldTransformTemplateAttribute: defaultShouldTransformTemplateAttribute,
  characterMap: defaultCharacterMap,
  spaceBetweenElements: defaultSpaceBetweenElements,
  divideWidthElements: defaultDivideWidthElements,
  elementMap: defaultElementMap,
} as const;
