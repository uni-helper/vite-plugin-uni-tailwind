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
    visitor: {
      StringLiteral(path) {
        const rawContent = path.node.value;
        const newContent = replaceCharacters(rawContent, 'babel', _options);

        if (newContent !== rawContent) {
          path.replaceWith(instance.types.stringLiteral(newContent));
          path.skip();
        }
      },
    },
  };
}

export const babelTransformClass = (source: string, options = defaultOptions) => {
  _options = options;

  const scriptsMatchResults = [...source.matchAll(MatchScriptsInsideClassNames)];
  if (scriptsMatchResults.length > 0) {
    source = source.replace(MatchScriptsInsideClassNames, `{{${ReplaceMarker}}}`);
  }

  source = replaceCharacters(source, 'babel', options);

  if (scriptsMatchResults.length > 0) {
    for (const script of scriptsMatchResults) {
      const scriptContent = script[0].replace(MatchScriptsInsideClassNames, '$2');

      const output = babel.transformSync(scriptContent, {
        generatorOpts: {
          compact: true,
          retainLines: true,
        },
        configFile: false,
        plugins: [babelReplaceStringLiteral],
      });

      if (output?.code) {
        source = source.replace(ReplaceMarker, output.code.replace(/;$/, ''));
      }
    }
  }

  return source;
};
