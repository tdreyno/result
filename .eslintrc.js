module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "tree-shaking"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": 0,
    semi: ["error", "never"],
    "@typescript-eslint/member-delimiter-style": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "tree-shaking/no-side-effects-in-initialization": 2,
  },
}
