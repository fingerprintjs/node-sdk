export interface paths {
  '/events/{request_id}': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get event by request ID
     * @description > 🚧 Deprecation Notice
     *     >
     *     > This version of Server API is marked as deprecated starting on **Jan 7th 2026** and will be fully removed on **Jan 7th 2027** according to our [API Deprecation Policy](https://dev.fingerprint.com/reference/api-deprecation-policy). If you still use this version, please follow our [migration guide](https://dev.fingerprint.com/reference/migrating-from-server-api-v3-to-v4#migrating-get-events) to migrate from this deprecated version to the new one.
     *
     *     Get a detailed analysis of an individual identification event, including Smart Signals.
     *     Please note that the response includes mobile signals (e.g. `rootApps`) even if the request originated from a non-mobile platform.
     *     It is highly recommended that you **ignore** the mobile signals for such requests.
     *
     *     Use `requestId` as the URL path parameter. This API method is scoped to a request, i.e. all returned information is by `requestId`.
     *
     */
    get: operations['getEvent']
    /**
     * Update an event with a given request ID
     * @description > 🚧 Deprecation Notice
     *     >
     *     > This version of Server API is marked as deprecated starting on **Jan 7th 2026** and will be fully removed on **Jan 7th 2027** according to our [API Deprecation Policy](https://dev.fingerprint.com/reference/api-deprecation-policy). If you still use this version, please follow our [migration guide](https://dev.fingerprint.com/reference/migrating-from-server-api-v3-to-v4#migrating-update-events) to migrate from this deprecated version to the new one.
     *
     *     Change information in existing events specified by `requestId` or *flag suspicious events*.
     *
     *     When an event is created, it is assigned `linkedId` and `tag` submitted through the JS agent parameters. This information might not be available on the client so the Server API allows for updating the attributes after the fact.
     *
     *     **Warning** It's not possible to update events older than 10 days.
     *
     */
    put: operations['updateEvent']
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/events/search': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get events via search
     * @description > 🚧 Deprecation Notice
     *     >
     *     > This version of Server API is marked as deprecated starting on **Jan 7th 2026** and will be fully removed on **Jan 7th 2027** according to our [API Deprecation Policy](https://dev.fingerprint.com/reference/api-deprecation-policy). If you still use this version, please follow our [migration guide](https://dev.fingerprint.com/reference/migrating-from-server-api-v3-to-v4#migrating-get-eventssearch) to migrate from this deprecated version to the new one.
     *
     *     Search for identification events, including Smart Signals, using multiple filtering criteria. If you don't provide `start` or `end` parameters, the default search range is the last 7 days.
     *
     *     Please note that events include mobile signals (e.g. `rootApps`) even if the request originated from a non-mobile platform. We recommend you **ignore** mobile signals for such requests.
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
    /**
     * Get visits by visitor ID
     * @description > 🚧 Deprecation Notice
     *     >
     *     > This version of Server API is marked as deprecated starting on **Jan 7th 2026** and will be fully removed on **Jan 7th 2027** according to our [API Deprecation Policy](https://dev.fingerprint.com/reference/api-deprecation-policy). If you still use this version, please follow our [migration guide](https://dev.fingerprint.com/reference/migrating-from-server-api-v3-to-v4#migrating-get-visitors) to migrate from this deprecated version to the new one.
     *
     *     Get a history of visits (identification events) for a specific `visitorId`. Use the `visitorId` as a URL path parameter.
     *     Only information from the _Identification_ product is returned.
     *
     *     #### Headers
     *
     *     * `Retry-After` — Present in case of `429 Too many requests`. Indicates how long you should wait before making a follow-up request. The value is non-negative decimal integer indicating the seconds to delay after the response is received.
     *
     */
    get: operations['getVisits']
    put?: never
    post?: never
    /**
     * Delete data by visitor ID
     * @description > 🚧 Deprecation Notice
     *     >
     *     > This version of Server API is marked as deprecated starting on **Jan 7th 2026** and will be fully removed on **Jan 7th 2027** according to our [API Deprecation Policy](https://dev.fingerprint.com/reference/api-deprecation-policy). If you still use this version, please follow our [migration guide](https://dev.fingerprint.com/reference/migrating-from-server-api-v3-to-v4) to migrate from this deprecated version to the new one.
     *
     *     Request deleting all data associated with the specified visitor ID. This API is useful for compliance with privacy regulations.
     *     ### Which data is deleted?
     *     - Browser (or device) properties
     *     - Identification requests made from this browser (or device)
     *
     *     #### Browser (or device) properties
     *     - Represents the data that Fingerprint collected from this specific browser (or device) and everything inferred and derived from it.
     *     - Upon request to delete, this data is deleted asynchronously (typically within a few minutes) and it will no longer be used to identify this browser (or device) for your [Fingerprint Workspace](https://dev.fingerprint.com/docs/glossary#fingerprint-workspace).
     *
     *     #### Identification requests made from this browser (or device)
     *     - Fingerprint stores the identification requests made from a browser (or device) for up to 30 (or 90) days depending on your plan. To learn more, see [Data Retention](https://dev.fingerprint.com/docs/regions#data-retention).
     *     - Upon request to delete, the identification requests that were made by this browser
     *       - Within the past 10 days are deleted within 24 hrs.
     *       - Outside of 10 days are allowed to purge as per your data retention period.
     *
     *     ### Corollary
     *     After requesting to delete a visitor ID,
     *     - If the same browser (or device) requests to identify, it will receive a different visitor ID.
     *     - If you request [`/events` API](https://dev.fingerprint.com/reference/getevent) with a `request_id` that was made outside of the 10 days, you will still receive a valid response.
     *     - If you request [`/visitors` API](https://dev.fingerprint.com/reference/getvisits) for the deleted visitor ID, the response will include identification requests that were made outside of those 10 days.
     *
     *     ### Interested?
     *     Please [contact our support team](https://fingerprint.com/support/) to enable it for you. Otherwise, you will receive a 403.
     *
     */
    delete: operations['deleteVisitorData']
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/related-visitors': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    /**
     * Get Related Visitors
     * @description > 🚧 Deprecation Notice
     *     >
     *     > This version of Server API is marked as deprecated starting on **Jan 7th 2026** and will be fully removed on **Jan 7th 2027** according to our [API Deprecation Policy](https://dev.fingerprint.com/reference/api-deprecation-policy).
     *
     *     Related visitors API lets you link web visits and in-app browser visits that originated from the same mobile device.
     *     It searches the past 6 months of identification events to find the visitor IDs that belong to the same mobile device as the given visitor ID.
     *
     *     ⚠️ Please note that this API is not enabled by default and is billable separately. ⚠️
     *
     *     If you would like to use Related visitors API, please contact our [support team](https://fingerprint.com/support).
     *     To learn more, see [Related visitors API reference](https://dev.fingerprint.com/reference/related-visitors-api).
     *
     */
    get: operations['getRelatedVisitors']
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    trace?: never
  }
  '/webhook': {
    parameters: {
      query?: never
      header?: never
      path?: never
      cookie?: never
    }
    get?: never
    put?: never
    post?: never
    delete?: never
    options?: never
    head?: never
    patch?: never
    /**
     * Dummy path to describe webhook format.
     * @description Fake path to describe webhook format. More information about webhooks can be found in the [documentation](https://dev.fingerprint.com/docs/webhooks)
     */
    trace: {
      parameters: {
        query?: never
        header?: never
        path?: never
        cookie?: never
      }
      requestBody?: {
        content: {
          'application/json': components['schemas']['Webhook']
        }
      }
      responses: {
        /** @description Dummy for the schema */
        default: {
          headers: {
            [name: string]: unknown
          }
          content?: never
        }
      }
    }
  }
}
export type webhooks = Record<string, never>
export interface components {
  schemas: {
    BrowserDetails: {
      browserName: string
      browserMajorVersion: string
      browserFullVersion: string
      os: string
      osVersion: string
      device: string
      userAgent: string
    }
    GeolocationCity: {
      name: string
    }
    GeolocationCountry: {
      code: string
      name: string
    }
    GeolocationContinent: {
      code: string
      name: string
    }
    GeolocationSubdivision: {
      isoCode: string
      name: string
    }
    GeolocationSubdivisions: components['schemas']['GeolocationSubdivision'][]
    /**
     * @deprecated
     * @description This field is **deprecated** and will not return a result for **applications created after January 23rd, 2024**.  Please use the [IP Geolocation Smart signal](https://dev.fingerprint.com/docs/smart-signals-overview#ip-geolocation) for geolocation information.
     */
    DeprecatedGeolocation: {
      /** @description The IP address is likely to be within this radius (in km) of the specified location. */
      accuracyRadius?: number
      /** Format: double */
      latitude?: number
      /** Format: double */
      longitude?: number
      postalCode?: string
      /** Format: timezone */
      timezone?: string
      city?: components['schemas']['GeolocationCity']
      country?: components['schemas']['GeolocationCountry']
      continent?: components['schemas']['GeolocationContinent']
      subdivisions?: components['schemas']['GeolocationSubdivisions']
    }
    /** @description A customer-provided value or an object that was sent with identification request. */
    Tag: {
      [key: string]: unknown
    }
    IdentificationConfidence: {
      /**
       * Format: double
       * @description The confidence score is a floating-point number between 0 and 1 that represents the probability of accurate identification.
       */
      score: number
      /** @description The revision name of the method used to calculate the Confidence score. This field is only present for customers who opted in to an alternative calculation method. */
      revision?: string
      comment?: string
    }
    IdentificationSeenAt: {
      /** Format: date-time */
      global: string | null
      /** Format: date-time */
      subscription: string | null
    }
    RawDeviceAttributeError: {
      name?: string
      message?: string
    }
    RawDeviceAttribute: {
      /** value */
      value?: unknown
      error?: components['schemas']['RawDeviceAttributeError']
    }
    /** @description It includes 35+ raw browser identification attributes to provide Fingerprint users with even more information than our standard visitor ID provides. This enables Fingerprint users to not have to run our open-source product in conjunction with Fingerprint Pro Plus and Enterprise to get those additional attributes.
     *     Warning: The raw signals data can change at any moment as we improve the product. We cannot guarantee the internal shape of raw device attributes to be stable, so typical semantic versioning rules do not apply here. Use this data with caution without assuming a specific structure beyond the generic type provided here.
     *      */
    RawDeviceAttributes: {
      [key: string]: components['schemas']['RawDeviceAttribute']
    }
    Integration: {
      /** @description The name of the specific integration, e.g. "fingerprint-pro-react". */
      name?: string
      /** @description The version of the specific integration, e.g. "3.11.10". */
      version?: string
      subintegration?: {
        /** @description The name of the specific subintegration, e.g. "preact". */
        name?: string
        /** @description The version of the specific subintegration, e.g. "10.21.0". */
        version?: string
      }
    }
    /** @description Contains information about the SDK used to perform the request. */
    SDK: {
      /** @description Platform of the SDK. */
      platform: string
      /** @description SDK version string. */
      version: string
      integrations?: components['schemas']['Integration'][]
    }
    Identification: {
      /** @description String of 20 characters that uniquely identifies the visitor's browser or mobile device. */
      visitorId: string
      /** @description Unique identifier of the user's request. */
      requestId: string
      browserDetails: components['schemas']['BrowserDetails']
      /** @description Flag if user used incognito session. */
      incognito: boolean
      /** @description IP address of the requesting browser or bot. */
      ip: string
      /** @description This field is **deprecated** and will not return a result for **applications created after January 23rd, 2024**.  Please use the [IP Geolocation Smart signal](https://dev.fingerprint.com/docs/smart-signals-overview#ip-geolocation) for geolocation information. */
      ipLocation?: components['schemas']['DeprecatedGeolocation']
      /** @description A customer-provided id that was sent with the request. */
      linkedId?: string
      /** @description Field is `true` if you have previously set the `suspect` flag for this event using the [Server API Update event endpoint](https://dev.fingerprint.com/reference/updateevent). */
      suspect?: boolean
      /**
       * Format: int64
       * @description Timestamp of the event with millisecond precision in Unix time.
       */
      timestamp: number
      /**
       * Format: date-time
       * @description Time expressed according to ISO 8601 in UTC format, when the request from the JS agent was made. We recommend to treat requests that are older than 2 minutes as malicious. Otherwise, request replay attacks are possible.
       */
      time: string
      /** @description Page URL from which the request was sent. */
      url: string
      /** @description A customer-provided value or an object that was sent with identification request. */
      tag: components['schemas']['Tag']
      confidence?: components['schemas']['IdentificationConfidence']
      /** @description Attribute represents if a visitor had been identified before. */
      visitorFound: boolean
      firstSeenAt: components['schemas']['IdentificationSeenAt']
      lastSeenAt: components['schemas']['IdentificationSeenAt']
      /** @description It includes 35+ raw browser identification attributes to provide Fingerprint users with even more information than our standard visitor ID provides. This enables Fingerprint users to not have to run our open-source product in conjunction with Fingerprint Pro Plus and Enterprise to get those additional attributes.
       *     Warning: The raw signals data can change at any moment as we improve the product. We cannot guarantee the internal shape of raw device attributes to be stable, so typical semantic versioning rules do not apply here. Use this data with caution without assuming a specific structure beyond the generic type provided here.
       *      */
      components?: components['schemas']['RawDeviceAttributes']
      /** @description `true` if we determined that this payload was replayed, `false` otherwise.
       *      */
      replayed: boolean
      /** @description Contains information about the SDK used to perform the request. */
      sdk?: components['schemas']['SDK']
      /** @description Environment ID associated with the event */
      environmentId?: string
    }
    /**
     * @description Error code:
     *      * `RequestCannotBeParsed` - the query parameters or JSON payload contains some errors
     *               that prevented us from parsing it (wrong type/surpassed limits).
     *      * `TokenRequired` - `Auth-API-Key` header is missing or empty.
     *      * `TokenNotFound` - no Fingerprint application found for specified secret key.
     *      * `SubscriptionNotActive` - Fingerprint application is not active.
     *      * `WrongRegion` - server and application region differ.
     *      * `FeatureNotEnabled` - this feature (for example, Delete API) is not enabled for your application.
     *      * `WorkspaceScopedSecretKeyRequired` - The provided secret API key is scoped to an environment, but this operation requires a workspace-scoped secret API key.
     *      * `RequestNotFound` - the specified request ID was not found. It never existed, expired, or it has been deleted.
     *      * `VisitorNotFound` - The specified visitor ID was not found. It never existed or it may have already been deleted.
     *      * `TooManyRequests` - the limit on secret API key requests per second has been exceeded.
     *      * `429 Too Many Requests` - the limit on secret API key requests per second has been exceeded.
     *      * `StateNotReady` - The event specified with request id is
     *               not ready for updates yet. Try again.
     *               This error happens in rare cases when update API is called immediately
     *               after receiving the request id on the client. In case you need to send
     *               information right away, we recommend using the JS agent API instead.
     *      * `Failed` - internal server error.
     *
     * @enum {string}
     */
    ErrorCode:
      | 'RequestCannotBeParsed'
      | 'TokenRequired'
      | 'TokenNotFound'
      | 'SubscriptionNotActive'
      | 'WrongRegion'
      | 'FeatureNotEnabled'
      | 'WorkspaceScopedSecretKeyRequired'
      | 'RequestNotFound'
      | 'VisitorNotFound'
      | 'TooManyRequests'
      | '429 Too Many Requests'
      | 'StateNotReady'
      | 'Failed'
    Error: {
      /** @description Error code:
       *      * `RequestCannotBeParsed` - the query parameters or JSON payload contains some errors
       *               that prevented us from parsing it (wrong type/surpassed limits).
       *      * `TokenRequired` - `Auth-API-Key` header is missing or empty.
       *      * `TokenNotFound` - no Fingerprint application found for specified secret key.
       *      * `SubscriptionNotActive` - Fingerprint application is not active.
       *      * `WrongRegion` - server and application region differ.
       *      * `FeatureNotEnabled` - this feature (for example, Delete API) is not enabled for your application.
       *      * `WorkspaceScopedSecretKeyRequired` - The provided secret API key is scoped to an environment, but this operation requires a workspace-scoped secret API key.
       *      * `RequestNotFound` - the specified request ID was not found. It never existed, expired, or it has been deleted.
       *      * `VisitorNotFound` - The specified visitor ID was not found. It never existed or it may have already been deleted.
       *      * `TooManyRequests` - the limit on secret API key requests per second has been exceeded.
       *      * `429 Too Many Requests` - the limit on secret API key requests per second has been exceeded.
       *      * `StateNotReady` - The event specified with request id is
       *               not ready for updates yet. Try again.
       *               This error happens in rare cases when update API is called immediately
       *               after receiving the request id on the client. In case you need to send
       *               information right away, we recommend using the JS agent API instead.
       *      * `Failed` - internal server error.
       *      */
      code: components['schemas']['ErrorCode']
      message: string
    }
    ProductIdentification: {
      data?: components['schemas']['Identification']
      error?: components['schemas']['Error']
    }
    /**
     * @description Bot detection result:
     *      * `notDetected` - the visitor is not a bot
     *      * `good` - good bot detected, such as Google bot, Baidu Spider, AlexaBot and so on
     *      * `bad` - bad bot detected, such as Selenium, Puppeteer, Playwright, headless browsers, and so on
     *
     * @enum {string}
     */
    BotdBotResult: 'notDetected' | 'good' | 'bad'
    /** @description Stores bot detection result */
    BotdBot: {
      /** @description Bot detection result:
       *      * `notDetected` - the visitor is not a bot
       *      * `good` - good bot detected, such as Google bot, Baidu Spider, AlexaBot and so on
       *      * `bad` - bad bot detected, such as Selenium, Puppeteer, Playwright, headless browsers, and so on
       *      */
      result: components['schemas']['BotdBotResult']
      type?: string
    }
    /** @description Contains all the information from Bot Detection product */
    Botd: {
      /** @description Stores bot detection result */
      bot: components['schemas']['BotdBot']
      /** @description A customer-provided value or an object that was sent with identification request. */
      meta?: components['schemas']['Tag']
      /** @description A customer-provided id that was sent with the request. */
      linkedId?: string
      /** @description Page URL from which the request was sent. */
      url: string
      /** @description IP address of the requesting browser or bot. */
      ip: string
      /**
       * Format: date-time
       * @description Time in UTC when the request from the JS agent was made. We recommend to treat requests that are older than 2 minutes as malicious. Otherwise, request replay attacks are possible.
       */
      time: string
      userAgent: string
      /** @description Unique identifier of the user's request. */
      requestId: string
    }
    ProductBotd: {
      /** @description Contains all the information from Bot Detection product */
      data?: components['schemas']['Botd']
      error?: components['schemas']['Error']
    }
    RootApps: {
      /** @description Android specific root management apps detection. There are 2 values:
       *       * `true` - Root Management Apps detected (e.g. Magisk).
       *       * `false` - No Root Management Apps detected or the client isn't Android.
       *      */
      result: boolean
    }
    ProductRootApps: {
      data?: components['schemas']['RootApps']
      error?: components['schemas']['Error']
    }
    Emulator: {
      /** @description Android specific emulator detection. There are 2 values:
       *       * `true` - Emulated environment detected (e.g. launch inside of AVD).
       *       * `false` - No signs of emulated environment detected or the client is not Android.
       *      */
      result: boolean
    }
    ProductEmulator: {
      data?: components['schemas']['Emulator']
      error?: components['schemas']['Error']
    }
    Geolocation: {
      /** @description The IP address is likely to be within this radius (in km) of the specified location. */
      accuracyRadius?: number
      /** Format: double */
      latitude?: number
      /** Format: double */
      longitude?: number
      postalCode?: string
      /** Format: timezone */
      timezone?: string
      city?: components['schemas']['GeolocationCity']
      country?: components['schemas']['GeolocationCountry']
      continent?: components['schemas']['GeolocationContinent']
      subdivisions?: components['schemas']['GeolocationSubdivisions']
    }
    IPInfoASN: {
      asn: string
      name: string
      network: string
      type?: string
    }
    IPInfoDataCenter: {
      result: boolean
      name: string
    }
    IPInfoV4: {
      /** Format: ipv4 */
      address: string
      geolocation: components['schemas']['Geolocation']
      asn?: components['schemas']['IPInfoASN']
      datacenter?: components['schemas']['IPInfoDataCenter']
    }
    IPInfoV6: {
      /** Format: ipv6 */
      address: string
      geolocation: components['schemas']['Geolocation']
      asn?: components['schemas']['IPInfoASN']
      datacenter?: components['schemas']['IPInfoDataCenter']
    }
    /** @description Details about the request IP address. Has separate fields for v4 and v6 IP address versions. */
    IPInfo: {
      v4?: components['schemas']['IPInfoV4']
      v6?: components['schemas']['IPInfoV6']
    }
    ProductIPInfo: {
      /** @description Details about the request IP address. Has separate fields for v4 and v6 IP address versions. */
      data?: components['schemas']['IPInfo']
      error?: components['schemas']['Error']
    }
    IPBlocklistDetails: {
      /** @description IP address was part of a known email spam attack (SMTP). */
      emailSpam: boolean
      /** @description IP address was part of a known network attack (SSH/HTTPS). */
      attackSource: boolean
    }
    IPBlocklist: {
      /** @description `true` if request IP address is part of any database that we use to search for known malicious actors, `false` otherwise.
       *      */
      result: boolean
      details: components['schemas']['IPBlocklistDetails']
    }
    ProductIPBlocklist: {
      data?: components['schemas']['IPBlocklist']
      error?: components['schemas']['Error']
    }
    Tor: {
      /** @description `true` if the request IP address is a known tor exit node, `false` otherwise.
       *      */
      result: boolean
    }
    ProductTor: {
      data?: components['schemas']['Tor']
      error?: components['schemas']['Error']
    }
    /**
     * @description A confidence rating for the VPN detection result — "low", "medium", or "high". Depends on the combination of results returned from all VPN detection methods.
     * @enum {string}
     */
    VPNConfidence: 'low' | 'medium' | 'high'
    VPNMethods: {
      /** @description The browser timezone doesn't match the timezone inferred from the request IP address. */
      timezoneMismatch: boolean
      /** @description Request IP address is owned and used by a public VPN service provider. */
      publicVPN: boolean
      /** @description This method applies to mobile devices only. Indicates the result of additional methods used to detect a VPN in mobile devices. */
      auxiliaryMobile: boolean
      /** @description The browser runs on a different operating system than the operating system inferred from the request network signature. */
      osMismatch: boolean
      /** @description Request IP address belongs to a relay service provider, indicating the use of relay services like [Apple Private relay](https://support.apple.com/en-us/102602) or [Cloudflare Warp](https://developers.cloudflare.com/warp-client/).
       *
       *     * Like VPNs, relay services anonymize the visitor's true IP address.
       *     * Unlike traditional VPNs, relay services don't let visitors spoof their location by choosing an exit node in a different country.
       *
       *     This field allows you to differentiate VPN users and relay service users in your fraud prevention logic.
       *      */
      relay: boolean
    }
    VPN: {
      /** @description VPN or other anonymizing service has been used when sending the request. */
      result: boolean
      /** @description A confidence rating for the VPN detection result — "low", "medium", or "high". Depends on the combination of results returned from all VPN detection methods. */
      confidence: components['schemas']['VPNConfidence']
      /** @description Local timezone which is used in timezoneMismatch method. */
      originTimezone: string
      /** @description Country of the request (only for Android SDK version >= 2.4.0, ISO 3166 format or unknown). */
      originCountry: string
      methods: components['schemas']['VPNMethods']
    }
    ProductVPN: {
      data?: components['schemas']['VPN']
      error?: components['schemas']['Error']
    }
    /**
     * @description Confidence level of the proxy detection.
     *     If a proxy is not detected, confidence is "high".
     *     If it's detected, can be "low", "medium", or "high".
     *
     * @enum {string}
     */
    ProxyConfidence: 'low' | 'medium' | 'high'
    /** @description Proxy detection details (present if proxy is detected) */
    ProxyDetails: {
      /**
       * @description Residential proxies use real user IP addresses to appear as legitimate traffic,
       *     while data center proxies are public proxies hosted in data centers
       *
       * @enum {string}
       */
      proxyType: 'residential' | 'data_center'
      /**
       * Format: date-time
       * @description ISO 8601 formatted timestamp in UTC with hourly resolution
       *     of when this IP was last seen as a proxy when available.
       *
       */
      lastSeenAt?: string
    } | null
    Proxy: {
      /** @description IP address was used by a public proxy provider or belonged to a known recent residential proxy
       *      */
      result: boolean
      /** @description Confidence level of the proxy detection.
       *     If a proxy is not detected, confidence is "high".
       *     If it's detected, can be "low", "medium", or "high".
       *      */
      confidence: components['schemas']['ProxyConfidence']
      /** @description Proxy detection details (present if proxy is detected) */
      details?: components['schemas']['ProxyDetails']
    }
    ProductProxy: {
      data?: components['schemas']['Proxy']
      error?: components['schemas']['Error']
    }
    Incognito: {
      /** @description `true` if we detected incognito mode used in the browser, `false` otherwise.
       *      */
      result: boolean
    }
    ProductIncognito: {
      data?: components['schemas']['Incognito']
      error?: components['schemas']['Error']
    }
    Tampering: {
      /** @description Indicates if an identification request from a browser or an Android SDK has been tampered with. Not supported in the iOS SDK, is always `false` for iOS requests.
       *       * `true` - If the request meets either of the following conditions:
       *         * Contains anomalous browser or device attributes that could not have been legitimately produced by the JavaScript agent or the Android SDK (see `anomalyScore`).
       *         * Originated from an anti-detect browser like Incognition (see `antiDetectBrowser`).
       *       * `false` - If the request is considered genuine or was generated by the iOS SDK.
       *      */
      result: boolean
      /**
       * @description Confidence level of the tampering detection.
       *     If a tampering is not detected, confidence is "high".
       *     If it's detected, can be "low", "medium", or "high".
       *
       * @enum {string}
       */
      confidence: 'low' | 'medium' | 'high'
      /**
       * Format: double
       * @description A score that indicates the extent of anomalous data in the request. This field applies to requests originating from **both** browsers and Android SDKs.
       *       * Values above `0.5` indicate that the request has been tampered with.
       *       * Values below `0.5` indicate that the request is genuine.
       *
       */
      anomalyScore: number
      /**
       * Format: double
       * @description A score that indicates the models calculated probability that an event is coming from an anti detect browser.
       *       * Values above `0.8` indicate that the request is an anti detect browser based on the ml model
       *       * Values below `0.8` indicate that the request is not an anti detect browser based on the ml model
       *
       */
      mlScore: number
      /** @description Anti-detect browsers try to evade identification by masking or manipulating their fingerprint to imitate legitimate browser configurations. This field does not apply to requests originating from mobile SDKs.
       *       * `true` - The browser resembles a known anti-detect browser, for example, Incognition.
       *       * `false` - The browser does not resemble an anti-detect browser or the request originates from a mobile SDK.
       *      */
      antiDetectBrowser: boolean
    }
    ProductTampering: {
      data?: components['schemas']['Tampering']
      error?: components['schemas']['Error']
    }
    ClonedApp: {
      /** @description Android specific cloned application detection. There are 2 values:
       *       * `true` - Presence of app cloners work detected (e.g. fully cloned application found or launch of it inside of a not main working profile detected).
       *       * `false` - No signs of cloned application detected or the client is not Android.
       *      */
      result: boolean
    }
    ProductClonedApp: {
      data?: components['schemas']['ClonedApp']
      error?: components['schemas']['Error']
    }
    FactoryReset: {
      /**
       * Format: date-time
       * @description Indicates the time (in UTC) of the most recent factory reset that happened on the **mobile device**.
       *     When a factory reset cannot be detected on the mobile device or when the request is initiated from a browser,  this field will correspond to the *epoch* time (i.e 1 Jan 1970 UTC).
       *     See [Factory Reset Detection](https://dev.fingerprint.com/docs/smart-signals-overview#factory-reset-detection) to learn more about this Smart Signal.
       *
       */
      time: string
      /**
       * Format: int64
       * @description This field is just another representation of the value in the `time` field.
       *     The time of the most recent factory reset that happened on the **mobile device** is expressed as Unix epoch time.
       *
       */
      timestamp: number
    }
    ProductFactoryReset: {
      data?: components['schemas']['FactoryReset']
      error?: components['schemas']['Error']
    }
    Jailbroken: {
      /** @description iOS specific jailbreak detection. There are 2 values:
       *       * `true` - Jailbreak detected.
       *       * `false` - No signs of jailbreak or the client is not iOS.
       *      */
      result: boolean
    }
    ProductJailbroken: {
      data?: components['schemas']['Jailbroken']
      error?: components['schemas']['Error']
    }
    Frida: {
      /** @description [Frida](https://frida.re/docs/) detection for Android and iOS devices. There are 2 values:
       *       * `true` - Frida detected
       *       * `false` - No signs of Frida or the client is not a mobile device.
       *      */
      result: boolean
    }
    ProductFrida: {
      data?: components['schemas']['Frida']
      error?: components['schemas']['Error']
    }
    PrivacySettings: {
      /** @description `true` if the request is from a privacy aware browser (e.g. Tor) or from a browser in which fingerprinting is blocked. Otherwise `false`.
       *      */
      result: boolean
    }
    ProductPrivacySettings: {
      data?: components['schemas']['PrivacySettings']
      error?: components['schemas']['Error']
    }
    VirtualMachine: {
      /** @description `true` if the request came from a browser running inside a virtual machine (e.g. VMWare), `false` otherwise.
       *      */
      result: boolean
      /**
       * Format: double
       * @description Machine learning-based virtual machine score,  represented as a floating-point value between 0 and 1 (inclusive), with up to three decimal places of precision. A higher score means a higher confidence in the positive `virtual_machine` detection result
       *
       */
      mlScore?: number
    }
    ProductVirtualMachine: {
      data?: components['schemas']['VirtualMachine']
      error?: components['schemas']['Error']
    }
    ProductRawDeviceAttributes: {
      /** @description It includes 35+ raw browser identification attributes to provide Fingerprint users with even more information than our standard visitor ID provides. This enables Fingerprint users to not have to run our open-source product in conjunction with Fingerprint Pro Plus and Enterprise to get those additional attributes.
       *     Warning: The raw signals data can change at any moment as we improve the product. We cannot guarantee the internal shape of raw device attributes to be stable, so typical semantic versioning rules do not apply here. Use this data with caution without assuming a specific structure beyond the generic type provided here.
       *      */
      data?: components['schemas']['RawDeviceAttributes']
      error?: components['schemas']['Error']
    }
    HighActivity: {
      /** @description Flag indicating if the request came from a high-activity visitor. */
      result: boolean
      /**
       * Format: int64
       * @description Number of requests from the same visitor in the previous day.
       */
      dailyRequests?: number
    }
    ProductHighActivity: {
      data?: components['schemas']['HighActivity']
      error?: components['schemas']['Error']
    }
    LocationSpoofing: {
      /** @description Flag indicating whether the request came from a mobile device with location spoofing enabled. */
      result: boolean
    }
    ProductLocationSpoofing: {
      data?: components['schemas']['LocationSpoofing']
      error?: components['schemas']['Error']
    }
    SuspectScore: {
      /** @description Suspect Score is an easy way to integrate Smart Signals into your fraud protection work flow.  It is a weighted representation of all Smart Signals present in the payload that helps identify suspicious activity. The value range is [0; S] where S is sum of all Smart Signals weights.  See more details here: https://dev.fingerprint.com/docs/suspect-score
       *      */
      result: number
    }
    ProductSuspectScore: {
      data?: components['schemas']['SuspectScore']
      error?: components['schemas']['Error']
    }
    /**
     * @deprecated
     * @description This signal is deprecated.
     *
     */
    RemoteControl: {
      /** @description `true` if the request came from a machine being remotely controlled (e.g. TeamViewer), `false` otherwise.
       *      */
      result: boolean
    }
    /**
     * @deprecated
     * @description This product is deprecated.
     *
     */
    ProductRemoteControl: {
      /** @description This signal is deprecated.
       *      */
      data?: components['schemas']['RemoteControl']
      error?: components['schemas']['Error']
    }
    /** @description Is absent if the velocity data could not be generated for the visitor ID.
     *      */
    VelocityIntervals: {
      '5m': number
      '1h': number
      /** @description The `24h` interval of `distinctIp`, `distinctLinkedId`, `distinctCountry`, `distinctIpByLinkedId` and `distinctVisitorIdByLinkedId` will be omitted if the number of `events`` for the visitor ID in the last 24 hours (`events.intervals.['24h']`) is higher than 20.000.
       *      */
      '24h'?: number
    }
    VelocityData: {
      /** @description Is absent if the velocity data could not be generated for the visitor ID.
       *      */
      intervals?: components['schemas']['VelocityIntervals']
    }
    /** @description Sums key data points for a specific `visitorId`, `ipAddress` and `linkedId` at three distinct time
     *     intervals: 5 minutes, 1 hour, and 24 hours as follows:
     *
     *     - Number of distinct IP addresses associated to the visitor ID.
     *     - Number of distinct linked IDs associated with the visitor ID.
     *     - Number of distinct countries associated with the visitor ID.
     *     - Number of identification events associated with the visitor ID.
     *     - Number of identification events associated with the detected IP address.
     *     - Number of distinct IP addresses associated with the provided linked ID.
     *     - Number of distinct visitor IDs associated with the provided linked ID.
     *
     *     The `24h` interval of `distinctIp`, `distinctLinkedId`, `distinctCountry`,
     *     `distinctIpByLinkedId` and `distinctVisitorIdByLinkedId` will be omitted
     *     if the number of `events` for the visitor ID in the last 24
     *     hours (`events.intervals.['24h']`) is higher than 20.000.
     *      */
    Velocity: {
      distinctIp: components['schemas']['VelocityData']
      distinctLinkedId: components['schemas']['VelocityData']
      distinctCountry: components['schemas']['VelocityData']
      events: components['schemas']['VelocityData']
      ipEvents: components['schemas']['VelocityData']
      distinctIpByLinkedId: components['schemas']['VelocityData']
      distinctVisitorIdByLinkedId: components['schemas']['VelocityData']
    }
    ProductVelocity: {
      /** @description Sums key data points for a specific `visitorId`, `ipAddress` and `linkedId` at three distinct time
       *     intervals: 5 minutes, 1 hour, and 24 hours as follows:
       *
       *     - Number of distinct IP addresses associated to the visitor ID.
       *     - Number of distinct linked IDs associated with the visitor ID.
       *     - Number of distinct countries associated with the visitor ID.
       *     - Number of identification events associated with the visitor ID.
       *     - Number of identification events associated with the detected IP address.
       *     - Number of distinct IP addresses associated with the provided linked ID.
       *     - Number of distinct visitor IDs associated with the provided linked ID.
       *
       *     The `24h` interval of `distinctIp`, `distinctLinkedId`, `distinctCountry`,
       *     `distinctIpByLinkedId` and `distinctVisitorIdByLinkedId` will be omitted
       *     if the number of `events` for the visitor ID in the last 24
       *     hours (`events.intervals.['24h']`) is higher than 20.000.
       *      */
      data?: components['schemas']['Velocity']
      error?: components['schemas']['Error']
    }
    DeveloperTools: {
      /** @description `true` if the browser is Chrome with DevTools open or Firefox with Developer Tools open, `false` otherwise.
       *      */
      result: boolean
    }
    ProductDeveloperTools: {
      data?: components['schemas']['DeveloperTools']
      error?: components['schemas']['Error']
    }
    MitMAttack: {
      /** @description * `true` - When requests made from your users' mobile devices to Fingerprint servers have been intercepted and potentially modified.
       *     * `false` - Otherwise or when the request originated from a browser.
       *     See [MitM Attack Detection](https://dev.fingerprint.com/docs/smart-signals-reference#mitm-attack-detection) to learn more about this Smart Signal.
       *      */
      result: boolean
    }
    ProductMitMAttack: {
      data?: components['schemas']['MitMAttack']
      error?: components['schemas']['Error']
    }
    /** @description Proximity ID represents a fixed geographical zone in a discrete global grid within which the device is observed.
     *      */
    Proximity: {
      /** @description A stable privacy-preserving identifier for a given proximity zone.
       *      */
      id: string
      /**
       * Format: int32
       * @description The radius of the proximity zone’s precision level, in meters.
       *
       * @enum {integer}
       */
      precisionRadius: 10 | 25 | 65 | 175 | 450 | 1200 | 3300 | 8500 | 22500
      /**
       * Format: float
       * @description A value between `0` and `1` representing the likelihood that the true device location lies within the mapped proximity zone.
       *       * Scores closer to `1` indicate high confidence that the location is inside the mapped proximity zone.
       *       * Scores closer to `0` indicate lower confidence, suggesting the true location may fall in an adjacent zone.
       *
       */
      confidence: number
    }
    ProductProximity: {
      /** @description Proximity ID represents a fixed geographical zone in a discrete global grid within which the device is observed.
       *      */
      data?: components['schemas']['Proximity']
      error?: components['schemas']['Error']
    }
    /** @description Contains all information about the request identified by `requestId`, depending on the pricing plan (Pro, Pro Plus, Enterprise) */
    Products: {
      identification?: components['schemas']['ProductIdentification']
      botd?: components['schemas']['ProductBotd']
      rootApps?: components['schemas']['ProductRootApps']
      emulator?: components['schemas']['ProductEmulator']
      ipInfo?: components['schemas']['ProductIPInfo']
      ipBlocklist?: components['schemas']['ProductIPBlocklist']
      tor?: components['schemas']['ProductTor']
      vpn?: components['schemas']['ProductVPN']
      proxy?: components['schemas']['ProductProxy']
      incognito?: components['schemas']['ProductIncognito']
      tampering?: components['schemas']['ProductTampering']
      clonedApp?: components['schemas']['ProductClonedApp']
      factoryReset?: components['schemas']['ProductFactoryReset']
      jailbroken?: components['schemas']['ProductJailbroken']
      frida?: components['schemas']['ProductFrida']
      privacySettings?: components['schemas']['ProductPrivacySettings']
      virtualMachine?: components['schemas']['ProductVirtualMachine']
      rawDeviceAttributes?: components['schemas']['ProductRawDeviceAttributes']
      highActivity?: components['schemas']['ProductHighActivity']
      locationSpoofing?: components['schemas']['ProductLocationSpoofing']
      suspectScore?: components['schemas']['ProductSuspectScore']
      /** @description This product is deprecated.
       *      */
      remoteControl?: components['schemas']['ProductRemoteControl']
      velocity?: components['schemas']['ProductVelocity']
      developerTools?: components['schemas']['ProductDeveloperTools']
      mitmAttack?: components['schemas']['ProductMitMAttack']
      proximity?: components['schemas']['ProductProximity']
    }
    /** @description Contains results from Fingerprint Identification and all active Smart Signals. */
    EventsGetResponse: {
      /** @description Contains all information about the request identified by `requestId`, depending on the pricing plan (Pro, Pro Plus, Enterprise) */
      products: components['schemas']['Products']
    }
    ErrorResponse: {
      error: components['schemas']['Error']
    }
    EventsUpdateRequest: {
      /** @description LinkedID value to assign to the existing event */
      linkedId?: string
      /** @description A customer-provided value or an object that was sent with identification request. */
      tag?: components['schemas']['Tag']
      /** @description Suspect flag indicating observed suspicious or fraudulent event */
      suspect?: boolean
    }
    /** @description Contains a list of all identification events matching the specified search criteria. */
    SearchEventsResponse: {
      events?: {
        /** @description Contains all information about the request identified by `requestId`, depending on the pricing plan (Pro, Pro Plus, Enterprise) */
        products: components['schemas']['Products']
      }[]
      /** @description Use this value in the `pagination_key` parameter to request the next page of search results. */
      paginationKey?: string
    }
    Visit: {
      /** @description Unique identifier of the user's request. */
      requestId: string
      browserDetails: components['schemas']['BrowserDetails']
      /** @description Flag if user used incognito session. */
      incognito: boolean
      /** @description IP address of the requesting browser or bot. */
      ip: string
      /** @description This field is **deprecated** and will not return a result for **applications created after January 23rd, 2024**.  Please use the [IP Geolocation Smart signal](https://dev.fingerprint.com/docs/smart-signals-overview#ip-geolocation) for geolocation information. */
      ipLocation?: components['schemas']['DeprecatedGeolocation']
      /** @description A customer-provided id that was sent with the request. */
      linkedId?: string
      /**
       * Format: int64
       * @description Timestamp of the event with millisecond precision in Unix time.
       */
      timestamp: number
      /**
       * Format: date-time
       * @description Time expressed according to ISO 8601 in UTC format, when the request from the client agent was made. We recommend to treat requests that are older than 2 minutes as malicious. Otherwise, request replay attacks are possible.
       */
      time: string
      /** @description Page URL from which the request was sent. */
      url: string
      /** @description A customer-provided value or an object that was sent with identification request. */
      tag: components['schemas']['Tag']
      confidence?: components['schemas']['IdentificationConfidence']
      /** @description Attribute represents if a visitor had been identified before. */
      visitorFound: boolean
      firstSeenAt: components['schemas']['IdentificationSeenAt']
      lastSeenAt: components['schemas']['IdentificationSeenAt']
      /** @description It includes 35+ raw browser identification attributes to provide Fingerprint users with even more information than our standard visitor ID provides. This enables Fingerprint users to not have to run our open-source product in conjunction with Fingerprint Pro Plus and Enterprise to get those additional attributes.
       *     Warning: The raw signals data can change at any moment as we improve the product. We cannot guarantee the internal shape of raw device attributes to be stable, so typical semantic versioning rules do not apply here. Use this data with caution without assuming a specific structure beyond the generic type provided here.
       *      */
      components?: components['schemas']['RawDeviceAttributes']
    }
    /** @description Pagination-related fields `lastTimestamp` and `paginationKey` are included if you use a pagination parameter like `limit` or `before` and there is more data available on the next page. */
    VisitorsGetResponse: {
      visitorId: string
      visits: components['schemas']['Visit'][]
      /**
       * Format: int64
       * @deprecated
       * @description ⚠️ Deprecated paging attribute, please use `paginationKey` instead. Timestamp of the last visit in the current page of results.
       *
       */
      lastTimestamp?: number
      /** @description Request ID of the last visit in the current page of results. Use this value in the following request as the `paginationKey` parameter to get the next page of results. */
      paginationKey?: string
    }
    ErrorPlainResponse: {
      error: string
    }
    RelatedVisitor: {
      /** @description Visitor ID of a browser that originates from the same mobile device as the input visitor ID. */
      visitorId: string
    }
    RelatedVisitorsResponse: {
      relatedVisitors: components['schemas']['RelatedVisitor'][]
    }
    WebhookRootApps: {
      /** @description Android specific root management apps detection. There are 2 values:
       *       * `true` - Root Management Apps detected (e.g. Magisk).
       *       * `false` - No Root Management Apps detected or the client isn't Android.
       *      */
      result?: boolean
    }
    WebhookEmulator: {
      /** @description Android specific emulator detection. There are 2 values:
       *       * `true` - Emulated environment detected (e.g. launch inside of AVD).
       *       * `false` - No signs of emulated environment detected or the client is not Android.
       *      */
      result?: boolean
    }
    /** @description Details about the request IP address. Has separate fields for v4 and v6 IP address versions. */
    WebhookIPInfo: {
      v4?: components['schemas']['IPInfoV4']
      v6?: components['schemas']['IPInfoV6']
    }
    WebhookIPBlocklist: {
      /** @description `true` if request IP address is part of any database that we use to search for known malicious actors, `false` otherwise.
       *      */
      result?: boolean
      details?: components['schemas']['IPBlocklistDetails']
    }
    WebhookTor: {
      /** @description `true` if the request IP address is a known tor exit node, `false` otherwise.
       *      */
      result?: boolean
    }
    WebhookVPN: {
      /** @description VPN or other anonymizing service has been used when sending the request. */
      result?: boolean
      /** @description A confidence rating for the VPN detection result — "low", "medium", or "high". Depends on the combination of results returned from all VPN detection methods. */
      confidence?: components['schemas']['VPNConfidence']
      /** @description Local timezone which is used in timezoneMismatch method. */
      originTimezone?: string
      /** @description Country of the request (only for Android SDK version >= 2.4.0, ISO 3166 format or unknown). */
      originCountry?: string
      methods?: components['schemas']['VPNMethods']
    }
    WebhookProxy: {
      /** @description IP address was used by a public proxy provider or belonged to a known recent residential proxy
       *      */
      result?: boolean
      /** @description Confidence level of the proxy detection.
       *     If a proxy is not detected, confidence is "high".
       *     If it's detected, can be "low", "medium", or "high".
       *      */
      confidence?: components['schemas']['ProxyConfidence']
      /** @description Proxy detection details (present if proxy is detected) */
      details?: components['schemas']['ProxyDetails']
    }
    WebhookTampering: {
      /** @description Indicates if an identification request from a browser or an Android SDK has been tampered with. Not supported in the iOS SDK, is always `false` for iOS requests.
       *       * `true` - If the request meets either of the following conditions:
       *         * Contains anomalous browser or device attributes that could not have been legitimately produced by the JavaScript agent or the Android SDK (see `anomalyScore`).
       *         * Originated from an anti-detect browser like Incognition (see `antiDetectBrowser`).
       *       * `false` - If the request is considered genuine or was generated by the iOS SDK.
       *      */
      result?: boolean
      /**
       * @description Confidence level of the tampering detection.
       *     If a tampering is not detected, confidence is "high".
       *     If it's detected, can be "low", "medium", or "high".
       *
       * @enum {string}
       */
      confidence?: 'low' | 'medium' | 'high'
      /**
       * Format: double
       * @description A score that indicates the extent of anomalous data in the request. This field applies to requests originating from **both** browsers and Android SDKs.
       *       * Values above `0.5` indicate that the request has been tampered with.
       *       * Values below `0.5` indicate that the request is genuine.
       *
       */
      anomalyScore?: number
      /**
       * Format: double
       * @description A score that indicates the models calculated probability that an event is coming from an anti detect browser.
       *       * Values above `0.8` indicate that the request is an anti detect browser based on the ml model
       *       * Values below `0.8` indicate that the request is not an anti detect browser based on the ml model
       *
       */
      mlScore?: number
      /** @description Anti-detect browsers try to evade identification by masking or manipulating their fingerprint to imitate legitimate browser configurations. This field does not apply to requests originating from mobile SDKs.
       *       * `true` - The browser resembles a known anti-detect browser, for example, Incognition.
       *       * `false` - The browser does not resemble an anti-detect browser or the request originates from a mobile SDK.
       *      */
      antiDetectBrowser?: boolean
    }
    WebhookClonedApp: {
      /** @description Android specific cloned application detection. There are 2 values:
       *       * `true` - Presence of app cloners work detected (e.g. fully cloned application found or launch of it inside of a not main working profile detected).
       *       * `false` - No signs of cloned application detected or the client is not Android.
       *      */
      result?: boolean
    }
    WebhookFactoryReset: {
      /**
       * Format: date-time
       * @description Indicates the time (in UTC) of the most recent factory reset that happened on the **mobile device**.
       *     When a factory reset cannot be detected on the mobile device or when the request is initiated from a browser,  this field will correspond to the *epoch* time (i.e 1 Jan 1970 UTC).
       *     See [Factory Reset Detection](https://dev.fingerprint.com/docs/smart-signals-overview#factory-reset-detection) to learn more about this Smart Signal.
       *
       */
      time?: string
      /**
       * Format: int64
       * @description This field is just another representation of the value in the `time` field.
       *     The time of the most recent factory reset that happened on the **mobile device** is expressed as Unix epoch time.
       *
       */
      timestamp?: number
    }
    WebhookJailbroken: {
      /** @description iOS specific jailbreak detection. There are 2 values:
       *       * `true` - Jailbreak detected.
       *       * `false` - No signs of jailbreak or the client is not iOS.
       *      */
      result?: boolean
    }
    WebhookFrida: {
      /** @description [Frida](https://frida.re/docs/) detection for Android and iOS devices. There are 2 values:
       *       * `true` - Frida detected
       *       * `false` - No signs of Frida or the client is not a mobile device.
       *      */
      result?: boolean
    }
    WebhookPrivacySettings: {
      /** @description `true` if the request is from a privacy aware browser (e.g. Tor) or from a browser in which fingerprinting is blocked. Otherwise `false`.
       *      */
      result?: boolean
    }
    WebhookVirtualMachine: {
      /** @description `true` if the request came from a browser running inside a virtual machine (e.g. VMWare), `false` otherwise.
       *      */
      result?: boolean
      /**
       * Format: double
       * @description Machine learning–based virtual machine score,  represented as a floating-point value between 0 and 1 (inclusive), with up to three decimal places of precision. A higher score means a higher confidence in the positive `virtual_machine` detection result
       *
       */
      mlScore?: number
    }
    /** @description It includes 35+ raw browser identification attributes to provide Fingerprint users with even more information than our standard visitor ID provides. This enables Fingerprint users to not have to run our open-source product in conjunction with Fingerprint Pro Plus and Enterprise to get those additional attributes.
     *     Warning: The raw signals data can change at any moment as we improve the product. We cannot guarantee the internal shape of raw device attributes to be stable, so typical semantic versioning rules do not apply here. Use this data with caution without assuming a specific structure beyond the generic type provided here.
     *      */
    WebhookRawDeviceAttributes: {
      [key: string]: components['schemas']['RawDeviceAttribute']
    }
    WebhookHighActivity: {
      /** @description Flag indicating if the request came from a high-activity visitor. */
      result: boolean
      /**
       * Format: int64
       * @description Number of requests from the same visitor in the previous day.
       */
      dailyRequests?: number
    }
    WebhookLocationSpoofing: {
      /** @description Flag indicating whether the request came from a mobile device with location spoofing enabled. */
      result?: boolean
    }
    WebhookSuspectScore: {
      /** @description Suspect Score is an easy way to integrate Smart Signals into your fraud protection work flow.  It is a weighted representation of all Smart Signals present in the payload that helps identify suspicious activity. The value range is [0; S] where S is sum of all Smart Signals weights.  See more details here: https://dev.fingerprint.com/docs/suspect-score
       *      */
      result?: number
    }
    /**
     * @deprecated
     * @description This signal is deprecated.
     *
     */
    WebhookRemoteControl: {
      /** @description `true` if the request came from a machine being remotely controlled (e.g. TeamViewer), `false` otherwise.
       *      */
      result?: boolean
    }
    /** @description Sums key data points for a specific `visitorId`, `ipAddress` and `linkedId` at three distinct time
     *     intervals: 5 minutes, 1 hour, and 24 hours as follows:
     *
     *     - Number of distinct IP addresses associated to the visitor ID.
     *     - Number of distinct linked IDs associated with the visitor ID.
     *     - Number of distinct countries associated with the visitor ID.
     *     - Number of identification events associated with the visitor ID.
     *     - Number of identification events associated with the detected IP address.
     *     - Number of distinct IP addresses associated with the provided linked ID.
     *     - Number of distinct visitor IDs associated with the provided linked ID.
     *
     *     The `24h` interval of `distinctIp`, `distinctLinkedId`, `distinctCountry`,
     *     `distinctIpByLinkedId` and `distinctVisitorIdByLinkedId` will be omitted
     *     if the number of `events` for the visitor ID in the last 24
     *     hours (`events.intervals.['24h']`) is higher than 20.000.
     *      */
    WebhookVelocity: {
      distinctIp?: components['schemas']['VelocityData']
      distinctLinkedId?: components['schemas']['VelocityData']
      distinctCountry?: components['schemas']['VelocityData']
      events?: components['schemas']['VelocityData']
      ipEvents?: components['schemas']['VelocityData']
      distinctIpByLinkedId?: components['schemas']['VelocityData']
      distinctVisitorIdByLinkedId?: components['schemas']['VelocityData']
    }
    WebhookDeveloperTools: {
      /** @description `true` if the browser is Chrome with DevTools open or Firefox with Developer Tools open, `false` otherwise.
       *      */
      result?: boolean
    }
    WebhookMitMAttack: {
      /** @description * `true` - When requests made from your users' mobile devices to Fingerprint servers have been intercepted and potentially modified.
       *     * `false` - Otherwise or when the request originated from a browser.
       *     See [MitM Attack Detection](https://dev.fingerprint.com/docs/smart-signals-overview#mitm-attack-detection) to learn more about this Smart Signal.
       *      */
      result?: boolean
    }
    SupplementaryID: {
      /** @description String of 20 characters that uniquely identifies the visitor's browser or mobile device. */
      visitorId?: string
      /** @description Attribute represents if a visitor had been identified before. */
      visitorFound?: boolean
      confidence?: components['schemas']['IdentificationConfidence']
      firstSeenAt?: components['schemas']['IdentificationSeenAt']
      lastSeenAt?: components['schemas']['IdentificationSeenAt']
    }
    /** @description Other identities that have been established for a given Visitor. */
    WebhookSupplementaryIDs: {
      standard: components['schemas']['SupplementaryID']
      highRecall: components['schemas']['SupplementaryID']
    }
    /** @description Proximity ID represents a fixed geographical zone in a discrete global grid within which the device is observed.
     *      */
    WebhookProximity: {
      /** @description A stable privacy-preserving identifier for a given proximity zone.
       *      */
      id: string
      /**
       * Format: int32
       * @description The radius of the proximity zone’s precision level, in meters.
       *
       * @enum {integer}
       */
      precisionRadius: 10 | 25 | 65 | 175 | 450 | 1200 | 3300 | 8500 | 22500
      /**
       * Format: float
       * @description A value between `0` and `1` representing the likelihood that the true device location lies within the mapped proximity zone.
       *       * Scores closer to `1` indicate high confidence that the location is inside the mapped proximity zone.
       *       * Scores closer to `0` indicate lower confidence, suggesting the true location may fall in an adjacent zone.
       *
       */
      confidence: number
    }
    Webhook: {
      /** @description Unique identifier of the user's request. */
      requestId: string
      /** @description Page URL from which the request was sent. */
      url: string
      /** @description IP address of the requesting browser or bot. */
      ip: string
      /** @description Environment ID of the event. */
      environmentId?: string
      /** @description A customer-provided value or an object that was sent with identification request. */
      tag?: components['schemas']['Tag']
      /**
       * Format: date-time
       * @description Time expressed according to ISO 8601 in UTC format, when the request from the JS agent was made. We recommend to treat requests that are older than 2 minutes as malicious. Otherwise, request replay attacks are possible.
       */
      time: string
      /**
       * Format: int64
       * @description Timestamp of the event with millisecond precision in Unix time.
       */
      timestamp: number
      /** @description This field is **deprecated** and will not return a result for **applications created after January 23rd, 2024**.  Please use the [IP Geolocation Smart signal](https://dev.fingerprint.com/docs/smart-signals-overview#ip-geolocation) for geolocation information. */
      ipLocation?: components['schemas']['DeprecatedGeolocation']
      /** @description A customer-provided id that was sent with the request. */
      linkedId?: string
      /** @description String of 20 characters that uniquely identifies the visitor's browser or mobile device. */
      visitorId?: string
      /** @description Attribute represents if a visitor had been identified before. */
      visitorFound?: boolean
      confidence?: components['schemas']['IdentificationConfidence']
      firstSeenAt?: components['schemas']['IdentificationSeenAt']
      lastSeenAt?: components['schemas']['IdentificationSeenAt']
      browserDetails?: components['schemas']['BrowserDetails']
      /** @description Flag if user used incognito session. */
      incognito?: boolean
      clientReferrer?: string
      /** @description It includes 35+ raw browser identification attributes to provide Fingerprint users with even more information than our standard visitor ID provides. This enables Fingerprint users to not have to run our open-source product in conjunction with Fingerprint Pro Plus and Enterprise to get those additional attributes.
       *     Warning: The raw signals data can change at any moment as we improve the product. We cannot guarantee the internal shape of raw device attributes to be stable, so typical semantic versioning rules do not apply here. Use this data with caution without assuming a specific structure beyond the generic type provided here.
       *      */
      components?: components['schemas']['RawDeviceAttributes']
      /** @description Stores bot detection result */
      bot?: components['schemas']['BotdBot']
      userAgent?: string
      rootApps?: components['schemas']['WebhookRootApps']
      emulator?: components['schemas']['WebhookEmulator']
      /** @description Details about the request IP address. Has separate fields for v4 and v6 IP address versions. */
      ipInfo?: components['schemas']['WebhookIPInfo']
      ipBlocklist?: components['schemas']['WebhookIPBlocklist']
      tor?: components['schemas']['WebhookTor']
      vpn?: components['schemas']['WebhookVPN']
      proxy?: components['schemas']['WebhookProxy']
      tampering?: components['schemas']['WebhookTampering']
      clonedApp?: components['schemas']['WebhookClonedApp']
      factoryReset?: components['schemas']['WebhookFactoryReset']
      jailbroken?: components['schemas']['WebhookJailbroken']
      frida?: components['schemas']['WebhookFrida']
      privacySettings?: components['schemas']['WebhookPrivacySettings']
      virtualMachine?: components['schemas']['WebhookVirtualMachine']
      /** @description It includes 35+ raw browser identification attributes to provide Fingerprint users with even more information than our standard visitor ID provides. This enables Fingerprint users to not have to run our open-source product in conjunction with Fingerprint Pro Plus and Enterprise to get those additional attributes.
       *     Warning: The raw signals data can change at any moment as we improve the product. We cannot guarantee the internal shape of raw device attributes to be stable, so typical semantic versioning rules do not apply here. Use this data with caution without assuming a specific structure beyond the generic type provided here.
       *      */
      rawDeviceAttributes?: components['schemas']['WebhookRawDeviceAttributes']
      highActivity?: components['schemas']['WebhookHighActivity']
      locationSpoofing?: components['schemas']['WebhookLocationSpoofing']
      suspectScore?: components['schemas']['WebhookSuspectScore']
      /** @description This signal is deprecated.
       *      */
      remoteControl?: components['schemas']['WebhookRemoteControl']
      /** @description Sums key data points for a specific `visitorId`, `ipAddress` and `linkedId` at three distinct time
       *     intervals: 5 minutes, 1 hour, and 24 hours as follows:
       *
       *     - Number of distinct IP addresses associated to the visitor ID.
       *     - Number of distinct linked IDs associated with the visitor ID.
       *     - Number of distinct countries associated with the visitor ID.
       *     - Number of identification events associated with the visitor ID.
       *     - Number of identification events associated with the detected IP address.
       *     - Number of distinct IP addresses associated with the provided linked ID.
       *     - Number of distinct visitor IDs associated with the provided linked ID.
       *
       *     The `24h` interval of `distinctIp`, `distinctLinkedId`, `distinctCountry`,
       *     `distinctIpByLinkedId` and `distinctVisitorIdByLinkedId` will be omitted
       *     if the number of `events` for the visitor ID in the last 24
       *     hours (`events.intervals.['24h']`) is higher than 20.000.
       *      */
      velocity?: components['schemas']['WebhookVelocity']
      developerTools?: components['schemas']['WebhookDeveloperTools']
      mitmAttack?: components['schemas']['WebhookMitMAttack']
      /** @description `true` if we determined that this payload was replayed, `false` otherwise.
       *      */
      replayed?: boolean
      /** @description Contains information about the SDK used to perform the request. */
      sdk: components['schemas']['SDK']
      /** @description Other identities that have been established for a given Visitor. */
      supplementaryIds?: components['schemas']['WebhookSupplementaryIDs']
      /** @description Proximity ID represents a fixed geographical zone in a discrete global grid within which the device is observed.
       *      */
      proximity?: components['schemas']['WebhookProximity']
    }
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
      query?: never
      header?: never
      path: {
        /** @description The unique [identifier](https://dev.fingerprint.com/reference/get-function#requestid) of each identification request. */
        request_id: string
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
          'application/json': components['schemas']['EventsGetResponse']
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
      /** @description Not found. The request ID cannot be found in this application's data. */
      404: {
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
        /** @description The unique event [identifier](https://dev.fingerprint.com/reference/get-function#requestid). */
        request_id: string
      }
      cookie?: never
    }
    requestBody: {
      content: {
        'application/json': components['schemas']['EventsUpdateRequest']
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
      /** @description Not found. The request ID cannot be found in this application's data. */
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
      query: {
        /** @description Limit the number of events returned.
         *      */
        limit: number
        /** @description Use `pagination_key` to get the next page of results.
         *
         *     When more results are available (e.g., you requested up to 200 results for your search using `limit`, but there are more than 200 events total matching your request), the `paginationKey` top-level attribute is added to the response. The key corresponds to the `timestamp` of the last returned event. In the following request, use that value in the `pagination_key` parameter to get the next page of results:
         *
         *     1. First request, returning most recent 200 events: `GET api-base-url/events/search?limit=200`
         *     2. Use `response.paginationKey` to get the next page of results: `GET api-base-url/events/search?limit=200&pagination_key=1740815825085`
         *      */
        pagination_key?: string
        /** @description Unique [visitor identifier](https://dev.fingerprint.com/reference/get-function#visitorid) issued by Fingerprint Identification and all active Smart Signals.
         *     Filter for events matching this `visitor_id`.
         *      */
        visitor_id?: string
        /** @description Filter events by the Bot Detection result, specifically:
         *       `all` - events where any kind of bot was detected.
         *       `good` - events where a good bot was detected.
         *       `bad` - events where a bad bot was detected.
         *       `none` - events where no bot was detected.
         *     > Note: When using this parameter, only events with the `products.botd.data.bot.result` property set to a valid value are returned. Events without a `products.botd` Smart Signal result are left out of the response.
         *      */
        bot?: 'all' | 'good' | 'bad' | 'none'
        /** @description Filter events by IP address range. The range can be as specific as a single IP (/32 for IPv4 or /128 for IPv6)
         *     All ip_address filters must use CIDR notation, for example, 10.0.0.0/24, 192.168.0.1/32
         *      */
        ip_address?: string
        /** @description Filter events by your custom identifier.
         *
         *     You can use [linked IDs](https://dev.fingerprint.com/reference/get-function#linkedid) to associate identification requests with your own identifier, for example, session ID, purchase ID, or transaction ID. You can then use this `linked_id` parameter to retrieve all events associated with your custom identifier.
         *      */
        linked_id?: string
        /** @description Filter events with a timestamp greater than the start time, in Unix time (milliseconds).
         *      */
        start?: number
        /** @description Filter events with a timestamp smaller than the end time, in Unix time (milliseconds).
         *      */
        end?: number
        /** @description Sort events in reverse timestamp order.
         *      */
        reverse?: boolean
        /** @description Filter events previously tagged as suspicious via the [Update API](https://dev.fingerprint.com/reference/updateevent).
         *     > Note: When using this parameter, only events with the `suspect` property explicitly set to `true` or `false` are returned. Events with undefined `suspect` property are left out of the response.
         *      */
        suspect?: boolean
        /** @description Filter events by VPN Detection result.
         *     > Note: When using this parameter, only events with the `products.vpn.data.result` property set to `true` or `false` are returned. Events without a `products.vpn` Smart Signal result are left out of the response.
         *      */
        vpn?: boolean
        /** @description Filter events by Virtual Machine Detection result.
         *     > Note: When using this parameter, only events with the `products.virtualMachine.data.result` property set to `true` or `false` are returned. Events without a `products.virtualMachine` Smart Signal result are left out of the response.
         *      */
        virtual_machine?: boolean
        /** @description Filter events by Tampering Detection result.
         *     > Note: When using this parameter, only events with the `products.tampering.data.result` property set to `true` or `false` are returned. Events without a `products.tampering` Smart Signal result are left out of the response.
         *      */
        tampering?: boolean
        /** @description Filter events by Anti-detect Browser Detection result.
         *     > Note: When using this parameter, only events with the `products.tampering.data.antiDetectBrowser` property set to `true` or `false` are returned. Events without a `products.tampering` Smart Signal result are left out of the response.
         *      */
        anti_detect_browser?: boolean
        /** @description Filter events by Browser Incognito Detection result.
         *     > Note: When using this parameter, only events with the `products.incognito.data.result` property set to `true` or `false` are returned. Events without a `products.incognito` Smart Signal result are left out of the response.
         *      */
        incognito?: boolean
        /** @description Filter events by Privacy Settings Detection result.
         *     > Note: When using this parameter, only events with the `products.privacySettings.data.result` property set to `true` or `false` are returned. Events without a `products.privacySettings` Smart Signal result are left out of the response.
         *      */
        privacy_settings?: boolean
        /** @description Filter events by Jailbroken Device Detection result.
         *     > Note: When using this parameter, only events with the `products.jailbroken.data.result` property set to `true` or `false` are returned. Events without a `products.jailbroken` Smart Signal result are left out of the response.
         *      */
        jailbroken?: boolean
        /** @description Filter events by Frida Detection result.
         *     > Note: When using this parameter, only events with the `products.frida.data.result` property set to `true` or `false` are returned. Events without a `products.frida` Smart Signal result are left out of the response.
         *      */
        frida?: boolean
        /** @description Filter events by Factory Reset Detection result.
         *     > Note: When using this parameter, only events with the `products.factoryReset.data.result` property set to `true` or `false` are returned. Events without a `products.factoryReset` Smart Signal result are left out of the response.
         *      */
        factory_reset?: boolean
        /** @description Filter events by Cloned App Detection result.
         *     > Note: When using this parameter, only events with the `products.clonedApp.data.result` property set to `true` or `false` are returned. Events without a `products.clonedApp` Smart Signal result are left out of the response.
         *      */
        cloned_app?: boolean
        /** @description Filter events by Android Emulator Detection result.
         *     > Note: When using this parameter, only events with the `products.emulator.data.result` property set to `true` or `false` are returned. Events without a `products.emulator` Smart Signal result are left out of the response.
         *      */
        emulator?: boolean
        /** @description Filter events by Rooted Device Detection result.
         *     > Note: When using this parameter, only events with the `products.rootApps.data.result` property set to `true` or `false` are returned. Events without a `products.rootApps` Smart Signal result are left out of the response.
         *      */
        root_apps?: boolean
        /** @description Filter events by VPN Detection result confidence level.
         *     `high` - events with high VPN Detection confidence.
         *     `medium` - events with medium VPN Detection confidence.
         *     `low` - events with low VPN Detection confidence.
         *     > Note: When using this parameter, only events with the `products.vpn.data.confidence` property set to a valid value are returned. Events without a `products.vpn` Smart Signal result are left out of the response.
         *      */
        vpn_confidence?: 'high' | 'medium' | 'low'
        /** @description Filter events with Suspect Score result above a provided minimum threshold.
         *     > Note: When using this parameter, only events where the `products.suspectScore.data.result` property set to a value exceeding your threshold are returned. Events without a `products.suspectScore` Smart Signal result are left out of the response.
         *      */
        min_suspect_score?: number
        /** @description Filter events by IP Blocklist Detection result.
         *     > Note: When using this parameter, only events with the `products.ipBlocklist.data.result` property set to `true` or `false` are returned. Events without a `products.ipBlocklist` Smart Signal result are left out of the response.
         *      */
        ip_blocklist?: boolean
        /** @description Filter events by Datacenter Detection result.
         *     > Note: When using this parameter, only events with the `products.ipInfo.data.v4.datacenter.result` or `products.ipInfo.data.v6.datacenter.result` property set to `true` or `false` are returned. Events without a `products.ipInfo` Smart Signal result are left out of the response.
         *      */
        datacenter?: boolean
        /** @description Filter events by Developer Tools detection result.
         *     > Note: When using this parameter, only events with the `products.developerTools.data.result` property set to `true` or `false` are returned. Events without a `products.developerTools` Smart Signal result are left out of the response.
         *      */
        developer_tools?: boolean
        /** @description Filter events by Location Spoofing detection result.
         *     > Note: When using this parameter, only events with the `products.locationSpoofing.data.result` property set to `true` or `false` are returned. Events without a `products.locationSpoofing` Smart Signal result are left out of the response.
         *      */
        location_spoofing?: boolean
        /** @description Filter events by MITM (Man-in-the-Middle) Attack detection result.
         *     > Note: When using this parameter, only events with the `products.mitmAttack.data.result` property set to `true` or `false` are returned. Events without a `products.mitmAttack` Smart Signal result are left out of the response.
         *      */
        mitm_attack?: boolean
        /** @description Filter events by Proxy detection result.
         *     > Note: When using this parameter, only events with the `products.proxy.data.result` property set to `true` or `false` are returned. Events without a `products.proxy` Smart Signal result are left out of the response.
         *      */
        proxy?: boolean
        /** @description Filter events by a specific SDK version associated with the identification event. Example: `3.11.14`
         *      */
        sdk_version?: string
        /** @description Filter events by the SDK Platform associated with the identification event.
         *     `js` - JavaScript agent (Web).
         *     `ios` - Apple iOS based devices.
         *     `android` - Android based devices.
         *      */
        sdk_platform?: 'js' | 'android' | 'ios'
        /** @description Filter for events by providing one or more environment IDs.
         *      */
        environment?: string[]
        /** @description Filter events by the most precise Proximity ID provided by default.
         *     > Note: When using this parameter, only events with the `products.proximity.id` property matching the provided ID are returned. Events without a `products.proximity` result are left out of the response.
         *      */
        proximity_id?: string
        /** @description Filter events by Proximity Radius.
         *     > Note: When using this parameter, only events with the `products.proximity.precisionRadius` property set to a valid value are returned. Events without a `products.proximity` result are left out of the response.
         *      */
        proximity_precision_radius?: 10 | 25 | 65 | 175 | 450 | 1200 | 3300 | 8500 | 22500
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
          'application/json': components['schemas']['SearchEventsResponse']
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
    }
  }
  getVisits: {
    parameters: {
      query?: {
        /** @description Filter visits by `requestId`.
         *
         *     Every identification request has a unique identifier associated with it called `requestId`. This identifier is returned to the client in the identification [result](https://dev.fingerprint.com/reference/get-function#requestid). When you filter visits by `requestId`, only one visit will be returned.
         *      */
        request_id?: string
        /** @description Filter visits by your custom identifier.
         *
         *     You can use [`linkedId`](https://dev.fingerprint.com/reference/get-function#linkedid) to associate identification requests with your own identifier, for example: session ID, purchase ID, or transaction ID. You can then use this `linked_id` parameter to retrieve all events associated with your custom identifier.
         *      */
        linked_id?: string
        /** @description Limit scanned results.
         *
         *     For performance reasons, the API first scans some number of events before filtering them. Use `limit` to specify how many events are scanned before they are filtered by `requestId` or `linkedId`. Results are always returned sorted by the timestamp (most recent first).
         *     By default, the most recent 100 visits are scanned, the maximum is 500.
         *      */
        limit?: number
        /** @description Use `paginationKey` to get the next page of results.
         *
         *     When more results are available (e.g., you requested 200 results using `limit` parameter, but a total of 600 results are available), the `paginationKey` top-level attribute is added to the response. The key corresponds to the `requestId` of the last returned event. In the following request, use that value in the `paginationKey` parameter to get the next page of results:
         *
         *     1. First request, returning most recent 200 events: `GET api-base-url/visitors/:visitorId?limit=200`
         *     2. Use `response.paginationKey` to get the next page of results: `GET api-base-url/visitors/:visitorId?limit=200&paginationKey=1683900801733.Ogvu1j`
         *
         *     Pagination happens during scanning and before filtering, so you can get less visits than the `limit` you specified with more available on the next page. When there are no more results available for scanning, the `paginationKey` attribute is not returned.
         *      */
        paginationKey?: string
        /**
         * @deprecated
         * @description ⚠️ Deprecated pagination method, please use `paginationKey` instead. Timestamp (in milliseconds since epoch) used to paginate results.
         *
         */
        before?: number
      }
      header?: never
      path: {
        /** @description Unique [visitor identifier](https://dev.fingerprint.com/reference/get-function#visitorid) issued by Fingerprint Identification and all active Smart Signals. */
        visitor_id: string
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
          'application/json': components['schemas']['VisitorsGetResponse']
        }
      }
      /** @description Bad request. The visitor ID or query parameters are missing or in the wrong format. */
      400: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorPlainResponse']
        }
      }
      /** @description Forbidden. Access to this API is denied. */
      403: {
        headers: {
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorPlainResponse']
        }
      }
      /** @description Too Many Requests. The request is throttled. */
      429: {
        headers: {
          /** @description Indicates how many seconds you should wait before attempting the next request. */
          'Retry-After'?: number
          [name: string]: unknown
        }
        content: {
          'application/json': components['schemas']['ErrorPlainResponse']
        }
      }
    }
  }
  deleteVisitorData: {
    parameters: {
      query?: never
      header?: never
      path: {
        /** @description The [visitor ID](https://dev.fingerprint.com/reference/get-function#visitorid) you want to delete. */
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
      /** @description Not found. The visitor ID cannot be found in this application's data. */
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
  getRelatedVisitors: {
    parameters: {
      query: {
        /** @description The [visitor ID](https://dev.fingerprint.com/reference/get-function#visitorid) for which you want to find the other visitor IDs that originated from the same mobile device. */
        visitor_id: string
      }
      header?: never
      path?: never
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
          'application/json': components['schemas']['RelatedVisitorsResponse']
        }
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
      /** @description Not found. The visitor ID cannot be found in this application's data. */
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
