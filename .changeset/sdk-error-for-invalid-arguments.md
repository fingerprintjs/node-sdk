---
'@fingerprint/node-sdk': patch
---

Throw `SdkError` instead of `TypeError` or `Error` for invalid arguments and sealed-result validation failures. `UnsealAggregateError` now extends `SdkError`. Messages name the function argument (`eventId is not valid: ..`) instead of a path parameter.
