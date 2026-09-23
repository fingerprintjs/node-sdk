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

    super(msg, { cause: error })
    this.name = 'UnsealError'
  }
}

/**
 * Every decryption key failed. Inspect {@link errors} for per-key
 * {@link UnsealError} details.
 */
export class UnsealAggregateError extends Error {
  constructor(readonly errors: UnsealError[]) {
    super('Unable to decrypt sealed data')
    this.name = 'UnsealAggregateError'
  }

  addError(error: UnsealError) {
    this.errors.push(error)
  }

  toString() {
    return this.errors.map((e) => e.toString()).join('\n')
  }
}
