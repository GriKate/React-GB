module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'prettier',
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier', 'react-hooks', 'jest'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true, // одинарные кавычки
      },
    ],
    'react/prop-types': 0,
    // 'linebreak-style': ['error', 'unix'], // CRLF LF
    quotes: ['warn', 'single'], // всегда одиночные кавычки
    semi: ['warn', 'always'], // ; должна быть всегда
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
  },
  overrides: [
    {
      files: ['webpack.config.js'],
      rules: {
        '@typescript-eslint/no-var-requires': ['off'],
      },
    },
  ],
};
