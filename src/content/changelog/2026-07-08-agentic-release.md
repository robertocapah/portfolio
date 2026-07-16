---
date: 2026-07-08
title: "Release prep is now one command"
summary: "Two AI agents run in parallel on every release — one builds the commit list, one writes the QA focus doc."
tags: ["AI Agents", "CI/CD"]
---

- Encoded release prep as two agents that fan out in parallel: a release-train agent that computes exactly what's shipping, and a QA-focus agent that writes a diff-accurate testing brief.
- Turned a careful manual slog into a single command — and made the careful path the default, right when time pressure usually makes people skip it.

See the [full case study](/projects/agentic-release-workflow).
