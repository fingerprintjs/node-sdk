import { ErrorResponse } from '../types'
import { getRetryAfter } from './getRetryAfter'

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

  // API error code
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

  static unknown(response: Response) {
    return new RequestError('Unknown error', undefined, response.status, response.statusText, response)
  }

  static fromErrorResponse(body: ErrorResponse, response: Response) {
    return new RequestError(body.error.message, body, response.status, body.error.code, response)
  }
}

/**
 * Error that indicate that the request was throttled.
 * */
export class TooManyRequestsError extends RequestError<429, ErrorResponse> {
  /**
   * Number of seconds to wait before retrying the request.
   * @remarks
   * The value is parsed from the `Retry-After` header of the response.
   */
  readonly retryAfter: number = 0

  constructor(body: ErrorResponse, response: Response) {
    super(body.error.message, body, 429, body.error.code, response)
    this.retryAfter = getRetryAfter(response)
  }
}
