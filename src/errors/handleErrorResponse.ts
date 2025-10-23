import { ErrorResponse } from '../types'

export function isErrorResponse(value: unknown): value is ErrorResponse {
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
