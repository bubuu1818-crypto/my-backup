다음 파일을 리뷰해주세요: $ARGUMENTS

아래 기준으로 검토하고, 발견된 이슈마다 다음 포맷으로 답변하세요:

**이슈**: 문제점 한 줄 요약
**근거**: 왜 문제인가 (rules/constraints.md 또는 architecture.md 기준 명시)
**해결**: 수정된 코드 스니펫

체크 항목:
- 디자인 토큰 일관성 (하드코드된 색상값 없는지)
- 안전영역 준수 (top 80px, bottom 100px, left/right 60px)
- TypeScript 타입 정확성 (CardData 인터페이스 기준)
- 비동기 처리 (동기적 파일 처리 금지)
- 하드코드된 경로 없는지 (process.env 사용 여부)

이슈가 없으면 "✅ 이슈 없음"으로 마무리하세요.
