---
'@fingerprint/node-sdk': minor
---

**events**: `Event` is now a union of `EventDevice` and `EventEdge`, discriminated by `source`. Edge events (Automation Intelligence API) have no Identification, Smart Signals or `rule_action`, so check `source !== 'edge'` before reading those fields.
