import { Plugin, Rule } from 'postcss';
import { replaceCharacters, replaceElements } from '../utils';
import { defaultOptions } from '../options';

export function postcssTransformSelector(options = defaultOptions): Plugin {
  return {
    postcssPlugin: 'uni-helper-vite-plugin-uni-tailwind-postcss-transform-selector',
    Rule(node: Rule & { processedByPostcssTransformSelector?: boolean }) {
      if (node?.processedByPostcssTransformSelector) {
        return;
      }

      let newSelector = node.selector;

      newSelector = replaceCharacters(newSelector, 'postcss', options);

      newSelector = postcssReplaceElements(newSelector, options);

      node.selector = newSelector;
      node.processedByPostcssTransformSelector = true;
    },
  };
}
postcssTransformSelector.postcss = true;
