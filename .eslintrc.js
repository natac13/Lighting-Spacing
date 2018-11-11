module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    'rules': {
        'new-cap': ['error', {
          'capIsNewExceptions': ['Map', 'Set', 'List', 'Promise', 'express.Router'],
        }],
        'max-len': ['error', { 'code': 120, 'tabWidth': 2, 'ignoreComments': true }],
        'quote-props': ['error', 'consistent-as-needed'],
        "prefer-arrow-callback": ["error", { "allowNamedFunctions": true }],
      },
      'env': {
        'browser': true,
        'es6': true,
        'node': true,
        'jest': true,
      },
      'parserOptions': {
        'ecmaFeatures': {
          'ecmaVersion': 9,
          'jsx': true,
        },
        'sourceType': 'module',
      },
};