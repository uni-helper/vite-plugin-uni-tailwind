import postcss from 'postcss';
import { defaultOptions } from '../options';
import { postcssTransformSelector } from './postcss';

export const isStyleFile = (fileName: string) => /.+\.(?:wx|ac|jx|tt|q|c)ss$/.test(fileName);

export const transformStyle = (source: string, options = defaultOptions) => {
  const processor = postcss().use(postcssTransformSelector(options));
  return processor.process(source).css;
};

export { postcssTransformSelector } from './postcss';
