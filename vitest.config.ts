import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    mockReset: true,
    environment: 'node',
    include: ['tests/**/*.spec.ts'],
    setupFiles: ['tests/setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      reporter: ['lcov', 'json-summary', ['text', { file: 'coverage.txt' }]],
    },
  },
})
