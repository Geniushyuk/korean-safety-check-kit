# Integration examples

## Static page

Use `data/scenarios.ko.json` (and `data/scenarios.extra.ko.json`) directly when a product does not need a build step.

```html
<script type="module">
  const base = await fetch('./data/scenarios.ko.json').then((res) => res.json());
  const extra = await fetch('./data/scenarios.extra.ko.json').then((res) => res.json());
  const scenarios = [...base, ...extra];
  console.log(scenarios.find((item) => item.id === 'smishing'));
</script>
```

When using the npm package, `require('korean-safety-check-kit')` already merges every scenario for you.

## Discord bot

Use a scenario id as a slash-command argument, collect yes/no/unknown answers, then return only the result level, top actions, and official resources.

Recommended commands:

- `/safety voice-phishing`
- `/safety smishing`
- `/safety qr-phishing`
- `/safety secondhand-trade`
- `/safety parent-protection`

## Family-protection page

Use `parent-protection` with large text and a single CTA:

> 지금 전화 끊기 → 가족에게 직접 확인 전화하기 → 돈 보내지 않기

## Product onboarding

Apps can use `first-meeting`, `relationship-signals`, and `safe-return` as optional safety UX modules. Commerce and fintech apps can surface `secondhand-trade` and `qr-phishing` at payment or QR-scan steps. Avoid dark patterns. Do not force users to disclose sensitive private details.
