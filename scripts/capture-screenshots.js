import puppeteer from 'puppeteer-core';
import { preview } from 'vite';

async function capture() {
  console.log('Starting Vite preview server...');
  const server = await preview({
    preview: {
      port: 4173,
      open: false
    }
  });

  const url = 'http://localhost:4173';
  console.log(`Server running at ${url}`);

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 850, deviceScaleFactor: 2 });

  // 1. Home Screen
  console.log('Capturing Home Screen...');
  await page.goto(`${url}/#/`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('#heroPlayBtn');
  // Close tour if visible
  const skipBtn = await page.$('#tourSkipBtn');
  if (skipBtn) await skipBtn.click();
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: 'docs/screenshots/home-screen.png' });

  // 2. Main Gameplay Flow (Round 1: Village School Question)
  console.log('Navigating to Game Briefing...');
  await page.goto(`${url}/#/play`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('#startRoundBtn');
  await page.click('#startRoundBtn');
  await page.waitForSelector('.choices-container');
  await new Promise(r => setTimeout(r, 600));
  console.log('Capturing Main Flow Gameplay...');
  await page.screenshot({ path: 'docs/screenshots/flow-gameplay.png' });

  // 3. Calm Mode Showcase
  console.log('Toggling Calm Mode...');
  await page.click('label[for="calmToggleQuestion"]');
  await new Promise(r => setTimeout(r, 500));
  console.log('Capturing Calm Mode...');
  await page.screenshot({ path: 'docs/screenshots/calm-mode.png' });

  // Switch back to Normal to play through
  await page.click('label[for="calmToggleQuestion"]');
  await new Promise(r => setTimeout(r, 300));

  // Answer Round 1 (School Earthquake) -> Drop, cover, hold
  console.log('Submitting Round 1 correct choice...');
  await page.click('button[data-choice-id="drop-cover-hold"]');
  await page.waitForSelector('#nextRoundBtn');
  await new Promise(r => setTimeout(r, 400));
  await page.click('#nextRoundBtn');

  // Round 2 (Flood) -> Turn around high ground
  console.log('Submitting Round 2 correct choice...');
  await page.waitForSelector('button[data-choice-id="turn-around-high-ground"]');
  await page.click('button[data-choice-id="turn-around-high-ground"]');
  await page.waitForSelector('#nextRoundBtn');
  await new Promise(r => setTimeout(r, 400));
  await page.click('#nextRoundBtn');

  // Round 3 (Fire) -> Crawl low feel door
  console.log('Submitting Round 3 correct choice...');
  await page.waitForSelector('button[data-choice-id="crawl-low-feel-door"]');
  await page.click('button[data-choice-id="crawl-low-feel-door"]');
  await page.waitForSelector('#nextRoundBtn');
  await new Promise(r => setTimeout(r, 400));
  await page.click('#nextRoundBtn');

  // Results Screen
  console.log('Waiting for Results screen...');
  await page.waitForSelector('.score-banner');
  await new Promise(r => setTimeout(r, 600));
  console.log('Capturing Results & Debrief...');
  await page.screenshot({ path: 'docs/screenshots/results-debrief.png' });

  console.log('All screenshots successfully saved to docs/screenshots/!');
  await browser.close();
  server.httpServer.close();
  process.exit(0);
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
