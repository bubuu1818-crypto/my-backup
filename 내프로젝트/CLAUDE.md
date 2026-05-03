# 프로젝트명: Card News Carousel Automation
> 카테고리: **빌드 (Product)** — `~/.claude/CLAUDE.md` 글로벌 규칙 + 카테고리 B 규칙 상속

## 목적
카드뉴스 자동 생성 엔진 개발 - 입력 데이터 → 다중 플랫폼 카드 생성

## 핵심 파일
- `/src/engine/` - 자동화 파이프라인 코어
- `/templates/` - 카드 레이아웃 템플릿 (5개)
- `/.claude/` - 클로드 코드용 컨텍스트

## 자주 쓰는 명령
```bash
npm run dev          # 로컬 서버 시작
npm run generate     # 샘플 카드 생성
npm run test:visual  # 스크린샷 비교
```

## 금지사항
❌ 하드코드된 색상값 사용 (토큰 사용)
❌ 안전영역 무시 (60px 마진 필수)
❌ 텍스트 넘침 처리 없음
❌ 플랫폼별 크롭 규칙 미적용

---

마지막 수정: 2026-05-02
