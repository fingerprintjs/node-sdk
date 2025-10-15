<p align="center">
  <a href="https://fingerprint.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://fingerprintjs.github.io/home/resources/logo_light.svg" />
      <source media="(prefers-color-scheme: light)" srcset="https://fingerprintjs.github.io/home/resources/logo_dark.svg" />
      <img src="https://fingerprintjs.github.io/home/resources/logo_dark.svg" alt="Fingerprint logo" width="312px" />
    </picture>
  </a>
</p>
<p align="center">
  <a href="https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/actions/workflows/build.yml"><img src="https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/actions/workflows/build.yml/badge.svg" alt="Build status"></a>
  <a href="https://fingerprintjs.github.io/fingerprintjs-pro-server-api-node-sdk/coverage"><img src="https://fingerprintjs.github.io/fingerprintjs-pro-server-api-node-sdk/coverage/badges.svg" alt="coverage"></a>
  <a href="https://www.npmjs.com/package/@fingerprint/fingerprint-server-sdk"><img src="https://img.shields.io/npm/v/@fingerprint/fingerprint-server-sdk.svg" alt="Current NPM version"></a>
  <a href="https://www.npmjs.com/package/@fingerprint/fingerprint-server-sdk"><img src="https://img.shields.io/npm/dm/@fingerprint/fingerprint-server-sdk.svg" alt="Monthly downloads from NPM"></a>
  <a href="https://discord.gg/39EpE2neBg"><img src="https://img.shields.io/discord/852099967190433792?style=logo&label=Discord&logo=Discord&logoColor=white" alt="Discord server"></a>
</p>

# Fingerprint Server Node.js SDK

