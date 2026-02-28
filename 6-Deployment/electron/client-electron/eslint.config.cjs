const globals = require('globals');
const react = require('eslint-plugin-react');

module.exports = [
  {
    files: ['src/**/*.js', 'src/**/*.jsx'],
    ignores: ['node_modules/**', 'build/**', 'dist/**', 'release/**'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'react/jsx-uses-vars': 'error',
    },
  },
];
