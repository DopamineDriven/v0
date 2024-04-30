import baseConfig from "@dd/eslint-config";
import nextjsConfig from "@dd/eslint-config/next";
import reactConfig from "@dd/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig
];