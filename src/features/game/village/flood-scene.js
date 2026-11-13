/**
 * Flood Scene — Animated Sundarpur
 * Owner: Antigravity
 *
 * Implements the flood hazard animation:
 *   onset       → river rises, water advances across the lower fields
 *   escalation  → road partially submerged, current ripples visible,
 *                 villagers notice + signal each other from dry terrain
 *   aftermath   → water at high mark, stable loop (ripples + partial road)
 *   feedback    → villagers retreat along dry terrain (phase === 'feedback')
 *
 * Safety source: FEMA CERT Flood Annex
 * https://www.ready.gov/sites/default/files/2019.CERT_.HazardAnnexes.PM_.FINAL_.508c.pdf
 *
 * Interface (defined by Codex host):
 *   createScene({ world, assets }) → { render({ elapsedMs, stage, motion, phase }), dispose() }
 *
 * world   – SVG/canvas group or DOM element provided by the shared 3D host
 * assets  – shared geometry/character helpers provided by the host
 *
 * When called outside the full 3D host (isolated harness / fallback),
 * world is a plain <div>; the module renders a CSS-only 2D scene instead.
 */

import './village.css';

/* ─── Stage timing (ms) ─────────────────────────────────────────────── */
const T = {
  RIPPLE_START:    0,
  WATER_RISE:    800,
  ROAD_FLOOD:   2000,
  VILLAGER_SIGNAL: 3200,
  ESCALATION_DONE: 5000,
};

/* ─── CSS scene geometry ────────────────────────────────────────────── */
function buildDOM(world) {
  world.classList.add('sv-flood');
  world.innerHTML = `
    <div class="sv-sky"></div>
    <div class="sv-hill"></div>
    <div class="sv-terrace"></div>
    <div class="sv-road"></div>
    <div class="sv-river">
      <div class="sv-river-body"></div>
      <div class="sv-ripple r1"></div>
      <div class="sv-ripple r2"></div>
      <div class="sv-ripple r3"></div>
    </div>
    <div class="sv-flood-advance"></div>
    <div class="sv-house h1"><div class="sv-roof"></div><div class="sv-wall"></div></div>
    <div class="sv-house h2"><div class="sv-roof"></div><div class="sv-wall"></div></div>
    <div class="sv-trees">
      <i></i><i></i><i></i>
    </div>
    <div class="sv-villager v1" aria-hidden="true"><i class="sv-vhead"></i><i class="sv-vbody"></i></div>
    <div class="sv-villager v2" aria-hidden="true"><i class="sv-vhead"></i><i class="sv-vbody"></i></div>
    <div class="sv-road-water"></div>
    <div class="sv-current"><i></i><i></i><i></i><i></i></div>
  `;
}

/* ─── Main export ───────────────────────────────────────────────────── */
export function createScene({ world }) {
  buildDOM(world);

  const advance   = world.querySelector('.sv-flood-advance');
  const roadWater = world.querySelector('.sv-road-water');
  const current   = world.querySelector('.sv-current');
  const v1        = world.querySelector('.sv-villager.v1');
  const v2        = world.querySelector('.sv-villager.v2');
  const ripples   = world.querySelectorAll('.sv-ripple');

  let _stage  = 'still';
  let _motion = 'full';
  let _phase  = 'question';

  /* Apply classes that drive CSS animations */
  function applyState() {
    const root = world;
    root.dataset.stage  = _stage;
    root.dataset.motion = _motion;
    root.dataset.phase  = _phase;

    /* Water advance progress */
    const still      = _motion === 'none' || _stage === 'still';
    const hasOnset   = _stage !== 'still';
    const hasEsc     = _stage === 'escalation' || _stage === 'aftermath' || _stage === 'feedback';
    const hasAfter   = _stage === 'aftermath'  || _stage === 'feedback';
    const inFeedback = _phase === 'feedback'   && (_stage === 'aftermath' || _stage === 'feedback');

    advance.classList.toggle('sv-rising',   hasOnset && !still);
    advance.classList.toggle('sv-risen',    hasAfter);
    roadWater.classList.toggle('sv-road-flooded',  hasEsc);
    current.classList.toggle('sv-current-active',  hasEsc && !still);
    ripples.forEach(r => r.classList.toggle('sv-ripple-anim', !still));

    /* Villagers: notice → signal → retreat (feedback only) */
    v1.classList.toggle('sv-notice',  hasEsc && !inFeedback);
    v2.classList.toggle('sv-notice',  hasEsc && !inFeedback);
    v1.classList.toggle('sv-retreat', inFeedback);
    v2.classList.toggle('sv-retreat', inFeedback);

    /* Calm / reduced-motion: halt all CSS animations */
    world.classList.toggle('sv-no-anim', still);
  }

  return {
    render({ elapsedMs = 0, stage = 'still', motion = 'full', phase = 'question' }) {
      _stage  = stage;
      _motion = motion;
      _phase  = phase;
      applyState();
    },
    dispose() {
      world.innerHTML = '';
      world.className = '';
    },
  };
}

/* ─── Still frames for Calm Mode ───────────────────────────────────────
 * Array of { stage, label } shown by the host's Previous/Next controls.
 * Exported so the host can build still navigation.
 */
export const floodStillFrames = [
  { stage: 'onset',       label: 'River begins to rise' },
  { stage: 'escalation',  label: 'Water crosses the road' },
  { stage: 'aftermath',   label: 'High water — stay off the road' },
];

