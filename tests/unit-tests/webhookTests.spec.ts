import { describe, expect, it } from 'vitest'
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
})
