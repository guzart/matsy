module.exports = {
  extends: [
    'airbnb',
    'plugin:import/errors'
  ],
  rules: {
    'comma-dangle': ['error', 'never'],
    'import/no-extraneous-dependencies': ['error',
      { devDependencies: true }
    ],
  },
};
