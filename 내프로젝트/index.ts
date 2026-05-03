import fs from 'fs/promises';
import path from 'path';
import { runPipeline } from './src/pipeline';

async function main(): Promise<void> {
  const scriptPath = process.argv[2];

  if (!scriptPath) {
    console.log('\n사용법: npx ts-node index.ts <대본파일.txt>');
    console.log('예시:   npx ts-node index.ts input/sample.txt\n');
    process.exit(1);
  }

  const outputDir = path.resolve(process.env.OUTPUT_DIR ?? './output');

  console.log('\n카드뉴스 자동생성');
  console.log(`대본: ${scriptPath}`);
  console.log(`출력: ${outputDir}\n`);

  try {
    const scriptText = await fs.readFile(path.resolve(scriptPath), 'utf-8');
    const result = await runPipeline(scriptText, outputDir);

    console.log(`\n완료 (${(result.durationMs / 1000).toFixed(1)}초)`);
    console.log(`slug   : ${result.slug}`);
    console.log(`카드   : ${result.cardCount}장`);
    console.log(`파일   : ${result.outputPaths.length}개`);

    const warnings = result.issues.filter(i => i.level === 'warn');
    if (warnings.length > 0) {
      console.log(`\n경고 ${warnings.length}건:`);
      warnings.forEach(w => console.log(`  [${w.target}] ${w.message}`));
    }

    console.log('\n출력 파일:');
    result.outputPaths.forEach(p => console.log(`  ${p}`));

  } catch (err) {
    console.error(`\n오류: ${(err as Error).message}`);
    process.exit(1);
  }
}

main();
