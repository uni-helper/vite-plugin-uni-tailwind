import { Plugin, Rule } from 'postcss';
import { replaceCharacters } from '../utils';
import { defaultOptions, Options } from '../options';

const postcssReplaceElements = (selector: string, options: Options) => {
  let newSelector = selector;

  const { spaceBetweenElements, divideWidthElements, elementMap } = options;
  newSelector = newSelector
    .replace(
      /^\.(-?space-\w)(-.+?)\s?>.*/,
      spaceBetweenElements
        .map((element) => `.$1$2>${element}:not([hidden]):not(:first-child)`)
        .join(','),
    )
    .replace(
      /^\.(-?space-\w-reverse).*/,
      spaceBetweenElements
        .map((element) => `.$1>${element}:not([hidden]):not(:first-child)`)
        .join(','),
    )
    // divide * https://tailwindcss.com/docs/divide-width
    .replace(
      /^\.(-?divide-\w+)(-.+?)?\s?>.*/,
      divideWidthElements
        .map((element) => `.$1$2>${element}:not([hidden]):not(:first-child)`)
        .join(','),
    )
    .replace(
      /^\.(-?divide-\w-reverse).*/,
      divideWidthElements
        .map((element) => `.$1>${element}:not([hidden]):not(:first-child)`)
        .join(','),
    );

  for (const [key, value] of elementMap) {
    newSelector = newSelector.replace(
      new RegExp(
        key === '*'
          ? // eslint-disable-next-line no-useless-escape
            `(?<![a-zA-Z-> ])\\${key}(?=[\,\s\0{])|(?<![a-zA-Z-> ])\\${key}$`
          : // eslint-disable-next-line no-useless-escape
            `(?<![a-zA-Z-> ])${key}(?=[\,\s\0{])|(?<![a-zA-Z-> ])${key}$`,
      ),
      value.join(','),
    );
  }

  return newSelector;
};

export function postcssTransformSelector(options?: Options): Plugin {
  return {
    postcssPlugin: 'uni-helper-vite-plugin-uni-tailwind-postcss-transform-selector',
    Rule(node: Rule & { processedByPostcssTransformSelector?: boolean }) {
      if (node?.processedByPostcssTransformSelector) {
        return;
      }

      let newSelector = node.selector;

      newSelector = replaceCharacters(newSelector, options ?? defaultOptions, 'postcss');

      newSelector = postcssReplaceElements(newSelector, options ?? defaultOptions);

      node.selector = newSelector;
      node.processedByPostcssTransformSelector = true;
    },
  };
}
postcssTransformSelector.postcss = true;
