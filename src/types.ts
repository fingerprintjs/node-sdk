import { components, paths } from './generatedApiTypes'

export enum Region {
  EU = 'EU',
  AP = 'AP',
  Global = 'Global',
}

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
  region?: Region | `${Region}`

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
 * More info: https://dev.fingerprintjs.com/docs/server-api#query-parameters
 */
export type SearchEventsFilter = paths['/events']['get']['parameters']['query']
export type SearchEventsResponse = components['schemas']['EventSearch']

/**
 * More info: https://dev.fingerprint.com/reference/server-api-v4-get-event
 */
export type Event = components['schemas']['Event']

export type GetEventOptions = paths['/events/{event_id}']['get']['parameters']['query']

export type EventUpdate = components['schemas']['EventUpdate']

export type EventRuleAction = components['schemas']['EventRuleAction']

export interface FingerprintApi {
  getEvent(eventId: string, options?: GetEventOptions): Promise<Event>
  updateEvent(eventId: string, body: EventUpdate): Promise<void>
  searchEvents(filter: SearchEventsFilter): Promise<SearchEventsResponse>
  deleteVisitorData(visitorId: string): Promise<void>
}
