import { describe, expect, it } from 'vitest'
import { Region, SdkError, SearchEventsFilter } from '../../src'
import { version } from '../../package.json'
import type { paths } from '../../src/generatedApiTypes'
import { getRequestPath } from '../../src/urlUtils'

const visitorId = 'TaDnMBz9XCpZNuSzFUqP'
const eventId = '1626550679751.cVc5Pm'
const ii = `ii=fingerprint-pro-server-node-sdk%2F${version}`

describe('Get Event path', () => {
  it('returns correct path', () => {
    const url = getRequestPath({
      path: '/events/{event_id}',
      method: 'get',
      pathParams: [eventId],
      region: Region.Global,
    })
    const expectedPath = `https://api.fpjs.io/v4/events/${eventId}?${ii}`

    expect(url).toEqual(expectedPath)
  })
})

describe('Get Event Search path', () => {
  const linkedId = 'linkedId'
  const limit = 10
  const end = 1626538505244
  const start = 1626538505241
  const paginationKey = '1683900801733.Ogvu1j'

  it('eu region with linked_id filters', () => {
    const filter: SearchEventsFilter = { linked_id: linkedId }
    const actualPath = getRequestPath({
      path: '/events',
      method: 'get',
      queryParams: filter,
      region: Region.EU,
    })
    const expectedPath = `https://eu.api.fpjs.io/v4/events?linked_id=${linkedId}&${ii}`
    expect(actualPath).toEqual(expectedPath)
  })

  it('eu region with linked_id, limit, start, end filters', () => {
    const filter: SearchEventsFilter = {
      linked_id: linkedId,
      limit,
      start,
      end,
    }
    const actualPath = getRequestPath({
      path: '/events',
      method: 'get',
      queryParams: filter,
      region: Region.EU,
    })
    const expectedPath = `https://eu.api.fpjs.io/v4/events?linked_id=${linkedId}&limit=${String(limit)}&start=${String(start)}&end=${String(end)}&${ii}`
    expect(actualPath).toEqual(expectedPath)
  })

  it('eu region with linked_id, limit, paginationKey filters', () => {
    const filter: SearchEventsFilter = {
      linked_id: linkedId,
      limit,
      pagination_key: paginationKey,
    }
    const actualPath = getRequestPath({
      path: '/events',
      method: 'get',
      queryParams: filter,
      region: Region.EU,
    })
    const expectedPath = `https://eu.api.fpjs.io/v4/events?linked_id=${linkedId}&limit=${String(limit)}&pagination_key=${paginationKey}&${ii}`
    expect(actualPath).toEqual(expectedPath)
  })

  it('global region without filter', () => {
    const actualPath = getRequestPath({
      path: '/events',
      method: 'get',
      region: Region.Global,
    })
    const expectedPath = `https://api.fpjs.io/v4/events?${ii}`
    expect(actualPath).toEqual(expectedPath)
  })

  it('global region with linked_id filters', () => {
    const filter: SearchEventsFilter = { linked_id: linkedId }
    const actualPath = getRequestPath({
      path: '/events',
      method: 'get',
      queryParams: filter,
      region: Region.Global,
    })
    const expectedPath = `https://api.fpjs.io/v4/events?linked_id=${linkedId}&${ii}`
    expect(actualPath).toEqual(expectedPath)
  })

  it('global region with linked_id, limit, paginationKey filters', () => {
    const filter: SearchEventsFilter = {
      linked_id: linkedId,
      limit,
      pagination_key: paginationKey,
    }
    const actualPath = getRequestPath({
      path: '/events',
      method: 'get',
      region: Region.Global,
      queryParams: filter,
    })
    const expectedPath = `https://api.fpjs.io/v4/events?linked_id=${linkedId}&limit=${String(limit)}&pagination_key=${paginationKey}&${ii}`
    expect(actualPath).toEqual(expectedPath)
  })
})

describe('Delete visitor path', () => {
  it('eu region', () => {
    const actualPath = getRequestPath({
      path: '/visitors/{visitor_id}',
      method: 'delete',
      pathParams: [visitorId],
      region: Region.EU,
    })
    const expectedPath = `https://eu.api.fpjs.io/v4/visitors/TaDnMBz9XCpZNuSzFUqP?${ii}`
    expect(actualPath).toEqual(expectedPath)
  })

  it('ap region', () => {
    const actualPath = getRequestPath({
      path: '/visitors/{visitor_id}',
      method: 'delete',
      pathParams: [visitorId],
      region: Region.AP,
    })
    const expectedPath = `https://ap.api.fpjs.io/v4/visitors/TaDnMBz9XCpZNuSzFUqP?${ii}`
    expect(actualPath).toEqual(expectedPath)
  })

  it('global region', () => {
    const actualPath = getRequestPath({
      path: '/visitors/{visitor_id}',
      method: 'delete',
      pathParams: [visitorId],
      region: Region.Global,
    })
    const expectedPath = `https://api.fpjs.io/v4/visitors/TaDnMBz9XCpZNuSzFUqP?${ii}`
    expect(actualPath).toEqual(expectedPath)
  })
})

