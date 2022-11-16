import { getShouldApply } from './utils';

// 默认需要应用该插件的环境
export const Apply = ['MP', 'QUICKAPP'];

// 默认替换 * 选择器的环境判断方法
export const GetShouldApply = getShouldApply;

// 默认 uni-app 中特殊符号映射，用于替换特殊符号
export const CharacterMap: [string, string][] = [
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

// 默认 space between 元素映射
// https://tailwindcss.com/docs/space
export const SpaceBetweenElements = ['view', 'button', 'text', 'image'];

// 默认 divide width 元素映射
// https://tailwindcss.com/docs/divide-width
export const DivideWidthElements = ['view', 'button', 'text', 'image'];

// 默认 uni-app 中元素映射
export const ElementMap: [string, string[]][] = [
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
