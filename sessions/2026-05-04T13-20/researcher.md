# 🔍 Researcher — Developer가 구현할 YoY, QoQ 등 고급 분석 지표에 사용될 '기준 시점' 데이터와 '분석 기간'의 트렌드 샘플 데이터를 확정하여 Developer에게 제공하고, 이 지표들이 가지는 학술적 근거(Authority)를 뒷받침하는 설명을 추가해 주세요.

🔍 Researcher: 작업 시작합니다.

## 📈 고급 지표 분석용 기준 데이터 및 학술적 근거 제공

CEO님의 지시에 따라, Developer가 구현할 `YoY`와 `QoQ` 같은 시계열(Time-Series) 비교 지표의 신뢰성을 확보하기 위한 **샘플 데이터 구조**와 이 지표들이 가지는 **학술적/산업적 권위(Authority)**를 아래에 제시합니다.

이 자료는 API 서버의 로직 구현과 함께, 추후 보고서나 대시보드에서 이 분석 결과를 설명할 때 필요한 근거 자료로 활용되어야 합니다.

---

### 1. 데이터 구조 확정: 고급 지표 샘플 데이터셋 (JSON/CSV 형식)

Developer가 사용할 Mock API 서버의 백엔드 로직을 테스트하기 위해, 실제 시계열 데이터를 가정한 JSON 형태를 제안합니다. 분석 대상은 '운영 효율성'에 직접적으로 영향을 미치는 핵심 성과 지표(KPI)로 한정합니다.

**[데이터셋 목적]: 2026년 Q2 실적 분석을 위한 기준 데이터**
*(기준 시점: 2025년, 비교 기간: 2026년)*

```json
{
  "analysis_target": "Q2_2026",
  "metrics_data": [
    {
      "metric_name": "Revenue",
      "unit": "KRW (백만원)",
      "periods": {
        "current_period_qtr": 1500,         // 분석 기간: Q2 2026 (실제값)
        "comparison_quarter_qtr": 1450,     // 비교 분기: Q1 2026 (직전분기)
        "base_period_qtr": 1200             // 기준 시점: Q2 2025 (작년 동기)
      }
    },
    {
      "metric_name": "ActiveUserCount",
      "unit": "명",
      "periods": {
        "current_period_qtr": 30000,       // 분석 기간: Q2 2026 (실제값)
        "comparison_quarter_qtr": 29500,   // 비교 분기: Q1 2026 (직전분기)
        "base_period_qtr": 25000            // 기준 시점: Q2 2025 (작년 동기)
      }
    },
    {
      "metric_name": "AvgEngagementRate",
      "unit": "Ratio (%)",
      "periods": {
        "current_period_qtr": 8.5,         // 분석 기간: Q2 2026 (실제값)
        "comparison_quarter_qtr": 8.4,     // 비교 분기: Q1 2026 (직전분기)
        "base_period_qtr": 7.2              // 기준 시점: Q2 2025 (작년 동기)
      }
    }
  ]
}
```

### 2. 지표별 학술적 근거 및 해석 가이드 (Authority Context)

이 분석 결과를 보고서에 활용할 때, 단순한 숫자 나열을 넘어 전문성을 부여하는 설명(Explanation) 프레임워크를 제공합니다.

| 지표 | 정의 및 측정 방식 | 권위 확보 요소 (Academic/Industry Authority) | 주의 사항 및 해석 가이드 |
| :--- | :--- | :--- | :--- |
| **YoY** (Year-over-Year) | 같은 기간의 전년도 실적 대비 성장률. $\text{Growth Rate} = (\frac{\text{Current Year Value}}{\text{Base Year Value}} - 1) \times 100$ | **계절성(Seasonality) 제거:** 가장 강력한 비교 지표입니다. 특정 분기나 월의 주기적인 변동(예: 연말 효과, 학기 시작 효과 등)을 상쇄하고 '근본적인 성장 추이'를 파악하는 데 필수적입니다. | 시장 규모가 크게 변화했을 경우 (매크로 환경), 단순 YoY 증가율만으로는 충분하지 않으며, 외부 경제 지표와 함께 분석해야 합니다. |
| **QoQ** (Quarter-over-Quarter) | 직전 분기 실적 대비 변동률. $\text{Change Rate} = (\frac{\text{Current Quarter Value}}{\text{Previous Quarter Value}} - 1) \times 100$ | **최신 트렌드 반영 속도 측정:** 단기간에 발생한 운영 효율성 개선이나 마케팅 캠페인의 즉각적인 효과를 가장 민감하게 포착할 수 있습니다. (Momentum Check). | 단기 변동성이 크므로, 하나의 분기에만 초점을 맞추면 오버피팅(Overfitting)의 위험이 있습니다. 여러 QoQ 변화가 긍정적/부정적으로 반복되는 패턴을 관찰해야 합니다. |

### 3. Developer를 위한 API 로직 가이드 업데이트 (Actionable Tip)

Developer에게 이 지표들을 계산할 때, 단순히 비율만 계산하는 것이 아니라 다음의 **세 가지 비교 값**을 모두 반환하도록 요청합니다.

1.  **YoY % Change:** (Current / Base) - 1
2.  **QoQ % Change:** (Current / Previous) - 1
3.  **Raw Value Trend:** Current vs. Previous vs. Base (시각화를 위한 3개 값의 원본 데이터).

---

📊 평가: 완료 — 요청된 샘플 데이터, 구조화된 지표 정의 및 학술적 근거(Authority Context)를 모두 제공하여 다음 단계 개발에 필요한 모든 자료가 준비됨.
📝 다음 단계: Developer에게 위 JSON 데이터를 기반으로 `/api/v1/metrics` 엔드포인트의 **실제 계산 로직 구현**을 요청하고, E2E 테스트 스위트를 통해 통합 검증한다.
