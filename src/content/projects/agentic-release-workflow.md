---
title: "Agentic Release Workflow"
summary: "Two AI agents run in parallel on every release — one builds the release-train commit list, the other writes a prioritised QA focus document — turning a manual, error-prone ritual into a one-word command."
tags: ["AI Agents", "CI/CD", "Tooling"]
date: 2026-07-08
featured: true
role: "Workflow design and orchestration"
stack: ["Claude Code", "Git", "GitLab CI"]
---

## Context

Preparing a release meant two tedious jobs done by hand: figuring out exactly which
commits are going out (everything on the release branch not yet on the target), and
writing a note for QA about what changed so they know where to focus beyond their
usual regression pass.

## Problem

Both jobs were manual, slow, and easy to get wrong. A missed commit in the release
list or a vague QA note directly translates into risk shipped to production. And
because it was boring, it often got rushed right when care mattered most.

## Approach

I encoded each job as a dedicated agent and made a single command **fan them out in
parallel**:

- A **release-train** agent that diffs the release branch against the remote target,
  then groups and cleans the commits into a planning-ready list.
- A **QA-focus** agent that compares the release against the mainline, reads the
  actual code changes, and produces a prioritised list of what QA should test *on top
  of* their normal regression — mapped to the real diff, not a guess.

## What I built

- A one-word release command that launches both agents at once and presents the
  commit list and the QA document as two clean sections.
- The QA document is written to a versioned file per release so it becomes part of
  the release record.
- Clear separation between "generate the release/QA docs" and "actually build and tag
  an artifact" — the agents do the former; the CI pipeline does the latter.

## Impact

- Release prep dropped from a careful manual slog to a single command.
- QA gets a focused, diff-accurate brief every time instead of an inconsistent
  hand-written note.
- Nothing in the release list is missed, because it's computed from the branch state
  rather than remembered.

## What I learned

The win wasn't just speed — it was **consistency under time pressure**. The moment a
process is most likely to be skipped is right before a release, which is exactly when
you least want it skipped. Encoding it as an agent makes the careful path the default
path.
