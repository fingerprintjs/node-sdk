// @ts-check
import assert from 'node:assert'
import { FingerprintServerApiClient, Region, RequestError } from '@fingerprint/node-sdk'
import { config } from 'dotenv'
config()

const apiKey = process.env.API_KEY
const envRegion = process.env.REGION
const visitorId = process.env.VISITOR_ID
const linkedId = process.env.LINKED_ID

if (!apiKey) {
  console.error('API key not defined')
  process.exit(1)
}

/** @type {Region} */
let region = Region.Global
if (envRegion === 'eu') {
  region = Region.EU
} else if (envRegion === 'ap') {
  region = Region.AP
}

const client = new FingerprintServerApiClient({ region, apiKey })

/** @type {import('@fingerprint/node-sdk').SearchEventsFilter} */
const filter = {
  limit: 10,
  // pagination_key: '<pagination_key>',
  // bot: 'all',
  // visitor_id: 'TaDnMBz9XCpZNuSzFUqP',
  // ip_address: '192.168.0.1/32',
  // linked_id: '<linked_id>',
  // // Unix milliseconds:
  // start: 1620000000000,
  // end: 1630000000000,
  // // RFC3339 timestamps (alternative to Unix ms):
  // // start: '2026-01-01T00:00:00Z',
  // // end: '2026-01-31T23:59:59Z',
  // reverse: true,
  // suspect: false,
}

if (visitorId) {
  filter.visitor_id = visitorId
}

if (linkedId) {
  filter.linked_id = linkedId
}

try {
  const result = await client.searchEvents(filter)
  console.log(JSON.stringify(result, null, 2))
  // Only assert a non-empty result when a filter that should match is provided;
  // with no such filter (plain doc usage), an empty result is legal.
  if (visitorId || linkedId) {
    assert(result.events.length > 0)
  }
} catch (error) {
  if (error instanceof RequestError) {
    console.log(`error ${error.statusCode}: `, error.message)
    // You can also access the raw response
    console.log(error.response.statusText)
    // You can check for specific error codes
    if (error.errorCode === 'too_many_requests') {
      console.log('Too many requests')
    }
  } else {
    console.log('unknown error: ', error)
  }
  process.exit(1)
}
