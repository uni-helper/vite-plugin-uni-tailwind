import { Options } from './options';

export const getShouldApply = (targets: string[], current: string) =>
  targets.some(
    (item) => item === current || item.startsWith(`${current}-`) || current.startsWith(`${item}-`),
  );

export const replaceCharacters = (source: string, options: Options, type: 'babel' | 'postcss') => {
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
