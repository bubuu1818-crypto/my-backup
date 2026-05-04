# 💻 Developer — 설계된 대시보드 템플릿(Designer)을 구현하기 위한 최종 프런트엔드 컴포넌트를 구축하고, Researcher가 정의한 KPI 데이터를 백엔드에서 실시간으로 불러와 노출하는 API 엔드포인트(`GET /results/visualization`)를 즉시 개발하라. 이 과정에서 로딩 시 '데이터 분석 중...' 같은 명확한 피드백 메시지를 포함시켜야 한다.

💻 Developer: 작업 시작합니다.

요청하신 대로, Designer가 정의한 권위적인 대시보드 템플릿을 구현하기 위한 프런트엔드 컴포넌트를 구축하고, Researcher가 정의된 KPI 데이터를 백엔드에서 실시간으로 불러와 처리하는 Mock API 엔드포인트를 개발했습니다.

이 솔루션은 **백엔드 (Python/Flask)**와 **프런트엔드 (HTML/JavaScript)**의 두 부분으로 구성됩니다. 이 구조는 AEP(자율 실행 프로토콜)에 따라 데이터 호출 및 렌더링 로직을 완벽하게 분리했습니다.

---

### 📁 1. 백엔드 API 서버 구현 (Python / Flask)

이 코드는 Mock API 역할을 수행하며, 실제 DB나 복잡한 계산 로직을 거치지 않고도 KPI 데이터를 구조화된 JSON 형태로 반환합니다. 이 엔드포인트는 모든 프런트엔드 데이터 요청의 단일 진입점(Single Source of Truth)입니다.

**`server.py` (Mock API Backend)**
```python
from flask import Flask, jsonify, request
import random
from datetime import datetime

app = Flask(__name__)

@app.route('/results/visualization', methods=['GET'])
def get_kpi_visualization_data():
    """
    KPI 데이터를 계산하고 시각화에 적합한 형태로 가공하여 반환하는 엔드포인트입니다.
    (Mock API: 실제 데이터 파이프라인의 E2E 테스트를 시뮬레이션합니다.)
    """
    print("--- [API CALL] /results/visualization 요청 감지 및 KPI 계산 시작 ---")
    
    # 1. 가상 데이터 로드 (실제로는 DB/Data Lake에서 가져옴)
    base_kpis = {
        "pci": random.uniform(3.0, 4.5), # Pain Point Conversion Index
        "pic": random.uniform(85.0, 92.0), # Process Integration Coverage
        "aci": random.uniform(1.2, 1.8)   # Authority Content Index
    }

    # 2. 분석 로직 시뮬레이션 (실제 백엔드 계산이 이 위치에 들어감)
    current_date = datetime.now().strftime("%Y-%m-%d")
    
    visualization_data = {
        "metadata": {
            "timestamp": str(datetime.now()),
            "report_period": f"{current_date} 기준 분석",
            "status": "SUCCESS: Data Pipeline Operational"
        },
        # Zone 1 데이터 (Executive Summary)
        "executive_summary": {
            "overall_score": round((base_kpis['pci'] + base_kpis['pic']/10 + base_kpis['aci']) / 3, 2),
            "action_recommendation": "즉시 '운영 프로세스 모니터링 위젯' 도입을 통한 병목 구간 진단 필수.",
            "alert_status": "Critical", # 예: KPI 중 하나가 임계치 미달 시 Critical로 변경 가능
        },
        # Zone 2 데이터 (KPI & 진단 분석)
        "kpi_trends": [
            {"metric": "PCI (%)", "current": round(base_kpis['pci'], 1), "trend": "+1.2%", "status": "Good"},
            {"metric": "PIC (%)", "current": round(base_kpis['pic'], 1), "trend": "-0.5%", "status": "Warning"}, # 일부러 경고를 넣음
            {"metric": "ACI (Ratio)", "current": round(base_kpis['aci'], 2), "trend": "+0.3", "status": "Good"}
        ],
        # Zone 3 데이터 (근거 데이터셋)
        "market_trends": [
            {"category": "A 산업", "score": random.uniform(75, 95), "description": "최신 트렌드에 가장 높은 적합도를 보임."},
            {"category": "B 산업", "score": random.uniform(40, 65), "description": "과거 데이터 기반의 분석이 필요함."}
        ]
    }

    return jsonify(visualization_data)

if __name__ == '__main__':
    # 로컬에서 실행하는 경우: python server.py
    print("===============================================")
    print("✅ Backend API Server (Mock Data Pipeline) 시작 완료.")
    app.run(debug=True, port=5000)
```

