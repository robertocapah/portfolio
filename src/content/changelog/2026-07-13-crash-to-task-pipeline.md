---
date: 2026-07-13
title: "Crash-to-task pipeline running end-to-end"
summary: "A standalone service that turns production crashes into deduplicated, triaged engineering tasks — built with an AI pair."
tags: ["Tooling", "AI Agents"]
---

- Finished the service that ingests production crash data and auto-creates triaged tasks, deduplicated so the same crash never spawns two tickets.
- Each task links back to the originating crash, so triage stops being guesswork.
- Shipped it as its own repo with a full build/deploy pipeline, independent of the app's release cadence.

See the [full case study](/projects/crash-to-huly-pipeline).
