import {
  ServerApiError,
  RequestError,
  FingerprintServerApiClient,
  Region,
  Options,
  EventUpdate,
  SdkError,
  ErrorResponse,
} from '../../src'
import { describe, expect, it, vi } from 'vitest'

describe('ServerApiClient', () => {
  it('should throw error if no token provided', () => {
    expect(() => {
      new FingerprintServerApiClient({} as Readonly<Options>)
    }).toThrow('Api key is not set')
  })

  it('should support passing custom fetch implementation', async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({}), { headers: { 'content-type': 'application/json' } }))

    const client = new FingerprintServerApiClient({
      fetch: mockFetch,
      apiKey: 'test',
      region: Region.Global,
    })

    await client.getEvent('eventId')

    expect(mockFetch).toHaveBeenCalledTimes(1)
  })

  it('errors should return response that supports body related methods', async () => {
    const responseBody = {
      error: {
        code: 'FeatureNotEnabled',
        message: 'feature not enabled',
      },
    }

    const mockFetch = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify(responseBody), { status: 403, headers: { 'content-type': 'application/json' } })
      )

    const client = new FingerprintServerApiClient({
      fetch: mockFetch,
      apiKey: 'test',
      region: Region.Global,
    })

    try {
      await client.getEvent('test')
    } catch (e) {
      if (e instanceof RequestError) {
        expect(e.response.status).toBe(403)
        expect(e.responseBody).toEqual(responseBody)

        await expect(e.response.json()).resolves.not.toThrow()

        return
      }
    }

    throw new Error('Expected EventError to be thrown')
  })

  it('throws a strongly typed ServerApiError for structured Server API error responses', async () => {
    const responseBody = {
      error: {
        code: 'feature_not_enabled',
        message: 'feature not enabled',
      },
    }

    const mockFetch = vi
      .fn()
      .mockResolvedValue(
        new Response(JSON.stringify(responseBody), { status: 403, headers: { 'content-type': 'application/json' } })
      )

    const client = new FingerprintServerApiClient({
      fetch: mockFetch,
      apiKey: 'test',
      region: Region.Global,
    })

    try {
      await client.getEvent('test')
    } catch (e) {
      expect(e).toBeInstanceOf(ServerApiError)
      // ServerApiError is still a RequestError, so existing `instanceof` checks keep working.
      expect(e).toBeInstanceOf(RequestError)
      if (e instanceof ServerApiError) {
        expect(e.errorCode).toBe('feature_not_enabled')
        expect(e.statusCode).toBe(403)
        expect(e.responseBody).toEqual(responseBody)
        expect(e.message).toBe('feature not enabled')
        return
      }
    }

    throw new Error('Expected ServerApiError to be thrown')
  })

  it('ServerApiError.fromErrorResponse builds a ServerApiError from a structured error body', () => {
    const body = {
      error: { code: 'feature_not_enabled', message: 'feature not enabled' },
    } satisfies ErrorResponse
    const response = new Response(JSON.stringify(body), { status: 403 })

    const error = ServerApiError.fromErrorResponse(body, response)

    expect(error).toBeInstanceOf(ServerApiError)
    expect(error).toBeInstanceOf(RequestError)
    expect(error.errorCode).toBe('feature_not_enabled')
    expect(error.statusCode).toBe(403)
    expect(error.responseBody).toEqual(body)
    expect(error.message).toBe('feature not enabled')
    expect(error.response).toBe(response)
  })

  it('throws a plain RequestError with a placeholder error code for non Server API error responses', async () => {
    const unexpectedBody = { unexpected: 'shape' }
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(unexpectedBody), {
        status: 502,
        statusText: 'Bad Gateway',
        headers: { 'content-type': 'application/json' },
      })
    )

    const client = new FingerprintServerApiClient({
      fetch: mockFetch,
      apiKey: 'test',
      region: Region.Global,
    })

    try {
      await client.getEvent('test')
    } catch (e) {
      expect(e).toBeInstanceOf(RequestError)
      expect(e).not.toBeInstanceOf(ServerApiError)
      if (e instanceof RequestError) {
        // Backwards compatible: `errorCode` stays populated on the base RequestError, carrying the
        // best-effort `statusText` placeholder for non–Server-API (e.g. proxy) responses.
        expect(e.errorCode).toBe('Bad Gateway')
        expect(e.errorCode).toBe(e.response.statusText)
        expect(e.statusCode).toBe(502)
        expect(e.message).toBe('Unknown error')
        // The parsed payload is preserved for debugging unexpected/proxy errors.
        expect(e.responseBody).toEqual(unexpectedBody)
        return
      }
    }

    throw new Error('Expected RequestError to be thrown')
  })

  it('does not classify a payload with a non-string error code/message as a ServerApiError', async () => {
    // An `error` object is present but its `code`/`message` are not strings (e.g. a proxy that
    // happens to nest an object under `error`). It must not be treated as a structured Server API
    // error, otherwise `errorCode`/`message` would be non-string at runtime.
    const proxyBody = { error: { code: 123, message: { nested: 'oops' } } }
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(proxyBody), {
        status: 502,
        statusText: 'Bad Gateway',
        headers: { 'content-type': 'application/json' },
      })
    )

    const client = new FingerprintServerApiClient({
      fetch: mockFetch,
      apiKey: 'test',
      region: Region.Global,
    })

    const caught = await client.getEvent('test').catch((e: unknown) => e)
    expect(caught).toBeInstanceOf(RequestError)
    expect(caught).not.toBeInstanceOf(ServerApiError)
    expect(caught).toMatchObject({ message: 'Unknown error', errorCode: 'Bad Gateway', responseBody: proxyBody })
  })

  it('should support using a string constant for the Region', () => {
    const client = new FingerprintServerApiClient({
      apiKey: 'test',
      region: 'Global',
    })

    // This test just checks that the types provide the expected behavior
    // so a simple assertion to use the client variable is all that is required
    expect(client).toBeTruthy()
  })

  it('should throw error when using getEvent if eventId is empty', async () => {
    const client = new FingerprintServerApiClient({
      apiKey: 'test',
      region: 'Global',
    })

    await expect(client.getEvent(undefined as unknown as string)).rejects.toThrow(new TypeError('eventId is not set'))
  })

  it('should throw error when using updateEvent if body or eventId is empty', async () => {
    const client = new FingerprintServerApiClient({
      apiKey: 'test',
      region: 'Global',
    })

    await expect(client.updateEvent('<eventId>', undefined as unknown as EventUpdate)).rejects.toThrow(
      new TypeError('body is not set')
    )

    await expect(client.updateEvent(undefined as unknown as string, { linked_id: '<linkedId>' })).rejects.toThrow(
      new TypeError('eventId is not set')
    )
  })

  it('should throw error when using deleteVisitorData if visitorId is empty', async () => {
    const client = new FingerprintServerApiClient({
      apiKey: 'test',
      region: 'Global',
    })

    await expect(client.deleteVisitorData(undefined as unknown as string)).rejects.toThrow(
      new TypeError('visitorId is not set')
    )
  })

  it('should support using a string constant for Authorization header', async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({}), { headers: { 'content-type': 'application/json' } }))

    const apiKey = 'test'

    const client = new FingerprintServerApiClient({
      fetch: mockFetch,
      apiKey,
      region: Region.Global,
    })

    await client.getEvent('eventId')

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(expect.anything(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
  })

  it('should throw SdkError if fetch fails', async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error('fetch error'))

    const client = new FingerprintServerApiClient({
      fetch: mockFetch,
      apiKey: 'test',
    })

    await expect(client.getEvent('<event>')).rejects.toBeInstanceOf(SdkError)
  })

  it('should throw error when the response has status 204', async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 204, headers: { 'content-type': 'application/json' } }))

    const client = new FingerprintServerApiClient({ fetch: mockFetch, apiKey: 'test' })

    await expect(client.getEvent('<event>')).rejects.toThrow('Expected JSON response but response body is empty')
    await expect(client.getEvent('<event>')).rejects.toBeInstanceOf(SdkError)
  })

  it('should throw error when the response has zero content length', async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValue(
        new Response('', { status: 200, headers: { 'content-type': 'application/json', 'content-length': '0' } })
      )

    const client = new FingerprintServerApiClient({ fetch: mockFetch, apiKey: 'test' })

    await expect(client.getEvent('<event>')).rejects.toThrow('Expected JSON response but response body is empty')
    await expect(client.getEvent('<event>')).rejects.toBeInstanceOf(SdkError)
  })

  it('should throw error when the response has incorrect content type', async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValue(new Response('not json', { status: 200, headers: { 'content-type': 'text/plain' } }))

    const client = new FingerprintServerApiClient({ fetch: mockFetch, apiKey: 'test' })

    await expect(client.getEvent('<event>')).rejects.toThrow(
      'Expected JSON response but received non-JSON content type'
    )
    await expect(client.getEvent('<event>')).rejects.toBeInstanceOf(SdkError)
  })

  it('should throw error when the response has no content-type header', async () => {
    const mockFetch = vi.fn().mockResolvedValue(new Response(null, { status: 200 }))

    const client = new FingerprintServerApiClient({ fetch: mockFetch, apiKey: 'test' })

    await expect(client.getEvent('<event>')).rejects.toThrow(
      'Expected JSON response but received non-JSON content type'
    )
    await expect(client.getEvent('<event>')).rejects.toBeInstanceOf(SdkError)
  })

  it('throws SdkError when response has invalid json', async () => {
    const badJsonOk = {
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: vi.fn().mockRejectedValue(new SyntaxError('Unexpected token')),
      clone: vi.fn(),
    }
    badJsonOk.clone.mockReturnValue(badJsonOk)

    const mockFetch = vi.fn().mockResolvedValue(badJsonOk as unknown as Response)

    const client = new FingerprintServerApiClient({
      fetch: mockFetch,
      apiKey: 'test',
    })

    await expect(client.getEvent('<event>')).rejects.toThrow('Failed to parse JSON response')

    await expect(client.getEvent('<event>')).rejects.toBeInstanceOf(SdkError)

    await expect(client.getEvent('<event>')).rejects.toMatchObject({ cause: expect.any(SyntaxError) })
  })

  it('throws a plain RequestError instead of a generic SdkError when the error response body is not JSON', async () => {
    // Proxies/load balancers can return non-JSON error bodies (e.g. an HTML error page).
    const htmlErrorBody = '<html><body><h1>502 Bad Gateway</h1></body></html>'
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(htmlErrorBody, {
        status: 502,
        statusText: 'Bad Gateway',
        headers: { 'content-type': 'text/html' },
      })
    )

    const client = new FingerprintServerApiClient({
      fetch: mockFetch,
      apiKey: 'test',
    })

    const caught = await client.getEvent('<event>').catch((e: unknown) => e)

    // RequestError extends SdkError, so we assert the specific subtype rather than `not SdkError`.
    expect(caught).toBeInstanceOf(RequestError)
    expect(caught).not.toBeInstanceOf(ServerApiError)
    expect(caught).toMatchObject({
      statusCode: 502,
      errorCode: 'Bad Gateway',
      message: 'Unknown error',
      responseBody: htmlErrorBody, // raw non-JSON body preserved
    })
  })
})
