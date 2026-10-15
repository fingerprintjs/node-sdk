import { describe, expectTypeOf, it } from 'vitest'
import { Event } from '../../src'

// Type-level tests: `pnpm typecheck:tests` fails if these stop compiling.
describe('Event type', () => {
  it('accepts a legacy device event without `source`', () => {
    const legacy: Event = { event_id: '1708102555327.NLOjmg', timestamp: 1708102555327 }
    expectTypeOf(legacy).toExtend<Event>()
  })

  it("narrows to the edge variant on `source === 'edge'` and to the device variant otherwise", () => {
    const event = {} as Event

    if (event.source === 'edge') {
      expectTypeOf(event.ip_info).not.toBeUndefined()
      // @ts-expect-error edge events never have Identification
      void event.identification
    } else {
      expectTypeOf(event.source).toEqualTypeOf<'device' | undefined>()
      expectTypeOf(event.identification?.visitor_id).toEqualTypeOf<string | undefined>()
    }
  })

  it("keeps the edge variant strict once `source` is 'edge'", () => {
    // @ts-expect-error edge events require `ip_info`
    const edge: Event = { event_id: 'x', timestamp: 1, source: 'edge' }
    void edge
  })
})
