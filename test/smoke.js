const assert = require('assert');
const { listScenarios, getScenario, scoreAnswers, getRecommendedActions, getResources, getShareCopy } = require('../src');

const scenarios = listScenarios();
assert.equal(scenarios.length, 11);
assert.deepEqual(scenarios.map((item) => item.id).sort(), [
  'first-meeting',
  'parent-protection',
  'qr-phishing',
  'relationship-signals',
  'romance-investment',
  'safe-return',
  'secondhand-trade',
  'sextortion',
  'smishing',
  'trade-loan-job',
  'voice-phishing'
].sort());

for (const summary of scenarios) {
  const scenario = getScenario(summary.id);
  assert.ok(scenario.questions.length >= 10, `${summary.id} should have 10 questions`);
  const dangerAnswers = Object.fromEntries(scenario.questions.map((question) => [question.id, 'yes']));
  const danger = scoreAnswers(scenario, dangerAnswers);
  assert.equal(danger.level.tone, 'danger', `${summary.id} should reach danger`);
  assert.equal(getRecommendedActions(scenario, danger).length, 5);
  assert.ok(getResources(scenario).length >= 1);
  assert.ok(getShareCopy(scenario, danger).includes('112/119'));

  const safeAnswers = Object.fromEntries(scenario.questions.map((question) => [question.id, 'no']));
  const safe = scoreAnswers(scenario, safeAnswers);
  assert.equal(safe.level.tone, 'safe', `${summary.id} should be safe with no answers`);
}

const voice = getScenario('voice-phishing');
assert.ok(getResources(voice).some((item) => item.value.includes('112')));
console.log('smoke tests passed');
