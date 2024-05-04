module.exports = {
  plugins: [
    require("postcss-import")(),
    require("tailwindcss/nesting")(),
    require("tailwindcss")(),
    require("postcss-focus-visible")({
      replaceWith: "[data-focus-visible-added]"
    }),
    require("autoprefixer")()
  ]
};
