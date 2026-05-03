import os
import json
import requests
from datetime import datetime
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright

load_dotenv()

EDUWILL_ID = os.getenv("EDUWILL_ID")
EDUWILL_PW = os.getenv("EDUWILL_PW")
KAKAO_TOKEN = os.getenv("KAKAO_ACCESS_TOKEN")

LOGIN_URL = "https://lmsadmin.studywill.net/AdministratorLMS/LoginIndex_one.aspx"

# 수집 대상 과목 및 차수
TARGET_COURSES = [
    {"name": "2026-15 인간행동과 사회환경", "terms": ["1-5", "1-6"]},
    {"name": "2026-16 사회복지실천론",     "terms": ["1-5", "1-6"]},
]


def send_kakao(message: str):
    """카카오 나에게 보내기"""
    url = "https://kapi.kakao.com/v2/api/talk/memo/default/send"
    headers = {"Authorization": f"Bearer {KAKAO_TOKEN}"}
    payload = {
        "template_object": json.dumps({
            "object_type": "text",
            "text": message,
            "link": {"web_url": LOGIN_URL}
        })
    }
    res = requests.post(url, headers=headers, data=payload)
    if res.status_code == 200:
        print("카카오톡 전송 완료")
    else:
        print(f"카카오톡 전송 실패: {res.status_code} {res.text}")


def collect_questions(page, course_name: str, term: str) -> list[dict]:
    """질의관리 메뉴에서 특정 과목·차수의 미답변 질문 수집"""
    questions = []

    # 질의관리 메뉴 클릭 (실제 선택자는 사이트 구조에 따라 수정 필요)
    page.click("text=질의관리")
    page.wait_for_load_state("networkidle")

    # 과목 선택
    page.select_option("select[name*='course'], select[name*='subject']", label=course_name)
    page.wait_for_load_state("networkidle")

    # 차수 선택
    page.select_option("select[name*='term'], select[name*='step']", label=term)
    page.wait_for_load_state("networkidle")

    # 질문 목록 수집 (선택자는 실제 HTML 구조에 맞게 수정 필요)
    rows = page.query_selector_all("table tr:not(:first-child)")
    for row in rows:
        cells = row.query_selector_all("td")
        if len(cells) >= 3:
            questions.append({
                "과목": course_name,
                "차수": term,
                "제목": cells[1].inner_text().strip(),
                "학생": cells[2].inner_text().strip() if len(cells) > 2 else "",
                "날짜": cells[3].inner_text().strip() if len(cells) > 3 else "",
            })
    return questions


def run():
    today = datetime.now().strftime("%Y-%m-%d %H:%M")
    all_questions = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        # 저장된 쿠키로 세션 복원
        context = browser.new_context()
        if os.path.exists("session_cookies.json"):
            with open("session_cookies.json", "r", encoding="utf-8") as f:
                cookies = json.load(f)
            context.add_cookies(cookies)
            print("쿠키로 세션 복원")
        else:
            print("⚠️ session_cookies.json 없음 — save_session.py 먼저 실행하세요")
            browser.close()
            return

        page = context.new_page()
        page.goto(LOGIN_URL)
        page.wait_for_load_state("networkidle")
        print(f"접속 완료: {page.url}")

        # 과목별 질문 수집
        for course in TARGET_COURSES:
            for term in course["terms"]:
                try:
                    qs = collect_questions(page, course["name"], term)
                    all_questions.extend(qs)
                    print(f"{course['name']} {term}: {len(qs)}건")
                except Exception as e:
                    print(f"수집 오류 ({course['name']} {term}): {e}")

        browser.close()

    # 카카오톡 메시지 구성
    if not all_questions:
        message = f"[에듀윌 질의확인] {today}\n미답변 질문 없음 ✅"
    else:
        lines = [f"[에듀윌 질의확인] {today}", f"총 {len(all_questions)}건\n"]
        for q in all_questions:
            lines.append(f"▶ [{q['과목']} {q['차수']}]")
            lines.append(f"  {q['제목']} ({q['학생']}) {q['날짜']}")
        message = "\n".join(lines)

    print(message)
    send_kakao(message)


if __name__ == "__main__":
    run()
