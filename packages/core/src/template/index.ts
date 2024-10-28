import * as wxml from "@vivaxy/wxml";
import { defaultOptions } from "../options";
import { babelTransformClass } from "../tools";

export const isTemplateFile = (fileName: string) => {
  return ["wxml", "axml", "jxml", "ksml", "ttml", "qml", "xhsml", "swan"].some(
    (ext) => fileName.endsWith(ext),
  );
};

export const transformTemplate = (source: string, options = defaultOptions) => {
  const parsed = wxml.parse(source);
  wxml.traverse(parsed, (node: any) => {
    if (node?.type === wxml.NODE_TYPES.ELEMENT && node?.attributes) {
      const keys = Object.keys(node.attributes).filter((k) =>
        options.shouldTransformAttribute(k),
      );
      for (const k of keys) {
        node.attributes[k] = babelTransformClass(node.attributes[k], options);
      }
    }
  });
  return wxml.serialize(parsed);
};
