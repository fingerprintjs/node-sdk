import { ErrorResponse, FingerprintServerApiClient, Region, RequestError, SdkError } from '../../src'
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
    const response = await client.updateEvent(existingEventId, body)

    expect(response).toBeUndefined()

    const call = mockFetch.mock.calls[0]
    const bodyFromCall = call[1]?.body
    expect(bodyFromCall).toEqual(JSON.stringify(body))

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
    await expect(client.updateEvent(existingEventId, body)).rejects.toThrow(
      RequestError.fromErrorResponse(Error404 as ErrorResponse, mockResponse)
    )
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
    await expect(client.updateEvent(existingEventId, body)).rejects.toThrow(
      RequestError.fromErrorResponse(Error403 as ErrorResponse, mockResponse)
    )
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
    await expect(client.updateEvent(existingEventId, body)).rejects.toThrow(
      RequestError.fromErrorResponse(Error400 as ErrorResponse, mockResponse)
    )
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
    await expect(client.updateEvent(existingEventId, body)).rejects.toThrow(
      RequestError.fromErrorResponse(Error409 as ErrorResponse, mockResponse)
    )
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
    await expect(client.updateEvent(existingEventId, body)).rejects.toMatchObject(
      new SdkError(
        'Failed to parse JSON response',
        mockResponse,
        new SyntaxError('Unexpected token \'(\', "(Some bad JSON)" is not valid JSON')
      )
    )
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
    await expect(client.updateEvent(existingEventId, body)).rejects.toThrow(RequestError)
    await expect(client.updateEvent(existingEventId, body)).rejects.toThrow('Unknown error')
  })
})
