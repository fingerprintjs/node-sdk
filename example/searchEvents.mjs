import { FingerprintServerApiClient, Region, RequestError } from '@fingerprint/fingerprint-server-sdk'
import { config } from 'dotenv'
config()

const apiKey = process.env.API_KEY
const envRegion = process.env.REGION

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

const client = new FingerprintServerApiClient({ region, apiKey })

const filter = {
  limit: 10,
  // pagination_key: '<pagination_key>',
  // bot: 'all',
  // visitor_id: 'TaDnMBz9XCpZNuSzFUqP',
  // ip_address: '192.168.0.1/32',
  // linked_id: '<linked_id>',
  //start: 1620000000000,
  //end: 1630000000000,
  //reverse: true,
  //suspect: false,
}

try {
  const event = await client.searchEvents(filter)
  console.log(JSON.stringify(event, null, 2))
} catch (error) {
  if (error instanceof RequestError) {
    console.log(`error ${error.statusCode}: `, error.message)
    // You can also access the raw response
    console.log(error.response.statusText)
  } else {
    console.log('unknown error: ', error)
  }
  process.exit(1)
}
