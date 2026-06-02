const SCENARIOS = require('../data/scenarios.ko.json');

const RESOURCES = {
  emergency: { label: '긴급 위험', value: '112 경찰 / 119 응급' },
  violence: { label: '여성폭력·스토킹·교제폭력 상담', value: '1366' },
  finance: { label: '금융사기 상담', value: '1332 금융감독원' },
  cyber: { label: '스미싱·해킹 상담', value: '118 KISA' },
  bank: { label: '송금 피해', value: '해당 금융회사 고객센터 지급정지 문의' }
};

const DEFAULT_OPTIONS = [
  { label: '예', value: 'yes', score: 2 },
  { label: '아니오', value: 'no', score: 0 },
  { label: '모르겠어요', value: 'unknown', score: 1 }
];

const DEFAULT_LEVELS = [
  { minScore: 0, maxScore: 5, label: '낮음', tone: 'safe' },
  { minScore: 6, maxScore: 10, label: '주의', tone: 'notice' },
  { minScore: 11, maxScore: 15, label: '경계', tone: 'caution' },
  { minScore: 16, maxScore: 30, label: '위험 가능성 높음', tone: 'danger' }
];

function listScenarios() {
  return SCENARIOS.map(({ id, title, subtitle, category, estimatedTime }) => ({ id, title, subtitle, category, estimatedTime }));
}

function getScenario(id) {
  return SCENARIOS.find((scenario) => scenario.id === id) || null;
}

function scoreAnswers(scenario, answers = {}) {
  if (!scenario) throw new Error('scenario is required');
  const total = scenario.questions.reduce((sum, question) => {
    const value = answers[question.id] || 'unknown';
    const option = (question.options || DEFAULT_OPTIONS).find((item) => item.value === value) || DEFAULT_OPTIONS[2];
    return sum + option.score * (question.weight || 1);
  }, 0);
  const maxScore = scenario.questions.reduce((sum, question) => sum + 2 * (question.weight || 1), 0);
  const levels = scenario.resultLevels || DEFAULT_LEVELS;
  const level = levels.find((item) => total >= item.minScore && total <= item.maxScore) || levels.at(-1);
  const categoryScores = scenario.questions.reduce((acc, question) => {
    const value = answers[question.id] || 'unknown';
    const option = (question.options || DEFAULT_OPTIONS).find((item) => item.value === value) || DEFAULT_OPTIONS[2];
    acc[question.category] = (acc[question.category] || 0) + option.score * (question.weight || 1);
    return acc;
  }, {});
  return { scenarioId: scenario.id, title: scenario.title, total, maxScore, level, categoryScores, answers };
}

function getRecommendedActions(scenario, result) {
  if (!scenario || !result) throw new Error('scenario and result are required');
  if (result.level.tone === 'danger') return scenario.recommendedActions.slice(0, 5);
  if (result.level.tone === 'caution') return scenario.recommendedActions.slice(0, 4);
  return scenario.recommendedActions.slice(0, 3);
}

function getResources(scenario) {
  return scenario.officialResources || [];
}

function getShareCopy(scenario, result) {
  const template = scenario.shareTemplates?.[0] || `${scenario.title} 체크`; 
  return `${template}\n결과: ${result.level.label}\n긴급 위험이 있으면 112/119 등 공식기관에 먼저 연락하세요.`;
}

module.exports = { RESOURCES, DEFAULT_OPTIONS, DEFAULT_LEVELS, SCENARIOS, listScenarios, getScenario, scoreAnswers, getRecommendedActions, getResources, getShareCopy };
