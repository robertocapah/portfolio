---
date: 2026-09-30
title: "Crypto and US-stock investing, built natively into the Android app — plus a 40+ crash sweep"
summary: "Built a full crypto investing experience in Jetpack Compose on a product-agnostic shell that US Stocks reuses, unified portfolio and transaction history around it, and closed out over forty production crash signatures in one month."
tags: ["Android", "Reliability", "CI/CD"]
---

- Built a **native crypto investing experience** end to end in Jetpack Compose: Explore and search, a coin detail page with candlestick charts and key statistics, Buy / Sell / Swap with live fee and tax previews before you commit, in-app deposits, PIN-protected withdrawals, and full transaction detail for every order type.
- Designed it **product-agnostic from day one**: the traded product is a parameter rather than a hard-coded assumption, so US Stocks runs on the same shell with its own entry point and splash, and a swap can cross products. Guests can browse freely and are asked to sign in only at the moment it matters — then land back on the page they were on.
- Unified **portfolio and transaction history** around the new products: one shared Compose transaction page hosted by both the main app and the crypto module, filter chips driven by remote config to match iOS, and portfolio cards that print every figure exactly as the backend sends it instead of rounding it away.
- Ran a **crash sweep that closed 40+ distinct production crash signatures** in a single month — mostly screens and sheets that couldn't survive process death, callbacks landing on already-destroyed views, and fragment transactions fired after state was saved — each fix scoped to its root cause rather than a blanket try/catch.
- Tightened the release pipeline: device-farm UI tests now run in parallel with the internal publish, a release tag can opt out or run them non-blocking, and the job finally **fails loudly when its suites don't actually run** instead of passing silently.
