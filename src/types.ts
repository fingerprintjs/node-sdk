import { components, operations, paths } from './generatedApiTypes'

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

// Extract just the `path` parameters as a tuple of strings
type ExtractPathParamStrings<Path> = Path extends { parameters: { path: infer P } }
  ? P extends Record<string, any>
    ? [P[keyof P]] // We extract the path parameter values as a tuple of strings
    : []
  : []

// Utility type to extract query parameters from an operation and differentiate required/optional
export type ExtractQueryParams<Path> = Path extends { parameters: { query?: infer Q } }
  ? undefined extends Q // Check if Q can be undefined (meaning it's optional)
    ? Q | undefined // If so, it's optional
    : Q // Otherwise, it's required
  : never // If no query parameters, return never

// Utility type to extract request body from an operation (for POST, PUT, etc.)
type ExtractRequestBody<Path> = Path extends { requestBody: { content: { 'application/json': infer B } } } ? B : never

// Utility type to extract the response type for 200 status code
type ExtractResponse<Path> = Path extends { responses: { 200: { content: { 'application/json': infer R } } } }
  ? R
  : void

// Extracts args to given API method
type ApiMethodArgs<Path extends keyof operations> = [
  // If method has body, extract it as first parameter
  ...(ExtractRequestBody<operations[Path]> extends never ? [] : [body: ExtractRequestBody<operations[Path]>]),
  // Next are path params, e.g. for path "/events/{event_id}" it will be one string parameter,
  ...ExtractPathParamStrings<operations[Path]>,
  // Last parameter will be the query params, if any
  ...(ExtractQueryParams<operations[Path]> extends never ? [] : [params: ExtractQueryParams<operations[Path]>]),
]

type ApiMethod<Path extends keyof operations> = (
  ...args: ApiMethodArgs<Path>
) => Promise<ExtractResponse<operations[Path]>>

export type FingerprintApi = {
  [Operation in keyof operations]: ApiMethod<Operation>
}
