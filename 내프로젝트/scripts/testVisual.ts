/**
 * 모든 카드 포지션 × 모든 플랫폼 조합을 output/test/ 에 렌더링
 * 실제 PNG를 눈으로 확인하는 시각 검증용
 */
import { runPipeline } from '../src/pipeline';
import fs from 'fs/promises';
import path from 'path';

const TEST_SCRIPT = `
[제목]
시각 검증 테스트

[요약]
모든 카드 포지션과 플랫폼을 한번에 렌더링합니다

[본문]
첫 번째 단락입니다. 배경 카드에 들어갈 내용으로 충분히 길게 작성합니다. 문장이 자연스럽게 이어지도록 합니다.

두 번째 단락입니다. 핵심 카드에 들어갈 내용입니다. 중요한 메시지를 전달합니다.

[수치]
99% | 검증 성공률 | 내부 테스트

[CTA]
지금 확인하기

[플랫폼]
instagram-post, instagram-story, kakao
`;

async function main(): Promise<void> {
  const outputDir = path.resolve('./output/test');
  await fs.mkdir(outputDir, { recursive: true });

  console.log('시각 검증 시작...\n');
  const result = await runPipeline(TEST_SCRIPT, outputDir);

  console.log(`\n${result.cardCount}장 × ${result.outputPaths.length / result.cardCount}플랫폼 = ${result.outputPaths.length}개 파일`);
  console.log(`출력 폴더: ${outputDir}`);
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
