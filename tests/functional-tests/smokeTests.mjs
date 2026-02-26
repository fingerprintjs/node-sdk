import {
  FingerprintServerApiClient,
  Region,
  RequestError,
  TooManyRequestsError,
} from '@fingerprint/fingerprint-server-sdk'
import { config } from 'dotenv'
import assert from "node:assert";
config()

const REGION_MAP = { eu: Region.EU, ap: Region.AP, us: Region.Global }
const region = REGION_MAP[(process.env.REGION ?? 'us').toLowerCase()] ?? Region.Global
const ruleset_id = process.env.RULESET_ID

function createClient() {
  if (!process.env['API_KEY']) {
    throw new Error('Missing required API_KEY env variable!')
  }

  return new FingerprintServerApiClient({ region, apiKey: process.env.API_KEY })
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

async function validateRulesetEvaluationForBlock(client, start, end) {
  console.log('Trying to find event with `incognito = true`...')
  const search = await client.searchEvents({ limit: 1, incognito: true, start, end })

  if (search.events.length === 0) {
    console.warn('No event with `incognito = true`.')
    return
  }

  const event_id = search.events[0].event_id
  const event = await client.getEvent(event_id, { ruleset_id })
  if (!event) {
    throw new Error(`Event details are missing for found incognito event`)
  }

  const expected = {
    ruleset_id,
    rule_id: 'r_PMwGXkWtG20KZn',
    rule_expression: 'incognito',
    type: 'block',
    status_code: 403,
    headers: [ { name: 'Content-Type', value: 'application/json' } ],
    body: '{"message": "Incognito not allowed"}'
  }

  assert.deepStrictEqual(event.rule_action, expected)

  console.log('Ruleset evaluation with `block` works!')
}

async function validateRulesetEvaluationForAllow(client, start, end) {
  console.log('Trying to find event with `incognito = false`...')
  const search = await client.searchEvents({ limit: 1, incognito: false, start, end })

  if (search.events.length === 0) {
    console.warn('No event with `incognito = false`.')
    return
  }

  const event_id = search.events[0].event_id
  const event = await client.getEvent(event_id, { ruleset_id })
  if (!event) {
    throw new Error(`Event details are missing for found non-incognito event`)
  }

  const expected = {
    ruleset_id,
    rule_id: 'r_OPnYaU9dKEke9X',
    rule_expression: 'environment_id != "non-an-environment-id"',
    type: 'allow',
    request_header_modifications: { remove: [], set: [ { name: 'X-Allowed', value: 'true' } ], append: [] }
  }

  assert.deepStrictEqual(event.rule_action, expected)

  console.log('Ruleset evaluation with `allow` works!')
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

    if (ruleset_id) {
      await validateRulesetEvaluationForBlock(client, start, end)
      await validateRulesetEvaluationForAllow(client, start, end)
    }

    console.log('All tests passed')
    return 0
  } catch (error) {
    if (error instanceof TooManyRequestsError) {
      console.error('[TooManyRequestsError]: Rate limited')
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
