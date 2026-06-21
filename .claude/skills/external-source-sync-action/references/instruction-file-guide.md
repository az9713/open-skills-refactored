# Writing the per-repo instruction file

The workflow YAML is nearly identical across repos. The **instruction file** (the `.md` the action
tells Claude to "read and follow exactly") is where all the per-repo logic lives, and it is the
part that actually determines whether the sync works. Generate it fresh for each repo. This guide
is the checklist for doing that well.

## Why the split exists

The `.yml` is YAML that GitHub parses — keep logic out of it so the maintainer never edits fragile
YAML to change sync behavior. The `.md` is plain prose the agent reads at runtime. Change *what*
gets synced or *how* by editing the Markdown alone.

## Required sections in the instruction file

1. **Role + "how this repo is built"** — Tell the agent where the data *actually* lives. This is
   the most common trap: the rendered page (`index.html`) is often a static shell, and the real
   content sits in a data file (`script.js`, a JSON file, a `_data/` dir). Edits must target the
   data source, not the rendered HTML. Also list any **derived/hardcoded values** that must stay
   consistent — counts in headings, totals in the README, generated-at-runtime fields.
2. **Source URLs** — the exact pages to fetch, including every sub-page that holds detail. List
   them explicitly so the agent doesn't have to rediscover the site map each run.
3. **Detection strategy** — how to decide what's *new* (see below).
4. **What to do when new items are found** — the exact shape of a new record, field by field,
   matching the existing entries' voice and length. State plainly that generated fields are
   **drafts for human review**, which is what makes auto-generation safe.
5. **Count/consistency updates** — every hardcoded number to keep in sync with the data.
6. **PR rules** — branch name; update an existing open sync PR instead of opening a duplicate;
   never push to the default branch; PR body must summarize additions + a review checklist.
7. **No-change and failure rules** — no new items → no PR, just report. Source unreachable → do
   nothing, report, do NOT open a speculative/empty PR or fabricate content you couldn't read.
8. **Run-summary line** — append a one-line verdict to `$GITHUB_STEP_SUMMARY` on *every* run so
   the result is visible without expanding logs.

## Detection strategy: prefer names over counts

- **If item names are reachable** (the detail pages are static HTML), diff by **name/title**. This
  catches renames and add+remove-same-count changes that a pure count check misses. Use counts
  only as a sanity check that you fetched everything.
- **If only aggregate counts are reachable** (detail is JS-rendered and the agent's no-JS fetch
  can't see it), fall back to count-based detection — but say so explicitly in the `.md`, because a
  same-run +1/−1 change is then invisible.

**Verify this before writing the file.** Fetch the source the way the action will (no JavaScript).
If the top-level page is a JS shell, look for static sub-pages, a `sitemap.xml`, or an RSS/JSON
feed that exposes the items. The result decides whether auto-enrichment is even possible — if every
level is a JS shell, the honest design is "detect a delta, open an issue for a human," not
"auto-generate records." Don't write enrichment logic that can never run.

## Editorialized vs. raw data

If the repo's entries are **rewritten/editorialized** (custom labels, categories, derived fields)
rather than a verbatim mirror of the source, a scrape cannot reproduce them — only an LLM can. That
is exactly why this pattern uses `claude-code-action` instead of a plain `curl | jq` script. Tell
the agent to generate each field in the existing voice, and lean on the PR review gate for safety.

## Mapping traps

When the source's taxonomy doesn't match the repo's (e.g. source has 7 categories, repo has 6),
tell the agent to assign new items by **function**, using existing entries as exemplars — not by
mechanically copying the source taxonomy. And: a new source category should **not** auto-create a
new repo category; assign to the closest one and raise the question in the PR body. This preserves
deliberate editorial structure.

## Rules to always include

- Prefer **additive** changes; never delete/rewrite existing entries unless the source clearly
  removed or renamed them.
- Match existing tone and formatting exactly — this content is usually published.
- Keep the data file, the rendered page, and the README mutually consistent before opening the PR.

A concrete, working example of such an instruction file is the one this skill was generalized from:
search the user's repos for `.claude/sync-*.md`, or see the structure above which mirrors it.
