import { FingerprintJsServerApiClient, Region, RequestError, TooManyRequestsError } from '@fingerprintjs/fingerprintjs-pro-server-api'
import { config } from 'dotenv'
config()

const REGION_MAP = { eu: Region.EU, ap: Region.AP, us: Region.Global }
const region = REGION_MAP[(process.env.REGION ?? 'us').toLowerCase()] ?? Region.Global
const end = Date.now()
const start = end - 90 * 24 * 60 * 60 * 1000

async function main() {
  try {
    if (!process.env['API_KEY']) {
      console.error('Missing required API_KEY env variable!')
      process.exitCode = 1
      return
    }

    const client = new FingerprintJsServerApiClient({ region, apiKey: process.env.API_KEY })

    console.log('Retrieving recent 2 events...')
    const recent = await client.searchEvents({ limit: 2, start, end })
    if (recent.events.length === 0) {
      console.warn('searchEvents returned no recent events')
      process.exitCode = 1
      return
    }

    const [firstEvent] = recent.events
    const { visitorId, requestId } = firstEvent.products.identification.data
    if (firstEvent.pagination_key) {
      console.log('Retrieving next page...')
      const recentPage2 = await client.searchEvents({
        limit: 2,
        start,
        end,
        pagination_key: firstEvent.pagination_key,
      })
      if (recentPage2.events.length === 0) {
        console.warn('searchEvents page 2 returned no events')
        process.exitCode = 1
        return
      }
    }

    console.log('Retrieving event detail by requestId...')
    await client.getEvent(requestId)
    console.log('Retrieving visitor detail by visitorId...')
    await client.getVisits(visitorId, { limit: 10 })

    console.log('Retrieving old 2 events...')
    const old = await client.searchEvents({ limit: 2, start, end, reverse: true })
    if (old.events.length === 0) {
      console.warn('searchEvents returned no old events')
      process.exitCode = 1
      return
    }

    const [oldestEvent] = old.events
    const { visitorId: oldVisitorId, requestId: oldRequestId } = oldestEvent.products.identification.data

    if (requestId === oldRequestId) {
      console.error('Oldest event requestId is identical to the newest one')
      process.exitCode = 1
      return
    }

    console.log('Retrieving oldest event detail by requestId...')
    await client.getEvent(oldRequestId)
    console.log('Retrieving oldest visitor detail by visitorId...')
    await client.getVisits(oldVisitorId)

    console.log('All checks passed')
  } catch (error) {
    process.exitCode = 1
    if (error instanceof TooManyRequestsError) {
      console.error(`[TooManyRequestsError]: Rate limited. Retry after: ${error.retryAfter}s`)
      return
    }

    if (error instanceof RequestError) {
      console.error(`[RequestError] ${error.statusCode}: ${error.message}`)
      if (error.response) {
        console.error(`[RequestError] ${error.response.statusText}`)
      }
      return
    }

    throw error
  }
}

await main()
