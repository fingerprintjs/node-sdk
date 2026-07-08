import { ErrorCode, ErrorResponse } from '../types'
import { LooseAutocomplete } from '../typeUtils'

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

export class RequestError<Code extends number = number, Body = unknown> extends SdkError {
  // HTTP Status code
  readonly statusCode: Code

  // Fingerprint Server API error code. Autocompletes to the known `ErrorCode` values, but stays
  // widened to `string` because non–Server-API responses (see `RequestError.unknown`) carry a
  // best-effort placeholder derived from `statusText` that may fall outside the `ErrorCode` union.
  readonly errorCode: LooseAutocomplete<ErrorCode>

  // API error response
  readonly responseBody: Body

  // Raw HTTP response
  override readonly response: Response

  constructor(
    message: string,
    body: Body,
    statusCode: Code,
    errorCode: LooseAutocomplete<ErrorCode>,
    response: Response
  ) {
    super(message, response)
    this.responseBody = body
    this.response = response
    this.errorCode = errorCode
    this.statusCode = statusCode
  }

  static unknown(response: Response) {
    // Non–Server-API responses (e.g. proxy or load balancer errors) carry no structured error
    // code, so `statusText` is used as a best-effort placeholder for now.
    return new RequestError('Unknown error', undefined, response.status, response.statusText, response)
  }

  static fromErrorResponse(body: ErrorResponse, response: Response) {
    return new RequestError(body.error.message, body, response.status, body.error.code, response)
  }
}

/**
 * Error that indicates that the request was throttled.
 */
export class TooManyRequestsError extends RequestError<429, ErrorResponse> {
  constructor(body: ErrorResponse, response: Response) {
    super(body.error.message, body, 429, body.error.code, response)
  }
}
