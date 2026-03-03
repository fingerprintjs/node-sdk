---
'@fingerprint/node-sdk': major
---

**Server API v3 -> Server API v4 migration**

- All endpoints now use `/v4/*`.
- `authenticationMode` option removed from `FingerprintServerApiClient`.
- `request_id` renamed to `event_id`.
- Event updates now use _snake\_case_ fields and `PATCH` method.
- Response models now use _snake\_case_ fields.
- **Removed APIs**: `getVisits()`, `getRelatedVisitors()`, and related types (`VisitorHistoryFilter`,
`ErrorPlainResponse`, `VisitorsResponse`, `RelatedVisitorsResponse`, `RelatedVisitorsFilter`, `Webhook`,
`EventsUpdateRequest`).

**Migration Notes:**
- Use new client when initializing: `FingerprintServerApiClient`.
- `authenticationMode` option removed.
- Removed `getVisits()` function.
- Removed `getRelatedVisitors()` function.
- Removed `VisitorHistoryFilter`, `ErrorPlainResponse`, `VisitorsResponse`, `RelatedVisitorsResponse`,
`RelatedVisitorsFilter`, `Webhook`, `EventsUpdateRequest` types.
- Use `tags` instead of `tag` for updating an event.
- Response models changed. Use _snake\_case_ fields.
