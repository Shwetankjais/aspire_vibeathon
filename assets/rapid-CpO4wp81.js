import{r as A}from"./index-CsLbG2oW.js";const w={"leave-for-meeting-place":`
    <svg viewBox="0 0 80 80" class="rapid-card-svg" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="80" height="80" rx="12" fill="#ECFDF5"/>
      <path d="M48 18H28C25.79 18 24 19.79 24 22V58C24 60.21 25.79 62 28 62H48" stroke="#059669" stroke-width="4" stroke-linecap="round"/>
      <path d="M38 40H60M60 40L50 30M60 40L50 50" stroke="#10B981" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="56" cy="24" r="4" fill="#047857"/>
    </svg>
  `,"collect-belongings":`
    <svg viewBox="0 0 80 80" class="rapid-card-svg" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="80" height="80" rx="12" fill="#FEF2F2"/>
      <!-- Laptop -->
      <rect x="20" y="24" width="34" height="22" rx="3" stroke="#DC2626" stroke-width="3" fill="#FFFFFF"/>
      <path d="M14 49H60" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/>
      <!-- Phone -->
      <rect x="44" y="32" width="18" height="26" rx="3" stroke="#B91C1C" stroke-width="3" fill="#FEE2E2"/>
      <circle cx="53" cy="52" r="2" fill="#B91C1C"/>
      <!-- Warning Alert -->
      <circle cx="60" cy="20" r="8" fill="#EF4444"/>
      <path d="M60 16V21M60 23.5V24.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,"hide-indoors":`
    <svg viewBox="0 0 80 80" class="rapid-card-svg" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="80" height="80" rx="12" fill="#FFFBEB"/>
      <!-- Closet Door -->
      <rect x="22" y="16" width="36" height="48" rx="2" stroke="#D97706" stroke-width="3.5" fill="#FEF3C7"/>
      <line x1="40" y1="16" x2="40" y2="64" stroke="#D97706" stroke-width="2.5"/>
      <circle cx="36" cy="40" r="2.5" fill="#78350F"/>
      <circle cx="44" cy="40" r="2.5" fill="#78350F"/>
      <!-- Trapped Hazard Symbol -->
      <path d="M58 20L66 32H50L58 20Z" fill="#F59E0B" stroke="#B45309" stroke-width="1.5"/>
      <text x="58" y="30" font-size="9" font-weight="900" fill="#78350F" text-anchor="middle">!</text>
    </svg>
  `,"turn-around-safely":`
    <svg viewBox="0 0 80 80" class="rapid-card-svg" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="80" height="80" rx="12" fill="#ECFDF5"/>
      <!-- U-Turn Arrow -->
      <path d="M52 54V34C52 25.16 44.84 18 36 18C27.16 18 20 25.16 20 34V52" stroke="#059669" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M12 44L20 54L28 44" stroke="#059669" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Safe High Ground Mountain -->
      <path d="M52 46L60 34L68 46H52Z" fill="#10B981" stroke="#047857" stroke-width="2"/>
    </svg>
  `,"drive-through-slowly":`
    <svg viewBox="0 0 80 80" class="rapid-card-svg" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="80" height="80" rx="12" fill="#FEF2F2"/>
      <!-- Water Waves -->
      <path d="M14 52C20 48 26 56 32 52C38 48 44 56 50 52C56 48 62 56 68 52" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/>
      <path d="M14 62C20 58 26 66 32 62C38 58 44 66 50 62C56 58 62 66 68 62" stroke="#0369A1" stroke-width="3" stroke-linecap="round"/>
      <!-- Sinking Car Silhouette -->
      <path d="M22 46L28 34H48L56 46H22Z" fill="#EF4444" stroke="#991B1B" stroke-width="2"/>
      <circle cx="30" cy="48" r="4" fill="#1F2937"/>
      <circle cx="48" cy="48" r="4" fill="#1F2937"/>
    </svg>
  `,"follow-vehicle-water":`
    <svg viewBox="0 0 80 80" class="rapid-card-svg" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="80" height="80" rx="12" fill="#FFFBEB"/>
      <!-- Lead Vehicle -->
      <rect x="42" y="24" width="22" height="18" rx="2" fill="#94A3B8" stroke="#475569" stroke-width="2"/>
      <!-- Trailing Vehicle following into water -->
      <rect x="18" y="34" width="20" height="16" rx="2" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
      <!-- Rising Flood Current -->
      <path d="M12 56C24 50 36 62 48 56C60 50 70 60 76 56" stroke="#0284C7" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M12 66C24 60 36 72 48 66C60 60 70 70 76 66" stroke="#0369A1" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `,default:`
    <svg viewBox="0 0 80 80" class="rapid-card-svg" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="80" height="80" rx="12" fill="#F1F5F9"/>
      <circle cx="40" cy="40" r="18" stroke="#64748B" stroke-width="4"/>
      <path d="M40 30V40L46 46" stroke="#64748B" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `},C=`
.rapid-help { padding: 0 16px 14px; margin: 0; color: #51445b; font-size: .88rem; }
.challenge-board .rapid-cards-grid { padding: 16px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
@media (max-width: 960px) { .challenge-board .rapid-cards-grid { grid-template-columns: 1fr; } }
.rapid-pick-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  perspective: 1200px;
}

.rapid-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.rapid-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #18181B;
  color: #FEF08A;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  border: 1.5px solid #F59E0B;
}

.rapid-hazard-tag {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
}

.rapid-hazard-tag.fire {
  background: #FFE4E6;
  color: #991B1B;
}

.rapid-hazard-tag.flood {
  background: #CCFBF1;
  color: #0F766E;
}

.rapid-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
}

