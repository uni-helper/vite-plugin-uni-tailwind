import * as babel from '@babel/core';
import type { PluginItem } from '@babel/core';
import { replaceCharacters } from '../utils';
import { defaultOptions, type UniTailwindPluginOptions } from '../options';

type Babel = typeof babel;

// eslint-disable-next-line unicorn/better-regex
const MatchScriptsInsideClassNames = /(\{\{)(.+?)(\}\})/g;
const ReplaceMarker = '__VITE_PLUGIN_UNI_APP_TAILWIND_REPLACE__';

let _options: UniTailwindPluginOptions;

export function babelReplaceStringLiteral(instance: Babel): PluginItem {
  return {
    name: 'uni-helper-vite-plugin-uni-tailwind-babel-replace-string-literal',
    visitor: {
      StringLiteral(path) {
        const { value: raw } = path.node;
        const replaced = replaceCharacters(raw, 'template', _options);
        if (replaced !== raw) {
          path.replaceWith(instance.types.stringLiteral(replaced));
          path.skip();
        }
      },
    },
  };
}

export const babelTransformClass = (source: string, options = defaultOptions) => {
  _options = options;

  const scriptsMatchResults = [...source.matchAll(MatchScriptsInsideClassNames)];
  if (scriptsMatchResults.length === 0) return replaceCharacters(source, 'template', options);

  let newSource = source.replace(MatchScriptsInsideClassNames, `{{${ReplaceMarker}}}`);
  for (const result of scriptsMatchResults) {
    const replaced = result[0].replace(MatchScriptsInsideClassNames, '$2');
    const output = babel.transformSync(replaced, {
      generatorOpts: {
        compact: true,
        retainLines: true,
      },
      configFile: false,
      plugins: [babelReplaceStringLiteral],
    });
    if (output?.code) {
      newSource = newSource.replace(ReplaceMarker, output.code.replace(/;$/, ''));
    }
  }

  return newSource;
};
