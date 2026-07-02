/* eslint-disable @typescript-eslint/no-require-imports */
const dxTeamConfig = require('@fingerprintjs/eslint-config-dx-team')

module.exports = [
  {
    ignores: ['dist/**', 'docs/**', 'coverage/**', 'resources/**'],
  },
  ...dxTeamConfig,
  {
    // Test files rely on type assertions (e.g. `badJsonOk as unknown as Response`)
    // and `any` to build mocks and exercise invalid-input paths.
    files: ['tests/**/*.ts'],
    rules: {
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    // The codegen script legitimately relies on type assertions to bridge the
    // untyped, parsed OpenAPI YAML into openapi-typescript's typed structures.
    files: ['generate.mts'],
    rules: {
      '@typescript-eslint/consistent-type-assertions': 'off',
    },
  },
]
