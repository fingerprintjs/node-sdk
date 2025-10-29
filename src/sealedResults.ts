import { createDecipheriv } from 'crypto'
import { inflateRaw } from 'zlib'
import { promisify } from 'util'
import { Event } from './types'
import { UnsealAggregateError, UnsealError } from './errors/unsealError'
import { Buffer } from 'buffer'

const asyncInflateRaw = promisify(inflateRaw)

export enum DecryptionAlgorithm {
  Aes256Gcm = 'aes-256-gcm',
}

export interface DecryptionKey {
  key: Buffer
  algorithm: DecryptionAlgorithm | `${DecryptionAlgorithm}`
}

const SEALED_HEADER = Buffer.from([0x9e, 0x85, 0xdc, 0xed])

function isEventResponse(data: unknown): data is Event {
  return Boolean(data && typeof data === 'object' && 'event_id' in data && 'timestamp' in data)
}

/**
 * @private
 * */
export function parseEventsResponse(unsealed: string): Event {
  const json = JSON.parse(unsealed)

  if (!isEventResponse(json)) {
    throw new Error('Sealed data is not valid events response')
  }

  return json
}

/**
 * Decrypts the sealed response with the provided keys.
 * The SDK will try to decrypt the result with each key until it succeeds.
 * To learn more about sealed results visit: https://dev.fingerprint.com/docs/sealed-client-results
 * @throws UnsealAggregateError
 * @throws Error
 */
export async function unsealEventsResponse(sealedData: Buffer, decryptionKeys: DecryptionKey[]): Promise<Event> {
  const unsealed = await unseal(sealedData, decryptionKeys)

  return parseEventsResponse(unsealed)
}

/**
 * @private
 * */
export async function unseal(sealedData: Buffer, decryptionKeys: DecryptionKey[]) {
  if (sealedData.subarray(0, SEALED_HEADER.length).toString('hex') !== SEALED_HEADER.toString('hex')) {
    throw new Error('Invalid sealed data header')
  }

  const errors = new UnsealAggregateError([])

  for (const decryptionKey of decryptionKeys) {
    switch (decryptionKey.algorithm) {
      case DecryptionAlgorithm.Aes256Gcm:
        try {
          return await unsealAes256Gcm(sealedData, decryptionKey.key)
        } catch (e) {
          errors.addError(new UnsealError(decryptionKey, e as Error))
          continue
        }

      default:
        throw new Error(`Unsupported decryption algorithm: ${decryptionKey.algorithm}`)
    }
  }

  throw errors
}

async function unsealAes256Gcm(sealedData: Buffer, decryptionKey: Buffer) {
  const nonceLength = 12
  const nonce = sealedData.subarray(SEALED_HEADER.length, SEALED_HEADER.length + nonceLength)

  const authTagLength = 16
  const authTag = sealedData.subarray(-authTagLength)

  const ciphertext = sealedData.subarray(SEALED_HEADER.length + nonceLength, -authTagLength)

  const decipher = createDecipheriv('aes-256-gcm', decryptionKey, nonce).setAuthTag(authTag)
  const compressed = Buffer.concat([decipher.update(ciphertext), decipher.final()])

  const payload = await asyncInflateRaw(compressed)

  return payload.toString()
}