@media (max-width: 720px) {
  .rapid-cards-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}

.rapid-card-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  gap: 0.85rem;
  background: #FFFFFF;
  border: 3px solid #18181B;
  border-radius: 14px;
  padding: 1.25rem 1rem;
  cursor: pointer;
  box-shadow: 4px 4px 0px #18181B;
  user-select: none;
  font-family: inherit;
  transition: transform 0.15s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.15s ease, background-color 0.15s ease;
  min-height: 180px;
  position: relative;
  will-change: transform, opacity;
}

@media (max-width: 720px) {
  .rapid-card-btn {
    flex-direction: row;
    text-align: left;
    min-height: 80px;
    padding: 0.85rem 1rem;
    gap: 1rem;
  }
}

.rapid-card-btn:hover:not(:disabled) {
  background-color: #FEF9C3;
  transform: translate(-3px, -3px);
  box-shadow: 7px 7px 0px #18181B;
}

.rapid-card-btn:active:not(:disabled) {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px #18181B;
}

.rapid-card-btn:focus-visible {
  outline: 3.5px solid #F59E0B;
  outline-offset: 3px;
}

.rapid-card-btn:disabled {
  cursor: not-allowed;
  opacity: 0.9;
}

.rapid-card-btn.selected {
  background: #FEF08A;
  border-color: #047857;
  box-shadow: 4px 4px 0px #047857;
}

.rapid-key-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background: #18181B;
  color: #FFFFFF;
  font-size: 0.85rem;
  font-weight: 900;
  flex-shrink: 0;
  box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.2);
}

