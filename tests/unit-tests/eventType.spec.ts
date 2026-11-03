import { describe, expectTypeOf, it } from 'vitest'
import { Event, Webhook } from '../../src'

// Type-level tests: `pnpm typecheck:tests` fails if these stop compiling.
describe('Event type', () => {
  it('requires `source`, since the API always returns it', () => {
    // @ts-expect-error `source` is required on API events
    const event: Event = { event_id: '1708102555327.NLOjmg', timestamp: 1708102555327 }
    void event
  })

  it("narrows on `source === 'edge'`", () => {
    const event = {} as Event

    if (event.source === 'edge') {
      expectTypeOf(event.ip_info).not.toBeUndefined()
      // @ts-expect-error edge events never have Identification
      void event.identification
    } else {
      expectTypeOf(event.source).toEqualTypeOf<'device'>()
    }
  })
})

describe('Webhook type', () => {
  it('accepts a device body stored before `source` was added', () => {
    const legacy: Webhook = { event_id: '1708102555327.NLOjmg', timestamp: 1708102555327 }
    expectTypeOf(legacy).toExtend<Webhook>()
  })

  it("narrows to the edge variant on `source === 'edge'` and to the device variant otherwise", () => {
    const webhook = {} as Webhook

    if (webhook.source === 'edge') {
      expectTypeOf(webhook.ip_info).not.toBeUndefined()
      // @ts-expect-error edge events never have Identification
      void webhook.identification
    } else {
      expectTypeOf(webhook.source).toEqualTypeOf<'device' | undefined>()
      expectTypeOf(webhook.identification?.visitor_id).toEqualTypeOf<string | undefined>()
    }
  })

  it("keeps the edge variant strict once `source` is 'edge'", () => {
    // @ts-expect-error edge events require `ip_info`
    const edge: Webhook = { event_id: 'x', timestamp: 1, source: 'edge' }
    void edge
  })

  it('accepts every API event', () => {
    expectTypeOf<Event>().toExtend<Webhook>()
  })
})
