import puppeteer from 'puppeteer-core';
import { mkdir, cp } from 'node:fs/promises';
const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});
try {
const page=await browser.newPage();await page.setViewport({width:1280,height:950,deviceScaleFactor:1});
await page.goto(process.env.TEST_URL||'http://127.0.0.1:4183/#/play');
await page.click('[data-action="mode"]');await page.click('[data-action="start-guide"]');
await mkdir('docs/screenshots/living-village',{recursive:true});
await mkdir('/tmp/disaster-village-stills',{recursive:true});
for(const hazard of ['earthquake','flood','fire']) {
await page.waitForSelector('.village-panel canvas');
for(let stage=0;stage<3;stage++){
await new Promise(r=>setTimeout(r,150));
await page.screenshot({path:`docs/screenshots/living-village/${hazard}-${stage}.png`,fullPage:true});
await (await page.$('.village-view')).screenshot({path:`/tmp/disaster-village-stills/${hazard}-${stage}.png`});
if(stage<2)await page.click('[data-scene="next"]');
}
await page.click('[data-action="answer"]');await page.waitForSelector('[data-feedback]');
await page.screenshot({path:`docs/screenshots/living-village/${hazard}-feedback.png`,fullPage:true});
await page.click('[data-action="advance"]');
}
await cp('/tmp/disaster-village-stills','src/features/game/village/stills',{recursive:true});
}finally{await browser.close();}
