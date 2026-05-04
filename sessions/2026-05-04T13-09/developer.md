# 💻 Developer — 정의된 비즈니스 구조와 디자인 스펙을 기반으로, '종합 보고서'를 호스팅할 시스템 아키텍처 및 데이터 파이프라인 구축 계획(백엔드)과 위젯을 모든 페이지에 통합하기 위한 `tel:` 링크가 포함된 클라이언트 측 자동화 코드 구현 로드맵을 작성해 줘.

💻 Developer: 작업 시작합니다.

CEO님의 지시에 따라, '종합 보고서'를 호스팅할 백엔드 시스템 아키텍처 설계와 모든 페이지에 통합될 전문 연락처 위젯(Authority Contact Widget)의 클라이언트 자동화 로드맵을 작성했습니다. 이 계획은 서비스가 단순한 웹사이트가 아닌, 데이터를 처리하고 지식을 배포하는 **미션 크리티컬 솔루션**으로 기능하도록 합니다.

---

# 🏗️ Part I: 종합 보고서 호스팅 시스템 아키텍처 설계 (백엔드)

## 1. 목표 및 요구사항 정의
*   **목표:** 외부의 이질적인 데이터(시장 통계, 내부 KPI, 전문가 리서치 결과 등)를 수집하고 구조화하여, 실시간으로 최적화된 '지식 보고서' 형태로 사용자에게 제공한다.
*   **요구 시스템 특성:** 확장성 (Scalability), 데이터 파이프라인의 안정성(Reliability), 보안성(Security).

## 2. 아키텍처 다이어그램 및 구성 요소 (Conceptual Architecture)

| 계층 (Layer) | 구성 요소 (Component) | 역할 및 기능 | 추천 기술 스택 |
| :--- | :--- | :--- | :--- |
| **[Data Source]** | 외부 API, 내부 DB, 수동 입력 파일(CSV/JSON) | Market Data (Gartner 등), Business KPI (Google Analytics), 리서치 결과물. | - |
| **↓ Ingestion Pipeline ↓** | **데이터 통합 파이프라인** | *데이터 추출(Extraction)*: 다양한 소스에서 데이터를 가져옴.<br>*변환(Transformation)*: 비정형 데이터를 보고서 형식에 맞게 정제/가공 (예: 통계 수치를 차트 데이터셋으로 변환).<br>*적재(Loading)*: 최종적으로 저장소에 구조화된 형태로 적재. | Python (Apache Airflow / Prefect) |
| **[Data Storage]** | **데이터 웨어하우스 (DWH)** | 보고서 생성의 원본이 되는 모든 데이터를 시간순/주제별로 기록하고 관리하는 단일 진실 공급원(Single Source of Truth). | Snowflake 또는 PostgreSQL + TimescaleDB |
| **↓ Business Logic ↓** | **백엔드 API 서버 (Backend API)** | 사용자 요청을 받아 DWH에서 필요한 데이터 세트를 쿼리하고, 데이터를 조합하여 보고서의 구조화된 JSON/XML 형태로 반환. 비즈니스 로직(예: KPI 계산) 실행. | Python (Django REST Framework) 또는 Node.js (Express) |
| **[Presentation]** | **프론트엔드 클라이언트** | API 서버로부터 받은 데이터를 Designer가 정의한 스펙에 맞춰 시각화하고 사용자에게 렌더링. | React/Next.js |

## 3. 핵심 API 엔드포인트 설계 (API Specification)
백엔드 개발의 중심이 될 RESTful API 목록입니다.

| 기능 영역 | HTTP Method | Endpoint URL | 설명 | 요청 바디 (Request Body) 예시 | 응답 스키마 (Response Schema) 예시 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **보고서 조회** | `GET` | `/api/v1/report/summary` | 최신 종합 보고서의 개요 데이터 요청. | `{ "date_range": ["2026-05", "2026-06"] }` | `{ "title": string, "kpis": [object], "sections": [object] }` |
| **데이터 추출** | `GET` | `/api/v1/data/market-trends` | 특정 주제(예: AI 시장 트렌드)의 시간별 데이터 포인트 조회. | `{ "topic": "AI", "granularity": "monthly" }` | `[ { "year": 2024, "value": 1500, "unit": "억 원" }, ... ]` |
| **KPI 계산** | `POST` | `/api/v1/calculate-kpi` | 특정 KPI를 실시간으로 계산 요청 (예: LTV 추정). | `{ "users_acquired": 500, "avg_revenue": 20 }` | `{ "ltv_estimate": 8000 }` |

---

