---
'@fingerprint/node-sdk': minor
---

**types**: Breaking changes in generated TypeScript types from OpenAPI v3.3.0:

- `BotInfo.category` is now `BotInfoCategory` instead of `string`. Update assignments, comparisons, and narrowing that assumed a free-form string.
- `BotInfoCategory` adds new enum members (including `unknown`). Exhaustive `switch` statements must be updated.
