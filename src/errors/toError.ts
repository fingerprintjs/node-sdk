export function toError(error: unknown): Error {
  if (error instanceof Error) {
    return error
  }

  // Some runtimes (and cross-realm values, e.g. errors surfaced from native
  // bindings) are error-like without being `Error` instances. Normalize them
  // into a real `Error` while preserving the original message.
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return new Error(String(error.message))
  }

  const message = String(error)

  // Objects without `message` or `toString()` will return '[object Object]',
  // JSON-stringify them explicitly to preserve the original content.
  if (message === '[object Object]') {
    return new Error(JSON.stringify(error))
  }

  return new Error(message)
}
