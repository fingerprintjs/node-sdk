import { ErrorResponse, FingerprintServerApiClient, RequestError, SearchEventsFilter } from '../../src'
import getEventsSearch from './mocked-responses-data/events/search/get_event_search_200.json'
import { createJsonResponse } from './utils'
import { getIntegrationInfo } from '../../src/urlUtils'

jest.spyOn(global, 'fetch')

const mockFetch = fetch as unknown as jest.Mock

describe('[Mocked response] Search Events', () => {
  const apiKey = 'dummy_api_key'
  const client = new FingerprintServerApiClient({ apiKey })

  test('without filter', async () => {
    mockFetch.mockReturnValue(Promise.resolve(createJsonResponse(getEventsSearch)))

    const limit = 10

    const response = await client.searchEvents({
      limit,
    })
    expect(response).toEqual(getEventsSearch)
    expect(mockFetch).toHaveBeenCalledWith(
      `https://api.fpjs.io/v4/events?limit=${limit}&ii=${encodeURIComponent(getIntegrationInfo())}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        method: 'GET',
      }
    )
  })

  test('with filter params passed as undefined', async () => {
    mockFetch.mockReturnValue(Promise.resolve(createJsonResponse(getEventsSearch)))

    const limit = 10

    const response = await client.searchEvents({
      limit,
      ip_address: undefined,
      visitor_id: undefined,
    })
    expect(response).toEqual(getEventsSearch)
    expect(mockFetch).toHaveBeenCalledWith(
      `https://api.fpjs.io/v4/events?limit=${limit}&ii=${encodeURIComponent(getIntegrationInfo())}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        method: 'GET',
      }
    )
  })

  test('with partial filter', async () => {
    mockFetch.mockReturnValue(Promise.resolve(createJsonResponse(getEventsSearch)))

    const limit = 10
    const bot = 'good'
    const visitorId = 'visitor_id'

    const response = await client.searchEvents({
      limit,
      bot,
      visitor_id: visitorId,
    })
    expect(response).toEqual(getEventsSearch)
    expect(mockFetch).toHaveBeenCalledWith(
      `https://api.fpjs.io/v4/events?limit=${limit}&bot=${bot}&visitor_id=${visitorId}&ii=${encodeURIComponent(getIntegrationInfo())}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        method: 'GET',
      }
    )
  })

  test('with all possible filters', async () => {
    mockFetch.mockReturnValue(Promise.resolve(createJsonResponse(getEventsSearch)))

    const filters: SearchEventsFilter = {
      limit: 10,
      bot: 'all',
      visitor_id: 'visitor_id',
      ip_address: '192.168.0.1/32',
      linked_id: 'linked_id',
      start: 1620000000000,
      end: 1630000000000,
      reverse: true,
      suspect: false,
      anti_detect_browser: true,
      cloned_app: true,
      factory_reset: true,
      frida: true,
      jailbroken: true,
      min_suspect_score: 0.5,
      privacy_settings: true,
      root_apps: true,
      tampering: true,
      virtual_machine: true,
      vpn: true,
      vpn_confidence: 'medium',
      emulator: true,
      incognito: true,
      developer_tools: true,
      location_spoofing: true,
      mitm_attack: true,
      proxy: true,
      sdk_version: 'testSdkVersion',
      sdk_platform: 'js',
      environment: ['env1', 'env2', ''],
      high_recall_id: 'testHighRecallID',
      incremental_identification_status: 'partially_completed',
      simulator: true,
    }

    const response = await client.searchEvents(filters)

    expect(response).toEqual(getEventsSearch)

    const baseUrl = 'https://api.fpjs.io/v4/events'
    const queryParams = new URLSearchParams()
    for (const [key, value] of Object.entries(filters)) {
      if (value === undefined || value === null) {
        continue
      }

      if (Array.isArray(value)) {
        for (const v of value) {
          queryParams.append(key, String(v))
        }
      } else {
        queryParams.set(key, String(value))
      }
    }
    queryParams.set('ii', getIntegrationInfo())

    const expectedUrl = `${baseUrl}?${queryParams.toString()}`

    expect(mockFetch).toHaveBeenCalledWith(expectedUrl, {
      headers: { Authorization: `Bearer ${apiKey}` },
      method: 'GET',
    })
  })

  test('400 error', async () => {
    const error = {
      error: {
        code: 'request_cannot_be_parsed',
        message: 'Forbidden',
      },
    } satisfies ErrorResponse
    const mockResponse = createJsonResponse(error, 400)
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))
    await expect(
      client.searchEvents({
        limit: 10,
      })
    ).rejects.toThrow(RequestError.fromErrorResponse(error, mockResponse))
  })

  test('403 error', async () => {
    const error = {
      error: {
        code: 'secret_api_key_required',
        message: 'secret key is required',
      },
    } satisfies ErrorResponse
    const mockResponse = createJsonResponse(error, 403)
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))
    await expect(
      client.searchEvents({
        limit: 10,
      })
    ).rejects.toThrow(RequestError.fromErrorResponse(error, mockResponse))
  })
})
