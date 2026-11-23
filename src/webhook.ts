import crypto from 'crypto'

function isValidHmacSignature(signature: string | undefined, data: Buffer, secret: string) {
  if (signature === undefined) {
    return false
  }
  const received = Buffer.from(signature)
  const expected = Buffer.from(crypto.createHmac('sha256', secret).update(data).digest('hex'))
  // timingSafeEqual throws on buffers of different lengths. Compare byte lengths, not string
  // lengths, because a multibyte character makes the buffer longer than the string.
  if (received.length !== expected.length) {
    return false
  }
  return crypto.timingSafeEqual(received, expected)
}

export interface IsValidWebhookSignatureParams {
  /**
   * The value of the "fpjs-event-signature" header.
   * */
  header: string
  /**
   * The raw data of the incoming request
   * */
  data: Buffer
  /**
   * The secret key used to sign the request.
   * */
  secret: string
}

/**
 * Verifies the HMAC signature extracted from the "fpjs-event-signature" header of the incoming request. This is a part of the webhook signing process, which is available only for enterprise customers.
 * If you wish to enable it, please contact our support: https://fingerprint.com/support
 *
 * @param {IsValidWebhookSignatureParams} params
 * @param {string} params.header - The value of the "fpjs-event-signature" header.
 * @param {Buffer} params.data - The raw data of the incoming request.
 * @param {string} params.secret - The secret key used to sign the request.
 *
 * @return {boolean} true if the signature is valid, false otherwise.
 *
 * @example
 * ```javascript
 * // Webhook endpoint handler
 * export async function POST(request: Request) {
 *   try {
 *     const secret = process.env.WEBHOOK_SIGNATURE_SECRET;
 *     const header = request.headers.get("fpjs-event-signature");
 *     const data = Buffer.from(await request.arrayBuffer());
 *
 *     if (!isValidWebhookSignature({ header, data, secret })) {
 *       return Response.json(
 *         { message: "Webhook signature is invalid." },
 *         { status: 403 },
 *       );
 *     }
 *
 *     return Response.json({ message: "Webhook received." });
 *   } catch (error) {
 *     return Response.json({ error }, { status: 500 });
 *   }
 * }
 * ```
 */
export function isValidWebhookSignature(params: IsValidWebhookSignatureParams): boolean {
  const { header, data, secret } = params

  const signatures = header.split(',')
  for (const signature of signatures) {
    const [version, hash] = signature.split('=')
    if (version === 'v1' && isValidHmacSignature(hash, data, secret)) {
      return true
    }
  }
  return false
}
