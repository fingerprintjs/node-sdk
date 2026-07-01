export interface paths {
  '/events/{event_id}': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get an event by event ID
     * @description Get a detailed analysis of an individual identification event, including Smart Signals.
     *
     *     Use `event_id` as the URL path parameter. This API method is scoped to a request, i.e. all returned information is by `event_id`.
     *
     */
    get: operations['getEvent']
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    /**
     * Update an event
     * @description Change information in existing events specified by `event_id` or *flag suspicious events*.
     *
     *     When an event is created, it can be assigned `linked_id` and `tags` submitted through the JS agent parameters.
     *     This information might not have been available on the client initially, so the Server API permits updating these attributes after the fact.
     *
     *     **Warning** It's not possible to update events older than one month.
     *
     *     **Warning** Trying to update an event immediately after creation may temporarily result in an
     *     error (HTTP 409 Conflict. The event is not mutable yet.) as the event is fully propagated across our systems. In such a case, simply retry the request.
     *
     */
    patch: operations['updateEvent']
    trace?: never
  }
  '/events': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Search events
     * @description ## Search
     *
     *     The `/v4/events` endpoint provides a convenient way to search for past events based on specific parameters. Typical use cases and queries include:
     *
     *     - Searching for events associated with a single `visitor_id` within a time range to get historical behavior of a visitor.
     *     - Searching for events associated with a single `linked_id` within a time range to get all events associated with your internal account identifier.
     *     - Excluding all bot traffic from the query (`good` and `bad` bots)
     *
     *     By default, the API searches events from the last 7 days, sorts them by newest first and returns the last 10 events.
     *
     *     - Use `start` and `end` to specify the time range of the search.
     *     - Use `reverse=true` to sort the results oldest first.
     *     - Use `limit` to specify the number of events to return.
     *     - Use `pagination_key` to get the next page of results if there are more than `limit` events.
     *
     *     ### Filtering events with the `suspect` flag
     *
     *     The `/v4/events` endpoint unlocks a powerful method for fraud protection analytics. The `suspect` flag is exposed in all events where it was previously set by the update API.
     *
     *     You can also apply the `suspect` query parameter as a filter to find all potentially fraudulent activity that you previously marked as `suspect`. This helps identify patterns of fraudulent behavior.
     *
     *     ### Environment scoping
     *
     *     If you use a secret key that is scoped to an environment, you will only get events associated with the same environment. With a workspace-scoped environment, you will get events from all environments.
     *
     *     Smart Signals not activated for your workspace or are not included in the response.
     *
     */
    get: operations['searchEvents']
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/visitors/{visitor_id}': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post?: never
    /**
     * Delete a visitor ID
     * @description Use this API to request the deletion of all data associated with a specific visitor ID.
     *
     *     Upon a request to delete data for a visitor ID,
     *     - The data collected from the corresponding browser (or device) will be deleted asynchronously, typically within a few minutes. This data will no longer be available to identify this browser (or device). When the same browser (or device) revisits, it will receive a new visitor ID.
     *     - The identification events made from this browser (or device) in the past 10 days are typically deleted within 24 hrs.
     *     - The identification events made from this browser (or device) outside of the 10 days will be purged as per your [data retention period](https://docs.fingerprint.com/docs/regions#data-retention).
     *
     *     The following timeline illustrates which events are deleted and which remain after a DELETE API request:
     *     ```
     *     Day 1:  First visit from browser A. (Assigned visitor ID: VID1000)
     *     Day 2:  Browser A revisits. (Assigned the same visitor ID: VID1000)
     *     Day 13: Browser A revisits. (Assigned the same visitor ID: VID1000)
     *     Day 14: Delete VID1000
     *     Day 15: Browser A re-visits. (Assigned a different visitor ID: VID9999)
     *     Day 15: GET /events/day-13 (Returns 404. The event is within the 10 days of deleting VID1000 and will have been deleted)
     *     Day 16: GET /events/day-2 (Returns 200. The event is outside of the 10 days of deleting VID1000 and is still available)
     *     ```
     *
     *     ### Availability
     *     This API is available only for Enterprise plans **upon request**. If you are interested, please [contact our support team](https://fingerprint.com/support/).
     *
     *     ### Rate limits and daily quota
     *     The rate limits and daily quota for this API **differ** from those for our other API.
     *
     *     The maximum number of DELETE requests that can be made in an hour cannot exceed 30 RPH, and the maximum number that can be made in a day cannot exceed 500 RPD.
     *
     *     You can request an increase to these limits by contacting [our support team](https://fingerprint.com/support/).
     *
     */
    delete: operations['deleteVisitorData']
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
}
export type webhooks = Record<string, never>
export interface components {
  schemas: {
    /**
     * @description A customer-provided id that was sent with the request.
     * @example somelinkedId
     */
    LinkedId: string
    /** @description A customer-provided value or an object that was sent with the identification request or updated later. */
    Tags: {
      [key: string]: unknown
    }
    /**
     * @description Unique identifier of the user's request. The first portion of the event_id is a unix epoch milliseconds timestamp.
     *
     * @example 1708102555327.NLOjmg
     */
    EventId: string
    /**
     * Format: int64
     * @description Timestamp of the event with millisecond precision in Unix time.
     * @example 1708102555327
     */
    Timestamp: number
    /**
     * @description Page URL from which the request was sent.
     * @example https://www.example.com/login
     */
    Url: string
    /**
     * @description The type and purpose of the bot.
     *
     * @enum {string}
     */
    BotInfoCategory:
      | 'advertising_and_marketing'
      | 'aggregator'
      | 'ai_agent'
      | 'ai_assistant'
      | 'ai_browser'
      | 'ai_crawler'
      | 'ai_search'
      | 'browser_automation'
      | 'ecommerce'
      | 'monitoring_and_analytics'
      | 'other'
      | 'scraping'
      | 'security'
      | 'search_engine_crawler'
      | 'search_engine_optimization'
      | 'unknown'
    /**
     * @description The verification status of the bot's identity:
     *      * `verified` - well-known bot with publicly verifiable identity, directed by the bot provider.
     *      * `signed` - bot that signs its platform via Web Bot Auth, directed by the bot provider's customers.
     *      * `spoofed` - bot that claims a public identity but fails verification.
     *      * `unknown` - bot that does not publish a verifiable identity.
     *
     * @enum {string}
     */
    BotInfoIdentity: 'verified' | 'signed' | 'spoofed' | 'unknown'
    /**
     * @description Confidence level of the bot identification.
     * @enum {string}
     */
    BotInfoConfidence: 'low' | 'medium' | 'high'
    /** @description Extended bot information. */
    BotInfo: {
      /** @description The type and purpose of the bot.
       *      */
      category: string
      /**
       * @description The organization or company operating the bot.
       * @example Anthropic
       * @example Browserbase
       * @example Google
       * @example OpenAI
       */
      provider: string
      /**
       * @description The URL of the bot provider's website.
       * @example https://fingerprint.com
       */
      provider_url?: string
      /**
       * @description The specific name or identifier of the bot.
       * @example ClaudeBot
       * @example Browserbase Agent
       * @example Googlebot
       * @example GPTBot
       * @example ChatGPT-User
       */
      name: string
      /**
       * @description The verification status of the bot's identity:
       *      * `verified` - well-known bot with publicly verifiable identity, directed by the bot provider.
       *      * `signed` - bot that signs its platform via Web Bot Auth, directed by the bot provider's customers.
       *      * `spoofed` - bot that claims a public identity but fails verification.
       *      * `unknown` - bot that does not publish a verifiable identity.
       *
       * @enum {string}
       */
      identity: 'verified' | 'signed' | 'spoofed' | 'unknown'
      /**
       * @description Confidence level of the bot identification.
       * @enum {string}
       */
      confidence: 'low' | 'medium' | 'high'
    }
    Geolocation: {
      /**
       * @description The IP address is likely to be within this radius (in km) of the specified location.
       * @example 20
       */
      accuracy_radius?: number
      /**
       * Format: double
       * @example 50.05
       */
      latitude?: number
      /**
       * Format: double
       * @example 14.4
       */
      longitude?: number
      /** @example 150 00 */
      postal_code?: string
      /**
       * Format: timezone
       * @example Europe/Prague
       */
      timezone?: string
      /** @example Prague */
      city_name?: string
      /** @example CZ */
      country_code?: string
      /** @example Czechia */
      country_name?: string
      /** @example EU */
      continent_code?: string
      /** @example Europe */
      continent_name?: string
      subdivisions?: {
        /** @example 10 */
        iso_code: string
        /** @example Hlavni mesto Praha */
        name: string
      }[]
    }
    IPInfoV4: {
      /**
       * Format: ipv4
       * @example 94.142.239.124
       */
      address: string
      geolocation?: components['schemas']['Geolocation']
      /** @example 396982
       * @example 16509
       * @example 701 */
      asn?: string
      /** @example Google LLC
       * @example Amazon.com, Inc.
       * @example Verizon Business */
      asn_name?: string
      /** @example 34.160.0.0/12
       * @example 3.208.0.0/12
       * @example 173.56.0.0/16 */
      asn_network?: string
      /** @example hosting
       * @example isp
       * @example business
       * @example education */
      asn_type?: string
      /** @description When true, the request originated from a datacenter. */
      datacenter_result?: boolean
      /** @example Google Cloud
       * @example Amazon AWS */
      datacenter_name?: string
    }
    IPInfoV6: {
      /**
       * Format: ipv6
       * @example 2001:db8:3333:4444:5555:6666:7777:8888
       */
      address: string
      geolocation?: components['schemas']['Geolocation']
      /** @example 396982
       * @example 16509
       * @example 701 */
      asn?: string
      /** @example Google LLC
       * @example Amazon.com, Inc.
       * @example Verizon Business */
      asn_name?: string
      /** @example 2001:4860:4801:10::/64
       * @example 2600:1f00::/24
       * @example 2001:4868:800::/40 */
      asn_network?: string
      /** @example hosting
       * @example isp
       * @example business
       * @example education */
      asn_type?: string
      /** @description When true, the request originated from a datacenter. */
      datacenter_result?: boolean
      /** @example Google Cloud
       * @example Amazon AWS */
      datacenter_name?: string
    }
    /** @description Details about the request IP address. Has separate fields for v4 and v6 IP address versions. */
    IPInfo: {
      v4?: components['schemas']['IPInfoV4']
      v6?: components['schemas']['IPInfoV6']
    }
    /** @description IP address was used by a public proxy provider or belonged to a known recent residential proxy
     *      */
    Proxy: boolean
    /**
     * @description Confidence level of the proxy detection. If a proxy is not detected, confidence is "high". If it's detected, can be "low", "medium", or "high".
     *
     * @enum {string}
     */
    ProxyConfidence: 'low' | 'medium' | 'high'
    /** @description Proxy detection details (present if `proxy` is `true`) */
    ProxyDetails: {
      /**
       * @description Proxy type:
       *      * `residential` - proxies that route through residential and telecom IP addresses to appear as legitimate traffic
       *      * `data_center` - proxies which route through data centers
       *      * `unknown` - reported when a proxy is detected solely by the ML model and the IP sources did not determine a specific type
       *
       * @enum {string}
       */
      proxy_type: 'residential' | 'data_center' | 'unknown'
      /**
       * Format: int64
       * @description Unix millisecond timestamp with hourly resolution of when this IP was last seen as a proxy
       *
       * @example 1708102555327
       */
      last_seen_at?: number
      /**
       * @description String representing the last proxy service provider detected when this
       *     IP was synced. An IP can be shared by multiple service providers.
       *
       * @example Massive
       */
      provider?: string
    }
    /** @description VPN or other anonymizing service has been used when sending the request.
     *      */
    Vpn: boolean
    /**
     * @description A confidence rating for the VPN detection result — "low", "medium", or "high". Depends on the combination of results returned from all VPN detection methods.
     * @enum {string}
     */
    VpnConfidence: 'low' | 'medium' | 'high'
    VpnMethods: {
      /** @description The browser timezone doesn't match the timezone inferred from the request IP address. */
      timezone_mismatch?: boolean
      /** @description Request IP address is owned and used by a public VPN service provider. */
      public_vpn?: boolean
      /** @description This method applies to mobile devices only. Indicates the result of additional methods used to detect a VPN in mobile devices. */
      auxiliary_mobile?: boolean
      /** @description The browser runs on a different operating system than the operating system inferred from the request network signature. */
      os_mismatch?: boolean
      /** @description Request IP address belongs to a relay service provider, indicating the use of relay services like [Apple Private relay](https://support.apple.com/en-us/102602) or [Cloudflare Warp](https://developers.cloudflare.com/warp-client/).
       *
       *     * Like VPNs, relay services anonymize the visitor's true IP address.
       *     * Unlike traditional VPNs, relay services don't let visitors spoof their location by choosing an exit node in a different country.
       *
       *     This field allows you to differentiate VPN users and relay service users in your fraud prevention logic.
       *      */
      relay?: boolean
      /** @description `true` if the request came from a device running a VPN, `false` otherwise.
       *      */
      ml_prediction?: boolean
    }
    /**
     * @description Error code:
     *     * `request_cannot_be_parsed` - The query parameters or JSON payload contains some errors
     *       that prevented us from parsing it (wrong type/surpassed limits).
     *     * `request_read_timeout` - The request body could not be read before the connection timed out.
     *     * `secret_api_key_required` - secret API key in header is missing or empty.
     *     * `secret_api_key_not_found` - No Fingerprint workspace found for specified secret API key.
     *     * `public_api_key_required` - public API key in header is missing or empty.
     *     * `public_api_key_not_found` - No Fingerprint workspace found for specified public API key.
     *     * `subscription_not_active` - Fingerprint workspace is not active.
     *     * `wrong_region` - Server and workspace region differ.
     *     * `feature_not_enabled` - This feature (for example, Delete API) is not enabled for your workspace.
     *     * `visitor_not_found` - The specified visitor ID was not found. It never existed or it may have already been deleted.
     *     * `too_many_requests` - The limit on secret API key requests per second has been exceeded.
     *     * `state_not_ready` - The event specified with event ID is
     *       not ready for updates yet. Try again.
     *       This error happens in rare cases when update API is called immediately
     *       after receiving the event ID on the client. In case you need to send
     *       information right away, we recommend using the JS agent API instead.
     *     * `failed` - Internal server error.
     *     * `event_not_found` - The specified event ID was not found. It never existed, expired, or it has been deleted.
     *     * `missing_module` - The request is invalid because it is missing a required module.
     *     * `payload_too_large` - The request payload is too large and cannot be processed.
     *     * `service_unavailable` - The service was unable to process the request.
     *     * `ruleset_not_found` - The specified ruleset was not found. It never existed or it has been deleted.
     *
     * @enum {string}
     */
    ErrorCode:
      | 'request_cannot_be_parsed'
      | 'request_read_timeout'
      | 'secret_api_key_required'
      | 'secret_api_key_not_found'
      | 'public_api_key_required'
      | 'public_api_key_not_found'
      | 'subscription_not_active'
      | 'wrong_region'
      | 'feature_not_enabled'
      | 'visitor_not_found'
      | 'too_many_requests'
      | 'state_not_ready'
      | 'failed'
      | 'event_not_found'
      | 'missing_module'
      | 'payload_too_large'
      | 'service_unavailable'
      | 'ruleset_not_found'
    Error: {
      /** @description Error code:
       *     * `request_cannot_be_parsed` - The query parameters or JSON payload contains some errors
       *       that prevented us from parsing it (wrong type/surpassed limits).
       *     * `request_read_timeout` - The request body could not be read before the connection timed out.
       *     * `secret_api_key_required` - secret API key in header is missing or empty.
       *     * `secret_api_key_not_found` - No Fingerprint workspace found for specified secret API key.
       *     * `public_api_key_required` - public API key in header is missing or empty.
       *     * `public_api_key_not_found` - No Fingerprint workspace found for specified public API key.
       *     * `subscription_not_active` - Fingerprint workspace is not active.
       *     * `wrong_region` - Server and workspace region differ.
       *     * `feature_not_enabled` - This feature (for example, Delete API) is not enabled for your workspace.
       *     * `visitor_not_found` - The specified visitor ID was not found. It never existed or it may have already been deleted.
       *     * `too_many_requests` - The limit on secret API key requests per second has been exceeded.
       *     * `state_not_ready` - The event specified with event ID is
       *       not ready for updates yet. Try again.
       *       This error happens in rare cases when update API is called immediately
       *       after receiving the event ID on the client. In case you need to send
       *       information right away, we recommend using the JS agent API instead.
       *     * `failed` - Internal server error.
       *     * `event_not_found` - The specified event ID was not found. It never existed, expired, or it has been deleted.
       *     * `missing_module` - The request is invalid because it is missing a required module.
       *     * `payload_too_large` - The request payload is too large and cannot be processed.
       *     * `service_unavailable` - The service was unable to process the request.
       *     * `ruleset_not_found` - The specified ruleset was not found. It never existed or it has been deleted.
       *      */
      code: components['schemas']['ErrorCode']
      /** @example Forbidden */
      message: string
    }
    ErrorResponse: {
      error: components['schemas']['Error']
    }
    /**
     * @description Only included for requests using incremental identification.
     *     - `partially_completed` - Indicates this event corresponds to a 'minimal' request. Smart Signals, even if included in your plan, are not computed; hence, their values must be ignored.
     *     - `completed` - Indicates this event corresponds to a 'complete' request. Smart Signals, if included in your plan, are computed; hence, their values are valid and relevant.
     *
     * @enum {string}
     */
    IncrementalIdentificationStatus: 'partially_completed' | 'completed'
    /**
     * @description Environment Id of the event.
     * @example ae_47abaca3db2c7c43
     */
    EnvironmentId: string
    /** @description Field is `true` if you have previously set the `suspect` flag for this event using the [Server API Update event endpoint](https://docs.fingerprint.com/reference/server-api-v4-update-event). */
    Suspect: boolean
    Integration: {
      /**
       * @description The name of the specific integration.
       * @example fingerprint-pro-react
       */
      name?: string
      /**
       * @description The version of the specific integration.
       * @example 3.11.10
       */
      version?: string
      subintegration?: {
        /**
         * @description The name of the specific subintegration.
         * @example preact
         */
        name?: string
        /**
         * @description The version of the specific subintegration.
         * @example 10.21.0
         */
        version?: string
      }
    }
    /** @description Contains information about the SDK used to perform the request. */
    SDK: {
      /**
       * @description Platform of the SDK used for the identification request.
       * @enum {string}
       */
      platform: 'js' | 'android' | 'ios' | 'unknown'
      /**
       * @description Version string of the SDK used for the identification request.
       * @example 3.11.10
       */
      version: string
      integrations?: components['schemas']['Integration'][]
    }
    /** @description `true` if we determined that this payload was replayed, `false` otherwise.
     *      */
    Replayed: boolean
    /** @description The confidence score represents the probability of a false-positive identification. To learn more, visit [Confidence Score](https://docs.fingerprint.com/docs/identification-accuracy-and-confidence#confidence-score). Please note that the confidence score is not yet supported for [High Recall ID](https://docs.fingerprint.com/docs/supplementary-identifiers-highrecall).  */
    IdentificationConfidence: {
      /**
       * Format: double
       * @description A floating-point number between 0 and 1 that represents the probability of a false-positive identification. For High Recall ID, this value is 0.
       * @example 0.97
       */
      score: number
      /**
       * @description The version name of the method used to calculate the confidence score. For High Recall ID, this value is "Not Supported".
       * @example 1.1
       */
      version?: string
      /** @example Low confidence due to bot signals */
      comment?: string
    }
    Identification: {
      /**
       * @description String of 20 characters that uniquely identifies the visitor's browser or mobile device.
       * @example Ibk1527CUFmcnjLwIs4A9
       */
      visitor_id: string
      /** @description The confidence score represents the probability of a false-positive identification. To learn more, visit [Confidence Score](https://docs.fingerprint.com/docs/identification-accuracy-and-confidence#confidence-score). Please note that the confidence score is not yet supported for [High Recall ID](https://docs.fingerprint.com/docs/supplementary-identifiers-highrecall).  */
      confidence?: components['schemas']['IdentificationConfidence']
      /** @description Attribute represents if a visitor had been identified before. */
      visitor_found: boolean
      /**
       * Format: int64
       * @description Unix epoch time milliseconds timestamp indicating the time at which this visitor ID was first seen. example: `1758069706642` - Corresponding to Wed Sep 17 2025 00:41:46 GMT+0000
       *
       * @example 1708102555327
       */
      first_seen_at?: number
      /**
       * Format: int64
       * @description Unix epoch time milliseconds timestamp indicating the time at which this visitor ID was last seen. example: `1758069706642` - Corresponding to Wed Sep 17 2025 00:41:46 GMT+0000
       *
       * @example 1708102555327
       */
      last_seen_at?: number
    }
    /** @description The High Recall ID is a supplementary browser identifier designed for use cases that require wider coverage over precision. Compared to the standard visitor ID, the High Recall ID strives to match incoming browsers more generously (rather than precisely) with existing browsers and thus identifies fewer browsers as new. The High Recall ID is best suited for use cases that are sensitive to browsers being identified as new and where mismatched browsers are not detrimental. */
    SupplementaryIDHighRecall: {
      /**
       * @description The High Recall identifier for the visitor's browser. It is an alphanumeric string with a maximum length of 25 characters.
       * @example 0jnGMkPYXX37DqVa4ZIO3f_hr
       */
      visitor_id: string
      /** @description True if this is a returning browser and has been previously identified. Otherwise, false. */
      visitor_found: boolean
      /** @description The confidence score represents the probability of a false-positive identification. To learn more, visit [Confidence Score](https://docs.fingerprint.com/docs/identification-accuracy-and-confidence#confidence-score). Please note that the confidence score is not yet supported for [High Recall ID](https://docs.fingerprint.com/docs/supplementary-identifiers-highrecall).  */
      confidence?: components['schemas']['IdentificationConfidence']
      /**
       * Format: int64
       * @description Unix epoch timestamp (in milliseconds) indicating when the browser was first identified. example: `1758069706642` - Corresponding to Wed Sep 17 2025 00:41:46 GMT+0000
       *
       * @example 1778086556130
       */
      first_seen_at?: number
      /**
       * Format: int64
       * @description Unix epoch timestamp (in milliseconds) corresponding to the most recent visit by this browser. example: `1758069706642` - Corresponding to Wed Sep 17 2025 00:41:46 GMT+0000
       *
       * @example 1778604975494
       */
      last_seen_at?: number
    }
    /**
     * @description Bundle Id of the iOS application integrated with the Fingerprint SDK for the event.
     *
     * @example com.foo.app
     */
    BundleId: string
    /**
     * @description Package name of the Android application integrated with the Fingerprint SDK for the event.
     *
     * @example com.foo.app
     */
    PackageName: string
    /**
     * @description IP address of the requesting browser or bot.
     * @example 61.127.217.15
     */
    IpAddress: string
    /**
     * @description User Agent of the client.
     * @example Mozilla/5.0 (Windows NT 6.1; Win64; x64) ....
     */
    UserAgent: string
    /**
     * @description Device model or family extracted from the user agent string. On web, this field is also present inside `browser_details`.
     *
     * @example Generic Smartphone
     * @example Desktop
     * @example iPhone
     */
    Device: string
    /**
     * @description Operating system family extracted from the user agent string. On web, this field is also present inside `browser_details`.
     *
     * @example Windows
     * @example iOS
     * @example Android
     */
    Os: string
    /**
     * @description Operating system version string extracted from the user agent string. On web, this field is also present inside `browser_details`.
     *
     * @example 17.4
     * @example 14
     * @example 10
     */
    OsVersion: string
    /**
     * @description Client Referrer field corresponds to the `document.referrer` field gathered during an identification request. The value is an empty string if the user navigated to the page directly (not through a link, but, for example, by using a bookmark).
     *
     * @example https://example.com/blog/my-article
     */
    ClientReferrer: string
    BrowserDetails: {
      /** @example Chrome */
      browser_name: string
      /** @example 74 */
      browser_major_version: string
      /** @example 74.0.3729 */
      browser_full_version: string
      /** @example Windows */
      os: string
      /** @example 7 */
      os_version: string
      /** @example Other */
      device: string
    }
    /** @description Proximity ID represents a fixed geographical zone in a discrete global grid within which the device is observed.
     *      */
    Proximity: {
      /**
       * @description A stable privacy-preserving identifier for a given proximity zone.
       *
       * @example w1aTfd4MCvl
       */
      id: string
      /**
       * Format: int32
       * @description The radius of the proximity zone’s precision level, in meters.
       *
       * @enum {integer}
       */
      precision_radius: 10 | 25 | 65 | 175 | 450 | 1200 | 3300 | 8500 | 22500
      /**
       * Format: float
       * @description A value between `0` and `1` representing the likelihood that the true device location lies within the mapped proximity zone.
       *       * Scores closer to `1` indicate high confidence that the location is inside the mapped proximity zone.
       *       * Scores closer to `0` indicate lower confidence, suggesting the true location may fall in an adjacent zone.
       *
       * @example 0.95
       */
      confidence: number
    }
    /**
     * @description Bot detection result:
     *      * `bad` - bad bot detected, such as Selenium, Puppeteer, Playwright, headless browsers, and so on
     *      * `good` - good bot detected, such as Google bot, Baidu Spider, AlexaBot and so on
     *      * `not_detected` - the visitor is not a bot
     *
     * @enum {string}
     */
    BotResult: 'bad' | 'good' | 'not_detected'
    /**
     * @description Additional classification of the bot type if detected.
     *
     * @example fingerprint_agent
     */
    BotType: string
    /** @description Android specific cloned application detection. There are 2 values:
     *     * `true` - Presence of app cloners work detected (e.g. fully cloned application found or launch of it inside of a not main working profile detected).
     *     * `false` - No signs of cloned application detected or the client is not Android.
     *      */
    ClonedApp: boolean
    /** @description `true` if the browser has DevTools open (Chrome, Firefox) or the Android/iOS device has Developer Tools enabled, `false` otherwise.
     *      */
    DeveloperTools: boolean
    /** @description Android specific emulator detection. There are 2 values:
     *     * `true` - Emulated environment detected (e.g. launch inside of AVD).
     *     * `false` - No signs of emulated environment detected or the client is not Android.
     *      */
    Emulator: boolean
    /**
     * Format: int64
     * @description The time of the most recent factory reset that happened on the **mobile device** is expressed as Unix epoch time. When a factory reset cannot be detected on the mobile device or when the request is initiated from a browser,  this field will correspond to the *epoch* time (i.e 1 Jan 1970 UTC) as a value of 0. See [Factory Reset Detection](https://docs.fingerprint.com/docs/smart-signals-reference#factory-reset-detection) to learn more about this Smart Signal.
     *
     * @example 1708102555327
     */
    FactoryReset: number
    /** @description [Frida](https://frida.re/docs/) detection for Android and iOS devices. There are 2 values:
     *     * `true` - Frida detected
     *     * `false` - No signs of Frida or the client is not a mobile device.
     *      */
    Frida: boolean
    IPBlockList: {
      /** @description IP address was part of a known email spam attack (SMTP). */
      email_spam?: boolean
      /** @description IP address was part of a known network attack (SSH/HTTPS). */
      attack_source?: boolean
      /** @description IP address was part of known TOR network activity. */
      tor_node?: boolean
    }
    /**
     * Format: double
     * @description Machine learning–based proxy score, represented as a floating-point value between 0 and 1 (inclusive), with up to three decimal places of precision. A higher score means a higher confidence in the positive `proxy` detection result. This Smart Signal is currently in beta and only available to select customers. If you are interested, please [contact our support team](https://fingerprint.com/support/).
     *
     * @example 0.2
     */
    ProxyMLScore: number
    /** @description `true` if we detected incognito mode used in the browser, `false` otherwise.
     *      */
    Incognito: boolean
    /** @description iOS specific jailbreak detection. There are 2 values:
     *     * `true` - Jailbreak detected.
     *     * `false` - No signs of jailbreak or the client is not iOS.
     *      */
    Jailbroken: boolean
    /** @description Flag indicating whether the request came from a mobile device with location spoofing enabled. */
    LocationSpoofing: boolean
    /** @description * `true` - When requests made from your users' mobile devices to Fingerprint servers have been intercepted and potentially modified.
     *     * `false` - Otherwise or when the request originated from a browser.
     *     See [MitM Attack Detection](https://docs.fingerprint.com/docs/smart-signals-reference#mitm-attack-detection) to learn more about this Smart Signal.
     *      */
    MitMAttack: boolean
    /** @description `true` if the request is from a privacy aware browser (e.g. Tor) or from a browser in which fingerprinting is blocked. Otherwise `false`.
     *      */
    PrivacySettings: boolean
    /** @description Android specific root management apps detection. There are 2 values:
     *     * `true` - Root Management Apps detected (e.g. Magisk).
     *     * `false` - No Root Management Apps detected or the client isn't Android.
     *      */
    RootApps: boolean
    /**
     * @description The ID of the evaluated ruleset.
     * @example rs_b1k1blhqpOX3kU
     */
    RulesetId: string
    /**
     * @description The ID of the rule that matched the identification event.
     * @example r_uE0af8497PFAOD
     */
    RuleId: string
    /**
     * @description The expression of the rule that matched the identification event.
     * @example bot in ["bad"] || incognito
     */
    RuleExpression: string
    /**
     * @description Describes the action to take with the request.
     * @enum {string}
     */
    RuleActionType: 'allow' | 'block'
    RuleActionHeaderField: {
      /**
       * @description The header field name.
       * @example Content-Type
       */
      name: string
      /**
       * @description The value of the header field.
       * @example application/json
       */
      value: string
    }
    /** @description The set of header modifications to apply, in the following order: remove, set, append. */
    RequestHeaderModifications: {
      /** @description The list of headers to remove. */
      remove?: string[]
      /** @description The list of headers to set, overwriting any existing headers with the same name. */
      set?: components['schemas']['RuleActionHeaderField'][]
      /** @description The list of headers to append. */
      append?: components['schemas']['RuleActionHeaderField'][]
    }
    /** @description Informs the client that the request should be forwarded to the origin with optional request header modifications. */
    EventRuleActionAllow: {
      /**
       * @description The ID of the evaluated ruleset.
       * @example rs_b1k1blhqpOX3kU
       */
      ruleset_id: components['schemas']['RulesetId']
      /**
       * @description The ID of the rule that matched the identification event.
       * @example r_uE0af8497PFAOD
       */
      rule_id?: components['schemas']['RuleId']
      /**
       * @description The expression of the rule that matched the identification event.
       * @example bot in ["bad"] || incognito
       */
      rule_expression?: components['schemas']['RuleExpression']
      /**
       * @description discriminator enum property added by openapi-typescript
       * @enum {string}
       */
      type: 'allow'
      /** @description The set of header modifications to apply, in the following order: remove, set, append. */
      request_header_modifications?: components['schemas']['RequestHeaderModifications']
    }
    /**
     * @description A valid HTTP status code.
     * @example 200
     */
    StatusCode: number
    /**
     * @description The response body to send to the client.
     * @example {"title":"Forbidden"}
     */
    RuleActionBody: string
    /** @description Informs the client the request should be blocked using the response described by this rule action. */
    EventRuleActionBlock: {
      /**
       * @description The ID of the evaluated ruleset.
       * @example rs_b1k1blhqpOX3kU
       */
      ruleset_id: components['schemas']['RulesetId']
      /**
       * @description The ID of the rule that matched the identification event.
       * @example r_uE0af8497PFAOD
       */
      rule_id?: components['schemas']['RuleId']
      /**
       * @description The expression of the rule that matched the identification event.
       * @example bot in ["bad"] || incognito
       */
      rule_expression?: components['schemas']['RuleExpression']
      /**
       * @description discriminator enum property added by openapi-typescript
       * @enum {string}
       */
      type: 'block'
      /**
       * @description A valid HTTP status code.
       * @example 200
       */
      status_code?: components['schemas']['StatusCode']
      /** @description A list of headers to send. */
      headers?: components['schemas']['RuleActionHeaderField'][]
      /**
       * @description The response body to send to the client.
       * @example {"title":"Forbidden"}
       */
      body?: components['schemas']['RuleActionBody']
    }
    /** @description Describes the action the client should take, according to the rule in the ruleset that matched the event. When getting an event by event ID, the rule_action will only be included when the ruleset_id query parameter is specified. */
    EventRuleAction: components['schemas']['EventRuleActionAllow'] | components['schemas']['EventRuleActionBlock']
    /** @description iOS specific simulator detection. There are 2 values:
     *     * `true` - Simulator environment detected.
     *     * `false` - No signs of simulator or the client is not iOS.
     *      */
    Simulator: boolean
    /**
     * @description Suspect Score is an easy way to integrate Smart Signals into your fraud protection work flow.  It is a weighted representation of all Smart Signals present in the payload that helps identify suspicious activity. The value range is [0; S] where S is sum of all Smart Signals weights.  See more details here: https://docs.fingerprint.com/docs/suspect-score
     *
     * @example 8
     */
    SuspectScore: number
    /** @description The field can be used as a standalone flag for tampering detection. Alternatively, the more granular fields documented below can be used for workflows that require more context.
     *     * `true` if tampering is detected through an anomalous browser signature, anti-detect browser detection, or other tampering-related methods
     *     * `false` if none of the tampering checks return a positive result
     *      */
    Tampering: boolean
    /**
     * @description The confidence level indicates how certain Fingerprint is that the current request involves browser tampering. This confidence level is determined by evaluating multiple factors, such as heuristic rules, probabilistic anomaly detection, an anti detect browser ml model, and other relevant methods. It is conveyed as a string with possible values such as high, medium, or low
     *     In case of tampering: `true`
     *     * **High confidence**: heuristic anti detect browser signals and the ml model are triggered, or all of the methods are triggered.
     *     * **Medium confidence**: either the ml model triggers alone, the anomaly score triggers alone with or without the heuristic anti detect browser methods trigger.
     *     * **Low confidence**: only the heuristic anti detect methods are triggered.
     *
     *     In case of tampering: `false`
     *     * **High confidence:** Strong signals suggest the user is not tampering with their request.
     *
     * @enum {string}
     */
    TamperingConfidence: 'low' | 'medium' | 'high'
    /**
     * Format: double
     * @description The output of this model is captured as tampering_ml_score, a number indicating how likely an event is coming from an anti detect browser. Values close to 1 signify higher confidence and we consider anything above the threshold of 0.8 to be actionable (the result and anti_detect_browser fields conveniently captures that fact)
     *
     * @example 0.5
     */
    TamperingMlScore: number
    TamperingDetails: {
      /**
       * Format: double
       * @description The output of this model is captured as anomaly_score, a statistical score indicating how rare the visitor's browser signature is compared to the overall population. Values close to 1 signify highly anomalous browsers and we consider anything above the threshold of 0.5 to be actionable (the result field conveniently captures that fact).
       *
       * @example 0.5
       */
      anomaly_score?: number
      /** @description Detects whether the request shows evidence of anti-detect browser usage.
       *     This field may be triggered by:
       *     * heuristic detection of known anti-detect browser behavior
       *     * machine learning detection of anti-detect browser patterns
       *
       *     Examples of anti-detect browsers include tools such as AdsPower, DolphinAnty, OctoBrowser, and GoLogin.
       *      */
      anti_detect_browser?: boolean
    }
    /** @description Is absent if the velocity data could not be generated for the visitor Id.
     *      */
    VelocityData: {
      /**
       * @description Count for the last 5 minutes of velocity data, from the time of the event.
       *
       * @example 1
       */
      '5_minutes': number
      /**
       * @description Count for the last 1 hour of velocity data, from the time of the event.
       *
       * @example 5
       */
      '1_hour': number
      /**
       * @description The `24_hours` interval of `distinct_ip`, `distinct_linked_id`, `distinct_country`, `distinct_ip_by_linked_id` and `distinct_visitor_id_by_linked_id` will be omitted if the number of `events` for the visitor Id in the last 24 hours (`events.['24_hours']`) is higher than 20.000.
       *
       * @example 5
       */
      '24_hours'?: number
    }
    /** @description Sums key data points for a specific `visitor_id`, `ip_address` and `linked_id` at three distinct time
     *     intervals: 5 minutes, 1 hour, and 24 hours as follows:
     *
     *     - Number of distinct IP addresses associated to the visitor Id.
     *     - Number of distinct linked Ids associated with the visitor Id.
     *     - Number of distinct countries associated with the visitor Id.
     *     - Number of identification events associated with the visitor Id.
     *     - Number of identification events associated with the detected IP address.
     *     - Number of distinct IP addresses associated with the provided linked Id.
     *     - Number of distinct visitor Ids associated with the provided linked Id.
     *
     *     The `24h` interval of `distinct_ip`, `distinct_linked_id`, `distinct_country`,
     *     `distinct_ip_by_linked_id` and `distinct_visitor_id_by_linked_id` will be omitted
     *     if the number of `events` for the visitor Id in the last 24
     *     hours (`events.['24h']`) is higher than 20.000.
     *
     *     All will not necessarily be returned in a response, some may be omitted if the
     *     associated event does not have the required data, such as a linked_id.
     *      */
    Velocity: {
      /** @description Is absent if the velocity data could not be generated for the visitor Id.
       *      */
      distinct_ip?: components['schemas']['VelocityData']
      /** @description Is absent if the velocity data could not be generated for the visitor Id.
       *      */
      distinct_linked_id?: components['schemas']['VelocityData']
      /** @description Is absent if the velocity data could not be generated for the visitor Id.
       *      */
      distinct_country?: components['schemas']['VelocityData']
      /** @description Is absent if the velocity data could not be generated for the visitor Id.
       *      */
      events?: components['schemas']['VelocityData']
      /** @description Is absent if the velocity data could not be generated for the visitor Id.
       *      */
      ip_events?: components['schemas']['VelocityData']
      /** @description Is absent if the velocity data could not be generated for the visitor Id.
       *      */
      distinct_ip_by_linked_id?: components['schemas']['VelocityData']
      /** @description Is absent if the velocity data could not be generated for the visitor Id.
       *      */
      distinct_visitor_id_by_linked_id?: components['schemas']['VelocityData']
    }
    /** @description `true` if the request came from a browser running inside a virtual machine (e.g. VMWare), `false` otherwise.
     *      */
    VirtualMachine: boolean
    /**
     * Format: double
     * @description Machine learning–based virtual machine score, represented as a floating-point value between 0 and 1 (inclusive), with up to three decimal places of precision. A higher score means a higher confidence in the positive `virtual_machine` detection result. This Smart Signal is currently in beta and only available to select customers. If you are interested, please [contact our support team](https://fingerprint.com/support/).
     *
     * @example 0.5
     */
    VirtualMachineMLScore: number
    /**
     * Format: double
     * @description Machine learning–based VPN score, represented as a floating-point value between 0 and 1 (inclusive), with up to three decimal places of precision. A higher score means a higher confidence in the positive `vpn` detection result. This Smart Signal is currently in beta and only available to select customers. If you are interested, please [contact our support team](https://fingerprint.com/support/).
     *
     * @example 0.2
     */
    VpnMLScore: number
    /**
     * @description Local timezone which is used in timezone_mismatch method.
     *
     * @example Europe/Berlin
     */
    VpnOriginTimezone: string
    /**
     * @description Country of the request (only for Android SDK version >= 2.4.0, ISO 3166 format or unknown).
     *
     * @example DE
     */
    VpnOriginCountry: string
    /** @description Flag indicating if the request came from a high-activity visitor. */
    HighActivity: boolean
    /** @description `true` if the device is considered rare based on its combination of hardware and software attributes.  A device is classified as rare if it falls within the top 99.9 percentile (lowest-frequency segment) of observed traffic,  or if its configuration has not been previously seen (`not_seen`).
     *     > This Smart Signal is currently in beta and only available to select customers. If you are interested, please [contact our support team](https://fingerprint.com/support/).
     *      */
    RareDevice: boolean
    /**
     * @description The rarity percentile bucket of the device, indicating how uncommon the device configuration is compared to all observed devices.
     *     > This Smart Signal is currently in beta and only available to select customers. If you are interested, please [contact our support team](https://fingerprint.com/support/).
     *
     * @enum {string}
     */
    RareDevicePercentileBucket: '<p95' | 'p95-p99' | 'p99-p99.5' | 'p99.5-p99.9' | 'p99.9+' | 'not_seen'
    /** @description Baseline measurement of canonical fonts rendered on the device. Numeric width metrics, in CSS pixels, for the canonical fonts collected by the agent.
     *      */
    FontPreferences: {
      /**
       * Format: double
       * @example 147.5625
       */
      default?: number
      /**
       * Format: double
       * @example 147.5625
       */
      serif?: number
      /**
       * Format: double
       * @example 144.015625
       */
      sans?: number
      /**
       * Format: double
       * @example 133.0625
       */
      mono?: number
      /**
       * Format: double
       * @example 147.5625
       */
      apple?: number
      /**
       * Format: double
       * @example 9.234375
       */
      min?: number
      /**
       * Format: double
       * @example 146.09375
       */
      system?: number
    }
    /** @description Bounding box metrics describing how the emoji glyph renders. */
    Emoji: {
      /**
       * @description Font family reported by the browser when drawing the emoji.
       * @example Times
       */
      font?: string
      /**
       * Format: double
       * @example 1600
       */
      width?: number
      /**
       * Format: double
       * @example 18
       */
      height?: number
      /**
       * Format: double
       * @example 14
       */
      top?: number
      /**
       * Format: double
       * @example 32
       */
      bottom?: number
      /**
       * Format: double
       * @example 8
       */
      left?: number
      /**
       * Format: double
       * @example 1608
       */
      right?: number
      /**
       * Format: double
       * @example 8
       */
      x?: number
      /**
       * Format: double
       * @example 14
       */
      y?: number
    }
    /**
     * @description List of fonts detected on the device.
     * @example ["Arial Unicode MS","Gill Sans","Helvetica Neue","Menlo"]
     */
    Fonts: string[]
    /**
     * Format: int32
     * @description Rounded amount of RAM in gigabytes.
     * @example 8
     */
    DeviceMemory: number
    /**
     * @description Timezone identifier detected on the client.
     * @example America/Sao_Paulo
     */
    Timezone: string
    /** @description Canvas fingerprint containing winding flag plus geometry/text hashes. */
    Canvas: {
      winding?: boolean
      /**
       * @description Hash of geometry rendering output or `unsupported` markers.
       * @example db3c1462576a399a03ae93d0ab9eb5c4
       */
      geometry?: string
      /**
       * @description Hash of text rendering output or `unsupported` markers.
       * @example 70c3d3f7eb4408dc37a6bf8af1c51029
       */
      text?: string
    }
    /** @description Navigator languages reported by the agent including fallbacks. Each inner array represents ordered language preferences reported by different APIs. Available for browsers, iOS, and Android devices.
     *      */
    Languages: string[][]
    /** @description Hashes of WebGL context attributes and extension support. */
    WebGlExtensions: {
      /** @example 6b1ed336830d2bc96442a9d76373252a */
      context_attributes?: string
      /** @example ea118c48e308bc4b0677118bbb3019ec */
      parameters?: string
      /** @example f223dfbcd580cf142da156d93790eb83 */
      shader_precisions?: string
      /** @example 57233d7b10f89fcd1ff95e3837ccd72d */
      extensions?: string
      /** @example 86a8abb36f0cb30b5946dec0c761d042 */
      extension_parameters?: string
      unsupported_extensions?: string[]
    }
    /** @description Render and vendor strings reported by the WebGL context. */
    WebGlBasics: {
      /** @example WebGL 1.0 (OpenGL ES 2.0 Chromium) */
      version?: string
      /** @example WebKit */
      vendor?: string
      /** @example Google Inc. (Apple) */
      vendor_unmasked?: string
      /** @example WebKit WebGL */
      renderer?: string
      /** @example ANGLE (Apple, ANGLE Metal Renderer: Apple M4, Unspecified Version) */
      renderer_unmasked?: string
      /** @example WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium) */
      shading_language_version?: string
    }
    /** @description Current screen resolution. Available for both browsers and iOS devices */
    ScreenResolution: number[]
    /** @description Browser-reported touch capabilities. */
    TouchSupport: {
      touch_event?: boolean
      touch_start?: boolean
      /**
       * Format: int64
       * @example 0
       */
      max_touch_points?: number
    }
    /**
     * @description Navigator `oscpu` string.
     * @example Windows NT 6.1; Win64; x64
     */
    Oscpu: string
    /**
     * Format: int32
     * @description Integer representing the CPU architecture exposed by the browser.
     * @example 127
     */
    Architecture: number
    /** @description Whether the cookies are enabled in the browser. */
    CookiesEnabled: boolean
    /**
     * Format: int32
     * @description Number of logical CPU cores reported by the browser.
     * @example 10
     */
    HardwareConcurrency: number
    /**
     * @description Locale derived from the Intl.DateTimeFormat API. Negative values indicate known error states. The negative statuses can be:
     *     - "-1": A permanent status for browsers that don't support Intl API.
     *     - "-2": A permanent status for browsers that don't supportDateTimeFormat constructor.
     *     - "-3": A permanent status for browsers in which DateTimeFormat locale is undefined or null.
     *
     * @example en-US
     */
    DateTimeLocale: string
    /**
     * @description Navigator vendor string.
     * @example Google Inc.
     */
    Vendor: string
    /**
     * Format: int32
     * @description Screen color depth in bits.
     * @example 24
     */
    ColorDepth: number
    /**
     * @description Navigator platform string.
     * @example MacIntel
     */
    Platform: string
    /** @description Whether sessionStorage is available. */
    SessionStorage: boolean
    /** @description Whether localStorage is available. */
    LocalStorage: boolean
    /**
     * Format: double
     * @description AudioContext fingerprint or negative status when unavailable. The negative statuses can be:
     *     - -1: A permanent status for those browsers which are known to always suspend audio context
     *     - -2: A permanent status for browsers that don't support the signal
     *     - -3: A temporary status that means that an unexpected timeout has happened
     *
     * @example 124.04347745512496
     */
    Audio: number
    /** @description Browser plugins reported by `navigator.plugins`. */
    Plugins: {
      /** @example PDF Viewer */
      name: string
      /** @example Portable Document Format */
      description?: string
      mimeTypes?: {
        /** @example application/pdf */
        type?: string
        /** @example pdf */
        suffixes?: string
        /** @example Portable Document Format */
        description?: string
      }[]
    }[]
    /** @description Whether IndexedDB is available. */
    IndexedDb: boolean
    /**
     * @description Hash of Math APIs used for entropy collection.
     * @example 5f030fa7d2e5f9f757bfaf81642eb1a6
     */
    Math: string
    /**
     * @description Device model string. Available only for Android and iOS devices.
     * @example iPhone 15 Pro
     */
    DeviceModel: string
    /**
     * @description Device manufacturer string. Available only for Android and iOS devices.
     * @example Apple
     */
    DeviceManufacturer: string
    /**
     * @description Unique identifier for the user’s installed fonts.
     * @example e9f96f6c0e2c0b3a7a8b1d2c3e4f5a6b
     */
    FontHash: string
    /**
     * @description UTC offset in "±HH:MM" format derived from the detected IANA timezone.
     * @example +02:00
     */
    TimezoneOffset: string
    /**
     * Format: int32
     * @description Battery charge level as a percentage (0-100). Available only for Android and iOS devices.
     * @example 75
     */
    BatteryLevel: number
    /** @description Whether the device's low power mode is enabled. Available only for Android and iOS devices. */
    BatteryLowPowerMode: boolean
    /** @description A curated subset of raw browser/device attributes that the API surface exposes. Each property contains a value or object with the data for the collected signal.
     *      */
    RawDeviceAttributes: {
      /** @description Baseline measurement of canonical fonts rendered on the device. Numeric width metrics, in CSS pixels, for the canonical fonts collected by the agent.
       *      */
      font_preferences?: components['schemas']['FontPreferences']
      /** @description Bounding box metrics describing how the emoji glyph renders. */
      emoji?: components['schemas']['Emoji']
      /**
       * @description List of fonts detected on the device.
       * @example ["Arial Unicode MS","Gill Sans","Helvetica Neue","Menlo"]
       */
      fonts?: components['schemas']['Fonts']
      /**
       * @description Rounded amount of RAM in gigabytes.
       * @example 8
       */
      device_memory?: components['schemas']['DeviceMemory']
      /**
       * @description Timezone identifier detected on the client.
       * @example America/Sao_Paulo
       */
      timezone?: components['schemas']['Timezone']
      /** @description Canvas fingerprint containing winding flag plus geometry/text hashes. */
      canvas?: components['schemas']['Canvas']
      /** @description Navigator languages reported by the agent including fallbacks. Each inner array represents ordered language preferences reported by different APIs. Available for browsers, iOS, and Android devices.
       *      */
      languages?: components['schemas']['Languages']
      /** @description Hashes of WebGL context attributes and extension support. */
      webgl_extensions?: components['schemas']['WebGlExtensions']
      /** @description Render and vendor strings reported by the WebGL context. */
      webgl_basics?: components['schemas']['WebGlBasics']
      /** @description Current screen resolution. Available for both browsers and iOS devices */
      screen_resolution?: components['schemas']['ScreenResolution']
      /** @description Browser-reported touch capabilities. */
      touch_support?: components['schemas']['TouchSupport']
      /**
       * @description Navigator `oscpu` string.
       * @example Windows NT 6.1; Win64; x64
       */
      oscpu?: components['schemas']['Oscpu']
      /**
       * @description Integer representing the CPU architecture exposed by the browser.
       * @example 127
       */
      architecture?: components['schemas']['Architecture']
      /** @description Whether the cookies are enabled in the browser. */
      cookies_enabled?: components['schemas']['CookiesEnabled']
      /**
       * @description Number of logical CPU cores reported by the browser.
       * @example 10
       */
      hardware_concurrency?: components['schemas']['HardwareConcurrency']
      /**
       * @description Locale derived from the Intl.DateTimeFormat API. Negative values indicate known error states. The negative statuses can be:
       *     - "-1": A permanent status for browsers that don't support Intl API.
       *     - "-2": A permanent status for browsers that don't supportDateTimeFormat constructor.
       *     - "-3": A permanent status for browsers in which DateTimeFormat locale is undefined or null.
       *
       * @example en-US
       */
      date_time_locale?: components['schemas']['DateTimeLocale']
      /**
       * @description Navigator vendor string.
       * @example Google Inc.
       */
      vendor?: components['schemas']['Vendor']
      /**
       * @description Screen color depth in bits.
       * @example 24
       */
      color_depth?: components['schemas']['ColorDepth']
      /**
       * @description Navigator platform string.
       * @example MacIntel
       */
      platform?: components['schemas']['Platform']
      /** @description Whether sessionStorage is available. */
      session_storage?: components['schemas']['SessionStorage']
      /** @description Whether localStorage is available. */
      local_storage?: components['schemas']['LocalStorage']
      /**
       * @description AudioContext fingerprint or negative status when unavailable. The negative statuses can be:
       *     - -1: A permanent status for those browsers which are known to always suspend audio context
       *     - -2: A permanent status for browsers that don't support the signal
       *     - -3: A temporary status that means that an unexpected timeout has happened
       *
       * @example 124.04347745512496
       */
      audio?: components['schemas']['Audio']
      /** @description Browser plugins reported by `navigator.plugins`. */
      plugins?: components['schemas']['Plugins']
      /** @description Whether IndexedDB is available. */
      indexed_db?: components['schemas']['IndexedDb']
      /**
       * @description Hash of Math APIs used for entropy collection.
       * @example 5f030fa7d2e5f9f757bfaf81642eb1a6
       */
      math?: components['schemas']['Math']
      /**
       * @description Device model string. Available only for Android and iOS devices.
       * @example iPhone 15 Pro
       */
      device_model?: components['schemas']['DeviceModel']
      /**
       * @description Device manufacturer string. Available only for Android and iOS devices.
       * @example Apple
       */
      device_manufacturer?: components['schemas']['DeviceManufacturer']
      /**
       * @description Unique identifier for the user’s installed fonts.
       * @example e9f96f6c0e2c0b3a7a8b1d2c3e4f5a6b
       */
      font_hash?: components['schemas']['FontHash']
      /**
       * @description UTC offset in "±HH:MM" format derived from the detected IANA timezone.
       * @example +02:00
       */
      timezone_offset?: components['schemas']['TimezoneOffset']
      /**
       * @description Battery charge level as a percentage (0-100). Available only for Android and iOS devices.
       * @example 75
       */
      battery_level?: components['schemas']['BatteryLevel']
      /** @description Whether the device's low power mode is enabled. Available only for Android and iOS devices. */
      battery_low_power_mode?: components['schemas']['BatteryLowPowerMode']
    }
    /** @description Each label returns a prediction (true or false) for a specific use case (label field) based on a machine learning score. The machine learning score is determined by a model trained on customer data for that use case. This field is in the beta phase and only available to select customers. If you are interested, please [contact our support team](https://fingerprint.com/support/).
     *      */
    Labels: {
      /** @example automation_tool */
      label: string
      prediction?: boolean
      /**
       * Format: double
       * @example 0.95
       */
      ml_score?: number
    }[]
    /** @description Contains results from Fingerprint Identification and all active Smart Signals. */
    Event: {
      /**
       * @description Unique identifier of the user's request. The first portion of the event_id is a unix epoch milliseconds timestamp.
       *
       * @example 1708102555327.NLOjmg
       */
      event_id: components['schemas']['EventId']
      /**
       * @description Timestamp of the event with millisecond precision in Unix time.
       * @example 1708102555327
       */
      timestamp: components['schemas']['Timestamp']
      /** @description Only included for requests using incremental identification.
       *     - `partially_completed` - Indicates this event corresponds to a 'minimal' request. Smart Signals, even if included in your plan, are not computed; hence, their values must be ignored.
       *     - `completed` - Indicates this event corresponds to a 'complete' request. Smart Signals, if included in your plan, are computed; hence, their values are valid and relevant.
       *      */
      incremental_identification_status?: components['schemas']['IncrementalIdentificationStatus']
      /**
       * @description A customer-provided id that was sent with the request.
       * @example somelinkedId
       */
      linked_id?: components['schemas']['LinkedId']
      /**
       * @description Environment Id of the event.
       * @example ae_47abaca3db2c7c43
       */
      environment_id?: components['schemas']['EnvironmentId']
      /** @description Field is `true` if you have previously set the `suspect` flag for this event using the [Server API Update event endpoint](https://docs.fingerprint.com/reference/server-api-v4-update-event). */
      suspect?: components['schemas']['Suspect']
      /** @description Contains information about the SDK used to perform the request. */
      sdk?: components['schemas']['SDK']
      /** @description `true` if we determined that this payload was replayed, `false` otherwise.
       *      */
      replayed?: components['schemas']['Replayed']
      identification?: components['schemas']['Identification']
      /** @description The High Recall ID is a supplementary browser identifier designed for use cases that require wider coverage over precision. Compared to the standard visitor ID, the High Recall ID strives to match incoming browsers more generously (rather than precisely) with existing browsers and thus identifies fewer browsers as new. The High Recall ID is best suited for use cases that are sensitive to browsers being identified as new and where mismatched browsers are not detrimental. */
      supplementary_id_high_recall?: components['schemas']['SupplementaryIDHighRecall']
      /** @description A customer-provided value or an object that was sent with the identification request or updated later. */
      tags?: components['schemas']['Tags']
      /**
       * @description Page URL from which the request was sent.
       * @example https://www.example.com/login
       */
      url?: components['schemas']['Url']
      /**
       * @description Bundle Id of the iOS application integrated with the Fingerprint SDK for the event.
       *
       * @example com.foo.app
       */
      bundle_id?: components['schemas']['BundleId']
      /**
       * @description Package name of the Android application integrated with the Fingerprint SDK for the event.
       *
       * @example com.foo.app
       */
      package_name?: components['schemas']['PackageName']
      /**
       * @description IP address of the requesting browser or bot.
       * @example 61.127.217.15
       */
      ip_address?: components['schemas']['IpAddress']
      /**
       * @description User Agent of the client.
       * @example Mozilla/5.0 (Windows NT 6.1; Win64; x64) ....
       */
      user_agent?: components['schemas']['UserAgent']
      /**
       * @description Device model or family extracted from the user agent string. On web, this field is also present inside `browser_details`.
       *
       * @example Generic Smartphone
       * @example Desktop
       * @example iPhone
       */
      device?: components['schemas']['Device']
      /**
       * @description Operating system family extracted from the user agent string. On web, this field is also present inside `browser_details`.
       *
       * @example Windows
       * @example iOS
       * @example Android
       */
      os?: components['schemas']['Os']
      /**
       * @description Operating system version string extracted from the user agent string. On web, this field is also present inside `browser_details`.
       *
       * @example 17.4
       * @example 14
       * @example 10
       */
      os_version?: components['schemas']['OsVersion']
      /**
       * @description Client Referrer field corresponds to the `document.referrer` field gathered during an identification request. The value is an empty string if the user navigated to the page directly (not through a link, but, for example, by using a bookmark).
       *
       * @example https://example.com/blog/my-article
       */
      client_referrer?: components['schemas']['ClientReferrer']
      browser_details?: components['schemas']['BrowserDetails']
      /** @description Proximity ID represents a fixed geographical zone in a discrete global grid within which the device is observed.
       *      */
      proximity?: components['schemas']['Proximity']
      /** @description Bot detection result:
       *      * `bad` - bad bot detected, such as Selenium, Puppeteer, Playwright, headless browsers, and so on
       *      * `good` - good bot detected, such as Google bot, Baidu Spider, AlexaBot and so on
       *      * `not_detected` - the visitor is not a bot
       *      */
      bot?: components['schemas']['BotResult']
      /**
       * @description Additional classification of the bot type if detected.
       *
       * @example fingerprint_agent
       */
      bot_type?: components['schemas']['BotType']
      /** @description Extended bot information. */
      bot_info?: components['schemas']['BotInfo']
      /** @description Android specific cloned application detection. There are 2 values:
       *     * `true` - Presence of app cloners work detected (e.g. fully cloned application found or launch of it inside of a not main working profile detected).
       *     * `false` - No signs of cloned application detected or the client is not Android.
       *      */
      cloned_app?: components['schemas']['ClonedApp']
      /** @description `true` if the browser has DevTools open (Chrome, Firefox) or the Android/iOS device has Developer Tools enabled, `false` otherwise.
       *      */
      developer_tools?: components['schemas']['DeveloperTools']
      /** @description Android specific emulator detection. There are 2 values:
       *     * `true` - Emulated environment detected (e.g. launch inside of AVD).
       *     * `false` - No signs of emulated environment detected or the client is not Android.
       *      */
      emulator?: components['schemas']['Emulator']
      /**
       * @description The time of the most recent factory reset that happened on the **mobile device** is expressed as Unix epoch time. When a factory reset cannot be detected on the mobile device or when the request is initiated from a browser,  this field will correspond to the *epoch* time (i.e 1 Jan 1970 UTC) as a value of 0. See [Factory Reset Detection](https://docs.fingerprint.com/docs/smart-signals-reference#factory-reset-detection) to learn more about this Smart Signal.
       *
       * @example 1708102555327
       */
      factory_reset_timestamp?: components['schemas']['FactoryReset']
      /** @description [Frida](https://frida.re/docs/) detection for Android and iOS devices. There are 2 values:
       *     * `true` - Frida detected
       *     * `false` - No signs of Frida or the client is not a mobile device.
       *      */
      frida?: components['schemas']['Frida']
      ip_blocklist?: components['schemas']['IPBlockList']
      /** @description Details about the request IP address. Has separate fields for v4 and v6 IP address versions. */
      ip_info?: components['schemas']['IPInfo']
      /** @description IP address was used by a public proxy provider or belonged to a known recent residential proxy
       *      */
      proxy?: components['schemas']['Proxy']
      /** @description Confidence level of the proxy detection. If a proxy is not detected, confidence is "high". If it's detected, can be "low", "medium", or "high".
       *      */
      proxy_confidence?: components['schemas']['ProxyConfidence']
      /** @description Proxy detection details (present if `proxy` is `true`) */
      proxy_details?: components['schemas']['ProxyDetails']
      /**
       * @description Machine learning–based proxy score, represented as a floating-point value between 0 and 1 (inclusive), with up to three decimal places of precision. A higher score means a higher confidence in the positive `proxy` detection result. This Smart Signal is currently in beta and only available to select customers. If you are interested, please [contact our support team](https://fingerprint.com/support/).
       *
       * @example 0.2
       */
      proxy_ml_score?: components['schemas']['ProxyMLScore']
      /** @description `true` if we detected incognito mode used in the browser, `false` otherwise.
       *      */
      incognito?: components['schemas']['Incognito']
      /** @description iOS specific jailbreak detection. There are 2 values:
       *     * `true` - Jailbreak detected.
       *     * `false` - No signs of jailbreak or the client is not iOS.
       *      */
      jailbroken?: components['schemas']['Jailbroken']
      /** @description Flag indicating whether the request came from a mobile device with location spoofing enabled. */
      location_spoofing?: components['schemas']['LocationSpoofing']
      /** @description * `true` - When requests made from your users' mobile devices to Fingerprint servers have been intercepted and potentially modified.
       *     * `false` - Otherwise or when the request originated from a browser.
       *     See [MitM Attack Detection](https://docs.fingerprint.com/docs/smart-signals-reference#mitm-attack-detection) to learn more about this Smart Signal.
       *      */
      mitm_attack?: components['schemas']['MitMAttack']
      /** @description `true` if the request is from a privacy aware browser (e.g. Tor) or from a browser in which fingerprinting is blocked. Otherwise `false`.
       *      */
      privacy_settings?: components['schemas']['PrivacySettings']
      /** @description Android specific root management apps detection. There are 2 values:
       *     * `true` - Root Management Apps detected (e.g. Magisk).
       *     * `false` - No Root Management Apps detected or the client isn't Android.
       *      */
      root_apps?: components['schemas']['RootApps']
      /** @description Describes the action the client should take, according to the rule in the ruleset that matched the event. When getting an event by event ID, the rule_action will only be included when the ruleset_id query parameter is specified. */
      rule_action?: components['schemas']['EventRuleAction']
      /** @description iOS specific simulator detection. There are 2 values:
       *     * `true` - Simulator environment detected.
       *     * `false` - No signs of simulator or the client is not iOS.
       *      */
      simulator?: components['schemas']['Simulator']
      /**
       * @description Suspect Score is an easy way to integrate Smart Signals into your fraud protection work flow.  It is a weighted representation of all Smart Signals present in the payload that helps identify suspicious activity. The value range is [0; S] where S is sum of all Smart Signals weights.  See more details here: https://docs.fingerprint.com/docs/suspect-score
       *
       * @example 8
       */
      suspect_score?: components['schemas']['SuspectScore']
      /** @description The field can be used as a standalone flag for tampering detection. Alternatively, the more granular fields documented below can be used for workflows that require more context.
       *     * `true` if tampering is detected through an anomalous browser signature, anti-detect browser detection, or other tampering-related methods
       *     * `false` if none of the tampering checks return a positive result
       *      */
      tampering?: components['schemas']['Tampering']
      /** @description The confidence level indicates how certain Fingerprint is that the current request involves browser tampering. This confidence level is determined by evaluating multiple factors, such as heuristic rules, probabilistic anomaly detection, an anti detect browser ml model, and other relevant methods. It is conveyed as a string with possible values such as high, medium, or low
       *     In case of tampering: `true`
       *     * **High confidence**: heuristic anti detect browser signals and the ml model are triggered, or all of the methods are triggered.
       *     * **Medium confidence**: either the ml model triggers alone, the anomaly score triggers alone with or without the heuristic anti detect browser methods trigger.
       *     * **Low confidence**: only the heuristic anti detect methods are triggered.
       *
       *     In case of tampering: `false`
       *     * **High confidence:** Strong signals suggest the user is not tampering with their request.
       *      */
      tampering_confidence?: components['schemas']['TamperingConfidence']
      /**
       * @description The output of this model is captured as tampering_ml_score, a number indicating how likely an event is coming from an anti detect browser. Values close to 1 signify higher confidence and we consider anything above the threshold of 0.8 to be actionable (the result and anti_detect_browser fields conveniently captures that fact)
       *
       * @example 0.5
       */
      tampering_ml_score?: components['schemas']['TamperingMlScore']
      tampering_details?: components['schemas']['TamperingDetails']
      /** @description Sums key data points for a specific `visitor_id`, `ip_address` and `linked_id` at three distinct time
       *     intervals: 5 minutes, 1 hour, and 24 hours as follows:
       *
       *     - Number of distinct IP addresses associated to the visitor Id.
       *     - Number of distinct linked Ids associated with the visitor Id.
       *     - Number of distinct countries associated with the visitor Id.
       *     - Number of identification events associated with the visitor Id.
       *     - Number of identification events associated with the detected IP address.
       *     - Number of distinct IP addresses associated with the provided linked Id.
       *     - Number of distinct visitor Ids associated with the provided linked Id.
       *
       *     The `24h` interval of `distinct_ip`, `distinct_linked_id`, `distinct_country`,
       *     `distinct_ip_by_linked_id` and `distinct_visitor_id_by_linked_id` will be omitted
       *     if the number of `events` for the visitor Id in the last 24
       *     hours (`events.['24h']`) is higher than 20.000.
       *
       *     All will not necessarily be returned in a response, some may be omitted if the
       *     associated event does not have the required data, such as a linked_id.
       *      */
      velocity?: components['schemas']['Velocity']
      /** @description `true` if the request came from a browser running inside a virtual machine (e.g. VMWare), `false` otherwise.
       *      */
      virtual_machine?: components['schemas']['VirtualMachine']
      /**
       * @description Machine learning–based virtual machine score, represented as a floating-point value between 0 and 1 (inclusive), with up to three decimal places of precision. A higher score means a higher confidence in the positive `virtual_machine` detection result. This Smart Signal is currently in beta and only available to select customers. If you are interested, please [contact our support team](https://fingerprint.com/support/).
       *
       * @example 0.5
       */
      virtual_machine_ml_score?: components['schemas']['VirtualMachineMLScore']
      /** @description VPN or other anonymizing service has been used when sending the request.
       *      */
      vpn?: components['schemas']['Vpn']
      /** @description A confidence rating for the VPN detection result — "low", "medium", or "high". Depends on the combination of results returned from all VPN detection methods. */
      vpn_confidence?: components['schemas']['VpnConfidence']
      /**
       * @description Machine learning–based VPN score, represented as a floating-point value between 0 and 1 (inclusive), with up to three decimal places of precision. A higher score means a higher confidence in the positive `vpn` detection result. This Smart Signal is currently in beta and only available to select customers. If you are interested, please [contact our support team](https://fingerprint.com/support/).
       *
       * @example 0.2
       */
      vpn_ml_score?: components['schemas']['VpnMLScore']
      /**
       * @description Local timezone which is used in timezone_mismatch method.
       *
       * @example Europe/Berlin
       */
      vpn_origin_timezone?: components['schemas']['VpnOriginTimezone']
      /**
       * @description Country of the request (only for Android SDK version >= 2.4.0, ISO 3166 format or unknown).
       *
       * @example DE
       */
      vpn_origin_country?: components['schemas']['VpnOriginCountry']
      vpn_methods?: components['schemas']['VpnMethods']
      /** @description Flag indicating if the request came from a high-activity visitor. */
      high_activity_device?: components['schemas']['HighActivity']
      /** @description `true` if the device is considered rare based on its combination of hardware and software attributes.  A device is classified as rare if it falls within the top 99.9 percentile (lowest-frequency segment) of observed traffic,  or if its configuration has not been previously seen (`not_seen`).
       *     > This Smart Signal is currently in beta and only available to select customers. If you are interested, please [contact our support team](https://fingerprint.com/support/).
       *      */
      rare_device?: components['schemas']['RareDevice']
      /** @description The rarity percentile bucket of the device, indicating how uncommon the device configuration is compared to all observed devices.
       *     > This Smart Signal is currently in beta and only available to select customers. If you are interested, please [contact our support team](https://fingerprint.com/support/).
       *      */
      rare_device_percentile_bucket?: components['schemas']['RareDevicePercentileBucket']
      /** @description A curated subset of raw browser/device attributes that the API surface exposes. Each property contains a value or object with the data for the collected signal.
       *      */
      raw_device_attributes?: components['schemas']['RawDeviceAttributes']
      /** @description Each label returns a prediction (true or false) for a specific use case (label field) based on a machine learning score. The machine learning score is determined by a model trained on customer data for that use case. This field is in the beta phase and only available to select customers. If you are interested, please [contact our support team](https://fingerprint.com/support/).
       *      */
      labels?: components['schemas']['Labels']
    }
    EventUpdate: {
      /**
       * @description Linked ID value to assign to the existing event
       * @example somelinkedId
       */
      linked_id?: string
      /** @description A customer-provided value or an object that was sent with the identification request or updated later. */
      tags?: {
        [key: string]: unknown
      }
      /** @description Suspect flag indicating observed suspicious or fraudulent event */
      suspect?: boolean
    }
    /** @description Contains a list of all identification events matching the specified search criteria. */
    EventSearch: {
      events: components['schemas']['Event'][]
      /**
       * @description Use this value in the `pagination_key` parameter to request the next page of search results.
       * @example S9rgMMUb4z3X5t5pr_tSgoSZlmyF0O8X7kCV2m981-iY1LmRTjraa1rTk3L-hQExnDWCi0RA-zAIjaVSTNO2AN2eqQWgzT0RjbieMxRfSdkM-HmOhdOgdQvYfPG3vqU1DJKh4Q
       */
      pagination_key?: string
      /**
       * Format: int64
       * @description This value represents the total number of events matching the search query, up to the limit provided in the `total_hits` query parameter. Only present if the `total_hits` query parameter was provided.
       * @example 100
       */
      total_hits?: number
    }
    /**
     * @description Filter events by the Bot Detection result, specifically:
     *       `all` - events where any kind of bot was detected.
     *       `good` - events where a good bot was detected.
     *       `bad` - events where a bad bot was detected.
     *       `none` - events where no bot was detected.
     *     > Note: When using this parameter, only events with the `bot` property set to a valid value are returned. Events without a `bot` Smart Signal result are left out of the response.
     *
     * @enum {string}
     */
    SearchEventsBot: 'all' | 'good' | 'bad' | 'none'
    /**
     * @description Filter events by their Bot Info result, specifically:
     *       - `all` - events where any kind of bot was detected.
     *       - `none` - events where no bot was detected.
     *
     * @enum {string}
     */
    SearchEventsBotInfo: 'all' | 'none'
    /**
     * @description Filter events by VPN Detection result confidence level.
     *     `high` - events with high VPN Detection confidence.
     *     `medium` - events with medium VPN Detection confidence.
     *     `low` - events with low VPN Detection confidence.
     *     > Note: When using this parameter, only events with the `vpn.confidence` property set to a valid value are returned. Events without a `vpn` Smart Signal result are left out of the response.
     *
     * @enum {string}
     */
    SearchEventsVpnConfidence: 'high' | 'medium' | 'low'
    /**
     * @description Filter events by Device Rarity percentile bucket.
     *     `<p95` - device configuration is in the bottom 95% (most common).
     *     `p95-p99` - device is in the 95th to 99th percentile.
     *     `p99-p99.5` - device is in the 99th to 99.5th percentile.
     *     `p99.5-p99.9` - device is in the 99.5th to 99.9th percentile.
     *     `p99.9+` - device is in the top 0.1% (rarest).
     *     `not_seen` - device configuration has never been observed before.
     *
     *     > This Smart Signal is currently in beta and only available to select customers. If you are interested, please [contact our support team](https://fingerprint.com/support/).
     *
     * @enum {string}
     */
    SearchEventsRareDevicePercentileBucket: '<p95' | 'p95-p99' | 'p99-p99.5' | 'p99.5-p99.9' | 'p99.9+' | 'not_seen'
    /**
     * @description Filter events by the SDK Platform associated with the identification event (`sdk.platform` property) .
     *     `js` - Javascript agent (Web).
     *     `ios` - Apple iOS based devices.
     *     `android` - Android based devices.
     *
     * @enum {string}
     */
    SearchEventsSdkPlatform: 'js' | 'android' | 'ios'
    /**
     * @description Filter events by their incremental identification status (`incremental_identification_status` property). Non incremental identification events are left out of the response.
     *
     * @enum {string}
     */
    SearchEventsIncrementalIdentificationStatus: 'partially_completed' | 'completed'
    /** @enum {string} */
    SearchEventsSource: 'edge'
  }
  responses: never
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}
export type $defs = Record<string, never>
export interface operations {
  getEvent: {
    parameters: {
      query?: {
        /**
         * @description The ID of the ruleset to evaluate against the event, producing the action to take for this event.
         *     The resulting action is returned in the `rule_action` attribute of the response.
         *
         * @example D6N9Kbk9HRWrIWGz
         */
        ruleset_id?: string
      }
      header?: never
      path: {
        /**
         * @description The unique [identifier](https://docs.fingerprint.com/reference/js-agent-v4-get-function#event_id) of each identification request (`requestId` can be used in its place).
         * @example 1708102555327.NLOjmg
         */
        event_id: string
      }
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description OK. */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['Event']
        }
      }
      /** @description Bad request. The event Id provided is not valid. */
      400: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Forbidden. Access to this API is denied. */
      403: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Not found. The event Id cannot be found in this workspace's data. */
      404: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Too Many Requests. The request is throttled. */
      429: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Workspace error. */
      500: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
    }
  }
  updateEvent: {
    parameters: {
      query?: never
      header?: never
      path: {
        /**
         * @description The unique event [identifier](https://docs.fingerprint.com/reference/js-agent-v4-get-function#event_id).
         * @example 1708102555327.NLOjmg
         */
        event_id: string
      }
      cookie?: never
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['EventUpdate']
      }
    }
    responses: {
      /** @description OK. */
      200: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
      /** @description Bad request. The request payload is not valid. */
      400: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Forbidden. Access to this API is denied. */
      403: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Not found. The event Id cannot be found in this workspace's data. */
      404: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Conflict. The event is not mutable yet. */
      409: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
    }
  }
  searchEvents: {
    parameters: {
      query?: {
        /**
         * @description Maximum number of events to return. Defaults to 10 when omitted. Results are selected from the time range (`start`, `end`), ordered by `reverse`, then truncated to provided `limit` size. So `reverse=true` returns the oldest N=`limit` events, otherwise the newest N=`limit` events.
         *
         * @example 10
         */
        limit?: number
        /**
         * @description Use `pagination_key` to get the next page of results.
         *
         *     When more results are available (e.g., you requested up to 100 results for your query using `limit`, but there are more than 100 events total matching your request), the `pagination_key` field is added to the response. The pagination key is an arbitrary string that should not be interpreted in any way and should be passed as-is. In the following request, use that value in the `pagination_key` parameter to get the next page of results:
         *
         *     1. First request, returning most recent 100 events: `GET api-base-url/events?limit=100`
         *     2. Use `response.pagination_key` to get the next page of results: `GET api-base-url/events?limit=100&pagination_key=S9rgMMUb4z3X5t5pr_tSgoSZlmyF0O8X7kCV2m981-iY1LmRTjraa1rTk3L-hQExnDWCi0RA-zAIjaVSTNO2AN2eqQWgzT0RjbieMxRfSdkM-HmOhdOgdQvYfPG3vqU1DJKh4Q`
         *
         * @example S9rgMMUb4z3X5t5pr_tSgoSZlmyF0O8X7kCV2m981-iY1LmRTjraa1rTk3L-hQExnDWCi0RA-zAIjaVSTNO2AN2eqQWgzT0RjbieMxRfSdkM-HmOhdOgdQvYfPG3vqU1DJKh4Q
         */
        pagination_key?: string
        /**
         * @description Unique [visitor identifier](https://docs.fingerprint.com/reference/js-agent-v4-get-function#visitor_id) issued by Fingerprint Identification and all active Smart Signals.
         *
         *     Filter events by matching Visitor ID (`identification.visitor_id` property).
         *
         * @example Ibk1527CUFmcnjLwIs4A9
         */
        visitor_id?: string
        /**
         * @description The High Recall ID is a supplementary browser identifier designed for use cases that require wider coverage over precision. Compared to the standard visitor ID, the High Recall ID strives to match incoming browsers more generously (rather than precisely) with existing browsers and thus identifies fewer browsers as new. The High Recall ID is best suited for use cases that are sensitive to browsers being identified as new and where mismatched browsers are not detrimental.
         *
         *     Filter events by matching High Recall ID (`supplementary_id_high_recall.visitor_id` property).
         *
         * @example Ibk1527CUFmcnjLwIs4A9
         */
        high_recall_id?: string
        /** @description Filter events by the Bot Detection result, specifically:
         *       `all` - events where any kind of bot was detected.
         *       `good` - events where a good bot was detected.
         *       `bad` - events where a bad bot was detected.
         *       `none` - events where no bot was detected.
         *     > Note: When using this parameter, only events with the `bot` property set to a valid value are returned. Events without a `bot` Smart Signal result are left out of the response.
         *      */
        bot?: components['schemas']['SearchEventsBot']
        /** @description Filter events by their Bot Info result, specifically:
         *       - `all` - events where any kind of bot was detected.
         *       - `none` - events where no bot was detected.
         *      */
        bot_info?: components['schemas']['SearchEventsBotInfo']
        /** @description Filter events by their Bot Info Category.
         *
         *     Multiple categories can be provided using the repeated keys syntax. For example, `bot_info_category=ai_agent&bot_info_category=ai_assistant`, will match events with a Bot Info Category of `ai_agent` or `ai_assistant`. Other notations like comma-separated or bracket notation are not supported.
         *      */
        bot_info_category?: components['schemas']['BotInfoCategory'][]
        /** @description Filter events by their Bot Info Identity type.
         *
         *     Multiple identity types can be provided using the repeated keys syntax. For example, `bot_info_identity=verified&bot_info_identity=signed`, will match events with a Bot Info Identity of `verified` or `signed`. Other notations like comma-separated or bracket notation are not supported.
         *      */
        bot_info_identity?: components['schemas']['BotInfoIdentity'][]
        /** @description Filter events by their Bot Info Confidence.
         *
         *     Multiple confidences can be provided using the repeated keys syntax. For example, `bot_info_confidence=high&bot_info_confidence=medium`, will match events with a Bot Info Confidence of `high` or `medium`. Other notations like comma-separated or bracket notation are not supported.
         *      */
        bot_info_confidence?: components['schemas']['BotInfoConfidence'][]
        /**
         * @description Filter events by their Bot Info Provider. The provider must match exactly, partial or wildcard matching is not supported.
         *
         *     Multiple Providers can be provided using the repeated keys syntax. For example, `bot_info_provider=OpenAI&bot_info_provider=AWS`, will match events with a Bot Info Provider of `OpenAI` or `AWS`. Other notations like comma-separated or bracket notation are not supported.
         *
         * @example OpenAI
         */
        bot_info_provider?: string[]
        /**
         * @description Filter events by their Bot Info Name. The name must match exactly, partial or wildcard matching is not supported.
         *
         *     Multiple Names can be provided using the repeated keys syntax. For example, `bot_info_name=ChatGPT%20Agent&bot_info_name=Bedrock%20AgentCore`, will match events with a Bot Info Name of `ChatGPT Agent` or `Bedrock AgentCore`. Other notations like comma-separated or bracket notation are not supported.
         *
         * @example ChatGPT-User
         */
        bot_info_name?: string[]
        /**
         * @description Filter events by IP address or IP range (if CIDR notation is used). If CIDR notation is not used, a /32 for IPv4 or /128 for IPv6 is assumed.
         *     Examples of range based queries: 10.0.0.0/24, 192.168.0.1/32
         *
         * @example 61.127.217.15
         */
        ip_address?: string
        /**
         * @description Filter events by the ASN associated with the event's IP address.
         *     This corresponds to the `ip_info.(v4|v6).asn` property in the response.
         *
         * @example 12876
         */
        asn?: string
        /**
         * @description Filter events by your custom identifier.
         *
         *     You can use [linked Ids](https://docs.fingerprint.com/reference/js-agent-v4-get-function#linkedid) to associate identification requests with your own identifier, for example, session Id, purchase Id, or transaction Id. You can then use this `linked_id` parameter to retrieve all events associated with your custom identifier.
         *
         * @example somelinkedId
         */
        linked_id?: string
        /**
         * @description Filter events by the URL (`url` property) associated with the event.
         *
         * @example https://example.com/login
         */
        url?: string
        /**
         * @description Filter events by the Bundle ID (iOS) associated with the event.
         *
         * @example com.example.app
         */
        bundle_id?: string
        /**
         * @description Filter events by the Package Name (Android) associated with the event.
         *
         * @example com.example.app
         */
        package_name?: string
        /**
         * @description Filter events by the origin field of the event. This is applicable to web events only (e.g., https://example.com)
         *
         * @example https://example.com
         */
        origin?: string
        /**
         * @description Include events that happened after this point (with timestamp greater than or equal the provided `start` Unix milliseconds value or RFC3339 timestamp). Defaults to 7 days ago. Setting `start` does not change `end`'s default of `now` — adjust it separately if needed.
         *
         * @example 2026-01-01T00:00:00Z
         */
        start?: number | string
        /**
         * @description Include events that happened before this point (with timestamp less than or equal the provided `end` Unix milliseconds value or RFC3339 timestamp). Defaults to now. Setting `end` does not change `start`'s default of `7 days ago` — adjust it separately if needed.
         *
         * @example 2026-01-31T23:59:59Z
         */
        end?: number | string
        /** @description When `true`, sort events oldest first (ascending timestamp order). Defaults to `false` (newest first, descending timestamp order).
         *      */
        reverse?: boolean
        /** @description Filter events previously tagged as suspicious via the [Update API](https://docs.fingerprint.com/reference/server-api-v4-update-event).
         *     > Note: When using this parameter, only events with the `suspect` property explicitly set to `true` or `false` are returned. Events with undefined `suspect` property are left out of the response.
         *      */
        suspect?: boolean
        /** @description Filter events by VPN Detection result.
         *     > Note: When using this parameter, only events with the `vpn` property set to `true` or `false` are returned. Events without a `vpn` Smart Signal result are left out of the response.
         *      */
        vpn?: boolean
        /** @description Filter events by Virtual Machine Detection result.
         *     > Note: When using this parameter, only events with the `virtual_machine` property set to `true` or `false` are returned. Events without a `virtual_machine` Smart Signal result are left out of the response.
         *      */
        virtual_machine?: boolean
        /** @description Filter events by Browser Tampering Detection result.
         *     > Note: When using this parameter, only events with the `tampering.result` property set to `true` or `false` are returned. Events without a `tampering` Smart Signal result are left out of the response.
         *      */
        tampering?: boolean
        /** @description Filter events by Anti-detect Browser Detection result.
         *     > Note: When using this parameter, only events with the `tampering.anti_detect_browser` property set to `true` or `false` are returned. Events without a `tampering` Smart Signal result are left out of the response.
         *      */
        anti_detect_browser?: boolean
        /** @description Filter events by Browser Incognito Detection result.
         *     > Note: When using this parameter, only events with the `incognito` property set to `true` or `false` are returned. Events without an `incognito` Smart Signal result are left out of the response.
         *      */
        incognito?: boolean
        /** @description Filter events by Privacy Settings Detection result.
         *     > Note: When using this parameter, only events with the `privacy_settings` property set to `true` or `false` are returned. Events without a `privacy_settings` Smart Signal result are left out of the response.
         *      */
        privacy_settings?: boolean
        /** @description Filter events by Jailbroken Device Detection result.
         *     > Note: When using this parameter, only events with the `jailbroken` property set to `true` or `false` are returned. Events without a `jailbroken` Smart Signal result are left out of the response.
         *      */
        jailbroken?: boolean
        /** @description Filter events by Frida Detection result.
         *     > Note: When using this parameter, only events with the `frida` property set to `true` or `false` are returned. Events without a `frida` Smart Signal result are left out of the response.
         *      */
        frida?: boolean
        /** @description Filter events by Factory Reset Detection result.
         *     > Note: When using this parameter, only events with a `factory_reset` time. Events without a `factory_reset` Smart Signal result are left out of the response.
         *      */
        factory_reset?: boolean
        /** @description Filter events by Cloned App Detection result.
         *     > Note: When using this parameter, only events with the `cloned_app` property set to `true` or `false` are returned. Events without a `cloned_app` Smart Signal result are left out of the response.
         *      */
        cloned_app?: boolean
        /** @description Filter events by Android Emulator Detection result.
         *     > Note: When using this parameter, only events with the `emulator` property set to `true` or `false` are returned. Events without an `emulator` Smart Signal result are left out of the response.
         *      */
        emulator?: boolean
        /** @description Filter events by Rooted Device Detection result.
         *     > Note: When using this parameter, only events with the `root_apps` property set to `true` or `false` are returned. Events without a `root_apps` Smart Signal result are left out of the response.
         *      */
        root_apps?: boolean
        /** @description Filter events by VPN Detection result confidence level.
         *     `high` - events with high VPN Detection confidence.
         *     `medium` - events with medium VPN Detection confidence.
         *     `low` - events with low VPN Detection confidence.
         *     > Note: When using this parameter, only events with the `vpn.confidence` property set to a valid value are returned. Events without a `vpn` Smart Signal result are left out of the response.
         *      */
        vpn_confidence?: components['schemas']['SearchEventsVpnConfidence']
        /**
         * @description Filter events with Suspect Score result above a provided minimum threshold.
         *     > Note: When using this parameter, only events where the `suspect_score` property set to a value exceeding your threshold are returned. Events without a `suspect_score` Smart Signal result are left out of the response.
         *
         * @example 7.5
         */
        min_suspect_score?: number
        /** @description Filter events by Developer Tools detection result.
         *     > Note: When using this parameter, only events with the `developer_tools` property set to `true` or `false` are returned. Events without a `developer_tools` Smart Signal result are left out of the response.
         *      */
        developer_tools?: boolean
        /** @description Filter events by Location Spoofing detection result.
         *     > Note: When using this parameter, only events with the `location_spoofing` property set to `true` or `false` are returned. Events without a `location_spoofing` Smart Signal result are left out of the response.
         *      */
        location_spoofing?: boolean
        /** @description Filter events by MITM (Man-in-the-Middle) Attack detection result.
         *     > Note: When using this parameter, only events with the `mitm_attack` property set to `true` or `false` are returned. Events without a `mitm_attack` Smart Signal result are left out of the response.
         *      */
        mitm_attack?: boolean
        /** @description Filter events by Device Rarity detection result.
         *     > Note: When using this parameter, only events with the `rare_device` property set to `true` or `false` are returned. Events without a Device Rarity Smart Signal result are left out of the response.
         *
         *     > This Smart Signal is currently in beta and only available to select customers. If you are interested, please [contact our support team](https://fingerprint.com/support/).
         *      */
        rare_device?: boolean
        /** @description Filter events by Device Rarity percentile bucket.
         *     `<p95` - device configuration is in the bottom 95% (most common).
         *     `p95-p99` - device is in the 95th to 99th percentile.
         *     `p99-p99.5` - device is in the 99th to 99.5th percentile.
         *     `p99.5-p99.9` - device is in the 99.5th to 99.9th percentile.
         *     `p99.9+` - device is in the top 0.1% (rarest).
         *     `not_seen` - device configuration has never been observed before.
         *
         *     > This Smart Signal is currently in beta and only available to select customers. If you are interested, please [contact our support team](https://fingerprint.com/support/).
         *      */
        rare_device_percentile_bucket?: components['schemas']['SearchEventsRareDevicePercentileBucket']
        /** @description Filter events by Proxy detection result.
         *     > Note: When using this parameter, only events with the `proxy` property set to `true` or `false` are returned. Events without a `proxy` Smart Signal result are left out of the response.
         *      */
        proxy?: boolean
        /**
         * @description Filter events by a specific SDK version associated with the identification event (`sdk.version` property). Example: `3.11.14`
         *
         * @example 3.11.14
         */
        sdk_version?: string
        /** @description Filter events by the SDK Platform associated with the identification event (`sdk.platform` property) .
         *     `js` - Javascript agent (Web).
         *     `ios` - Apple iOS based devices.
         *     `android` - Android based devices.
         *      */
        sdk_platform?: components['schemas']['SearchEventsSdkPlatform']
        /**
         * @description Filter for events by providing one or more environment IDs (`environment_id` property).
         *
         *     ### Array syntax
         *     To provide multiple environment IDs, use the repeated keys syntax (`environment=env1&environment=env2`).
         *     Other notations like comma-separated (`environment=env1,env2`) or bracket notation (`environment[]=env1&environment[]=env2`) are not supported.
         *
         * @example ae_47abaca3db2c7c43
         */
        environment?: string[]
        /**
         * @description Filter events by the most precise Proximity ID provided by default.
         *     > Note: When using this parameter, only events with the `proximity.id` property matching the provided ID are returned. Events without a `proximity` result are left out of the response.
         *
         * @example C9rJYBlOFsAfBwQ
         */
        proximity_id?: string
        /**
         * @description When set, the response will include a `total_hits` property with a count of total query matches across all pages, up to the specified limit.
         *
         * @example 100
         */
        total_hits?: number
        /** @description Filter events by Tor Node detection result.
         *     > Note: When using this parameter, only events with the `tor_node` property set to `true` or `false` are returned. Events without a `tor_node` detection result are left out of the response.
         *      */
        tor_node?: boolean
        /** @description Filter events by their incremental identification status (`incremental_identification_status` property). Non incremental identification events are left out of the response.
         *      */
        incremental_identification_status?: components['schemas']['SearchEventsIncrementalIdentificationStatus']
        /** @description Filter events by iOS Simulator Detection result.
         *
         *     > Note: When using this parameter, only events with the `simulator` property set to `true` or `false` are returned. Events without a `simulator` Smart Signal result are left out of the response.
         *      */
        simulator?: boolean
        /** @description Selects the source of events to search. When omitted, only traditional identification events generated from devices are returned (the default behavior). When set to `edge`, only Automation Intelligence (Edge) events are returned.
         *
         *     > Note: The Automation Intelligence API is in public preview testing phase.  If you encounter any issues, please [contact](https://fingerprint.com/support/) our support team.
         *      */
        source?: components['schemas']['SearchEventsSource'][]
      }
      header?: never
      path?: never
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description Events matching the filter(s). */
      200: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['EventSearch']
        }
      }
      /** @description Bad request. One or more supplied search parameters are invalid, or a required parameter is missing. */
      400: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Forbidden. Access to this API is denied. */
      403: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Not found. The requested visitor does not exist in this workspace's data. */
      404: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Workspace error. */
      500: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
    }
  }
  deleteVisitorData: {
    parameters: {
      query?: never
      header?: never
      path: {
        /**
         * @description The [visitor ID](https://docs.fingerprint.com/reference/js-agent-v4-get-function#visitor_id) you want to delete.
         * @example Ibk1527CUFmcnjLwIs4A9
         */
        visitor_id: string
      }
      cookie?: never
    }
    requestBody?: never
    responses: {
      /** @description OK. The visitor ID is scheduled for deletion. */
      200: {
        headers: {
          [name: string]: unknown
        }
        content?: never
      }
      /** @description Bad request. The visitor ID parameter is missing or in the wrong format. */
      400: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Forbidden. Access to this API is denied. */
      403: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Not found. The visitor ID cannot be found in this workspace's data. */
      404: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
      /** @description Too Many Requests. The request is throttled. */
      429: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorResponse']
        }
      }
    }
  }
}
