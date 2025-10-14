import {
  ErrorResponse,
  FingerprintJsServerApiClient,
  getIntegrationInfo,
  Region,
  RequestError,
  SdkError,
} from '../../src'
import getEventResponse from './mocked-responses-data/events/get_event_200.json'

jest.spyOn(global, 'fetch')

const mockFetch = fetch as unknown as jest.Mock
describe('[Mocked response] Get Event', () => {
  const apiKey = 'dummy_api_key'
  const existingEventId = '1626550679751.cVc5Pm'

  const client = new FingerprintJsServerApiClient({ region: Region.EU, apiKey })

  test('with event_id', async () => {
    mockFetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(getEventResponse))))

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

  test('403 error', async () => {
    const errorInfo = {
      error: {
        code: 'secret_api_key_required',
        message: 'secret key is required',
      },
    } satisfies ErrorResponse
    const mockResponse = new Response(JSON.stringify(errorInfo), {
      status: 403,
    })
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))
    await expect(client.getEvent(existingEventId)).rejects.toThrow(
      RequestError.fromErrorResponse(errorInfo, mockResponse)
    )
  })

  test('404 error', async () => {
    const errorInfo = {
      error: {
        code: 'request_not_found',
        message: 'request id is not found',
      },
    } satisfies ErrorResponse
    const mockResponse = new Response(JSON.stringify(errorInfo), {
      status: 404,
    })
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))
    await expect(client.getEvent(existingEventId)).rejects.toThrow(
      RequestError.fromErrorResponse(errorInfo, mockResponse)
    )
  })

  test('Error with unknown', async () => {
    const mockResponse = new Response(
      JSON.stringify({
        error: 'Unexpected error format',
      }),
      {
        status: 404,
      }
    )
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))
    await expect(client.getEvent(existingEventId)).rejects.toThrow(RequestError)
    await expect(client.getEvent(existingEventId)).rejects.toThrow('Unknown error')
  })

  test('Error with bad JSON', async () => {
    const mockResponse = new Response('(Some bad JSON)', {
      status: 404,
    })
    mockFetch.mockReturnValue(Promise.resolve(mockResponse))

    await expect(client.getEvent(existingEventId)).rejects.toMatchObject(
      new SdkError(
        'Failed to parse JSON response',
        mockResponse,
        new SyntaxError('Unexpected token \'(\', \\"(Some bad JSON)\\" is not valid JSON')
      )
    )
  })
})
