import { ErrorResponse } from '../types'
import { RequestError, TooManyRequestsError } from './apiErrors'

function isErrorResponse(value: unknown): value is ErrorResponse {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'error' in value &&
      typeof value.error === 'object' &&
      value.error &&
      'code' in value.error &&
      'message' in value.error
  )
}

export function handleErrorResponse(json: any, response: Response): never {
  if (isErrorResponse(json)) {
    if (response.status === 429) {
      throw new TooManyRequestsError(json, response)
    }

    throw RequestError.fromErrorResponse(json, response)
  }

  throw RequestError.unknown(response)
}
