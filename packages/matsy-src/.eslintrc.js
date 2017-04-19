module.exports = {
  extends: [
    'airbnb/legacy',
    'plugin:import/errors'
  ],
  rules: {
    'import/no-extraneous-dependencies': ['error',
      { devDependencies: true }
    ],
  },
};
