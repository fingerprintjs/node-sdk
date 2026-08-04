---
"@fingerprintjs/fingerprintjs-pro-server-api": minor
---

Update Server API schema to v3.5.2:

- Add `rareDevice` Smart Signal with `result` and `percentileBucket` fields, plus `rare_device` and `rare_device_percentile_bucket` query filters on the events search endpoint
- Add `labels` field with machine learning based predictions for specific use cases (beta)
- Add `mlScore` fields to the `VPN` and `Proxy` signals, and `mlPrediction` to `IPInfoASN`'s VPN info (beta)
- Add `unknown` to the `proxyType` enum for proxies detected solely by the ML model
- Clarify the `DeveloperTools` signal description to cover Android/iOS devices
