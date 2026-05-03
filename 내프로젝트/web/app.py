import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Flask, render_template, request, jsonify, send_from_directory
from python.generator import CardNewsForm, form_to_script
from python.runner import save_script, run_pipeline, get_output_files
from python.instagram import post_carousel, check_token
from python.config import OUTPUT_DIR, BASE_URL

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api/generate', methods=['POST'])
def generate():
    data = request.get_json(force=True)

    try:
        form = CardNewsForm(
            title=data['title'].strip(),
            body=data['body'].strip(),
            content_type=data.get('type', '정보제공'),
            cta_text=data['cta_text'].strip(),
            points=[p for p in data.get('points', []) if p.strip()],
            cta_url=data.get('cta_url') or None,
            stat_value=data.get('stat_value') or None,
            stat_label=data.get('stat_label') or None,
            stat_source=data.get('stat_source') or None,
            platforms=data.get('platforms') or ['instagram-post'],
        )

        script, slug = form_to_script(form)
        script_path = save_script(slug, script)
        result = run_pipeline(script_path)

        if not result['success']:
            return jsonify({'error': result['stderr'] or '파이프라인 실행 실패'}), 500

        files = get_output_files(slug)
        return jsonify({'slug': slug, 'files': files, 'stdout': result['stdout']})

    except KeyError as e:
        return jsonify({'error': f'필수 항목 누락: {e}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/output/<path:filename>')
def serve_output(filename):
    return send_from_directory(str(OUTPUT_DIR), filename)


@app.route('/api/instagram/post', methods=['POST'])
def instagram_post():
    data = request.get_json(force=True)
    slug = data.get('slug', '').strip()
    caption = data.get('caption', '')

    if not slug:
        return jsonify({'error': 'slug가 없습니다. 먼저 생성하세요.'}), 400

    files = get_output_files(slug, platform='instagram-post')
    if not files:
        return jsonify({'error': 'instagram-post 파일이 없습니다.'}), 400

    image_urls = [f"{BASE_URL}/output/{f['path']}" for f in files]

    try:
        result = post_carousel(image_urls, caption)
        return jsonify(result)
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': f'Instagram API 오류: {e}'}), 500


@app.route('/api/instagram/check', methods=['GET'])
def instagram_check():
    try:
        info = check_token()
        if 'error' in info:
            return jsonify({'valid': False, 'error': info['error']['message']}), 400
        return jsonify({'valid': True, 'account': info})
    except ValueError as e:
        return jsonify({'valid': False, 'error': str(e)}), 400


@app.route('/api/files/<slug>')
def list_files(slug):
    files = get_output_files(slug)
    return jsonify({'files': files})


if __name__ == '__main__':
    print(f'서버 시작: http://localhost:5000')
    print(f'BASE_URL: {BASE_URL}')
    app.run(debug=True, host='0.0.0.0', port=5000)
