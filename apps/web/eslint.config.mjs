import baseConfig from "@dd/eslint-config/base";
import nextjsConfig from "@dd/eslint-config/next";
import reactConfig from "@dd/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [

  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  {
    ignores: [".next/cache/**"]
  }
];
/**
     {
      "rule": "@typescript-eslint/consistent-indexed-object-style",
      "severity": "off"
    },
    {
      "rule": "@typescript-eslint/consistent-type-definitions",
      "severity": "off"
    },
    { "rule": "@typescript-eslint/no-explicit-any", "severity": "off" },
    { "rule": "@typescript-eslint/consistent-type-imports", "severity": "off" }
 */
