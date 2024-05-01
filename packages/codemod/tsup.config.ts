import { relative } from "path";
import { defineConfig, Options } from "tsup";

// "!src/services/codemod/**/*.ts"
const tsupConfig = (options: Options) =>
  ({
    entry: ["src/index.ts", "src/bin/init.ts", "src/**/*.ts"],
    target: ["esnext"],
    dts: true,
    watch: process.env.NODE_ENV === "development",
    keepNames: true,
    format: ["cjs", "esm"],
    sourcemap: true,
    tsconfig: relative(process.cwd(), "tsconfig.json"),
    clean: true,
    outDir: "dist",
    // onSuccess: process.env.NODE_ENV === "development" ? "node dist/index.js" : undefined,
    ...options
  }) satisfies Options;

export default defineConfig(tsupConfig);