### 🖥️ 2. 프런트엔드 컴포넌트 구현 (HTML/JavaScript)

이 파일은 위의 백엔드 서버(`http://localhost:5000`)에서 데이터를 가져와 대시보드의 각 영역에 동적으로 삽입하고, 로딩 상태를 관리합니다.

**`dashboard_template.html`**
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JAY CORP | 운영 효율성 개선 대시보드</title>
    <!-- Pretendard 폰트 적용 (디자인 스펙 준수) -->
    <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@100;300;400;700;900&display=swap" rel="stylesheet">
    <style>
        /* 전역 CSS 스펙 */
        body { font-family: 'Pretendard', sans-serif; background-color: #f5f7fa; padding: 30px; color: #333; }
        .dashboard-container { max-width: 1400px; margin: 0 auto; }
        h1 { font-size: 2em; border-bottom: 2px solid #eee; padding-bottom: 10px; color: #1a3b68; }
        .module { background-color: white; padding: 25px; margin-bottom: 25px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); }

        /* Zone 1 - Executive Summary */
        #zone-1 { background-color: #eef4ff; border: 1px solid #cce0ff; margin-bottom: 30px; }
        .kpi-grid { display: flex; justify-content: space-between; gap: 20px; margin-top: 20px; }
        .metric-card { flex-basis: 30%; padding: 15px; border-left: 4px solid #1a3b68; background-color: #f9fbff; }

        /* Zone 2 - KPI & 진단 분석 */
        #zone-2 .kpi-list { display: flex; gap: 30px; justify-content: space-around; margin-top: 20px; }
        .kpi-item { text-align: center; padding: 15px; border-right: 1px solid #eee; flex-basis: 30%; }

        /* Zone 3 - 근거 데이터셋 */
        #zone-3 .trend-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .trend-table th, .trend-table td { padding: 12px; text-align: left; border-bottom: 1px solid #eee; }

        /* 로딩 상태 스타일 */
        #loading-state { text-align: center; padding: 50px; font-size: 1.2em; color: #888; display: none; }
    </style>
</head>
<body>

<div class="dashboard-container">
    <h1>📊 운영 효율성 개선 통합 대시보드</h1>
    <p style="margin-bottom: 30px;">[데이터 분석 기간]: <span id="report-period">--</span> | [API Status]: <span id="api-status" style="color: gray;">로딩 중...</span></p>

    <!-- 로딩 상태 표시 영역 -->
    <div id="loading-state">
        <h2 style="color: #1a3b68;">⚙️ 데이터 분석 및 통합 과정 중...</h2>
        <p>백엔드에서 KPI 지표 계산, 트렌드 비교 분석, 그리고 최종 권고 사항 도출 작업을 수행하고 있습니다. 잠시만 기다려 주십시오.</p>
    </div>

    <!-- Zone 1: Executive Summary -->
    <div id="zone-1" class="module">
        <h2>🚀 핵심 통찰 (Executive Summary)</h2>
        <p><strong>최종 권고 사항:</strong> <span id="recommendation" style="color: #d9534f; font-weight: 700;">--</span></p>
        <div class="kpi-grid">
            <div class="metric-card">
                <h4>전체 운영 점수 (Overall Score)</h4>
                <h2 id="overall-score" style="color: #1a3b68;">0.00</h2>
                <small>시스템 종속성 확보 정도를 나타내는 종합 지표.</small>
            </div>
            <div class="metric-card">
                <h4>주요 위험 경고 (Alert Status)</h4>
                <h2 id="alert-status" style="color: orange;">--</h2>
                <small>운영상 즉각적인 개입이 필요한 지표의 심각도.</small>
            </div>
             <div class="metric-card">
                <h4>분석 완료 시점</h4>
                <h2 id="report-timestamp" style="color: #5cb85c;">--</h2>
                <small>데이터 파이프라인 최종 처리 시간 기록.</small>
            </div>
        </div>
    </div>

    <!-- Zone 2: KPI & 진단 분석 -->
    <div id="zone-2" class="module">
        <h2>📈 핵심 성과 지표 (KPI) 및 운영 진단</h2>
        <div class="kpi-list">
            <div class="kpi-item">
                <h4>Pain Point 전환율 (PCI)</h4>
                <h3 id="kpi-pci" style="color: #1a3b68;">--</h3>
                <p>변화량: <span id="pci-trend">--</span></p>
            </div>
            <div class="kpi-item">
                <h4>프로세스 통합 완성도 (PIC)</h4>
                <h3 id="kpi-pic" style="color: #1a3b68;">--</h3>
                <p>변화량: <span id="pic-trend">--</span></p>
            </div>
             <div class="kpi-item">
                <h4>권위적 콘텐츠 활용 지표 (ACI)</h4>
                <h3 id="kpi-aci" style="color: #1a3b68;">--</h3>
                <p>변화량: <span id="aci-trend">--</span></p>
            </div>
        </div>
    </div>

    <!-- Zone 3: 근거 데이터셋 & 프로세스 -->
    <div id="zone-3" class="module">
        <h2>📚 시장 트렌드 매칭 및 근거 데이터 분석</h2>
        <table class="trend-table">
            <thead>
                <tr>
                    <th>분석 영역</th>
                    <th>평가 점수 (Score)</th>
                    <th>주요 진단 결과</th>
                </tr>
            </thead>
            <tbody id="market-trends-body">
                <!-- JS로 채워질 부분 -->
            </tbody>
        </table>
    </div>

</div>

<script>
    // 백엔드 API 호출 로직 (JavaScript)
    async function fetchAndRenderDashboard() {
        const loadingState = document.getElementById('loading-state');
        const apiStatusElement = document.getElementById('api-status');
        
        // 1. 로딩 상태 활성화 및 API 요청 시작 피드백 제공
        loadingState.style.display = 'block';
        document.body.scrollTop = 0; // 스크롤 최상단으로 이동

        try {
            // ** 중요: 백엔드 서버가 실행 중인 주소와 포트로 변경해야 합니다. **
            const response = await fetch('http://localhost:5000/results/visualization');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // 2. 데이터 수신 성공 시, 로딩 상태 숨기기 및 API 상태 업데이트
            loadingState.style.display = 'none';
            apiStatusElement.textContent = `✅ SUCCESS (${data.metadata.status})`;
            
            // 3. UI 컴포넌트별 데이터 바인딩 함수 호출
            renderZone1(data.executive_summary);
            renderZone2(data.kpi_trends);
            renderZone3(data.market_trends);

        } catch (error) {
            console.error("데이터 로드 실패:", error);
            loadingState.innerHTML = `<h2 style="color: red;">❌ 데이터 로드 오류 발생!</h2><p>백엔드 서버가 실행 중인지, 주소(localhost:5000)가 정확한지 확인해 주세요.</p>`;
            apiStatusElement.textContent = `🚨 ERROR (${error.message})`;
        }
    }

    // --- 렌더링 함수들 (DOM 조작) ---

    function renderZone1(summary) {
        document.getElementById('recommendation').textContent = summary.action_recommendation;
        document.getElementById('overall-score').textContent = summary.overall_score.toFixed(2);
        document.getElementById('alert-status').textContent = summary.alert_status;
        document.getElementById('report-timestamp').textContent = new Date(summary.timestamp).toLocaleTimeString();
    }

    function renderZone2(kpis) {
        // KPI 지표 업데이트 루프
        const pci = kpis.find(item => item['metric'].includes("PCI"));
        const pic = kpis.find(item => item['metric'].includes("PIC"));
        const aci = kpis.find(item => item['metric'].includes("ACI"));

        // PCI
        document.getElementById('kpi-pci').textContent = `${pci.current}%`;
        document.getElementById('pci-trend').textContent = pci.trend;
        
        // PIC
        document.getElementById('kpi-pic').textContent = `${pic.current}%`;
        document.getElementById('pic-trend').textContent = pic.trend;

        // ACI
        document.getElementById('kpi-aci').textContent = `${aci.current}`;
        document.getElementById('aci-trend').textContent = aci.trend;

