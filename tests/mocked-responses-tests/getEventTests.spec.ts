import {
  ErrorResponse,
  FingerprintServerApiClient,
  Region,
  RequestError,
  SdkError,
  TooManyRequestsError,
} from '../../src'
import getEventResponse from './mocked-responses-data/events/get_event_200.json'
import getEventRulesetResponse from './mocked-responses-data/events/get_event_ruleset_200.json'
import Error429 from './mocked-responses-data/errors/429_too_many_requests.json'
import { createJsonResponse } from './utils'
import { getIntegrationInfo } from '../../src/urlUtils'
import { describe, expect, it } from 'vitest'
import { mockFetch } from './mockFetch'

describe('[Mocked response] Get Event', () => {
  const apiKey = 'dummy_api_key'
  const existingEventId = '1626550679751.cVc5Pm'
  const rulesetId = 'rs_b1k1blhqpOX3kU'

  const client = new FingerprintServerApiClient({ region: Region.EU, apiKey })

  it('with event_id', async () => {
    mockFetch.mockReturnValue(Promise.resolve(createJsonResponse(getEventResponse)))

    const response = await client.getEvent(existingEventId)

    expect(mockFetch).toHaveBeenCalledWith(
      `https://eu.api.fpjs.io/v4/events/${existingEventId}?ii=${encodeURIComponent(getIntegrationInfo())}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        method: 'GET',
      }
    )
    expect(response).toEqual(getEventResponse)
  })

  it('with event_id and ruleset_id', async () => {
    mockFetch.mockReturnValue(Promise.resolve(createJsonResponse(getEventRulesetResponse)))

    const response = await client.getEvent(existingEventId, { ruleset_id: rulesetId })

    expect(mockFetch).toHaveBeenCalledWith(
      `https://eu.api.fpjs.io/v4/events/${existingEventId}?ruleset_id=${rulesetId}&ii=${encodeURIComponent(getIntegrationInfo())}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        method: 'GET',
      }
    )
    expect(response).toEqual(getEventRulesetResponse)
  })

  it('403 error', async () => {
    const errorInfo = {
      error: {
        code: 'secret_api_key_required',
        message: 'secret key is required',
      },
    } satisfies ErrorResponse
    const mockResponse = createJsonResponse(errorInfo, 403)
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))
    await expect(client.getEvent(existingEventId)).rejects.toThrow(
      RequestError.fromErrorResponse(errorInfo, mockResponse)
    )
  })

  it('404 error', async () => {
    const errorInfo = {
      error: {
        code: 'event_not_found',
        message: 'request id is not found',
      },
    } satisfies ErrorResponse
    const mockResponse = createJsonResponse(errorInfo, 404)
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))
    await expect(client.getEvent(existingEventId)).rejects.toThrow(
      RequestError.fromErrorResponse(errorInfo, mockResponse)
    )
  })

  it('Error with unknown', async () => {
    const mockResponse = createJsonResponse(
      {
        error: 'Unexpected error format',
      },
      404
    )
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))
    await expect(client.getEvent(existingEventId)).rejects.toThrow(RequestError)
    await expect(client.getEvent(existingEventId)).rejects.toThrow('Unknown error')
  })

  it('429 error with valid shape', async () => {
    const mockResponse = createJsonResponse(Error429, 429)
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))
    await expect(client.getEvent(existingEventId)).rejects.toBeInstanceOf(TooManyRequestsError)
  })

  it('429 error with invalid shape', async () => {
    const mockResponse = createJsonResponse({ reason: 'rate limited' }, 429)
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))
    await expect(client.getEvent(existingEventId)).rejects.toBeInstanceOf(RequestError)
    await expect(client.getEvent(existingEventId)).rejects.not.toBeInstanceOf(TooManyRequestsError)
  })

  it('Error with bad JSON', async () => {
    const mockResponse = new Response('(Some bad JSON)', {
      status: 404,
    })
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))

    await expect(client.getEvent(existingEventId)).rejects.toMatchObject({
      name: SdkError.name,
      message: 'Failed to parse JSON response',
      response: mockResponse,
      // The exact message is engine-specific, assert only the error type
      cause: expect.any(SyntaxError),
    })
  })

  it('unsupported enum value', async () => {
    const eventWithUnsupportedEnumValue = {
      ...getEventResponse,
    }
    eventWithUnsupportedEnumValue.bot = 'new_bot_type'
    eventWithUnsupportedEnumValue.proxy_details = {
      ...eventWithUnsupportedEnumValue.proxy_details,
      proxy_type: 'new_proxy_type',
    }
    mockFetch.mockReturnValue(Promise.resolve(createJsonResponse(eventWithUnsupportedEnumValue)))

    const response = await client.getEvent(existingEventId)

    expect(mockFetch).toHaveBeenCalledWith(
      `https://eu.api.fpjs.io/v4/events/${existingEventId}?ii=${encodeURIComponent(getIntegrationInfo())}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        method: 'GET',
      }
    )
    expect(response).toEqual(eventWithUnsupportedEnumValue)
  })
})
