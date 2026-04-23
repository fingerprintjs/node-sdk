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
     * Delete data by visitor ID
     * @description Request deleting all data associated with the specified visitor ID. This API is useful for compliance with privacy regulations.
     *
     *     ### Which data is deleted?
     *     - Browser (or device) properties
     *     - Identification requests made from this browser (or device)
     *
     *     #### Browser (or device) properties
     *     - Represents the data that Fingerprint collected from this specific browser (or device) and everything inferred and derived from it.
     *     - Upon request to delete, this data is deleted asynchronously (typically within a few minutes) and it will no longer be used to identify this browser (or device) for your [Fingerprint Workspace](https://docs.fingerprint.com/docs/glossary#fingerprint-workspace).
     *
     *     #### Identification requests made from this browser (or device)
     *     - Fingerprint stores the identification requests made from a browser (or device) for up to 30 (or 90) days depending on your plan. To learn more, see [Data Retention](https://docs.fingerprint.com/docs/regions#data-retention).
     *     - Upon request to delete, the identification requests that were made by this browser
     *       - Within the past 10 days are deleted within 24 hrs.
     *       - Outside of 10 days are allowed to purge as per your data retention period.
     *
     *     ### Corollary
     *     After requesting to delete a visitor ID,
     *     - If the same browser (or device) requests to identify, it will receive a different visitor ID.
     *     - If you request [`/v4/events` API](https://docs.fingerprint.com/reference/server-api-v4-get-event) with an `event_id` that was made outside of the 10 days, you will still receive a valid response.
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
}
export type webhooks = Record<string, never>
export interface components {
  schemas: {
    /** @description Unique identifier of the user's request. The first portion of the event_id is a unix epoch milliseconds timestamp For example: `1758130560902.8tRtrH`
     *      */
    EventId: string
    /**
     * Format: int64
     * @description Timestamp of the event with millisecond precision in Unix time.
     */
    Timestamp: number
    /**
     * @description Only included for requests using incremental identification.
     *     - `partially_completed` - the event did not receive the second "update" request.
     *     - `completed` - the event was updated and all information is available.
     *
     * @enum {string}
     */
    IncrementalIdentificationStatus: 'partially_completed' | 'completed'
    /** @description A customer-provided id that was sent with the request. */
    LinkedId: string
    /** @description Environment Id of the event. For example: `ae_47abaca3db2c7c43`
     *      */
    EnvironmentId: string
    /** @description Field is `true` if you have previously set the `suspect` flag for this event using the [Server API Update event endpoint](https://docs.fingerprint.com/reference/server-api-v4-update-event). */
    Suspect: boolean
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
      /**
       * @description Platform of the SDK used for the identification request.
       * @enum {string}
       */
      platform: 'js' | 'android' | 'ios' | 'unknown'
      /** @description Version string of the SDK used for the identification request. For example: `"3.12.1"`
       *      */
      version: string
      integrations?: components['schemas']['Integration'][]
    }
    /** @description `true` if we determined that this payload was replayed, `false` otherwise.
     *      */
    Replayed: boolean
    IdentificationConfidence: {
      /**
       * Format: double
       * @description The confidence score is a floating-point number between 0 and 1 that represents the probability of accurate identification.
       */
      score: number
      /** @description The version name of the method used to calculate the Confidence score. This field is only present for customers who opted in to an alternative calculation method. */
      version?: string
      comment?: string
    }
    Identification: {
      /** @description String of 20 characters that uniquely identifies the visitor's browser or mobile device. */
      visitor_id: string
      confidence?: components['schemas']['IdentificationConfidence']
      /** @description Attribute represents if a visitor had been identified before. */
      visitor_found: boolean
      /**
       * Format: int64
       * @description Unix epoch time milliseconds timestamp indicating the time at which this visitor ID was first seen. example: `1758069706642` - Corresponding to Wed Sep 17 2025 00:41:46 GMT+0000
       *
       */
      first_seen_at?: number
      /**
       * Format: int64
       * @description Unix epoch time milliseconds timestamp indicating the time at which this visitor ID was last seen. example: `1758069706642` - Corresponding to Wed Sep 17 2025 00:41:46 GMT+0000
       *
       */
      last_seen_at?: number
    }
    /** @description The High Recall ID is a supplementary browser identifier designed for use cases that require wider coverage over precision. Compared to the standard visitor ID, the High Recall ID strives to match incoming browsers more generously (rather than precisely) with existing browsers and thus identifies fewer browsers as new. The High Recall ID is best suited for use cases that are sensitive to browsers being identified as new and where mismatched browsers are not detrimental. */
    SupplementaryIDHighRecall: {
      /** @description The High Recall identifier for the visitor's browser. It is an alphanumeric string with a maximum length of 25 characters. */
      visitor_id: string
      /** @description True if this is a returning browser and has been previously identified. Otherwise, false. */
      visitor_found: boolean
      confidence?: components['schemas']['IdentificationConfidence']
      /**
       * Format: int64
       * @description Unix epoch timestamp (in milliseconds) indicating when the browser was first identified. example: `1758069706642` - Corresponding to Wed Sep 17 2025 00:41:46 GMT+0000
       *
       */
      first_seen_at?: number
      /**
       * Format: int64
       * @description Unix epoch timestamp (in milliseconds) corresponding to the most recent visit by this browser. example: `1758069706642` - Corresponding to Wed Sep 17 2025 00:41:46 GMT+0000
       *
       */
      last_seen_at?: number
    }
    /** @description A customer-provided value or an object that was sent with the identification request or updated later. */
    Tags: {
      [key: string]: unknown
    }
    /** @description Page URL from which the request was sent. For example `https://example.com/`
     *      */
    Url: string
    /** @description Bundle Id of the iOS application integrated with the Fingerprint SDK for the event. For example: `com.foo.app`
     *      */
    BundleId: string
    /** @description Package name of the Android application integrated with the Fingerprint SDK for the event. For example: `com.foo.app`
     *      */
    PackageName: string
    /** @description IP address of the requesting browser or bot. */
    IpAddress: string
    /** @description User Agent of the client, for example: `Mozilla/5.0 (Windows NT 6.1; Win64; x64) ....`
     *      */
    UserAgent: string
    /** @description Client Referrer field corresponds to the `document.referrer` field gathered during an identification request. The value is an empty string if the user navigated to the page directly (not through a link, but, for example, by using a bookmark) For example: `https://example.com/blog/my-article`
     *      */
    ClientReferrer: string
    BrowserDetails: {
      browser_name: string
      browser_major_version: string
      browser_full_version: string
      os: string
      os_version: string
      device: string
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
      precision_radius: 10 | 25 | 65 | 175 | 450 | 1200 | 3300 | 8500 | 22500
      /**
       * Format: float
       * @description A value between `0` and `1` representing the likelihood that the true device location lies within the mapped proximity zone.
       *       * Scores closer to `1` indicate high confidence that the location is inside the mapped proximity zone.
       *       * Scores closer to `0` indicate lower confidence, suggesting the true location may fall in an adjacent zone.
       *
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
    /** @description Additional classification of the bot type if detected.
     *      */
    BotType: string
    /** @description Extended bot information. */
    BotInfo: {
      /** @description The type and purpose of the bot. */
      category: string
      /** @description The organization or company operating the bot. */
      provider: string
      /** @description The URL of the bot provider's website. */
      provider_url?: string
      /** @description The specific name or identifier of the bot. */
      name: string
      /**
       * @description The verification status of the bot's identity:
       *      * `verified` - well-known bot with publicly verifiable identity, directed by the bot provider.
       *      * `signed` - bot that signs its platform via Web Bot Auth, directed by the bot provider’s customers.
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
    /** @description Android specific cloned application detection. There are 2 values:
     *     * `true` - Presence of app cloners work detected (e.g. fully cloned application found or launch of it inside of a not main working profile detected).
     *     * `false` - No signs of cloned application detected or the client is not Android.
     *      */
    ClonedApp: boolean
    /** @description `true` if the browser is Chrome with DevTools open or Firefox with Developer Tools open, `false` otherwise.
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
    Geolocation: {
      /** @description The IP address is likely to be within this radius (in km) of the specified location. */
      accuracy_radius?: number
      /** Format: double */
      latitude?: number
      /** Format: double */
      longitude?: number
      postal_code?: string
      /** Format: timezone */
      timezone?: string
      city_name?: string
      country_code?: string
      country_name?: string
      continent_code?: string
      continent_name?: string
      subdivisions?: {
        iso_code: string
        name: string
      }[]
    }
    IPInfoV4: {
      /** Format: ipv4 */
      address: string
      geolocation?: components['schemas']['Geolocation']
      asn?: string
      asn_name?: string
      asn_network?: string
      asn_type?: string
      datacenter_result?: boolean
      datacenter_name?: string
    }
    IPInfoV6: {
      /** Format: ipv6 */
      address: string
      geolocation?: components['schemas']['Geolocation']
      asn?: string
      asn_name?: string
      asn_network?: string
      asn_type?: string
      datacenter_result?: boolean
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
       * @description Residential proxies use real user IP addresses to appear as legitimate traffic,
       *     while data center proxies are public proxies hosted in data centers
       *
       * @enum {string}
       */
      proxy_type: 'residential' | 'data_center'
      /**
       * Format: int64
       * @description Unix millisecond timestamp with hourly resolution of when this IP was last seen as a proxy
       *
       */
      last_seen_at?: number
      /** @description String representing the last proxy service provider detected when this
       *     IP was synced. An IP can be shared by multiple service providers.
       *      */
      provider?: string
    }
    /**
     * Format: double
     * @description Machine learning–based proxy score, represented as a floating-point value between 0 and 1 (inclusive), with up to three decimal places of precision. A higher score means a higher confidence in the positive `proxy` detection result
     *
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
    /** @description The ID of the evaluated ruleset. */
    RulesetId: string
    /** @description The ID of the rule that matched the identification event. */
    RuleId: string
    /** @description The expression of the rule that matched the identification event. */
    RuleExpression: string
    /**
     * @description Describes the action to take with the request.
     * @enum {string}
     */
    RuleActionType: 'allow' | 'block'
    RuleActionHeaderField: {
      /** @description The header field name. */
      name: string
      /** @description The value of the header field. */
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
      /** @description The ID of the evaluated ruleset. */
      ruleset_id: components['schemas']['RulesetId']
      /** @description The ID of the rule that matched the identification event. */
      rule_id?: components['schemas']['RuleId']
      /** @description The expression of the rule that matched the identification event. */
      rule_expression?: components['schemas']['RuleExpression']
      /**
       * @description discriminator enum property added by openapi-typescript
       * @enum {string}
       */
      type: 'allow'
      /** @description The set of header modifications to apply, in the following order: remove, set, append. */
      request_header_modifications?: components['schemas']['RequestHeaderModifications']
    }
    /** @description A valid HTTP status code. */
    StatusCode: number
    /** @description The response body to send to the client. */
    RuleActionBody: string
    /** @description Informs the client the request should be blocked using the response described by this rule action. */
    EventRuleActionBlock: {
      /** @description The ID of the evaluated ruleset. */
      ruleset_id: components['schemas']['RulesetId']
      /** @description The ID of the rule that matched the identification event. */
      rule_id?: components['schemas']['RuleId']
      /** @description The expression of the rule that matched the identification event. */
      rule_expression?: components['schemas']['RuleExpression']
      /**
       * @description discriminator enum property added by openapi-typescript
       * @enum {string}
       */
      type: 'block'
      /** @description A valid HTTP status code. */
      status_code?: components['schemas']['StatusCode']
      /** @description A list of headers to send. */
      headers?: components['schemas']['RuleActionHeaderField'][]
      /** @description The response body to send to the client. */
      body?: components['schemas']['RuleActionBody']
    }
    /** @description Describes the action the client should take, according to the rule in the ruleset that matched the event. When getting an event by event ID, the rule_action will only be included when the ruleset_id query parameter is specified. */
    EventRuleAction: components['schemas']['EventRuleActionAllow'] | components['schemas']['EventRuleActionBlock']
    /** @description iOS specific simulator detection. There are 2 values:
     *     * `true` - Simulator environment detected.
     *     * `false` - No signs of simulator or the client is not iOS.
     *      */
    Simulator: boolean
    /** @description Suspect Score is an easy way to integrate Smart Signals into your fraud protection work flow.  It is a weighted representation of all Smart Signals present in the payload that helps identify suspicious activity. The value range is [0; S] where S is sum of all Smart Signals weights.  See more details here: https://docs.fingerprint.com/docs/suspect-score
     *      */
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
     */
    TamperingMlScore: number
    TamperingDetails: {
      /**
       * Format: double
       * @description The output of this model is captured as anomaly_score, a statistical score indicating how rare the visitor's browser signature is compared to the overall population. Values close to 1 signify highly anomalous browsers and we consider anything above the threshold of 0.5 to be actionable (the result field conveniently captures that fact).
       *
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
      /** @description Count for the last 5 minutes of velocity data, from the time of the event.
       *      */
      '5_minutes': number
      /** @description Count for the last 1 hour of velocity data, from the time of the event.
       *      */
      '1_hour': number
      /** @description The `24_hours` interval of `distinct_ip`, `distinct_linked_id`, `distinct_country`, `distinct_ip_by_linked_id` and `distinct_visitor_id_by_linked_id` will be omitted if the number of `events` for the visitor Id in the last 24 hours (`events.['24_hours']`) is higher than 20.000.
       *      */
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
     * @description Machine learning–based virtual machine score,  represented as a floating-point value between 0 and 1 (inclusive), with up to three decimal places of precision. A higher score means a higher confidence in the positive `virtual_machine` detection result
     *
     */
    VirtualMachineMLScore: number
    /** @description VPN or other anonymizing service has been used when sending the request.
     *      */
    Vpn: boolean
    /**
     * @description A confidence rating for the VPN detection result — "low", "medium", or "high". Depends on the combination of results returned from all VPN detection methods.
     * @enum {string}
     */
    VpnConfidence: 'low' | 'medium' | 'high'
    /** @description Local timezone which is used in timezone_mismatch method.
     *      */
    VpnOriginTimezone: string
    /** @description Country of the request (only for Android SDK version >= 2.4.0, ISO 3166 format or unknown).
     *      */
    VpnOriginCountry: string
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
    }
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
      /** Format: double */
      default?: number
      /** Format: double */
      serif?: number
      /** Format: double */
      sans?: number
      /** Format: double */
      mono?: number
      /** Format: double */
      apple?: number
      /** Format: double */
      min?: number
      /** Format: double */
      system?: number
    }
    /** @description Bounding box metrics describing how the emoji glyph renders. */
    Emoji: {
      /** @description Font family reported by the browser when drawing the emoji. */
      font?: string
      /** Format: double */
      width?: number
      /** Format: double */
      height?: number
      /** Format: double */
      top?: number
      /** Format: double */
      bottom?: number
      /** Format: double */
      left?: number
      /** Format: double */
      right?: number
      /** Format: double */
      x?: number
      /** Format: double */
      y?: number
    }
    /**
     * @description List of fonts detected on the device.
     * @example [
     *       "Arial Unicode MS",
     *       "Gill Sans",
     *       "Helvetica Neue",
     *       "Menlo"
     *     ]
     */
    Fonts: string[]
    /**
     * Format: int32
     * @description Rounded amount of RAM (in gigabytes) reported by the browser.
     * @example 8
     */
    DeviceMemory: number
    /** @description Timezone identifier detected on the client. */
    Timezone: string
    /** @description Canvas fingerprint containing winding flag plus geometry/text hashes. */
    Canvas: {
      winding?: boolean
      /** @description Hash of geometry rendering output or `unsupported` markers. */
      geometry?: string
      /** @description Hash of text rendering output or `unsupported` markers. */
      text?: string
    }
    /** @description Navigator languages reported by the agent including fallbacks. Each inner array represents ordered language preferences reported by different APIs. Available for both browsers and iOS devices
     *      */
    Languages: string[][]
    /** @description Hashes of WebGL context attributes and extension support. */
    WebGlExtensions: {
      context_attributes?: string
      parameters?: string
      shader_precisions?: string
      extensions?: string
      extension_parameters?: string
      unsupported_extensions?: string[]
    }
    /** @description Render and vendor strings reported by the WebGL context. */
    WebGlBasics: {
      version?: string
      vendor?: string
      vendor_unmasked?: string
      renderer?: string
      renderer_unmasked?: string
      shading_language_version?: string
    }
    /** @description Current screen resolution. Available for both browsers and iOS devices */
    ScreenResolution: number[]
    /** @description Browser-reported touch capabilities. */
    TouchSupport: {
      touch_event?: boolean
      touch_start?: boolean
      /** Format: int64 */
      max_touch_points?: number
    }
    /** @description Navigator `oscpu` string. */
    Oscpu: string
    /**
     * Format: int32
     * @description Integer representing the CPU architecture exposed by the browser.
     */
    Architecture: number
    /** @description Whether the cookies are enabled in the browser. */
    CookiesEnabled: boolean
    /**
     * Format: int32
     * @description Number of logical CPU cores reported by the browser.
     */
    HardwareConcurrency: number
    /** @description Locale derived from the Intl.DateTimeFormat API. Negative values indicate known error states. The negative statuses can be:
     *     - "-1": A permanent status for browsers that don't support Intl API.
     *     - "-2": A permanent status for browsers that don't supportDateTimeFormat constructor.
     *     - "-3": A permanent status for browsers in which DateTimeFormat locale is undefined or null.
     *      */
    DateTimeLocale: string
    /** @description Navigator vendor string. */
    Vendor: string
    /**
     * Format: int32
     * @description Screen color depth in bits.
     */
    ColorDepth: number
    /** @description Navigator platform string. */
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
     */
    Audio: number
    /** @description Browser plugins reported by `navigator.plugins`. */
    Plugins: {
      name: string
      description?: string
      mimeTypes?: {
        type?: string
        suffixes?: string
        description?: string
      }[]
    }[]
    /** @description Whether IndexedDB is available. */
    IndexedDb: boolean
    /** @description Hash of Math APIs used for entropy collection. */
    Math: string
    /** @description Device model string. Available only for Android and iOS devices. */
    DeviceModel: string
    /** @description Device manufacturer string. Available only for Android and iOS devices. */
    DeviceManufacturer: string
    /** @description Unique identifier for the user’s installed fonts. */
    FontHash: string
    /** @description UTC offset in "±HH:MM" format derived from the detected IANA timezone. */
    TimezoneOffset: string
    /** @description A curated subset of raw browser/device attributes that the API surface exposes. Each property contains a value or object with the data for the collected signal.
     *      */
    RawDeviceAttributes: {
      /** @description Baseline measurement of canonical fonts rendered on the device. Numeric width metrics, in CSS pixels, for the canonical fonts collected by the agent.
       *      */
      font_preferences?: components['schemas']['FontPreferences']
      /** @description Bounding box metrics describing how the emoji glyph renders. */
      emoji?: components['schemas']['Emoji']
      /** @description List of fonts detected on the device. */
      fonts?: components['schemas']['Fonts']
      /** @description Rounded amount of RAM (in gigabytes) reported by the browser. */
      device_memory?: components['schemas']['DeviceMemory']
      /** @description Timezone identifier detected on the client. */
      timezone?: components['schemas']['Timezone']
      /** @description Canvas fingerprint containing winding flag plus geometry/text hashes. */
      canvas?: components['schemas']['Canvas']
      /** @description Navigator languages reported by the agent including fallbacks. Each inner array represents ordered language preferences reported by different APIs. Available for both browsers and iOS devices
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
      /** @description Navigator `oscpu` string. */
      oscpu?: components['schemas']['Oscpu']
      /** @description Integer representing the CPU architecture exposed by the browser. */
      architecture?: components['schemas']['Architecture']
      /** @description Whether the cookies are enabled in the browser. */
      cookies_enabled?: components['schemas']['CookiesEnabled']
      /** @description Number of logical CPU cores reported by the browser. */
      hardware_concurrency?: components['schemas']['HardwareConcurrency']
      /** @description Locale derived from the Intl.DateTimeFormat API. Negative values indicate known error states. The negative statuses can be:
       *     - "-1": A permanent status for browsers that don't support Intl API.
       *     - "-2": A permanent status for browsers that don't supportDateTimeFormat constructor.
       *     - "-3": A permanent status for browsers in which DateTimeFormat locale is undefined or null.
       *      */
      date_time_locale?: components['schemas']['DateTimeLocale']
      /** @description Navigator vendor string. */
      vendor?: components['schemas']['Vendor']
      /** @description Screen color depth in bits. */
      color_depth?: components['schemas']['ColorDepth']
      /** @description Navigator platform string. */
      platform?: components['schemas']['Platform']
      /** @description Whether sessionStorage is available. */
      session_storage?: components['schemas']['SessionStorage']
      /** @description Whether localStorage is available. */
      local_storage?: components['schemas']['LocalStorage']
      /** @description AudioContext fingerprint or negative status when unavailable. The negative statuses can be:
       *     - -1: A permanent status for those browsers which are known to always suspend audio context
       *     - -2: A permanent status for browsers that don't support the signal
       *     - -3: A temporary status that means that an unexpected timeout has happened
       *      */
      audio?: components['schemas']['Audio']
      /** @description Browser plugins reported by `navigator.plugins`. */
      plugins?: components['schemas']['Plugins']
      /** @description Whether IndexedDB is available. */
      indexed_db?: components['schemas']['IndexedDb']
      /** @description Hash of Math APIs used for entropy collection. */
      math?: components['schemas']['Math']
      /** @description Device model string. Available only for Android and iOS devices. */
      device_model?: components['schemas']['DeviceModel']
      /** @description Device manufacturer string. Available only for Android and iOS devices. */
      device_manufacturer?: components['schemas']['DeviceManufacturer']
      /** @description Unique identifier for the user’s installed fonts. */
      font_hash?: components['schemas']['FontHash']
      /** @description UTC offset in "±HH:MM" format derived from the detected IANA timezone. */
      timezone_offset?: components['schemas']['TimezoneOffset']
    }
    /** @description Contains results from Fingerprint Identification and all active Smart Signals. */
    Event: {
      /** @description Unique identifier of the user's request. The first portion of the event_id is a unix epoch milliseconds timestamp For example: `1758130560902.8tRtrH`
       *      */
      event_id: components['schemas']['EventId']
      /** @description Timestamp of the event with millisecond precision in Unix time. */
      timestamp: components['schemas']['Timestamp']
      /** @description Only included for requests using incremental identification.
       *     - `partially_completed` - the event did not receive the second "update" request.
       *     - `completed` - the event was updated and all information is available.
       *      */
      incremental_identification_status?: components['schemas']['IncrementalIdentificationStatus']
      /** @description A customer-provided id that was sent with the request. */
      linked_id?: components['schemas']['LinkedId']
      /** @description Environment Id of the event. For example: `ae_47abaca3db2c7c43`
       *      */
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
      /** @description Page URL from which the request was sent. For example `https://example.com/`
       *      */
      url?: components['schemas']['Url']
      /** @description Bundle Id of the iOS application integrated with the Fingerprint SDK for the event. For example: `com.foo.app`
       *      */
      bundle_id?: components['schemas']['BundleId']
      /** @description Package name of the Android application integrated with the Fingerprint SDK for the event. For example: `com.foo.app`
       *      */
      package_name?: components['schemas']['PackageName']
      /** @description IP address of the requesting browser or bot. */
      ip_address?: components['schemas']['IpAddress']
      /** @description User Agent of the client, for example: `Mozilla/5.0 (Windows NT 6.1; Win64; x64) ....`
       *      */
      user_agent?: components['schemas']['UserAgent']
      /** @description Client Referrer field corresponds to the `document.referrer` field gathered during an identification request. The value is an empty string if the user navigated to the page directly (not through a link, but, for example, by using a bookmark) For example: `https://example.com/blog/my-article`
       *      */
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
      /** @description Additional classification of the bot type if detected.
       *      */
      bot_type?: components['schemas']['BotType']
      /** @description Extended bot information. */
      bot_info?: components['schemas']['BotInfo']
      /** @description Android specific cloned application detection. There are 2 values:
       *     * `true` - Presence of app cloners work detected (e.g. fully cloned application found or launch of it inside of a not main working profile detected).
       *     * `false` - No signs of cloned application detected or the client is not Android.
       *      */
      cloned_app?: components['schemas']['ClonedApp']
      /** @description `true` if the browser is Chrome with DevTools open or Firefox with Developer Tools open, `false` otherwise.
       *      */
      developer_tools?: components['schemas']['DeveloperTools']
      /** @description Android specific emulator detection. There are 2 values:
       *     * `true` - Emulated environment detected (e.g. launch inside of AVD).
       *     * `false` - No signs of emulated environment detected or the client is not Android.
       *      */
      emulator?: components['schemas']['Emulator']
      /** @description The time of the most recent factory reset that happened on the **mobile device** is expressed as Unix epoch time. When a factory reset cannot be detected on the mobile device or when the request is initiated from a browser,  this field will correspond to the *epoch* time (i.e 1 Jan 1970 UTC) as a value of 0. See [Factory Reset Detection](https://docs.fingerprint.com/docs/smart-signals-reference#factory-reset-detection) to learn more about this Smart Signal.
       *      */
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
      /** @description Machine learning–based proxy score, represented as a floating-point value between 0 and 1 (inclusive), with up to three decimal places of precision. A higher score means a higher confidence in the positive `proxy` detection result
       *      */
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
      /** @description Suspect Score is an easy way to integrate Smart Signals into your fraud protection work flow.  It is a weighted representation of all Smart Signals present in the payload that helps identify suspicious activity. The value range is [0; S] where S is sum of all Smart Signals weights.  See more details here: https://docs.fingerprint.com/docs/suspect-score
       *      */
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
      /** @description The output of this model is captured as tampering_ml_score, a number indicating how likely an event is coming from an anti detect browser. Values close to 1 signify higher confidence and we consider anything above the threshold of 0.8 to be actionable (the result and anti_detect_browser fields conveniently captures that fact)
       *      */
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
      /** @description Machine learning–based virtual machine score,  represented as a floating-point value between 0 and 1 (inclusive), with up to three decimal places of precision. A higher score means a higher confidence in the positive `virtual_machine` detection result
       *      */
      virtual_machine_ml_score?: components['schemas']['VirtualMachineMLScore']
      /** @description VPN or other anonymizing service has been used when sending the request.
       *      */
      vpn?: components['schemas']['Vpn']
      /** @description A confidence rating for the VPN detection result — "low", "medium", or "high". Depends on the combination of results returned from all VPN detection methods. */
      vpn_confidence?: components['schemas']['VpnConfidence']
      /** @description Local timezone which is used in timezone_mismatch method.
       *      */
      vpn_origin_timezone?: components['schemas']['VpnOriginTimezone']
      /** @description Country of the request (only for Android SDK version >= 2.4.0, ISO 3166 format or unknown).
       *      */
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
      message: string
    }
    ErrorResponse: {
      error: components['schemas']['Error']
    }
    EventUpdate: {
      /** @description Linked Id value to assign to the existing event */
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
      /** @description Use this value in the `pagination_key` parameter to request the next page of search results. */
      pagination_key?: string
      /**
       * Format: int64
       * @description This value represents the total number of events matching the search query, up to the limit provided in the `total_hits` query parameter. Only present if the `total_hits` query parameter was provided.
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
        /** @description The ID of the ruleset to evaluate against the event, producing the action to take for this event.
         *     The resulting action is returned in the `rule_action` attribute of the response.
         *      */
        ruleset_id?: string
      }
      header?: never
      path: {
        /** @description The unique [identifier](https://docs.fingerprint.com/reference/js-agent-v4-get-function#event_id) of each identification request (`requestId` can be used in its place). */
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
        /** @description The unique event [identifier](https://docs.fingerprint.com/reference/js-agent-v4-get-function#event_id). */
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
        /** @description Maximum number of events to return. Results are selected from the time range (`start`, `end`), ordered by `reverse`, then truncated to provided `limit` size. So `reverse=true` returns the oldest N=`limit` events, otherwise the newest N=`limit` events.
         *      */
        limit?: number
        /** @description Use `pagination_key` to get the next page of results.
         *
         *     When more results are available (e.g., you requested up to 100 results for your query using `limit`, but there are more than 100 events total matching your request), the `pagination_key` field is added to the response. The pagination key is an arbitrary string that should not be interpreted in any way and should be passed as-is. In the following request, use that value in the `pagination_key` parameter to get the next page of results:
         *
         *     1. First request, returning most recent 200 events: `GET api-base-url/events?limit=100`
         *     2. Use `response.pagination_key` to get the next page of results: `GET api-base-url/events?limit=100&pagination_key=1740815825085`
         *      */
        pagination_key?: string
        /** @description Unique [visitor identifier](https://docs.fingerprint.com/reference/js-agent-v4-get-function#visitor_id) issued by Fingerprint Identification and all active Smart Signals.
         *
         *     Filter events by matching Visitor ID (`identification.visitor_id` property).
         *      */
        visitor_id?: string
        /** @description The High Recall ID is a supplementary browser identifier designed for use cases that require wider coverage over precision. Compared to the standard visitor ID, the High Recall ID strives to match incoming browsers more generously (rather than precisely) with existing browsers and thus identifies fewer browsers as new. The High Recall ID is best suited for use cases that are sensitive to browsers being identified as new and where mismatched browsers are not detrimental.
         *
         *     Filter events by matching High Recall ID (`supplementary_id_high_recall.visitor_id` property).
         *      */
        high_recall_id?: string
        /** @description Filter events by the Bot Detection result, specifically:
         *       `all` - events where any kind of bot was detected.
         *       `good` - events where a good bot was detected.
         *       `bad` - events where a bad bot was detected.
         *       `none` - events where no bot was detected.
         *     > Note: When using this parameter, only events with the `bot` property set to a valid value are returned. Events without a `bot` Smart Signal result are left out of the response.
         *      */
        bot?: components['schemas']['SearchEventsBot']
        /** @description Filter events by IP address or IP range (if CIDR notation is used). If CIDR notation is not used, a /32 for IPv4 or /128 for IPv6 is assumed.
         *     Examples of range based queries: 10.0.0.0/24, 192.168.0.1/32
         *      */
        ip_address?: string
        /** @description Filter events by the ASN associated with the event's IP address.
         *     This corresponds to the `ip_info.(v4|v6).asn` property in the response.
         *      */
        asn?: string
        /** @description Filter events by your custom identifier.
         *
         *     You can use [linked Ids](https://docs.fingerprint.com/reference/js-agent-v4-get-function#linkedid) to associate identification requests with your own identifier, for example, session Id, purchase Id, or transaction Id. You can then use this `linked_id` parameter to retrieve all events associated with your custom identifier.
         *      */
        linked_id?: string
        /** @description Filter events by the URL (`url` property) associated with the event.
         *      */
        url?: string
        /** @description Filter events by the Bundle ID (iOS) associated with the event.
         *      */
        bundle_id?: string
        /** @description Filter events by the Package Name (Android) associated with the event.
         *      */
        package_name?: string
        /** @description Filter events by the origin field of the event. This is applicable to web events only (e.g., https://example.com)
         *      */
        origin?: string
        /** @description Include events that happened after this point (with timestamp greater than or equal the provided `start` Unix milliseconds value). Defaults to 7 days ago. Setting `start` does not change `end`'s default of `now` — adjust it separately if needed.
         *      */
        start?: number
        /** @description Include events that happened before this point (with timestamp less than or equal the provided `end` Unix milliseconds value). Defaults to now. Setting `end` does not change `start`'s default of `7 days ago` — adjust it separately if needed.
         *      */
        end?: number
        /** @description When `true`, sort events oldest first (ascending timestamp order). Default is newest first (descending timestamp order).
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
        /** @description Filter events with Suspect Score result above a provided minimum threshold.
         *     > Note: When using this parameter, only events where the `suspect_score` property set to a value exceeding your threshold are returned. Events without a `suspect_score` Smart Signal result are left out of the response.
         *      */
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
         *      */
        rare_device?: boolean
        /** @description Filter events by Device Rarity percentile bucket.
         *     `<p95` - device configuration is in the bottom 95% (most common).
         *     `p95-p99` - device is in the 95th to 99th percentile.
         *     `p99-p99.5` - device is in the 99th to 99.5th percentile.
         *     `p99.5-p99.9` - device is in the 99.5th to 99.9th percentile.
         *     `p99.9+` - device is in the top 0.1% (rarest).
         *     `not_seen` - device configuration has never been observed before.
         *      */
        rare_device_percentile_bucket?: components['schemas']['SearchEventsRareDevicePercentileBucket']
        /** @description Filter events by Proxy detection result.
         *     > Note: When using this parameter, only events with the `proxy` property set to `true` or `false` are returned. Events without a `proxy` Smart Signal result are left out of the response.
         *      */
        proxy?: boolean
        /** @description Filter events by a specific SDK version associated with the identification event (`sdk.version` property). Example: `3.11.14`
         *      */
        sdk_version?: string
        /** @description Filter events by the SDK Platform associated with the identification event (`sdk.platform` property) .
         *     `js` - Javascript agent (Web).
         *     `ios` - Apple iOS based devices.
         *     `android` - Android based devices.
         *      */
        sdk_platform?: components['schemas']['SearchEventsSdkPlatform']
        /** @description Filter for events by providing one or more environment IDs (`environment_id` property).
         *
         *     ### Array syntax
         *     To provide multiple environment IDs, use the repeated keys syntax (`environment=env1&environment=env2`).
         *     Other notations like comma-separated (`environment=env1,env2`) or bracket notation (`environment[]=env1&environment[]=env2`) are not supported.
         *      */
        environment?: string[]
        /** @description Filter events by the most precise Proximity ID provided by default.
         *     > Note: When using this parameter, only events with the `proximity.id` property matching the provided ID are returned. Events without a `proximity` result are left out of the response.
         *      */
        proximity_id?: string
        /** @description When set, the response will include a `total_hits` property with a count of total query matches across all pages, up to the specified limit.
         *      */
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
        /** @description The [visitor ID](https://docs.fingerprint.com/reference/js-agent-v4-get-function#visitor_id) you want to delete. */
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
