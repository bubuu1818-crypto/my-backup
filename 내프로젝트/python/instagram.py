import time
import requests
from python.config import IG_ACCESS_TOKEN, IG_USER_ID, GRAPH_BASE


def _check_credentials():
    if not IG_ACCESS_TOKEN or not IG_USER_ID:
        raise ValueError(
            'IG_ACCESS_TOKEN과 IG_USER_ID가 .env에 설정되지 않았습니다.\n'
            '.env.example을 참고하여 .env 파일을 만들어주세요.'
        )


def _create_image_container(image_url: str, is_carousel_item: bool = False) -> str:
    params = {
        'image_url': image_url,
        'access_token': IG_ACCESS_TOKEN,
    }
    if is_carousel_item:
        params['is_carousel_item'] = 'true'

    resp = requests.post(f'{GRAPH_BASE}/{IG_USER_ID}/media', params=params, timeout=30)
    data = resp.json()

    if 'error' in data:
        raise ValueError(f'이미지 컨테이너 생성 실패: {data["error"]["message"]}')

    return data['id']


def _publish(creation_id: str) -> dict:
    resp = requests.post(
        f'{GRAPH_BASE}/{IG_USER_ID}/media_publish',
        params={'creation_id': creation_id, 'access_token': IG_ACCESS_TOKEN},
        timeout=30,
    )
    data = resp.json()

    if 'error' in data:
        raise ValueError(f'게시 실패: {data["error"]["message"]}')

    return {'success': True, 'media_id': data.get('id')}


def post_carousel(image_urls: list[str], caption: str = '') -> dict:
    """여러 이미지를 캐러셀(슬라이드) 포스트로 게시"""
    _check_credentials()

    if not image_urls:
        raise ValueError('이미지 URL이 없습니다.')

    # 단일 이미지
    if len(image_urls) == 1:
        container_id = _create_image_container(image_urls[0])
        resp = requests.post(
            f'{GRAPH_BASE}/{IG_USER_ID}/media',
            params={
                'image_url': image_urls[0],
                'caption': caption,
                'access_token': IG_ACCESS_TOKEN,
            },
            timeout=30,
        )
        data = resp.json()
        if 'error' in data:
            raise ValueError(data['error']['message'])
        return _publish(data['id'])

    # 캐러셀 (최대 10장)
    container_ids = []
    for url in image_urls[:10]:
        cid = _create_image_container(url, is_carousel_item=True)
        container_ids.append(cid)
        time.sleep(0.5)

    resp = requests.post(
        f'{GRAPH_BASE}/{IG_USER_ID}/media',
        params={
            'media_type': 'CAROUSEL',
            'children': ','.join(container_ids),
            'caption': caption,
            'access_token': IG_ACCESS_TOKEN,
        },
        timeout=30,
    )
    data = resp.json()

    if 'error' in data:
        raise ValueError(f'캐러셀 컨테이너 생성 실패: {data["error"]["message"]}')

    return _publish(data['id'])


def check_token() -> dict:
    """액세스 토큰 유효성 확인"""
    _check_credentials()
    resp = requests.get(
        f'{GRAPH_BASE}/{IG_USER_ID}',
        params={'fields': 'id,username,name', 'access_token': IG_ACCESS_TOKEN},
        timeout=10,
    )
    return resp.json()
