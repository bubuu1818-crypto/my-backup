@echo off
echo [1] 패키지 설치 중...
pip install -r requirements.txt
playwright install chromium

echo [2] .env 파일 생성...
if not exist .env (
    copy .env.example .env
    echo .env 파일을 열어 아이디/비밀번호/카카오 토큰을 입력하세요.
    notepad .env
) else (
    echo .env 이미 존재합니다.
)

echo 완료! python eduwill_bot.py 로 테스트하세요.
pause
