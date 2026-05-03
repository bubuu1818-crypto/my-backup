# 플랫폼별 출력 스펙

## 지원 플랫폼

| 플랫폼 | 비율 | 픽셀 | 최대 카드 수 | 파일 포맷 |
|---|---|---|---|---|
| Instagram Post | 1:1 | 1080×1080 | 10장 | PNG/JPG |
| Instagram Story | 9:16 | 1080×1920 | 5장 | PNG/JPG |
| KakaoTalk | 1:1 | 800×800 | 8장 | JPG |
| LinkedIn | 1.91:1 | 1200×628 | 6장 | PNG/JPG |
| Thread | 1:1 | 1080×1080 | 10장 | PNG/JPG |

## 안전영역 (플랫폼별)

| 플랫폼 | top | bottom | left/right | 비고 |
|---|---|---|---|---|
| Instagram Post | 80px | 100px | 60px | UI 겹침 없음 |
| Instagram Story | 140px | 200px | 60px | 상단 프로필, 하단 링크 UI |
| KakaoTalk | 60px | 80px | 48px | 비율 축소 적용 |
| LinkedIn | 60px | 80px | 60px | — |
| Thread | 80px | 100px | 60px | Instagram과 동일 |

## 출력 파일 네이밍 규칙
```
{platform}_{YYYYMMDD}_{slug}_{position}_{index}.png
예) instagram-post_20260502_ai-trend_hook_01.png
```

## imageRatio 허용값 (템플릿 전용)
- `full-bleed` — 이미지가 카드 전체를 덮음
- `top-half` — 이미지가 상단 50% 차지
- `icon-only` — 아이콘/로고 수준 (최대 120×120px)
- `none` — 이미지 없음