.rapid-card-illustration {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

@media (max-width: 720px) {
  .rapid-card-illustration {
    width: 48px;
    height: 48px;
  }
}

.rapid-card-svg {
  width: 100%;
  height: 100%;
}

.rapid-card-label {
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.35;
  color: #18181B;
  flex-grow: 1;
}

@media (max-width: 720px) {
  .rapid-card-label {
    font-size: 0.9rem;
  }
}

@keyframes rapidSlotEnter {
  0% {
    opacity: 0;
    transform: translateY(28px) scale(0.94) rotateX(12deg);
  }
  70% {
    transform: translateY(-3px) scale(1.01) rotateX(0deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1) rotateX(0deg);
  }
}

.rapid-animating .rapid-card-slot-0 {
  animation: rapidSlotEnter 280ms cubic-bezier(0.16, 1, 0.3, 1) 0ms forwards;
}

.rapid-animating .rapid-card-slot-1 {
  animation: rapidSlotEnter 280ms cubic-bezier(0.16, 1, 0.3, 1) 140ms forwards;
}

.rapid-animating .rapid-card-slot-2 {
  animation: rapidSlotEnter 280ms cubic-bezier(0.16, 1, 0.3, 1) 280ms forwards;
}

.rapid-pick-container.calm-mode .rapid-card-btn,
.rapid-pick-container.reduced-motion .rapid-card-btn {
  animation: none !important;
  opacity: 1 !important;
  transform: none !important;
  border-color: #64748B;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  background: #FFFFFF;
}

.rapid-pick-container.calm-mode .rapid-card-btn:hover:not(:disabled),
.rapid-pick-container.reduced-motion .rapid-card-btn:hover:not(:disabled) {
  background-color: #F1F5F9;
  transform: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  border-color: #0D9488;
}

.rapid-pick-container.calm-mode .rapid-key-badge,
.rapid-pick-container.reduced-motion .rapid-key-badge {
  background: #475569;
}

.rapid-pick-container.calm-mode .rapid-badge {
  background: #F0FDF4;
  color: #065F46;
  border-color: #10B981;
}

@media (prefers-reduced-motion: reduce) {
  .rapid-card-btn {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
`;function B(){if(typeof document>"u")return;const d="disaster-dash-rapid-styles";if(!document.getElementById(d)){const t=document.createElement("style");t.id=d,t.textContent=C,document.head.appendChild(t)}}function E(d,{scenario:t,calmMode:k=!1,reducedMotion:b=!1,onReady:F=()=>{},onChoose:y=()=>{}}={}){if(!d||!t||!Array.isArray(t.choices))return console.warn("RapidPick: Invalid container or scenario provided"),{destroy:()=>{}};B();const g=b||typeof window<"u"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches,s=k||g;let o=!1,c=!1,n=null,p=!1;const a=document.createElement("div");a.className=`rapid-pick-container ${s?"calm-mode":"rapid-animating"} ${g?"reduced-motion":""}`,a.setAttribute("role","region"),a.setAttribute("aria-label",`Rapid Pick Challenge: ${t.title}`);const v=t.choices.map((e,r)=>{const i=String.fromCharCode(65+r),l=w[e.id]||w.default;return`
      <button
        type="button"
        class="rapid-card-btn rapid-card-slot-${r}"
        data-choice-id="${e.id}"
        data-index="${r}"
        aria-label="Action ${i}: ${e.label}"
        tabindex="0"
        ${s?"":"disabled"}
      >
        <span class="rapid-key-badge" aria-hidden="true">${i}</span>
        <span class="rapid-card-illustration" aria-hidden="true">
          ${l}
        </span>
        <span class="rapid-card-label">${e.label}</span>
      </button>
    `}).join("");a.innerHTML=`
    <div class="rapid-cards-grid" role="group" aria-label="Choices for ${t.title}">
      ${v}
    </div>
    <p class="rapid-help">Pick a card or press 1, 2, or 3.</p>
  `,d.replaceChildren(a);const h=a.querySelectorAll(".rapid-card-btn");function m(e){o||p||(p=!0,h.forEach(r=>{r.getAttribute("data-choice-id")===e?r.classList.add("selected"):r.disabled=!0}),y(e))}h.forEach(e=>{e.addEventListener("click",r=>{r.preventDefault();const i=e.getAttribute("data-choice-id");m(i)})});function f(e){if(o||p||!c||e.repeat||e.altKey||e.ctrlKey||e.metaKey||e.target&&(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"))return;const r=e.key.toUpperCase();let i=-1;if(r==="1"||r==="A"?i=0:r==="2"||r==="B"?i=1:(r==="3"||r==="C")&&(i=2),i>=0&&t.choices[i]){e.preventDefault();const l=t.choices[i].id,u=a.querySelector(`[data-choice-id="${l}"]`);u&&u.focus(),m(l)}}window.addEventListener("keydown",f);function x(){o||c||(c=!0,a.classList.remove("rapid-animating"),h.forEach(e=>{e.disabled=!1}),F())}return s?x():n=setTimeout(()=>{x()},560),{destroy(){o=!0,n&&(clearTimeout(n),n=null),window.removeEventListener("keydown",f),a.remove()}}}export{E as mountChallenge,A as rapidScenarios};