describe('getRequestPath', () => {
  it('serializes string[] and skips null and undefined', () => {
    const actual = getRequestPath({
      path: '/events',
      method: 'get',
      region: Region.Global,
      queryParams: {
        environment: ['a', null as unknown as string, 'b', undefined as unknown as string],
        linked_id: null as unknown as string,
        limit: undefined,
      },
    })

    const expected = `https://api.fpjs.io/v4/events?environment=a&environment=b&${ii}`
    expect(actual).toEqual(expected)
  })

  it('throws error on unsupported region', () => {
    expect(() => {
      getRequestPath({
        path: '/events',
        method: 'get',
        region: 'unknown' as Region,
      })
    }).toThrow(new SdkError('Unsupported region'))
  })

  it('throws error when required path param is missing', () => {
    expect(() => {
      getRequestPath({
        path: '/events/{event_id}',
        method: 'get',
        pathParams: [],
      })
    }).toThrow(new SdkError('eventId is not set'))
  })

  it('disallows normalized path segments', () => {
    expect(() => {
      getRequestPath({
        path: '/visitors/../events' as keyof paths,
        method: 'get',
        pathParams: [],
      })
    }).toThrow(new SdkError('Invalid path: path changed during normalization'))
  })

  it('encodes special characters', () => {
    const actual = getRequestPath({
      path: '/events',
      method: 'get',
      queryParams: {
        linked_id: 'a b+c%d',
      },
    })

    const expected = `https://api.fpjs.io/v4/events?linked_id=a+b%2Bc%25d&${ii}`
    expect(actual).toEqual(expected)
  })
})

// Encoding does not depend on which parameter is being replaced, so these run against one
// path. That every operation routes through it is covered by the mocked-response tests.
describe('path parameter encoding', () => {
  const eventPath = (param: unknown) =>
    getRequestPath({
      path: '/events/{event_id}',
      method: 'get',
      pathParams: [param] as string[],
      region: Region.Global,
    })

  it.each([
    ['../events', '..%2Fevents'],
    ['../', '..%2F'],
    ['/../../events', '%2F..%2F..%2Fevents'],
    ['evil.com', 'evil.com'],
    ['//evil.com', '%2F%2Fevil.com'],
    ['https://evil.com', 'https%3A%2F%2Fevil.com'],
    ['a b#c?d', 'a%20b%23c%3Fd'],
    ['%2e%2e', '%252e%252e'],
    ['..%2fevents', '..%252fevents'],
    ['..\\..', '..%5C..'],
    ['$&', '%24%26'],
    ['...', '...'],
    // A placeholder in a parameter must not reach the next replacement, which would matter
    // for a path with two placeholders.
    ['{event_id}', '%7Bevent_id%7D'],
    ['1626550679751.cVc5Pm', '1626550679751.cVc5Pm'],
    // An untyped caller can pass something that is not a string but stringifies to one.
    [new String('../events'), '..%2Fevents'],
  ])('keeps %j inside a single path segment', (param, encoded) => {
    expect(eventPath(param)).toEqual(`https://api.fpjs.io/v4/events/${encoded}?${ii}`)
  })

  it.each([
    ['.', '.', 'eventId is not valid: .'],
    ['..', '..', 'eventId is not valid: ..'],
    ['a String object', new String('..'), 'eventId is not valid: ..'],
    ['an object with a toString', { toString: () => '..' }, 'eventId is not valid: ..'],
    ['an array', ['..'], 'eventId is not valid: ..'],
    // A lone surrogate makes `encodeURIComponent` throw a `URIError`
    ['a lone surrogate', '\ud800', 'eventId is not valid'],
    // These have no primitive representation, so `String` itself throws
    ['an object without a prototype', Object.create(null), 'eventId is not valid'],
    [
      'an object whose toString throws',
      {
        toString: () => {
          throw new Error('boom')
        },
      },
      'eventId is not valid',
    ],
  ])('rejects %s', (_, param, message) => {
    expect(() => eventPath(param)).toThrow(new SdkError(message))
  })

  it('preserves the cause when string coercion fails', () => {
    const cause = new Error('boom')
    const param = {
      toString: () => {
        throw cause
      },
    }

    expect(() => eventPath(param)).toThrow(
      expect.objectContaining({
        message: 'eventId is not valid',
        cause,
      })
    )
  })

  it.each([
    ['an empty string', ''],
    ['an empty String object', new String('')],
    ['null', null],
    ['undefined', undefined],
  ])('rejects %s as missing', (_, param) => {
    expect(() => eventPath(param)).toThrow(new SdkError('eventId is not set'))
  })
})
