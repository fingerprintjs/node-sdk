import { AllowedMethod, getRequestPath, GetRequestPathOptions, SuccessJsonOrVoid } from './urlUtils'
import { Event, EventUpdate, FingerprintApi, Options, Region, SearchEventsFilter, SearchEventsResponse } from './types'
import { paths } from './generatedApiTypes'
import { RequestError, SdkError, TooManyRequestsError } from './errors/apiErrors'
import { isErrorResponse } from './errors/handleErrorResponse'

export class FingerprintJsServerApiClient implements FingerprintApi {
  public readonly region: Region

  public readonly apiKey: string

  protected readonly fetch: typeof fetch

  private readonly defaultHeaders: Record<string, string>

  /**
   * FingerprintJS server API client used to fetch data from FingerprintJS
   * @constructor
   * @param {Options} options - Options for FingerprintJS server API client
   */
  constructor(options: Readonly<Options>) {
    if (!options.apiKey) {
      throw Error('Api key is not set')
    }

    // These type assertions are safe because the Options type allows the
    // region or authentication mode to be specified as a string or an enum value.
    // The resulting JS from using the enum value or the string is identical.
    this.region = (options.region as Region) ?? Region.Global

    this.apiKey = options.apiKey
    this.fetch = options.fetch ?? fetch

    this.defaultHeaders = {
      Authorization: `Bearer ${this.apiKey}`,
      ...options.defaultHeaders,
    }
  }

  /**
   * Retrieves a specific identification event with the information from each activated product — Identification and all active [Smart signals](https://dev.fingerprint.com/docs/smart-signals-overview).
   *
   * @param eventId - identifier of the event
   *
   * @returns {Promise<Event>} - promise with event response. For more information, see the [Server API documentation](https://dev.fingerprint.com/reference/getevent).
   *
   * @example
   * ```javascript
   * client
   *  .getEvent('<eventId>')
   *  .then((result) => console.log(result))
   *  .catch((error) => {
   *    if (error instanceof RequestError) {
   *       console.log(error.statusCode, error.message)
   *       // Access raw response in error
   *       console.log(error.response)
   *     }
   *   })
   * ```
   * */
  public async getEvent(eventId: string): Promise<Event> {
    if (!eventId) {
      throw new TypeError('eventId is not set')
    }

    return this.callApi({
      path: '/events/{event_id}',
      region: this.region,
      pathParams: [eventId],
      method: 'get',
    })
  }

  /**
   * Update an event with a given event ID
   * @description Change information in existing events specified by `eventId` or *flag suspicious events*.
   *
   * When an event is created, it is assigned `linkedId` and `tag` submitted through the JS agent parameters. This information might not be available on the client so the Server API allows for updating the attributes after the fact.
   *
   * **Warning** It's not possible to update events older than 10 days.
   *
   * @param body - Data to update the event with.
   * @param eventId The unique event [identifier](https://dev.fingerprint.com/reference/js-agent-get-function#requestid).
   *
   * @return {Promise<void>}
   *
   * @example
   * ```javascript
   * const body = {
   *  linkedId: 'linked_id',
   *  suspect: false,
   * }
   *
   * client
   *   .updateEvent(body, '<eventId>')
   *   .then(() => {
   *     // Event was successfully updated
   *   })
   *  .catch((error) => {
   *    if (error instanceof RequestError) {
   *       console.log(error.statusCode, error.message)
   *       // Access raw response in error
   *       console.log(error.response)
   *
   *       if(error.statusCode === 409) {
   *          // Event is not mutable yet, wait a couple of seconds and retry the update.
   *       }
   *     }
   *   })
   * ```
   */
  public async updateEvent(body: EventUpdate, eventId: string): Promise<void> {
    if (!body) {
      throw new TypeError('body is not set')
    }

    if (!eventId) {
      throw new TypeError('eventId is not set')
    }

    return this.callApi({
      path: '/events/{event_id}',
      region: this.region,
      pathParams: [eventId],
      method: 'patch',
      body: JSON.stringify(body),
    })
  }

