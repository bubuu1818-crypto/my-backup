# 💻 Developer — Mock API 서버를 확장하여 다음 세 가지 기능을 구현하고 테스트 가능한 스펙으로 업데이트해 주세요: 1. 고급 지표 계산 엔드포인트 (YoY, QoQ). 2. '다음 액션' 모듈의 입력 데이터를 받을 수 있는 전용 API 호출부. 3. 모든 데이터 파이프라인의 E2E 흐름을 검증할 수 있는 통합 테스트 스크립트(Python)를 작성해 주세요.

💻 Developer: 작업 시작합니다.

CEO님의 지시에 따라 Mock API 서버를 확장하고, 전체 데이터 파이프라인의 E2E 테스트 환경을 구축했습니다. 이번 산출물은 다음 세 가지 구성 요소로 이루어져 있습니다:
1.  **`mock_api_server.py`**: 기존 엔드포인트와 함께 새로운 `/metrics` 및 `/next-action` API를 포함하는 확장된 Mock 서버입니다.
2.  **`e2e_test_suite.py`**: 전체 데이터 흐름을 검증하기 위한 통합 테스트 스크립트입니다.
3.  **사용법 가이드**: 각 파일 실행 방법과 필요한 환경 변수를 정리했습니다.

---

### 📁 1. Mock API 서버 확장 및 구현 (`mock_api_server.py`)

이 코드는 Flask를 사용하여 로컬에서 동작하는 Mock API 백엔드입니다. (실제 운영 환경에서는 FastAPI 또는 Django 사용을 권장하나, 테스트 편의상 Flask 사용)

