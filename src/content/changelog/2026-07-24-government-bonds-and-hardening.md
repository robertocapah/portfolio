---
date: 2026-07-24
title: "A native government-bond flow, plus a week of hardening"
summary: "Shipped a big slice of the Android government-bond (SBN) investing experience and spent the rest of the week killing crashes, an ANR, and startup flakiness."
tags: ["Android", "Reliability", "Tooling"]
---

- Shipped a large part of the native government-bond (SBN) investing experience: entry points now route straight into the native flow instead of a webview, the home screen opens on the right currency tab, and account-eligibility checks steer not-yet-verified users to a clear "account unavailable" state instead of dead-ending them mid-flow.
- Made the bond return simulator and remaining-quota display trustworthy — coupon rates, tenor, and quota now match the backend and the design spec instead of showing zero, stale, or mis-rounded numbers.
- Closed out a batch of production crashes and an ANR: guarded uninitialized state across several screens, moved third-party live-chat setup off the main thread, cancelled a countdown timer on view teardown, and cleared cached profile data on logout so a stale verification popup can't leak across accounts.
- Made app startup resilient — the remote-config fetch at splash now auto-retries with backoff, and I pulled the retry logic into a pure, unit-tested helper so a flaky network no longer means a misconfigured launch.
- Extended the in-app network inspector to surface a third-party marketing SDK's traffic, so we can confirm a remote kill-switch actually silences it — and made QA builds honor that switch instead of force-enabling.
