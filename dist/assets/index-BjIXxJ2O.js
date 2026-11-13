(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const v=[{id:"school-earthquake",hazard:"earthquake",location:"Village school",title:"The classroom shakes",prompt:"A sudden rumble turns into violent ground shaking in your second-floor classroom. Heavy ceiling fixtures swing and desks rattle. What do you do?",calmPrompt:"The classroom is shaking. A sturdy wooden desk is right next to you.",choices:[{id:"drop-cover-hold",label:"Drop to your hands and knees, take cover under the sturdy desk, and hold on firmly.",explanation:"Dropping down shields your vital organs and prevents you from being thrown off balance, while the desk protects against falling lights, plaster, and ceiling debris."},{id:"run-stairwell",label:"Rush out immediately toward the hallway and stairwell to get outside.",explanation:"Running during severe ground shaking is a leading cause of fractures and head trauma from collapsing architectural fixtures, falling glass, and tripping on stairs."},{id:"stand-doorway",label:"Stand upright braced inside the classroom doorframe until the shaking stops.",explanation:"Modern building doorways are not structurally reinforced compared to surrounding walls and leave your head and body completely exposed to flying debris."}],correctChoiceId:"drop-cover-hold",takeaway:"During an earthquake indoors: Drop, Cover, and Hold On under a sturdy desk or table until shaking stops.",sourceUrl:"https://www.ready.gov/sites/default/files/2024-03/ready-gov_full-suite_hazard-info-sheets.pdf"},{id:"river-flood",hazard:"flood",location:"River crossing road",title:"Rising brown water on the road",prompt:"Monsoon runoff has swollen Sundarpur creek across the main low-lying village road. Brown water is moving swiftly over the asphalt at an unknown depth. What do you do?",calmPrompt:"Swift brown water is flowing across the road ahead. You can see higher ground on the hillside behind you.",choices:[{id:"turn-around-high-ground",label:"Turn around immediately and head to higher ground along the elevated village ridge.",explanation:"Moving away from floodwaters and staying on elevated roads is the only reliable way to prevent being swept into deep ditches or culverts."},{id:"wade-quickly",label:"Step into the current carefully with a stick to test the depth and wade across.",explanation:"Just six inches of fast-moving water can knock a full-grown adult off their feet, and submerged sinkholes or downed lines are invisible beneath muddy water."},{id:"drive-scooter",label:"Accelerate your scooter quickly across the bridge before the water level rises further.",explanation:"Moving water can stall engines instantly and buoyant force will sweep vehicles and two-wheelers off roadways in under twelve inches of water."}],correctChoiceId:"turn-around-high-ground",takeaway:"Turn Around Don't Drown! Never walk, wade, or drive through moving water of unknown depth.",sourceUrl:"https://www.ready.gov/sites/default/files/2019.CERT_.HazardAnnexes.PM_.FINAL_.508c.pdf"},{id:"home-fire",hazard:"fire",location:"Village home",title:"Smoke in the bedroom corridor",prompt:"The smoke alarm blares at night. Dark, acrid smoke is seeping under your closed bedroom door. You need to escape the house safely. What do you do?",calmPrompt:"The smoke alarm is sounding and grey haze is rising. You need to reach the front door exit.",choices:[{id:"crawl-low-feel-door",label:"Crawl low beneath the smoke layer, test the door handle with the back of your hand, and exit through the primary clear pathway.",explanation:"Cooler, breathable air stays within 12 to 24 inches of the floor. Checking the door with the back of your hand prevents palm burns and warns if fire is on the other side."},{id:"grab-valuables-run",label:"Stand upright, grab your phone, laptop, and school bag, and run swiftly through the hall.",explanation:"Inhaling superheated toxic gases can cause unconsciousness within seconds; searching for belongings wastes the few crucial minutes needed to escape safely."},{id:"hide-in-closet",label:"Retreat into the bedroom closet, close the door, and cover yourself in thick blankets.",explanation:"Hiding in enclosed spaces traps you inside the structure, makes it difficult for firefighters to locate you, and smoke will still penetrate closed closet doors."}],correctChoiceId:"crawl-low-feel-door",takeaway:"In a home fire: Get low, check doors for heat before opening, and get out fast without stopping for belongings.",sourceUrl:"https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/home-fire-escape-plans/"}],y=2e4;class S{constructor(){this.subscribers=new Set,this.timerInterval=null,this.reset()}reset(){this.timer={deadline:null,remainingMs:y,totalDurationMs:y},this.clearTimer(),this.mode="NORMAL",this.stage="HOME",this.scenariosQueue=[...v],this.currentIndex=0,this.isPractice=!1,this.answered=!1,this.outcomes=[],this.practiceOutcomes=[]}subscribe(e){return this.subscribers.add(e),()=>this.subscribers.delete(e)}notify(){for(const e of this.subscribers)try{e(this.getState())}catch(t){console.error("Subscriber notification error:",t)}}getState(){this.isPractice&&this.scenariosQueue;const e=this.scenariosQueue[this.currentIndex]||null,t=this.isPractice?this.practiceOutcomes:this.outcomes,s=this.outcomes.filter(a=>a.isCorrect).length,i=this.practiceOutcomes.filter(a=>a.isCorrect).length;return{mode:this.mode,isCalmMode:this.mode==="CALM",stage:this.stage,currentIndex:this.currentIndex,currentRound:this.currentIndex+1,totalRounds:this.scenariosQueue.length,currentScenario:e,isPractice:this.isPractice,answered:this.answered,outcomes:[...this.outcomes],practiceOutcomes:[...this.practiceOutcomes],currentOutcome:t[this.currentIndex]||null,score:s,totalPossible:v.length,practiceScore:i,missedScenarios:this.getMissedScenarios(),timer:{remainingMs:this.timer.remainingMs,remainingSec:Math.max(0,Math.ceil(this.timer.remainingMs/1e3)),progressPercent:Math.max(0,Math.min(100,this.timer.remainingMs/this.timer.totalDurationMs*100)),isActive:this.mode==="NORMAL"&&this.stage==="QUESTION"&&!this.answered}}}getMissedScenarios(){const e=new Set(this.outcomes.filter(t=>!t.isCorrect).map(t=>t.scenarioId));return v.filter(t=>e.has(t.id))}clearTimer(){this.timerInterval&&(clearInterval(this.timerInterval),this.timerInterval=null),this.timer.deadline=null}startRun({calmMode:e=null}={}){this.clearTimer(),e!==null&&(this.mode=e?"CALM":"NORMAL"),this.stage="BRIEFING",this.scenariosQueue=[...v],this.currentIndex=0,this.isPractice=!1,this.answered=!1,this.outcomes=[],this.practiceOutcomes=[],this.notify()}startRound(){this.stage="QUESTION",this.answered=!1,this.mode==="NORMAL"?this.startCountdown(y):(this.clearTimer(),this.timer.remainingMs=y),this.notify()}startCountdown(e){this.clearTimer(),this.timer.totalDurationMs=e,this.timer.remainingMs=e,this.timer.deadline=Date.now()+e,this.timerInterval=setInterval(()=>{const t=Math.max(0,this.timer.deadline-Date.now());this.timer.remainingMs=t,t<=0?(this.clearTimer(),this.handleTimeout()):this.notify()},100)}toggleCalmMode(){const e=this.mode==="NORMAL"?"CALM":"NORMAL";this.mode=e,this.stage==="QUESTION"&&!this.answered&&(e==="CALM"?(this.clearTimer(),this.timer.remainingMs=y):this.startCountdown(y)),this.notify()}submitAnswer(e){if(this.answered||this.stage!=="QUESTION")return;this.answered=!0;const t=this.mode==="NORMAL"&&this.timer.deadline?Math.max(0,this.timer.totalDurationMs-(this.timer.deadline-Date.now())):0;this.clearTimer();const s=this.scenariosQueue[this.currentIndex],i=s?e===s.correctChoiceId:!1,a={scenarioId:s.id,userChoiceId:e,isCorrect:i,isTimeout:!1,modeAtAnswer:this.mode,timeSpent:t};this.isPractice?this.practiceOutcomes.push(a):this.outcomes.push(a),this.stage="FEEDBACK",this.notify()}handleTimeout(){if(this.answered||this.stage!=="QUESTION")return;this.answered=!0,this.clearTimer();const t={scenarioId:this.scenariosQueue[this.currentIndex].id,userChoiceId:null,isCorrect:!1,isTimeout:!0,modeAtAnswer:this.mode,timeSpent:y};this.isPractice?this.practiceOutcomes.push(t):this.outcomes.push(t),this.stage="FEEDBACK",this.notify()}nextRound(){this.clearTimer(),this.currentIndex+1<this.scenariosQueue.length?(this.currentIndex+=1,this.startRound()):(this.stage="RESULTS",this.notify())}startPractice(){const e=this.getMissedScenarios();e.length!==0&&(this.clearTimer(),this.isPractice=!0,this.scenariosQueue=[...e],this.currentIndex=0,this.answered=!1,this.practiceOutcomes=[],this.startRound())}}const d=new S,f={sundarpurVillage:`
    <svg viewBox="0 0 800 320" class="scene-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Peaceful Village of Sundarpur with green rolling hills and houses">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E0F2FE"/>
          <stop offset="100%" stop-color="#FAF7F0"/>
        </linearGradient>
        <linearGradient id="hillGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#A7F3D0"/>
          <stop offset="100%" stop-color="#059669"/>
        </linearGradient>
        <linearGradient id="hillGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#6EE7B7"/>
          <stop offset="100%" stop-color="#047857"/>
        </linearGradient>
      </defs>
      <rect width="800" height="320" fill="url(#skyGrad)"/>
      <!-- Sun -->
      <circle cx="680" cy="70" r="38" fill="#FDE047" opacity="0.9"/>
      <!-- Clouds -->
      <path d="M120 70 q20 -20 50 0 q25 -15 45 10 h-100 z" fill="#FFFFFF" opacity="0.8"/>
      <path d="M480 60 q25 -25 60 0 q30 -15 50 15 h-120 z" fill="#FFFFFF" opacity="0.8"/>
      <!-- Distant Hills -->
      <path d="M0 240 Q200 130 450 200 T800 180 L800 320 L0 320 Z" fill="url(#hillGrad1)"/>
      <path d="M0 260 Q300 180 600 240 T800 220 L800 320 L0 320 Z" fill="url(#hillGrad2)"/>
      <!-- River -->
      <path d="M380 320 C420 280 430 250 450 200 L490 200 C470 250 470 280 460 320 Z" fill="#38BDF8" opacity="0.85"/>
      <!-- Village Houses -->
      <!-- House 1: School (Left) -->
      <g transform="translate(140, 190)">
        <rect x="0" y="25" width="90" height="65" fill="#FAF5FF" stroke="#581C87" stroke-width="2.5" rx="3"/>
        <polygon points="-8,25 45,-12 98,25" fill="#C084FC" stroke="#581C87" stroke-width="2.5"/>
        <rect x="35" y="50" width="20" height="40" fill="#9333EA"/>
        <rect x="12" y="38" width="16" height="16" fill="#DDD6FE" stroke="#581C87" stroke-width="1.5"/>
        <rect x="62" y="38" width="16" height="16" fill="#DDD6FE" stroke="#581C87" stroke-width="1.5"/>
        <circle cx="45" cy="8" r="7" fill="#FDE047" stroke="#581C87" stroke-width="1.5"/>
      </g>
      <!-- House 2: Village Home (Right) -->
      <g transform="translate(560, 205)">
        <rect x="0" y="20" width="75" height="55" fill="#FEF3C7" stroke="#78350F" stroke-width="2.5" rx="3"/>
        <polygon points="-6,20 38,-6 81,20" fill="#F59E0B" stroke="#78350F" stroke-width="2.5"/>
        <rect x="28" y="42" width="18" height="33" fill="#B45309"/>
        <rect x="10" y="30" width="14" height="14" fill="#FDE68A" stroke="#78350F" stroke-width="1.5"/>
        <rect x="52" y="30" width="14" height="14" fill="#FDE68A" stroke="#78350F" stroke-width="1.5"/>
      </g>
      <!-- House 3: Center Cottage -->
      <g transform="translate(300, 220)">
        <rect x="0" y="15" width="60" height="45" fill="#FEE2E2" stroke="#991B1B" stroke-width="2" rx="2"/>
        <polygon points="-5,15 30,-3 65,15" fill="#EF4444" stroke="#991B1B" stroke-width="2"/>
        <rect x="23" y="33" width="14" height="27" fill="#7F1D1D"/>
        <rect x="8" y="23" width="11" height="11" fill="#FEF08A"/>
      </g>
      <!-- Trees -->
      <g transform="translate(80, 220)">
        <rect x="11" y="30" width="6" height="25" fill="#78350F"/>
        <circle cx="14" cy="22" r="20" fill="#15803D"/>
        <circle cx="18" cy="12" r="14" fill="#22C55E"/>
      </g>
      <g transform="translate(680, 215)">
        <rect x="11" y="35" width="6" height="25" fill="#78350F"/>
        <circle cx="14" cy="25" r="22" fill="#15803D"/>
        <circle cx="10" cy="15" r="16" fill="#16A34A"/>
      </g>
    </svg>
  `,disasterDevil:`
    <svg viewBox="0 0 160 160" class="devil-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Disaster Devil shapeshifting cloud entity">
      <defs>
        <radialGradient id="devilGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#EF4444" stop-opacity="0.9"/>
          <stop offset="70%" stop-color="#7F1D1D" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#1E1B4B" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <!-- Aura Glow -->
      <circle cx="80" cy="80" r="70" fill="url(#devilGlow)"/>
      <!-- Cloud Body -->
      <path d="M45 95 C30 95 20 80 30 65 C25 50 40 35 55 42 C65 25 95 25 105 42 C120 35 135 50 130 65 C140 80 130 95 115 95 C115 110 95 120 80 115 C65 120 45 110 45 95 Z" fill="#18181B" stroke="#DC2626" stroke-width="3"/>
      <!-- Horns -->
      <path d="M48 42 Q36 20 28 15 Q40 26 55 35 Z" fill="#DC2626"/>
      <path d="M112 42 Q124 20 132 15 Q120 26 105 35 Z" fill="#DC2626"/>
      <!-- Glowing Eyes -->
      <ellipse cx="62" cy="65" rx="8" ry="6" fill="#FEF08A"/>
      <circle cx="63" cy="65" r="3.5" fill="#DC2626"/>
      <ellipse cx="98" cy="65" rx="8" ry="6" fill="#FEF08A"/>
      <circle cx="97" cy="65" r="3.5" fill="#DC2626"/>
      <!-- Smirk -->
      <path d="M64 88 Q80 102 96 88" stroke="#FEF08A" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <!-- Little Fangs -->
      <polygon points="72,89 76,95 79,89" fill="#FFFFFF"/>
      <polygon points="81,89 84,95 88,89" fill="#FFFFFF"/>
    </svg>
  `,schoolEarthquake:`
    <svg viewBox="0 0 600 240" class="hazard-scene-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Earthquake in classroom showing sturdy desk cover zone">
      <defs>
        <linearGradient id="eqBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#3E2347"/>
          <stop offset="100%" stop-color="#211029"/>
        </linearGradient>
      </defs>
      <rect width="600" height="240" fill="url(#eqBg)" rx="12"/>
      <!-- Classroom Wall Grid & Cracks -->
      <path d="M120 20 L150 70 L135 110 L160 160" stroke="#F59E0B" stroke-width="2.5" fill="none" opacity="0.6"/>
      <path d="M480 30 L450 85 L475 140" stroke="#F59E0B" stroke-width="2.5" fill="none" opacity="0.6"/>
      <!-- Blackboard -->
      <rect x="180" y="25" width="240" height="70" fill="#064E3B" stroke="#D97706" stroke-width="3" rx="4"/>
      <text x="300" y="55" fill="#FEF3C7" font-size="14" font-weight="bold" text-anchor="middle" font-family="sans-serif">SUNDARPUR PRIMARY SCHOOL</text>
      <text x="300" y="75" fill="#FDE68A" font-size="12" text-anchor="middle" font-family="sans-serif">⚠ EARTHQUAKE ALERT</text>
      <!-- Swaying Light Fixture -->
      <g transform="translate(300, 0)">
        <line x1="0" y1="0" x2="-25" y2="35" stroke="#F59E0B" stroke-width="2.5"/>
        <ellipse cx="-25" cy="38" rx="20" ry="6" fill="#FDE047"/>
        <path d="M-40 40 L-10 40 L5 80 L-55 80 Z" fill="#FDE047" opacity="0.2"/>
      </g>
      <!-- Floor with Ground Vibration lines -->
      <rect x="0" y="190" width="600" height="50" fill="#581C87"/>
      <line x1="40" y1="210" x2="160" y2="210" stroke="#FCD34D" stroke-width="2" stroke-dasharray="8 6"/>
      <line x1="440" y1="210" x2="560" y2="210" stroke="#FCD34D" stroke-width="2" stroke-dasharray="8 6"/>
      <!-- Big Sturdy Wooden Desk (Safe Zone) -->
      <g transform="translate(210, 115)">
        <!-- Green Safe Zone Indicator Glow -->
        <rect x="-10" y="-10" width="200" height="95" fill="#10B981" opacity="0.2" rx="8" stroke="#34D399" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="90" y="15" fill="#A7F3D0" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">★ SAFE DROP & COVER ZONE ★</text>
        <!-- Desk Tabletop -->
        <rect x="0" y="20" width="180" height="18" fill="#B45309" stroke="#78350F" stroke-width="3" rx="3"/>
        <!-- Desk Legs -->
        <rect x="15" y="38" width="14" height="48" fill="#92400E"/>
        <rect x="151" y="38" width="14" height="48" fill="#92400E"/>
        <!-- Cross support beam -->
        <rect x="25" y="55" width="130" height="8" fill="#78350F"/>
        <!-- Student under desk illustration -->
        <circle cx="90" cy="58" r="14" fill="#FED7AA"/>
        <path d="M72 78 C72 68 108 68 108 78 Z" fill="#3B82F6"/>
      </g>
    </svg>
  `,riverFlood:`
    <svg viewBox="0 0 600 240" class="hazard-scene-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Flooded river crossing road with high ground escape path">
      <defs>
        <linearGradient id="floodBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0E4B5B"/>
          <stop offset="100%" stop-color="#082A33"/>
        </linearGradient>
        <linearGradient id="waterFlow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#0284C7"/>
          <stop offset="50%" stop-color="#38BDF8"/>
          <stop offset="100%" stop-color="#0369A1"/>
        </linearGradient>
      </defs>
      <rect width="600" height="240" fill="url(#floodBg)" rx="12"/>
      <!-- Hill / High Ground Ridge (Left) -->
      <path d="M0 80 Q100 80 180 160 L180 240 L0 240 Z" fill="#047857"/>
      <g transform="translate(40, 100)">
        <polygon points="30,-15 15,15 45,15" fill="#34D399"/>
        <text x="30" y="35" fill="#A7F3D0" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">HIGH GROUND</text>
        <text x="30" y="50" fill="#6EE7B7" font-size="10" text-anchor="middle" font-family="sans-serif">▲ SAFE ESCAPE ▲</text>
      </g>
      <!-- Submerged Roadway -->
      <path d="M160 170 L600 170 L600 240 L160 240 Z" fill="#334155"/>
      <line x1="200" y1="205" x2="580" y2="205" stroke="#FDE047" stroke-width="4" stroke-dasharray="16 12"/>
      <!-- Surging Turbid Flood Water Layer -->
      <path d="M140 185 C220 175 320 195 420 180 C500 170 560 190 600 180 L600 240 L140 240 Z" fill="url(#waterFlow)" opacity="0.85"/>
      <path d="M160 200 C240 190 350 210 450 195 C520 185 570 205 600 195 L600 240 L160 240 Z" fill="#0284C7" opacity="0.6"/>
      <!-- Swirling Water waves -->
      <path d="M220 215 q30 -10 60 0" stroke="#E0F2FE" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M360 210 q35 -12 70 0" stroke="#E0F2FE" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M480 220 q25 -8 50 0" stroke="#E0F2FE" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- Warning Sign (Turn Around Don't Drown) -->
      <g transform="translate(190, 85)">
        <rect x="18" y="45" width="6" height="45" fill="#94A3B8"/>
        <polygon points="21,5 50,45 -8,45" fill="#FBBF24" stroke="#D97706" stroke-width="2.5"/>
        <text x="21" y="32" fill="#78350F" font-size="18" font-weight="900" text-anchor="middle" font-family="sans-serif">!</text>
        <rect x="-30" y="50" width="102" height="24" fill="#0F172A" rx="4" stroke="#F59E0B" stroke-width="1.5"/>
        <text x="21" y="66" fill="#FEF08A" font-size="9" font-weight="bold" text-anchor="middle" font-family="sans-serif">ROAD FLOODED</text>
      </g>
    </svg>
  `,homeFire:`
    <svg viewBox="0 0 600 240" class="hazard-scene-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Home fire showing thick smoke near ceiling and low crawl zone to exit door">
      <defs>
        <linearGradient id="fireBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#591322"/>
          <stop offset="100%" stop-color="#24070D"/>
        </linearGradient>
        <linearGradient id="smokeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#18181B" stop-opacity="0.98"/>
          <stop offset="70%" stop-color="#27272A" stop-opacity="0.9"/>
          <stop offset="100%" stop-color="#3F3F46" stop-opacity="0.2"/>
        </linearGradient>
      </defs>
      <rect width="600" height="240" fill="url(#fireBg)" rx="12"/>
      <!-- Hallway Walls & Floor -->
      <rect x="0" y="195" width="600" height="45" fill="#450A0A"/>
      <!-- Exit Doorway (Right) -->
      <g transform="translate(480, 75)">
        <!-- Green Glow on Exit -->
        <rect x="-8" y="-8" width="86" height="135" fill="#059669" opacity="0.3" rx="6"/>
        <rect x="0" y="0" width="70" height="120" fill="#15803D" stroke="#34D399" stroke-width="3" rx="3"/>
        <circle cx="12" cy="62" r="5" fill="#FEF08A"/>
        <rect x="10" y="10" width="50" height="22" fill="#047857" rx="3"/>
        <text x="35" y="25" fill="#A7F3D0" font-size="11" font-weight="bold" text-anchor="middle" font-family="sans-serif">EXIT</text>
      </g>
      <!-- Smoke Alarm blaring on ceiling -->
      <g transform="translate(180, 10)">
        <rect x="0" y="0" width="38" height="14" fill="#FFFFFF" rx="4" stroke="#DC2626" stroke-width="1.5"/>
        <circle cx="19" cy="7" r="3.5" fill="#EF4444"/>
        <!-- Alarm wave rings -->
        <path d="M42 2 q10 5 0 10" stroke="#EF4444" stroke-width="2" fill="none"/>
        <path d="M47 -1 q15 8 0 16" stroke="#EF4444" stroke-width="2" fill="none"/>
      </g>
      <!-- Dense Smoke Layer in upper half (0 - 130px) -->
      <rect x="0" y="0" width="600" height="140" fill="url(#smokeGrad)"/>
      <!-- Smoke billows -->
      <circle cx="100" cy="50" r="45" fill="#18181B" opacity="0.7"/>
      <circle cx="230" cy="65" r="50" fill="#27272A" opacity="0.8"/>
      <circle cx="370" cy="55" r="48" fill="#18181B" opacity="0.75"/>
      <text x="280" y="45" fill="#EF4444" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">⚠ TOXIC SUPERHEATED SMOKE LAYER ⚠</text>
      <!-- Safe Breathing Zone (Bottom 12-24 inches) -->
      <g transform="translate(60, 145)">
        <rect x="0" y="0" width="380" height="45" fill="#10B981" opacity="0.2" rx="6" stroke="#10B981" stroke-width="2" stroke-dasharray="6 4"/>
        <text x="190" y="18" fill="#34D399" font-size="12" font-weight="bold" text-anchor="middle" font-family="sans-serif">★ SAFE CRAWL ZONE (12–24" FROM FLOOR) ★</text>
        <text x="190" y="34" fill="#A7F3D0" font-size="10" text-anchor="middle" font-family="sans-serif">Cooler, breathable air near floor → Crawl to Exit</text>
        <!-- Person crawling low -->
        <circle cx="70" cy="28" r="9" fill="#FED7AA"/>
        <path d="M80 32 L115 32 L125 38" stroke="#3B82F6" stroke-width="8" stroke-linecap="round"/>
      </g>
    </svg>
  `,villageSaved:`
    <svg viewBox="0 0 600 240" class="celebration-svg" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sundarpur Village lit up peacefully at night, saved from disasters">
      <defs>
        <linearGradient id="nightGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0F172A"/>
          <stop offset="60%" stop-color="#1E293B"/>
          <stop offset="100%" stop-color="#334155"/>
        </linearGradient>
      </defs>
      <rect width="600" height="240" fill="url(#nightGrad)" rx="12"/>
      <!-- Sparkling Stars -->
      <circle cx="80" cy="35" r="2" fill="#FEF08A"/>
      <circle cx="150" cy="65" r="1.5" fill="#FFFFFF"/>
      <circle cx="240" cy="25" r="2.5" fill="#FEF08A"/>
      <circle cx="360" cy="40" r="2" fill="#FFFFFF"/>
      <circle cx="450" cy="20" r="3" fill="#FDE047"/>
      <circle cx="530" cy="55" r="2" fill="#FEF08A"/>
      <!-- Moon -->
      <circle cx="500" cy="60" r="22" fill="#FEF08A"/>
      <circle cx="493" cy="56" r="18" fill="#0F172A"/>
      <!-- Rolling Hills -->
      <path d="M0 160 Q150 110 320 150 T600 135 L600 240 L0 240 Z" fill="#064E3B"/>
      <!-- Glowing Houses -->
      <!-- School -->
      <g transform="translate(100, 140)">
        <rect x="0" y="20" width="70" height="50" fill="#3B0764" rx="2"/>
        <polygon points="-5,20 35,-6 75,20" fill="#6B21A8"/>
        <!-- Lit Windows (Bright Gold Glow) -->
        <rect x="12" y="32" width="14" height="14" fill="#FDE047" stroke="#F59E0B" stroke-width="1.5"/>
        <rect x="44" y="32" width="14" height="14" fill="#FDE047" stroke="#F59E0B" stroke-width="1.5"/>
      </g>
      <!-- Center House -->
      <g transform="translate(260, 145)">
        <rect x="0" y="16" width="60" height="45" fill="#78350F" rx="2"/>
        <polygon points="-4,16 30,-3 64,16" fill="#B45309"/>
        <rect x="22" y="30" width="16" height="16" fill="#FDE047" stroke="#F59E0B" stroke-width="1.5"/>
      </g>
      <!-- Right House -->
      <g transform="translate(420, 135)">
        <rect x="0" y="22" width="75" height="52" fill="#0F766E" rx="2"/>
        <polygon points="-5,22 37,-4 80,22" fill="#14B8A6"/>
        <rect x="15" y="35" width="15" height="15" fill="#FDE047" stroke="#F59E0B" stroke-width="1.5"/>
        <rect x="45" y="35" width="15" height="15" fill="#FDE047" stroke="#F59E0B" stroke-width="1.5"/>
      </g>
      <!-- Golden Lanterns Floating -->
      <g transform="translate(190, 80)">
        <circle cx="8" cy="8" r="8" fill="#F59E0B" opacity="0.8"/>
        <circle cx="8" cy="8" r="4" fill="#FEF08A"/>
      </g>
      <g transform="translate(370, 70)">
        <circle cx="8" cy="8" r="8" fill="#F59E0B" opacity="0.8"/>
        <circle cx="8" cy="8" r="4" fill="#FEF08A"/>
      </g>
    </svg>
  `};class F{constructor({onPlay:e,onHowToPlay:t}){this.onPlay=e,this.onHowToPlay=t}render(e){var t,s,i,a;e.innerHTML=`
      <div class="home-wrapper">
        <!-- Top Navigation -->
        <header class="home-nav">
          <div class="brand">
            <span class="brand-pill">⚡ DISASTER DASH</span>
            <span class="brand-sub">Sundarpur Village Defense</span>
          </div>
          <div class="nav-actions">
            <button type="button" class="btn btn-ghost" id="navHowToPlay">
              📖 How to play
            </button>
            <button type="button" class="btn btn-primary btn-sm" id="navPlayTop">
              Play Disaster Dash →
            </button>
          </div>
        </header>

        <!-- Hero Section -->
        <main class="home-hero">
          <div class="hero-content">
            <div class="hero-tag">VIBESPRINT PROBLEM CARD 08 · CALM MODE UNLOCKED</div>
            <h1 class="hero-title">
              DISASTER <span class="highlight-underline">DASH</span>
            </h1>
            <p class="hero-promise">
              Make the call. Keep your village safe.
            </p>
            <p class="hero-desc">
              When disaster strikes the fictional village of Sundarpur, seconds count. Guide students and villagers through earthquake, flash flood, and house fire scenarios. Test your instincts under a 20-second timer, or switch to <strong>Calm Mode</strong> for a peaceful, untimed experience.
            </p>

            <div class="hero-actions">
              <button type="button" class="btn btn-hero" id="heroPlayBtn" autofocus>
                Play Disaster Dash ➔
              </button>
              <button type="button" class="btn btn-secondary" id="heroTourBtn">
                Take the 20-sec Tour
              </button>
            </div>

            <!-- Simulation Disclaimer -->
            <div class="sim-banner">
              <span class="sim-badge">NOTICE</span>
              <span class="sim-text">Educational simulation, not live emergency advice. In a real emergency, call local emergency services immediately.</span>
            </div>
          </div>

          <!-- Hero Graphic -->
          <div class="hero-graphic-card">
            <div class="hero-scene-container">
              ${f.sundarpurVillage}
              <div class="devil-float">
                ${f.disasterDevil}
                <div class="devil-speech-bubble">“Sundarpur will fall to my 3 disasters!”</div>
              </div>
            </div>
          </div>
        </main>

        <!-- Feature Cards Grid -->
        <section class="features-section">
          <div class="section-header">
            <h2 class="section-title">Three Real Hazards. One Village to Protect.</h2>
            <p class="section-subtitle">Every scenario is grounded in official FEMA, CERT, and US Fire Administration guidelines.</p>
          </div>

          <div class="hazard-cards-grid">
            <!-- Earthquake Card -->
            <div class="hazard-card card-earthquake">
              <div class="card-badge">ROUND 1 · SCHOOL</div>
              <h3>Earthquake Tremors</h3>
              <p>Desks rattle and ceiling fixtures swing in the second-floor classroom. Do you run, stand in a doorway, or drop and cover?</p>
              <div class="card-footer">
                <span class="hazard-color-chip plum">Plum & Amber</span>
                <span class="source-tag">FEMA Ready.gov</span>
              </div>
            </div>

            <!-- Flood Card -->
            <div class="hazard-card card-flood">
              <div class="card-badge">ROUND 2 · RIVER ROAD</div>
              <h3>Flash Flood Surge</h3>
              <p>Brown water sweeps across the low-lying crossing. Can you wade through 6 inches or ride across before the bridge is swallowed?</p>
              <div class="card-footer">
                <span class="hazard-color-chip teal">Deep Teal & Aqua</span>
                <span class="source-tag">CERT & NOAA NWS</span>
              </div>
            </div>

            <!-- Fire Card -->
            <div class="hazard-card card-fire">
              <div class="card-badge">ROUND 3 · HOME</div>
              <h3>Corridor House Fire</h3>
              <p>Smoke detector alarms in the night. Toxic gases bank down from the ceiling. How do you check doors and escape safely?</p>
              <div class="card-footer">
                <span class="hazard-color-chip burgundy">Burgundy & Ember</span>
                <span class="source-tag">USFA Escape Plan</span>
              </div>
            </div>
          </div>
        </section>

        <!-- The Calm Mode Twist Showcase -->
        <section class="twist-section">
          <div class="twist-card">
            <div class="twist-tag">THE EVENT TWIST REVEALED</div>
            <h2>Calm Mode: Accessible, Untimed Gameplay</h2>
            <p>
              Emergency drills shouldn’t trigger panic. Switch to Calm Mode at any moment — even mid-countdown — to freeze the clock, cancel timeouts, soften visuals, and read bite-sized safety copy. The exact same scoring and lessons, zero pressure.
            </p>
            <div class="twist-features">
              <div class="twist-pill">✓ No countdown timer</div>
              <div class="twist-pill">✓ Mid-round timeout cancellation</div>
              <div class="twist-pill">✓ Low-stimulation neutral styling</div>
              <div class="twist-pill">✓ Shortened accessible copy</div>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="home-footer">
          <div class="footer-left">
            <span>Disaster Dash © 2026 · VibeSprint Problem Card 08</span>
          </div>
          <div class="footer-right">
            <span>Offline browser-first prototype · Zero API keys required</span>
          </div>
        </footer>
      </div>
    `,(t=e.querySelector("#heroPlayBtn"))==null||t.addEventListener("click",()=>this.onPlay()),(s=e.querySelector("#navPlayTop"))==null||s.addEventListener("click",()=>this.onPlay()),(i=e.querySelector("#heroTourBtn"))==null||i.addEventListener("click",()=>this.onHowToPlay()),(a=e.querySelector("#navHowToPlay"))==null||a.addEventListener("click",()=>this.onHowToPlay())}}const x="disaster_dash_tour_dismissed";class E{constructor({onComplete:e}){this.onComplete=e,this.currentStep=0,this.isOpen=!1,this.container=null,this.handleKeyDown=this.handleKeyDown.bind(this),this.steps=[{title:"1. The Threat to Sundarpur",subtitle:"The Disaster Devil is shapeshifting across the village",content:`
          <p>The peaceful fictional village of <strong>Sundarpur</strong> is suddenly under threat. The mythical <strong>Disaster Devil</strong> strikes three vulnerable locations in rapid succession: the School, the River Crossing, and a Village Home.</p>
          <div class="tour-sample-badge">Village Alert: School • River • Home</div>
        `,sampleUi:`
          <div class="tour-preview-card">
            <span class="preview-tag">Scenario Preview</span>
            <h4>Village School: Classroom Tremors</h4>
            <p>Ground shaking hits. Desks rattle. What is your immediate call?</p>
          </div>
        `},{title:"2. Fast Calls or Calm Mode",subtitle:"20 seconds to decide — or play untimed",content:`
          <p>In <strong>Normal Mode</strong>, each crisis gives you a <strong>20-second countdown</strong> to evaluate safety and make your choice under pressure.</p>
          <p><strong>The Calm Mode Twist:</strong> Need low stimulation or zero pressure? Flip the <em>Calm Mode</em> switch at any time — even mid-countdown — to stop the timer, cancel timeouts, and read simplified prompts.</p>
        `,sampleUi:`
          <div class="tour-preview-toggle">
            <div class="toggle-pill active">
              <span class="toggle-dot"></span>
              <span class="toggle-text">Calm Mode ON: Untimed & Low Stimulation</span>
            </div>
          </div>
        `},{title:"3. Clear Feedback & Real Safety",subtitle:"Understand why safe actions save lives",content:`
          <p>Every answer — correct, incorrect, or timeout — is followed by an <strong>instant safety explanation</strong> grounded in FEMA, CERT, and US Fire Administration guidelines.</p>
          <p>Complete all three rounds to earn your village security report, review life-saving takeaways, and practice any missed situations.</p>
        `,sampleUi:`
          <div class="tour-preview-feedback">
            <div class="feedback-badge success">✓ Safe Choice Explained</div>
            <p>Dropping down shields your vital organs and prevents you from being thrown off balance.</p>
          </div>
        `}]}isDismissed(){return sessionStorage.getItem(x)==="true"}markDismissed(){sessionStorage.setItem(x,"true")}open(e=!1){!e&&this.isDismissed()||(this.isOpen=!0,this.currentStep=0,this.render(),document.addEventListener("keydown",this.handleKeyDown))}close(){this.isOpen=!1,this.markDismissed(),document.removeEventListener("keydown",this.handleKeyDown),this.container&&(this.container.remove(),this.container=null),this.onComplete&&this.onComplete()}handleKeyDown(e){this.isOpen&&(e.key==="Escape"?this.close():e.key==="ArrowRight"&&this.currentStep<this.steps.length-1?(this.currentStep++,this.render()):e.key==="ArrowLeft"&&this.currentStep>0&&(this.currentStep--,this.render()))}render(){var i,a,r,l,o;if(!this.isOpen)return;this.container||(this.container=document.createElement("div"),this.container.className="tour-backdrop",this.container.setAttribute("role","dialog"),this.container.setAttribute("aria-modal","true"),this.container.setAttribute("aria-label","How to Play Disaster Dash Tour"),document.body.appendChild(this.container));const e=this.steps[this.currentStep],t=this.currentStep===0,s=this.currentStep===this.steps.length-1;this.container.innerHTML=`
      <div class="tour-modal">
        <div class="tour-header">
          <div class="tour-indicators">
            ${this.steps.map((p,u)=>`
              <span class="tour-dot ${u===this.currentStep?"active":""} ${u<this.currentStep?"completed":""}"></span>
            `).join("")}
          </div>
          <button type="button" class="tour-close-btn" id="tourSkipBtn" aria-label="Skip tour">✕</button>
        </div>

        <div class="tour-body">
          <div class="tour-step-tag">Step ${this.currentStep+1} of ${this.steps.length}</div>
          <h2 class="tour-title">${e.title}</h2>
          <h3 class="tour-subtitle">${e.subtitle}</h3>
          
          <div class="tour-text">
            ${e.content}
          </div>

          <div class="tour-sample-container">
            ${e.sampleUi}
          </div>
        </div>

        <div class="tour-footer">
          <div class="tour-left-actions">
            ${t?"":'<button type="button" class="btn btn-secondary btn-sm" id="tourBackBtn">← Back</button>'}
            <button type="button" class="btn btn-ghost btn-sm" id="tourSkipTextBtn">Skip tour</button>
          </div>
          <div class="tour-right-actions">
            ${s?'<button type="button" class="btn btn-primary" id="tourFinishBtn">Finish & Start Game</button>':'<button type="button" class="btn btn-primary" id="tourNextBtn">Next step →</button>'}
          </div>
        </div>
      </div>
    `,(i=this.container.querySelector("#tourSkipBtn"))==null||i.addEventListener("click",()=>this.close()),(a=this.container.querySelector("#tourSkipTextBtn"))==null||a.addEventListener("click",()=>this.close()),(r=this.container.querySelector("#tourBackBtn"))==null||r.addEventListener("click",()=>{this.currentStep>0&&(this.currentStep--,this.render())}),(l=this.container.querySelector("#tourNextBtn"))==null||l.addEventListener("click",()=>{this.currentStep<this.steps.length-1&&(this.currentStep++,this.render())}),(o=this.container.querySelector("#tourFinishBtn"))==null||o.addEventListener("click",()=>this.close())}}class C{constructor({store:e,onStartRound:t,onHome:s}){this.store=e,this.onStartRound=t,this.onHome=s}render(e){var i,a,r;const s=this.store.getState().isCalmMode;e.innerHTML=`
      <div class="game-screen-wrapper ${s?"calm-theme":""}">
        <!-- Game Header -->
        <header class="game-header">
          <div class="header-left">
            <button type="button" class="btn btn-ghost btn-sm" id="briefingBackHome">
              ← Return Home
            </button>
            <span class="game-brand-pill">⚡ SUNDARPUR DEFENSE</span>
          </div>

          <div class="header-right">
            <!-- Calm Mode Toggle -->
            <div class="calm-toggle-container">
              <label class="calm-switch" for="calmToggleBriefing">
                <input type="checkbox" id="calmToggleBriefing" ${s?"checked":""} aria-label="Toggle Calm Mode">
                <span class="slider round"></span>
              </label>
              <span class="calm-label">
                ${s?"<strong>Calm Mode: ON</strong>":"Calm Mode: OFF"}
              </span>
            </div>
          </div>
        </header>

        <!-- Briefing Body -->
        <main class="briefing-card">
          <div class="briefing-banner">
            <span class="briefing-tag">MISSION BRIEFING</span>
            <h1 class="briefing-title">The Disaster Devil Threatens Sundarpur</h1>
          </div>

          <div class="briefing-grid">
            <div class="briefing-visual">
              ${f.disasterDevil}
              <div class="devil-subtext">The shape-shifting menace strikes in 3 waves</div>
            </div>

            <div class="briefing-text-col">
              <p class="lead-text">
                You are a village resident in <strong>Sundarpur</strong>. The Disaster Devil is attacking across three vital community hubs:
              </p>
              
              <ul class="briefing-hazards-list">
                <li>
                  <span class="hazard-badge-inline eq">1. Village School</span>
                  <span>Sudden earthquake shaking during morning class.</span>
                </li>
                <li>
                  <span class="hazard-badge-inline fl">2. River Crossing Road</span>
                  <span>Flash flood surging across the main access route.</span>
                </li>
                <li>
                  <span class="hazard-badge-inline fr">3. Village Home</span>
                  <span>Late-night smoke alarm with dark smoke in the hallway.</span>
                </li>
              </ul>

              <div class="briefing-rules">
                <div class="rule-item">
                  <strong>Normal Mode:</strong> 20 seconds per decision. Stay alert and act quickly.
                </div>
                <div class="rule-item">
                  <strong>Calm Mode:</strong> Untimed, reduced stimulation, and concise reading. Toggle anytime.
                </div>
              </div>
            </div>
          </div>

          <!-- Simulation Note -->
          <div class="sim-banner">
            <span class="sim-badge">NOTICE</span>
            <span class="sim-text">Educational simulation, not live emergency advice. In a real disaster, call emergency services and follow local authorities.</span>
          </div>

          <!-- Start Action -->
          <div class="briefing-actions">
            <button type="button" class="btn btn-hero" id="startRoundBtn" autofocus>
              Start Round 1: Village School ➔
            </button>
          </div>
        </main>
      </div>
    `,(i=e.querySelector("#briefingBackHome"))==null||i.addEventListener("click",()=>this.onHome()),(a=e.querySelector("#startRoundBtn"))==null||a.addEventListener("click",()=>this.onStartRound()),(r=e.querySelector("#calmToggleBriefing"))==null||r.addEventListener("change",()=>{this.store.toggleCalmMode(),this.render(e)})}}const b={earthquake:{name:"Earthquake",primary:"#5C3A66",secondary:"#3E2347",accent:"#F59E0B",accentLight:"#FEF3C7",badgeBg:"#FDE68A",badgeText:"#78350F",cardBorder:"#D97706",bannerBg:"linear-gradient(135deg, #3E2347 0%, #5C3A66 100%)",textColor:"#FFFFFF"},flood:{name:"Flood",primary:"#16697A",secondary:"#0E4B5B",accent:"#38BDF8",accentLight:"#E0F2FE",badgeBg:"#BAE6FD",badgeText:"#0369A1",cardBorder:"#0284C7",bannerBg:"linear-gradient(135deg, #0E4B5B 0%, #16697A 100%)",textColor:"#FFFFFF"},fire:{name:"Fire",primary:"#7F1D1D",secondary:"#591322",accent:"#EF4444",accentLight:"#FEE2E2",badgeBg:"#FECACA",badgeText:"#991B1B",cardBorder:"#DC2626",bannerBg:"linear-gradient(135deg, #591322 0%, #7F1D1D 100%)",textColor:"#FFFFFF"},calm:{name:"Calm Mode",primary:"#334155",secondary:"#1E293B",accent:"#0D9488",accentLight:"#F1F5F9",badgeBg:"#CCFBF1",badgeText:"#115E59",cardBorder:"#CBD5E1",bannerBg:"#F8FAFC",textColor:"#0F172A"}};class D{constructor({store:e,onSubmitAnswer:t,onHome:s}){this.store=e,this.onSubmitAnswer=t,this.onHome=s,this.container=null,this.handleKeyDown=this.handleKeyDown.bind(this)}mount(e){this.container=e,document.addEventListener("keydown",this.handleKeyDown),this.render()}unmount(){document.removeEventListener("keydown",this.handleKeyDown)}handleKeyDown(e){const t=this.store.getState();if(t.stage!=="QUESTION"||t.answered)return;const s=t.currentScenario;s&&(e.key==="1"&&s.choices[0]?this.onSubmitAnswer(s.choices[0].id):e.key==="2"&&s.choices[1]?this.onSubmitAnswer(s.choices[1].id):e.key==="3"&&s.choices[2]&&this.onSubmitAnswer(s.choices[2].id))}render(){var g,n;if(!this.container)return;const e=this.store.getState(),t=e.currentScenario;if(!t)return;const s=e.isCalmMode,i=b[t.hazard]||b.earthquake,a=e.timer.remainingSec,r=e.timer.progressPercent,l=a<=5&&!s;let o=f.schoolEarthquake;t.hazard==="flood"&&(o=f.riverFlood),t.hazard==="fire"&&(o=f.homeFire);const p=s?t.calmPrompt:t.prompt;this.container.innerHTML=`
      <div class="game-screen-wrapper ${s?"calm-theme":`theme-${t.hazard}`}">
        <!-- Top Game Bar -->
        <header class="game-header">
          <div class="header-left">
            <button type="button" class="btn btn-ghost btn-sm" id="questionBackHome">
              ← Exit Run
            </button>
            <span class="round-tracker-badge">
              Round ${e.currentRound} of ${e.totalRounds}
            </span>
            <span class="hazard-badge-pill" style="background: ${i.badgeBg}; color: ${i.badgeText};">
              ${i.name.toUpperCase()}
            </span>
          </div>

          <div class="header-right">
            <!-- Calm Mode Toggle -->
            <div class="calm-toggle-container">
              <label class="calm-switch" for="calmToggleQuestion">
                <input type="checkbox" id="calmToggleQuestion" ${s?"checked":""} aria-label="Toggle Calm Mode">
                <span class="slider round"></span>
              </label>
              <span class="calm-label">
                ${s?"<strong>Calm Mode: ON</strong>":"Calm Mode: OFF"}
              </span>
            </div>
          </div>
        </header>

        <!-- Timer Bar (Only in Normal Mode) -->
        ${s?`
          <div class="calm-mode-banner">
            <span class="calm-mode-badge">CALM MODE ACTIVE</span>
            <span>Untimed round. Take your time to assess the situation and choose safely.</span>
          </div>
        `:`
          <div class="timer-container ${l?"urgent":""}" role="timer" aria-live="polite" aria-label="Time remaining: ${a} seconds">
            <div class="timer-header">
              <span class="timer-label">DECISION DEADLINE:</span>
              <span class="timer-countdown ${l?"pulse-text":""}">
                ⏱ ${a}s
              </span>
            </div>
            <div class="timer-progress-track">
              <div class="timer-progress-fill ${l?"urgent-fill":""}" style="width: ${r}%;"></div>
            </div>
          </div>
        `}

        <!-- Question Main Area -->
        <main class="question-main-card">
          <!-- Scene SVG Illustration -->
          <div class="scenario-scene-wrapper">
            ${o}
          </div>

          <!-- Scenario Details -->
          <div class="scenario-details">
            <div class="location-tag">LOCATION: ${t.location.toUpperCase()}</div>
            <h1 class="scenario-title">${t.title}</h1>
            <p class="scenario-prompt">${p}</p>
          </div>

          <!-- Choices Grid -->
          <div class="choices-container" role="group" aria-label="Choices for ${t.title}">
            ${t.choices.map((c,m)=>`
              <button 
                type="button" 
                class="choice-btn" 
                data-choice-id="${c.id}"
                aria-label="Option ${m+1}: ${c.label}"
              >
                <span class="choice-num-key" aria-hidden="true">${m+1}</span>
                <span class="choice-text">${c.label}</span>
              </button>
            `).join("")}
          </div>

          <!-- Simulation Note -->
          <div class="sim-banner-subtle">
            Educational simulation, not live emergency advice.
          </div>
        </main>
      </div>
    `,(g=this.container.querySelector("#questionBackHome"))==null||g.addEventListener("click",()=>this.onHome()),(n=this.container.querySelector("#calmToggleQuestion"))==null||n.addEventListener("change",()=>{this.store.toggleCalmMode(),this.render()}),this.container.querySelectorAll(".choice-btn").forEach(c=>{c.addEventListener("click",()=>{const m=c.getAttribute("data-choice-id");this.onSubmitAnswer(m)})})}updateTimer(){const e=this.store.getState();if(e.isCalmMode||e.stage!=="QUESTION"||!this.container)return;const t=e.timer.remainingSec,s=e.timer.progressPercent,i=t<=5,a=this.container.querySelector(".timer-countdown"),r=this.container.querySelector(".timer-progress-fill"),l=this.container.querySelector(".timer-container");a&&(a.textContent=`⏱ ${t}s`,i?a.classList.add("pulse-text"):a.classList.remove("pulse-text")),r&&(r.style.width=`${s}%`,i?r.classList.add("urgent-fill"):r.classList.remove("urgent-fill")),l&&(i?l.classList.add("urgent"):l.classList.remove("urgent"))}}class T{constructor({store:e,onNextRound:t,onHome:s}){this.store=e,this.onNextRound=t,this.onHome=s}render(e){var n,c,m;const t=this.store.getState(),s=t.currentScenario;if(!s)return;const i=t.currentOutcome,a=t.isCalmMode,r=b[s.hazard]||b.earthquake,l=t.currentIndex+1>=t.totalRounds,o=i?i.isCorrect:!1,p=i?i.isTimeout:!1,u=i&&i.userChoiceId?s.choices.find(w=>w.id===i.userChoiceId):null,g=s.choices.find(w=>w.id===s.correctChoiceId);e.innerHTML=`
      <div class="game-screen-wrapper ${a?"calm-theme":`theme-${s.hazard}`}">
        <!-- Top Game Bar -->
        <header class="game-header">
          <div class="header-left">
            <button type="button" class="btn btn-ghost btn-sm" id="feedbackBackHome">
              ← Exit Run
            </button>
            <span class="round-tracker-badge">
              Feedback: Round ${t.currentRound} of ${t.totalRounds}
            </span>
            <span class="hazard-badge-pill" style="background: ${r.badgeBg}; color: ${r.badgeText};">
              ${r.name.toUpperCase()}
            </span>
          </div>

          <div class="header-right">
            <!-- Calm Mode Toggle -->
            <div class="calm-toggle-container">
              <label class="calm-switch" for="calmToggleFeedback">
                <input type="checkbox" id="calmToggleFeedback" ${a?"checked":""} aria-label="Toggle Calm Mode">
                <span class="slider round"></span>
              </label>
              <span class="calm-label">
                ${a?"<strong>Calm Mode: ON</strong>":"Calm Mode: OFF"}
              </span>
            </div>
          </div>
        </header>

        <!-- Main Feedback Card -->
        <main class="feedback-card">
          <!-- Outcome Banner -->
          <div class="outcome-header ${o?"outcome-safe":"outcome-danger"}">
            <div class="outcome-icon" aria-hidden="true">
              ${o?"🛡️":p?"⏱️":"⚠️"}
            </div>
            <div class="outcome-text">
              <h1 class="outcome-title">
                ${o?"Safe Call! Location Protected":p?"Time Ran Out!":"Unsafe Decision!"}
              </h1>
              <p class="outcome-subtitle">
                ${o?`Your quick thinking secured the ${s.location}.`:p?"Hesitation under emergency conditions leaves you exposed.":`This action increased injury risk in the ${s.location}.`}
              </p>
            </div>
          </div>

          <!-- Explanations Container -->
          <div class="feedback-explanations">
            <!-- What player chose -->
            ${o?"":`
              <div class="explanation-box your-choice-box">
                <div class="box-tag danger">WHAT HAPPENED</div>
                ${u?`
                  <h4>Your Choice: "${u.label}"</h4>
                  <p class="explanation-text">${u.explanation}</p>
                `:`
                  <h4>No Action Taken in Time</h4>
                  <p class="explanation-text">The 20-second deadline elapsed without a choice. In a sudden hazard, delay increases exposure to falling debris, swift currents, or toxic smoke inhalation.</p>
                `}
              </div>
            `}

            <!-- The Safest Action (Always Shown) -->
            <div class="explanation-box safest-choice-box">
              <div class="box-tag success">SAFEST EMERGENCY ACTION</div>
              <h4>${g?g.label:"Recommended Procedure"}</h4>
              <p class="explanation-text">${g?g.explanation:""}</p>
              
              <div class="takeaway-callout">
                <strong>Key Takeaway:</strong> ${s.takeaway}
              </div>

              <div class="source-attribution">
                Source Guidance: <a href="${s.sourceUrl}" target="_blank" rel="noopener noreferrer">${s.sourceUrl}</a>
              </div>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="feedback-actions">
            <button type="button" class="btn btn-hero" id="nextRoundBtn" autofocus>
              ${l?"See Village Security Debrief ➔":`Continue to Round ${t.currentRound+1} ➔`}
            </button>
          </div>

          <!-- Simulation Note -->
          <div class="sim-banner-subtle">
            Educational simulation, not live emergency advice.
          </div>
        </main>
      </div>
    `,(n=e.querySelector("#feedbackBackHome"))==null||n.addEventListener("click",()=>this.onHome()),(c=e.querySelector("#nextRoundBtn"))==null||c.addEventListener("click",()=>this.onNextRound()),(m=e.querySelector("#calmToggleFeedback"))==null||m.addEventListener("change",()=>{this.store.toggleCalmMode(),this.render(e)})}}class A{constructor({store:e,onPlayAgain:t,onPracticeMissed:s,onHome:i}){this.store=e,this.onPlayAgain=t,this.onPracticeMissed=s,this.onHome=i}render(e){var o,p,u,g;const t=this.store.getState(),s=t.score,i=t.totalPossible,a=s===i,r=t.missedScenarios;t.isPractice;const l=v.map(n=>{const c=t.outcomes.find(k=>k.scenarioId===n.id),m=c?c.isCorrect:!1,w=c?c.isTimeout:!1;return{scenario:n,isSecured:m,wasTimeout:w}});e.innerHTML=`
      <div class="game-screen-wrapper">
        <!-- Top Nav -->
        <header class="game-header">
          <div class="header-left">
            <button type="button" class="btn btn-ghost btn-sm" id="resultsHomeBtn">
              ← Return Home
            </button>
            <span class="game-brand-pill">MISSION REPORT</span>
          </div>
          <div class="header-right">
            <span class="mode-tag">${t.isCalmMode?"Calm Mode Run":"Timed Mode Run"}</span>
          </div>
        </header>

        <!-- Main Debrief Card -->
        <main class="results-card">
          <!-- Top Celebration / Village Scene -->
          <div class="results-hero-scene">
            ${a?f.villageSaved:f.sundarpurVillage}
          </div>

          <!-- Score Banner -->
          <div class="score-banner ${a?"perfect":""}">
            <div class="score-num-box">
              <span class="score-big">${s}</span>
              <span class="score-divider">/</span>
              <span class="score-total">${i}</span>
            </div>
            <div class="score-copy">
              <h1 class="score-title">
                ${a?"🌟 Outstanding! Sundarpur is Safe!":s>=1?"Village Defended with Vulnerabilities":"Severe Breaches Across the Village"}
              </h1>
              <p class="score-subtitle">
                ${a?"You made all 3 safe calls. The Disaster Devil was repelled and all 3 hubs held strong!":`You secured ${s} out of ${i} locations. Review the lessons below to protect every resident.`}
              </p>
            </div>
          </div>

          <!-- Locations Status Grid -->
          <section class="locations-section">
            <h2 class="sub-heading">Village Hub Status</h2>
            <div class="locations-grid">
              ${l.map(n=>`
                <div class="location-card ${n.isSecured?"secured":"breached"}">
                  <div class="loc-status-icon">
                    ${n.isSecured?"🛡️ SECURE":n.wasTimeout?"⏱️ TIMEOUT":"⚠️ BREACHED"}
                  </div>
                  <h3>${n.scenario.location}</h3>
                  <div class="loc-hazard-tag">${n.scenario.hazard.toUpperCase()}</div>
                  <p class="loc-takeaway">${n.scenario.takeaway}</p>
                </div>
              `).join("")}
            </div>
          </section>

          <!-- 3 Authoritative Takeaways -->
          <section class="takeaways-section">
            <h2 class="sub-heading">Three Critical Emergency Takeaways</h2>
            <div class="takeaways-list">
              <div class="takeaway-card">
                <span class="tk-badge eq">EARTHQUAKE</span>
                <h4>Indoors Shaking</h4>
                <p><strong>Drop, Cover, and Hold On.</strong> Stay indoors under a sturdy desk or table. Do not run outside or stand in doorways.</p>
              </div>

              <div class="takeaway-card">
                <span class="tk-badge fl">FLOOD</span>
                <h4>Swift Moving Water</h4>
                <p><strong>Turn Around Don't Drown!</strong> Never walk, wade, or drive into flood water. Just 6 inches can knock an adult off their feet.</p>
              </div>

              <div class="takeaway-card">
                <span class="tk-badge fr">FIRE</span>
                <h4>Smoke in Corridor</h4>
                <p><strong>Get low and get out.</strong> Smoke rises; cooler breathable air is within 12–24 inches of the floor. Test doors before opening.</p>
              </div>
            </div>
          </section>

          <!-- Action Buttons -->
          <div class="results-actions">
            ${r.length>0?`
              <button type="button" class="btn btn-secondary" id="practiceMissedBtn">
                🔄 Practice Missed Rounds (${r.length})
              </button>
            `:""}

            <button type="button" class="btn btn-hero" id="playAgainBtn" autofocus>
              Play Disaster Dash Again ➔
            </button>

            <button type="button" class="btn btn-ghost" id="backToHomeBtn">
              Back to Home
            </button>
          </div>

          <!-- Simulation Note -->
          <div class="sim-banner-subtle">
            Educational simulation, not live emergency advice. Always obey local emergency instructions.
          </div>
        </main>
      </div>
    `,(o=e.querySelector("#resultsHomeBtn"))==null||o.addEventListener("click",()=>this.onHome()),(p=e.querySelector("#backToHomeBtn"))==null||p.addEventListener("click",()=>this.onHome()),(u=e.querySelector("#playAgainBtn"))==null||u.addEventListener("click",()=>this.onPlayAgain()),(g=e.querySelector("#practiceMissedBtn"))==null||g.addEventListener("click",()=>this.onPracticeMissed())}}class B{constructor(e={}){this.routes=e,this.currentRoute=null,this.handleHashChange=this.handleHashChange.bind(this)}start(){window.addEventListener("hashchange",this.handleHashChange),this.handleHashChange()}stop(){window.removeEventListener("hashchange",this.handleHashChange)}handleHashChange(){const t=(window.location.hash||"#/").split("?")[0].replace(/\/+$/,"")||"#/";this.navigate(t,!1)}navigate(e,t=!0){if(t){window.location.hash=e;return}const s=this.routes[e]||this.routes["#/"];this.currentRoute=e,s&&s()}}class M{constructor(){this.appRoot=document.getElementById("app"),this.activeQuestionScreen=null,this.tourModal=new E({onComplete:()=>{const e=document.getElementById("heroPlayBtn");e&&e.focus()}}),this.homeScreen=new F({onPlay:()=>this.startGame(),onHowToPlay:()=>this.tourModal.open(!0)}),this.briefingScreen=new C({store:d,onStartRound:()=>d.startRound(),onHome:()=>this.exitToHome()}),this.questionScreen=new D({store:d,onSubmitAnswer:e=>d.submitAnswer(e),onHome:()=>this.exitToHome()}),this.feedbackScreen=new T({store:d,onNextRound:()=>d.nextRound(),onHome:()=>this.exitToHome()}),this.resultsScreen=new A({store:d,onPlayAgain:()=>this.startGame(),onPracticeMissed:()=>d.startPractice(),onHome:()=>this.exitToHome()}),this.lastRenderedStage=null,d.subscribe(e=>this.handleStoreUpdate(e)),this.router=new B({"#/":()=>this.renderHome(),"#/play":()=>this.renderPlay()})}start(){this.router.start()}exitToHome(){this.activeQuestionScreen&&(this.activeQuestionScreen.unmount(),this.activeQuestionScreen=null),d.reset(),this.lastRenderedStage=null,this.router.navigate("#/")}startGame(){d.startRun(),this.router.navigate("#/play")}renderHome(){this.activeQuestionScreen&&(this.activeQuestionScreen.unmount(),this.activeQuestionScreen=null),this.lastRenderedStage="HOME",this.homeScreen.render(this.appRoot),setTimeout(()=>{(window.location.hash==="#/"||window.location.hash==="")&&this.tourModal.open(!1)},400)}renderPlay(){const e=d.getState();if(e.stage==="HOME"){d.startRun();return}this.renderGameState(e)}handleStoreUpdate(e){this.router.currentRoute==="#/play"&&(this.lastRenderedStage!==e.stage||e.currentIndex!==this.lastIndex?(this.lastRenderedStage=e.stage,this.lastIndex=e.currentIndex,this.renderGameState(e)):e.stage==="QUESTION"&&this.activeQuestionScreen&&this.activeQuestionScreen.updateTimer())}renderGameState(e){switch(this.activeQuestionScreen&&e.stage!=="QUESTION"&&(this.activeQuestionScreen.unmount(),this.activeQuestionScreen=null),e.stage){case"BRIEFING":this.briefingScreen.render(this.appRoot);break;case"QUESTION":this.activeQuestionScreen=this.questionScreen,this.questionScreen.mount(this.appRoot);break;case"FEEDBACK":this.feedbackScreen.render(this.appRoot);break;case"RESULTS":this.resultsScreen.render(this.appRoot);break;default:this.renderHome();break}}}window.addEventListener("DOMContentLoaded",()=>{new M().start()});
//# sourceMappingURL=index-BjIXxJ2O.js.map
