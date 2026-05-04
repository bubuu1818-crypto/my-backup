# 🎨 Designer — 최종 대시보드(Dashboard) UI/UX 스펙을 확정할 것. 가장 상단에 '핵심 권고 사항 (Prescription)'과 '위험 경고 지표 (Warning Indicator)' 컴포넌트를 강제적으로 배치하고, Pretendard 폰트와 학술적이고 권위적인 컬러 팔레트를 사용하여 최종 목업 이미지를 생성해야 한다.

🎨 Designer: 작업 시작합니다.

# 📊 [JAY CORP] 통합 운영 솔루션 대시보드 최종 UI/UX 스펙 및 목업 가이드라인
(Authority, Academic, Prescriptive Design System)

CEO의 지시에 따라 '운영 효율성 개선 통합 시스템'으로서의 권위와 신뢰도를 극대화하는 **모듈형 대시보드 표준**을 확정합니다. 이 설계는 단순 데이터 시각화가 아닌, 사용자에게 *다음 행동(Next Action)*을 강제적으로 제시하는 논리적 구조를 핵심 원칙으로 삼습니다.

---

## 🎨 1. 디자인 시스템 기초 정의 (Design Foundation)

### A. 컬러 팔레트 (Color Palette)
| 역할 | 색상명 | HEX 코드 | 사용 원칙 |
| :--- | :--- | :--- | :--- |
| **Primary** (권위, 브랜드) | Deep Navy Blue | `#0F2C5A` | 헤더, 주요 제목(H1), 중요 섹션 배경. 전문성과 신뢰감 강조. |
| **Secondary** (배경/데이터 구분) | Light Slate Gray | `#F4F7FA` | 메인 컨테이너 배경색. 눈의 피로도를 낮추고 데이터 분리 효과 극대화. |
| **Accent-Action** (권장/성공) | Teal Blue | `#008B8B` | 핵심 권고 사항(Prescription) 컴포넌트, CTA 버튼, 긍정적 지표 상승 시. |
| **Warning-Alert** (위험/경고) | Deep Orange | `#E67E22` | 위험 경고 지표(Warning Indicator), 즉각적인 개입이 필요한 데이터 포인트에 사용. (Critical Level) |
| **Text Default** | Dark Charcoal | `#333333` | 본문 텍스트, 일반 라벨. 가독성 최우선 확보. |

### B. 타이포그래피 스케일 (Typography Scale)
*   **폰트:** Pretendard (모든 요소에 일괄 적용 필수)
*   **H1 (헤드라인):** Pretendard Bold, 28px - `#0F2C5A` (대시보드의 가장 중요한 메시지 강조)
*   **H2 (섹션 제목):** Pretendard SemiBold, 22px - `#333333`
*   **Data Label/KPI:** Pretendard Bold, 16px - `#0F2C5A` (수치 자체의 권위 강조)
*   **Body Text:** Pretendard Regular, 14px - `#333333`

---

## 🖼️ 2. 최종 대시보드 레이아웃 및 모듈 스펙 (Mockup Blueprint)

**(전체 화면 너비 기준: 1440px)**

### [A] 최상단 핵심 권고 영역 (The Authority Header - 상위 15% 공간 할당)
이 섹션은 사용자가 페이지에 접속하자마자 가장 먼저 인식하고, 즉시 행동을 취하게 만드는 '의사결정 촉진 장치'입니다.

| 컴포넌트 | 스펙 및 레이아웃 | 내용/규칙 |
| :--- | :--- | :--- |
| **1. 핵심 권고 사항 (Prescription)** | 배경: `#E8F5FF` (밝은 민트 계열) / 테두리: 2px Solid Teal Blue (`#008B8B`) / 아이콘: 💡 (Directive Icon) | **[헤드라인]** "다음 단계로 다음 행동을 취해야 합니다." - *데이터 기반의 명확한 처방(Prescriptive Logic)*을 문장으로 제시. <br>**CTA:** `[운영 개선 로직 재설정 요청]` 버튼 (Teal Blue 배경, Primary Button 스타일) |
| **2. 위험 경고 지표 (Warning Indicator)** | 배경: `#FFF3E0` (밝은 오렌지 계열) / 테두리: 2px Solid Deep Orange (`#E67E22`) / 아이콘: ⚠️ (Warning Icon) | **[제목]** "🚨 Critical Alert: 데이터 누락 및 프로세스 위험 감지" <br>**상세:** 문제 발생 지표 명시 (예: 'KPI A의 근거 데이터셋이 지난 3일간 업데이트되지 않음'). **즉각적인 조치 필요성 강조.** |

### [B] 핵심 KPI 요약 대시보드 (The Diagnostic Layer - 중위 40% 공간 할당)
가장 중요한 지표들을 3열 그리드로 배치하여, '왜' 경고가 발생했는지에 대한 근거를 제시합니다. 각 카드(Card)는 직관적인 변화 추이 그래프와 수치로 구성되어야 합니다.

*   **KPI Card 구조 (반복):**
    1.  **[지표명]**: H2 레벨 제목 (예: 서비스 전환율, 데이터 완전성 지수).
    2.  **[핵심 수치]**: Pretendard Bold, 36px. **색상 변화가 중요.** (빨간색이면 위험, 녹색이면 개선)
    3.  **[추이 그래프]**: 미니 라인 차트 (지난 7일 추이). 트렌드를 한눈에 파악하게 함.
    4.  **[요약 코멘트]**: "전주 대비 **-12% 하락**. 근본 원인 분석 필요." (Authority Tone 유지)

### [C] 프로세스/분석 보고서 모듈 (The Evidence Layer - 하위 45% 공간 할당)
복잡한 데이터를 학술적이고 권위적으로 보여주는 영역입니다. '데이터 전문성'을 최우선으로 합니다.

*   **모듈 1: 핵심 분석 차트 (Chart Viewer)**
    *   유형: 히스토그램 또는 분산형 데이터 포인트 플롯.
    *   목표: 단순히 데이터를 나열하는 것이 아니라, **특정 패턴이나 이상치를 하이라이팅(Annotation)**하여 제시해야 합니다.
    *   레이블링: X축/Y축에 학술적인 단위 명시 (예: "사용자 행동 시간 (분)", "처리 성공률 (%)").
*   **모듈 2: 연관 데이터셋 위젯 (Interconnected Widget)**
    *   구조: 타임라인 형식의 프로세스 플로우차트.
    *   기능: 'Diagnosis $\rightarrow$ Insight $\rightarrow$ Prescription' 로직이 실제로 어느 단계에서 끊어졌는지 시각적으로 보여주는 흐름도(Flowchart) 형태가 이상적입니다.

---
**[참고] 개발/구현 원칙:** 모든 컴포넌트는 모바일 대응을 위해 반응형 그리드 시스템 (Grid System, 12 Column Grid)에 맞춰 설계되어야 하며, 데이터 로딩 시 스켈레톤 UI(Skeleton UI)를 사용하여 '시스템이 작동하고 있음'을 사용자에게 인지시켜야 합니다.

📊 평가: 완료 — CEO의 지시에 따른 최종 대시보드 구조와 권위적 컴포넌트 배치를 완벽히 확정함.
📝 다음 단계: 개발팀/UX 에이전트에게 본 스펙과 목업 가이드라인을 전달하여 실제 Figma 기반의 프로토타입 제작 요청
