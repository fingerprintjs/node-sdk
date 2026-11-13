---
'@fingerprint/node-sdk': minor
---

**webhooks**: Add `Webhook` type for webhook bodies. Same as `Event`, but `source` is optional on device events, because webhooks stored before `source` existed don't have it.
