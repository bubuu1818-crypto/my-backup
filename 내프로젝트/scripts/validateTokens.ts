/**
 * 렌더러 HTML 출력에 하드코드된 색상값이 없는지 검증
 */
import { renderCard } from '../src/renderer/cardRenderer';
import { PLATFORM_SPECS, CardData } from '../src/types';

const HARDCODED_COLOR_PATTERN = /#[0-9a-fA-F]{3,6}(?![0-9a-fA-F])/g;
const ALLOWED_HEX = new Set(['#2D9B6E', '#F0FAF5', '#FFFFFF', '#1A1A1A', '#3D3D3D', '#9E9E9E']);

function makeTestCard(position: CardData['position']): CardData {
  return {
    cardId: `test-${position}`,
    position,
    content: '테스트 본문입니다.',
    title: '테스트 제목',
    stat: position === 'proof' ? { value: '99%', label: '테스트 지표' } : undefined,
    index: 1,
    total: 5,
  };
}

const spec = PLATFORM_SPECS['instagram-post'];
const positions: CardData['position'][] = ['hook', 'context', 'core', 'proof', 'cta'];

let hasError = false;

for (const pos of positions) {
  const card = makeTestCard(pos);
  const output = renderCard(card, spec);
  const matches = output.match(HARDCODED_COLOR_PATTERN) ?? [];
  const violations = matches.filter(c => !ALLOWED_HEX.has(c.toUpperCase()));

  if (violations.length > 0) {
    console.error(`[FAIL] ${pos} 카드에 비허용 하드코드 색상: ${violations.join(', ')}`);
    hasError = true;
  } else {
    console.log(`[PASS] ${pos}`);
  }
}

if (hasError) process.exit(1);
else console.log('\n토큰 검증 통과');
