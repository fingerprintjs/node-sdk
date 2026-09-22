---
'@fingerprint/node-sdk': patch
---

Throw `SdkError` instead of `TypeError` or `Error` for invalid arguments. Messages name the function argument (`eventId is not valid: ..`) instead of a path parameter.
