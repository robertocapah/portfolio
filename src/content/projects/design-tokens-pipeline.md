---
title: "Cross-Platform Design Tokens Pipeline"
summary: "A standalone repository that turns a single source of design tokens into platform-ready outputs, with green CI — the foundation for keeping design and code in sync across platforms."
tags: ["Tooling", "CI/CD"]
date: 2026-07-01
role: "Repository design and CI setup"
stack: ["Design tokens", "GitLab CI", "Cross-platform build"]
---

## Context

A design system is only as good as its consistency across platforms. Colours,
typography, and spacing were defined per-platform, which meant the same token could
quietly drift between the design source and each codebase.

## Problem

Without a single source of truth, keeping brand tokens aligned across platforms is
manual and error-prone. Every hand-copied hex value is a chance for design and code
to disagree.

## Approach

I set up a dedicated **design-tokens repository** as the single source of truth,
separate from any one app, with a CI pipeline that validates and builds the tokens on
every change. This is the groundwork for a broader pipeline that flows tokens from the
design tool through to each platform's code without a human retyping values.

## What I built

- A standalone tokens repo, live and building green in CI.
- A proposal and plan for the full cross-platform pipeline — from the design source
  of truth to platform-consumable outputs — including a showcase module to make the
  tokens visible and reviewable.

## Impact

- Established the single source of truth that a cross-platform design system needs.
- Removed a class of "why doesn't this colour match the design" bugs before they can
  happen.

## What I learned

Design-system consistency is a **pipeline problem, not a discipline problem**. You
can't reliably keep values in sync by asking people to be careful; you keep them in
sync by making the code generated from one source. Getting the repository and CI
foundation right first is what makes the rest of the pipeline possible.
