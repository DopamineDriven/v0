import baseConfig from "@dd/eslint-config/base";
import reactConfig from "@dd/eslint-config/react";
import nextConfig from "@dd/eslint-config/next";

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  ...reactConfig,
  ...nextConfig,
  {
    ignores: ["dist/**"]
  }
];