# ✨ Part II: Authority Contact Widget 자동화 코드 구현 로드맵 (클라이언트)

## 1. 목표
전체 사이트의 모든 페이지(Home, About, Product 등)에 **전문성을 강조한 통일된 연락처 위젯**을 통합하고, 클릭 시 해당 번호로 바로 전화를 걸 수 있는 기능을 확보합니다.

## 2. 구현 전략: 컴포넌트화 및 환경변수 활용
*   **접근 방식:** React/Vue 등 프레임워크 기반의 재사용 가능한 **`ContactWidget.jsx` 컴포넌트**를 제작합니다.
*   **자동화 원칙:** 모든 페이지에서 이 컴포넌트를 불러오되, 해당 컴포넌트 내부에서 전역적인 `tel:` 링크 로직을 처리하여 일관성을 유지합니다.

## 3. 핵심 코드 스니펫 (JavaScript / React 예시)
환경변수로 전화번호를 관리하고, 사용자 경험(UX)을 개선하기 위한 기본 구조입니다.

```javascript
// src/components/ContactWidget.jsx
import React from 'react';

// 환경 변수에서 번호를 불러와 하드코딩 방지 (가장 중요!)
const PHONE_NUMBER = process.env.REACT_APP_MAIN_PHONE || "02-6494-0119"; 

/**
 * @description 전문성 기반의 Authority Contact Widget 컴포넌트
 * @param {string} location - 위젯이 배치될 위치 (예: footer, sidebar)
 */
const ContactWidget = ({ location = 'footer' }) => {

    // 💡 UX 개선 로직: 클릭 시 모바일/데스크톱 여부에 따라 다른 안내를 제공할 수 있음.
    const handleCallClick = () => {
        console.log(`[Contact Widget] Calling ${PHONE_NUMBER}...`);
        window.location.href = `tel:${PHONE_NUMBER}`; // 표준 tel: 스키마 사용
    };

    return (
        <div className={`contact-widget widget-${location} authority-module`}>
            <h4>📞 문의하기 (Authority Contact)</h4>
            <p>가장 빠르고 정확한 상담을 원하시면 전화 주십시오.</p>
            
            {/* 🎯 핵심 요소: tel: 링크를 포함하고, 클릭 이벤트 핸들러 연결 */}
            <a 
                href={`tel:${PHONE_NUMBER}`} 
                onClick={handleCallClick} 
                className="cta-button cta-call"
            >
                {PHONE_NUMBER} 로 전화 걸기
            </a>

            {/* 디자인 스펙 반영: 이 섹션의 배경과 타이포그래피를 Designer가 지정한 스타일 적용 */}
        </div>
    );
};

export default ContactWidget;

// 사용법 예시 (App.js 또는 Layout.jsx): 
// <ContactWidget location="footer" />
```

---

# 🚀 Part III: 개발 로드맵 및 실행 계획 (Roadmap)

| 단계 | 목표 영역 | 주요 작업 내용 (Action Item) | 예상 기간 | 책임자 | 결과물/산출물 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Phase 1** | **데이터 파이프라인 구축 (Backend)** | Airflow를 사용하여 DWH에 초기 데이터(KPI, Market Trend)를 적재하는 ETL 스크립트 개발 및 테스트. API 서버의 `/api/v1/data` 엔드포인트 구현. | Week 1 - 2 | Developer | Python ETL Script, Initial Data Load Log |
| **Phase 2** | **보고서 시각화 프론트엔드 (Frontend)** | `ReportViewer` 컴포넌트를 제작하고, API 서버에서 받은 데이터를 기반으로 Designer가 정의한 Grid/Color 스펙에 맞춰 초기 보고서를 렌더링. | Week 3 | Developer + Designer | Report Viewer Component (JSX), UI Mockup 검토 |
| **Phase 3** | **위젯 자동화 및 배포 (Frontend)** | `ContactWidget` 컴포넌트를 완성하고, 모든 페이지 레이아웃(Layout)에 전역적으로 통합 테스트. 환경변수 설정 체크리스트 완료. | Week 4 | Developer | Global Layout Component 업데이트, 위젯 최종본 코드 |

📊 평가: 완료 — 백엔드 아키텍처와 프론트엔드 자동화 로드맵이 구체적인 기술 스택과 코드를 포함하여 명확하게 제시되었기 때문에 목표가 달성되었습니다.
📝 다음 단계: Phase 1의 '데이터 파이프라인 구축'을 시작하기 위해, DWH에 적재할 초기 데이터 소스(CSV/JSON 형식)를 확정하고 제공받아야 합니다.
