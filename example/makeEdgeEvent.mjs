// @ts-check
import { FingerprintServerApiClient, Region, RequestError } from '@fingerprint/node-sdk'
import { config } from 'dotenv'
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

try {
  const event = await client.makeEdgeEvent({
    method: 'GET',
    url: 'https://example.com/login',
    ipv4_address: '34.162.244.71',
    headers: [
      { name: 'Host', value: 'example.com' },
      { name: 'User-Agent', value: 'Mozilla/5.0' },
      { name: 'Authorization', value: '' },
    ],
  })
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
