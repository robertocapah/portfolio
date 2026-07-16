---
name: portfolio-digest
description: Draft a sanitized changelog entry for the portfolio site from recent git activity and journal notes, then open a PR for review. Use when the user says "portfolio digest", "update the log", "buatin changelog", or on the weekly schedule.
---

# Portfolio Digest

Generate a published-ready changelog entry for this portfolio site and open a PR for
approval. **Never auto-publish or merge** — the PR is the approval gate.

Follow the playbook in `DIGEST.md` at the repo root exactly. In short:

1. Determine the window (default: since the newest `src/content/changelog/` entry,
   else last 7 days). State it.
2. Gather sanitized raw material: git activity across Roberto's `~/Documents/` repos
   (`portfolio`, `bareksa-android 2`, `bareksa-crash-to-huly`, `bareksa-ci-dashboard`,
   `bareksa-design-tokens`, plus any other active repo) and journal notes in
   `src/content/journal/*.md`.
3. Synthesize into 2–5 recruiter/engineer-worthy bullets. Flag (don't write) any
   work big enough to become a new case study.
4. Write `src/content/changelog/YYYY-MM-DD-<slug>.md` with valid frontmatter.
5. **Sanitize hard**: no internal code, endpoints, hostnames, ticket IDs, credentials,
   or business figures. Bareksa may be named; impact stays qualitative or uses safe
   metrics only. Grep for leak markers before committing.
6. `npm run build` must pass (validates the schema).
7. Branch `digest/YYYY-MM-DD`, commit, push, `gh pr create` (do not merge), and report
   the PR URL.

Argument (optional): a window override, e.g. `last 2 weeks`, `since 2026-07-01`.

If the window is genuinely quiet (nothing worth publishing), say so and skip the PR
rather than inflating a thin entry.
