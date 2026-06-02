const RESOURCES = {
  emergency: { label: '긴급 위험', value: '112 경찰 / 119 응급' },
  violence: { label: '여성폭력·스토킹·교제폭력 상담', value: '1366' },
  finance: { label: '금융사기 상담', value: '1332 금융감독원' },
  cyber: { label: '스미싱·해킹 상담', value: '118 KISA' },
  bank: { label: '송금 피해', value: '해당 금융회사 고객센터 지급정지 문의' }
};
const OPTIONS = [{ label: '예', value: 'yes', score: 2 }, { label: '아니오', value: 'no', score: 0 }, { label: '모르겠어요', value: 'unknown', score: 1 }];
const LEVELS = [
  { minScore: 0, maxScore: 2, label: '낮음', tone: 'safe' },
  { minScore: 3, maxScore: 5, label: '주의', tone: 'notice' },
  { minScore: 6, maxScore: 8, label: '경계', tone: 'caution' },
  { minScore: 9, maxScore: 99, label: '위험 가능성 높음', tone: 'danger' }
];
function q(id, text, category, weight = 1) { return { id, text, category, weight, options: OPTIONS }; }
const SCENARIOS = [
  { id: 'voice-phishing', title: '보이스피싱 전화 대응', category: 'phone', questions: [q('vp1','검찰/경찰/금감원이라며 돈을 요구하나요?','agency'), q('vp2','계좌가 범죄에 연루됐다고 하나요?','fear'), q('vp3','앱 설치를 요구하나요?','app'), q('vp4','통화를 끊지 말라고 하나요?','control'), q('vp5','현금을 인출해서 전달하라고 하나요?','cash')], recommendedActions: ['즉시 통화 끊기','공식 대표번호로 직접 확인하기','돈 이체/현금 전달 금지','가족에게 확인 전화하기','피해 우려 시 112, 1332, 은행 고객센터에 지급정지 문의'], resourceKeys: ['emergency','finance','bank'] },
  { id: 'smishing', title: '스미싱/피싱 문자 판별', category: 'sms', questions: [q('sm1','문자에 URL 링크가 포함되어 있나요?','url'), q('sm2','앱 설치를 요구하나요?','app'), q('sm3','인증번호나 개인정보 입력을 요구하나요?','privacy'), q('sm4','짧은 시간 안에 처리하라고 압박하나요?','urgency'), q('sm5','이미 링크를 눌렀거나 앱을 설치했나요?','infected')], recommendedActions: ['링크 누르지 않기','앱 설치하지 않기','공식 앱/홈페이지에서 직접 확인하기','118 상담센터 안내 확인하기','의심 문자 신고 및 가족에게 공유하기'], resourceKeys: ['cyber','emergency','finance'] },
  { id: 'sextortion', title: '몸캠피싱/협박 탈출', category: 'threat', questions: [q('sx1','영상이나 사진을 유포하겠다고 협박하나요?','threat'), q('sx2','돈을 보내면 삭제하겠다고 하나요?','money'), q('sx3','추가 영상이나 사진을 요구하나요?','request'), q('sx4','대화를 지우라고 하나요?','evidence'), q('sx5','혼자 해결해야 한다고 느끼나요?','isolation')], recommendedActions: ['돈 보내지 않기','추가 사진·영상 보내지 않기','대화 캡처하기','계좌·전화번호·지갑주소 기록하기','경찰 또는 상담기관 안내 확인하기'], resourceKeys: ['emergency','cyber','violence'] },
  { id: 'parent-protection', title: '부모님 보호 모드', category: 'parent', questions: [q('pp1','검찰, 경찰, 은행이라며 돈을 보내라고 하나요?','money'), q('pp2','앱을 설치하라고 하나요?','app'), q('pp3','자녀가 다쳤다거나 납치됐다고 하나요?','family'), q('pp4','현금을 뽑아 전달하라고 하나요?','cash'), q('pp5','가족에게 말하지 말라고 하나요?','isolation')], recommendedActions: ['지금 전화 끊기','자녀 또는 가족에게 직접 확인 전화하기','돈 이체/현금 전달 금지','앱 설치 금지','112 또는 은행 고객센터 지급정지 문의'], resourceKeys: ['emergency','finance','bank'] }
];
function listScenarios() { return SCENARIOS.map(({ id, title, category }) => ({ id, title, category })); }
function getScenario(id) { return SCENARIOS.find((scenario) => scenario.id === id) || null; }
function scoreAnswers(scenario, answers = {}) {
  if (!scenario) throw new Error('scenario is required');
  const total = scenario.questions.reduce((sum, question) => {
    const value = answers[question.id] || 'unknown';
    const option = question.options.find((item) => item.value === value) || OPTIONS[2];
    return sum + option.score * (question.weight || 1);
  }, 0);
  const maxScore = scenario.questions.reduce((sum, question) => sum + 2 * (question.weight || 1), 0);
  const level = LEVELS.find((item) => total >= item.minScore && total <= item.maxScore) || LEVELS.at(-1);
  return { scenarioId: scenario.id, title: scenario.title, total, maxScore, level, answers };
}
function getRecommendedActions(scenario, result) {
  if (result.level.tone === 'danger') return scenario.recommendedActions.slice(0, 5);
  if (result.level.tone === 'caution') return scenario.recommendedActions.slice(0, 4);
  return scenario.recommendedActions.slice(0, 3);
}
function getResources(scenario) { return scenario.resourceKeys.map((key) => RESOURCES[key]).filter(Boolean); }
module.exports = { RESOURCES, OPTIONS, LEVELS, SCENARIOS, listScenarios, getScenario, scoreAnswers, getRecommendedActions, getResources };
