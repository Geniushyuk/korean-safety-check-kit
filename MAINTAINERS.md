# Maintainers

## Current maintainer

- Geniushyuk — repository owner and maintainer

## Maintainer responsibilities

- Review scenario data changes for accuracy, non-judgmental Korean wording, and official-resource safety.
- Keep scoring behavior predictable across scenarios.
- Require validation and smoke tests before merging data or scoring changes.
- Avoid publishing unverified legal, medical, psychological, or emergency advice.
- Keep final review human-led even when AI tools help with triage, draft tests, or documentation.

## Review checklist

Before merging a scenario or wording change:

- [ ] Does the copy avoid victim-blaming or overclaiming?
- [ ] Does the scenario include official resources when risk is high?
- [ ] Do all questions include yes/no/unknown options?
- [ ] Does `npm test` pass?
- [ ] Is the change documented if it affects public behavior?
