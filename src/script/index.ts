import type { OutputChunk } from 'rollup';
import { defaultOptions } from '../options';
import { babelGetVendorExportMap, babelTransformScript } from '../tools';

export const isScriptFile = (fileName: string) => /.+\.js$/.test(fileName);

export const transformScript = (
  asset: OutputChunk,
  vendorExports: ReturnType<typeof babelGetVendorExportMap>,
  options = defaultOptions,
) => {
  const { fileName, code } = asset;
  if (!options.shouldTransformScript(fileName)) return code;
  return babelTransformScript(code, vendorExports, options);
};
