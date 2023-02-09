import postcss from 'postcss';
import { defaultOptions, Options } from '../options';
import { postcssTransformSelector } from './postcss';

export const isStyleFile = (fileName: string) => /.+\.(?:wx|ac|jx|tt|q|c)ss$/.test(fileName);

export const transformStyle = (source: string, options?: Options) => {
  const processor = postcss().use(postcssTransformSelector(options ?? defaultOptions));
  return processor.process(source).css;
};

export { postcssTransformSelector } from './postcss';
