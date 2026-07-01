export function toError(e: unknown): Error {
  if (e && typeof e === 'object' && 'message' in e) {
    // Safe: we have verified above that `e` is an object carrying a `message` property.
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return e as Error
  }

  return new Error(String(e))
}
