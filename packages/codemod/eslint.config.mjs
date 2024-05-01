import baseConfig from "@dd/eslint-config/base";

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  {
    ignores: ["dist/**"]
  }
];
