"""
최초 1회 실행: 아이디/비밀번호 자동 입력 → 인증번호만 직접 입력
로그인 완료 감지 시 쿠키 자동 저장
"""
import json
import os
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright

load_dotenv()

EDUWILL_ID = os.getenv("EDUWILL_ID")
EDUWILL_PW = os.getenv("EDUWILL_PW")
LOGIN_URL = "https://lmsadmin.studywill.net/AdministratorLMS/LoginIndex_one.aspx"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    page.goto(LOGIN_URL)
    page.wait_for_load_state("networkidle")

    # 아이디 / 비밀번호 자동 입력
    page.fill("#txtID", EDUWILL_ID)
    page.fill("#txtPSWD", EDUWILL_PW)

    # 로그인 버튼 클릭 (버튼 선택자 자동 탐색)
    for selector in ["input[type='submit']", "button[type='submit']", "a:has-text('로그인')", ".btn_login", "#btnLogin"]:
        btn = page.query_selector(selector)
        if btn and btn.is_visible():
            btn.click()
            break

    print("아이디/비밀번호 자동 입력 완료")
    print("인증번호를 브라우저에서 직접 입력하세요.")
    print("로그인 완료 감지 중... (자동으로 쿠키 저장됩니다)")

    # 로그인 페이지에서 벗어날 때까지 대기 (최대 3분)
    try:
        page.wait_for_url(
            lambda url: "LoginIndex" not in url,
            timeout=180000
        )
    except Exception:
        print("시간 초과(3분). 다시 실행해주세요.")
        browser.close()
        exit(1)

    # 쿠키 저장
    cookies = context.cookies()
    with open("session_cookies.json", "w", encoding="utf-8") as f:
        json.dump(cookies, f, ensure_ascii=False, indent=2)

    print(f"✅ 쿠키 {len(cookies)}개 저장 완료")
    browser.close()
