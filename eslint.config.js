/* eslint-disable indent */
module.exports = [
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
    },
    languageOptions: {
      parserOptions: {
        'ecmaVersion': 2022,
      },
    },
    rules: {
      'indent': [ 
        'error',
        2
      ],
      'linebreak-style': [
        'error',
        'unix'
      ],
      'quotes': [
        'error',
        'single'
      ],
      'semi': [
        'error',
        'always'
      ],
      'no-unused-vars': 'off',
      'no-unreachable': 'off'
     },
  }
];