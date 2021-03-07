module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-typescript', 'prettier'],
  env: { browser: true },
  parserOptions: {
    project: './tsconfig.lint.json',
  },
  rules: {
    'no-else-return': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/label-has-associated-control': 'off', // seems to be buggy?
  },
};
