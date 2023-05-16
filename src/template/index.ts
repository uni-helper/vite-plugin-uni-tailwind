import * as wxml from '@vivaxy/wxml';
import { defaultOptions, Options } from '../options';
import { babelTransformClass } from './babel';

export const isTemplateFile = (fileName: string) => /.+\.(?:wx|ax|jx|ks|tt|q)ml$/.test(fileName);

export const classNames = ['class', 'Class', 'classname', 'className', 'ClassName', 'class-name'];

export const transformTemplate = (source: string, options?: Options) => {
  const parsed = wxml.parse(source);
  wxml.traverse(parsed, (node: any) => {
    if (node?.type === wxml.NODE_TYPES.ELEMENT && node?.attributes) {
      const keys = Object.keys(node.attributes).filter(
        (k) => classNames.includes(k) || classNames.some((c) => k.endsWith(c)),
      );
      for (const k of keys) {
        node.attributes[k] = babelTransformClass(node.attributes[k], options ?? defaultOptions);
      }
    }
  });
  return wxml.serialize(parsed);
};

export { babelTransformClass } from './babel';
