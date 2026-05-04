# 🎨 Designer — 새로운 전화번호 '02-6494-0119'가 포함된 위젯의 시각적 구조와 폰트 크기, 배치를 재검토하고, 이 번호가 전문성과 신뢰감을 강조하는 방식으로 보이도록 최종 디자인 스펙을 제공합니다.

🎨 Designer: 작업 시작합니다.

## 📞 위젯 디자인 최종 스펙 제안: Authority Contact Module (권위적 연락 모듈)

CEO 지시사항에 따라, 신규 전화번호 `02-6494-0119`가 포함된 위젯은 '전문성과 신뢰감'을 최우선 목표로 디자인합니다. 시각적으로 단순하고 명확한 계층 구조를 통해 정보의 가독성을 극대화하는 것이 핵심입니다.

---

### 💡 1. 디자인 원칙 및 목표 (Guiding Principles)
*   **목표:** 신뢰성(Trustworthiness)과 접근성(Accessibility).
*   **톤앤매너:** 미니멀리즘, 권위적(Authoritative), 명료함.
*   **핵심 가이드라인:** 전화번호 자체를 콘텐츠의 가장 중요한 데이터 포인트로 취급하며, 배경 정보는 최소화합니다.

### 🎨 2. 디자인 시스템 스펙 (Visual Specs)

| 항목 | 값/규칙 | 세부 설명 |
| :--- | :--- | :--- |
| **컬러 팔레트** | Primary: `#1A237E` (딥 네이비) | 전문성, 깊은 신뢰를 상징합니다. 배경 또는 섹션 구분선에 사용. |
| | Secondary: `#007ACC` (코퍼레이트 블루) | 클릭 유도(CTA), 활성화된 요소 강조 색상. |
| | Accent/Text: `#333333` (차콜 그레이) | 메인 텍스트 및 전화번호에 사용. 높은 가독성 확보. |
| | Background: `#FFFFFF` | 배경은 항상 흰색 또는 아주 밝은 미색 계열을 유지합니다. |
| **타이포그래피** | Headline/Number: Noto Sans KR Bold / Medium | 굵고 각진 산세리프체로 강한 존재감을 부여합니다. |
| | Body/Context: Noto Sans KR Regular | 정보의 흐름과 보조 설명에 사용하며, 눈의 피로도를 낮춥니다. |

### 📐 3. 위젯 레이아웃 스펙 (Layout & Components)

**A. 구조:** Flexbox 기반의 수평적 배열을 기본으로 합니다.
**B. 컴포넌트: `Contact Widget`**

| 요소 | 스타일/스펙 | 역할 및 가이드라인 |
| :--- | :--- | :--- |
| **컨테이너 (Wrapper)** | `padding: 30px; border-radius: 8px; background-color: #F5F7FA;` | 섹션 구분을 위한 부드러운 배경. 너무 딱딱한 느낌을 완화합니다. |
| **아이콘 영역** | 크기: 24px x 24px (📞) / 색상: `#007ACC` | 시각적 시작점을 제공하며, 어떤 콘텐츠에서도 일관되게 사용되어야 합니다. |
| **헤드라인 (Title)** | 텍스트: "전화 문의" / 크기: 18px / Weight: Medium / Color: `#333333` | 위젯의 목적을 명확히 안내합니다. (최대 한 줄) |
| **폰트 사이즈 및 배치** | **전화번호:** `32px` (반응형 시 최소 26px) / Weight: Bold / Color: `#1A237E` | *가장 크고, 가장 굵게* 처리하여 페이지에서 가장 눈에 띄는 요소로 만듭니다. 이 값이 핵심입니다. |
| **서브 설명 (Optional)** | `폰트 사이즈: 14px / Color: #666666` | "전문 상담 및 기술 지원" 등 부가 설명을 넣을 경우, 위 전화번호보다 훨씬 작고 흐리게 배치합니다. |
| **CTA 영역** | 전체 블록 클릭 가능 (`cursor: pointer`) / `:hover` 시 배경 `#E3F2FD` (옅은 블루)로 변경 | 실제로는 `tel:` 링크 역할을 수행하며, 사용자에게 '클릭 가능함'을 명확히 인지시킵니다. |

### 🖥️ 4. 실행 예시 코드 스펙 (Pseudo-Code Reference)
*(개발팀에 전달할 시각적 레퍼런스)*

```css
/* Wrapper Container */
.contact-widget {
    display: flex;
    align-items: center;
    padding: 30px;
    background-color: #F5F7FA; /* Light Background for Separation */
    border-radius: 8px;
}

/* Icon and Text Grouping */
.contact-info {
    display: flex;
    align-items: center;
    gap: 20px; /* 아이콘과 텍스트 간격 */
}

/* Phone Number (The Focus) */
.phone-number {
    font-size: 32px; /* 핵심 사이즈 */
    font-weight: 700; /* Bold */
    color: #1A237E; /* Deep Navy for Authority */
}

/* CTA Link Styling (Ensuring clickability) */
.cta-link {
    text-decoration: none;
    display: block; /* 전체 영역을 클릭 가능하게 만듭니다. */
    border: 2px solid #007ACC; /* 코퍼레이트 블루 테두리 */
    padding: 10px 25px;
    transition: background-color 0.3s;
}

/* Hover Effect for UX */
.cta-link:hover {
    background-color: #E3F2FD; /* Light Blue hover effect */
}
```

---
📊 평가: 완료 — CEO가 요구한 '전문성과 신뢰감'을 바탕으로, 색상 코드, 폰트 크기(32px 강조), 레이아웃 좌표까지 포함한 구체적이고 실행 가능한 디자인 스펙 세트를 제공했습니다.
📝 다음 단계: 개발팀 리드에게 위 스펙에 기반한 `Contact Widget`의 실제 구현 결과물(Prototype)을 요청합니다.
