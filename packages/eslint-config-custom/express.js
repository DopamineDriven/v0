/**@type {import("eslint/index").ESLint.ConfigData} */
export default {
  extends: ["eslint:recommended", "prettier", "turbo"],
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  rules: {
    "no-unused-vars": "off"
  },
  overrides: [
    {
      files: ["**/__tests__/**/*"],
      env: {
        jest: true
      }
    }
  ]
};
