import { Event } from '../../src'
import eventWebhookBody from './mocked-responses-data/webhook/webhook_event.json'

describe('[Mocked body] Cast webhook event', () => {
  test('with sample request body', async () => {
    const event = eventWebhookBody as Event

    // Assertion just to use the `event` variable. The goal of this test is to assume that Typescript won't throw an error here.
    expect(event).toBeTruthy()
  })
})
