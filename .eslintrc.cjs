/**
 * @type {import("eslint").ESLint.Options}
 */
module.exports = {
  root: true,
  extends: ["custom"],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"]
    },
    react: {
      version: "detect"
    }
  }
};
