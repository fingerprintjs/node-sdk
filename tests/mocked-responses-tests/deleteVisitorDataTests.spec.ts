import {
  ServerApiError,
  FingerprintServerApiClient,
  Region,
  RequestError,
  SdkError,
  TooManyRequestsError,
} from '../../src'
import Error404 from './mocked-responses-data/errors/404_visitor_not_found.json'
import Error403 from './mocked-responses-data/errors/403_feature_not_enabled.json'
import Error400 from './mocked-responses-data/errors/400_visitor_id_invalid.json'
import Error429 from './mocked-responses-data/errors/429_too_many_requests.json'
import { getIntegrationInfo } from '../../src/urlUtils'
import { describe, expect, it } from 'vitest'
import { mockFetch } from './mockFetch'

describe('[Mocked response] Delete visitor data', () => {
  const apiKey = 'dummy_api_key'

  const existingVisitorId = 'TaDnMBz9XCpZNuSzFUqP'

  const client = new FingerprintServerApiClient({ region: Region.EU, apiKey })

  it('with visitorId', async () => {
    mockFetch.mockReturnValue(Promise.resolve(new Response(undefined, { headers: { 'content-length': '0' } })))

    await expect(client.deleteVisitorData(existingVisitorId)).resolves.toBeUndefined()

    expect(mockFetch).toHaveBeenCalledWith(
      `https://eu.api.fpjs.io/v4/visitors/${existingVisitorId}?ii=${encodeURIComponent(getIntegrationInfo())}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        method: 'DELETE',
      }
    )
  })

  it('404 error', async () => {
    const mockResponse = new Response(JSON.stringify(Error404), {
      status: 404,
      headers: { 'content-type': 'application/json' },
    })
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))

    const caught = await client.deleteVisitorData(existingVisitorId).catch((e: unknown) => e)
    expect(caught).toBeInstanceOf(ServerApiError)
    expect(caught).toMatchObject({
      message: Error404.error.message,
      errorCode: Error404.error.code,
    })
  })

  it('403 error', async () => {
    const mockResponse = new Response(JSON.stringify(Error403), {
      status: 403,
      headers: { 'content-type': 'application/json' },
    })
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))

    const caught = await client.deleteVisitorData(existingVisitorId).catch((e: unknown) => e)
    expect(caught).toBeInstanceOf(ServerApiError)
    expect(caught).toMatchObject({
      message: Error403.error.message,
      errorCode: Error403.error.code,
    })
  })

  it('400 error', async () => {
    const mockResponse = new Response(JSON.stringify(Error400), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))

    const caught = await client.deleteVisitorData(existingVisitorId).catch((e: unknown) => e)
    expect(caught).toBeInstanceOf(ServerApiError)
    expect(caught).toMatchObject({
      message: Error400.error.message,
      errorCode: Error400.error.code,
    })
  })

  it('429 error', async () => {
    const mockResponse = new Response(JSON.stringify(Error429), {
      status: 429,
      headers: { 'content-type': 'application/json' },
    })
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))

    const caught = await client.deleteVisitorData(existingVisitorId).catch((e: unknown) => e)
    expect(caught).toBeInstanceOf(TooManyRequestsError)
    expect(caught).toMatchObject({
      message: Error429.error.message,
      errorCode: Error429.error.code,
    })
  })

  it('Error with bad JSON', async () => {
    const mockResponse = new Response('(Some bad JSON)', {
      status: 404,
    })
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))

    await expect(client.deleteVisitorData(existingVisitorId)).rejects.toMatchObject({
      name: SdkError.name,
      message: 'Failed to parse JSON response',
      response: mockResponse,
      // The exact message is engine-specific, assert only the error type
      cause: expect.any(SyntaxError),
    })
  })

  it('Error with bad shape', async () => {
    const errorInfo = 'Some text instead of shaped object'
    const mockResponse = new Response(
      JSON.stringify({
        _error: errorInfo,
      }),
      {
        status: 404,
        headers: { 'content-type': 'application/json' },
      }
    )

    mockFetch.mockReturnValue(Promise.resolve(mockResponse))

    const caught = await client.deleteVisitorData(existingVisitorId).catch((e: unknown) => e)
    expect(caught).toBeInstanceOf(RequestError)
    expect(caught).not.toBeInstanceOf(ServerApiError)
    expect(caught).toMatchObject({ message: 'Unknown error' })
  })
})
