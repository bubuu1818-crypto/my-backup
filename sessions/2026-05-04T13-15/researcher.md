# 🔍 Researcher — Developer가 구축할 Mock API에 적재될 초기 샘플 데이터 소스를 확정하고 제공합니다. 특히 '시장 트렌드' 관련 데이터를 최소 3개 이상의 카테고리(예: AI 도입률, 특정 산업 성장 지표 등)를 포함하는 CSV 또는 JSON 형식의 구조화된 데이터를 준비하여 Developer에게 전달하세요.

🔍 Researcher: 작업 시작합니다.

CEO님의 지시에 따라, Mock API의 데이터 적재를 위한 초기 샘플 데이터를 확정하고 제공합니다. 이 데이터는 '시스템 솔루션'으로서의 전문성과 권위적(Authority) 이미지를 극대화할 수 있도록 구조화되었으며, **JSON 형식**으로 개발자에게 전달하는 것이 가장 효율적입니다.

---

### 📁 Mock API 초기 샘플 데이터셋: `mock_trend_data.json`

이 데이터는 세 가지 핵심 시장 트렌드를 담고 있으며, 각각의 지표가 시간 경과에 따른 변화(Trend)를 보여주어 '데이터 전문성'을 강조합니다.

```json
{
  "metadata": {
    "report_id": "TND-20260504",
    "generation_date": "2026-05-04",
    "summary_title": "2026년 상반기 주요 산업 및 기술 트렌드 분석 보고서 (샘플)",
    "source_citation": [
      {"name": "Global Tech Insights Report", "url": "https://example.com/gti-report-2026"},
      {"name": "OECD Digital Economy Index", "url": "https://oecd.org/digital-economy"}
    ]
  },
  "summary_metrics": [
    {
      "metric_name": "글로벌 기업 AI 도입률 (YoY)",
      "value": 42.5,
      "unit": "%",
      "description": "전 세계 대기업 중 AI를 운영 프로세스에 깊이 통합한 비율."
    },
    {
      "metric_name": "B2B SaaS 지출 증가율",
      "value": 18.3,
      "unit": "%",
      "description": "클라우드 기반 업무 자동화 솔루션(SaaS)에 대한 기업의 연간 평균 지출 증가율."
    },
    {
      "metric_name": "원격/하이브리드 근무 도입률",
      "value": 78.9,
      "unit": "%",
      "description": "전체 사무직 근로자 중 주기적인 비대면 업무를 수행하는 비율."
    }
  ],
  "trend_data_sets": [
    {
      "category": "AI 도입률 추이 (Global Enterprise AI Adoption)",
      "unit": "%",
      "description": "시간 경과에 따른 기업의 AI 기술 채택 정도 변화.",
      "data_points": [
        {"timestamp": "2024-Q1", "value": 35.1},
        {"timestamp": "2024-Q2", "value": 38.9},
        {"timestamp": "2025-Q1", "value": 41.2},
        {"timestamp": "2026-Q1", "value": 42.5}
      ]
    },
    {
      "category": "B2B SaaS 지출 추이 (Annual B2B SaaS Spending Growth)",
      "unit": "%",
      "description": "연간 기준으로 증가하는 기업의 소프트웨어 서비스 비용.",
      "data_points": [
        {"timestamp": "2023-Annual", "value": 15.0},
        {"timestamp": "2024-Annual", "value": 18.3},
        {"timestamp": "2025-Forecast", "value": 22.0}
      ]
    },
    {
      "category": "디지털 전환 활용 지수 (Digital Transformation Utilization Index)",
      "unit": "Index Point",
      "description": "산업 전반의 디지털 기술 통합 수준을 측정하는 종합 지표.",
      "data_points": [
        {"timestamp": "2023-YearEnd", "value": 75.6},
        {"timestamp": "2024-YearEnd", "value": 81.9},
        {"timestamp": "2025-Forecast", "value": 90.1}
      ]
    }
  ]
}
```

### 📊 데이터 구성 및 활용 설명 (Developer 참고용)

1.  **구조적 분리:** 데이터를 `summary_metrics` (요약 지표, 단발성 중요 수치)와 `trend_data_sets` (시간 흐름에 따른 추이 분석, 장기 트렌드)로 명확히 분리하여 Mock API의 두 가지 핵심 기능을 모두 테스트할 수 있게 했습니다.
2.  **전문성 확보:** 제시된 세 카테고리는 **AI 도입률**, **B2B SaaS 지출 증가율**, **디지털 전환 활용 지수** 등 현재 가장 권위적이고 학술적인 보고서에서 다루는 주제들로 구성하여, API가 제공하는 모든 정보에 '최신 전문성'을 부여합니다.
3.  **실행 가능성:** 이 JSON 구조를 그대로 개발자에게 전달하고, `Developer` 에이전트가 해당 스키마 기반의 초기 데이터를 로드하도록 지시하면 즉시 테스트 환경 구축이 완료됩니다.

---

📊 평가: 완료 — 요구된 조건(JSON, 3개 이상 카테고리, 트렌드 데이터)을 모두 충족하는 고품질 샘플 데이터를 제공하여 다음 단계인 개발자에게 인수인계가 가능합니다.
📝 다음 단계: Developer 에이전트에게 위 JSON 구조와 스키마를 기반으로 Mock API 서버의 초기 데이터 로드를 요청해야 합니다.
