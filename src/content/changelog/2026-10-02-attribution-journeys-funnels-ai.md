---
date: 2026-10-02
title: "The in-house attribution platform learns journeys, funnels, and AI campaign advice"
summary: "Grew the self-hosted deep-link & attribution platform from link analytics into full acquisition-funnel reporting, in-app behaviour analytics, audience segments, and AI-generated campaign recommendations."
tags: ["Backend", "Analytics", "AI Agents", "Android"]
---

- Added **click journeys**: the platform now stitches together the path a visitor takes before installing or buying — including people who already have the app — and shows it as a timeline. Non-human traffic is flagged and kept out of reports, and "paid vs. organic" now needs two independent signals instead of trusting a single URL parameter.
- Built a full **acquisition funnel — source → install → registration → transaction** — fed by a payment-callback inbox that matches settled orders across every product line, replacing a status poller. Retargeting links got their own credit windows, separate reporting, and QR codes, and multi-currency orders are no longer summed as if they were all rupiah.
- Shipped **in-app behaviour analytics**: a lightweight Android SDK that records screen and action events (batched in release, instant in debug/QA, with duplicate screen logs filtered out), backend funnel and top-pages reports, an audience segment engine for retargeting that marketing can compose from the dashboard, and a live debug view — with contract tests that keep the app's and backend's event vocabulary from drifting.
- Added **AI campaign recommendations**: the platform builds an aggregated, no-raw-user-data snapshot, asks Claude for suggestions through a sandboxed runner with its tools locked down, and stores the results for review. The admin also moved to Google Workspace single sign-on, while permissions stay managed inside the platform.
- Kept pushing toward **replacing the third-party link vendor**: new web routes for the remaining campaign destinations, an audit of what still isn't reachable, a link-mapping guide for the iOS team derived straight from the Android code, a plain-language guide for marketing — and container vulnerability scans that gate every deploy, kept green by patching images as new CVEs land.
