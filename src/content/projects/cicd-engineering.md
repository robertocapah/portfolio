---
title: "CI/CD Engineering for a Large Android App"
summary: "Turned a fragile build pipeline into a dependable one — a self-hosted Mac build runner, a cloud device-test lab, memory-fixed release builds, and a build queue that stops heavy jobs from trampling each other."
tags: ["CI/CD", "Tooling"]
date: 2026-07-05
role: "Pipeline design, runner infrastructure, and debugging"
stack: ["GitLab CI", "Gradle", "Firebase Test Lab", "macOS runner", "AAB / native symbols"]
---

## Context

A large multi-module Android app has an expensive build: release bundles, native
symbol uploads, instrumentation tests, and unit tests across flavors. As the project
grew, the CI pipeline started timing out, running out of memory, and stepping on
itself when several heavy jobs ran at once.

## Problem

Release builds failed intermittently with out-of-memory errors. Heavy jobs competed
for the same finite resources and slowed everything down. And the team needed
reliable on-device test coverage without maintaining a rack of physical phones.

## Approach

I treated the pipeline as a system to be engineered, not a script to be patched:

- **Self-hosted build runner** — set up a dedicated Mac as a CI runner so heavy builds
  and tests run on capable, predictable hardware instead of contending on shared
  cloud minutes.
- **Cloud device lab** — wired up a hosted device-test lab so instrumentation tests
  run on real devices on demand, after an earlier attempt at a self-managed emulator
  runner proved too fragile.
- **Memory fixes** — diagnosed the release-bundle out-of-memory failures and capped
  the build's heap so it fits the runner reliably.
- **Build queueing** — put heavy jobs behind a shared resource group so only one runs
  at a time, while light jobs stay fully parallel — a deliberate throughput trade-off.

## What I built

- A build/test/release flow triggered by tag conventions, so the right pipeline runs
  from a single tag.
- A publishing step that uploads the app bundle, native debug symbols, and the code
  mapping in one atomic operation.
- A recovery playbook for the runner infrastructure so a wedged job is a known,
  fixable state rather than a mystery.

## Impact

- Release builds went from "fails intermittently" to green and repeatable.
- On-device test coverage without owning a single test phone.
- Heavy jobs no longer starve each other; the pipeline's behaviour is predictable
  under load.

## What I learned

Most CI pain is **resource contention wearing a costume** — it shows up as timeouts,
OOMs, and flakiness, but the root cause is usually too many heavy things fighting over
too little at once. Naming the resources explicitly and serialising only what must be
serialised fixed more than any single flag.
