import * as wxml from '@vivaxy/wxml';
import { defaultOptions, Options } from '../options';
import { babelTransformClass } from './babel';

export { babelTransformClass };

export const isTemplateFile = (fileName: string) => /.+\.(?:wx|ax|jx|ks|tt|q)ml$/.test(fileName);

export const classNames = ['class', 'Class', 'classname', 'className', 'class-name'];

export const transformTemplate = (source: string, options?: Options) => {
  const parsed = wxml.parse(source);
  wxml.traverse(parsed, (node: any) => {
    if (node?.type === wxml.NODE_TYPES.ELEMENT && node?.attributes) {
      Object.keys(node.attributes)
        .filter((k) => classNames.includes(k) || classNames.some((c) => k.endsWith(c)))
        .forEach((k) => {
          node.attributes[k] = babelTransformClass(node.attributes[k], options ?? defaultOptions);
        });
    }
  });
  return wxml.serialize(parsed);
};