[Fingerprint](https://fingerprint.com) is a device intelligence platform offering industry-leading accuracy.

The Fingerprint Server Node SDK is an easy way to interact with the Fingerprint [Server API](https://dev.fingerprint.com/reference/pro-server-api) from your Node application. You can search, update, or delete identification events.

## Requirements

TypeScript support:

- TypeScript 4.5.5 or higher

Supported runtimes:

- Node.js 18 LTS or higher (we support all [Node LTS releases before end-of-life](https://nodejs.dev/en/about/releases/)).
- Deno and Bun might work but are not actively tested.
- "Edge" runtimes might work with some modifications but are not actively tested. <details>
  <summary>See "edge" runtimes compatibility</summary>

  This SDK can be made compatible with JavaScript "edge" runtimes that do not support all Node APIs, for example, [Vercel Edge Runtime](https://edge-runtime.vercel.app/), or [Cloudflare Workers](https://developers.cloudflare.com/workers/).

  To make it work, replace the SDK's built-in `fetch` function (which relies on Node APIs) with the runtime's native `fetch` function. Pass the function into the constructor with proper binding:

  ```js
  const client = new FingerprintJsServerApiClient({
    region: Region.EU,
    apiKey: apiKey,
    fetch: fetch.bind(globalThis),
  })
  ```

</details>

## How to install

Install the package using your favorite package manager:

- NPM:

  ```sh
  npm i @fingerprint/fingerprintjs-server-sdk
  ```

- Yarn:
  ```sh
  yarn add @fingerprint/fingerprintjs-server-sdk
  ```
- pnpm:
  ```sh
  pnpm i @fingerprint/fingerprintjs-server-sdk
  ```

## Getting started

Initialize the client instance and use it to make API requests. You need to specify your Fingerprint [Secret API key](https://dev.fingerprint.com/docs/quick-start-guide#4-get-smart-signals-to-your-server) and the region of your Fingerprint workspace.

```ts
import {
  FingerprintJsServerApiClient,
  Region,
} from '@fingerprint/fingerprint-server-sdk'

const client = new FingerprintJsServerApiClient({
  apiKey: '<SECRET_API_KEY>',
  region: Region.Global,
})

// Get visit history of a specific visitor
client.searchEvents({ visitor_id: '<visitorId>' }).then((visitorHistory) => {
  console.log(visitorHistory)
})

// Get a specific identification event
client.getEvent('<eventId>').then((event) => {
  console.log(event)
})

// Search for identification events
client
  .searchEvents({
    limit: 10,
//    pagination_key: previousSearchResult.paginationKey,
    suspect: true,
  })
  .then((events) => {
    console.log(events)
  })
```

See the [Examples](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/tree/main/example) folder for more detailed examples.

### Error handling

The Server API methods can throw `RequestError`.
When handling errors, you can check for it like this:

```typescript
import {
  RequestError,
  FingerprintJsServerApiClient,
  TooManyRequestsError,
} from '@fingerprint/fingerprint-server-sdk'

const client = new FingerprintJsServerApiClient({
  apiKey: '<SECRET_API_KEY>',
  region: Region.Global,
})

// Handling getEvent errors
try {
  const event = await client.getEvent(eventId)
  console.log(JSON.stringify(event, null, 2))
} catch (error) {
  if (error instanceof RequestError) {
    console.log(error.responseBody) // Access parsed response body
    console.log(error.response) // You can also access the raw response
    console.log(`error ${error.statusCode}: `, error.message)
  } else {
    console.log('unknown error: ', error)
  }
}
```

### Webhooks

#### Webhook types

When handling [Webhooks](https://dev.fingerprint.com/docs/webhooks) coming from Fingerprint, you can cast the payload as the built-in `VisitWebhook` type:

```ts
import { Event } from '@fingerprint/fingerprint-server-sdk'

const visit = visitWebhookBody as unknown as Event
```

#### Webhook signature validation

Customers on the Enterprise plan can enable [Webhook signatures](https://dev.fingerprint.com/docs/webhooks-security) to cryptographically verify the authenticity of incoming webhooks.
This SDK provides a utility method for verifying the HMAC signature of the incoming webhook request.

To learn more, see [example/validateWebhookSignature.mjs](example/validateWebhookSignature.mjs) or read the [API Reference](https://fingerprintjs.github.io/fingerprintjs-pro-server-api-node-sdk/functions/isValidWebhookSignature.html).

### Sealed results

Customers on the Enterprise plan can enable [Sealed results](https://dev.fingerprint.com/docs/sealed-client-results) to receive the full device intelligence result on the client and unseal it on the server. This SDK provides utility methods for decoding sealed results.

To learn more, see [example/unsealResult.mjs](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/tree/main/example/unsealResult.mjs) or the [API Reference](https://fingerprintjs.github.io/fingerprintjs-pro-server-api-node-sdk/functions/unsealEventsResponse.html).

### Deleting visitor data

Customers on the Enterprise plan can [Delete all data associated with a specific visitor](https://dev.fingerprint.com/reference/deletevisitordata) to comply with privacy regulations. See [example/deleteVisitor.mjs](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/tree/main/example/deleteVisitor.mjs) or the [API Reference](https://fingerprintjs.github.io/fingerprintjs-pro-server-api-node-sdk/classes/FingerprintJsServerApiClient.html#deleteVisitorData).

## API Reference

See the full [API reference](https://fingerprintjs.github.io/fingerprintjs-pro-server-api-node-sdk/).

## Semantic versioning

* Changes to **types** in this repository are considered non-breaking and are usually released as PATCH or MINOR semver changes (otherwise every schema addition would be a major version upgrade).
* It is highly recommended that you lock your package version to a specific PATCH release and upgrade with the expectation that types may be upgraded between any release.
* The runtime (non-type-related) public API of the Node SDK still follows semver strictly.

## Support and feedback

To report problems, ask questions, or provide feedback, please use [Issues](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/issues). If you need private support, you can email us at [oss-support@fingerprint.com](mailto:oss-support@fingerprint.com).

## License

This project is licensed under the [MIT license](https://github.com/fingerprintjs/fingerprintjs-pro-server-api-node-sdk/tree/main/LICENSE).
