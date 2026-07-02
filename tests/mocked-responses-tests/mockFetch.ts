import { vi } from 'vitest'

// Stubbed over the global `fetch` in tests/setup.ts, reset between tests by `mockReset` in vitest.config.ts
export const mockFetch = vi.fn<typeof fetch>()
