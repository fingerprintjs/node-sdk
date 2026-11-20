import crypto from 'crypto'
import { describe, expect, it, vi } from 'vitest'
import { isValidWebhookSignature } from '../../src'

const secret = 'secret'
const data = Buffer.from('data')

const validHeader = 'v1=1b2c16b75bd2a870c114153ccda5bcfca63314bc722fa160d690de133ccbb9db'

describe('Is valid webhook signature', () => {
  it('with valid signature', () => {
    expect(isValidWebhookSignature({ header: validHeader, data: data, secret: secret })).toEqual(true)
  })

  it('with invalid header', () => {
    expect(isValidWebhookSignature({ header: 'v2=invalid', data: data, secret: secret })).toEqual(false)
  })

  it('with header without version', () => {
    expect(isValidWebhookSignature({ header: 'invalid', data: data, secret: secret })).toEqual(false)
  })

  it('with empty header', () => {
    expect(isValidWebhookSignature({ header: '', data: data, secret: secret })).toEqual(false)
  })

  it('with empty secret', () => {
    expect(isValidWebhookSignature({ header: validHeader, data: data, secret: '' })).toEqual(false)
  })

  it('with empty data', () => {
    expect(isValidWebhookSignature({ header: validHeader, data: Buffer.from(''), secret: secret })).toEqual(false)
  })

  it('with valid signature after an invalid v1 signature', () => {
    const header = `v1=invalid,${validHeader}`
    expect(isValidWebhookSignature({ header, data, secret })).toEqual(true)
  })

  it('with truncated signature', () => {
    const header = validHeader.slice(0, -1)
    expect(isValidWebhookSignature({ header, data, secret })).toEqual(false)
  })

  it('with wrong signature of the same length, compared in constant time', () => {
    const timingSafeEqual = vi.spyOn(crypto, 'timingSafeEqual')
    const header = `v1=${'0'.repeat(64)}`
    expect(isValidWebhookSignature({ header, data, secret })).toEqual(false)
    expect(timingSafeEqual).toHaveBeenCalledOnce()
    timingSafeEqual.mockRestore()
  })

  it('with v1 entry without a signature', () => {
    expect(isValidWebhookSignature({ header: 'v1', data, secret })).toEqual(false)
  })

  it('with multibyte signature of the same string length', () => {
    const header = `v1=${'é'.repeat(64)}`
    expect(isValidWebhookSignature({ header, data, secret })).toEqual(false)
  })
})
