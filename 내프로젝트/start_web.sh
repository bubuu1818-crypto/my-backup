#!/bin/bash
# 카드뉴스 웹 서버 시작
# 사용법: bash start_web.sh

export PATH="/c/Program Files/nodejs:$PATH"
export PYTHONPATH="/c/Users/컴퓨터/Desktop/blog-posts/Lib/site-packages:/c/Users/컴퓨터/AppData/Local/Programs/Python/Python314/Lib/site-packages"

PYTHON="/c/Python314/python.exe"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "카드뉴스 자동 생성 서버 시작..."
echo "브라우저: http://localhost:5000"
echo "종료: Ctrl+C"
echo ""

cd "$PROJECT_DIR"
$PYTHON web/app.py
