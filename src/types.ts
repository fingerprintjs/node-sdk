import { components, paths } from './generatedApiTypes'

export const Region = {
  EU: 'EU',
  AP: 'AP',
  Global: 'Global',
} as const

export type Region = (typeof Region)[keyof typeof Region]

/**
 * Options for FingerprintJS server API client
 */
export interface Options {
  /**
   * Secret API key
   */
  apiKey: string
  /**
   * Region of the FingerprintJS service server
   */
  region?: Region

  /**
   * Optional fetch implementation
   * */
  fetch?: typeof fetch

  /**
   * Optional default headers
   */
  defaultHeaders?: Record<string, string>
}

export type ErrorResponse = components['schemas']['ErrorResponse']

/**
 * Strongly typed union of the possible error codes returned by the Fingerprint Server API.
 */
export type ErrorCode = components['schemas']['ErrorCode']

/**
 * More info: https://dev.fingerprintjs.com/docs/server-api#query-parameters
 */
export type SearchEventsFilter = paths['/events']['get']['parameters']['query']
export type SearchEventsResponse = components['schemas']['EventSearch']

/**
 * More info: https://dev.fingerprint.com/reference/server-api-v4-get-event
 */
export type Event = components['schemas']['Event']

/**
 * Body of a webhook sent by Fingerprint.
 * Same as {@link Event}, except `source` is optional on device events: bodies stored before `source` was added
 * don't have it, and resent webhooks deliver the stored body as-is. Check `source === 'edge'`; anything else is a
 * device event.
 *
 * More info: https://dev.fingerprint.com/reference/posteventwebhook
 */
export type Webhook =
  | (Omit<components['schemas']['EventDevice'], 'source'> & { source?: components['schemas']['EventDevice']['source'] })
  | components['schemas']['EventEdge']

export type GetEventOptions = paths['/events/{event_id}']['get']['parameters']['query']

export type EventUpdate = components['schemas']['EventUpdate']

export type EventRuleAction = components['schemas']['EventRuleAction']

export interface FingerprintApi {
  getEvent(eventId: string, options?: GetEventOptions): Promise<Event>
  updateEvent(eventId: string, body: EventUpdate): Promise<void>
  searchEvents(filter: SearchEventsFilter): Promise<SearchEventsResponse>
  deleteVisitorData(visitorId: string): Promise<void>
}
