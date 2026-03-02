import { RequestError, FingerprintServerApiClient, Region, Options, EventUpdate, SdkError } from '../../src'

describe('ServerApiClient', () => {
  it('should throw error if no token provided', async () => {
    expect(() => {
      new FingerprintServerApiClient({} as Readonly<Options>)
    }).toThrow('Api key is not set')
  })

  it('should support passing custom fetch implementation', async () => {
    const mockFetch = jest
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

    const mockFetch = jest
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

    await expect(client.updateEvent(undefined as unknown as EventUpdate, '<eventId>')).rejects.toThrow(
      new TypeError('body is not set')
    )

    await expect(client.updateEvent({ linked_id: '<linkedId>' }, undefined as unknown as string)).rejects.toThrow(
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
    const mockFetch = jest
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
    const mockFetch = jest.fn().mockRejectedValue(new Error('fetch error'))

    const client = new FingerprintServerApiClient({
      fetch: mockFetch,
      apiKey: 'test',
    })

    await expect(client.getEvent('<event>')).rejects.toBeInstanceOf(SdkError)
  })

  it('should throw error when the response has status 204', async () => {
    const mockFetch = jest
      .fn()
      .mockResolvedValue(new Response(null, { status: 204, headers: { 'content-type': 'application/json' } }))

    const client = new FingerprintServerApiClient({ fetch: mockFetch, apiKey: 'test' })

    await expect(client.getEvent('<event>')).rejects.toThrow('Expected JSON response but response body is empty')
    await expect(client.getEvent('<event>')).rejects.toBeInstanceOf(SdkError)
  })

  it('should throw error when the response has zero content length', async () => {
    const mockFetch = jest
      .fn()
      .mockResolvedValue(
        new Response('', { status: 200, headers: { 'content-type': 'application/json', 'content-length': '0' } })
      )

    const client = new FingerprintServerApiClient({ fetch: mockFetch, apiKey: 'test' })

    await expect(client.getEvent('<event>')).rejects.toThrow('Expected JSON response but response body is empty')
    await expect(client.getEvent('<event>')).rejects.toBeInstanceOf(SdkError)
  })

  it('should throw error when the response has incorrect content type', async () => {
    const mockFetch = jest
      .fn()
      .mockResolvedValue(new Response('not json', { status: 200, headers: { 'content-type': 'text/plain' } }))

    const client = new FingerprintServerApiClient({ fetch: mockFetch, apiKey: 'test' })

    await expect(client.getEvent('<event>')).rejects.toThrow(
      'Expected JSON response but received non-JSON content type'
    )
    await expect(client.getEvent('<event>')).rejects.toBeInstanceOf(SdkError)
  })

  it('should throw error when the response has no content-type header', async () => {
    const mockFetch = jest.fn().mockResolvedValue(new Response('not json', { status: 200 }))

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
      json: jest.fn().mockRejectedValue(new SyntaxError('Unexpected token')),
      clone: jest.fn(),
    }
    badJsonOk.clone.mockReturnValue(badJsonOk)

    const mockFetch = jest.fn().mockResolvedValue(badJsonOk as unknown as Response)

    const client = new FingerprintServerApiClient({
      fetch: mockFetch,
      apiKey: 'test',
    })

    await expect(client.getEvent('<event>')).rejects.toThrow('Failed to parse JSON response')

    await expect(client.getEvent('<event>')).rejects.toBeInstanceOf(SdkError)

    await expect(client.getEvent('<event>')).rejects.toMatchObject({ cause: expect.any(SyntaxError) })
  })

  it('throws SdkError when error response has invalid json', async () => {
    const badJsonFail = {
      ok: false,
      status: 500,
      headers: new Headers({ 'content-type': 'text/plain' }),
      json: jest.fn().mockRejectedValue('Unexpected error format'),
      clone: jest.fn(),
    }

    badJsonFail.clone.mockReturnValue(badJsonFail)

    const mockFetch = jest.fn().mockResolvedValue(badJsonFail as unknown as Response)

    const client = new FingerprintServerApiClient({
      fetch: mockFetch,
      apiKey: 'test',
    })

    await expect(client.getEvent('<event>')).rejects.toThrow('Failed to parse JSON response')

    await expect(client.getEvent('<event>')).rejects.toBeInstanceOf(SdkError)

    await expect(client.getEvent('<event>')).rejects.toMatchObject({ cause: Error('Unexpected error format') })
  })
})
