import { CardData, CardNewsInput } from '../types';

type CardDraft = Omit<CardData, 'index' | 'total'>;

function findSentenceBoundary(text: string, near: number): number {
  const range = 80;
  const start = Math.max(0, near - range);
  const segment = text.slice(start, Math.min(text.length, near + range));

  for (const ending of ['다. ', '요. ', '다.\n', '요.\n', '. ']) {
    const idx = segment.lastIndexOf(ending, near - start);
    if (idx !== -1) return start + idx + ending.length;
  }
  return near;
}

export function chunkContent(input: CardNewsInput): CardData[] {
  const drafts: CardDraft[] = [];

  // 1. Hook — 항상 첫 번째
  drafts.push({
    cardId: `${input.slug}-hook`,
    position: 'hook',
    content: input.summary,
    title: input.title,
    imagePath: input.imagePath,
    backgroundColor: input.backgroundColor,
  });

  // 2. Context + Core — body 길이 기준 분배
  const len = input.body.length;

  if (len <= 200) {
    drafts.push({
      cardId: `${input.slug}-context-1`,
      position: 'context',
      content: input.body,
      title: input.title,
    });
  } else if (len <= 400) {
    const mid = findSentenceBoundary(input.body, Math.floor(len / 2));
    drafts.push({ cardId: `${input.slug}-context-1`, position: 'context', content: input.body.slice(0, mid).trim(), title: input.title });
    drafts.push({ cardId: `${input.slug}-core-1`,    position: 'core',    content: input.body.slice(mid).trim(),   title: input.title });
  } else {
    const p1 = findSentenceBoundary(input.body, Math.floor(len * 0.25));
    const p2 = findSentenceBoundary(input.body, Math.floor(len * 0.50));
    const p3 = findSentenceBoundary(input.body, Math.floor(len * 0.75));
    drafts.push({ cardId: `${input.slug}-context-1`, position: 'context', content: input.body.slice(0,  p1).trim(), title: input.title });
    drafts.push({ cardId: `${input.slug}-context-2`, position: 'context', content: input.body.slice(p1, p2).trim(), title: input.title });
    drafts.push({ cardId: `${input.slug}-core-1`,    position: 'core',    content: input.body.slice(p2, p3).trim(), title: input.title });
    drafts.push({ cardId: `${input.slug}-core-2`,    position: 'core',    content: input.body.slice(p3).trim(),     title: input.title });
  }

  // 3. Proof — stat 있을 때만
  if (input.stat) {
    drafts.push({
      cardId: `${input.slug}-proof`,
      position: 'proof',
      content: input.stat.source || '',
      stat: input.stat,
      title: input.title,
    });
  }

  // 4. CTA — 항상 마지막
  drafts.push({
    cardId: `${input.slug}-cta`,
    position: 'cta',
    content: input.cta.url || '',
    title: input.cta.text,
  });

  const total = drafts.length;
  return drafts.map((d, i) => ({ ...d, index: i + 1, total }));
}
