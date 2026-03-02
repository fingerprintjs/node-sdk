import { FingerprintServerApiClient, RequestError, Region } from '@fingerprint/node-sdk'
import { config } from 'dotenv'

config()

const apiKey = process.env.API_KEY
const eventId = process.env.EVENT_ID
const envRegion = process.env.REGION

if (!eventId) {
  console.error('Event ID not defined')
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

const client = new FingerprintServerApiClient({ region, apiKey })

try {
  await client.updateEvent(eventId, {
      tags: {
        key: 'value',
      },
      linked_id: 'new_linked_id',
      suspect: false,
  })

  console.log('Event updated')
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
