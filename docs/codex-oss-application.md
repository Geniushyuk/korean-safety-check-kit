# Codex for Open Source application draft

## Project

Korean Safety Check Kit is an open-source Korean digital safety checklist dataset and scoring engine for lightweight public-interest safety UX.

Repository: https://github.com/Geniushyuk/korean-safety-check-kit

It provides reusable Korean scenarios for voice phishing, smishing, sextortion, dating safety, relationship coercion, safe return, romance/investment scams, trade/loan/job fraud, and parent-protection workflows. Each scenario includes structured questions, risk scoring, recommended actions, safe copy templates, and official-resource labels.

## Maintainer role

I created and maintain this repository. It is a public-interest extraction from Korean safety-check workflows originally explored for FlowMind, published separately so other developers, community tools, Discord bots, static websites, and product teams can reuse the safety data without depending on a private backend.

## Why this matters

Korean-language safety UX is often written ad hoc, especially for high-pressure situations such as phishing calls, smishing links, sextortion threats, romance/investment scams, and parent-targeted fraud. Poor wording can overclaim, blame victims, omit official resources, or encourage unsafe confrontation.

This project tries to make the safer default reusable: pause, stop sending money or data, preserve evidence, share with trusted people, and contact official resources when urgent.

## Current maintainer bottlenecks

- Reviewing new scenario PRs for unsafe wording, overclaiming, victim-blaming, and missing emergency guidance.
- Keeping scoring thresholds and recommended-action behavior consistent across scenarios.
- Expanding Korean public-resource coverage without introducing unverified phone numbers or advice.
- Turning issue reports into regression tests and structured data updates.
- Maintaining docs, release notes, and examples for no-build integrations.

## How I would use Codex

1. Triage issues into scenario-data, scoring, safe-copy, resource-update, documentation, and test-work buckets.
2. Review PRs against `docs/safe-wording.ko.md` and flag unsafe wording or unsupported claims.
3. Generate and update regression tests whenever questions, thresholds, or recommended actions change.
4. Help convert community requests into structured JSON scenario updates that pass validation.
5. Draft release notes and maintainer summaries for each scenario expansion.
6. Improve accessibility examples, especially for parent-protection and large-text family safety pages.

## Near-term roadmap

- Add stricter JSON schema validation.
- Publish `v0.1.0` release with all nine current Korean scenarios.
- Add examples for Discord bots, static pages, family-protection pages, and app onboarding.
- Expand official-resource metadata and locale-safe copy rules.
- Invite contributions for additional Korean safety scenarios and wording reviews.

## Public impact

The repository is early, but it is intentionally public, testable, and structured for maintainable reuse. The goal is not to replace official services, but to reduce the amount of unsafe, improvised Korean safety copy in small apps and community tools.
