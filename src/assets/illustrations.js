/**
 * Inline vector SVG illustrations for Disaster Dash
 * Fictional Village of Sundarpur and the 3 hazard scenes
 */

export const ILLUSTRATIONS = {
  sundarpurVillage: `
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
  `,

  disasterDevil: `
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
  `,

  schoolEarthquake: `
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
  `,

  riverFlood: `
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
  `,

  homeFire: `
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
  `,

  villageSaved: `
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
  `
};
