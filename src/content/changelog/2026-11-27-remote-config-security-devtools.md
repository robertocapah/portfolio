---
date: 2026-11-27
title: "A remote-config console, a security tightening pass, and devtools that document themselves"
summary: "Built a no-release remote-config system from scratch, hardened the Android app's app-lock and WebView boundaries, rounded out crypto deposits and tracking, and gave the team better devtools and CI hygiene up to the 6.0 builds."
tags: ["Android", "Security", "Tooling", "CI/CD", "AI Agents"]
---

- Built **a remote-config console from scratch** so copy, visibility, and numbers in the app can change without a release: a Go API, a React console with a live phone preview and review-before-production, signed config snapshots served from a CDN, and an Android SDK that falls back from remote → last-known-good on device → bundled defaults, so the app keeps working even if the console or network is down. It is already wired into the app's Home news section. Every production change is traceable to a person, a reason, and an approver.
- Ran a **security tightening pass** on the Android app across the app-lock, deep-link, and WebView boundaries, plus a privacy review of what diagnostics collect. Builds on the earlier [security flow audit](/projects/security-flow-audit).
- Rounded out crypto: **deposits through e-wallets and virtual accounts**, a redesigned instant-order flow, an interval price chart brought to parity with iOS, maintenance gating from remote config, and **end-to-end analytics tracking across every crypto screen** — with the event mappings locked by unit tests and refined over several QA rounds.
- Rebuilt the **in-app developer tools**: a redesigned devtool home, a network mock that starts from the real calls the app just made and lets you edit responses field by field, and **"Living Docs"** — per-screen documentation readable inside the app, with a rule (shared across Claude and other AI coding agents' instruction files) that any change to what a screen shows must update its doc.
- CI and platform upkeep: moved the AI code reviewer onto the Claude Code CLI and made reviewer failures visible instead of silent, added disk-usage, cleanup, and build-daemon jobs for the self-hosted Mac runner plus a read-only device-farm crash report, delivered push notifications on Huawei devices without Google services, and added an AI skill that drafts the release announcement — across the 5.19 → 6.0 release builds.
