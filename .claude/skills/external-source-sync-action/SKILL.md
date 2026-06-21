---
name: external-source-sync-action
description: >-
  Set up a GitHub Action that periodically syncs an external web source (a docs site, a public
  library/catalog, a changelog, an upstream page) into the current repo by running Claude Code in
  CI, then opens a pull request with the updates. Use this whenever the user wants to "keep this
  repo in sync with <website>", "auto-update from an external source", "scrape/mirror a site on a
  schedule", "set up a weekly sync workflow", "watch an upstream page for new entries", or asks to
  reproduce a sync workflow like sync-loops/sync-open-skills for a new repo — even if they don't
  say the word "skill" or "Action". Produces a hardened workflow YAML plus a per-repo instruction
  file, and walks the user through the secret + first run.
---

# External-source sync GitHub Action

Set up a scheduled (and manually runnable) GitHub Action that keeps a repo in sync with an external
web source, using `anthropics/claude-code-action` to do the editorial work a plain scraper can't.

## When this applies

The user wants a repo to track an upstream website that changes over time — new entries get added
to the source, and the repo should pick them up. The repo's content is often **derived/rewritten**
from the source (custom structure, generated fields), so a `curl | jq` script won't do — an LLM in
CI is the point.

## The architecture (two files)

1. **Workflow YAML** (`.github/workflows/<name>.yml`) — the *trigger*. Thin and ~90% boilerplate:
   schedule + manual button, the pinned Claude action, the auth token, a timeout, and a deduped
   failure-issue step. Generate it from `assets/sync-workflow.yml.template`.
2. **Instruction file** (`.claude/<name>.md`) — the *logic*. All per-repo behavior lives here; the
   workflow's only real instruction is `"Read .claude/<name>.md and follow it exactly."` Write this
   fresh per repo using `references/instruction-file-guide.md`.

This split keeps fragile YAML stable and puts changeable logic in plain prose.

## Procedure

Work through these in order. Steps 1–2 are investigation and must happen *before* you write the
instruction file — what you find determines its shape.

### 1. Understand where the repo stores its data

Do not assume the rendered page holds the content. Find the real data source:
- A static site usually renders from a data file (`script.js`, a JSON/YAML file, `_data/`,
  frontmatter). Grep for the visible item names to locate it.
- Note any **hardcoded derived values** (counts in headings, totals in the README, fields generated
  at runtime) that must be kept consistent when items are added.

### 2. Check whether the source is fetchable without JavaScript

The CI action fetches like a no-JS client. Verify what's actually reachable before designing
detection (this check is cheap and prevents building logic that can never run):
- Fetch the source page. If it's a JS shell, look for static sub-pages, `sitemap.xml`, or an
  RSS/JSON feed exposing the items.
- If **item names are reachable** → diff by name (catches renames). If **only counts are
  reachable** → count-based detection, and say so in the instruction file. If **nothing** is
  reachable → the honest design is "detect a delta → open an issue for a human," not auto-enrich.

See `references/instruction-file-guide.md` for the detection and editorialization details.

### 3. Write the instruction file

Generate `.claude/<name>.md` following `references/instruction-file-guide.md`. It must cover: where
the data lives, the source URLs, detection strategy, the field-by-field shape of a new record (in
the repo's existing voice, marked as drafts), count/consistency updates, PR rules (branch, update
existing sync PR not a duplicate, never push default branch, review checklist in the body),
no-change/failure rules, and a `$GITHUB_STEP_SUMMARY` verdict line every run.

### 4. Write the workflow file

Copy `assets/sync-workflow.yml.template` to `.github/workflows/<name>.yml` and fill placeholders.
The template already bakes in the hardening below — keep it. Pick `--max-turns` by source
complexity (40 for a simple page; 50+ if it fetches many sub-pages before editing).

### 5. Validate and hand off

- Validate the YAML parses (`python -c "import yaml; yaml.safe_load(open(p, encoding='utf-8'))"` —
  on Windows pass `encoding='utf-8'` or the emoji in the file trips cp1252).
- Tell the user the **three things they must do**, in order:
  1. **Push to the default branch.** Scheduled/`workflow_dispatch` triggers only register once the
     workflow file is on the repo's default branch.
  2. **Add the secret.** `claude setup-token` (needs a Claude Pro/Max subscription) →
     `gh secret set CLAUDE_CODE_OAUTH_TOKEN --repo <owner/repo>`, paste the token. (Or use
     `ANTHROPIC_API_KEY` and swap the auth line to bill the API.)
  3. **Test it.** Actions tab → the workflow → **Run workflow**. A no-change first run should finish
     green and post the "none new" summary line.

## Workflow hardening (already in the template — why it's there)

These are the fixes that distinguish a robust sync workflow from a naive one:
- **`timeout-minutes`** — a stuck agent run otherwise burns CI minutes with no ceiling.
- **Failure-issue dedup by label** — without it, every failed scheduled run opens a fresh duplicate
  issue. The template comments on an existing open `sync-failure` issue instead.
- **Update existing PR, don't duplicate** (enforced in the instruction file) — if a prior sync PR is
  still open, the next run must update that branch, not open a second PR for the same items.
- **SHA-pinned action + concurrency guard + PR-only (never push default branch)** — supply-chain
  safety, no overlapping runs, and a human review gate on all LLM-generated content.

## Skill vs. plugin

This is delivered as a skill. Wrap it in a plugin only when the user wants to *distribute* it to
others or add a slash command — a plugin is packaging that contains skills, not an alternative.
