const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next",
    "eslint-config-turbo",
  ].map(require.resolve), parserOptions: { sourceType: "module", ecmaVersion: 2023 },
  globals: {
    React: true,
    JSX: true,
  },
  plugins: ["only-warn"],
  settings: {
    "import/resolver": {
      typescript: {
        project,
      }
    }
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
  ],
  overrides: [{ files: ["*.js?(x)", "*.ts?(x)"] }],
    // add rules configurations here
    rules: {
      "import/no-default-export": "off"
    }
};
