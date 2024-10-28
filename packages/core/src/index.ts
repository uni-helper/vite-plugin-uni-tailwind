import { platform } from "@uni-helper/uni-env";
import type { OutputChunk } from "rollup";
import type * as Vite from "vite";
import {
  type UniTailwindPluginOptions,
  type UniTailwindPluginUserOptions,
  defaultOptions,
} from "./options";
import { isScriptFile, transformScript } from "./script";
import { isStyleFile, transformStyle } from "./style";
import { isTemplateFile, transformTemplate } from "./template";
import { babelGetVendorExportMap } from "./tools";

export * from "./options";
export * from "./script";
export * from "./style";
export * from "./template";

export default function UniAppTailwindPlugin(
  userOptions?: UniTailwindPluginUserOptions,
): Vite.Plugin {
  const options: UniTailwindPluginOptions = {
    characterMap: userOptions?.characterMap ?? defaultOptions.characterMap,
    directChildrenElements:
      userOptions?.directChildrenElements ??
      defaultOptions.directChildrenElements,
    divideWidthElements:
      userOptions?.divideWidthElements ?? defaultOptions.divideWidthElements,
    elementMap: userOptions?.elementMap ?? defaultOptions.elementMap,
    shouldApply:
      userOptions?.shouldApply === undefined
        ? defaultOptions.shouldApply
        : typeof userOptions?.shouldApply === "boolean"
          ? userOptions.shouldApply
          : userOptions.shouldApply(platform),
    shouldTransformAttribute:
      userOptions?.shouldTransformAttribute ??
      defaultOptions.shouldTransformAttribute,
    shouldTransformScript:
      userOptions?.shouldTransformScript ??
      defaultOptions.shouldTransformScript,
    spaceBetweenElements:
      userOptions?.spaceBetweenElements ?? defaultOptions.spaceBetweenElements,
  };

  return {
    enforce: "post",
    generateBundle: (_, bundle) => {
      if (!options.shouldApply) return;

      // 解析
      const vendorKey = Object.keys(bundle).find((k) =>
        k.endsWith("vendor.js"),
      ) as string;
      const vendorExportMap = babelGetVendorExportMap(
        bundle[vendorKey] as OutputChunk,
      );

      // 转换
      for (const [fileName, asset] of Object.entries(bundle)) {
        if (asset.type === "chunk" && isScriptFile(fileName)) {
          asset.code = transformScript(asset, vendorExportMap, options);
        } else if (asset.type === "asset") {
          const { source } = asset;
          if (source && typeof source === "string") {
            let newSource = "";
            if (isTemplateFile(fileName))
              newSource = transformTemplate(source, options);
            if (isStyleFile(fileName))
              newSource = transformStyle(source, options);
            asset.source = newSource || source;
          }
        }
      }
    },
    name: "vite:uni-tailwind",
  };
}
