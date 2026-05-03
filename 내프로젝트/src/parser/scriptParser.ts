import { CardNewsInput, Platform } from '../types';

const VALID_PLATFORMS: Platform[] = [
  'instagram-post', 'instagram-story', 'kakao', 'linkedin', 'thread',
];

function slugify(text: string): string {
  return text
    .replace(/[^a-zA-Z0-9가-힣]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
    .slice(0, 40);
}

function extractSections(raw: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const regex = /\[([^\]]+)\]\s*\n([\s\S]*?)(?=\n\[|$)/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(raw)) !== null) {
    sections[match[1].trim()] = match[2].trim();
  }
  return sections;
}

export function parseScript(raw: string): CardNewsInput {
  const s = extractSections(raw);

  const required = ['제목', '요약', '본문', 'CTA', '플랫폼'];
  for (const key of required) {
    if (!s[key]) throw new Error(`[${key}] 섹션이 없습니다. 대본 형식을 확인하세요.`);
  }

  // stat: "87% | 대기시간 감소율 | 출처"
  let stat: CardNewsInput['stat'];
  if (s['수치']) {
    const parts = s['수치'].split('|').map(p => p.trim());
    if (parts.length < 2) throw new Error('[수치] 형식: "값 | 라벨" 또는 "값 | 라벨 | 출처"');
    stat = { value: parts[0], label: parts[1], source: parts[2] };
  }

  // cta: "버튼 텍스트 | https://..."
  const ctaParts = s['CTA'].split('|').map(p => p.trim());
  const cta = { text: ctaParts[0], url: ctaParts[1] };

  // platforms: "instagram-post, kakao"
  const platforms = s['플랫폼']
    .split(',')
    .map(p => p.trim() as Platform)
    .filter(p => VALID_PLATFORMS.includes(p));

  if (platforms.length === 0) {
    throw new Error(`유효한 플랫폼이 없습니다. 허용값: ${VALID_PLATFORMS.join(', ')}`);
  }

  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const slug = s['slug'] || `${slugify(s['제목'])}-${dateStr}`;

  return {
    slug,
    title: s['제목'],
    summary: s['요약'],
    body: s['본문'],
    stat,
    cta,
    imagePath: s['이미지'],
    platforms,
    backgroundColor: (s['배경'] as 'primary' | 'secondary') || undefined,
  };
}
