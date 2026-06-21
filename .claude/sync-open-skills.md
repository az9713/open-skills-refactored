You maintain a refactored, single-page mirror of Nate B. Jones' **Open Skills** library. Your job
is to keep this repo in sync with the source as new skills and runbooks are published, while
preserving this site's editorialized voice and structure.

## How this site is built (read before editing)

The page is data-driven. `index.html` is a static shell; **all content lives as JS arrays in
`script.js`**:

- `skills` — one `skill(...)` call per skill, with: `id` (kebab-case), `original` (exact source
  name), `plain` (short plain-English label), `area` (one of the area ids below), `use` (one
  sentence), `requirements` (3–4 items), `outputs` (3–4 items), `verification` (2–3 items),
  `tags` (2–3 items). Install prompts are **generated at runtime** by `buildInstallPrompt()` — do
  NOT write a separate prompt; adding the skill to this array is enough.
- `workflows` — one `workflow(...)` call per runbook: `id`, `name`, `original` (exact source
  runbook name), `outcome` (one sentence), `steps` (ordered list), `skills` (array of `original`
  skill names it chains).
- `areas` — the six refactor areas: `prepare`, `think`, `create`, `ship`, `verify`, `operate`.
  **The site uses 6 areas; the source uses 7 categories. They do not map 1:1.**

Human-readable counts are hardcoded text in `index.html` and `README.md` (e.g. "Browse 31
skills", "31 skill cards", "7 use-case chains", "Seven common ways..."). These must be kept in
sync with the array lengths whenever you add items.

## Task

1. **Fetch the source.**
   - Overview: https://unlock-ai.natebjones.com/open-skills (per-category skill counts)
   - Runbooks: https://unlock-ai.natebjones.com/open-skills/runbooks
   - The 7 category pages (each lists its skills with name + description + requirements):
     - https://unlock-ai.natebjones.com/open-skills/core-infrastructure
     - https://unlock-ai.natebjones.com/open-skills/research-thinking
     - https://unlock-ai.natebjones.com/open-skills/writing-voice-content
     - https://unlock-ai.natebjones.com/open-skills/web-publishing-frontend
     - https://unlock-ai.natebjones.com/open-skills/video-media-production
     - https://unlock-ai.natebjones.com/open-skills/testing-quality
     - https://unlock-ai.natebjones.com/open-skills/agent-operations

2. **Detect changes by NAME, not by count or full text.** Build the set of source skill names
   (from the category pages) and runbook names (from /runbooks). Compare against the `original`
   names already in the `skills` and `workflows` arrays in `script.js`. Use the per-category
   counts on the overview as a sanity check that you fetched everything (they currently sum to
   31). Treat as **new** any source name not present in the repo. A rename will look like one
   removal + one addition — if a description clearly matches an existing skill under a new name,
   treat it as a rename (update `original`) and note it.

3. **If there are NO new skills or runbooks**, make NO changes and open NO pull request. Append a
   one-line summary to the run summary (see below) and stop.

4. **If there are new skills**, for EACH new one, write a complete editorialized record in the
   SAME voice as the existing entries:
   - `id`: kebab-case of the name.
   - `original`: exact source name. `plain`: a short plain-English label (a few words).
   - `area`: choose by the skill's **function**, using the existing skills as exemplars — NOT by
     mechanically copying the source category. (e.g. source "Core Infrastructure" already splits
     across `prepare` and `create` in this repo.)
   - `use`: one sentence describing the job, in the existing terse style.
   - `requirements` / `outputs` / `verification` / `tags`: derive from the source description and
     requirements, matching the length and tone of existing entries.
   - Insert the new `skill(...)` call into the `skills` array near related skills.
   - **A new source CATEGORY does not become a 7th area.** Assign new skills to the closest
     existing area and raise the question in the PR body. Do not add to the `areas` array.

5. **If there are new runbooks**, add a `workflow(...)` entry to the `workflows` array, with its
   `skills` list referencing the exact `original` names of skills in this repo.

6. **Update every hardcoded count** to match the new array lengths: search `index.html` and
   `README.md` for the old numbers and update them (skill count appears in the hero lede and the
   "Browse N skills" button; runbook count appears as the "Seven common ways..." heading and the
   README "use-case chains" line). Re-count the arrays after editing to confirm the numbers match.

7. **Open a pull request** on a new branch titled **"Sync new Open Skills from source"**. If an
   open PR / branch from a previous sync already exists, **update that branch instead of opening a
   duplicate**. In the PR body:
   - List which skills / runbooks were added (and any renames).
   - Flag any source category that has no clean home among the 6 areas.
   - Add a review checklist: voice/tone fidelity, `area` fit, requirements/outputs/verification
     accuracy, tags, count text updated, runbook skill references resolve.
   - State clearly that **all generated fields are drafts** matching existing voice, for human
     review. Do NOT push to `main` directly.

## Report the outcome on the run summary

The `GITHUB_STEP_SUMMARY` environment variable holds a file path. Append a one-line markdown
verdict on **every** run, whatever the outcome:

- No changes: `echo "✅ Checked source — N skills / M runbooks, none new. No changes." >> "$GITHUB_STEP_SUMMARY"`
- New content: `echo "🔔 Added skills [names] / runbooks [names] and opened PR #X." >> "$GITHUB_STEP_SUMMARY"`
- Source unreachable: `echo "⚠️ Could not fetch/parse the source. No changes made." >> "$GITHUB_STEP_SUMMARY"`

## Rules

- Prefer **additive** changes. Never delete or rewrite an existing skill, runbook, or prompt
  unless the source has clearly removed or renamed it.
- If a source page can't be fetched or parsed, do nothing and report the failure — do not open a
  speculative or empty PR, and do not fabricate skill content you could not read.
- Match the existing tone and formatting exactly; this content is published on a public site.
- Keep `script.js`, `index.html`, and `README.md` counts mutually consistent before opening the PR.
