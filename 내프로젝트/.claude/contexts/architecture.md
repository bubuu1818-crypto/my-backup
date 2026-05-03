# 프로젝트 아키텍처

## 자동화 파이프라인 (5단계)
1. Input Schema 검증
2. Content Chunking (의미 단위 분리)
3. Template Matching (카드 역할 맵핑)
4. Visual Rendering (디자인 토큰 적용)
5. Multi-platform Export (플랫폼별 최적화)

## 핵심 타입
```typescript
interface CardData {
  cardId: string;
  position: 'hook' | 'context' | 'core' | 'proof' | 'cta';
  content: string;
  imagePath?: string;
  backgroundColor?: 'primary' | 'secondary';
}
```

## 디자인 토큰 (프로젝트 글로벌)
- 폰트: Pretendard, 숫자는 SUIT
- 안전영역: top 80px, bottom 100px, left/right 60px
- 최소 대비: 4.5:1 (WCAG AA)
