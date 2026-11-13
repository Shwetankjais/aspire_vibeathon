import puppeteer from 'puppeteer-core';
import { createServer } from 'vite';

async function testHarness() {
  console.log('Starting Vite server for Rapid Pick harness test...');
  const server = await createServer({
    server: { port: 4175 }
  });
  await server.listen();

  const url = 'http://localhost:4175/src/features/game/challenges/rapid/harness.html';
  console.log(`Testing harness at ${url}`);

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 768 });

  function assert(cond, msg) {
    if (!cond) {
      console.error(`❌ FAILED: ${msg}`);
      throw new Error(msg);
    }
    console.log(`✓ PASSED: ${msg}`);
  }

  try {
    await page.goto(url, { waitUntil: 'networkidle0' });

    // 1. Wait for onReady in normal mode
    console.log('Waiting for initial onReady event...');
    await page.waitForFunction(() => {
      const text = document.getElementById('status-log')?.textContent || '';
      return text.includes('onReady fired');
    }, { timeout: 3000 });
    assert(true, 'onReady event fired after staggered reveal');

    // 2. Check 3 target cards present
    const cards = await page.$$('.rapid-card-btn');
    assert(cards.length === 3, '3 arcade cards rendered for Rapid Fire');

    // 3. Test click choice
    console.log('Clicking leave-for-meeting-place...');
    await page.click('button[data-choice-id="leave-for-meeting-place"]');
    await new Promise(r => setTimeout(r, 200));

    const statusAfterClick = await page.$eval('#status-log', el => el.textContent);
    assert(statusAfterClick.includes("onChoose fired with 'leave-for-meeting-place' (Correct: true)"), 'onChoose fired with correct choice');

    // 4. Test Calm Mode toggle
    console.log('Testing Calm Mode toggle...');
    await page.click('#chk-calm');
    await new Promise(r => setTimeout(r, 100));

    const statusCalm = await page.$eval('#status-log', el => el.textContent);
    assert(statusCalm.includes('onReady fired'), 'Calm Mode activated onReady immediately');
    const isCalmStyled = await page.$('.rapid-pick-container.calm-mode');
    assert(isCalmStyled !== null, 'Container has calm-mode class');

    // 5. Test Flood scenario
    console.log('Loading Flood scenario...');
    await page.click('#btn-flood');
    await new Promise(r => setTimeout(r, 100));

    const floodCards = await page.$$('.rapid-card-btn');
    assert(floodCards.length === 3, '3 cards rendered for Flood scenario');

    // Test Keyboard navigation (press '1' or 'A')
    console.log('Testing keyboard shortcut (Key 3)...');
    await page.keyboard.press('3');
    await new Promise(r => setTimeout(r, 200));

    const statusKey = await page.$eval('#status-log', el => el.textContent);
    assert(statusKey.includes("onChoose fired with 'turn-around-safely' (Correct: true)"), 'Keyboard shortcut 3 triggered safe flood choice');

    console.log('\n=============================================');
    console.log('🎉 ALL RAPID PICK BROWSER HARNESS TESTS PASSED!');
    console.log('=============================================');

    await browser.close();
    await server.close();
    process.exit(0);

  } catch (err) {
    console.error('Rapid Pick Harness test failed:', err);
    await browser.close();
    await server.close();
    process.exit(1);
  }
}

testHarness();
