# Portfolio Site — Design Spec

**Date:** 2026-07-07
**Owner:** Roberto Capah
**Status:** Approved (brainstorm session, 2026-07-07)

## Purpose

A public career portfolio website for Roberto, an Android engineer at Bareksa. The
centerpiece is his AI-assisted engineering work: custom agent fleets, agentic release
workflows, CI/CD engineering, and standalone services built with AI pair-programming.
The site targets recruiters, hiring managers, and the international dev community.

Written in **English**. Bareksa may be named, but all case studies are **sanitized**:
no internal code, endpoints, architecture secrets, or business figures. Impact is told
qualitatively or with safe metrics (commit counts, agent counts, process time saved).

## Decisions made during brainstorming

| Question | Decision |
|---|---|
| Audience | Public career portfolio (recruiters, interviews, LinkedIn) |
| Format | Personal website (static site), not Obsidian Publish / Notion / bare repo |
| Scope | Full career site; AI-assisted work is the dominant content |
| Confidentiality | Sanitized case studies; Bareksa named; no internal details |
| Language | English |
| Approach | Option A: Astro + markdown content, "Obsidian behind the scenes" |

## Repository & deployment

- New standalone git repo at `~/Documents/portfolio` (this repo). **Not** inside the
  Bareksa Android repo; none of the Bareksa repo's CI/commit rules apply here.
- Deployed to **Vercel**, auto-deploy on push to `main`.
- Starts on a `*.vercel.app` subdomain; a custom domain can be attached later with no
  code changes.

## Site structure

```
/                  Home — short intro, role, 3 featured case studies, contact links
/projects          Card grid of all case studies, filterable by tag
                   (tags: AI Agents, CI/CD, Security, Tooling)
/projects/<slug>   Individual case study page
/ai                "How I ship with AI" — narrative page: AI-adoption timeline
                   + commit-velocity chart (~25/month → 124/month), rendered as a
                   static SVG/image, no chart library
/about             Work experience, skills, contact
```

Four core pages only. A blog can be added later; the content-collection structure
already supports it.

## Content model — "Obsidian behind the scenes"

- Every case study is a markdown file in `src/content/projects/` with frontmatter:
  `title`, `summary`, `tags`, `date`, `featured`.
- `src/content/` doubles as an **Obsidian vault** ("Open folder as vault"). Wikilinks
  (`[[...]]`) between notes are allowed for personal navigation; only standard
  markdown is rendered to the public site. Private notes can be excluded from the
  build via a `draft: true` frontmatter flag or a non-collection folder.
- Case study template (sanitize-by-design):
  **Context → Problem → Approach → What I built → Impact → What I learned**

## Tech stack

- **Astro** with content collections, fully static output.
- **Tailwind CSS** for styling.
- Zero client-side JS except where strictly needed (e.g. tag filter on `/projects`,
  which may be done with a few lines of vanilla JS or plain CSS).
- Dark/light theme follows system preference.
- Visual direction: minimal-professional — strong typography, a single accent color,
  deliberately avoids the generic-template look.
- No CMS, no database. Markdown is the CMS.

## Initial content (drafted from existing material)

Six case studies, drafted from the Bareksa repo's bugfix index, session memory, and
git history, then fact-checked by Roberto:

1. **Crashlytics → Huly auto-task pipeline** — standalone service repo built
   end-to-end with AI assistance.
2. **Agentic release workflow** — release-train + QA-focus-doc agents running in
   parallel to prepare releases.
3. **CI/CD engineering** — Mac Studio GitLab runner, Firebase Test Lab pipeline,
   build-OOM fixes, resource-group build queueing.
4. **Fleet of 7 custom AI agents** for an Android codebase — crash-hunter,
   security-flow-auditor, ktlint-guardian, reviewer, tester, release agents.
5. **Security flow audit** — app-lock / token-flow audit with concrete findings.
6. **Cross-platform design tokens pipeline** — separate repo, green CI.

Supporting data for `/ai`: 42 indexed bugfix documents, ~5× commit-velocity increase
(≈25/month baseline → 124/month peak in June 2026).

## Error handling / edge cases

- Build fails on invalid frontmatter (Astro content-collection schema via zod) —
  catches malformed case studies before deploy.
- Wikilinks that leak into published markdown render as plain text; a pre-build lint
  step (simple grep in CI or an Astro remark plugin) warns about `[[` in published
  content.
- Missing/unpublished slugs 404 via Astro's default 404 page (custom 404 included).

## Testing

- `astro build` as the CI gate — type-checks frontmatter schemas and catches broken
  internal links (with `astro check` + link-check step).
- Visual review on Vercel preview deployments per push.
- No unit-test framework — static content site; the build is the test.

## Explicitly out of scope (YAGNI)

Public graph view, comments, analytics, newsletter, i18n, CMS, blog (structure-ready
but not built). None of these block the architecture; all can be added later.
