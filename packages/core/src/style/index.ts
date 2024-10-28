import postcss from "postcss";
import { defaultOptions } from "../options";
import { postcssTransformSelector } from "../tools";

export const isStyleFile = (fileName: string) =>
  /.+\.(?:wx|ac|jx|tt|q|c)ss$/.test(fileName);

export const transformStyle = (source: string, options = defaultOptions) => {
  const processor = postcss().use(postcssTransformSelector(options));
  return processor.process(source).css;
};
