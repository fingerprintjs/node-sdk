// @ts-check
// Retired from the old smokeTests.mjs: a couple of live-API behaviors that aren't
// worth turning into documented examples (they'd bloat the docs, and mocked-response
// unit tests already cover response parsing) but are still worth a real smoke check:
// pagination_key advancing to a new page, and `reverse: true` returning oldest-first.
// Run by runExamples.mjs, not spawned as one of the documented example scripts.
import { FingerprintServerApiClient, Region, RequestError } from '@fingerprint/node-sdk'
import { config } from 'dotenv'
import assert from 'node:assert'
config()

const apiKey = process.env.API_KEY
const envRegion = process.env.REGION

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

// Search across a wide window so the check sees the whole environment's history,
// not just a narrow recent slice. The API rejects start times older than 90 days.
const end = Date.now()
const start = end - 89 * 24 * 60 * 60 * 1000

try {
  console.log('Checking pagination_key advances to a new page...')
  const page1 = await client.searchEvents({ limit: 2, start, end })
  assert(page1.events.length > 0, 'first page returned no events')

  // Generation guarantees enough events for pagination to have a second page;
  // a missing pagination_key here indicates a real failure, not something to skip.
  assert(page1.pagination_key, 'expected a pagination_key (not enough events generated to cover pagination)')
  const page2 = await client.searchEvents({ limit: 2, start, end, pagination_key: page1.pagination_key })
  assert(page2.events.length > 0, 'second page returned no events')
  assert.notStrictEqual(page2.pagination_key, page1.pagination_key, 'pagination_key did not advance')

  console.log('Checking `reverse: true` returns oldest-first...')
  const oldest = await client.searchEvents({ limit: 2, start, end, reverse: true })

  // Generation guarantees at least 2 events; fewer than 2 here indicates a real
  // failure, not something to skip.
  assert(oldest.events.length >= 2, 'expected at least 2 events (not enough events generated to cover ordering)')
  const [first, second] = oldest.events
  assert(
    typeof first.timestamp === 'number' && typeof second.timestamp === 'number',
    'events are missing a numeric timestamp'
  )
  assert(first.timestamp <= second.timestamp, 'reverse: true did not return events oldest-first')

  console.log('Behavior checks passed')
} catch (error) {
  if (error instanceof RequestError) {
    console.log(`error ${error.statusCode}: `, error.message)
  } else {
    console.log('unknown error: ', error)
  }
  process.exit(1)
}
