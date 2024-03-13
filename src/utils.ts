import { defaultOptions } from './options';

export const replaceUnicode = (source: string, type: 'style' | 'template') => {
  if (type === 'style') {
    return source.replace(/^\.\\(\d{2})/, (match, p1) => {
      const count =
        Number.parseInt(String.fromCodePoint(Number.parseInt(p1, 16)), 10) - 1;
      return '.' + 'x'.repeat(count);
    });
  }
  const newSource = source.replace(/^(\d)|\s(\d)/, (match) => {
    const count = Number.parseInt(match, 10) - 1;
    return (match.startsWith(' ') ? ' ' : '') + 'x'.repeat(count);
  });
  return newSource;
};

export const replaceCharacters = (
  source: string,
  type: 'style' | 'template',
  options = defaultOptions,
) => {
  let newSource = source;
  for (const [key, value] of options.characterMap) {
    const regExp = new RegExp(
      key.startsWith('\\')
        ? key
        : `${type === 'template' ? '\\' : '\\\\\\'}${key}`,
      'g',
    );
    newSource = newSource.replace(regExp, value);
  }
  return newSource;
};

export const replaceElements = (source: string, options = defaultOptions) => {
  let newSource = source;

  const {
    directChildrenElements,
    divideWidthElements,
    elementMap,
    spaceBetweenElements,
  } = options;
  newSource = newSource
    // direct children * https://tailwindcss.com/docs/hover-focus-and-other-states#styling-direct-children
    .replace(
      /^\.(\\\*\\:.*>\s?)(\*)/,
      directChildrenElements.map((element) => `.$1${element}`).join(','),
    )
    // space * https://tailwindcss.com/docs/space
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
    newSource =
      key === '*'
        ? newSource.replace(
            new RegExp(
              `(?<![\\da-zA-Z\\-_> ])\\${key}(?=[\\,\\s\\0{])|(?<![\\da-zA-Z\\-_> ])\\${key}$`,
            ),
            value.join(','),
          )
        : newSource.replace(
            new RegExp(
              `(?<![\\da-zA-Z\\-_> ])${key}(?=[\\,\\s\\0{])|(?<![\\da-zA-Z\\-_> ])${key}$`,
            ),
            value.join(','),
          );
  }

  return newSource;
};