  /**
   * Delete data by visitor ID
   * Request deleting all data associated with the specified visitor ID. This API is useful for compliance with privacy regulations. All delete requests are queued:
   * Recent data (10 days or newer) belonging to the specified visitor will be deleted within 24 hours. * Data from older (11 days or more) identification events  will be deleted after 90 days.
   * If you are interested in using this API, please [contact our support team](https://fingerprint.com/support/) to activate it for you. Otherwise, you will receive a 403.
   *
   * @param visitorId The [visitor ID](https://dev.fingerprint.com/docs/js-agent#visitorid) you want to delete.*
   *
   * @return {Promise<void>} Promise that resolves when the deletion request is successfully queued
   *
   * @example
   * ```javascript
   * client
   *   .deleteVisitorData('<visitorId>')
   *   .then(() => {
   *     // Data deletion request was successfully queued
   *   })
   *  .catch((error) => {
   *    if (error instanceof RequestError) {
   *       console.log(error.statusCode, error.message)
   *       // Access raw response in error
   *       console.log(error.response)
   *
   *       if(error instanceof TooManyRequestsError) {
   *          retryLater(error.retryAfter) // Needs to be implemented on your side
   *       }
   *     }
   *   })
   * ```
   */
  public async deleteVisitorData(visitorId: string): Promise<void> {
    if (!visitorId) {
      throw TypeError('VisitorId is not set')
    }

    return this.callApi({
      path: '/visitors/{visitor_id}',
      region: this.region,
      pathParams: [visitorId],
      method: 'delete',
    })
  }

  /**
   * Search for identification events, including Smart Signals, using
   * multiple filtering criteria. If you don't provide `start` or `end`
   * parameters, the default search range is the last 7 days.
   *
   * Please note that events include mobile signals (e.g. `rootApps`) even if
   * the request originated from a non-mobile platform. We recommend you
   * **ignore** mobile signals for such requests.
   *
   * @param {SearchEventsFilter} filter - Events filter
   * @param {number} filter.limit - Limit the number of events returned. Must be greater than 0.
   * @param {string|undefined} filter.pagination_key - Use `pagination_key` to get the next page of results.
   * @param {string|undefined} filter.visitor_id - Unique [visitor identifier](https://dev.fingerprint.com/reference/get-function#visitorid) issued by Fingerprint Identification. Filter for events matching this `visitor_id`.
   * @param {string|undefined} filter.bot - Filter events by the bot detection result, specifically:
   *             - events where any kind of bot was detected.
   *             - events where a good bot was detected.
   *             - events where a bad bot was detected.
   *             - events where no bot was detected.
   *
   *             Allowed values: `all`, `good`, `bad`, `none`.
   * @param {string|undefined} filter.ip_address - Filter events by IP address range. The range can be as specific as a
   *             single IP (/32 for IPv4 or /128 for IPv6).
   *             All ip_address filters must use CIDR notation, for example,
   *             10.0.0.0/24, 192.168.0.1/32
   * @param {string|undefined} filter.linked_id - Filter events by your custom identifier.
   *             You can use [linked IDs](https://dev.fingerprint.com/reference/get-function#linkedid) to
   *             associate identification requests with your own identifier, for
   *             example, session ID, purchase ID, or transaction ID. You can then
   *             use this `linked_id` parameter to retrieve all events associated
   *             with your custom identifier.
   * @param {string|undefined} filter.url - Filter events by the URL (`url` property) associated with the event.
   * @param {string|undefined} filter.origin - Filter events by the origin field of the event. Origin could be the website domain or mobile app bundle ID (eg: com.foo.bar)
   * @param {number|undefined} filter.start - Filter events with a timestamp greater than the start time, in Unix time (milliseconds).
   * @param {number|undefined} filter.end - Filter events with a timestamp smaller than the end time, in Unix time (milliseconds).
   * @param {boolean|undefined} filter.reverse - Sort events in reverse timestamp order.
   * @param {boolean|undefined} filter.suspect - Filter events previously tagged as suspicious via the [Update API](https://dev.fingerprint.com/reference/updateevent).
   * @param {boolean|undefined} filter.vpn - Filter events by VPN Detection result.
   * @param {boolean|undefined} filter.virtual_machine - Filter events by Virtual Machine Detection result.
   * @param {boolean|undefined} filter.tampering - Filter events by Browser Tampering Detection result.
   * @param {boolean|undefined} filter.anti_detect_browser - Filter events by Anti-detect Browser Detection result.
   * @param {boolean|undefined} filter.incognito - Filter events by Browser Incognito Detection result.
   * @param {boolean|undefined} filter.privacy_settings - Filter events by Privacy Settings Detection result.
   * @param {boolean|undefined} filter.jailbroken - Filter events by Jailbroken Device Detection result.
   * @param {boolean|undefined} filter.frida - Filter events by Frida Detection result.
   * @param {boolean|undefined} filter.factory_reset - Filter events by Factory Reset Detection result.
   * @param {boolean|undefined} filter.cloned_app - Filter events by Cloned App Detection result.
   * @param {boolean|undefined} filter.emulator - Filter events by Android Emulator Detection result.
   * @param {boolean|undefined} filter.root_apps - Filter events by Rooted Device Detection result.
   * @param {'high'|'medium'|'low'|undefined} filter.vpn_confidence - Filter events by VPN Detection result confidence level.
   * @param {number|undefined} filter.min_suspect_score - Filter events with Suspect Score result above a provided minimum threshold.
   * @param {boolean|undefined} filter.developer_tools - Filter events by Developer Tools detection result.
   * @param {boolean|undefined} filter.location_spoofing - Filter events by Location Spoofing detection result.
   * @param {boolean|undefined} filter.mitm_attack - Filter events by MITM (Man-in-the-Middle) Attack detection result.
   * @param {boolean|undefined} filter.proxy - Filter events by Proxy detection result.
   * @param {string|undefined} filter.sdk_version - Filter events by a specific SDK version associated with the identification event (`sdk.version` property).
   * @param {string|undefined} filter.sdk_platform - Filter events by the SDK Platform associated with the identification event (`sdk.platform` property).
   * @param {string[]|undefined} filter.environment - Filter for events by providing one or more environment IDs (`environment_id` property).
   * */
  async searchEvents(filter: SearchEventsFilter): Promise<SearchEventsResponse> {
    return this.callApi({
      path: '/events',
      method: 'get',
      queryParams: filter,
    })
  }

