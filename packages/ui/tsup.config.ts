import { relative } from "path";
import { defineConfig, type Options } from "tsup";

// prettier-ignore
const tsupConfig = (options: Options) => ({
  entry: ["src/**/*.ts", "src/**/*.tsx", "src/globals.css"],
  target: ["esnext"],
  external: ["react"],
  dts: true,
  watch: process.env.NODE_ENV === "development",
  keepNames: true,
  shims: true,
  bundle: true,
  format: ["cjs", "esm"],
  tsconfig: relative(process.cwd(), "tsconfig.json"),
  clean: true,
  outDir: "dist",
  ...options
} satisfies Options);

export default defineConfig(tsupConfig);
