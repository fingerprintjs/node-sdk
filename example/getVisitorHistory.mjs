import {
  FingerprintJsServerApiClient,
  Region,
  RequestError,
  TooManyRequestsError,
} from '@fingerprint/fingerprint-server-sdk'
import { config } from 'dotenv'
config()

const apiKey = process.env.API_KEY
const visitorId = process.env.VISITOR_ID
const envRegion = process.env.REGION

if (!visitorId) {
  console.error('Visitor ID not defined')
  process.exit(1)
}

if (!apiKey) {
  console.error('API key not defined')
  process.exit(1)
}

let region = Region.Global
if (envRegion === 'eu') {
  region = Region.EU
} else if (envRegion === 'ap') {
  region = Region.AP
}

const client = new FingerprintJsServerApiClient({ region, apiKey })

try {
  const visitorHistory = await client.searchEvents({ visitor_id: visitorId, limit: 10 })
  console.log(JSON.stringify(visitorHistory, null, 2))
} catch (error) {
  if (error instanceof RequestError) {
    console.log(error.statusCode, error.message)
    if (error instanceof TooManyRequestsError) {
      retryLater(error.retryAfter) // Needs to be implemented on your side
    }
  } else {
    console.error('unknown error: ', error)
  }
  process.exit(1)
}

/**
 * @param {number} delay - How many seconds to wait before retrying
 */
function retryLater(delay) {
  console.log(`Implement your own retry logic here and retry after ${delay} seconds`)
}
