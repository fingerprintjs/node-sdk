import {
  ErrorResponse,
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

    const response = await client.deleteVisitorData(existingVisitorId)

    expect(response).toBeUndefined()
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

    await expect(client.deleteVisitorData(existingVisitorId)).rejects.toThrow(
      RequestError.fromErrorResponse(Error404 as ErrorResponse, mockResponse)
    )
  })

  it('403 error', async () => {
    const mockResponse = new Response(JSON.stringify(Error403), {
      status: 403,
      headers: { 'content-type': 'application/json' },
    })
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))

    await expect(client.deleteVisitorData(existingVisitorId)).rejects.toThrow(
      RequestError.fromErrorResponse(Error403 as ErrorResponse, mockResponse)
    )
  })

  it('400 error', async () => {
    const mockResponse = new Response(JSON.stringify(Error400), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))

    await expect(client.deleteVisitorData(existingVisitorId)).rejects.toThrow(
      RequestError.fromErrorResponse(Error400 as ErrorResponse, mockResponse)
    )
  })

  it('429 error', async () => {
    const mockResponse = new Response(JSON.stringify(Error429), {
      status: 429,
      headers: { 'content-type': 'application/json' },
    })
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))

    const expectedError = new TooManyRequestsError(Error429 as ErrorResponse, mockResponse)
    await expect(client.deleteVisitorData(existingVisitorId)).rejects.toThrow(expectedError)
  })

  it('Error with bad JSON', async () => {
    const mockResponse = new Response('(Some bad JSON)', {
      status: 404,
    })
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))

    await expect(client.deleteVisitorData(existingVisitorId)).rejects.toMatchObject(
      new SdkError(
        'Failed to parse JSON response',
        mockResponse,
        new SyntaxError('Unexpected token \'(\', "(Some bad JSON)" is not valid JSON')
      )
    )
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

    await expect(client.deleteVisitorData(existingVisitorId)).rejects.toThrow(RequestError as any)
    await expect(client.deleteVisitorData(existingVisitorId)).rejects.toThrow('Unknown error')
  })
})
