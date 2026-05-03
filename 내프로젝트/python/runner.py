import os
import subprocess
import shutil
from pathlib import Path
from python.config import PROJECT_ROOT, INPUT_DIR, OUTPUT_DIR, NODE_BIN


def _find_npx() -> str:
    candidates = [
        shutil.which('npx.cmd'),
        shutil.which('npx'),
        os.path.join(NODE_BIN, 'npx.cmd'),
        os.path.join(NODE_BIN, 'npx'),
        r'C:\Program Files\nodejs\npx.cmd',
    ]
    for c in candidates:
        if c and os.path.exists(c):
            return c
    raise FileNotFoundError('npx를 찾을 수 없습니다. NODE_BIN 환경변수를 확인하세요.')


def save_script(slug: str, content: str) -> str:
    INPUT_DIR.mkdir(parents=True, exist_ok=True)
    path = INPUT_DIR / f'{slug}.txt'
    path.write_text(content, encoding='utf-8')
    return str(path)


def run_pipeline(script_path: str) -> dict:
    npx = _find_npx()
    env = os.environ.copy()
    env['PATH'] = NODE_BIN + os.pathsep + env.get('PATH', '')

    result = subprocess.run(
        [npx, 'ts-node', 'index.ts', script_path],
        cwd=str(PROJECT_ROOT),
        env=env,
        capture_output=True,
        text=True,
        encoding='utf-8',
        errors='replace',
    )

    return {
        'success': result.returncode == 0,
        'stdout': result.stdout,
        'stderr': result.stderr,
    }


def get_output_files(slug: str, platform: str | None = None) -> list[dict]:
    """slug에 해당하는 출력 파일 목록 반환"""
    platforms = [platform] if platform else [
        'instagram-post', 'instagram-story', 'kakao', 'thread', 'linkedin'
    ]
    files = []
    for plat in platforms:
        plat_dir = OUTPUT_DIR / plat / slug
        if not plat_dir.exists():
            continue
        for f in sorted(plat_dir.iterdir()):
            if f.suffix.lower() in ('.png', '.jpg', '.jpeg'):
                rel = f.relative_to(OUTPUT_DIR)
                files.append({
                    'path': str(rel).replace('\\', '/'),
                    'platform': plat,
                    'filename': f.name,
                    'abs_path': str(f),
                })
    return files