  private async callApi<Path extends keyof paths, Method extends AllowedMethod<Path>>(
    options: GetRequestPathOptions<Path, Method> & { headers?: Record<string, string>; body?: BodyInit }
  ): Promise<SuccessJsonOrVoid<Path, Method>> {
    const url = getRequestPath(options)

    let response: Response
    try {
      response = await this.fetch(url, {
        method: options.method.toUpperCase(),
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
        body: options.body,
      })
    } catch (e) {
      throw new SdkError('Network or fetch error', undefined, e as Error)
    }

    const contentType = response.headers.get('content-type') ?? ''
    const isJson = contentType.includes('application/json')

    if (response.ok) {
      if (!isJson || response.status === 204) {
        return undefined as SuccessJsonOrVoid<Path, Method>
      }
      let data
      try {
        data = await response.clone().json()
      } catch (e) {
        throw new SdkError('Failed to parse JSON response', response, this.toError(e))
      }
      return data as SuccessJsonOrVoid<Path, Method>
    }

    let errPayload
    try {
      errPayload = await response.clone().json()
    } catch (e) {
      throw new SdkError('Failed to parse JSON response', response, this.toError(e))
    }
    if (response.status === 429) {
      throw new TooManyRequestsError(errPayload, response)
    }
    if (isErrorResponse(errPayload)) {
      throw new RequestError(errPayload.error.message, errPayload, response.status, errPayload.error.code, response)
    }
    throw RequestError.unknown(response)
  }

  private toError(e: unknown): Error {
    if (e && typeof e === 'object' && 'message' in e) {
      return e as Error
    }

    return new Error(String(e))
  }
}
