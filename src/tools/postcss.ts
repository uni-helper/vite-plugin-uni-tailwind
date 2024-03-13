import { Plugin, Rule } from 'postcss';
import { defaultOptions } from '../options';
import { replaceCharacters, replaceElements, replaceUnicode } from '../utils';

export function postcssTransformSelector(options = defaultOptions): Plugin {
  return {
    Rule(node: Rule & { processedByPostcssTransformSelector?: boolean }) {
      if (node?.processedByPostcssTransformSelector) return;
      let newSelector = node.selector;
      newSelector = replaceUnicode(newSelector, 'style');
      newSelector = replaceElements(newSelector, options);
      newSelector = replaceCharacters(newSelector, 'style', options);
      node.selector = newSelector;
      node.processedByPostcssTransformSelector = true;
    },
    postcssPlugin:
      'uni-helper-vite-plugin-uni-tailwind-postcss-transform-selector',
  };
}
postcssTransformSelector.postcss = true;
