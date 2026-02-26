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
