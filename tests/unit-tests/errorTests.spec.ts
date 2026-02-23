import { ErrorResponse, getRetryAfter, TooManyRequestsError } from '../../src'

function makeResponse(retryAfter?: string): Response {
  const headers = retryAfter != undefined ? { 'retry-after': retryAfter } : ({} as HeadersInit)

  return new Response(null, {
    status: 429,
    headers,
  })
}

describe('getRetryAfter', () => {
  it('parses numeric retry-after', () => {
    const response = makeResponse('120')
    expect(getRetryAfter(response)).toBe(120)
  })

  it('returns 0 if there is no header', () => {
    const response = makeResponse()
    expect(getRetryAfter(response)).toBe(0)
  })

  it('returns 0 if the value is invalid', () => {
    const response = makeResponse('not-a-number')
    expect(getRetryAfter(response)).toBe(0)
  })

  it('returns 0 if the value is empty string', () => {
    const response = makeResponse('')
    expect(getRetryAfter(response)).toBe(0)
  })
})

describe('TooManyRequestsError', () => {
  const body: ErrorResponse = {
    error: {
      message: 'Too Many Requests',
      code: 'too_many_requests',
    },
  }

  it('parses retry-after and includes it in the error', () => {
    const response = makeResponse('60')
    const err = new TooManyRequestsError(body, response)
    expect(err).toBeInstanceOf(TooManyRequestsError)
    expect(err.retryAfter).toBe(60)
  })

  it('use 0 if there is no header', () => {
    const response = makeResponse()
    const err = new TooManyRequestsError(body, response)
    expect(err.retryAfter).toBe(0)
  })

  it('use 0 if the response has invalid value', () => {
    const response = makeResponse('not-a-number')
    const err = new TooManyRequestsError(body, response)
    expect(err.retryAfter).toBe(0)
  })
})
