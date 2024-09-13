// eslint.config.js
module.exports = [
  {
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'], // Adjust file patterns as needed
    languageOptions: {
      globals: {
        browser: true,
        commonjs: true,
        node: true,
        es6: true,
        es2017: true,
        es2018: true,
      },
      parserOptions: {
        ecmaVersion: 2022, // Use the latest ECMAScript version
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      'no-undef-init': 'error',
      'no-duplicate-case': 'error',
      'no-empty': 'error',
      'no-extra-semi': 'error',
      'no-func-assign': 'error',
      'no-irregular-whitespace': 'error',
      'no-unreachable': 'error',
      curly: 'error',
      'dot-notation': 'error',
      eqeqeq: 'error',
      'no-empty-function': 'error',
      'no-multi-spaces': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'no-trailing-spaces': 'error',
      'default-case': 'error',
      'no-fallthrough': 'error',
      'no-unused-vars': 'error',
      'no-use-before-define': 'error',
      'no-redeclare': 'error',
      'brace-style': 'error',
      indent: ['error', 2],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      radix: 'off',
      'prettier/prettier': 'error', // Enforce Prettier formatting
    },
    ignores: ['node_modules/'],
  },
  // Include Prettier config directly
  {
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
      },
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
          printWidth: 80, // Adjust as needed
        },
      ],
    },
  },
];
