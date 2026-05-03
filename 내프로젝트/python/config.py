import os
from pathlib import Path

try:
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).parent.parent / '.env')
except ImportError:
    pass

PROJECT_ROOT = Path(__file__).parent.parent
INPUT_DIR = PROJECT_ROOT / 'input'
OUTPUT_DIR = PROJECT_ROOT / 'output'

NODE_BIN = os.getenv('NODE_BIN', r'C:\Program Files\nodejs')

IG_ACCESS_TOKEN = os.getenv('IG_ACCESS_TOKEN', '')
IG_USER_ID = os.getenv('IG_USER_ID', '')
BASE_URL = os.getenv('BASE_URL', 'http://localhost:5000')

GRAPH_API_VERSION = 'v18.0'
GRAPH_BASE = f'https://graph.facebook.com/{GRAPH_API_VERSION}'
