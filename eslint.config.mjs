import baseConfig from "@dd/eslint-config/base";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["**node_modules**"]
  },
  ...baseConfig
];