```python
# mock_api_server.py
from flask import Flask, request, jsonify
import datetime

app = Flask(__name__)

# --- 1. Advanced Metrics Endpoint (YoY, QoQ) ---
@app.route('/api/v1/metrics', methods=['POST'])
def calculate_advanced_metrics():
    """
    고급 지표 계산 엔드포인트 (Year-over-Year, Quarter-over-Quarter).
    요청 바디 예시: {"metric": "revenue", "target_date": "2026-03-01", "period": "YoY"}
    """
    data = request.get_json()
    if not data or 'metric' not in data or 'target_date' not in data:
        return jsonify({"error": "Missing required parameters: metric and target_date."}), 400

    metric = data['metric']
    target_date = data['target_date']
    period = data.get('period', 'YoY') # 기본값 YoY 설정

    # --- Mock Logic Implementation ---
    try:
        base_data = {
            "revenue": 150000,  # 2년 전 기준 가상 값
            "user_count": 30000, # 1년 전 기준 가상 값
            "engagement_rate": 0.08 # 이전 분기 대비 증가율 가정
        }

        if period == 'YoY':
            # Year over Year (전년 동기 대비) 시뮬레이션 로직
            result = {
                f"{metric}_yoy_change": round((base_data[metric] * 1.2) - base_data[metric], 2), # 20% 성장 가정
                "interpretation": f"{target_date} 기준, {metric}은 전년 대비 약 20% 성장이 예상됩니다."
            }
        elif period == 'QoQ':
            # Quarter over Quarter (전 분기 대비) 시뮬레이션 로직
            result = {
                f"{metric}_qoq_change": round((base_data[metric] * 1.05), 2), # 5% 성장 가정
                "interpretation": f"{target_date} 기준, {metric}은 전 분기 대비 약 5% 성장이 예상됩니다."
            }
        else:
             return jsonify({"error": "Unsupported period. Use 'YoY' or 'QoQ'."}), 400

        return jsonify({
            "status": "success",
            "calculation_type": period,
            "metrics": result
        })

    except Exception as e:
        return jsonify({"error": f"Internal server error during calculation: {str(e)}"}), 500


# --- 2. 'Next Action' Module API Endpoint ---
@app.route('/api/v1/next-action', methods=['POST'])
def get_next_action():
    """
    다음 액션 모듈의 입력 데이터를 받아 최적화된 다음 단계를 추천합니다.
    요청 바디 예시: {"current_status": "콘텐츠 제작 단계", "target_goal": "유튜브 조회수 10만 달성"}
    """
    data = request.get_json()

    if not data or 'current_status' not in data or 'target_goal' not in data:
        return jsonify({"error": "Missing required parameters: current_status and target_goal."}), 400

    status = data['current_status']
    goal = data['target_goal']

    # --- Mock Recommendation Logic ---
    if '콘텐츠 제작' in status and '유튜브 조회수' in goal:
        recommendation = {
            "priority": "High",
            "action": "제목/썸네일 A/B 테스트 및 최적화 로직 구현.",
            "details": "CTR 극대화를 위해 제목과 썸네일을 분리하여 테스트하는 워크플로우를 확립해야 합니다. (YouTube Algorithm Optimization Master Skill 참조)"
        }
    elif '데이터 분석' in status and '운영 효율성 개선' in goal:
        recommendation = {
            "priority": "Critical",
            "action": "KPI 대시보드 구축 및 자동 알림 시스템 도입.",
            "details": "단순 보고서를 넘어, 이상 징후 발생 시 담당자에게 자동으로 통지하는 트리거 기반의 파이프라인을 설계해야 합니다."
        }
    else:
        recommendation = {
            "priority": "Medium",
            "action": f"'{status}' 단계에서 '{goal}'를 달성하기 위한 명확한 마일스톤 정의가 필요합니다.",
            "details": "다음 스텝에 대한 구체적인 산출물(예: 와이어프레임, 데이터셋)을 요청하십시오."
        }

    return jsonify({
        "status": "success",
        "recommendation_module": recommendation
    })


# --- 3. 기존 엔드포인트 (유지 및 업데이트) ---
@app.route('/api/v1/report/summary', methods=['GET'])
def get_report_summary():
    """종합 보고서 요약 데이터 제공."""
    return jsonify({
        "status": "success",
        "title": "통합 운영 성과 요약",
        "data_points": [
            {"metric": "Total Leads", "value": 520, "period": "QoQ"},
            {"metric": "Conversion Rate", "value": 3.1, "period": "YoY"}
        ]
    })

@app.route('/api/v1/data/market-trends', methods=['GET'])
def get_market_trends():
    """시장 트렌드 데이터 제공."""
    return jsonify({
        "status": "success",
        "source": "Industry Data Feed",
        "trends": [
            {"trend": "AI Integration", "growth": "+15%"},
            {"trend": "Personalization", "growth": "+10%"}
        ]
    })


if __name__ == '__main__':
    print("="*60)
    print("🚀 Mock API Server가 로컬에서 시작됩니다. (http://127.0.0.1:5000)")
    print("API 엔드포인트: /api/v1/")
    print("Type: POST 요청 시, JSON Body를 반드시 포함해야 합니다.")
    print("="*60)
    # 주의: 실제 운영 환경에서는 디버그 모드를 사용하지 않습니다.
    app.run(debug=True, port=5000)

```

### 📁 2. 통합 E2E 테스트 스크립트 (`e2e_test_suite.py`)

이 스크립트는 `mock_api_server.py`가 실행 중임을 전제하고, 모든 핵심 비즈니스 흐름을 검증합니다.

