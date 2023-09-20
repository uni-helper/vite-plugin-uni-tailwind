import { type Visitor, type CustomAtRules } from 'lightningcss';
import { defaultOptions } from '../options';
import { replaceCharacters, replaceElements } from '../utils';

export function lightningcssTransformSelector(options = defaultOptions): Visitor<CustomAtRules> {
  return {
    Selector(selector) {
      return selector.map((s) => {
        if (s.type === 'universal') {
          return {
            type: 'type',
            name: replaceElements('*', options),
          };
        } else if (s.type === 'class' || s.type === 'type') {
          let { name } = s;
          name = replaceCharacters(name, 'template', options);
          name = replaceElements(name, options);
          return {
            ...s,
            name,
          };
        } else {
          return s;
        }
      });
    },
  };
}
