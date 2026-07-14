// @ts-check
import assert from 'node:assert'
import { createHmac } from 'node:crypto'
import { isValidWebhookSignature } from '@fingerprint/node-sdk'

/**
 * Webhook endpoint handler example
 * @param {Request} request
 */
export async function POST(request) {
  try {
    const secret = process.env.WEBHOOK_SIGNATURE_SECRET
    const header = request.headers.get('fpjs-event-signature')
    const data = Buffer.from(await request.arrayBuffer())

    if (!secret) {
      return Response.json({ message: 'Secret is not set.' }, { status: 500 })
    }

    if (!header) {
      return Response.json({ message: 'fpjs-event-signature header not found.' }, { status: 400 })
    }

    if (!isValidWebhookSignature({ header, data, secret })) {
      return Response.json({ message: 'Webhook signature is invalid.' }, { status: 403 })
    }

    return Response.json({ message: 'Webhook received.' }, { status: 200 })
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}

// Self-check: signs a sample payload and verifies the handler accepts a valid
// signature and rejects a tampered one. Not run by default; opt in with
// RUN_WEBHOOK_SELFTEST=1 and WEBHOOK_SIGNATURE_SECRET set.
if (process.env.RUN_WEBHOOK_SELFTEST) {
  const secret = process.env.WEBHOOK_SIGNATURE_SECRET
  if (!secret) {
    console.error('WEBHOOK_SIGNATURE_SECRET not defined')
    process.exit(1)
  }

  const data = JSON.stringify({ webhookId: 'self-test', event: 'identification' })
  const hash = createHmac('sha256', secret).update(data).digest('hex')

  const validResponse = await POST(
    new Request('https://example.com/webhook', {
      method: 'POST',
      headers: { 'fpjs-event-signature': `v1=${hash}` },
      body: data,
    })
  )
  assert.strictEqual(validResponse.status, 200)

  const tamperedResponse = await POST(
    new Request('https://example.com/webhook', {
      method: 'POST',
      headers: { 'fpjs-event-signature': `v1=${hash}tampered` },
      body: data,
    })
  )
  assert.strictEqual(tamperedResponse.status, 403)

  console.log('Webhook signature self-check passed')
}
