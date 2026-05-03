다음 내용으로 카드 데이터를 생성해주세요: $ARGUMENTS

## 생성 규칙

1. CardData 인터페이스를 반드시 준수하세요:
   - cardId: 고유 식별자 (kebab-case)
   - position: hook | context | core | proof | cta 중 하나
   - content: 해당 포지션의 maxChars 초과 금지
   - backgroundColor: primary | secondary 중 하나 (선택)

2. 포지션별 maxChars 기준:
   - hook: 제목 10자 이내
   - context / core / proof: 본문 60자 이내
   - cta: 버튼 텍스트 12자 이내

3. 출력 형식: TypeScript 객체 리터럴

생성 후 validate 체크리스트도 함께 출력하세요.
