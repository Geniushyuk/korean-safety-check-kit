# Korean Safety Check Kit

Open-source Korean digital safety checklist data and scoring utilities for voice phishing, smishing, sextortion, romance scams, dating safety, and emergency-response UX.

## Why this exists

Korean users often need a fast, non-judgmental way to pause during a risky moment. This kit provides reusable scenario data, scoring, recommended actions, copy templates, and official-resource labels.

## Quick usage

```js
const { getScenario, scoreAnswers, getRecommendedActions } = require('./src');
const scenario = getScenario('voice-phishing');
const result = scoreAnswers(scenario, { vp1: 'yes', vp3: 'yes', vp4: 'yes' });
console.log(result.level.label);
console.log(getRecommendedActions(scenario, result));
```

## Included scenarios

- `voice-phishing` — 검찰·경찰·금감원 사칭, 앱 설치, 현금 전달 요구
- `smishing` — 택배·범칙금·부고·정부지원금·URL·앱 설치 문자
- `sextortion` — 영상·사진 유포 협박, 금전 요구, 추가 자료 요구
- `parent-protection` — 큰 글씨 보이스피싱·자녀 사칭·앱 설치 전화 대응

## Maintainer workflow

This repository is intentionally structured for AI-assisted OSS maintenance: issue triage, PR review, regression tests, documentation updates, and release notes.

## Disclaimer

Not legal, medical, psychological, or emergency advice. In urgent danger, contact official emergency services first: 112 / 119 in Korea.

MIT License.
