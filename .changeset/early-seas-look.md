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

Use new client when initializing: `FingerprintServerApiClient`:

```diff
- const client = new FingerprintJsServerApiClient(config)
+ const client = new FingerprintServerApiClient(config)
```

`authenticationMode` option removed from constructor:

```diff
  const client = new FingerprintServerApplication({
-   authenticationMode: AuthenticationMode.AuthHeader
    // ...
  })
```

Use `searchEvents` function instead of `getVisits()`:

```diff
- client.getVisits('VISITOR_ID', { limit: 1 })
+ client.searchEvents({ visitor_id: 'VISITOR_ID', limit: 1 })
```

Related visitors API (`getRelatedVisitors()`) is removed:

```diff
- client.getRelatedVisitors({ visitor_id: 'VISITOR_ID' })
```

Use `tags` instead of `tag` for updating an event:

```diff
- const body: EventsUpdateRequest = {
+ const body: EventUpdate = {
-   tag: {
+   tags: {
      key: 'value',
    }
  }
```

Use simplified and _snake\_case_ fields for the response:

```
  const event = await client.getEvent(eventId)
- console.log(event.products.identification.data.visitorId)
+ console.log(event.identification.visitor_id)
```

Delete any usage from removed types (`VisitorHistoryFilter`, `ErrorPlainResponse`, `VisitorsResponse`, `RelatedVisitorsResponse`,
`RelatedVisitorsFilter`, `Webhook`, `EventsUpdateRequest`).
