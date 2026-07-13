import { describe, expect, it } from 'vitest'
import { toError } from '../../src/errors/toError'

describe('toError', () => {
  it('returns Error instances unchanged', () => {
    const error = new Error('test error')
    const result = toError(error)

    expect(result).toBe(error)
    expect(result).toBeInstanceOf(Error)
  })

  it('uses the message from error-like objects', () => {
    const result = toError({ message: 'test error' })

    expect(result).toBeInstanceOf(Error)
    expect(result).toMatchObject({
      message: 'test error',
    })
  })

  it('serializes plain objects without message properties', () => {
    const result = toError({ code: 'test_error' })

    expect(result).toBeInstanceOf(Error)
    expect(result).toMatchObject({
      message: '{"code":"test_error"}',
    })
  })
})
