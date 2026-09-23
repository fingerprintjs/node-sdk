import { SdkError } from './errors'
import { DecryptionKey } from '../sealedResults'

/**
 * Decryption failure for one key. Collected on {@link UnsealAggregateError};
 * not thrown from {@link unsealEventsResponse}.
 */
export class UnsealError extends Error {
  constructor(
    readonly key: DecryptionKey,
    readonly error?: Error
  ) {
    let msg = `Unable to decrypt sealed data`

    if (error) {
      msg = msg.concat(`: ${error.message}`)
    }

    super(msg)
    this.name = 'UnsealError'
  }
}

/**
 * Every decryption key failed. Catch as {@link SdkError}, then narrow here if
 * you need per-key {@link UnsealError} details on {@link errors}.
 */
export class UnsealAggregateError extends SdkError {
  constructor(readonly errors: UnsealError[]) {
    super('Unable to decrypt sealed data')
  }

  addError(error: UnsealError) {
    this.errors.push(error)
  }

  toString() {
    return this.errors.map((e) => e.toString()).join('\n')
  }
}
