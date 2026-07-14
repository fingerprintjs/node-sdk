// @ts-check
// Orchestrator: runs the example/*.mjs scripts against the events produced by
// generateEvents.mjs (Contract 2), one leg of the Node version matrix at a time
// (Contract 3). Examples are spawned as child processes so each one exercises the
// exact same entry point a real user would run.
import { randomBytes } from 'node:crypto'
import { spawn } from 'node:child_process'
import { config } from 'dotenv'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const EXAMPLE_DIR = path.resolve(__dirname, '../../example')

const GENERATED_EVENTS_FILE = process.env.GENERATED_EVENTS_FILE ?? './generated-events.json'
const LEG_INDEX = Number.parseInt(process.env.LEG_INDEX ?? '0', 10)

// generated-events.json intentionally carries no secrets (see generateEvents.mjs);
// the private key/region/encryption key used by the examples come from the
// environment instead, and must match whatever subscription the `generate` job
// actually used.
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY

// The webhook self-test signs+verifies with its own secret, so it's self-contained
// and must always run (never silently skipped). Fall back to a random test-only
// secret when WEBHOOK_SIGNATURE_SECRET isn't provided.
let WEBHOOK_SIGNATURE_SECRET = process.env.WEBHOOK_SIGNATURE_SECRET
if (!WEBHOOK_SIGNATURE_SECRET) {
  WEBHOOK_SIGNATURE_SECRET = randomBytes(32).toString('hex')
  console.log('WEBHOOK_SIGNATURE_SECRET not set; generated a random test-only secret for the self-test')
}

const UPDATE_EVENT_MAX_RETRIES = 12
const UPDATE_EVENT_RETRY_DELAY_MS = 5000

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

/**
 * Runs `example/<name>` as a child process with the given extra env vars merged
 * on top of the current environment, capturing (and forwarding) its output.
 */
function runExample(name, extraEnv, dir = EXAMPLE_DIR) {
  return new Promise((resolve) => {
    const scriptPath = path.join(dir, name)
    const child = spawn(process.execPath, [scriptPath], {
      env: { ...process.env, ...extraEnv },
      stdio: ['ignore', 'pipe', 'pipe'],
    })

    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (chunk) => {
      stdout += chunk
      process.stdout.write(`[${name}] ${chunk}`)
    })
    child.stderr.on('data', (chunk) => {
      stderr += chunk
      process.stderr.write(`[${name}] ${chunk}`)
    })

    child.on('close', (code) => resolve({ code, stdout, stderr }))
  })
}

/**
 * updateEvent.mjs may fail with a 409 `state_not_ready` if the event is too fresh.
 * Retry a bounded number of times, mirroring dx-team-orchestra's ~12s wait.
 */
async function runUpdateEventWithRetry(extraEnv) {
  let last
  for (let attempt = 1; attempt <= UPDATE_EVENT_MAX_RETRIES; attempt++) {
    last = await runExample('updateEvent.mjs', extraEnv)
    if (last.code === 0) {
      return last
    }

    const isStateNotReady = /\b409\b/.test(last.stdout) || /state_not_ready/i.test(last.stdout)
    if (!isStateNotReady || attempt === UPDATE_EVENT_MAX_RETRIES) {
      return last
    }

    console.log(
      `[updateEvent.mjs] event not ready yet (attempt ${attempt}/${UPDATE_EVENT_MAX_RETRIES}); retrying in ${UPDATE_EVENT_RETRY_DELAY_MS}ms...`
    )
    await sleep(UPDATE_EVENT_RETRY_DELAY_MS)
  }
  return last
}

