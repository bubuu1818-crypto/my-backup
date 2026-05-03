# 입력 데이터 스키마

## 자동생성 트리거 형식

```typescript
interface CardNewsInput {
  slug: string;           // URL-safe 고유 식별자 (kebab-case)
  title: string;          // 전체 제목 (최대 40자)
  summary: string;        // 핵심 한 줄 요약 (최대 60자) → hook 카드
  body: string;           // 본문 (최대 800자) → context/core 분배
  stat?: {                // 수치 데이터 → proof 카드
    value: string;        // 예: "87%", "2.3만"
    label: string;        // 예: "사용자 만족도"
    source?: string;      // 출처
  };
  cta: {
    text: string;         // 버튼 텍스트 (최대 12자)
    url?: string;         // 링크 (선택)
  };
  imagePath?: string;     // 대표 이미지 경로
  platforms: Platform[];  // 출력 대상 플랫폼
  backgroundColor?: 'primary' | 'secondary';
}

type Platform = 'instagram-post' | 'instagram-story' | 'kakao' | 'linkedin' | 'thread';
```

## 콘텐츠 청킹 규칙 (body → 카드 분배)

```
body 길이 기준:
  0~200자   → context(1) + core(1) = 2장
  201~400자 → context(1) + core(2) = 3장
  401자 이상 → context(2) + core(2) = 4장

stat 있으면 proof 카드 1장 자동 추가
cta는 항상 마지막 카드
```

## 최소 카드 구성
```
hook → (context × 1~2) → (core × 1~2) → [proof] → cta
최소 3장 / 최대 7장
```

## 입력 파일 위치
- 단일: `./input/{slug}.json`
- 배치: `./input/batch_{YYYYMMDD}.json` (배열 형태)

## 출력 위치
- `./output/{platform}/{slug}/`
