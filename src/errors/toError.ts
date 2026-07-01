export function toError(e: unknown): Error {
  if (e instanceof Error) {
    return e
  }

  // Some runtimes (and cross-realm values, e.g. errors surfaced from native
  // bindings) are error-like without being `Error` instances. Normalize them
  // into a real `Error` while preserving the original message.
  if (e && typeof e === 'object' && 'message' in e) {
    return new Error(String(e.message))
  }

  return new Error(String(e))
}
