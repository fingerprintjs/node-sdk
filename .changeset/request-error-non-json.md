---
'@fingerprint/node-sdk': patch
---

Throw a `RequestError` instead of a top-level `SdkError` when a Server API error response has a non-JSON body (e.g. an HTML error page from a proxy).
