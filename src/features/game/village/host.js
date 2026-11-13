import './village.css';
const stillImages=import.meta.glob('./stills/*.png',{eager:true,query:'?url',import:'default'});
const labels={
  overview:['Sundarpur · Hillside village'],
  earthquake:['Small tremors · Buildings begin to sway','Road crack · An unoccupied roof is damaged','After the shaking stops'],
  flood:['Riverbank · Water begins to rise','Lower fields and road · Water spreads inland','Higher ground remains dry'],
  fire:['Smoke appears at one house','Localized fire · Smoke rises and drifts','Clear outdoor meeting point']
};
export function villageMarkup(){return `<aside class="village-panel" aria-label="Living Sundarpur illustration"><div class="village-view" data-village-view role="img" aria-label="Sundarpur hillside village"><span class="village-tag">Living Sundarpur</span></div><p class="village-caption" data-village-caption></p><p class="village-status" data-village-status>Loading village · Question remains playable</p><div class="village-controls" data-village-controls></div></aside>`;}
export function createVillageHost(app, preference){
  let saved=null,dispose=()=>{},generation=0;
  return {
    clear(){generation++;dispose();dispose=()=>{};},
    mount(game){
      const panel=app.querySelector('.village-panel');if(!panel){saved=null;return;}
      const run=game.run,active=['question','feedback'].includes(run.phase);
      const hazard=active?game.scenario.hazard:'overview';
      const key=`${run.index}:${hazard}`;
      if(saved?.key!==key || saved?.run!==run)saved={key,run,elapsedMs:0,stage:0,paused:false};
      const state=saved,token=generation;
      const view=panel.querySelector('[data-village-view]'),caption=panel.querySelector('[data-village-caption]'),status=panel.querySelector('[data-village-status]'),controls=panel.querySelector('[data-village-controls]');
      let renderer,frame=0,last=0,failed=false,dead=false;
      const still=()=>game.calm||preference.matches||failed;
      function draw(){
        const line=hazard==='fire'&&state.stage===2&&run.phase==='question'?'Smoke drifts above the village':labels[hazard][state.stage]??labels[hazard][0];
        caption.textContent=`${hazard==='overview'?'':`${state.stage+1} / 3 · `}${line}`;
        view.setAttribute('aria-label',`${hazard} illustration. ${line}. ${run.phase==='question'?'Environmental cues only.':''}`);
        if(failed && hazard!=='overview') {
          const poster=stillImages[`./stills/${hazard}-${state.stage}.png`];
          if(poster)view.style.backgroundImage=`url("${poster}")`;
        }
        if(renderer)try{renderer.render({elapsedMs:state.elapsedMs,stage:state.stage,motion:!still(),phase:run.phase==='feedback'?'feedback':'question'});}catch{fallback();}
      }
      function buttons(){
        controls.innerHTML=hazard==='overview'?'':still()?`<button type="button" data-scene="previous" ${state.stage===0?'disabled':''}>Previous scene step</button><button type="button" data-scene="next" ${state.stage===2?'disabled':''}>Next scene step</button>`:`<button type="button" data-scene="pause">${state.paused?'Resume scene':'Pause scene'}</button><button type="button" data-scene="replay">Replay scene</button>`;
        status.textContent=failed?'Illustrated fallback · 3D unavailable · Use scene steps':still()?'Still sequence · Explore at your own pace':state.paused?'Scene paused · Quiz timing is unchanged':'Illustration only · Scene controls do not affect the quiz';
      }
      function stop(){cancelAnimationFrame(frame);frame=0;last=0;}
      function tick(now){
        if(dead||still()||state.paused||document.hidden)return;
        if(last)state.elapsedMs+=Math.min(100,now-last);last=now;
        state.stage=Math.min(2,Math.floor(state.elapsedMs/4000));draw();
        frame=requestAnimationFrame(tick);
      }
      function start(){stop();if(renderer&&hazard!=='overview'&&!still()&&!state.paused&&!document.hidden)frame=requestAnimationFrame(tick);}
      function fallback(){if(failed)return;failed=true;stop();renderer?.dispose();renderer=null;buttons();draw();}
      function changed(){stop();buttons();draw();start();}
      function click(event){const button=event.target.closest('[data-scene]');if(!button)return;
        switch(button.dataset.scene){case 'previous':state.stage=Math.max(0,state.stage-1);state.elapsedMs=state.stage*4000;break;case 'next':state.stage=Math.min(2,state.stage+1);state.elapsedMs=state.stage*4000;break;case 'pause':state.paused=!state.paused;break;case 'replay':state.elapsedMs=0;state.stage=0;break;}
        const action=button.dataset.scene;changed();controls.querySelector(`[data-scene="${action}"]`)?.focus({preventScroll:true});
      }
      function lost(event){event.preventDefault();fallback();}
      panel.addEventListener('click',click);view.addEventListener('webglcontextlost',lost,true);
      preference.addEventListener('change',changed);document.addEventListener('visibilitychange',changed);
      buttons();draw();
      import('./renderer.js').then(module=>{if(dead||token!==generation)return;try{renderer=module.createRenderer(view,hazard);buttons();draw();start();}catch{fallback();}}).catch(()=>{if(!dead)fallback();});
      dispose=()=>{dead=true;stop();renderer?.dispose();panel.removeEventListener('click',click);view.removeEventListener('webglcontextlost',lost,true);preference.removeEventListener('change',changed);document.removeEventListener('visibilitychange',changed);};
    }
  };
}
