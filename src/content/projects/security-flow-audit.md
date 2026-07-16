---
title: "Security Flow Audit"
summary: "An AI-assisted audit of an investment app's most sensitive flows — app-lock, session and token handling — that surfaced concrete, blocking findings and a wiring fix that closed most of them at once."
tags: ["Security", "AI Agents"]
date: 2026-06-30
role: "Security review and remediation planning"
stack: ["Kotlin", "Android Keystore", "Session/token flows", "Static analysis"]
---

## Context

The app handles real money — mutual funds, bonds, gold, and equities — so the
security-sensitive flows (device app-lock, session lifetime, and how authentication
tokens are stored and refreshed) are the parts where a subtle bug is most expensive.

## Problem

These flows had grown over time and needed a rigorous, adversarial review: not "does
it work in the happy path" but "where does it **fail open** — where does a gate that
should block instead let you through?"

## Approach

I ran a focused audit with a purpose-built security agent, then verified each finding
by hand. The agent was told to think like an attacker: look for fail-open gates,
bypasses, and trust-boundary holes in the app-lock and token flows, and report each
one with a concrete exploit scenario and a fix direction — never a vague "consider
reviewing this."

## What I built

- A prioritised findings report with severities, each backed by a specific scenario
  showing how the weakness could be exploited.
- A remediation plan that identified a **single wiring fix** — activating a
  session-management component that already existed but wasn't fully connected — which
  resolved the majority of the high-severity findings at once.

## Impact

- Turned a diffuse "we should look at security sometime" into a concrete, ranked list
  of blocking issues with clear fixes.
- Found that the cheapest high-impact fix was connecting an already-built component
  rather than writing new security code — lower risk and faster to ship.

## What I learned

The most dangerous security bugs aren't missing features — they're **gates that fail
open**, where the safe-looking default is actually the insecure one. An adversarial
reviewer that defaults to "assume this can be bypassed until proven otherwise" catches
a class of issue that a correctness-focused review sails right past.
