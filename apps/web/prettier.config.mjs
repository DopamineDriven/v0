/**
 * @type {(import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions &
 *       import("@ianvs/prettier-plugin-sort-imports").PrettierConfig)}
 */
export default {
  semi: true,
  singleQuote: false,
  trailingComma: "none",
  arrowParens: "avoid",
  useTabs: false,
  tabWidth: 2,
  bracketSameLine: true,
  jsxSingleQuote: true,
  bracketSpacing: true,
  quoteProps: "as-needed",
  printWidth: 80,
  tailwindConfig: "./tailwind.config.ts",
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss"
  ],
  importOrder: [    "<TYPES>",
  "^(react/(.*)$)|^(react$)",
  "^(next/(.*)$)|^(next$)",
  "<THIRD_PARTY_MODULES>",
  "",
  "<TYPES>^@dd",
  "^@dd/(.*)$",
  "",
  "<TYPES>^[.|..|~]",
  "^~/",
  "^[../]",
  "^[./]",],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.4.5"
};
