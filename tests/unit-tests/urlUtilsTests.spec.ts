import { Region, getRequestPath, SearchEventsFilter } from '../../src'
import { version } from '../../package.json'

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

  test('eu region with linked_id filters', async () => {
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

  test('eu region with linked_id, limit, start, end filters', async () => {
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
    const expectedPath = `https://eu.api.fpjs.io/v4/events?linked_id=${linkedId}&limit=${limit}&start=${start}&end=${end}&${ii}`
    expect(actualPath).toEqual(expectedPath)
  })

  test('eu region with linked_id, limit, paginationKey filters', async () => {
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
    const expectedPath = `https://eu.api.fpjs.io/v4/events?linked_id=${linkedId}&limit=${limit}&pagination_key=${paginationKey}&${ii}`
    expect(actualPath).toEqual(expectedPath)
  })

  test('global region without filter', async () => {
    const actualPath = getRequestPath({
      path: '/events',
      method: 'get',
      region: Region.Global,
    })
    const expectedPath = `https://api.fpjs.io/v4/events?${ii}`
    expect(actualPath).toEqual(expectedPath)
  })

  test('global region with linked_id filters', async () => {
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

  test('global region with linked_id, limit, paginationKey filters', async () => {
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
    const expectedPath = `https://api.fpjs.io/v4/events?linked_id=${linkedId}&limit=${limit}&pagination_key=${paginationKey}&${ii}`
    expect(actualPath).toEqual(expectedPath)
  })
})

describe('Delete visitor path', () => {
  test('eu region', async () => {
    const actualPath = getRequestPath({
      path: '/visitors/{visitor_id}',
      method: 'delete',
      pathParams: [visitorId],
      region: Region.EU,
    })
    const expectedPath = `https://eu.api.fpjs.io/v4/visitors/TaDnMBz9XCpZNuSzFUqP?${ii}`
    expect(actualPath).toEqual(expectedPath)
  })

  test('ap region', async () => {
    const actualPath = getRequestPath({
      path: '/visitors/{visitor_id}',
      method: 'delete',
      pathParams: [visitorId],
      region: Region.AP,
    })
    const expectedPath = `https://ap.api.fpjs.io/v4/visitors/TaDnMBz9XCpZNuSzFUqP?${ii}`
    expect(actualPath).toEqual(expectedPath)
  })

  test('global region', async () => {
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

    const expected = `https://api.fpjs.io/v4/events?environment%5B%5D=a&environment%5B%5D=b&${ii}`
    expect(actual).toEqual(expected)
  })

  it('throws error on unsupported region', () => {
    expect(() => {
      getRequestPath({
        path: '/events',
        method: 'get',
        region: 'unknown' as Region,
      })
    }).toThrow('Unsupported region')
  })

  it('throws error when required path param is missing', () => {
    expect(() => {
      getRequestPath({
        path: '/events/{event_id}',
        method: 'get',
        pathParams: [],
      })
    }).toThrow('Missing path parameter for event_id')
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
