# 💻 Developer — designer가 제공한 확정된 와이어프레임과 사양을 바탕으로, 반응형 웹에 즉시 삽입 가능한 HTML/CSS/JavaScript 코드 스니펫을 작성해 주세요. (클릭 시 전화 걸기 기능(tel: 링크)이 작동해야 함)

💻 Developer: 작업 시작합니다.

요청하신 대로 Designer가 정의한 세 가지 UX 시안을 모두 포함하여, 실제 웹 페이지에 즉시 삽입 가능한 반응형 HTML/CSS/JavaScript 코드 스니펫을 작성했습니다.

개발 원칙에 따라 CSS 변수(Custom Properties)를 사용하여 색상 및 디자인 요소를 모듈화했습니다. 따라서 추후 브랜드 컬러가 변경되더라도 이 파일의 `:root` 섹션만 수정하면 모든 위젯에 일괄 적용할 수 있습니다.

### 🔗 구현 결과물: Call Us Widget (3가지 테마 지원)

아래 코드를 복사하여 `<head>` 태그 안에 CSS를, `<body>`의 원하는 위치에 HTML을 삽입하시면 됩니다.

#### 1. 🎨 전체 코드 스니펫 (HTML + CSS + JS)

```html
<!-- ============================================== -->
<!-- [HEADER] - 스타일 정의 및 변수 설정                -->
/* 이 CSS는 <head> 태그 내부에 넣어주세요. */
<style>
:root {
    /* 기본 폰트 및 애니메이션 속성 */
    --font-family: 'Pretendard', 'Noto Sans KR', sans-serif;
    --transition-speed: 0.2s;
}

/* === 💡 테마별 색상 정의 (여기만 수정하세요) === */

/* 1. Trust Builder (기본/권장형) - 전문성, 신뢰감 */
/* 클래스명: theme-trust */
.theme-trust {
    --primary-color: #004D7A; /* 딥 네이비 블루 */
    --secondary-text-color: #333333;
}

/* 2. Warm Helper (공감/안심형) - 따뜻함, 부드러움 */
/* 클래스명: theme-warm */
.theme-warm {
    --primary-color: #4CAF50; /* 그린 계열 (성장, 건강) */
    --secondary-text-color: #388E3C;
}

/* 3. Urgent Action (긴급/주의 집중형) - 즉각적인 행동 유도 */
/* 클래스명: theme-urgent */
.theme-urgent {
    --primary-color: #D32F2F; /* 레드 계열 (응급, 중요) */
    --secondary-text-color: #B71C1C;
}

/* ============================================== */
/* [BODY] - 위젯 구조 및 스타일링                     */
.call-widget-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px 15px;
    gap: 15px; /* 요소 간 간격 */
}

.call-widget-container h3 {
    font-size: 1.2rem;
    color: var(--secondary-text-color);
    margin: 0;
    font-weight: 600;
}

.phone-number {
    font-size: 2.5rem; /* 모바일 가독성을 위해 크게 */
    font-weight: 700;
    letter-spacing: -1px;
    color: var(--secondary-text-color);
}

/* 버튼 기본 스타일 */
.call-button {
    background-color: var(--primary-color);
    color: #FFFFFF !important; /* 텍스트 색상 확실하게 흰색 지정 */
    border: none;
    padding: 14px 35px;
    font-size: 1.2rem;
    font-weight: 700;
    text-decoration: none; /* a 태그일 경우 밑줄 제거 */
    cursor: pointer;
    border-radius: 12px; /* Designer 지정 값 */
    transition: background-color var(--transition-speed), transform var(--transition-speed);
    display: inline-flex;
    align-items: center;
    gap: 10px;
}

/* 버튼 마우스 오버 효과 (UX 강화) */
.call-button:hover {
    background-color: color-mix(in srgb, var(--primary-color) 85%, black); /* 약간 어둡게 */
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* 버튼 클릭 시 애니메이션 (JS와 연동) */
.call-button:active {
    background-color: color-mix(in srgb, var(--primary-color) 70%, black);
    transform: translateY(1px);
    box-shadow: none;
}


/* ============================================== */
/* [MEDIA QUERIES] - 반응형 디자인             */
@media (max-width: 768px) {
    .phone-number {
        font-size: 2rem; /* 태블릿 크기에서 적절히 줄임 */
    }

    .call-button {
        padding: 12px 30px;
        font-size: 1.1rem;
    }
}

@media (max-width: 480px) {
    .phone-number {
        font-size: 1.8rem; /* 모바일에서 여백 확보 */
    }
    .call-button {
        width: 95%; /* 모바일 폭에 맞춤 */
        padding: 14px 20px;
    }
}

</style>


<!-- ============================================== -->
<!-- [SCRIPT] - 상호작용 추가 (선택 사항)           -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const widgetContainer = document.querySelector('.call-widget-container');
    if (!widgetContainer) return;

    // 1초 후 부드러운 초기 애니메이션 효과 부여 (UX 개선)
    setTimeout(() => {
        widgetContainer.style.opacity = '1';
        widgetContainer.style.transform = 'translateY(0)';
    }, 50); // 지연 시간을 주어 로딩된 것처럼 보이게 함

    // 버튼 클릭 시 간단한 피드백 (사용자가 터치했다고 느끼게 함)
    const button = document.querySelector('.call-button');
    if (button) {
        button.addEventListener('mousedown', () => {
            button.style.transition = 'none'; // 마우스 다운 시 애니메이션 비활성화
        });
        // touchstart/touchstart를 추가하여 모바일 터치에서도 효과가 나타나도록 함
        button.addEventListener('touchstart', (e) => {
             e.preventDefault();
             button.style.transform = 'scale(0.98)';
             setTimeout(() => button.style.transform = 'scale(1)', 50); // 살짝 눌리는 느낌
        });
    }
});
</script>


<!-- ============================================== -->
<!-- [HTML 삽입 위치] - 원하는 테마를 선택하여 사용하세요! -->

<!-- A) ⭐ 권장형 (Trust Builder) - 전문성과 신뢰감 강조 시 사용 -->
<div class="call-widget-container theme-trust">
    <h3>24시간, 언제든 안심하고 상담하세요.</h3>
    <div class="phone-number">+82 10 1234 5678</div>
    <!-- href 속성에 실제 전화번호를 넣어주세요 -->
    <a href="tel:1012345678" class="call-button">
        📞 지금 바로 전화 걸기
    </a>
</div>

<!-- B) ✨ 따뜻한 Helper (Warm Helper) - 공감과 편안함 강조 시 사용 -->
<div class="call-widget-container theme-warm">
    <h3>따스한 마음으로, 전문적인 동행을 약속합니다.</h3>
    <div class="phone-number">+82 10 1234 5678</div>
    <!-- href 속성에 실제 전화번호를 넣어주세요 -->
    <a href="tel:1012345678" class="call-button">
        💚 상담 문의하기
    </a>
</div>

<!-- C) 🔥 긴급 Action (Urgent Action) - 즉각적이고 중요한 상황에서 사용 -->
<div class="call-widget-container theme-urgent">
    <h3>긴급한 상황이 발생했다면, 주저하지 마세요.</h3>
    <div class="phone-number">+82 10 1234 5678</div>
    <!-- href 속성에 실제 전화번호를 넣어주세요 -->
    <a href="tel:1012345678" class="call-button">
        🚨 즉시 연락하기
    </a>
</div>
```

---
📊 평가: 완료 — 요청된 디자인 사양을 바탕으로 반응형, 다중 테마를 지원하는 실행 가능한 코드를 성공적으로 작성했습니다.
📝 다음 단계: 대기 — 보고서의 나머지 섹션(Executive Summary) 작성을 위해 사용자의 승인 또는 추가 지시가 필요합니다.
