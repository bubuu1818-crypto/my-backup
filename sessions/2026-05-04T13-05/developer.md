# 💻 Developer — 제공받은 전화번호 '02-6494-0119'를 사용하여, 기존 HTML/CSS 코드 블록에 있는 모든 플레이스홀더 번호와 `href` 속성 값을 정확하게 수정하고, 실제 작동하는 반응형 코드를 업데이트하여 최종본을 완성합니다.

💻 Developer: 작업 시작합니다.

Secretary와 Designer의 지시를 종합하여, 최신 공식 전화번호 `02-6494-0119`를 반영한 반응형 HTML/CSS 코드를 완성했습니다. 이 코드는 웹사이트의 주요 영역(헤더, 본문 위젯, 푸터)에 일관되게 적용될 수 있도록 모듈화되었으며, 모든 전화번호는 클릭 시 실제 전화를 거는 `tel:` 스키마와 링크 텍스트를 모두 수정했습니다.

다음 코드를 `.html` 파일로 저장하여 바로 실행하고 테스트할 수 있습니다.

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JAY CORP - 연락처 통합 모듈 (최종본)</title>
    <!-- Noto Sans KR 폰트 임포트 (가독성 최우선) -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap">
    <style>
        /* ---------------------- */
        /* 🎨 디자인 시스템 변수 정의 (Designer 스펙 기반) */
        /* ---------------------- */
        :root {
            --primary-navy: #1A237E; /* 딥 네이비 - 신뢰성 */
            --secondary-blue: #007ACC; /* 코퍼레이트 블루 - CTA/강조 */
            --text-charcoal: #333333; /* 차콜 그레이 - 메인 텍스트 */
            --background-light: #F5F7FA; /* 위젯 배경 */
            --padding-default: 20px;
        }

        /* ---------------------- */
        /* 🌐 기본 스타일 및 리셋 */
        /* ---------------------- */
        body {
            font-family: 'Noto Sans KR', sans-serif;
            line-height: 1.6;
            color: var(--text-charcoal);
            margin: 0;
            background-color: #FFFFFF;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 var(--padding-default);
        }

        /* ---------------------- */
        /* ✨ 모듈 공통 스타일 (Contact Widget) */
        /* ---------------------- */
        .contact-widget {
            background-color: var(--background-light);
            border-radius: 8px;
            padding: 30px;
            margin: 20px 0;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* 가벼운 그림자 */
        }

        .widget-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }

        .icon {
            font-size: 28px;
            color: var(--secondary-blue);
            margin-right: 15px;
        }

        .widget-title {
            font-size: 18px;
            font-weight: 500; /* Medium */
            color: var(--text-charcoal);
            margin: 0;
        }

        /* 전화번호 강조 스타일 */
        .phone-number-display {
            font-size: 28px; /* 가장 큰 사이즈로 존재감 부여 */
            font-weight: 700; /* Bold */
            color: var(--primary-navy);
            cursor: pointer;
            text-decoration: none; /* 링크 밑줄 제거 */
            transition: color 0.2s ease, background-color 0.2s ease;
        }

        /* CTA (클릭) 효과 */
        .phone-number-display:hover {
            color: var(--secondary-blue);
            background-color: rgba(0, 122, 204, 0.05); /* 호버 시 미세한 배경색 변경 */
        }

        /* ---------------------- */
        /* 📐 컴포넌트별 적용 (헤더/푸터) */
        /* ---------------------- */
        /* Header CTA */
        header {
            background-color: var(--primary-navy);
            padding: 15px 0;
            text-align: center;
        }

        .header-cta {
            display: inline-block;
            padding: 10px 25px;
            border: 2px solid var(--secondary-blue);
            border-radius: 6px;
            transition: background-color 0.3s, color 0.3s;
        }

        .header-cta:hover {
            background-color: var(--secondary-blue);
            color: white;
        }


        /* Footer */
        footer {
            background-color: #eee;
            padding: 20px 0;
            text-align: center;
            border-top: 1px solid #ddd;
        }

        /* ---------------------- */
        /* 📱 반응형 디자인 (Mobile First) */
        /* ---------------------- */
        @media (max-width: 768px) {
            .container {
                padding: 0 15px;
            }
            .phone-number-display {
                font-size: 24px; /* 모바일에서 약간 작게 조정 */
            }

            .widget-title {
                font-size: 16px;
            }
        }
    </style>
</head>
<body>

    <!-- 1. 헤더 영역 (사이트 상단 - 가장 눈에 잘 띄는 CTA) -->
    <header>
        <div class="container">
            <p style="color: white; margin-bottom: 10px;">궁금한 점이 있으신가요? 지금 바로 문의하세요.</p>
            <!-- href와 텍스트 모두 수정됨 -->
            <a href="tel:0264940119" class="header-cta">
                📞 전화 문의 (02) 6494-0119
            </a>
        </div>
    </header>

    <!-- 2. 본문 영역 (메인 콘텐츠 내 삽입되는 권위적 위젯) -->
    <div class="container">
        <h1>JAY CORP 솔루션 소개</h1>
        <p>저희는 고객의 비즈니스 성장을 위한 가장 전문적인 IT 솔루션을 제공합니다. 모든 문의 사항은 아래 '권위적 연락 모듈'을 통해 접수하실 수 있습니다.</p>

        <!-- Contact Widget -->
        <div class="contact-widget">
            <div class="widget-header">
                <span class="icon" aria-hidden="true">📞</span>
                <div>
                    <h2 class="widget-title">전화 문의 (Call Us)</h2>
                    <!-- href와 텍스트 모두 수정됨 -->
                    <a href="tel:0264940119" class="phone-number-display">(02) 6494-0119</a>
                </div>
            </div>
            <p style="margin-top: 15px; font-size: 14px;">
                (평일 오전 9시 ~ 오후 6시, 주말 및 공휴일 휴무)
            </p>
        </div>

        <!-- 임의 콘텐츠 블록 (재사용 예시) -->
        <div style="margin-top: 50px; padding: 40px; background-color: #FAFAFA;">
             <h3>데이터 파이프라인 구축 성공 사례</h3>
             <p>이 섹션에서 추가적인 연락이 필요하다면, 아래의 간결한 CTA 버튼을 이용해 주십시오.</p>
             <!-- 다른 곳에서도 링크 재사용 예시 -->
             <a href="tel:0264940119" style="display: inline-block; padding: 10px 20px; background-color: var(--secondary-blue); color: white; text-decoration: none; border-radius: 5px;">
                바로 전화 문의하기 (클릭)
             </a>
        </div>

    </div>

    <!-- 3. 푸터 영역 (사이트 하단 - 필수 정보 노출) -->
    <footer>
        <div class="container">
            &copy; 2026 JAY CORP. All Rights Reserved. | 문의: <a href="tel:0264940119" style="color: var(--primary-navy); font-weight: 500;">(02) 6494-0119</a>
        </div>
    </footer>

</body>
</html>
```

📊 평가: 완료 — CEO 지시사항과 Designer 스펙을 모두 반영하여, 모든 필수 요소에 공식 전화번호가 적용된 완전한 실행 가능한 코드를 제공했습니다.
📝 다음 단계: 이 모듈이 웹사이트의 어느 페이지(예: Home, About)에서 가장 먼저, 어떻게 노출되어야 하는지 UI/UX 흐름 설계를 진행합니다.
