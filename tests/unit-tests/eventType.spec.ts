import { describe, expectTypeOf, it } from 'vitest'
import { Event, Webhook } from '../../src'

// Type-level tests: `pnpm typecheck:tests` fails if these stop compiling.
describe('Webhook type', () => {
  it('accepts a device body stored before `source` was added', () => {
    const legacy: Webhook = { event_id: '1708102555327.NLOjmg', timestamp: 1708102555327 }
    expectTypeOf(legacy).toExtend<Webhook>()
  })

  it("narrows to the device variant on `source !== 'edge'`", () => {
    const webhook = {} as Webhook

    if (webhook.source !== 'edge') {
      expectTypeOf(webhook.source).toEqualTypeOf<'device' | undefined>()
      expectTypeOf(webhook.identification?.visitor_id).toEqualTypeOf<string | undefined>()
    }
  })

  it('accepts every API event', () => {
    expectTypeOf<Event>().toExtend<Webhook>()
  })
})
