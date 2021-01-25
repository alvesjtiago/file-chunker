// .eslintrc.js
module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules'],
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/prop-types': [0],
  },
  overrides: [],
};
