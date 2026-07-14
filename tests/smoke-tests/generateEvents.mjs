// @ts-check
// Generation harness: drives a real headless browser identification (like
// dx-team-orchestra's runIdentification_v4) to produce real Fingerprint events,
// then writes them out as the Contract-2 JSON consumed by runExamples.mjs.
import { chromium, devices } from '@playwright/test'
import { config } from 'dotenv'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Fake origin the identification page is served at, so the browser doesn't treat
// it as an opaque `file://` origin (same trick dx-team-orchestra uses).
const ORIGIN = 'https://smoke.test'
const HTML_FILE = 'identification.html'

const MATRIX_SIZE = Number.parseInt(process.env.MATRIX_SIZE ?? '7', 10)
const GENERATED_EVENTS_FILE = process.env.GENERATED_EVENTS_FILE ?? './generated-events.json'
// Events need a bit of time on the backend before they're queryable/mutable via
// the Server API; dx-team-orchestra waits ~5-12s after generation.
const POST_GENERATION_DELAY_MS = Number.parseInt(process.env.POST_GENERATION_DELAY_MS ?? '12000', 10)

function normalizeRegion(region) {
  const value = String(region ?? 'us').toLowerCase()
  return value === 'eu' || value === 'ap' ? value : 'us'
}

/**
 * Reads the single-subscription config from env vars. Browser identification only
 * needs the PUBLIC key — the secret/private key is never used here, so it is not
 * required by (or exposed to) this generation step.
 */
function loadSubscriptions() {
  const publicKey = process.env.PUBLIC_KEY
  if (!publicKey) {
    throw new Error('Set PUBLIC_KEY (+ REGION) env vars')
  }

  // Only the sealed PUBLIC key is needed to produce a sealed result here. The
  // decryption key (ENCRYPTION_KEY) is intentionally NOT read in this job so the
  // secret is never exposed to it; runExamples detects partial config instead.
  return [
    {
      name: 'default',
      region: normalizeRegion(process.env.REGION),
      publicKey,
      sealedPublicKey: process.env.SEALED_PUBLIC_KEY || undefined,
    },
  ]
}

function getRandomDevice() {
  const values = Object.values(devices)
  return values[Math.floor(Math.random() * values.length)]
}

function randomId() {
  return Math.random().toString(36).slice(2)
}

async function loadTemplates() {
  const htmlTemplate = await readFile(path.join(__dirname, HTML_FILE), 'utf-8')
  return { htmlTemplate }
}

/**
 * Runs a single browser identification against the given public API key/region.
 * A fresh context (with a random device, unless one is given) is used per call so
 * that distinct calls produce distinct visitors, mirroring orchestra's `identify`.
 */
async function identify(browser, { htmlTemplate, publicApiKey, region, linkedId, device }) {
  const html = htmlTemplate.replaceAll('{{PUBLIC_API_KEY}}', publicApiKey).replaceAll('{{REGION}}', region)

  const context = await browser.newContext({ ...(device ?? getRandomDevice()), baseURL: ORIGIN })

  try {
    const page = await context.newPage()

    // Serve the HTML at a real origin to avoid opaque-origin SecurityErrors when the
    // agent uses storage/cookies. The agent bundle itself loads from the Fingerprint CDN.
    await context.route(`**/${HTML_FILE}`, (route) =>
      route.fulfill({ status: 200, contentType: 'text/html', body: html })
    )

    await page.goto(`${ORIGIN}/${HTML_FILE}`, { waitUntil: 'load' })
    await page.waitForFunction(() => Boolean(window.FP), null, { timeout: 15_000 })

    const result = await page.evaluate(
      async (options) => {
        const agent = window.FP
        const value = await agent.get(options)
        return {
          event_id: value.event_id,
          visitor_id: value.visitor_id,
          sealed_result: value.sealed_result ? value.sealed_result.base64() : null,
        }
      },
      { linkedId }
    )

    if (!result?.event_id) {
      throw new Error('Failed to identify: no event_id returned')
    }

    return result
  } finally {
    await context.close().catch(() => {})
  }
}

async function generateForSubscription(browser, templates, subscription) {
  const { name, region, publicKey, sealedPublicKey } = subscription

  console.log(`[${name}] generating readOnly identification...`)
  const linkedId = `smoke-${name}-${Date.now()}-${randomId()}`
  const readOnlyResult = await identify(browser, { ...templates, publicApiKey: publicKey, region, linkedId })

  let sealedResult = null
  if (sealedPublicKey) {
    console.log(`[${name}] generating sealed identification...`)
    const sealedRun = await identify(browser, {
      ...templates,
      publicApiKey: sealedPublicKey,
      region,
      linkedId: `${linkedId}-sealed`,
    })
    if (!sealedRun.sealed_result) {
      throw new Error(
        `[${name}] SEALED_PUBLIC_KEY is set but identification returned no sealed_result (is Sealed Results enabled for that key?)`
      )
    }
    sealedResult = sealedRun.sealed_result
  } else {
    console.log(`[${name}] no SEALED_PUBLIC_KEY; skipping sealed identification`)
  }

  // One update event per matrix leg. event_ids are always unique (each get() mints a
  // new one), so no de-duplication is needed.
  console.log(`[${name}] generating ${MATRIX_SIZE} update events...`)
  const destructiveUpdate = []
  for (let i = 0; i < MATRIX_SIZE; i++) {
    const result = await identify(browser, {
      ...templates,
      publicApiKey: publicKey,
      region,
      linkedId: `${linkedId}-update-${i}`,
    })
    destructiveUpdate.push({ eventId: result.event_id })
  }

  // One delete target per matrix leg. Visitor IDs need NOT be distinct: on a single
  // machine Fingerprint often coalesces identifications to the same visitor, and that
  // is harmless here because deleteVisitorData is deferred (post-delete getEvent/search
  // still work within the run) and idempotent (repeat deletes return 200). Verified
  // against the live API.
  console.log(`[${name}] generating ${MATRIX_SIZE} delete targets...`)
  const destructiveDelete = []
  for (let i = 0; i < MATRIX_SIZE; i++) {
    const result = await identify(browser, {
      ...templates,
      publicApiKey: publicKey,
      region,
      linkedId: `${linkedId}-delete-${i}`,
    })
    destructiveDelete.push({ visitorId: result.visitor_id })
  }

  return {
    name,
    region,
    readOnly: {
      eventId: readOnlyResult.event_id,
      visitorId: readOnlyResult.visitor_id,
      linkedId,
      sealedResult,
    },
    destructiveUpdate,
    destructiveDelete,
  }
}

async function main() {
  const subscriptions = loadSubscriptions()
  const templates = await loadTemplates()

  const browser = await chromium.launch()
  try {
    const results = []
    for (const subscription of subscriptions) {
      results.push(await generateForSubscription(browser, templates, subscription))
    }

    console.log(`Waiting ${POST_GENERATION_DELAY_MS}ms for events to become queryable/mutable...`)
    await new Promise((resolve) => {
      setTimeout(resolve, POST_GENERATION_DELAY_MS)
    })

    const output = { subscriptions: results }
    await writeFile(GENERATED_EVENTS_FILE, JSON.stringify(output, null, 2))
    console.log(`Wrote ${results.length} subscription(s) to ${GENERATED_EVENTS_FILE}`)
  } finally {
    await browser.close()
  }
}

await main()
