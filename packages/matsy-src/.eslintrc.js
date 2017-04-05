module.exports = {
  extends: [
    'airbnb/legacy',
    'plugin:import/errors'
  ],
  parser: 'babel-eslint',
  rules: {
    'import/no-extraneous-dependencies': ['error',
      { devDependencies: true }
    ],
  },
};
