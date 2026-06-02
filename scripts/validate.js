const fs = require('fs');
const path = require('path');

const scenarios = require('../data/scenarios.ko.json');
const requiredScenarioFields = ['id', 'title', 'subtitle', 'category', 'introCopy', 'questions', 'resultLevels', 'recommendedActions', 'officialResources', 'disclaimer'];
const requiredQuestionFields = ['id', 'text', 'helpText', 'category', 'weight', 'options'];
const ids = new Set();
const failures = [];

for (const scenario of scenarios) {
  for (const field of requiredScenarioFields) {
    if (scenario[field] === undefined || scenario[field] === null || scenario[field] === '') failures.push(`${scenario.id || 'unknown'} missing ${field}`);
  }
  if (ids.has(scenario.id)) failures.push(`duplicate scenario id ${scenario.id}`);
  ids.add(scenario.id);
  if (!Array.isArray(scenario.questions) || scenario.questions.length < 5) failures.push(`${scenario.id} needs at least 5 questions`);
  if (!Array.isArray(scenario.recommendedActions) || scenario.recommendedActions.length < 5) failures.push(`${scenario.id} needs at least 5 recommended actions`);
  if (!Array.isArray(scenario.officialResources) || scenario.officialResources.length < 1) failures.push(`${scenario.id} needs official resources`);
  for (const question of scenario.questions || []) {
    for (const field of requiredQuestionFields) {
      if (question[field] === undefined || question[field] === null || question[field] === '') failures.push(`${scenario.id}/${question.id || 'unknown'} missing ${field}`);
    }
    const values = new Set((question.options || []).map((option) => option.value));
    for (const value of ['yes', 'no', 'unknown']) {
      if (!values.has(value)) failures.push(`${scenario.id}/${question.id} missing option ${value}`);
    }
  }
}

const schemaPath = path.join(__dirname, '..', 'schema', 'scenario.schema.json');
JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`validated ${scenarios.length} scenarios`);
