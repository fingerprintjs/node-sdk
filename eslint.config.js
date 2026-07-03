/* eslint-disable @typescript-eslint/no-require-imports */
const tseslint = require('typescript-eslint')
const dxTeamConfig = require('@fingerprintjs/eslint-config-dx-team/type-checked')

module.exports = [
  {
    ignores: ['dist/**', 'docs/**', 'coverage/**', 'resources/**'],
  },
  ...dxTeamConfig,
  {
    // Root-level tooling/config files are not part of any tsconfig project, so
    // opt them out of type-aware linting while keeping the base rules.
    files: ['*.js', 'vitest.config.ts', 'tests/functional-tests/*.mjs', 'example/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      parserOptions: {
        project: false,
      },
    },
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
      '@typescript-eslint/switch-exhaustiveness-check': 'off',
    },
  },
  {
    // Test files rely on type assertions (e.g. `badJsonOk as unknown as Response`)
    // and `any` to build mocks and exercise invalid-input paths.
    files: ['tests/**/*.ts'],
    rules: {
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-confusing-void-expression': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
      '@typescript-eslint/no-unnecessary-type-conversion': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
    },
  },
  {
    // The codegen script legitimately relies on type assertions to bridge the
    // untyped, parsed OpenAPI YAML into openapi-typescript's typed structures.
    // It is also not part of any tsconfig project, so opt it out of type-aware linting.
    files: ['generate.mts'],
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      parserOptions: {
        project: false,
      },
    },
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
      '@typescript-eslint/switch-exhaustiveness-check': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
    },
  },
]
