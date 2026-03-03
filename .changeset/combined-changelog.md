---
'@fingerprint/node-sdk': major
---

### Breaking changes

- **Package renamed** from `@fingerprintjs/fingerprintjs-pro-server-api` to `@fingerprint/node-sdk`.
- **Server API v3 -> Server API v4 migration**:
  - All endpoints now use `/v4/*`.
  - `authenticationMode` option removed from `FingerprintServerApiClient`.
  - `request_id` renamed to `event_id`.
  - Event updates now use _snake\_case_ fields and `PATCH` method.
  - Response models are now use _snake\_case_ fields.
- **Removed APIs**: `getVisits()`, `getRelatedVisitors()`, and related types (`VisitorHistoryFilter`, `ErrorPlainResponse`, `VisitorsResponse`, `RelatedVisitorsResponse`, `RelatedVisitorsFilter`, `Webhook`, `EventsUpdateRequest`).
- **`updateEvent` signature changed**: now takes `(eventId, body)` instead of `(body, eventId)`.

### New features

- Added `options` parameter to the `getEvent` operation.

### Improvements

- Avoid unnecessary response cloning on successful JSON responses.
