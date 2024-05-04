import baseConfig from "@dd/eslint-config/base";
import nextConfig from "@dd/eslint-config/next";
import reactConfig from "@dd/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  ...reactConfig,
  ...nextConfig,
  {
    ignores: ["dist/**"]
  }
];
