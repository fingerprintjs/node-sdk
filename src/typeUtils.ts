/**
 * Union that keeps autocomplete for the known values of `T` while still accepting any string.
 * Useful for fields whose value is usually one of a known set but can legitimately be something
 * else at runtime.
 */
export type LooseAutocomplete<T extends string> = T | (string & {})
