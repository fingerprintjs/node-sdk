---
'@fingerprint/node-sdk': minor
---

Strongly type the `RequestError.errorCode` field.

`errorCode` is now typed as the `LooseAutocomplete<ErrorCode>` union (the set of error codes returned by the Fingerprint Server API) instead of a free-form `string`. The new `ErrorCode` type is also exported. This is a type-only change; runtime behavior is unchanged.
