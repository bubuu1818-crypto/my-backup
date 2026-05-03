import re
from dataclasses import dataclass, field
from datetime import date
from typing import Optional


@dataclass
class CardNewsForm:
    title: str
    body: str
    content_type: str  # 사례소개 / 정보제공 / 홍보 / 공지
    cta_text: str
    points: list = field(default_factory=list)
    cta_url: Optional[str] = None
    stat_value: Optional[str] = None
    stat_label: Optional[str] = None
    stat_source: Optional[str] = None
    platforms: list = field(default_factory=lambda: ['instagram-post'])
    slug: Optional[str] = None


def _slugify(text: str) -> str:
    text = re.sub(r'[^a-zA-Z0-9가-힣]', '-', text)
    text = re.sub(r'-+', '-', text).strip('-')
    return text[:30].lower()


def form_to_script(form: CardNewsForm) -> tuple[str, str]:
    """구조화된 입력 → [섹션] 스크립트 반환 (script_content, slug)"""
    date_str = date.today().strftime('%Y%m%d')
    slug = form.slug or f"{_slugify(form.title)}-{date_str}"

    # 포인트가 있으면 본문 뒤에 붙임
    body = form.body
    if form.points:
        bullets = '\n'.join(f'• {p.strip()}' for p in form.points if p.strip())
        body = f"{body}\n\n{bullets}"

    # 요약: 첫 문장 또는 50자 이하로 자름
    first_sentence = re.split(r'[.。!?]', form.body)[0].strip()
    summary = first_sentence[:60] + ('...' if len(first_sentence) > 60 else '')

    lines = [
        f'[slug]\n{slug}',
        f'[제목]\n{form.title}',
        f'[요약]\n{summary}',
        f'[본문]\n{body}',
    ]

    if form.stat_value and form.stat_label:
        stat_line = f'{form.stat_value} | {form.stat_label}'
        if form.stat_source:
            stat_line += f' | {form.stat_source}'
        lines.append(f'[수치]\n{stat_line}')

    cta_line = form.cta_text
    if form.cta_url:
        cta_line += f' | {form.cta_url}'
    lines.append(f'[CTA]\n{cta_line}')

    platforms_str = ', '.join(p.strip() for p in form.platforms)
    lines.append(f'[플랫폼]\n{platforms_str}')

    return '\n\n'.join(lines) + '\n', slug
