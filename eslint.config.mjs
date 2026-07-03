import tseslint from 'typescript-eslint'
import dxTeamConfig from '@fingerprintjs/eslint-config-dx-team/type-checked'

export default [
  {
    ignores: ['dist/**', 'docs/**', 'coverage/**', 'resources/**'],
  },
  ...dxTeamConfig,
  {
    files: ['*.js', 'eslint.config.mjs', 'tests/functional-tests/*.mjs', 'example/*.mjs'],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ['tests/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './tests/tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    },
  },
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
]
