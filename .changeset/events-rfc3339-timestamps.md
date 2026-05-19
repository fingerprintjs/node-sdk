---
'@fingerprint/node-sdk': minor
---

**events-search**: Accept RFC3339 timestamps for `start` and `end` filter parameters in addition to Unix milliseconds

**types**: `SearchEventsFilter.start` and `SearchEventsFilter.end` are now `number | string` (widening; not breaking for existing Unix millisecond usage).
