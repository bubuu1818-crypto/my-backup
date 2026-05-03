import os
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright

load_dotenv()

LOGIN_URL = "https://lmsadmin.studywill.net/AdministratorLMS/LoginIndex_one.aspx"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)  # 화면 보이게
    page = browser.new_page()
    page.goto(LOGIN_URL)
    page.wait_for_load_state("networkidle")

    # 스크린샷 저장
    page.screenshot(path="login_page.png")

    # 모든 input 필드 출력
    inputs = page.query_selector_all("input")
    print(f"\n=== input 필드 목록 ({len(inputs)}개) ===")
    for i, inp in enumerate(inputs):
        print(f"[{i}] id={inp.get_attribute('id')}, name={inp.get_attribute('name')}, type={inp.get_attribute('type')}, placeholder={inp.get_attribute('placeholder')}")

    input("\n확인 완료 후 Enter 키 누르세요...")
    browser.close()
