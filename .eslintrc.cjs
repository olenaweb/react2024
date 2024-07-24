module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "react-compiler"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react-compiler/react-compiler": "error",
    "@typescript-eslint/no-explicit-any": 2,
    "no-console": 0,
    semi: ["error", "always"],
    "no-case-declarations": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "lines-between-class-members": "off",
    "@typescript-eslint/lines-between-class-members": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
