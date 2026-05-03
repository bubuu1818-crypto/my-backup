import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs/promises';
import { CardData, Platform, PLATFORM_SPECS } from '../types';
import { renderCard } from '../renderer/cardRenderer';

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function exportCards(
  cards: CardData[],
  platforms: Platform[],
  slug: string,
  outputDir: string
): Promise<string[]> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const outputPaths: string[] = [];

  try {
    for (const platform of platforms) {
      const spec = PLATFORM_SPECS[platform];
      const platformDir = path.join(outputDir, platform, slug);
      await fs.mkdir(platformDir, { recursive: true });

      const page = await browser.newPage();
      await page.setViewport({ width: spec.width, height: spec.height, deviceScaleFactor: 2 });

      for (const card of cards) {
        const htmlContent = renderCard(card, spec);
        await page.setContent(htmlContent, { waitUntil: 'load' });
        await sleep(200);

        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const filename = `${platform}_${dateStr}_${slug}_${card.position}_${String(card.index).padStart(2, '0')}.${spec.format}`;
        const filepath = path.join(platformDir, filename);

        await page.screenshot({
          path: filepath,
          type: spec.format === 'jpg' ? 'jpeg' : 'png',
          ...(spec.format === 'jpg' ? { quality: 90 } : {}),
          clip: { x: 0, y: 0, width: spec.width, height: spec.height },
        });

        outputPaths.push(filepath);
        console.log(`    → ${filename}`);
      }

      await page.close();
    }
  } finally {
    await browser.close();
  }

  return outputPaths;
}
