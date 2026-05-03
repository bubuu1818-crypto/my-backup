import { CardData, CardNewsInput, PLATFORM_SPECS } from '../types';

export interface ValidationIssue {
  level: 'error' | 'warn';
  target: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  issues: ValidationIssue[];
}

function err(target: string, message: string): ValidationIssue {
  return { level: 'error', target, message };
}

function warn(target: string, message: string): ValidationIssue {
  return { level: 'warn', target, message };
}

export function validateInput(input: CardNewsInput): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (!input.title)   issues.push(err('title',   '제목이 없습니다'));
  if (!input.summary) issues.push(err('summary', '요약이 없습니다'));
  if (!input.body)    issues.push(err('body',     '본문이 없습니다'));
  if (!input.cta.text) issues.push(err('cta',    'CTA 텍스트가 없습니다'));

  if (input.title && input.title.length > 40)
    issues.push(warn('title', `제목 40자 초과 (${input.title.length}자) — hook 카드 레이아웃 깨질 수 있음`));

  if (input.summary && input.summary.length > 60)
    issues.push(warn('summary', `요약 60자 초과 (${input.summary.length}자) — hook 카드 텍스트 넘침 가능`));

  if (input.cta.text && input.cta.text.length > 12)
    issues.push(warn('cta', `CTA 텍스트 12자 초과 (${input.cta.text.length}자) — 버튼 넘침`));

  if (input.platforms.length === 0)
    issues.push(err('platforms', '출력 플랫폼이 없습니다'));

  for (const platform of input.platforms) {
    const spec = PLATFORM_SPECS[platform];
    if (!spec) issues.push(err('platforms', `알 수 없는 플랫폼: ${platform}`));
  }

  return { valid: issues.filter(i => i.level === 'error').length === 0, issues };
}

export function validateCards(cards: CardData[]): ValidationResult {
  const issues: ValidationIssue[] = [];

  for (const card of cards) {
    const id = card.cardId;

    if (card.position === 'proof' && !card.stat)
      issues.push(err(id, 'proof 카드에 stat 데이터가 없습니다'));

    if ((card.position === 'context' || card.position === 'core') && card.content.length > 200)
      issues.push(warn(id, `본문 200자 초과 (${card.content.length}자) — 가독성 저하 가능성`));

    // proof 카드는 stat이 있으면 content 없어도 유효
    if (card.content.trim().length === 0 && card.position !== 'cta' && card.position !== 'proof')
      issues.push(err(id, '카드 내용이 비어 있습니다'));
  }

  const hasHook = cards.some(c => c.position === 'hook');
  const hasCta  = cards.some(c => c.position === 'cta');
  if (!hasHook) issues.push(err('cards', 'hook 카드가 없습니다'));
  if (!hasCta)  issues.push(err('cards', 'cta 카드가 없습니다'));

  return { valid: issues.filter(i => i.level === 'error').length === 0, issues };
}
