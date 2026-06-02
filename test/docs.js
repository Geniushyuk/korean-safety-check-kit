const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const requiredFiles = [
  'README.md',
  'CHANGELOG.md',
  'MAINTAINERS.md',
  'AGENTS.md',
  'CONTRIBUTING.md',
  'docs/safe-wording.ko.md',
  'docs/resource-policy.ko.md',
  'docs/examples.md',
  'docs/codex-oss-application.md',
  'schema/scenario.schema.json',
  'data/scenarios.ko.json'
];

for (const file of requiredFiles) {
  assert.ok(fs.existsSync(path.join(root, file)), `${file} should exist`);
}

const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
assert.ok(readme.includes('MAINTAINERS.md'));
assert.ok(readme.includes('docs/resource-policy.ko.md'));
assert.ok(readme.includes('CHANGELOG.md'));

const changelog = fs.readFileSync(path.join(root, 'CHANGELOG.md'), 'utf8');
assert.ok(changelog.includes('v0.1.0'));

console.log('documentation tests passed');
