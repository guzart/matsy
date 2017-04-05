module.exports = {
  extends: 'airbnb-base/legacy',
  parser: 'babel-eslint',
  rules: {
    'import/no-extraneous-dependencies': ['error',
      { devDependencies: true }
    ],
  },
  globals: {
    Promise: true,
  }
};
