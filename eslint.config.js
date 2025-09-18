module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'jest', 'unicorn'],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    // Consistent import/export rules
    'import/default': 'off',
    'import/no-cycle': 'error',
    'import/first': 'error',
    'import/exports-last': 'error',
    'import/no-default-export': 'error',
    'import/group-exports': 'error',
    'import/newline-after-import': 'warn',
    'import/order': 'warn',
    // FIXME: eslint-plugin-import is not compat with TS package.json exports.
    'import/no-unresolved': 'off',

    // Problematic imports (specific to MUI). See https://github.com/eftours/material-ui-gud/pull/107 for related issue
    // See https://eslint.org/docs/latest/rules/no-restricted-imports, and https://mui.com/material-ui/guides/minimizing-bundle-size/#option-one-use-path-imports for info on rule
    'no-restricted-imports': [
      'error',
      {
        paths: ['@mui/icons-material'],
        patterns: ['@mui/*/*/*', '!@mui/core/test-utils/*'],
      },
    ],

    // Variable naming conventions.
    // FIXME: Add more intentional rules around interface, class, etc naming
    '@typescript-eslint/naming-convention': [
      'error',
      // API requests, 3rd-party deps, etc. all require this to be unchecked
      {
        selector: 'objectLiteralProperty',
        format: null,
      },
      // NoSQL-like documents may have _id and let it be
      {
        selector: ['typeProperty'],
        filter: '_id',
        format: null,
      },
      // Function parameters can use leading underscores because we don't control 3rd-party deps
      {
        selector: 'parameter',
        modifiers: ['unused'],
        leadingUnderscore: 'allow',
        format: ['camelCase'],
      },
      // Everything else should be camelCase, PascalCase, or UPPER_CASE
      {
        selector: 'default',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
    ],

    // Filename conventions
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],

    // Typescript misc
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    // FIXME: eslint/no-explicit-any should eventually be an error
    '@typescript-eslint/no-explicit-any': 'warn',
    'default-case': 'error',

    // Misc eslint
    'no-console': 'error',
  },
  overrides: [
    {
      // apply eslint plugin:testing-library only to testing files.
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:jest/recommended'],
      plugins: ['jest'],
      rules: {
        'import/no-unresolved': 'off',
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  ignorePatterns: ['build', 'dist', '__mocks__'],
};
