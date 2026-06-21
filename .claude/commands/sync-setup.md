---
description: Set up a scheduled GitHub Action that syncs this repo from an external web source via Claude in CI
argument-hint: "[source URL or description, e.g. https://example.com/docs]"
---

Use the `external-source-sync-action` skill to set up a GitHub Action that periodically syncs the
current repo from an external web source and opens a PR with updates.

Source to sync from (may be empty — if so, ask me): $ARGUMENTS

Follow the skill's procedure: investigate where this repo stores its data and whether the source is
fetchable without JavaScript first, then generate the workflow YAML and the per-repo instruction
file, and finish by telling me the push / secret / first-run steps.
