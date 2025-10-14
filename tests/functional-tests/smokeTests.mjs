import {
  FingerprintJsServerApiClient,
  Region,
  RequestError,
  TooManyRequestsError,
} from '@fingerprint/fingerprint-server-sdk'
import { config } from 'dotenv'
config()

const REGION_MAP = { eu: Region.EU, ap: Region.AP, us: Region.Global }
const region = REGION_MAP[(process.env.REGION ?? 'us').toLowerCase()] ?? Region.Global

function createClient() {
  if (!process.env['API_KEY']) {
    throw new Error('Missing required API_KEY env variable!')
  }

  return new FingerprintJsServerApiClient({ region, apiKey: process.env.API_KEY })
}

async function getRecentEvents(client, start, end) {
  console.log('Retrieving recent 2 events...')
  const recent = await client.searchEvents({ limit: 2, start, end })
  if (!recent?.events?.length) {
    throw new Error('searchEvents returned no recent events')
  }

  const paginationKey = recent.pagination_key
  if (paginationKey) {
    console.log('Retrieving next page...')
    const page2 = await client.searchEvents({ limit: 2, start, end, pagination_key: paginationKey })
    if (!page2?.events?.length) {
      throw new Error('searchEvents page 2 returned no events')
    }
  }

  return recent
}

async function fetchEventAndVisitorDetails(client, firstEvent, start, end) {
  const { event_id: eventId, identification } = firstEvent
  const visitorId = identification.visitor_id
  if (!eventId || !visitorId) {
    throw new Error('Event missing eventId or visitorId')
  }

  console.log(`Retrieving event detail by eventId \`${eventId}\`...`)
  await client.getEvent(eventId)

  console.log(`Retrieving other events for visitorId \`${visitorId}\`...`)
  const visitorEvents = await client.searchEvents({ visitor_id: visitorId, start, end, limit: 2 })
  if (visitorEvents.events.length === 0) {
    throw new Error('Event missing for specific visitorId')
  }
}

async function validateOldestOrder(client, start, end) {
  console.log('Retrieving old 2 events...')
  const old = await client.searchEvents({ limit: 2, start, end, reverse: true })
  if (!old?.events || old.events.length < 2) {
    throw new Error('searchEvents returned less than 2 events')
  }

  const [a, b] = old.events
  const ts1 = a?.timestamp
  const ts2 = b?.timestamp
  if (typeof ts1 !== 'number' || typeof ts2 !== 'number') {
    throw new Error('Old events missing timestamp')
  }

  if (ts1 > ts2) {
    throw new Error(`Oldest event timestamp is bigger than second oldest event: ${ts1} > ${ts2}`)
  }
}

async function main() {
  try {
    const client = createClient()
    const end = Date.now()
    const start = end - 90 * 24 * 60 * 60 * 1000

    const recent = await getRecentEvents(client, start, end)
    const [firstEvent] = recent.events
    await fetchEventAndVisitorDetails(client, firstEvent, start, end)

    await validateOldestOrder(client, start, end)

    console.log('All tests passed')
    return 0
  } catch (error) {
    if (error instanceof TooManyRequestsError) {
      console.error(`[TooManyRequestsError]: Rate limited. Retry after: ${error.retryAfter}s`)
      return 1
    }

    if (error instanceof RequestError) {
      console.error(`[RequestError] ${error.statusCode}: ${error.message}`)
      if (error.response) {
        console.error(`[RequestError] ${error.response.statusText}`)
      }
      return 1
    }

    console.error(error?.stack ?? error)
    return 1
  }
}

process.exitCode = await main()
