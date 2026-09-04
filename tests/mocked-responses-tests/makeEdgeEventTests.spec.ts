import { ServerApiError, FingerprintServerApiClient, Region, RequestError, TooManyRequestsError } from '../../src'
import makeEdgeEventResponse from './mocked-responses-data/events/get_event_with_edge_200.json'
import Error400IpRequired from './mocked-responses-data/errors/400_edge_ip_required.json'
import Error400UnknownField from './mocked-responses-data/errors/400_edge_unknown_field.json'
import Error403 from './mocked-responses-data/errors/403_feature_not_enabled.json'
import Error413 from './mocked-responses-data/errors/413_payload_too_large.json'
import Error429 from './mocked-responses-data/errors/429_too_many_requests.json'
import { createJsonResponse } from './utils'
import { getIntegrationInfo } from '../../src/urlUtils'
import { describe, expect, it } from 'vitest'
import { mockFetch } from './mockFetch'

const body = {
  method: 'GET',
  url: 'https://example.com/login?foo=bar',
  ipv4_address: '104.210.139.192',
  headers: [
    { name: 'Host', value: 'example.com' },
    { name: 'User-Agent', value: 'Mozilla/5.0' },
  ],
}
const headersKey: string = 'headers'

describe('[Mocked response] Make Edge Event', () => {
  const apiKey = 'dummy_api_key'

  const client = new FingerprintServerApiClient({ region: Region.EU, apiKey })

  it('creates an edge event', async () => {
    mockFetch.mockReturnValue(Promise.resolve(createJsonResponse(makeEdgeEventResponse)))

    const response = await client.makeEdgeEvent(body)

    expect(mockFetch).toHaveBeenCalledWith(
      `https://eu.api.fpjs.io/v4/edge?ii=${encodeURIComponent(getIntegrationInfo())}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        method: 'POST',
        body: JSON.stringify(body),
        [headersKey]: expect.objectContaining({
          Authorization: expect.any(String),
          'Content-Type': 'application/json',
        }),
      }
    )
    expect(response).toEqual(makeEdgeEventResponse)
  })

  it('400 error when IP is missing', async () => {
    mockFetch.mockReturnValue(Promise.resolve(createJsonResponse(Error400IpRequired, 400)))

    const caught = await client.makeEdgeEvent(body).catch((e: unknown) => e)
    expect(caught).toBeInstanceOf(ServerApiError)
    expect(caught).toMatchObject({
      message: Error400IpRequired.error.message,
      errorCode: Error400IpRequired.error.code,
    })
  })

  it('400 error when body contains an unknown field', async () => {
    mockFetch.mockReturnValue(Promise.resolve(createJsonResponse(Error400UnknownField, 400)))

    const caught = await client.makeEdgeEvent(body).catch((e: unknown) => e)
    expect(caught).toBeInstanceOf(ServerApiError)
    expect(caught).toMatchObject({
      message: Error400UnknownField.error.message,
      errorCode: Error400UnknownField.error.code,
    })
  })

  it('403 error', async () => {
    mockFetch.mockReturnValue(Promise.resolve(createJsonResponse(Error403, 403)))

    const caught = await client.makeEdgeEvent(body).catch((e: unknown) => e)
    expect(caught).toBeInstanceOf(ServerApiError)
    expect(caught).toMatchObject({
      message: Error403.error.message,
      errorCode: Error403.error.code,
    })
  })

  it('413 error', async () => {
    mockFetch.mockReturnValue(Promise.resolve(createJsonResponse(Error413, 413)))

    const caught = await client.makeEdgeEvent(body).catch((e: unknown) => e)
    expect(caught).toBeInstanceOf(ServerApiError)
    expect(caught).toMatchObject({
      message: Error413.error.message,
      errorCode: Error413.error.code,
    })
  })

  it('429 error', async () => {
    mockFetch.mockReturnValue(Promise.resolve(createJsonResponse(Error429, 429)))

    const caught = await client.makeEdgeEvent(body).catch((e: unknown) => e)
    expect(caught).toBeInstanceOf(TooManyRequestsError)
    expect(caught).toMatchObject({
      message: Error429.error.message,
      errorCode: Error429.error.code,
    })
  })

  it('Error with bad JSON throws a RequestError with the raw body preserved', async () => {
    mockFetch.mockReturnValue(Promise.resolve(new Response('(Some bad JSON)', { status: 400 })))

    const caught = await client.makeEdgeEvent(body).catch((e: unknown) => e)
    expect(caught).toBeInstanceOf(RequestError)
    expect(caught).not.toBeInstanceOf(ServerApiError)
    expect(caught).toMatchObject({
      statusCode: 400,
      message: 'Unknown error',
      responseBody: '(Some bad JSON)',
    })
  })

  it('Error with bad shape', async () => {
    mockFetch.mockReturnValue(
      Promise.resolve(
        createJsonResponse(
          {
            error: 'Unexpected error format',
          },
          400
        )
      )
    )

    const caught = await client.makeEdgeEvent(body).catch((e: unknown) => e)
    expect(caught).toBeInstanceOf(RequestError)
    expect(caught).not.toBeInstanceOf(ServerApiError)
    expect(caught).toMatchObject({ message: 'Unknown error' })
  })
})
