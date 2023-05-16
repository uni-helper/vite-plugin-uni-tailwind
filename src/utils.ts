import { defaultOptions } from './options';

export const replaceCharacters = (
  source: string,
  type: 'babel' | 'postcss',
  options = defaultOptions,
) => {
  let newSource = source;
  for (const [key, value] of options.characterMap) {
    const regExp = new RegExp(
      key.startsWith('\\') ? key : `${type === 'babel' ? '\\' : '\\\\\\'}${key}`,
      'g',
    );
    newSource = newSource.replace(regExp, value);
  }
  return newSource;
};
