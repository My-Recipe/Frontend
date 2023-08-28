module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-hooks/recommended', 'prettier', 'plugin:storybook/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-console': ["warn", { allow: ["warn", "error"] }],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react-hooks/exhaustive-deps": 'off'
  },
};
