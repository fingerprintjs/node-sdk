import { vi } from 'vitest'
import { mockFetch } from './mocked-responses-tests/mockFetch'

// Stub fetch for every test file so no test can hit the real network
vi.stubGlobal('fetch', mockFetch)
