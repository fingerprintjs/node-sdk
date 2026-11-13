---
'@fingerprint/node-sdk': minor
---

**types**: ⚠️ Type-breaking change in generated TypeScript types for OpenAPI v3.11.0. No runtime change.

- `Event` is now a union of `EventDevice` and `EventEdge`, discriminated by `source`. Edge events (Automation Intelligence API) have no Identification, no `rule_action`, and none of the Smart Signals that need device data. They still have IP, proxy, VPN and bot detection.
- Code that reads device-only fields such as `event.identification` or `event.rule_action` no longer compiles. Check `source` first:

  ```ts
  if (event.source === 'device') {
    console.log(event.rule_action?.type)
  }
  ```

- `source` is now required on `Event`. Objects typed as `Event` without `source` (for example, test fixtures) no longer compile. For webhook bodies, use the new `Webhook` type.
