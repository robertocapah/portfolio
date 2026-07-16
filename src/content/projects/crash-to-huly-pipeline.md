---
title: "Crashlytics → Huly Auto-Task Pipeline"
summary: "A standalone service that turns production crash reports into triaged, deduplicated engineering tasks automatically — built end-to-end with an AI pair."
tags: ["Tooling", "AI Agents"]
date: 2026-07-13
featured: true
role: "Design, implementation, and deployment"
stack: ["Node.js", "Firebase Crashlytics", "Huly API", "Cloud Functions", "GitLab CI"]
---

## Context

The Android team triages production crashes in Firebase Crashlytics, but the actual
work is tracked in a separate project-management tool. Every morning someone had to
read the crash dashboard, decide what was new, and hand-copy the important issues
into the tracker as tasks. It was slow, easy to skip, and the two systems drifted
apart constantly.

## Problem

The manual bridge between "a crash is spiking in production" and "a developer has a
ticket to fix it" was the weakest link. Crashes that mattered got lost in noise;
duplicates piled up; and there was no reliable record of which crash a given task
came from.

## Approach

Rather than bolt this onto the app, I built it as a **small standalone service** — a
clean separation so the crash-to-task logic could evolve without touching the mobile
codebase. I designed it with an AI pair: sketching the data flow, choosing where
dedup should live, and iterating on the mapping between a crash signature and a task
until it was stable.

## What I built

- A service that ingests crash data, normalises each crash into a stable signature,
  and **deduplicates against tasks already created** so the same crash never spawns
  two tickets.
- Automatic task creation in the tracker with severity, occurrence counts, and a
  back-link to the originating crash so a developer can jump straight to the stack
  trace.
- A full CI pipeline for the service repo — build, checks, and deploy — so the thing
  ships the same way everything else does.

## Impact

- Removed a daily manual chore and closed the gap where important crashes were
  silently dropped.
- Every auto-created task carries provenance back to the exact crash, so triage is
  no longer guesswork.
- The service lives in its own repository with green CI, independent of the app's
  release cadence.

## What I learned

The hard part of an integration like this isn't the API calls — it's **idempotency**.
Getting dedup right (so re-running the pipeline is always safe) mattered more than any
single feature, and it's exactly the kind of invariant an AI pair is good at
pressure-testing with edge cases before a single line ships.
