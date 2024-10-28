import { appendFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["./src/index"],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    esbuild: {
      target: "node14.18",
    },
  },
  hooks: {
    "build:done": (ctx) => {
      const { outDir } = ctx.options;
      appendFileSync(
        resolve(outDir, "index.cjs"),
        "module.exports = Object.assign(exports.default || {}, exports)",
      );
    },
  },
});
