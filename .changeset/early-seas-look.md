---
'@fingerprint/fingerprint-server-sdk': major
---

**Server APIv3 -> Server APIv4 migration**

- Switch all endpoints to `/v4/*`.
- Remove `authenticationMode` option when initializing `FingerprintJsServerApiClient`.
- Rename `request_id` to `event_id`.
- Use snake_case fields when updating an event.
- Use `PATCH` method when updating an event.
- Examples, tests, and docs updated.

**BREAKING CHANGES**
- `authenticationMode` option removed.
- Endpoints and method signatures changed.
  - Use `eventId` instead of `requestId` when triggering `updateEvent()` function.
  - Use `eventId` instead of `requestId` when triggering `getEvent()` function.
- Removed `getVisits()` function.
- Removed `getRelatedVisitors()` function.
- Removed `VisitorHistoryFilter`, `ErrorPlainResponse`, `VisitorsResponse`, `RelatedVisitorsResponse`,
`RelatedVisitorsFilter`, `Webhook`, `EventsUpdateRequest` types.
- Use `tags` instead of `tag` for updating an event.
- Response models changed.
