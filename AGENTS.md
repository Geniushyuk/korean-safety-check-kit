# AGENTS.md

## Goal
Provide reusable Korean safety-check scenarios and scoring utilities for public-interest services.

## Rules
- Do not add medical, legal, psychological, or criminal certainty claims.
- Do not diagnose people. Evaluate situation-level risk signals only.
- Keep wording calm, non-shaming, and action-oriented.
- Emergency guidance must point to official Korean resources where appropriate: 112, 119, 118, 1332, 1366.
- Do not collect personal data by default.
- Keep tests passing with `npm test`.

## Good Codex tasks
- Triage new scenario requests.
- Review PRs for unsafe wording or overclaiming.
- Generate regression tests for scoring changes.
- Draft release notes when scenarios are added.
