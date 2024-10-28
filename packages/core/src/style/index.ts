import postcss from "postcss";
import { defaultOptions } from "../options";
import { postcssTransformSelector } from "../tools";

export const isStyleFile = (fileName: string) => {
  return ["wxss", "acss", "jxss", "ttss", "qss", "css"].some((ext) =>
    fileName.endsWith(ext),
  );
};

export const transformStyle = (source: string, options = defaultOptions) => {
  const processor = postcss().use(postcssTransformSelector(options));
  return processor.process(source).css;
};
