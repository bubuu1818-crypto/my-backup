import { parseScript }      from './parser/scriptParser';
import { chunkContent }     from './chunker/contentChunker';
import { exportCards }      from './exporter/platformExporter';
import { validateInput, validateCards, ValidationIssue } from './validator';

export interface PipelineResult {
  slug: string;
  cardCount: number;
  outputPaths: string[];
  issues: ValidationIssue[];
  durationMs: number;
}

export async function runPipeline(
  scriptText: string,
  outputDir: string
): Promise<PipelineResult> {
  const start = Date.now();

  // Stage 1: 파싱
  console.log('  [1/5] 대본 파싱...');
  const input = parseScript(scriptText);

  // Stage 2: 입력 검증
  console.log('  [2/5] 입력 검증...');
  const inputResult = validateInput(input);
  const allIssues: ValidationIssue[] = [...inputResult.issues];

  if (!inputResult.valid) {
    const errors = inputResult.issues.filter(i => i.level === 'error');
    throw new Error(`입력 오류 ${errors.length}건:\n${errors.map(e => `  • [${e.target}] ${e.message}`).join('\n')}`);
  }

  // Stage 3: 콘텐츠 청킹
  console.log('  [3/5] 콘텐츠 청킹...');
  const cards = chunkContent(input);

  const cardResult = validateCards(cards);
  allIssues.push(...cardResult.issues);

  if (!cardResult.valid) {
    const errors = cardResult.issues.filter(i => i.level === 'error');
    throw new Error(`카드 구성 오류 ${errors.length}건:\n${errors.map(e => `  • [${e.target}] ${e.message}`).join('\n')}`);
  }

  // Stage 4: 렌더링 + Stage 5: 플랫폼 내보내기
  console.log(`  [4/5] 렌더링...`);
  console.log(`  [5/5] 내보내기 → ${input.platforms.join(', ')}`);
  const outputPaths = await exportCards(cards, input.platforms, input.slug, outputDir);

  return {
    slug: input.slug,
    cardCount: cards.length,
    outputPaths,
    issues: allIssues,
    durationMs: Date.now() - start,
  };
}
