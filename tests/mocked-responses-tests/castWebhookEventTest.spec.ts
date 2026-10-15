import { createHmac } from 'crypto'
import { describe, expect, it } from 'vitest'
import { Webhook, isValidWebhookSignature } from '../../src'
import eventWebhookBody from './mocked-responses-data/webhook/webhook_event.json'

describe('[Mocked body] Cast webhook event', () => {
  it('with sample request body', () => {
    const event = eventWebhookBody as Webhook

    // Assertion just to use the `event` variable. The goal of this test is to assume that Typescript won't throw an error here.
    expect(event).toBeTruthy()
  })

  it('with a body that predates `source`', () => {
    const oldBody: Record<string, unknown> = { ...eventWebhookBody }
    delete oldBody.source
    const data = Buffer.from(JSON.stringify(oldBody))
    const secret = 'secret'
    const header = `v1=${createHmac('sha256', secret).update(data).digest('hex')}`

    expect(isValidWebhookSignature({ header, data, secret })).toEqual(true)

    const event = JSON.parse(data.toString()) as Webhook
    expect(event).not.toHaveProperty('source')
    expect(event.event_id).toEqual(eventWebhookBody.event_id)
  })
})
