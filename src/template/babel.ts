import * as babel from '@babel/core';
import { PluginItem } from '@babel/core';
import { replaceCharacters } from '../utils';
import { Options } from '../options';

type Babel = typeof babel;

const MatchScriptsInsideClassNames = /(\{\{)(.+?)(\}\})/g;
const ReplaceMarker = '__VITE_PLUGIN_UNI_APP_TAILWIND_REPLACE__';

let _options: Options;

export function babelReplaceStringLiteral(instance: Babel): PluginItem {
  return {
    visitor: {
      StringLiteral(path) {
        const rawContent = path.node.value;
        const newContent = replaceCharacters(rawContent, _options, 'babel');

        if (newContent !== rawContent) {
          path.replaceWith(instance.types.stringLiteral(newContent));
          path.skip();
        }
      },
    },
  };
}

export const babelTransformClass = (source: string, options: Options) => {
  _options = options;

  const scriptsMatchResults = Array.from(source.matchAll(MatchScriptsInsideClassNames));
  if (scriptsMatchResults.length > 0) {
    source = source.replace(MatchScriptsInsideClassNames, `{{${ReplaceMarker}}}`);
  }

  source = replaceCharacters(source, options, 'babel');

  if (scriptsMatchResults.length) {
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