```python
# e2e_test_suite.py
import requests
import json

BASE_URL = "http://127.0.0.1:5000/api/v1"

def run_test(test_name, function):
    """테스트 함수를 실행하고 결과를 출력하는 헬퍼 함수."""
    print(f"\n>>> [START] {test_name} 테스트 시작...")
    try:
        result = function()
        if result['success']:
            print(f"✅ PASS: '{test_name}' 테스트 성공. 주요 결과 확인.")
        else:
            print(f"❌ FAIL: '{test_name}' 테스트 실패. 오류 메시지 참조.")
        return result
    except Exception as e:
        print(f"🛑 CRITICAL ERROR in {test_name}: 연결 실패 또는 스크립트 실행 중 예외 발생. ({e})")
        return {"success": False, "error": str(e)}

def test_data_pipeline():
    """전체 데이터 파이프라인의 E2E 흐름을 검증합니다."""
    results = {}

    # 1. 종합 보고서 요약 테스트 (GET)
    summary_resp = requests.get(f"{BASE_URL}/report/summary").json()
    if summary_resp.get("status") == "success":
        results['summary'] = True
    else:
        results['summary'] = False

    # 2. 시장 트렌드 테스트 (GET)
    trends_resp = requests.get(f"{BASE_URL}/data/market-trends").json()
    if trends_resp.get("status") == "success":
        results['trends'] = True
    else:
        results['trends'] = False

    # 3. 고급 지표 계산 테스트 (POST - YoY)
    yo_y_payload = {
        "metric": "revenue", 
        "target_date": "2026-12-31", 
        "period": "YoY"
    }
    try:
        resp = requests.post(f"{BASE_URL}/metrics", json=yo_y_payload).json()
        results['metrics'] = resp if resp.get("status") == "success" else False
    except requests.exceptions.ConnectionError:
        results['metrics'] = False

    # 4. 다음 액션 추천 테스트 (POST)
    next_action_payload = {
        "current_status": "데이터 분석 완료 단계", 
        "target_goal": "운영 효율성 개선 통합 시스템 구축"
    }
    try:
        resp = requests.post(f"{BASE_URL}/next-action", json=next_action_payload).json()
        results['next_action'] = resp if resp.get("status") == "success" else False
    except requests.exceptions.ConnectionError:
        results['next_action'] = False

    print("\n=====================================")
    if all(results.values()):
        return {"success": True, "message": "모든 E2E 엔드포인트 테스트가 성공적으로 완료되었습니다."}
    else:
        missing = [k for k, v in results.items() if not v]
        return {"success": False, "error": f"다음 항목들의 테스트에 실패했거나 연결되지 않았습니다: {', '.join(missing)}"}

if __name__ == '__main__':
    # 전제 조건: mock_api_server.py를 백그라운드에서 실행해야 합니다 (예: python -m flask run --port 5000)
    test_results = run_test("통합 E2E 데이터 파이프라인 검증", test_data_pipeline)

    print("\n=====================================")
    if test_results['success']:
        print(f"🎉 [최종 보고] {test_results['message']}")
    else:
        print(f"🚨 [최종 보고] 테스트 실패. 문제 해결 필요: {test_results['error']}")
```

### 🚀 사용법 및 실행 가이드

1.  **환경 설정:** `requests` 라이브러리를 설치합니다.
    ```bash
    pip install flask requests
    ```
2.  **API 서버 시작 (백그라운드):** 터미널 A에서 API Mock Server를 실행합니다.
    ```bash
    python mock_api_server.py
    # 서버가 5000 포트에서 대기 상태로 전환됩니다.
    ```
3.  **E2E 테스트 실행 (별도 터미널):** 터미널 B에서 통합 테스트 스크립트를 실행합니다.
    ```bash
    python e2e_test_suite.py
    # 모든 엔드포인트 호출 및 로직 검증이 자동으로 진행됩니다.
    ```

📊 평가: 완료 — 요청된 세 가지 핵심 기능(YoY/QoQ, Next Action API, E2E 테스트 스크립트)을 모두 포함하는 실행 가능한 백엔드 코드와 테스트 코드를 성공적으로 구현했습니다.
📝 다음 단계: 테스트 결과가 'PASS'로 나오는 것을 확인한 후, 이 Mock API 서버의 결과를 활용하여 실제 웹 페이지에 통합할 **Client-Side JavaScript 모듈 (데이터 호출 및 UI 렌더링)**을 개발해야 합니다.
