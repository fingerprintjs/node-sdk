import { ErrorCode, ErrorResponse } from '../types'

/**
 * Base class for all errors thrown by the SDK.
 */
export class SdkError extends Error {
  constructor(
    message: string,
    readonly response?: Response,
    cause?: Error
  ) {
    super(message, { cause })
    this.name = this.constructor.name
  }
}

/**
 * Error thrown when an HTTP request to the Fingerprint Server API fails.
 *
 * This is the base class for request-level errors. It is thrown directly when
 * the server responds with an error that does not match the Server API error
 * response shape (for example, an error returned by an intermediate proxy or
 * load balancer).
 *
 * When the response is a structured Server API error, a {@link ServerApiError}
 * (or one of its subclasses, such as {@link TooManyRequestsError}) is thrown
 * instead. Those errors narrow {@link errorCode} to the strongly typed
 * {@link ServerApiError.errorCode}.
 */
export class RequestError<Code extends number = number, Body = unknown> extends SdkError {
  // HTTP Status code
  readonly statusCode: Code

  // Best-effort error code. On a plain `RequestError` (non–Server-API responses; see
  // `RequestError.unknown`) this is a placeholder derived from `statusText`, so it is typed as a
  // free-form `string`. `ServerApiError` narrows it to the strongly typed `ErrorCode`.
  readonly errorCode: string

  // API error response
  readonly responseBody: Body

  // Raw HTTP response
  override readonly response: Response

  constructor(message: string, body: Body, statusCode: Code, errorCode: string, response: Response) {
    super(message, response)
    this.responseBody = body
    this.response = response
    this.errorCode = errorCode
    this.statusCode = statusCode
  }

  static unknown(response: Response, body?: unknown) {
    // Non–Server-API responses (e.g. proxy or load balancer errors) carry no structured error
    // code, so `statusText` is used as a best-effort placeholder.
    return new RequestError('Unknown error', body, response.status, response.statusText, response)
  }
}

/**
 * Error thrown when the Fingerprint Server API returns a structured error
 * response. In addition to the {@link RequestError} properties, it exposes a
 * strongly typed {@link errorCode} describing the reason for the failure.
 */
export class ServerApiError<Code extends number = number> extends RequestError<Code, ErrorResponse> {
  // Narrow the inherited `errorCode` to the strongly typed Server API union. The value is set by
  // the `RequestError` constructor; `declare` only refines its type (no runtime field is emitted).
  declare readonly errorCode: ErrorCode

  constructor(body: ErrorResponse, statusCode: Code, response: Response) {
    super(body.error.message, body, statusCode, body.error.code, response)
  }

  static fromErrorResponse(body: ErrorResponse, response: Response) {
    return new ServerApiError(body, response.status, response)
  }
}

/**
 * Error that indicates that the request was throttled.
 */
export class TooManyRequestsError extends ServerApiError<429> {
  constructor(body: ErrorResponse, response: Response) {
    super(body, 429, response)
  }
}
