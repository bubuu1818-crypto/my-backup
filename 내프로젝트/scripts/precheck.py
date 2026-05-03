import re
import sys

path = sys.argv[1] if len(sys.argv) > 1 else 'input/sample.txt'

with open(path, encoding='utf-8') as f:
    raw = f.read()

sections = {}
for m in re.finditer(r'\[([^\]]+)\]\s*\n([\s\S]*?)(?=\n\[|$)', raw):
    sections[m.group(1).strip()] = m.group(2).strip()

title    = sections.get('제목', '')
summary  = sections.get('요약', '')
body     = sections.get('본문', '')
cta_raw  = sections.get('CTA', '')
cta_text = cta_raw.split('|')[0].strip() if cta_raw else ''
platforms= [p.strip() for p in sections.get('플랫폼', '').split(',')]
stat     = sections.get('수치', '')

print('=== 사전 검증 ===\n')

has_error = False
for name, val, max_len in [('제목', title, 40), ('요약', summary, 60), ('CTA', cta_text, 12)]:
    length = len(val)
    if not val:
        print(f'  [ERROR] {name}: 없음')
        has_error = True
    elif length > max_len:
        print(f'  [WARN]  {name}: {length}/{max_len}자 초과 → "{val}"')
    else:
        print(f'  [PASS]  {name}: {length}/{max_len}자 → "{val[:25]}{"..." if length > 25 else ""}"')

required = ['제목', '요약', '본문', 'CTA', '플랫폼']
for key in required:
    if key not in sections:
        print(f'  [ERROR] [{key}] 섹션 없음')
        has_error = True

body_len = len(body)
if body_len <= 200:
    chunk, mid = 'context×1', 1
elif body_len <= 400:
    chunk, mid = 'context×1 + core×1', 2
else:
    chunk, mid = 'context×2 + core×2', 4

total_cards = 1 + mid + (1 if stat else 0) + 1
total_files = total_cards * len(platforms)

print(f'\n  [INFO] 본문: {body_len}자')
print(f'  [INFO] 청킹: {chunk}')
print(f'  [INFO] 카드: hook + {chunk} + {"proof + " if stat else ""}cta = {total_cards}장')
print(f'  [INFO] 플랫폼: {len(platforms)}개 → {", ".join(platforms)}')
print(f'  [INFO] 예상 파일: {total_cards}장 × {len(platforms)}플랫폼 = {total_files}개 PNG/JPG')

if stat:
    parts = [x.strip() for x in stat.split('|')]
    val_s = parts[0] if parts else '-'
    label_s = parts[1] if len(parts) > 1 else '-'
    src_s = parts[2] if len(parts) > 2 else '-'
    print(f'  [INFO] 수치: {val_s} / {label_s} / 출처: {src_s}')

valid_platforms = {'instagram-post','instagram-story','kakao','linkedin','thread'}
for p in platforms:
    if p not in valid_platforms:
        print(f'  [ERROR] 알 수 없는 플랫폼: "{p}"')
        has_error = True

print()
if has_error:
    print('[실패] 오류를 수정 후 재실행하세요.')
    sys.exit(1)
else:
    print('[통과] npm run generate 실행 가능합니다.')
