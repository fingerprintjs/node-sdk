import { afterAll, beforeEach, vi } from 'vitest'

export const mockFetch = vi.fn<typeof fetch>()

vi.stubGlobal('fetch', mockFetch)

beforeEach(() => {
  mockFetch.mockReset()
})

afterAll(() => {
  vi.unstubAllGlobals()
})