async function runSubscription(subscription, failures) {
  const { name, region: subscriptionRegion, readOnly, destructiveUpdate, destructiveDelete } = subscription
  // The example scripts only recognize lowercase 'eu'/'ap' (else US), so normalize —
  // otherwise REGION=EU would generate EU events but query the US endpoint.
  const region = (process.env.REGION ?? subscriptionRegion ?? '').toLowerCase()
  const baseEnv = { API_KEY: PRIVATE_KEY, REGION: region }

  console.log(`[${name}] getEvent.mjs (read-only)`)
  const getEventResult = await runExample('getEvent.mjs', { ...baseEnv, EVENT_ID: readOnly.eventId })
  if (getEventResult.code !== 0) {
    failures.push(`[${name}] getEvent.mjs exited with code ${getEventResult.code}`)
  }

  console.log(`[${name}] searchEvents.mjs (read-only)`)
  const searchEventsResult = await runExample('searchEvents.mjs', {
    ...baseEnv,
    VISITOR_ID: readOnly.visitorId,
    LINKED_ID: readOnly.linkedId,
  })
  if (searchEventsResult.code !== 0) {
    failures.push(`[${name}] searchEvents.mjs exited with code ${searchEventsResult.code}`)
  }

  console.log(`[${name}] behaviors.mjs (read-only: pagination + reverse ordering)`)
  const behaviorsResult = await runExample('behaviors.mjs', baseEnv, __dirname)
  if (behaviorsResult.code !== 0) {
    failures.push(`[${name}] behaviors.mjs exited with code ${behaviorsResult.code}`)
  }

  // Detect partial sealed config here (the generate job never sees ENCRYPTION_KEY):
  // a sealed result with no key, or a key with no sealed result, is a real failure.
  if (readOnly.sealedResult && ENCRYPTION_KEY) {
    console.log(`[${name}] unsealResult.mjs (read-only)`)
    const unsealResult = await runExample('unsealResult.mjs', {
      BASE64_SEALED_RESULT: readOnly.sealedResult,
      BASE64_KEY: ENCRYPTION_KEY,
    })
    if (unsealResult.code !== 0) {
      failures.push(`[${name}] unsealResult.mjs exited with code ${unsealResult.code}`)
    }
  } else if (readOnly.sealedResult && !ENCRYPTION_KEY) {
    failures.push(`[${name}] readOnly.sealedResult is present but ENCRYPTION_KEY env var is not set`)
  } else if (!readOnly.sealedResult && ENCRYPTION_KEY) {
    failures.push(
      `[${name}] ENCRYPTION_KEY is set but no sealedResult was generated (was SEALED_PUBLIC_KEY set for the generate job?)`
    )
  } else {
    console.log(`[${name}] skipping unsealResult.mjs (sealed results not configured)`)
  }

  console.log(`[${name}] validateWebhookSignature.mjs self-test (read-only)`)
  const webhookResult = await runExample('validateWebhookSignature.mjs', {
    RUN_WEBHOOK_SELFTEST: '1',
    WEBHOOK_SIGNATURE_SECRET,
  })
  if (webhookResult.code !== 0) {
    failures.push(`[${name}] validateWebhookSignature.mjs self-test exited with code ${webhookResult.code}`)
  }

  const updateTarget = destructiveUpdate?.[LEG_INDEX]
  if (!updateTarget) {
    failures.push(`[${name}] no destructiveUpdate entry for LEG_INDEX=${LEG_INDEX}`)
  } else {
    console.log(`[${name}] updateEvent.mjs (destructive, leg ${LEG_INDEX})`)
    const updateResult = await runUpdateEventWithRetry({ ...baseEnv, EVENT_ID: updateTarget.eventId })
    if (updateResult.code !== 0) {
      failures.push(`[${name}] updateEvent.mjs exited with code ${updateResult.code} (leg ${LEG_INDEX})`)
    }
  }

  const deleteTarget = destructiveDelete?.[LEG_INDEX]
  if (!deleteTarget) {
    failures.push(`[${name}] no destructiveDelete entry for LEG_INDEX=${LEG_INDEX}`)
  } else {
    console.log(`[${name}] deleteVisitor.mjs (destructive, leg ${LEG_INDEX})`)
    const deleteResult = await runExample('deleteVisitor.mjs', { ...baseEnv, VISITOR_ID: deleteTarget.visitorId })
    if (deleteResult.code !== 0) {
      failures.push(`[${name}] deleteVisitor.mjs exited with code ${deleteResult.code} (leg ${LEG_INDEX})`)
    }
  }
}

async function main() {
  if (!PRIVATE_KEY) {
    console.error('PRIVATE_KEY env var is not set')
    return 1
  }

  const raw = await readFile(GENERATED_EVENTS_FILE, 'utf-8')
  const { subscriptions } = JSON.parse(raw)

  if (!Array.isArray(subscriptions) || subscriptions.length === 0) {
    console.error(`No subscriptions found in ${GENERATED_EVENTS_FILE}`)
    return 1
  }

  if (subscriptions.length > 1) {
    console.warn(
      `${subscriptions.length} subscriptions found, but PRIVATE_KEY/ENCRYPTION_KEY come from a single set of env ` +
        'vars; all legs will use the same PRIVATE_KEY/ENCRYPTION_KEY. Multi-subscription secret mapping is out of scope.'
    )
  }

  console.log(`Running examples for ${subscriptions.length} subscription(s), LEG_INDEX=${LEG_INDEX}`)

  const failures = []
  for (const subscription of subscriptions) {
    await runSubscription(subscription, failures)
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} example(s) failed:`)
    for (const failure of failures) {
      console.error(` - ${failure}`)
    }
    return 1
  }

  console.log('\nAll examples passed.')
  return 0
}

process.exitCode = await main()
