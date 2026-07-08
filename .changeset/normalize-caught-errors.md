---
'@fingerprint/node-sdk': patch
---

**errors**: Normalize caught values into real `Error` instances, so errors from `unseal` and JSON parsing always carry a genuine `Error`.
