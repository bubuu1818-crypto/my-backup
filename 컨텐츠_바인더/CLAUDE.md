# 컨텐츠 바인더
> 카테고리: **빌드 (Product)** — `~/.claude/CLAUDE.md` 글로벌 규칙 + 카테고리 B 규칙 상속

## 목적
SaaS 콘텐츠 관리 상품 빌드 — 카드뉴스 자동생성 엔진 포함

## 기술 스택
- TypeScript (strict 모드 필수)
- 런타임: Node.js 20+
- 패키지 매니저: npm

## 코드 규칙
- `tsconfig.json` strict: true 유지
- 모든 외부 입력값 Zod로 검증
- 파일 I/O: 전부 async/await
- 환경변수: `process.env` + `.env` (하드코드 금지)
- 에러: `Result<T, E>` 패턴 (throw 최소화)

## 상품 톤 (UI 카피)
- 간결하고 기능 중심 ("저장됨", "생성 중...", "완료")
- 전문가 사용자 대상 — 설명 최소화
- 오류 메시지: 원인 + 해결 방법 함께 제공

## 카드뉴스 자동생성 연결
- 이 프로젝트가 Card News Carousel 엔진을 SaaS로 패키징
- 입력 스키마: `~/Desktop/내프로젝트/.claude/contexts/input-schema.md` 참조
- 플랫폼 스펙: `~/Desktop/내프로젝트/.claude/contexts/platform-specs.md` 참조

## 금지사항
- 🚫 `any` 타입 사용
- 🚫 동기적 파일 처리 (`fs.readFileSync` 등)
- 🚫 전역 상태 변경
- 🚫 console.log 프로덕션 잔류
