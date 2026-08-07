---
date: 2026-08-07
title: "Stood up a self-hosted deep-link & attribution platform — plus deep bond-flow polish"
summary: "Bootstrapped a new deep-linking and attribution service end to end to replace a third-party vendor, and took the native government-bond flow from working to genuinely polished."
tags: ["Backend", "Web", "Android", "Reliability"]
---

- Kicked off a new **deep-linking and attribution platform** from an empty repo to a deployable service in about a week — a Go redirect backend, a React admin dashboard, a Postgres schema with migrations and an ERD, and full staging/production infra (containerized, reverse-proxied, with mobile App Links verification wired up). The goal is to bring deep-link routing and install attribution in-house instead of leaning on a paid third-party vendor.
- Built out the platform's first real capabilities: attribution foundations, per-platform redirect overrides so one link can send Android, iOS, and web to different destinations, and a marketing-overview dashboard driven by live aggregate analytics rather than placeholder numbers. A background job now prunes expired device fingerprints so the data set stays clean on its own.
- Took the native government-bond (SBN) investing flow from functional to polished: the buy form validates the amount as you type (min, max, and step), remaining-quota and tenor now read straight from the backend instead of being recomputed on the client, and ownership certificates and offering documents open reliably in a native PDF viewer — fixing an intermittent "no preview available."
- Killed a batch of reliability issues along the way: debounced a buy-amount input that was triggering an ANR, guarded a bottom sheet against a torn-down screen, hardened push-notification token registration and channel setup, and made a tax parameter config-driven at startup so it's never stale.
- Rounded out tooling: added Mac universal debug/release build jobs to CI (with tuned build-daemon memory), and gave the help center guest attachment uploads with client-side image and video compression.
