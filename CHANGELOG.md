# Fingerprint Server API Node.js SDK

## 6.11.0

### Minor Changes

- Add `mlScore` fields to the `VirtualMachine` signal ([14177c6](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/14177c682875fcf0cfb70119e87cb231670a0ce3))
- Add `WorkspaceScopedSecretKeyRequired` error code ([14177c6](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/14177c682875fcf0cfb70119e87cb231670a0ce3))
- Add optional `type` field to `IPInfoASN` response model ([14177c6](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/14177c682875fcf0cfb70119e87cb231670a0ce3))
- Add `integrations` field to `SDK` model with a list of `Integration` and `subintegration`. ([14177c6](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/14177c682875fcf0cfb70119e87cb231670a0ce3))
- Add `confidence` and `mlScore` fields to the `Tampering` signal ([14177c6](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/14177c682875fcf0cfb70119e87cb231670a0ce3))
- Add deprecation warning

  ### Deprecation

  :warning: `@fingerprintjs/fingerprintjs-pro-server-api` uses Server API v3, which is deprecated. Please migrate to the new [`@fingerprint/node-sdk`](https://github.com/fingerprintjs/node-sdk) package which uses Server API v4. ([14177c6](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/14177c682875fcf0cfb70119e87cb231670a0ce3))

## 6.10.0

### Minor Changes

- **events-search**: Event search now supports a new set of filter parameters: `developer_tools`, `location_spoofing`, `mitm_attack`, `proxy`, `sdk_version`, `sdk_platform`, `environment` ([38690a8](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/38690a80097baef7eafef8bc300077825d4abcb4))
- **webhook**: Add `supplementaryIds` property to the Webhooks schema. ([38690a8](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/38690a80097baef7eafef8bc300077825d4abcb4))
- Add `proximity` signal that represents a fixed geographical zone in a discrete global grid within which the device is observed. ([8e3b09b](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/8e3b09bbf3ed82992b2bacb16be1653e8bbfe9eb))
- Add `environmentId` property to `identification` ([38690a8](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/38690a80097baef7eafef8bc300077825d4abcb4))

## 6.10.0-test.1

### Minor Changes

- Add `proximity` signal that represents a fixed geographical zone in a discrete global grid within which the device is observed. ([8e3b09b](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/8e3b09bbf3ed82992b2bacb16be1653e8bbfe9eb))

## 6.10.0-test.0

### Minor Changes

- **events-search**: Event search now supports a new set of filter parameters: `developer_tools`, `location_spoofing`, `mitm_attack`, `proxy`, `sdk_version`, `sdk_platform`, `environment` ([38690a8](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/38690a80097baef7eafef8bc300077825d4abcb4))
- **webhook**: Add `supplementaryIds` property to the Webhooks schema. ([38690a8](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/38690a80097baef7eafef8bc300077825d4abcb4))
- Add `environmentId` property to `identification` ([38690a8](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/38690a80097baef7eafef8bc300077825d4abcb4))

## 6.9.0

### Minor Changes

- Add `details` object to the `proxy` signal. This field includes the `type` of the detected proxy (`residential` or `data_center`) and the `lastSeenAt` timestamp of when an IP was last observed to show proxy-like behavior. ([5988f03](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/5988f03cf3a1e341a4dc28b0c1496600e5e24853))

## 6.8.0

### Minor Changes

- Mark `replayed` field required in the `identification` product schema. This field will always be present. ([a30d9c8](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/a30d9c8a0753bb976c618ac9a7e462e0f8e9c97a))
- Add `sdk` field with platform metadata to `identification` ([a30d9c8](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/a30d9c8a0753bb976c618ac9a7e462e0f8e9c97a))

### Patch Changes

- Deprecate the Remote Control Detection Smart Signal. This signal is no longer available. ([a30d9c8](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/a30d9c8a0753bb976c618ac9a7e462e0f8e9c97a))

## 6.8.0-test.0

### Minor Changes

- Mark `replayed` field required in the `identification` product schema. This field will always be present. ([a30d9c8](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/a30d9c8a0753bb976c618ac9a7e462e0f8e9c97a))
- Add `sdk` field with platform metadata to `identification` ([a30d9c8](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/a30d9c8a0753bb976c618ac9a7e462e0f8e9c97a))

### Patch Changes

- Deprecate the Remote Control Detection Smart Signal. This signal is no longer available. ([a30d9c8](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/a30d9c8a0753bb976c618ac9a7e462e0f8e9c97a))

## 6.7.0

### Minor Changes

- add `replayed` field to `identification` in Events and Webhooks ([0874aec](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/0874aec6e49f6a0772a80a42723cc5ba7087a36b))
- allow enum parameters to be specified as their string literal equivalents ([c4ff3c9](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/c4ff3c9e07a428d9389c75866ceb705b431aa08a))

## 6.6.0

### Minor Changes

- Add `confidence` property to the Proxy detection Smart Signal, which now supports both residential and public web proxies. ([af62b15](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/af62b151e11f40a90ed95db34976c6bc2a70a15a))

## 6.5.0

### Minor Changes

- **events-search**: Event search now supports a new set of filter parameters: `vpn`, `virtual_machine`, `tampering`, `anti_detect_browser`, `incognito`, `privacy_settings`, `jailbroken`, `frida`, `factory_reset`, `cloned_app`, `emulator`, `root_apps`, `vpn_confidence`, `min_suspect_score`. ([50be5ca](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/50be5caed0b7939c77ac55b6227edae3fa3ffe83))
- **events-search**: Event search now supports two new filter parameters: `ip_blocklist`, `datacenter` ([96911d9](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/96911d9af1602646ff6119639a0df031d9267c35))

### Patch Changes

- **events**: Update Tampering descriptions to reflect Android support. ([50be5ca](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/50be5caed0b7939c77ac55b6227edae3fa3ffe83))
- **webhook**: Add `environmentId` property ([50be5ca](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/50be5caed0b7939c77ac55b6227edae3fa3ffe83))

## 6.5.0-test.1

### Minor Changes

- **events-search**: Event search now supports two new filter parameters: `ip_blocklist`, `datacenter` ([96911d9](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/96911d9af1602646ff6119639a0df031d9267c35))

## 6.5.0-test.0

### Minor Changes

- **events-search**: Event search now supports a new set of filter parameters: `vpn`, `virtual_machine`, `tampering`, `anti_detect_browser`, `incognito`, `privacy_settings`, `jailbroken`, `frida`, `factory_reset`, `cloned_app`, `emulator`, `root_apps`, `vpn_confidence`, `min_suspect_score`. ([50be5ca](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/50be5caed0b7939c77ac55b6227edae3fa3ffe83))

### Patch Changes

- **events**: Update Tampering descriptions to reflect Android support. ([50be5ca](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/50be5caed0b7939c77ac55b6227edae3fa3ffe83))
- **webhook**: Add `environmentId` property ([50be5ca](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/50be5caed0b7939c77ac55b6227edae3fa3ffe83))

## 6.4.0

### Minor Changes

- Add `mitmAttack` (man-in-the-middle attack) Smart Signal. ([8dd004d](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/8dd004d27d45dd3e3bb7632dabe1750144dc84fa))

## 6.3.0

### Minor Changes

- **events-search**: Add `pagination_key` parameter ([97270e0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/97270e0e6d16ade9fbdb924ef15fcdf8e4cf0cc6))

## 6.3.0-test.0

### Minor Changes

- **events-search**: Add `pagination_key` parameter ([97270e0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/97270e0e6d16ade9fbdb924ef15fcdf8e4cf0cc6))

## 6.2.0

### Minor Changes

- **events-search**: Add a new `events/search` API endpoint. Allow users to search for identification events matching one or more search criteria, for example, visitor ID, IP address, bot detection result, etc. ([48918eb](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/48918eb6ba99cf2782dfe76777b591b4c99cc822))

### Patch Changes

- **events-search**: Improve parameter descriptions for `bot`, `suspect` ([ce812de](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/ce812de1f40cfa2fa1947bb8274924fe89880864))
- Filter out `undefined` or `null` query parameters before sending request ([62a0279](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/62a0279b835a32c527fa985a46939dc155301b3f))

## 6.2.0-test.1

### Patch Changes

- Filter out `undefined` or `null` query parameters before sending request ([62a0279](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/62a0279b835a32c527fa985a46939dc155301b3f))

## 6.2.0-test.0

### Minor Changes

- **events-search**: Add a new `events/search` API endpoint. Allow users to search for identification events matching one or more search criteria, for example, visitor ID, IP address, bot detection result, etc. ([48918eb](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/48918eb6ba99cf2782dfe76777b591b4c99cc822))

## 6.1.0

### Minor Changes

- Add `relay` detection method to the VPN Detection Smart Signal ([05a9257](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/05a9257ab099a7a7a551b7b6c943ed1b84ba65c7))
- **events**: Add a `suspect` field to the `identification` product schema ([05a9257](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/05a9257ab099a7a7a551b7b6c943ed1b84ba65c7))

## 6.0.0

### Major Changes

The underlying Server API hasn’t changed, but we made SDK type and class generation more precise, resulting in small breaking changes for the SDK itself. This change should make the SDK API a lot more stable going forward

- Rename `EventUpdateRequest` type to `EventsUpdateRequest` ([54b92b2](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/54b92b2afa0efeacb2e510f98df74e133ef58aac))
- - Remove the `BrowserDetails` field `botProbability`.
  - Update the `IdentificationConfidence` field `score` type format: `float` -> `double`.
  - Make the `RawDeviceAttributeError` field `name` **optional** .
  - Make the `RawDeviceAttributeError` field `message` **optional** .
  - **events**: Remove the `EventsResponse` field `error`.
    - [note]: The errors are represented by `ErrorResponse` model.
  - **events**: Update the `HighActivity` field `dailyRequests` type format: `number` -> `int64`.
  - **events**: Specify the `Tampering` field `anomalyScore` type format: `double`.
  - **webhook**: Make the `Webhook` fields **optional**: `visitorId`, `visitorFound`, `firstSeenAt`, `lastSeenAt`, `browserDetails`, `incognito`.
  - **webhook**: Make the `WebhookClonedApp` field `result` **optional**.
  - **webhook**: Make the `WebhookDeveloperTools` field `result` **optional**.
  - **webhook**: Make the `WebhookEmulator` field `result` **optional**.
  - **webhook**: Make the `WebhookFactoryReset` fields `time` and `timestamp` **optional**.
  - **webhook**: Make the `WebhookFrida` field `result` **optional**.
  - **webhook**: Update the `WebhookHighActivity` field `dailyRequests` type format: `number` -> `int64`.
  - **webhook**: Make the `WebhookIPBlocklist` fields `result` and `details` **optional**.
  - **webhook**: Make the `WebhookJailbroken` field `result` **optional**.
  - **webhook**: Make the `WebhookLocationSpoofing` field `result` **optional**.
  - **webhook**: Make the `WebhookPrivacySettings` field `result` **optional**.
  - **webhook**: Make the `WebhookProxy` field `result` **optional**.
  - **webhook**: Make the `WebhookRemoteControl` field `result` **optional**.
  - **webhook**: Make the `WebhookRootApps` field `result` **optional**.
  - **webhook**: Make the `WebhookSuspectScore` field `result` **optional**.
  - **webhook**: Make the `WebhookTampering` fields `result`, `anomalyScore` and `antiDetectBrowser` **optional**.
  - **webhook**: Specify the `WebhookTampering` field `anomalyScore` type format: `double`.
  - **webhook**: Make the `WebhookTor` field `result` **optional**.
  - **webhook**: Make the `WebhookVelocity` fields **optional**: `distinctIp`, `distinctLinkedId`, `distinctCountry`, `events`, `ipEvents`, `distinctIpByLinkedId`, `distinctVisitorIdByLinkedId`.
  - **webhook**: Make the `WebhookVirtualMachine` field `result` **optional**.
  - **webhook**: Make the `WebhookVPN` fields **optional**: `result`, `confidence`, `originTimezone`, `methods`. ([68b89bf](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/68b89bfa8c0d269db3d613cacb59b9d41614a99f))
- - Rename `BotdResult` -> `Botd`.
  - Rename `BotdDetectionResult` -> `BotdBot`:
    - Extract `result` type as `BotdBotResult`.
  - Rename `ClonedAppResult` -> `ClonedApp`.
  - Rename `DeveloperToolsResult` -> `DeveloperTools`.
  - Rename `EmulatorResult` -> `Emulator`.
  - Refactor error models:
    - Remove `ErrorCommon403Response`, `ErrorCommon429Response`, `ErrorEvent404Response`, `TooManyRequestsResponse`, `ErrorVisits403`, `ErrorUpdateEvent400Response`, `ErrorUpdateEvent409Response`, `ErrorVisitor400Response`, `ErrorVisitor404Response`, `IdentificationError`, `ProductError`.
    - Introduce `ErrorResponse` and `ErrorPlainResponse`.
      - [note]: `ErrorPlainResponse` has a different format `{ "error": string }` and it is used only in `GET /visitors`.
    - Extract `error` type as `Error`.
    - Extract `error.code` type as `ErrorCode`.
  - Rename `EventResponse` -> `EventsGetResponse`.
  - Rename `EventUpdateRequest` -> `EventsUpdateRequest`.
  - Rename `FactoryResetResult` -> `FactoryReset`.
  - Rename `FridaResult` -> `Frida`.
  - Rename `IPLocation` -> `Geolocation`:
    - Rename `IPLocationCity` -> `GeolocationCity`.
    - Extract `subdivisions` type as `GeolocationSubdivisions`.
    - Rename `Location` -> `GeolocationContinent`:
    - Introduce a dedicated type `GeolocationCountry`.
    - Rename `Subdivision` -> `GeolocationSubdivision`.
  - Rename `HighActivityResult` -> `HighActivity`.
  - Rename `Confidence` -> `IdentificationConfidence`.
  - Rename `SeenAt` -> `IdentificationSeenAt`.
  - Rename `IncognitoResult` -> `Incognito`.
  - Rename `IpBlockListResult` -> `IPBlocklist`:
    - Extract `details` type as `IPBlocklistDetails`.
  - Rename `IpInfoResult` -> `IPInfo`:
    - Rename `IpInfoResultV4` -> `IPInfoV4`.
    - Rename `IpInfoResultV6` -> `IPInfoV6`.
    - Rename `ASN` -> `IPInfoASN`.
    - Rename `DataCenter` -> `IPInfoDataCenter`.
  - Rename `JailbrokenResult` -> `Jailbroken`.
  - Rename `LocationSpoofingResult` -> `LocationSpoofing`.
  - Rename `PrivacySettingsResult` -> `PrivacySettings`.
  - Rename `ProductsResponse` -> `Products`:
    - Rename inner types: `ProductsResponseIdentification` -> `ProductIdentification`, `ProductsResponseIdentificationData` -> `Identification`, `ProductsResponseBotd` -> `ProductBotd`, `SignalResponseRootApps` -> `ProductRootApps`, `SignalResponseEmulator` -> `ProductEmulator`, `SignalResponseIpInfo` -> `ProductIPInfo`, `SignalResponseIpBlocklist` -> `ProductIPBlocklist`, `SignalResponseTor` -> `ProductTor`, `SignalResponseVpn` -> `ProductVPN`, `SignalResponseProxy` -> `ProductProxy`, `ProxyResult` -> `Proxy`, `SignalResponseIncognito` -> `ProductIncognito`, `SignalResponseTampering` -> `ProductTampering`, `SignalResponseClonedApp` -> `ProductClonedApp`, `SignalResponseFactoryReset` -> `ProductFactoryReset`, `SignalResponseJailbroken` -> `ProductJailbroken`, `SignalResponseFrida` -> `ProductFrida`, `SignalResponsePrivacySettings` -> `ProductPrivacySettings`, `SignalResponseVirtualMachine` -> `ProductVirtualMachine`, `SignalResponseRawDeviceAttributes` -> `ProductRawDeviceAttributes`, `RawDeviceAttributesResultValue` -> `RawDeviceAttributes`, `SignalResponseHighActivity` -> `ProductHighActivity`, `SignalResponseLocationSpoofing` -> `ProductLocationSpoofing`, `SignalResponseSuspectScore` -> `ProductSuspectScore`, `SignalResponseRemoteControl` -> `ProductRemoteControl`, `SignalResponseVelocity` -> `ProductVelocity`, `SignalResponseDeveloperTools` -> `ProductDeveloperTools`.
    - Extract `identification.data` type as `Identification`.
  - Rename `RawDeviceAttributesResult` -> `RawDeviceAttributes`:
    - Extract item type as `RawDeviceAttribute`.
    - Extract `error` type as `RawDeviceAttributeError`.
  - Rename `RemoteControlResult` -> `RemoteControl`.
  - Rename `RootAppsResult` -> `RootApps`.
  - Rename `SuspectScoreResult` -> `SuspectScore`.
  - Extract new model `Tag`.
  - Rename `TamperingResult` -> `Tampering`.
  - Rename `TorResult` -> `Tor`.
  - Rename `VelocityResult` -> `Velocity`:
    - Rename `VelocityIntervals` -> `VelocityData`.
    - Rename `VelocityIntervalResult` -> `VelocityIntervals`.
  - Rename `VirtualMachineResult` -> `VirtualMachine`.
  - Rename the `Visit` field `ipLocation` type `DeprecatedIPLocation` -> `DeprecatedGeolocation`.
    - Instead of `DeprecatedIPLocationCity` use common `GeolocationCity`
  - Rename `Response` -> `VisitorsGetResponse`.
    - Omit extra inner type `ResponseVisits`
  - Rename `VpnResult` -> `VPN`.
    - Extract `confidence` type as `VPNConfidence`.
    - Extract `methods` type as `VPNMethods`.
  - Rename `WebhookVisit` -> `Webhook`.
    - Introduce new inner types: `WebhookRootApps`, `WebhookEmulator`, `WebhookIPInfo`, `WebhookIPBlocklist`, `WebhookTor`, `WebhookVPN`, `WebhookProxy`, `WebhookTampering`, `WebhookClonedApp`, `WebhookFactoryReset`, `WebhookJailbroken`, `WebhookFrida`, `WebhookPrivacySettings`, `WebhookVirtualMachine`, `WebhookRawDeviceAttributes`, `WebhookHighActivity`, `WebhookLocationSpoofing`, `WebhookSuspectScore`, `WebhookRemoteControl`, `WebhookVelocity`, `WebhookDeveloperTools`. ([68b89bf](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/68b89bfa8c0d269db3d613cacb59b9d41614a99f))
- Remove utility functions for checking error type, such as `isEventError`, `isUpdateEventError`, etc. ([a17b73f](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/a17b73f720bf3fd34f004b93959aeb968a27fc24))
- Reduce thrown errors to `TooManyRequestsError` and `RequestError` ([6f4076e](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/6f4076ec3ef5cfd212c292110be008c49fd516e5))
- Rename `VisitWebhook` type to `Webhook` ([980bab0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/980bab0e6c80e9763f07505a1273919b3e283776))

### Minor Changes

- Added new `ipEvents`, `distinctIpByLinkedId`, and `distinctVisitorIdByLinkedId` fields to the `velocity` Smart Signal. ([68b89bf](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/68b89bfa8c0d269db3d613cacb59b9d41614a99f))
- - Make the `GeolocationCity` field `name` **required**.
  - Make the `GeolocationSubdivision` field `isoCode` **required**.
  - Make the `GeolocationSubdivision` field `name` **required**.
  - Make the `IPInfoASN` field `name` **required** .
  - Make the `IPInfoDataCenter` field `name` **required**.
  - Add **optional** `IdentificationConfidence` field `comment`.
  - **events**: Add **optional** `Botd` field `meta`.
  - **events**: Add **optional** `Identification` field `components`.
  - **events**: Make the `VPN` field `originCountry` **required**.
  - **visitors**: Add **optional** `Visit` field `components`.
  - **webhook**: Add **optional** `Webhook` field `components`. ([68b89bf](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/68b89bfa8c0d269db3d613cacb59b9d41614a99f))
- Remove `ipv4` format from `ip` field in `Botd`, `Identification`, `Visit` and `Webhook` models. ([b707bfa](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/b707bfa957362165dfe7fba01b43772db89d9f00))

### Patch Changes

- **related-visitors**: Add mention that the API is billable ([68b89bf](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/68b89bfa8c0d269db3d613cacb59b9d41614a99f))

## 6.0.0-test.0

### Major Changes

- Rename `EventUpdateRequest` type to `EventsUpdateRequest` ([54b92b2](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/54b92b2afa0efeacb2e510f98df74e133ef58aac))
- - Remove the `BrowserDetails` field `botProbability`.
  - Update the `IdentificationConfidence` field `score` type format: `float` -> `double`.
  - Make the `RawDeviceAttributeError` field `name` **optional** .
  - Make the `RawDeviceAttributeError` field `message` **optional** .
  - **events**: Remove the `EventsResponse` field `error`.
    - [note]: The errors are represented by `ErrorResponse` model.
  - **events**: Update the `HighActivity` field `dailyRequests` type format: `number` -> `int64`.
  - **events**: Specify the `Tampering` field `anomalyScore` type format: `double`.
  - **webhook**: Make the `Webhook` fields **optional**: `visitorId`, `visitorFound`, `firstSeenAt`, `lastSeenAt`, `browserDetails`, `incognito`.
  - **webhook**: Make the `WebhookClonedApp` field `result` **optional**.
  - **webhook**: Make the `WebhookDeveloperTools` field `result` **optional**.
  - **webhook**: Make the `WebhookEmulator` field `result` **optional**.
  - **webhook**: Make the `WebhookFactoryReset` fields `time` and `timestamp` **optional**.
  - **webhook**: Make the `WebhookFrida` field `result` **optional**.
  - **webhook**: Update the `WebhookHighActivity` field `dailyRequests` type format: `number` -> `int64`.
  - **webhook**: Make the `WebhookIPBlocklist` fields `result` and `details` **optional**.
  - **webhook**: Make the `WebhookJailbroken` field `result` **optional**.
  - **webhook**: Make the `WebhookLocationSpoofing` field `result` **optional**.
  - **webhook**: Make the `WebhookPrivacySettings` field `result` **optional**.
  - **webhook**: Make the `WebhookProxy` field `result` **optional**.
  - **webhook**: Make the `WebhookRemoteControl` field `result` **optional**.
  - **webhook**: Make the `WebhookRootApps` field `result` **optional**.
  - **webhook**: Make the `WebhookSuspectScore` field `result` **optional**.
  - **webhook**: Make the `WebhookTampering` fields `result`, `anomalyScore` and `antiDetectBrowser` **optional**.
  - **webhook**: Specify the `WebhookTampering` field `anomalyScore` type format: `double`.
  - **webhook**: Make the `WebhookTor` field `result` **optional**.
  - **webhook**: Make the `WebhookVelocity` fields **optional**: `distinctIp`, `distinctLinkedId`, `distinctCountry`, `events`, `ipEvents`, `distinctIpByLinkedId`, `distinctVisitorIdByLinkedId`.
  - **webhook**: Make the `WebhookVirtualMachine` field `result` **optional**.
  - **webhook**: Make the `WebhookVPN` fields **optional**: `result`, `confidence`, `originTimezone`, `methods`. ([68b89bf](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/68b89bfa8c0d269db3d613cacb59b9d41614a99f))
- - Rename `BotdResult` -> `Botd`.
  - Rename `BotdDetectionResult` -> `BotdBot`:
    - Extract `result` type as `BotdBotResult`.
  - Rename `ClonedAppResult` -> `ClonedApp`.
  - Rename `DeveloperToolsResult` -> `DeveloperTools`.
  - Rename `EmulatorResult` -> `Emulator`.
  - Refactor error models:
    - Remove `ErrorCommon403Response`, `ErrorCommon429Response`, `ErrorEvent404Response`, `TooManyRequestsResponse`, `ErrorVisits403`, `ErrorUpdateEvent400Response`, `ErrorUpdateEvent409Response`, `ErrorVisitor400Response`, `ErrorVisitor404Response`, `IdentificationError`, `ProductError`.
    - Introduce `ErrorResponse` and `ErrorPlainResponse`.
      - [note]: `ErrorPlainResponse` has a different format `{ "error": string }` and it is used only in `GET /visitors`.
    - Extract `error` type as `Error`.
    - Extract `error.code` type as `ErrorCode`.
  - Rename `EventResponse` -> `EventsGetResponse`.
  - Rename `EventUpdateRequest` -> `EventsUpdateRequest`.
  - Rename `FactoryResetResult` -> `FactoryReset`.
  - Rename `FridaResult` -> `Frida`.
  - Rename `IPLocation` -> `Geolocation`:
    - Rename `IPLocationCity` -> `GeolocationCity`.
    - Extract `subdivisions` type as `GeolocationSubdivisions`.
    - Rename `Location` -> `GeolocationContinent`:
    - Introduce a dedicated type `GeolocationCountry`.
    - Rename `Subdivision` -> `GeolocationSubdivision`.
  - Rename `HighActivityResult` -> `HighActivity`.
  - Rename `Confidence` -> `IdentificationConfidence`.
  - Rename `SeenAt` -> `IdentificationSeenAt`.
  - Rename `IncognitoResult` -> `Incognito`.
  - Rename `IpBlockListResult` -> `IPBlocklist`:
    - Extract `details` type as `IPBlocklistDetails`.
  - Rename `IpInfoResult` -> `IPInfo`:
    - Rename `IpInfoResultV4` -> `IPInfoV4`.
    - Rename `IpInfoResultV6` -> `IPInfoV6`.
    - Rename `ASN` -> `IPInfoASN`.
    - Rename `DataCenter` -> `IPInfoDataCenter`.
  - Rename `JailbrokenResult` -> `Jailbroken`.
  - Rename `LocationSpoofingResult` -> `LocationSpoofing`.
  - Rename `PrivacySettingsResult` -> `PrivacySettings`.
  - Rename `ProductsResponse` -> `Products`:
    - Rename inner types: `ProductsResponseIdentification` -> `ProductIdentification`, `ProductsResponseIdentificationData` -> `Identification`, `ProductsResponseBotd` -> `ProductBotd`, `SignalResponseRootApps` -> `ProductRootApps`, `SignalResponseEmulator` -> `ProductEmulator`, `SignalResponseIpInfo` -> `ProductIPInfo`, `SignalResponseIpBlocklist` -> `ProductIPBlocklist`, `SignalResponseTor` -> `ProductTor`, `SignalResponseVpn` -> `ProductVPN`, `SignalResponseProxy` -> `ProductProxy`, `ProxyResult` -> `Proxy`, `SignalResponseIncognito` -> `ProductIncognito`, `SignalResponseTampering` -> `ProductTampering`, `SignalResponseClonedApp` -> `ProductClonedApp`, `SignalResponseFactoryReset` -> `ProductFactoryReset`, `SignalResponseJailbroken` -> `ProductJailbroken`, `SignalResponseFrida` -> `ProductFrida`, `SignalResponsePrivacySettings` -> `ProductPrivacySettings`, `SignalResponseVirtualMachine` -> `ProductVirtualMachine`, `SignalResponseRawDeviceAttributes` -> `ProductRawDeviceAttributes`, `RawDeviceAttributesResultValue` -> `RawDeviceAttributes`, `SignalResponseHighActivity` -> `ProductHighActivity`, `SignalResponseLocationSpoofing` -> `ProductLocationSpoofing`, `SignalResponseSuspectScore` -> `ProductSuspectScore`, `SignalResponseRemoteControl` -> `ProductRemoteControl`, `SignalResponseVelocity` -> `ProductVelocity`, `SignalResponseDeveloperTools` -> `ProductDeveloperTools`.
    - Extract `identification.data` type as `Identification`.
  - Rename `RawDeviceAttributesResult` -> `RawDeviceAttributes`:
    - Extract item type as `RawDeviceAttribute`.
    - Extract `error` type as `RawDeviceAttributeError`.
  - Rename `RemoteControlResult` -> `RemoteControl`.
  - Rename `RootAppsResult` -> `RootApps`.
  - Rename `SuspectScoreResult` -> `SuspectScore`.
  - Extract new model `Tag`.
  - Rename `TamperingResult` -> `Tampering`.
  - Rename `TorResult` -> `Tor`.
  - Rename `VelocityResult` -> `Velocity`:
    - Rename `VelocityIntervals` -> `VelocityData`.
    - Rename `VelocityIntervalResult` -> `VelocityIntervals`.
  - Rename `VirtualMachineResult` -> `VirtualMachine`.
  - Rename the `Visit` field `ipLocation` type `DeprecatedIPLocation` -> `DeprecatedGeolocation`.
    - Instead of `DeprecatedIPLocationCity` use common `GeolocationCity`
  - Rename `Response` -> `VisitorsGetResponse`.
    - Omit extra inner type `ResponseVisits`
  - Rename `VpnResult` -> `VPN`.
    - Extract `confidence` type as `VPNConfidence`.
    - Extract `methods` type as `VPNMethods`.
  - Rename `WebhookVisit` -> `Webhook`.
    - Introduce new inner types: `WebhookRootApps`, `WebhookEmulator`, `WebhookIPInfo`, `WebhookIPBlocklist`, `WebhookTor`, `WebhookVPN`, `WebhookProxy`, `WebhookTampering`, `WebhookClonedApp`, `WebhookFactoryReset`, `WebhookJailbroken`, `WebhookFrida`, `WebhookPrivacySettings`, `WebhookVirtualMachine`, `WebhookRawDeviceAttributes`, `WebhookHighActivity`, `WebhookLocationSpoofing`, `WebhookSuspectScore`, `WebhookRemoteControl`, `WebhookVelocity`, `WebhookDeveloperTools`. ([68b89bf](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/68b89bfa8c0d269db3d613cacb59b9d41614a99f))
- Remove utility functions for checking error type, such as `isEventError`, `isUpdateEventError`, etc. ([a17b73f](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/a17b73f720bf3fd34f004b93959aeb968a27fc24))
- Reduce thrown errors to `TooManyRequestsError` and `RequestError` ([6f4076e](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/6f4076ec3ef5cfd212c292110be008c49fd516e5))
- Rename `VisitWebhook` type to `Webhook` ([980bab0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/980bab0e6c80e9763f07505a1273919b3e283776))

### Minor Changes

- Added new `ipEvents`, `distinctIpByLinkedId`, and `distinctVisitorIdByLinkedId` fields to the `velocity` Smart Signal. ([68b89bf](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/68b89bfa8c0d269db3d613cacb59b9d41614a99f))
- - Make the `GeolocationCity` field `name` **required**.
  - Make the `GeolocationSubdivision` field `isoCode` **required**.
  - Make the `GeolocationSubdivision` field `name` **required**.
  - Make the `IPInfoASN` field `name` **required** .
  - Make the `IPInfoDataCenter` field `name` **required**.
  - Add **optional** `IdentificationConfidence` field `comment`.
  - **events**: Add **optional** `Botd` field `meta`.
  - **events**: Add **optional** `Identification` field `components`.
  - **events**: Make the `VPN` field `originCountry` **required**.
  - **visitors**: Add **optional** `Visit` field `components`.
  - **webhook**: Add **optional** `Webhook` field `components`. ([68b89bf](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/68b89bfa8c0d269db3d613cacb59b9d41614a99f))
- Remove `ipv4` format from `ip` field in `Botd`, `Identification`, `Visit` and `Webhook` models. ([b707bfa](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/b707bfa957362165dfe7fba01b43772db89d9f00))

### Patch Changes

- **related-visitors**: Add mention that the API is billable ([68b89bf](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/68b89bfa8c0d269db3d613cacb59b9d41614a99f))

## 5.2.0

### Minor Changes

- **related-visitors**: Add GET `/related-visitors` endpoint ([4a28c16](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/4a28c16f8b9b4df240c020897765ca0b5946b980))
- **visitors**: Add the confidence field to the VPN Detection Smart Signal ([4a28c16](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/4a28c16f8b9b4df240c020897765ca0b5946b980))
- Deprecate `getVisitorHistory` method. Use `getVisits` instead. ([f28ba9d](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/f28ba9d337d251f783be63ce76dd6e9b4e9d96cb))
- **events**: Add `antiDetectBrowser` detection method to the `tampering` Smart Signal. ([4a28c16](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/4a28c16f8b9b4df240c020897765ca0b5946b980))

## 5.2.0-test.0

### Minor Changes

- **related-visitors**: Add GET `/related-visitors` endpoint ([4a28c16](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/4a28c16f8b9b4df240c020897765ca0b5946b980))
- **visitors**: Add the confidence field to the VPN Detection Smart Signal ([4a28c16](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/4a28c16f8b9b4df240c020897765ca0b5946b980))
- Deprecate `getVisitorHistory` method. Use `getVisits` instead. ([f28ba9d](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/f28ba9d337d251f783be63ce76dd6e9b4e9d96cb))
- **events**: Add `antiDetectBrowser` detection method to the `tampering` Smart Signal. ([4a28c16](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/4a28c16f8b9b4df240c020897765ca0b5946b980))

## 5.1.0

### Minor Changes

- **events**: Introduce `PUT` endpoint for `/events` API ([009c8f4](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/009c8f445a7c2d7bdacdbed97af8a0f418440e2c))

## 5.1.0-test.0

### Minor Changes

- **events**: Introduce `PUT` endpoint for `/events` API ([009c8f4](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/009c8f445a7c2d7bdacdbed97af8a0f418440e2c))

## [5.0.0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v4.1.2...v5.0.0) (2024-08-12)

### ⚠ BREAKING CHANGES

- rename `ErrorVisitsDelete400Response` to `ErrorVisitor400Response`
- rename `ErrorVisitsDelete404ResponseError` to `ErrorVisitor404ResponseError`
- rename `ErrorVisitsDelete404Response` to `ErrorVisitor404Respons
- renamed `status` in error object to `statusCode`
- to access response body in error use `responseBody` property, e.g: `error.responseBody`

### Features

- add remoteControl, velocity and developerTools signals ([45564cd](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/45564cd351a8c1c40de5b7442d9ed0685a32889f))
- improve thrown errors, introduce classes per specific error ([3a4975d](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/3a4975d6f2641cffd132dce48700895c9301e1cd))

### Bug Fixes

- make tag field optional for Webhook ([cff6198](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/cff61982ae13945e057a62d7db0004ae2bfe02c6))

## [4.1.2](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v4.1.1...v4.1.2) (2024-07-02)

### Bug Fixes

- use correct error type for `incognito`, `rawDeviceAttributes` and `tampering` in the `GetEvent` method ([ad66ae3](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/ad66ae3e93ea29ff0e41eaf07c17c3444c1a4a26))

## [4.1.1](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v4.1.0...v4.1.1) (2024-06-24)

### Bug Fixes

- add 400 and 429 status mappings for DELETE API ([8574924](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/8574924fbd6474795307d610de1220cd519282fc))
- provide raw HTTP response in errors that supports body related methods, such as `response.json()` ([6689b87](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/6689b871810e7131362c89deacabd6f5b62e3221))

## [4.1.0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v4.0.1...v4.1.0) (2024-06-17)

### Features

- add `isValidWebhookSignature` function for validating webhook signature [INTER-731] ([885b693](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/885b693c7fcfcd1abe4f6891ca7d3d87412db101))
- add delete API ([9f581ab](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/9f581ab514fb7675ea0439aa0b08075aa7ae254e))
- add os Mismatch ([c3ca8d7](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/c3ca8d7263341edb89cb650b6718a5e2230c4a81))
- add revision string field to confidence object ([a664c2d](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/a664c2ddb051d1bc0f3ef3fb19a1116933cdbd16))
- expose raw response in errors ([fd8e352](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/fd8e352c08eb79dc43bb5f0ffc0ca3830099ab33))
- make `Options.region` optional ([48c8024](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/48c8024ee46384d8692df041bbd38e44d83959fe))
- provide error as-is without serialization in `getEvent` method ([c21a7b6](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/c21a7b6af23a135242fddd390d99f11f38c2e47f))

### Documentation

- **README:** remove ipLocation field ([acb7c38](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/acb7c38b1cdde75e6d032fa0342d017320f36d03))

## [4.0.1](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v4.0.0...v4.0.1) (2024-03-26)

### Build System

- **deps:** remove redundant packages ([da386da](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/da386dae91fc8b3a2710b24c06178b9fa4235e85))

## [4.0.0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v3.1.0...v4.0.0) (2024-03-26)

### ⚠ BREAKING CHANGES

- change models for the most smart signals
- make identification field `confidence` optional
- deprecated `ipLocation` field uses `DeprecatedIpLocation` model

### Features

- add `linkedId` field to the `BotdResult` type ([52e0887](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/52e08875ce7480007471c18c03fc75b8c1c7e51e))
- add `SuspectScore` smart signal support ([d2917f3](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/d2917f30ccbc4079cce08d0b1d92e030d04c4620))
- add missed errors structures ([fa5121d](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/fa5121d41be4f081435c6c60e59cbdda0e0415b4))
- fix `ipLocation` deprecation ([e620f75](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/e620f75346077ce9705872fb95b04fb5b36d338c))
- make identification field `tag` required ([a919198](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/a919198405cb16c4edb0380110131b5e5c208c07))
- update `originCountry` field to the `vpn` signal ([fad2222](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/fad222222464352bacaef1cc32cf5552ca7607b1))
- use shared structures for webhooks and event ([c5380be](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/c5380be71057a6d6a2906702332e0abb87187def))

### Bug Fixes

- make fields required according to real API response ([999debf](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/999debf1bd8aa04c1e9475398a52bbe5059e6fbe))

## [3.1.0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v3.0.0...v3.1.0) (2024-01-31)

### Features

- add method for decoding sealed results ([4220fcd](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/4220fcdf299a3501286e1019b8f49b2196ceb767))

## [3.0.0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v2.4.0...v3.0.0) (2024-01-12)

### ⚠ BREAKING CHANGES

- `IpInfo` field `dataCenter` renamed to `datacenter`

### Features

- deprecate `IPLocation` ([035024d](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/035024daa155d41106c8b4e9119c6b11f9c94524))
- use `datacenter` instead of the wrong `dataCenter` ([4d294cb](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/4d294cb1f4b7fbeab8fb8c4a2223b8b0d194e470))

## [2.4.0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v2.3.3...v2.4.0) (2023-11-27)

### Features

- add `highActivity` and `locationSpoofing` signals, support `originTimezone` for `vpn` signal ([ce69197](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/ce6919774d1e21757722232c07adc8cdb9471f0a))

### Documentation

- **README:** use common logos in readme ([#87](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/issues/87)) ([8c6e3cd](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/8c6e3cdb076a2637852563d011a9c08b8ddc5d2b))

## [2.3.3](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v2.3.2...v2.3.3) (2023-10-17)

### Build System

- **deps:** bump @babel/traverse from 7.17.3 to 7.23.2 ([1617f26](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/1617f26d021919865eccb80527fc213b1c9eb5fe))
- **deps:** bump undici from 5.21.0 to 5.26.3 ([9f58385](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/9f583859a7038dcf82fec125193fc1cfbfe63266))

## [2.3.2](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v2.3.1...v2.3.2) (2023-09-21)

### Documentation

- **README:** add requirements section, polish readme INTER-257 ([#84](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/issues/84)) ([633b12b](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/633b12bc5766d7aa98a019c67a5c48260087c3f4))

## [2.3.1](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v2.3.0...v2.3.1) (2023-09-19)

### Bug Fixes

- update OpenAPI Schema with `asn` and `dataCenter` signals ([e10f677](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/e10f677d78ddd3f68019b9e1fcd0d447b978c5a3))
- update OpenAPI Schema with `auxiliaryMobile` method for VPN signal ([72f5ada](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/72f5adafeb9abcb691dd5b34afb611c63c810299))

### Build System

- **deps:** bump semver from 5.7.1 to 5.7.2 ([10427f0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/10427f07575cda54405924ff703dc9699029366d))
- **deps:** bump tough-cookie from 4.0.0 to 4.1.3 ([5c7d259](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/5c7d25908eee6a9bea21bf67a64edf79c76e9abf))
- **deps:** bump word-wrap from 1.2.3 to 1.2.5 ([f3a576d](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/f3a576d5edc0a2c5b17c0b6363458240a454b803))

## [2.3.0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v2.2.0...v2.3.0) (2023-07-31)

### Features

- add raw device attributes support ([9f7adba](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/9f7adbac8de66d29edb7d98e6e3f7bc81f49602e))
- add smart signals support ([d847128](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/d847128d19dc18320750ed3505af94176afbe601))

### Documentation

- **README:** add `Region.AP` to example values ([061242f](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/061242f313cf2f6a2f1cc0d6129e8e36099bedf3))

## [2.2.0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v2.1.0...v2.2.0) (2023-06-12)

### Features

- update schema with correct `IpLocation` format and doc updates ([21e943a](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/21e943a1fdc91c9d48acfb3137699352f0e3d20d))

## [2.1.0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v2.0.1...v2.1.0) (2023-05-16)

### Features

- introduce more signals ([a981440](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/a9814404ade63ca8f4857aa96cfb22c5a4604b6d))

## [2.0.1](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v2.0.0...v2.0.1) (2023-04-14)

### Bug Fixes

- refactor bundle names and add `exports` section for better compatibility with nextjs ([d4a0da0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/d4a0da0326ee9f8638e9c35470309ddbef71e9a1))

### Build System

- **deps:** bump ArtiomTr/jest-coverage-report-action ([bd2a316](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/bd2a3162b2d51d2b4449527a85b6dc51f0486dbf))
- **deps:** bump http-cache-semantics from 4.1.0 to 4.1.1 ([afce4df](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/afce4dfff8dbab7493f4fd90953d7b2a9070f1ff))
- **deps:** bump undici from 5.9.1 to 5.21.0 ([9cb735f](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/9cb735f2ef7fbf30bb0b073f3d34e3c24875c4aa))

## [2.0.0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v1.4.0...v2.0.0) (2023-01-30)

### ⚠ BREAKING CHANGES

- Change error reporting.
  `getVisitorHistory` and `getEvent` methods throw an exception in case of errors.

### Features

- update schema, rework error reporting ([baea2f7](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/baea2f7fff8a2d2350a67986c2f054217671fbef))

### Bug Fixes

- eslint error ([387fd4a](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/387fd4aefc2a8d06f166086dbfaabe13c1590611))
- improve error reporting for `getEvents`, add more tests ([ffb00a3](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/ffb00a39d2598486cb10eacfe3180c0738c561c3))
- remove unnecessary checks from the example ([e6dd2fd](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/e6dd2fd838c459ba4736e7b17efd1f2f2ed56ae8))
- remove unreachable code ([3fa05d6](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/3fa05d6adb0061d13cf2c571b56c1609c64460d6))
- retry-after with empty header ([e1bfba5](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/e1bfba5c92d34fb40df13f28914b0aead7d76453))
- review fix for error serialisation ([d6e0a74](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/d6e0a7411780b08c3995c5470c8856c7111c34f1))
- use generic typeguards for errors ([c415874](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/c4158748a86315d809686bf562314862edb95880))

### Build System

- **deps:** bump json5 from 2.2.1 to 2.2.3 ([dd19516](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/dd19516aeb9ff3f4b948dac98d017b64e73c338a))

## [1.4.0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v1.3.0...v1.4.0) (2022-10-25)

### Features

- update schema to support url field for botd result ([b293c09](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/b293c09bcc92ea8ca8d70d4d7403a2cd359e610b))

## [1.3.0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v1.2.1...v1.3.0) (2022-09-14)

### Features

- improve type names ([66e1515](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/66e1515c2517a7d5e0443be5611495df7de09057))
- introduce /event/{request_id} endpoint ([f06456f](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/f06456f7f98ba0a71b5c3703d889c9a8d7846da6))

## [1.2.1](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v1.2.0...v1.2.1) (2022-08-19)

### Build System

- **deps:** bump undici from 5.8.0 to 5.9.1 ([33496f2](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/33496f248175b002fba7a64a397589f9c558af8f))

## [1.2.0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v1.1.4...v1.2.0) (2022-08-18)

### Features

- add example ([59617c3](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/59617c3cd743d000cb7ce6029dcda06a8e72c47b))
- send integration info with request ([0530a76](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/0530a76fced9d8b4991de6195df3f210a0c5e9a0))

## [1.1.4](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v1.1.3...v1.1.4) (2022-07-22)

### Build System

- **deps:** bump undici from 5.5.1 to 5.8.0 ([2302572](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/2302572108e40be3856dc86fb0903927a1bf2a10))

## [1.1.3](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v1.1.2...v1.1.3) (2022-07-13)

### Bug Fixes

- use Webhook type from OpenApi ([4bf7ebf](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/4bf7ebf102d21af477176cc2f38621179f6102d7))

## [1.1.2](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/compare/v1.1.1...v1.1.2) (2022-07-13)

#### 1.1.1 (2022-07-08)

##### Chores

- ignore engines when installing packages ([46ff4b63](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/46ff4b6348d5efcb88a5722831b6af4c3a581e6a))
- use packages cache for build command, use yarn to install modules ([60612ff4](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/60612ff4d9a495f10c7e953b651768eb607908f2))
- use default node version when publish package ([1ec30082](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/1ec30082ec44d0da9fc4977dc9a2fcd47e236c4a))

### 1.1.0 (2022-07-08)

##### Chores

- return ts target to es2015 ([4b496215](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/4b496215f51a87df7e8d4ae6cce80737dd03c0bd))
- change build command ([b642cdf8](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/b642cdf8855b3cefbf6f097bbddd5d82bfe66a29))
- use rollup to build project ([90baa5d4](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/90baa5d4d85887da86c7b771991f03719e4cdfaf))
- add production environment for publish task ([1f3dc518](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/1f3dc518e836b474afb1d351e17011316eff32be))

##### Documentation Changes

- update logo ([6ab38802](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/6ab38802f39a7fdc5297a81f2f08a05c248c1233))
- use absolute url to logo ([22232f36](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/22232f36ddf0b09a1cfbf90cff31a78b59dfbcf4))
- update domain from fingerprintjs.com to fingerprint.com ([d32ffb16](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/d32ffb16aa12f768591f0e5d2d4e52cece264344))
- update logo ([4ec03490](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/4ec0349096c68775e3b6bea3b324265a51a5c3ba))

##### New Features

- generate types using OpenAPI ([3136d5ac](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/3136d5ace2ad23558ff9dfccc4297a984982cd9c))

##### Bug Fixes

- add missed fields to the VisitWebhook type ([1422eb02](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/1422eb02049b5a5a71c703d8e122b800934a38c0))

#### 1.0.6 (2022-05-13)

##### Documentation Changes

- remove beta tag ([b5a091c5](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/b5a091c5d5f80234706b8a334b8328ae4d8c64ea))

#### 1.0.5 (2022-04-21)

##### Bug Fixes

- ap region URL ([aba47938](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/aba47938bd180eaae492f8a44bb6340c7aa8fece))

#### 1.0.4 (2022-04-21)

##### Chores

- another attempt to fix git issue with safe.directory ([675e1749](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/675e1749fe576856a07647fcb2b7b83e1f9088c3))

#### 1.0.3 (2022-04-21)

##### Chores

- another work around to make publish work ([ef40e525](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/ef40e5253185434c1e2ca1ad1baaa1299c140bc9))

#### 1.0.2 (2022-04-21)

##### Chores

- update checkout action version ([b6446386](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/b6446386c3006e6ab2f758ccfa9a0decc2fb3b20))

#### 1.0.1 (2022-04-21)

##### Chores

- try a new git version workaround to publish the new version to npm ([99e1f05d](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/99e1f05d9f9d08e37e904e2d7c7a395549eb8ee1))

## 1.0.0 (2022-04-20)

##### Build System / Dependencies

- add "--no-git-tag-version" flag to release commands ([b8f2bc77](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/b8f2bc7727f0f09b8f83f24e795f6ae29d60b36b))
- use generate-changelog for releases ([a9d2b336](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/a9d2b336df2270306e1c2a01f90c3ca058f0df3e))

##### Chores

- move "generate-changelog" to dev dependencies ([f57c5ae3](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/f57c5ae3220de6c360adfe4310064c06cbab20b5))
- remove changelog ([4a32ec30](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/4a32ec30d4c217131d9c12f7af7d7b27c02fbade))
- format existing mocked response data ([b000f361](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/b000f361b7a0e25811c4dbe729ece0cd5a3b13ed))
- use npm-publish action by SHA for security reasons ([4ff1b409](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/4ff1b409f325b4729d4a652a77f2df6b535d2217))
- don't use npx to run jest ([d0426e3c](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/d0426e3c553499c390851d82e0a40f30e2a49bf5))
- add lint job to github actions, fix command to run test job ([e7044f16](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/e7044f16ee2b20cf23eaaa3490d65abced21f558))
- add deps to repair eslint and prettier, fix eslint and prettier rules ([de0f7e53](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/de0f7e53edcd59c81a933cd0c8c446269edb2515))
- migrate from npm to yarn ([1c112ae5](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/1c112ae5c7e0a799d7cfa713853b066f1d610fcc))
- ignore .idea folder ([6bb5fe90](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/6bb5fe902f2b91c6aa5c4440f14d25a9395a39ab))

##### Continuous Integration

- add missing node setup action ([c3371b8d](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/c3371b8d5f819ca7b3407ce4f549f5b55a5954f7))

##### Documentation Changes

- better formatting, add links, extend example ([93147b85](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/93147b859ca907e0b780dfea0b4d74025d22d4d4))
- update readme ([a68dddad](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/a68dddadb0cb9f96295aeca9d25cf940686de456))
- add CODEOWNERS and contributing guide ([a30fc0d3](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/a30fc0d3d63a1989fb9524780caf4816cf31fc3e))
- update readme.md ([12685b7d](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/12685b7d909e60ebf247dd851e44a2bc63bc129e))
- update src/types.ts ([e5cdd25d](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/e5cdd25d2618921b254bcf06346880dca43ed4c1))
- update readme.md ([adee5c70](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/adee5c7054e973c5e7d43f84ee335099cf0224e1))
- add ci badge, fix markup formatting ([ea517213](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/ea517213d53ff6dfc49328588ccfcc23860b8d8b))
- add installing using yarn instruction ([f02626e7](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/f02626e754f0e0ed6c315ab9d86d9ca2a982649d))

##### New Features

- support passing custom fetch implementation in options ([80bf983c](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/80bf983c3f901c1ebe477cc79aecfbea657fb8e0))
- replace "querystring" with "URLSearchParams" ([6a34d0bb](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/6a34d0bb95d3647aa315b0a462aff22af238f11d))
- add confidence score, visitor found, and timestamps to data types ([97d8c39a](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/97d8c39aa71b36cd302581cbc450d1f9f35e1ca5))
- rename token to api key ([6d08efe0](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/6d08efe0d17d8e8c265b502f5f2c86d61cf534e6))
- add Asia region (ap) ([539f071d](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/539f071df4bc04368677e505e202effa48a8bdf2))

##### Bug Fixes

- fix typo ([d6a9396b](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/d6a9396b5f845d4273129b170c9a61210540945c))
- change subdivisons type from tuple to array ([a9947493](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/a994749314bdedd5dfa85f30acb530ecd02498e3))
- removed unnecessary commented code from test ([cbcf87e7](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/cbcf87e7631dca2ab78cb64736c3c541bea4a18a))
- simplify Promise chain and add negative test ([adc94d83](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/adc94d838d85e048c6bf63f4199802a20cdde13d))

##### Other Changes

- lint fixes ([ff526eee](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/commit/ff526eeef9a5c19e1fdf3922db79e08e171d73d8))
