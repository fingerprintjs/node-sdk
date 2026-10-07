# Contributing to FingerprintJS Server API Node.js SDK

## Working with code

We prefer using [pnpm](https://pnpm.io/) for installing dependencies and running scripts.

### Prerequisites

- [Node.js](https://nodejs.org/) 22.13.0+ (required for local development and CI, consumer Node requirement is defined in `package.json`'s `engines.node` field)
- [pnpm](https://pnpm.io/) `11.9.0` (pinned via the `packageManager` field in [package.json](./package.json); enable [Corepack](https://nodejs.org/api/corepack.html) to use it)

The main branch is locked for the push action. For proposing changes, use the standard [pull request approach](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request). It's recommended to discuss fixes or new functionality in the Issues, first.

### Commit messages

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) standard. [commitlint](https://commitlint.js.org/) checks the messages of all commits in a pull request in the `Analyze Commit Messages` check, using the [@fingerprintjs/commit-lint-dx-team](https://www.npmjs.com/package/@fingerprintjs/commit-lint-dx-team/v/0.1.0) config.

#### Git hooks

[Husky](https://typicode.github.io/husky/) installs these Git hooks when you run `pnpm install`:

- `commit-msg` checks the commit message with commitlint and rejects the commit if the message is invalid.
- `pre-commit` runs [lint-staged](https://github.com/lint-staged/lint-staged), which runs `pnpm lint:fix` on the staged `.ts` files.
- `pre-push` tries to stop accidental pushes to `main`.

### How to regenerate the types

Run the following command that will regenerate types:

```shell
pnpm generateTypes
```

It uses schema stored in [resources/fingerprint-server-api.yaml](resources/fingerprint-server-api.yaml). To fetch the latest schema run:

```shell
./sync.sh
```

### How to build

Just run:

```shell
pnpm build
```

### How to build API reference documentation

Run:

```shell
pnpm run docs
```

### Code style

The code style is controlled by [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/). Run to check that the code style is ok:

```shell
pnpm lint
```

You aren't required to run the check manually, the CI will do it. Run the following command to fix style issues (not all issues can be fixed automatically):

```shell
pnpm lint:fix
```

### Running tests

Tests are located in `tests` folder and run by [vitest](https://vitest.dev/) in node environment.

To run tests you can use IDE instruments or just run:

```shell
pnpm test
```

The test might fail to due outdated snapshots. You can update snapshots by running: 

```shell
pnpm test -- --update
```

### Testing the local source code of the SDK

Use the `example` folder to make API requests using the local version of the SDK. The [example/package.json](./example/package.json) file reroutes the SDK import references to the project root folder.

1. Create an `.env` file inside the `example` folder according to [.env.example](/example/.env.example).
2. Install dependencies and build the SDK (inside the root folder):

   ```shell
   pnpm install
   pnpm build
   ```

3. Install dependencies and run the examples (inside the `example` folder)):

   ```shell
   cd example
   pnpm install
   node getEvent.mjs
   node searchEvents.mjs
   ```

Every time you change the SDK code, you need to rebuild it in the root folder using `pnpm build` and then run the example again.

### How to publish

We use [changesets](https://github.com/changesets/changesets) to version the SDK and to write release notes.

#### Adding a changeset

If your PR changes the SDK's public API or behavior, add a changeset to it:

```shell
pnpm install
pnpm exec changeset
```

Pick the bump type and write a short summary. The command creates a markdown file in the [.changeset](./.changeset) folder. Commit it together with the rest of your changes. The summary is copied as-is into `CHANGELOG.md` and the GitHub release notes, so write it for SDK users:

```md
---
'@fingerprint/node-sdk': minor
---

Add `device_details` smart signal to the event model
```

Pick the bump type that matches the commit type:

| Change | Commit type | Changeset bump | Version change |
|---|---|---|---|
| Bug fix | `fix` | `patch` | 7.8.0 -> 7.8.1 |
| New backward-compatible feature | `feat` | `minor` | 7.8.0 -> 7.9.0 |
| Breaking change | Any `<type>!` (for example, `feat!`) or a `BREAKING CHANGE:` footer | `major` | 7.8.0 -> 8.0.0 |
| Docs, tests, CI, refactoring and other internal changes | `docs`, `test`, `ci`, `refactor`, `chore`, ... | No changeset | No release |

If a PR has several user-facing changes, add one changeset for each. When several changesets are released together, the highest bump wins.

#### Release flow

1. On every PR, a bot comments with a preview of the release notes that the PR's changesets will produce. If the PR has no changesets, the comment reminds you to add one.
2. After a PR with changesets is merged to `main`, the [Release](./.github/workflows/release.yml) workflow opens a `Release [changeset]` PR, or updates it if it's already open. That PR consumes all pending changesets, bumps the version and updates `CHANGELOG.md`.
3. Merging the `Release [changeset]` PR creates the Git tag and the GitHub release. The same workflow publishes the package to npm.
