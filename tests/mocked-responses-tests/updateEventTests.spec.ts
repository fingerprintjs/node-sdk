import { ServerApiError, FingerprintServerApiClient, Region, RequestError, SdkError } from '../../src'
import Error404 from './mocked-responses-data/errors/404_event_not_found.json'
import Error403 from './mocked-responses-data/errors/403_feature_not_enabled.json'
import Error400 from './mocked-responses-data/errors/400_request_body_invalid.json'
import Error409 from './mocked-responses-data/errors/409_state_not_ready.json'
import { getIntegrationInfo } from '../../src/urlUtils'
import { describe, expect, it } from 'vitest'
import { mockFetch } from './mockFetch'

describe('[Mocked response] Update event', () => {
  const apiKey = 'dummy_api_key'

  const existingEventId = 'TaDnMBz9XCpZNuSzFUqP'

  const client = new FingerprintServerApiClient({ region: Region.EU, apiKey })

  it('with eventId', async () => {
    mockFetch.mockReturnValue(Promise.resolve(new Response(undefined, { headers: { 'content-length': '0' } })))

    const body = {
      linked_id: 'linked_id',
      suspect: true,
    }
    await expect(client.updateEvent(existingEventId, body)).resolves.toBeUndefined()

    const call = mockFetch.mock.calls[0]
    const bodyFromCall = call[1]?.body
    expect(JSON.parse(bodyFromCall as string)).toEqual(body)

    expect(mockFetch).toHaveBeenCalledWith(
      `https://eu.api.fpjs.io/v4/events/${existingEventId}?ii=${encodeURIComponent(getIntegrationInfo())}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        method: 'PATCH',
        body: JSON.stringify(body),
      }
    )
  })

  it('404 error', async () => {
    const mockResponse = new Response(JSON.stringify(Error404), {
      status: 404,
      headers: { 'content-type': 'application/json' },
    })
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))

    const body = {
      linked_id: 'linked_id',
      suspect: true,
    }
    const caught = await client.updateEvent(existingEventId, body).catch((e: unknown) => e)
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

    const body = {
      linked_id: 'linked_id',
      suspect: true,
    }
    const caught = await client.updateEvent(existingEventId, body).catch((e: unknown) => e)
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

    const body = {
      linked_id: 'linked_id',
      suspect: true,
    }
    const caught = await client.updateEvent(existingEventId, body).catch((e: unknown) => e)
    expect(caught).toBeInstanceOf(ServerApiError)
    expect(caught).toMatchObject({
      message: Error400.error.message,
      errorCode: Error400.error.code,
    })
  })

  it('409 error', async () => {
    const mockResponse = new Response(JSON.stringify(Error409), {
      status: 409,
      headers: { 'content-type': 'application/json' },
    })
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))

    const body = {
      linked_id: 'linked_id',
      suspect: true,
    }
    const caught = await client.updateEvent(existingEventId, body).catch((e: unknown) => e)
    expect(caught).toBeInstanceOf(ServerApiError)
    expect(caught).toMatchObject({
      message: Error409.error.message,
      errorCode: Error409.error.code,
    })
  })

  it('Error with bad JSON', async () => {
    const mockResponse = new Response('(Some bad JSON)', {
      status: 404,
    })
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))

    const body = {
      linked_id: 'linked_id',
      suspect: true,
    }
    await expect(client.updateEvent(existingEventId, body)).rejects.toMatchObject({
      name: SdkError.name,
      message: 'Failed to parse JSON response',
      response: mockResponse,
      // The exact message is engine-specific, assert only the error type
      cause: expect.any(SyntaxError),
    })
  })

  it('Error with bad shape', async () => {
    const mockResponse = new Response(
      JSON.stringify({
        error: 'Unexpected error format',
      }),
      {
        status: 404,
        headers: { 'content-type': 'application/json' },
      }
    )

    mockFetch.mockReturnValue(Promise.resolve(mockResponse))

    const body = {
      linked_id: 'linked_id',
      suspect: true,
    }
    const caught = await client.updateEvent(existingEventId, body).catch((e: unknown) => e)
    expect(caught).toBeInstanceOf(RequestError)
    expect(caught).not.toBeInstanceOf(ServerApiError)
    expect(caught).toMatchObject({ message: 'Unknown error' })
  })
})
