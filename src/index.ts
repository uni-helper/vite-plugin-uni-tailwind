import type * as Vite from 'vite';
import { platform } from '@uni-helper/uni-env';
import { isStyleFile, transformStyle } from './style';
import { isTemplateFile, transformTemplate } from './template';
import {
  type UniTailwindPluginUserOptions,
  type UniTailwindPluginOptions,
  defaultOptions,
} from './options';

export * from './options';
export * from './style';
export * from './template';

export default function UniAppTailwindPlugin(
  userOptions?: UniTailwindPluginUserOptions,
): Vite.Plugin {
  const options: UniTailwindPluginOptions = {
    shouldApply:
      userOptions?.shouldApply === undefined
        ? defaultOptions.shouldApply
        : typeof userOptions?.shouldApply === 'boolean'
        ? userOptions.shouldApply
        : userOptions.shouldApply(platform),
    shouldTransformTemplateAttribute:
      userOptions?.shouldTransformTemplateAttribute ??
      defaultOptions.shouldTransformTemplateAttribute,
    characterMap: userOptions?.characterMap ?? defaultOptions.characterMap,
    spaceBetweenElements: userOptions?.spaceBetweenElements ?? defaultOptions.spaceBetweenElements,
    divideWidthElements: userOptions?.divideWidthElements ?? defaultOptions.divideWidthElements,
    elementMap: userOptions?.elementMap ?? defaultOptions.elementMap,
  };

  return {
    name: 'vite:uni-tailwind',
    enforce: 'post',
    generateBundle: (_, bundle) => {
      if (!options.shouldApply) return;
      for (const [fileName, asset] of Object.entries(bundle)) {
        if (asset.type === 'asset') {
          const { source } = asset;
          if (source && typeof source === 'string') {
            let newSource = '';
            if (isTemplateFile(fileName)) {
              newSource = transformTemplate(source, options);
            }
            if (isStyleFile(fileName)) {
              newSource = transformStyle(source, options);
            }
            asset.source = newSource || source;
          }
        }
      }
    },
  };
}
