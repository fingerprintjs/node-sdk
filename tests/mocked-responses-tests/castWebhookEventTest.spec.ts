import { describe, expect, it } from 'vitest'
import { Event } from '../../src'
import eventWebhookBody from './mocked-responses-data/webhook/webhook_event.json'

describe('[Mocked body] Cast webhook event', () => {
  it('with sample request body', () => {
    // SPIKE INTER-2457 — THIS TEST FAILS TYPESCRIPT.
    // webhook_event.json has no `source`, so it is not assignable to EventDevice | EventEdge.
    const event = eventWebhookBody as Event

    // Assertion just to use the `event` variable. The goal of this test is to assume that Typescript won't throw an error here.
    expect(event).toBeTruthy()
  })
})
