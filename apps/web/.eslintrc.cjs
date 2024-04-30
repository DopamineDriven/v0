module.exports = {
  extends: ["@dd/eslint-config"],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ['!**/*'],
  parserOptions: {
    project: true
  }
};
