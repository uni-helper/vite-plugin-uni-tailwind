import { isStyleFile, transformStyle } from './style';
import { isTemplateFile, transformTemplate } from './template';
import { Options, UniAppTailwindPluginOptions, defaultOptions } from './options';
import type * as Vite from 'vite';

export * from './constants';
export * from './options';
export * from './style';
export * from './template';

export default function UniAppTailwindPlugin(options?: UniAppTailwindPluginOptions): Vite.Plugin {
  const finalOptions: Options = {
    apply: options?.apply ?? defaultOptions.apply,
    getShouldApply: options?.getShouldApply ?? defaultOptions.getShouldApply,
    characterMap: options?.characterMap ?? defaultOptions.characterMap,
    spaceBetweenElements: options?.spaceBetweenElements ?? defaultOptions.spaceBetweenElements,
    divideWidthElements: options?.divideWidthElements ?? defaultOptions.divideWidthElements,
    elementMap: options?.elementMap ?? defaultOptions.elementMap,
  };

  const shouldApply = finalOptions.getShouldApply(
    finalOptions.apply,
    (process.env.UNI_PLATFORM || 'H5').toUpperCase(),
  );

  return {
    name: 'vite:uni-tailwind',
    enforce: 'post',
    generateBundle: (_, bundle) => {
      if (!shouldApply) return;
      Object.entries(bundle).forEach(([fileName, asset]) => {
        if (asset.type === 'asset') {
          const { source } = asset;
          if (source && typeof source === 'string') {
            let newSource = '';
            if (isTemplateFile(fileName)) {
              newSource = transformTemplate(source, finalOptions);
            }
            if (isStyleFile(fileName)) {
              newSource = transformStyle(source, finalOptions);
            }
            asset.source = newSource || asset.source;
          }
        }
      });
    },
  };
}
