module.exports = {
  env: {
    node: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    strict: ['error', 'global'],
    'no-undef': 'off',
    'object-curly-newline': 'off'
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        mocha: true,
        node: true,
      },
      rules: {
        'import/no-extraneous-dependencies': ['error', {
          devDependencies: true,
        }]
      }
    }
  ],
};

