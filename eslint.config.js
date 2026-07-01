/* eslint-disable @typescript-eslint/no-require-imports */
const dxTeamConfig = require('@fingerprintjs/eslint-config-dx-team')

module.exports = [
  {
    ignores: ['dist/**', 'docs/**', 'coverage/**', 'resources/**'],
  },
  ...dxTeamConfig,
  {
    files: ['**/*.ts', '**/*.js', '**/*.mjs'],
  },
  {
    // Test files rely on type assertions (e.g. `fetch as unknown as jest.Mock`)
    // and `any` to build mocks and exercise invalid-input paths.
    files: ['tests/**/*.ts'],
    rules: {
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]
