import type * as Vite from 'vite';
import { platform } from '@uni-helper/uni-env';
import type { OutputChunk } from 'rollup';
import { isStyleFile, transformStyle } from './style';
import { isTemplateFile, transformTemplate } from './template';
import {
  type UniTailwindPluginUserOptions,
  type UniTailwindPluginOptions,
  defaultOptions,
} from './options';
import { isScriptFile, transformScript } from './script';
import { babelGetVendorExportMap } from './tools';

export * from './options';
export * from './script';
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
    shouldTransformAttribute:
      userOptions?.shouldTransformAttribute ?? defaultOptions.shouldTransformAttribute,
    shouldTransformScript:
      userOptions?.shouldTransformScript ?? defaultOptions.shouldTransformScript,
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

      // 解析
      const vendorKey = Object.keys(bundle).find((k) => k.endsWith('vendor.js'))!;
      const vendorExportMap = babelGetVendorExportMap(bundle[vendorKey] as OutputChunk);

      // 转换
      for (const [fileName, asset] of Object.entries(bundle)) {
        if (asset.type === 'chunk' && isScriptFile(fileName)) {
          asset.code = transformScript(asset, vendorExportMap, options);
        } else if (asset.type === 'asset') {
          const { source } = asset;
          if (source && typeof source === 'string') {
            let newSource = '';
            if (isTemplateFile(fileName)) newSource = transformTemplate(source, options);
            if (isStyleFile(fileName)) newSource = transformStyle(source, options);
            asset.source = newSource || source;
          }
        }
      }
    },
  };
}
