# Portfolio Digest Playbook

How to turn a period of work into a **sanitized, published-ready changelog entry**
for this site. Followed by the `/portfolio-digest` skill and by the scheduled weekly
job. The output always goes through a PR for human approval — never auto-published.

## Golden rules

1. **Sanitize by design.** Bareksa may be named. Never include: internal code,
   endpoints, hostnames, API shapes, credentials, ticket IDs, architecture secrets,
   or business/financial figures. Impact is qualitative or uses only safe metrics
   (commit counts, agent counts, time saved, "green CI").
2. **Draft, don't publish.** Always open a PR. Roberto reviews and merges. Merging is
   what deploys.
3. **Signal over noise.** A good entry is 2–5 bullets about things a recruiter or
   engineer would find interesting. Skip routine chores, dependency bumps, and
   typo fixes.
4. **Honest.** Only claim what actually happened. If a week was quiet, a short entry
   (or none) is fine — don't inflate.

## Inputs

1. **Git activity** across Roberto's local repos in `~/Documents/`:
   - `portfolio`, `bareksa-android 2`, `bareksa-crash-to-huly`,
     `bareksa-ci-dashboard`, `bareksa-design-tokens`, and any other active repo.
   - Use commit messages as the raw material, but **rewrite them sanitized** — never
     paste them verbatim.
2. **Journal notes** in `portfolio/src/content/journal/*.md` (git-ignored, local).
   These carry the "why" and decisions that commits miss. Use them for narrative.

## Steps

1. **Determine the window.** Default: since the date of the newest entry in
   `src/content/changelog/`, else the last 7 days. Print the window you chose.
2. **Gather.** For each repo, run something like:
   ```bash
   git -C "<repo>" log --since="<window>" --author="Roberto" --pretty="%ad %s" --date=short
   ```
   Also read every `.md` in `portfolio/src/content/journal/`.
3. **Synthesize.** Group the work into themes. Decide if anything is large enough to
   also warrant a **new case study** (flag it in the PR description; don't write the
   case study automatically).
4. **Write the entry** to `src/content/changelog/YYYY-MM-DD-<slug>.md` (date = end of
   window). Frontmatter:
   ```yaml
   ---
   date: YYYY-MM-DD
   title: "<punchy, specific — what shipped>"
   summary: "<one sentence>"
   tags: ["AI Agents" | "CI/CD" | "Security" | "Tooling" | "Web" | ...]
   ---
   ```
   Body: 2–5 sanitized bullets. Link to a case study with `[text](/projects/<slug>)`
   when relevant.
5. **Verify.** From `portfolio/`: `npm run build` must pass (schema-validates the
   entry). Run a quick grep for leak markers (`bareksa.dev`, `bareksa.com`, `api.`,
   `ANDRO-`, `CRSB-`, `Rp`, ticket-looking IDs) and remove any hits.
6. **Open a PR.** Branch `digest/YYYY-MM-DD`, commit the entry, push, then
   `gh pr create` with a title like `(Docs) Changelog: <window>` and a body that
   lists what's included and flags any case-study candidates. **Do not merge.**
7. **Notify.** Tell Roberto the PR is up for review with the PR URL.

## Manual run

Open the portfolio repo in Claude Code and run `/portfolio-digest` (optionally pass a
window like `/portfolio-digest last 2 weeks`).
