import puppeteer from 'puppeteer-core';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { scenarios } from '../src/features/game/content/scenarios.js';
import { sceneScenarios } from '../src/features/game/challenges/scene/fixtures.js';
import { rapidScenarios } from '../src/features/game/challenges/rapid/rapid-scenarios.js';
const root=resolve('dist');
const server=createServer(async(req,res)=>{try{
  const pathname=new URL(req.url,'http://localhost').pathname;
  if(!pathname.startsWith('/aspire_vibeathon/'))throw Error('base path');
  const file=resolve(root,decodeURIComponent(pathname.slice('/aspire_vibeathon/'.length))||'index.html');
  if(!file.startsWith(root+sep))throw Error('path');
  const body=await readFile(file);res.setHeader('Content-Type',({'.js':'text/javascript','.css':'text/css','.html':'text/html','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2'})[extname(file)]||'application/octet-stream');res.end(body);
}catch{res.writeHead(404);res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await puppeteer.launch({executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const origin=`http://127.0.0.1:${server.address().port}`;
const url=origin+'/aspire_vibeathon/#/play';
const errors=[];const external=[];
const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(!r.url().startsWith(origin)&&!r.url().startsWith('data:'))external.push(r.url());});
const click=selector=>page.click(selector);
const action=name=>click(`[data-action="${name}"]`);
const scene=name=>click(`[data-scene="${name}"]`);
const text=selector=>page.$eval(selector,e=>e.textContent);
async function ready(){await page.waitForSelector('.village-panel canvas');await delay(150);}
async function completeClassic(){for(const scenario of scenarios){await ready();await click(`[data-choice="${scenario.correctChoiceId}"]`);await action('advance');}assert.match(await text('.result-score'),/3\s*\/\s*3/);}
try {
  await page.setViewport({width:1280,height:950});await page.goto(url);await ready();await action('start');await ready();
  const before=await text('[data-seconds]');await scene('pause');const frozen=await (await page.$('canvas')).screenshot({encoding:'base64'});await delay(1200);
  assert.ok(await (await page.$('canvas')).screenshot({encoding:'base64'})===frozen,'pause freezes scene');assert.notEqual(await text('[data-seconds]'),before,'quiz clock continues while paused');
  await scene('replay');assert.equal(await text('[data-action="answer"]')!==null,true);await scene('pause');
  await action('mode');await ready();assert.equal(await page.$('[data-seconds]'),null);assert.ok(await page.$('[data-scene="next"]'));
  const still=await (await page.$('canvas')).screenshot({encoding:'base64'});await delay(21000);assert.ok(await (await page.$('canvas')).screenshot({encoding:'base64'})===still,'Calm scene remains still past old deadline');assert.equal(await page.$('[data-feedback]'),null);
  await completeClassic();console.log('PASS plain Calm, mid-timer switch, scoring, pause/replay isolation');
  await action('replay');await action('start-guide');await ready();assert.ok(await page.$('[data-action="guide"]'));
  await mkdir('docs/screenshots/living-village',{recursive:true});
  for(const scenario of scenarios){
    await ready();for(let stage=0;stage<3;stage++){await page.screenshot({path:`docs/screenshots/living-village/${scenario.hazard}-${stage}.png`,fullPage:true});if(stage<2)await scene('next');}
    await action('guide');await action('guide');assert.equal(await page.$('[data-seconds]'),null);
    await click(`[data-choice="${scenario.correctChoiceId}"]`);await ready();await page.screenshot({path:`docs/screenshots/living-village/${scenario.hazard}-feedback.png`,fullPage:true});await action('advance');
  }
  assert.match(await text('.result-score'),/3\s*\/\s*3/);console.log('PASS Eldrin full run, still stages, guide toggles');
  await action('replay');await action('mode');await action('start');await ready();await scene('pause');await delay(20500);assert.match(await text('[data-feedback]'),/Time ran out/);
  await action('advance');await click(`[data-choice="${scenarios[1].correctChoiceId}"]`);await action('advance');await click(`[data-choice="${scenarios[2].correctChoiceId}"]`);await action('advance');assert.match(await text('.result-score'),/2\s*\/\s*3/);
  await action('practice');await action('start');await click(`[data-choice="${scenarios[0].correctChoiceId}"]`);await action('advance');assert.match(await text('.result-score'),/1\s*\/\s*1/);console.log('PASS timed timeout, complete run, missed-round practice');
  for(const visualCalm of [false,true]) {
  await page.goto(url);await page.reload();if(visualCalm)await action('mode');await action('visual');
  for(let i=0;i<2;i++){
    await page.waitForFunction(()=>!document.querySelector('[data-choice-list]')?.hasAttribute('inert'));
    assert.equal(await page.$('.village-panel'),null,'visual renderers unchanged');
    const heading=await text('h1');const fixture=[...sceneScenarios,...rapidScenarios].find(s=>s.title===heading);assert.ok(fixture);
    await click(`[data-choice="${fixture.correctChoiceId}"]`);await action('advance');
  }assert.match(await text('.result-score'),/2\s*\/\s*2/);console.log(`PASS Visual Challenges + Rapid Pick (${visualCalm?'Calm':'timed'})`);
  }
  await page.reload();await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);await action('start');await ready();assert.ok(await page.$('[data-scene="next"]'));assert.ok(await page.$('[data-seconds]'));
  await page.setViewport({width:390,height:844});await delay(200);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:'docs/screenshots/living-village/mobile.png',fullPage:true});
  await page.focus('[data-scene="next"]');await page.keyboard.press('Enter');assert.match(await text('[data-village-caption]'),/2 \/ 3/);console.log('PASS reduced motion, keyboard, phone layout');
  await page.evaluate(()=>document.querySelector('canvas').dispatchEvent(new Event('webglcontextlost',{bubbles:true,cancelable:true})));
  assert.match(await text('[data-village-status]'),/fallback/);assert.equal(await page.$('canvas'),null);await scene('next');assert.match(await page.$eval('[data-village-view]',e=>e.style.backgroundImage),/earthquake-2/);await click(`[data-choice="${scenarios[0].correctChoiceId}"]`);assert.ok(await page.$('[data-feedback]'));console.log('PASS context-loss fallback remains answerable');
  const fallback=await browser.newPage();await fallback.evaluateOnNewDocument(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return type.startsWith('webgl')?null:original.call(this,type,...args);};});
  await fallback.goto(url);await fallback.click('[data-action="start"]');await fallback.waitForFunction(()=>document.querySelector('[data-village-status]')?.textContent.includes('fallback'));await fallback.click(`[data-choice="${scenarios[0].correctChoiceId}"]`);assert.ok(await fallback.$('[data-feedback]'));await fallback.close();console.log('PASS no-WebGL initial fallback');
  assert.deepEqual(errors,[]);assert.deepEqual(external,[]);console.log('PASS no page errors or external runtime requests at Pages project path');
}finally{await browser.close();await new Promise(r=>server.close(r));}
