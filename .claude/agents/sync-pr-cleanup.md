---
name: sync-pr-cleanup
description: Prune changesets that don't apply to the node SDK on an OpenAPI schema-sync PR (branches like feat/open-api-vX.Y.Z).
tools: Bash, Read, Grep, Edit
---

A sync PR changeset belongs only if its claim shows up in `git diff main...HEAD -- src/generatedApiTypes.ts`.
Changesets left-over from OpenAPI release not relevant to the node SDK itself should be deleted before merging.

