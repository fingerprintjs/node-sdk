---
'@fingerprint/node-sdk': minor
---

**types**: Type-breaking changes in generated TypeScript types for OpenAPI v3.3.0:

- `SearchEventsFilter.start` and `SearchEventsFilter.end` are now `number | string` (RFC3339 strings in addition to Unix milliseconds)
- `BotInfo.category` is now `BotInfoCategory` instead of `string`. Update assignments, comparisons, and narrowing that assumed a free-form string.
- `BotInfoCategory` includes new enum members such as `unknown` (exhaustive `switch` statements may need updates)
