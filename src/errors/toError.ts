export function toError(e: unknown): Error {
  if (e && typeof e === 'object' && 'message' in e) {
    return e as Error
  }

  return new Error(String(e))
}
