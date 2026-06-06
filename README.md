# Korean Safety Check Kit

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)
![Scenarios](https://img.shields.io/badge/scenarios-11-blue.svg)
![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

Open-source Korean digital safety checklist data and scoring utilities for phishing, smishing, sextortion, dating safety, relationship coercion, scam prevention, QR/큐싱 phishing, secondhand-trade fraud, parent protection, and emergency-response UX.

This project is a public-interest extraction from Korean safety-check workflows originally explored for FlowMind. It is designed so websites, Discord bots, community tools, family-protection pages, and lightweight product onboarding flows can reuse structured Korean safety scenarios without inventing unsafe copy from scratch.

## Why this exists

Korean users often need a fast, non-judgmental way to pause during a risky moment. Many safety interactions happen under pressure: a phishing caller says not to hang up, a smishing message asks for a link click, a sextortion attacker demands money, a secondhand seller pushes for prepayment, or a parent is told to install an app.

This kit provides:

- reusable Korean scenario data
- yes/no/unknown scoring
- recommended next actions
- official-resource labels
- safe copy templates
- validation tests for maintainers

## Quick usage

```js
const { getScenario, scoreAnswers, getRecommendedActions, getResources } = require('korean-safety-check-kit');

const scenario = getScenario('voice-phishing');
const result = scoreAnswers(scenario, {
  vp1: 'yes',
  vp3: 'yes',
  vp4: 'yes'
});

console.log(result.level.label);
console.log(getRecommendedActions(scenario, result));
console.log(getResources(scenario));
```

No-build usage is also available through `data/scenarios.ko.json` and `data/scenarios.extra.ko.json`. The npm package already merges both files for you.

## Use cases

- **Websites & landing pages** — embed a single scenario as a 30-second self-check before a risky action.
- **Discord & community bots** — run a scenario as a slash command and return only the result level, top actions, and official resources.
- **Family-protection pages** — use `parent-protection` with large text and one clear call to action.
- **Commerce & fintech apps** — surface `secondhand-trade` at checkout or `qr-phishing` at a QR-scan step.
- **Product onboarding** — offer `first-meeting`, `relationship-signals`, and `safe-return` as optional safety modules.

## Included scenarios

- `first-meeting` — 소개팅·데이팅앱·DM 만남·술자리 후 이동
- `relationship-signals` — 위치 공유·휴대폰 검사·협박·고립 신호
- `safe-return` — 밤길·택시·술자리 후 귀가 전 체크
- `sextortion` — 영상·사진 유포 협박, 금전 요구, 추가 자료 요구
- `voice-phishing` — 검찰·경찰·금감원 사칭, 앱 설치, 현금 전달 요구
- `smishing` — 택배·범칙금·부고·정부지원금·URL·앱 설치 문자
- `romance-investment` — 고수익 투자·출금 수수료·연애 감정 이용 송금 요구
- `trade-loan-job` — 안전결제 사칭·선입금·저금리 대출·부업 수수료
- `parent-protection` — 큰 글씨 보이스피싱·자녀 사칭·앱 설치 전화 대응
- `secondhand-trade` — 중고거래 사기, 안전결제 사칭·선입금·시세 이하·외부 링크
- `qr-phishing` — QR코드·큐싱 피싱, 주차·과태료·배송 QR, 가짜 앱 설치·결제 유도

## Validating scenario data

Scenario data is validated by schema and regression tests, so contributions stay safe and consistent.

```bash
npm run validate   # checks required fields, yes/no/unknown options, and resources
npm test           # runs validation + scenario scoring + documentation smoke tests
```

Validation fails when a scenario is missing required fields (id, title, questions, recommended actions, official resources), when a question is missing a yes/no/unknown option, or when a scenario id is duplicated. New scenarios can be added to `data/scenarios.extra.ko.json` following the shape in `schema/scenario.schema.json`.

## Project files

- `data/scenarios.ko.json` — no-build Korean scenario export
- `data/scenarios.extra.ko.json` — additional scenarios merged at load time
- `schema/scenario.schema.json` — scenario data shape
- `docs/safe-wording.ko.md` — Korean safe wording rules
- `docs/resource-policy.ko.md` — official resource update policy
- `docs/examples.md` — integration examples
- `MAINTAINERS.md` — human-led review checklist
- `CHANGELOG.md` — release history

## Maintainer workflow

This repository is intentionally structured for AI-assisted OSS maintenance:

- triage scenario requests into data, scoring, copy, resource, and docs work
- review PRs for unsafe wording, overclaiming, missing official resources, and victim-blaming language
- generate regression tests when scoring thresholds change
- keep Korean public-resource guidance consistent
- draft release notes and changelogs for new scenarios

## Contributing

Contributions are welcome. Please read `MAINTAINERS.md` and `docs/safe-wording.ko.md` first, add or update scenarios in the data files, and run `npm test` before opening a pull request.

## Safety boundaries

This kit must not present itself as legal, medical, psychological, or emergency advice. It should help users pause, record, avoid escalation, and contact official resources when needed.

Urgent danger in Korea: 112 / 119.

MIT License.
