import { defaultOptions } from './options';

export const replaceCharacters = (
  source: string,
  type: 'template' | 'style',
  options = defaultOptions,
) => {
  let newSource = source;
  for (const [key, value] of options.characterMap) {
    const regExp = new RegExp(
      key.startsWith('\\') ? key : `${type === 'template' ? '\\' : '\\\\\\'}${key}`,
      'g',
    );
    newSource = newSource.replace(regExp, value);
  }
  return newSource;
};

export const replaceElements = (source: string, options = defaultOptions) => {
  let newSource = source;

  const { spaceBetweenElements, divideWidthElements, elementMap } = options;
  newSource = newSource
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
    newSource = newSource.replace(
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

  return newSource;
};
