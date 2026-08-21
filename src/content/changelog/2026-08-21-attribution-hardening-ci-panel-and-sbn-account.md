---
date: 2026-08-21
title: "Hardened the attribution platform, shipped a self-service CI panel, and redesigned the bond account"
summary: "Took the in-house deep-link & attribution platform from first features to a security-reviewed, cross-platform service, stood up a web control panel for the Android CI, and rebuilt the native government-bond account experience."
tags: ["Backend", "Security", "CI/CD", "Android"]
---

- Matured the in-house **deep-link & attribution platform** from early features into a real product: consolidated onto a single per-link attribution model, added install attribution across platforms (install-referrer on Android and SDK compatibility for iOS), campaign-level performance analytics that report revenue and transactions per campaign, and began serving the App Links / Universal Links verification files so links resolve natively on both Android and iOS. The admin app also gained search with numbered pagination and self-service password change.
- Ran the platform through a **security assessment and remediated the findings**: moved token signing to asymmetric keys via a centralized signer, tightened auth cookies, response headers, and destination-URL validation, added super-admin-only user & role management, and wired login and admin-activity audit logs with automatic retention.
- Stood up a brand-new **self-service CI control panel** — a web app that lets the Android team trigger builds, tests, and internal releases on the Mac Studio runner and watch the resulting pipelines, without hand-editing git tags. Every action runs as the logged-in user via OAuth, so it's fully attributable.
- Redesigned the native **government-bond (SBN) account experience**: restructured the account screen into a cleaner two-tab layout, rebuilt the personal-details view as collapsible card sections, polished the linked-accounts screen, moved the deposit and withdrawal flows fully native, and made the RDN account card reflect real pending, verification, and rejected states.
- Kept the crash-to-task pipeline healthy: updated the relay for a breaking upstream version change (account-shape and sequence handling) and added a one-click deploy job to its CI.
