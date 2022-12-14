import {
  Apply,
  GetShouldApply,
  SpaceBetweenElements,
  DivideWidthElements,
  ElementMap,
  CharacterMap,
} from './constants';

export interface UniAppTailwindPluginOptions {
  /** 需要应用该插件的环境 */
  apply?: string[];
  /** 应用该插件的环境判断方法 */
  getShouldApply?: (targets: string[], current: string) => boolean;
  /** Space between 元素映射 */
  spaceBetweenElements?: string[];
  /** Divide width 元素映射 */
  divideWidthElements?: string[];
  /** Uni-app 中元素映射 */
  elementMap?: [string, string[]][];
  /** 特殊符号映射 */
  characterMap?: [string, string][];
}

export type Options = Required<UniAppTailwindPluginOptions>;

export const defaultOptions = {
  apply: Apply,
  getShouldApply: GetShouldApply,
  spaceBetweenElements: SpaceBetweenElements,
  divideWidthElements: DivideWidthElements,
  elementMap: ElementMap,
  characterMap: CharacterMap,
} as const;
