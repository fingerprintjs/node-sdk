---
'@fingerprint/node-sdk': minor
---

Separate Server API errors from other request errors and strongly type the error code.

- Added `ServerApiError` (extends `RequestError`), thrown when the Server API returns a structured error response. It narrows `errorCode` to the strongly typed `ErrorCode` and exposes `responseBody: ErrorResponse`.
- Exported the `ErrorCode` type (the union of error codes returned by the Fingerprint Server API).
- `TooManyRequestsError` now extends `ServerApiError`.
- `RequestError` remains the base class for request-level errors and is thrown directly for non–Server-API responses (for example, errors returned by an intermediate proxy). Its `errorCode` stays a free-form `string` (a best-effort placeholder derived from `statusText`), exactly as before.

This is a backward-compatible change: structured Server API errors are now instances of `ServerApiError` (a subclass of `RequestError`). `error instanceof RequestError` checks keep working, and `errorCode` stays populated on every error. To get the strictly typed `errorCode`, narrow to `ServerApiError` (`if (error instanceof ServerApiError) { error.errorCode }`).
