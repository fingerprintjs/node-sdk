import tseslint from 'typescript-eslint'
import dxTeamConfig from '@fingerprintjs/eslint-config-dx-team/type-checked'

function withoutTypeChecking(files, extraRules = {}) {
  return {
    files,
    ...tseslint.configs.disableTypeChecked,
    languageOptions: {
      parserOptions: {
        project: false,
      },
    },
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
      '@typescript-eslint/switch-exhaustiveness-check': 'off',
      ...extraRules,
    },
  }
}

export default [
  {
    ignores: ['dist/**', 'docs/**', 'coverage/**', 'resources/**'],
  },
  ...dxTeamConfig,
  withoutTypeChecking(['*.js', 'eslint.config.mjs', 'tests/functional-tests/*.mjs', 'example/*.mjs']),
  {
    files: ['vitest.config.ts', 'generate.mts'],
    languageOptions: {
      parserOptions: {
        project: './tooling/tsconfig.json',
      },
    },
  },
  {
    files: ['generate.mts'],
    rules: {
      '@typescript-eslint/consistent-type-assertions': 'off',
    },
  },
  {
    files: ['tests/**/*.ts'],
    rules: {
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    },
  },
]
