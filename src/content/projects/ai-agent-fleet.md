---
title: "A Fleet of Custom AI Agents for an Android Codebase"
summary: "Seven purpose-built AI agents — crash hunter, security auditor, style guardian, reviewer, tester, and two release agents — each scoped to one job on a large production codebase."
tags: ["AI Agents", "Tooling"]
date: 2026-07-10
featured: true
role: "Agent design and prompt engineering"
stack: ["Claude Code", "Custom subagents", "Kotlin", "Gradle"]
---

## Context

I work on a large, mature Android application — multiple feature modules, a design
system, a clean-architecture layering, and a strict style gate. Generic AI assistance
is useful but shallow on a codebase like this: it doesn't know the module boundaries,
the naming conventions, or the release rituals.

## Problem

A single all-purpose assistant kept giving plausible-but-wrong answers because it had
no fixed scope. What I actually needed were **specialists** — each one told exactly
what to look for, what the project's conventions are, and what it is *not* allowed to
do (for example, never edit code when its job is to review).

## Approach

I built a fleet of narrowly-scoped agents, each with its own system prompt encoding
the project's real conventions — clean architecture, dependency-injection rules, the
result-wrapper pattern, coroutine usage, module boundaries, and the design-system
mandates. Read-only agents are enforced as read-only; write agents follow the style
gate from the first keystroke.

## What I built

Seven agents, each with a single responsibility:

- **Crash hunter** — reads a diff or a target module and reports likely runtime
  crashes (null handling, unsafe casts, lifecycle and parsing hazards) with a concrete
  failure scenario for each.
- **Security-flow auditor** — audits the sensitive flows (app-lock, session and token
  handling, WebView bridges, deep-link routing) for fail-open gates and bypasses.
- **Style / design-system guardian** — enforces the linter and the design-token
  mandates on changed files, auto-fixing what is safe and flagging the rest.
- **Code reviewer** — reviews a diff against the architecture and convention rules.
- **Test author** — writes and runs JVM unit tests in the project's mocking and
  coroutine style until they pass.
- **Release-train** and **QA-focus** agents — described in their own case study.

## Impact

- Reviews, crash sweeps, and security passes that used to be ad-hoc are now
  repeatable and consistent, because the conventions live in the agent, not in
  whoever happened to run it.
- Read-only enforcement means the audit agents can be pointed at anything without risk.
- Each agent's output lands in the same shape every time, which makes it trustworthy
  enough to gate a release on.

## What I learned

**Narrow beats general.** An agent that can do one thing against a known rulebook is
worth more than a clever generalist, because you can trust its output without
re-checking everything. The engineering is mostly in writing down the conventions
precisely — the same discipline that makes a good onboarding doc makes a good agent.
