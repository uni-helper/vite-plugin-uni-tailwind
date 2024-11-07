import * as babel from "@babel/core";
import type { PluginItem } from "@babel/core";
import type { OutputChunk } from "rollup";
import { defaultOptions } from "../options";
import { replaceCharacters, replaceUnicode } from "../utils";

type Babel = typeof babel;

export const babelTransformClass = (
  source: string,
  options = defaultOptions,
) => {
  // 进行匹配
  // eslint-disable-next-line unicorn/better-regex
  const ScriptsRegExp = /(\{\{)(.+?)(\}\})/g;
  const results = [...source.matchAll(ScriptsRegExp)];
  // 没有 {{}}，直接替换
  if (results.length === 0) {
    return replaceCharacters(
      replaceUnicode(source, "template"),
      "template",
      options,
    );
  }
  // 有 {{}}
  // 先替换 {{}} 中内容为 ReplaceMarker
  const ReplaceMarker = "__VITE_PLUGIN_UNI_APP_TAILWIND__";
  let newSource = source.replaceAll(ScriptsRegExp, `{{${ReplaceMarker}}}`);
  // 遍历处理字符
  for (const result of results) {
    // 获取 {{}} 中内容
    const input = result.input ?? result[0];
    const inside = input.replaceAll(ScriptsRegExp, "$2");
    // 处理字符
    const transformed = babel.transformSync(inside, {
      generatorOpts: {
        compact: true,
        retainLines: true,
      },
      configFile: false,
      plugins: [
        (instance: Babel): PluginItem => ({
          visitor: {
            StringLiteral(path) {
              const raw = path.node.value;
              const replaced = replaceCharacters(
                replaceUnicode(raw, "template"),
                "template",
                options,
              );
              if (replaced !== raw)
                path.replaceWith(instance.types.stringLiteral(replaced));
            },
          },
        }),
      ],
    });
    // 用处理后的内容替换 ReplaceMarker
    if (transformed?.code)
      newSource = newSource.replace(
        ReplaceMarker,
        transformed.code.replace(/;$/, "").replace(/"/g, "'"),
      );
  }
  return newSource;
};

export const babelGetVendorRenderPropsExportName = (
  vendorAsset: OutputChunk,
) => {
  let name = "";
  const { modules } = vendorAsset;
  for (const [, m] of Object.entries(modules)) {
    const { code } = m;
    if (!code || !code.includes("renderProps")) continue;
    const ast = babel.parseSync(code);
    if (!ast) continue;
    babel.traverse(ast, {
      CallExpression: (path) => {
        if (path.node.callee.type !== "Identifier") return;
        if (path.node.callee.name !== "renderProps") return;
        if (!path.parentPath.isArrowFunctionExpression()) return;
        if (!path.parentPath.parentPath.isVariableDeclarator()) return;
        if (path.parentPath.parentPath.node.id.type !== "Identifier") return;
        name = path.parentPath.parentPath.node.id.name;
        path.skip();
      },
    });
    if (name) break;
  }
  return name;
};

export const babelGetVendorExportMap = (vendorAsset: OutputChunk) => ({
  renderProps: babelGetVendorRenderPropsExportName(vendorAsset),
});

export const babelGetVendorName = (source: string) => {
  let name = "";
  const ast = babel.parseSync(source);
  if (!ast) return "";
  babel.traverse(ast, {
    StringLiteral: (path) => {
      if (!path.node.value.endsWith("vendor.js")) return;
      if (!path.parentPath.isCallExpression()) return;
      if (!path.parentPath.parentPath.isVariableDeclarator()) return;
      if (path.parentPath.parentPath.node.id.type !== "Identifier") return;
      name = path.parentPath.parentPath.node.id.name;
      path.stop();
    },
  });
  return name;
};

export const babelTransformScript = (
  source: string,
  vendorExportMap: ReturnType<typeof babelGetVendorExportMap>,
  options = defaultOptions,
) => {
  const vendorName = babelGetVendorName(source);
  if (!vendorName) return source;
  const transformed = babel.transformSync(source, {
    generatorOpts: {
      compact: true,
      retainLines: true,
    },
    configFile: false,
    plugins: [
      (instance: Babel): PluginItem => ({
        visitor: {
          StringLiteral: (path) => {
            if (!path.parentPath.isObjectProperty()) return;
            if (!path.parentPath.parentPath.isObjectExpression()) return;
            if (
              !path.parentPath.parentPath.parentPath.isCallExpression() &&
              !path.parentPath.parentPath.parentPath.isObjectProperty()
            )
              return;
            if (path.parentPath.parentPath.parentPath.isCallExpression()) {
              if (
                path.parentPath.parentPath.parentPath.node.callee.type !==
                "MemberExpression"
              )
                return;
              if (
                path.parentPath.parentPath.parentPath.node.callee.object
                  .type !== "Identifier"
              )
                return;
              if (
                path.parentPath.parentPath.parentPath.node.callee.object
                  .name !== vendorName
              )
                return;
              if (
                path.parentPath.parentPath.parentPath.node.callee.property
                  .type !== "Identifier"
              )
                return;
              if (
                path.parentPath.parentPath.parentPath.node.callee.property
                  .name !== vendorExportMap.renderProps
              )
                return;
              if (path.parentPath.node.key.type !== "StringLiteral") return;
              if (
                !options.shouldTransformAttribute(
                  path.parentPath.node.key.value,
                )
              )
                return;
            } else {
              if (
                path.parentPath.parentPath.parentPath.node.key.type !==
                "StringLiteral"
              )
                return;
              if (
                !path.parentPath.parentPath.parentPath.parentPath.isObjectExpression()
              )
                return;
              if (
                !path.parentPath.parentPath.parentPath.parentPath.parentPath.isCallExpression()
              )
                return;
              if (
                path.parentPath.parentPath.parentPath.parentPath.parentPath.node
                  .callee.type !== "MemberExpression"
              )
                return;
              if (
                path.parentPath.parentPath.parentPath.parentPath.parentPath.node
                  .callee.object.type !== "Identifier"
              )
                return;
              if (
                path.parentPath.parentPath.parentPath.parentPath.parentPath.node
                  .callee.object.name !== vendorName
              )
                return;
              if (
                path.parentPath.parentPath.parentPath.parentPath.parentPath.node
                  .callee.property.type !== "Identifier"
              )
                return;
              if (
                path.parentPath.parentPath.parentPath.parentPath.parentPath.node
                  .callee.property.name !== vendorExportMap.renderProps
              )
                return;
              if (
                !options.shouldTransformAttribute(
                  path.parentPath.parentPath.parentPath.node.key.value,
                )
              )
                return;
            }
            const raw = path.node.value;
            const replaced = replaceCharacters(
              replaceUnicode(raw, "template"),
              "template",
              options,
            );
            if (replaced !== raw)
              path.replaceWith(instance.types.stringLiteral(replaced));
          },
        },
      }),
    ],
  });
  return transformed?.code ?? source;
};
