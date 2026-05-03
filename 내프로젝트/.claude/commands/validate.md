$ARGUMENTS 파일의 디자인 토큰과 안전영역을 검증해주세요.

## 검증 항목

### 1. 디자인 토큰
- 색상값이 `--color-*` 변수가 아닌 hex/rgb로 하드코드되어 있으면 위반
- 폰트가 Pretendard 또는 SUIT(숫자) 이외의 폰트면 위반

### 2. 안전영역
- top padding/margin < 80px 이면 위반
- bottom padding/margin < 100px 이면 위반
- left/right padding/margin < 60px 이면 위반

### 3. 텍스트 처리
- overflow: visible 또는 white-space: normal 단독 사용이면 위반
- max-lines 없이 줄바꿈 허용하면 위반

결과를 표 형식으로 출력하세요:
| 항목 | 상태 | 위치 | 비고 |
|------|------|------|------|
