import { defaultOptions } from '../options';
import { postcssTransformSelector } from './postcss';
import { lightningcssTransformSelector } from './lightningcss';

export const isStyleFile = (fileName: string) => /.+\.(?:wx|ac|jx|tt|q|c)ss$/.test(fileName);

export const transformStyle = async (
  fileName: string,
  source: string,
  options = defaultOptions,
) => {
  const { styleHandler } = options;
  if (styleHandler === 'postcss') {
    const postcssModule = await import('postcss');
    const postcss = postcssModule.default ?? postcssModule;
    const processor = postcss().use(postcssTransformSelector(options));
    return processor.process(source).css;
  }
  const lightningcss = await import('lightningcss');
  const transformResult = lightningcss.transform({
    filename: fileName,
    minify: true,
    code: Buffer.from(source),
    visitor: lightningcssTransformSelector(options),
  });
  return transformResult.code.toString();
};

export { postcssTransformSelector } from './postcss';
export { lightningcssTransformSelector } from './lightningcss';
