import { Plugin, Rule } from 'postcss';
import { replaceCharacters, replaceUnicode, replaceElements } from '../utils';
import { defaultOptions } from '../options';

export function postcssTransformSelector(options = defaultOptions): Plugin {
  return {
    postcssPlugin: 'uni-helper-vite-plugin-uni-tailwind-postcss-transform-selector',
    Rule(node: Rule & { processedByPostcssTransformSelector?: boolean }) {
      if (node?.processedByPostcssTransformSelector) return;
      let newSelector = node.selector;
      newSelector = replaceUnicode(newSelector, 'style');
      newSelector = replaceCharacters(newSelector, 'style', options);
      newSelector = replaceElements(newSelector, options);
      node.selector = newSelector;
      node.processedByPostcssTransformSelector = true;
    },
  };
}
postcssTransformSelector.postcss = true;
