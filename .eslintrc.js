module.exports = {
  root: true,

  env: {
    node: true,
    browser: true,
    worker: true,
    serviceworker: true,
  },

  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': [0, { code: 200, ignoreStrings: true }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase'],
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
  },

  parserOptions: {
    ecmaVersion: 2020,
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
