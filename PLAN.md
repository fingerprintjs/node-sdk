# Dependency update plan — Ecosystem care Q2/2027

Branch: `care/update-deps` · Jira: INTER-1527 · SDK: `@fingerprint/node-sdk`

## Context

The root `package.json` has **zero runtime dependencies** — everything is `devDependencies`, and
the published artifact is a Rollup bundle. The only consumer-facing knob touched by a dependency
update is `engines.node`. Per decision, **`engines.node` stays `>=18.17.0`** (consumer contract
unchanged); dev/CI tooling may require Node 22.

CI already builds the toolchain on Node 22 and only runs `node smokeTests.mjs` against the built
`dist` artifact on the Node 18–23 matrix, so latest devDeps that require Node ≥20/22 are safe.

Already done in prior work (do **not** redo): type-aware ESLint config adopted;
`@fingerprintjs/eslint-config-dx-team@2.0.0` & `tsconfig-dx-team@0.0.2` already latest;
`openapi-typescript@7.13.0` already latest; pnpm 11.9.0; CI reusable-workflow migration.

## Two deliberate caps that override "latest"

1. **`typescript` → `6.0.3`, NOT `7.0.2`.** `typescript-eslint@8.63` peer is `>=4.8.4 <6.1.0`,
   `typedoc@0.28` and `rollup-plugin-dts@6.4` cap at TS `6.0.x`. TS 7 (native compiler) would break
   type-aware lint, `typedoc`, and `.d.ts` bundling simultaneously. Re-evaluate next year.
2. **`@types/node` → `^18` (latest 18.19.x), NOT `26`.** Pinned to the `engines` floor so the build
   catches use of Node APIs absent in Node 18.

## Target versions

| Package | From | To |
| --- | --- | --- |
| typescript | ^5.4.0 | **~6.0.3** (cap) |
| @types/node | ^20.11.30 | **^18.19.x** (cap) |
| typescript-eslint | (via config) | ^8.63.0 |
| typedoc | ^0.27.9 | ^0.28.20 |
| rimraf | ^5.0.5 | ^6.1.3 |
| lint-staged | ^15.2.2 | ^17.0.8 |
| husky | ^9.0.11 | ^9.1.7 (+ fix `prepare` script) |
| @commitlint/cli | ^19.2.1 | ^21.2.1 |
| @changesets/cli | ^2.27.8 | ^2.31.0 |
| vitest | ^3.2.4 | ^4.1.10 |
| @vitest/coverage-v8 | ^3.2.4 | ^4.1.10 |
| rollup | ^4.34.9 | ^4.62.2 |
| rollup-plugin-license | ^3.3.1 | ^3.7.1 |
| @rollup/plugin-typescript | ^11.1.6 | ^12.3.0 |
| tslib | ^2.6.2 | ^2.8.1 |
| yaml | ^2.6.0 | ^2.9.0 |
| commitizen | ^4.3.0 | ^4.3.2 |
| dotenv (example + functional-tests) | ^16.4.5 | ^17.4.2 |
| openapi-typescript | ^7.13.0 | ^7.13.0 (already latest) |
| @rollup/plugin-json, rollup-plugin-dts, rollup-plugin-peer-deps-external, buffer, cz-conventional-changelog | — | already latest, floor bumps only |
| @fingerprintjs/* toolkit pkgs | — | already latest, no change |

Let `pnpm update --latest` drive the non-capped packages; then manually pin `typescript` and
`@types/node` to the capped ranges and re-install.

## Work items

1. **devDep bumps** — apply target versions in all three `package.json` files (root, `example`,
   `tests/functional-tests`), `pnpm update --latest`, then override the two caps. Reconcile ranges.
2. **husky** — change `prepare` script `husky install` → `husky` (9.1 deprecation). Drop the
   deprecated first two lines from `.husky/*` hook files if present.
3. **`pnpm dedupe`** — run it; `pnpm dedupe --check` must be clean.
4. **corepack** — set `packageManager` to `pnpm@11.9.0+sha512.<hash>`. Generate the hash with
   `corepack use pnpm@11.9.0` (do NOT hand-fabricate it).
5. **GitHub Actions** — bump official actions by major (`actions/checkout@v4→v5`,
   `actions/setup-node@v4→v5`, `actions/download-artifact@v4→v5`), bump `pnpm/action-setup` to the
   latest pinned commit SHA, clear any Node-20 deprecation warnings. Leave 1st-party
   `fingerprintjs/dx-team-toolkit/*@v1` reusable workflows as-is.
6. **Drop `tsx`** — run `generate.mts` via native Node (22.18+ type-stripping). Update the
   `generateTypes` script. Keep `tsx` only if native execution isn't clean; note the outcome.
7. **CI Node matrix** — add Node `24` to `functional_tests.yml` `[18,19,20,21,22,23]` (add, don't
   prune; keep `18` as the floor).
8. **Regenerate types** — run `pnpm generateTypes` after bumps; review the `src/generatedApiTypes.ts`
   diff. Add a changeset **only if** the public `.d.ts` type shape changes; otherwise this is a
   dev-only PR (no changeset, no release).

## Done-gate

Full local gate + green PR CI:

- `pnpm build`
- `pnpm lint` (0 warnings)
- `pnpm typecheck:source` + `typecheck:tests` + `typecheck:tooling` + `typecheck:examples`
- `pnpm test`
- `pnpm test:dts`
- `pnpm generateTypes` clean, diff reviewed
- `pnpm dedupe --check` clean
- lockfile reproducible (`pnpm install --frozen-lockfile`)
- functional smoke tests on the Node matrix verified via **PR CI** (need secrets — can't run locally)

## Out of scope / moot

`engines.node` bump; Dependabot (no config exists — moot); Trusted Publishing; README/webhooks/
contributing content edits; Snyk as a separate chase (bumps should clear alerts incidentally);
TypeScript 7 (blocked upstream).
