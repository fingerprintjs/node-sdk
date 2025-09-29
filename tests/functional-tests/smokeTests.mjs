import { FingerprintJsServerApiClient, Region, RequestError, TooManyRequestsError } from '@fingerprintjs/fingerprintjs-pro-server-api'
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

async function fetchEventAndVisitorDetails(client, firstEvent) {
  const identification = firstEvent?.products?.identification?.data
  const { visitorId, requestId } = identification
  if (!requestId || !visitorId) {
    throw new Error('Event missing requestId or visitorId')
  }

  console.log(`Retrieving event detail by requestId \`${requestId}\`...`)
  await client.getEvent(requestId)

  console.log(`Retrieving visitor detail by visitorId \`${visitorId}\`...`)
  await client.getVisits(visitorId, { limit: 10 })
}

async function validateOldestOrder(client, start, end) {
  console.log('Retrieving old 2 events...')
  const old = await client.searchEvents({ limit: 2, start, end, reverse: true })
  if (!old?.events || old.events.length < 2) {
    throw new Error('searchEvents returned less than 2 events')
  }

  const [a, b] = old.events
  const ts1 = a?.products?.identification?.data?.timestamp
  const ts2 = b?.products?.identification?.data?.timestamp
  if (typeof ts1 !== 'number' || typeof ts2 !== 'number') {
    throw new Error('Old events missing identification.data.timestamp')
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
    await fetchEventAndVisitorDetails(client, firstEvent)

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
