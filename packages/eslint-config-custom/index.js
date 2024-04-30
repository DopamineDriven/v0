import { resolve } from "node:path";

// https://github.com/vercel/turbo/blob/04-05-feat_turborepo_support_inputs_for_file_hash_watching/examples/with-tailwind/packages/config-eslint/next.js

const project = resolve(process.cwd(), "tsconfig.json");
/**@type {import("eslint").Linter.Config} */
export default {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
    "@vercel/style-guide/eslint/browser",
    "@vercel/style-guide/eslint/react",
    "@vercel/style-guide/eslint/next",
    "eslint-config-turbo"
  ].map(val => require.resolve(val)),
  overrides: [
    {
      files: ["*.js?(x)", "*.mjs", "*.cjs"]
    }
  ],
  rules: {
    "@typescript-eslint/no-for-in-array": "off",
    "no-var": "off",
    "no-constant-condition": "off",
    "no-inner-declarations": "off",
    "@typescript-eslint/no-dynamic-delete": "off",
    "@typescript-eslint/no-base-to-string": "off",
    "@typescript-eslint/no-useless-template-literals": "off",
    "array-callback-return": "off",
    "@typescript-eslint/prefer-includes": "off",
    "no-unsafe-optional-chaining": "off",
    "no-lonely-if": "off",
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/prefer-function-type": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/consistent-indexed-object-style": "off",
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/dot-notation": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/method-signature-style": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-invalid-void-type": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-redundant-type-constituents": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
    "@typescript-eslint/no-unnecessary-type-arguments": "off",
    "@typescript-eslint/no-unnecessary-type-assertion": "off",
    "@typescript-eslint/no-unnecessary-type-constraint": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/consistent-type-exports": "off",
    "@typescript-eslint/prefer-for-of": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/prefer-optional-chain": "off",
    "@typescript-eslint/prefer-regexp-exec": "off",
    "jsx-a11y/no-autofocus": "off",
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/prefer-string-starts-ends-with": "off",
    "@typescript-eslint/prefer-ts-expect-error": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/use-unknown-in-catch-callback-variable": "off",
    camelcase: "off",
    eqeqeq: "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "react/jsx-no-leaked-render": "off",
    "func-names": "off",
    "import/named": "off",
    "import/newline-after-import": "off",
    "import/no-anonymous-default-export": "off",
    "import/no-default-export": "off",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "off",
    "import/order": "off",
    "jsx-a11y/anchor-has-content": "off",
    "jsx-a11y/iframe-has-title": "off",
    "jsx-a11y/media-has-caption": "off",
    "jsx-a11y/no-redundant-roles": "off",
    "no-async-promise-executor": "off",
    "no-console": "off",
    "no-else-return": "off",
    "no-extra-boolean-cast": "off",
    "no-implicit-coercion": "off",
    "no-unneeded-ternary": "off",
    "no-nested-ternary": "off",
    "no-param-reassign": "off",
    "no-promise-executor-return": "off",
    "no-undef": "off",
    "no-unreachable-loop": "off",
    "no-unsafe-finally": "off",
    "no-unused-vars": "off",
    "no-useless-computed-key": "off",
    "no-useless-escape": "off",
    "no-useless-return": "off",
    "object-shorthand": "off",
    "prefer-const": "off",
    "prefer-named-capture-group": "off",
    "prefer-template": "off",
    "react/button-has-type": "off",
    "react/function-component-definition": "off",
    "react/jsx-boolean-value": "off",
    "react/jsx-curly-brace-presence": "off",
    "react/jsx-key": "off",
    "react/jsx-no-useless-fragment": "off",
    "react/no-children-prop": "off",
    "react/no-unknown-property": "off",
    "react/self-closing-comp": "off",
    "tsdoc/syntax": "off",
    "unicorn/filename-case": "off",
    "unicorn/prefer-node-protocol": "off"
  },
  plugins: ["only-warn"],
  settings: {
    "import/resolver": {
      typescript: {
        project
      }
    }
  },
  env: {
    node: true,
    es6: true
  },
  globals: { React: true, JSX: true },
  ignorePatterns: [".*.js", "node_modules/", "dist/"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2023,
    project: [project, "../../tsconfig.json"]
  }
};
