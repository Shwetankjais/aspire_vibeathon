/**
 * Fire Scene — Animated Sundarpur
 * Owner: Antigravity
 *
 * Implements the fire hazard animation:
 *   onset       → smoke begins at one identifiable house
 *   escalation  → localized flame + warm glow on neighbouring surfaces,
 *                 smoke plume rises and drifts; alarm gestures (restrained)
 *   aftermath   → fire at peak — stable loop; people visible at safe meeting point
 *   feedback    → people move away from house toward outdoor meeting point (phase='feedback')
 *
 * Safety source: U.S. Fire Administration — Home Fire Escape Plans
 * https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/home-fire-escape-plans/
 *
 * Interface (defined by Codex host):
 *   createScene({ world, assets }) → { render({ elapsedMs, stage, motion, phase }), dispose() }
 *
 * No graphic injury. No flashing (flame animated at < 3Hz via CSS).
 * @media (prefers-reduced-motion) support via motion='none'.
 */

import './village.css';

/* ─── DOM scaffold ──────────────────────────────────────────────────── */
function buildDOM(world) {
  world.classList.add('sv-fire');
  world.innerHTML = `
    <div class="sv-sky sv-sky-fire"></div>
    <div class="sv-hill"></div>
    <div class="sv-terrace"></div>
    <div class="sv-road"></div>
    <div class="sv-river">
      <div class="sv-river-body"></div>
    </div>
    <div class="sv-house h1 fire-house"><div class="sv-roof"></div><div class="sv-wall"></div>
      <div class="sv-flame-wrap">
        <div class="sv-flame f1"></div>
        <div class="sv-flame f2"></div>
        <div class="sv-flame f3"></div>
      </div>
      <div class="sv-smoke-stack">
        <div class="sv-smoke s1"></div>
        <div class="sv-smoke s2"></div>
        <div class="sv-smoke s3"></div>
      </div>
    </div>
    <div class="sv-house h2"><div class="sv-roof"></div><div class="sv-wall"></div></div>
    <div class="sv-glow" aria-hidden="true"></div>
    <div class="sv-trees"><i></i><i></i><i></i></div>
    <div class="sv-meeting-point" aria-label="Meeting point"></div>
    <div class="sv-villager v1" aria-hidden="true"><i class="sv-vhead"></i><i class="sv-vbody"></i></div>
    <div class="sv-villager v2" aria-hidden="true"><i class="sv-vhead"></i><i class="sv-vbody"></i></div>
  `;
}

/* ─── Main export ───────────────────────────────────────────────────── */
export function createScene({ world }) {
  buildDOM(world);

  const flames   = world.querySelectorAll('.sv-flame');
  const smokes   = world.querySelectorAll('.sv-smoke');
  const glow     = world.querySelector('.sv-glow');
  const v1       = world.querySelector('.sv-villager.v1');
  const v2       = world.querySelector('.sv-villager.v2');
  const meeting  = world.querySelector('.sv-meeting-point');
  const fireHouse = world.querySelector('.fire-house');

  let _stage  = 'still';
  let _motion = 'full';
  let _phase  = 'question';

  function applyState() {
    world.dataset.stage  = _stage;
    world.dataset.motion = _motion;
    world.dataset.phase  = _phase;

    const still      = _motion === 'none' || _stage === 'still';
    const hasOnset   = _stage !== 'still';
    const hasEsc     = _stage === 'escalation' || _stage === 'aftermath' || _stage === 'feedback';
    const hasAfter   = _stage === 'aftermath'  || _stage === 'feedback';
    const inFeedback = _phase === 'feedback'   && hasAfter;

    /* Smoke */
    smokes.forEach(s => s.classList.toggle('sv-smoke-anim', hasOnset && !still));

    /* Flame — only from escalation, no flash (CSS transition based) */
    flames.forEach(f => {
      f.classList.toggle('sv-flame-visible', hasEsc);
      f.classList.toggle('sv-flame-anim',    hasEsc && !still);
    });

    /* Glow on neighbouring surfaces */
    glow.classList.toggle('sv-glow-active', hasEsc);
    glow.classList.toggle('sv-glow-anim',   hasEsc && !still);

    /* Sky warms */
    world.classList.toggle('sv-fire-sky-warm', hasEsc);

    /* Villager alarm gestures (question only) */
    v1.classList.toggle('sv-alarm', hasEsc && !inFeedback);
    v2.classList.toggle('sv-alarm', hasEsc && !inFeedback);

    /* Retreat to meeting point (feedback only) */
    v1.classList.toggle('sv-evacuate', inFeedback);
    v2.classList.toggle('sv-evacuate', inFeedback);
    meeting.classList.toggle('sv-meeting-visible', hasAfter);

    /* Calm / reduced-motion: stop all animations */
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
 * Exported so the host can build still navigation (Previous/Next scene step).
 */
export const fireStillFrames = [
  { stage: 'onset',      label: 'Smoke at the house' },
  { stage: 'escalation', label: 'Fire and warm glow — alarm visible' },
  { stage: 'aftermath',  label: 'Meeting point visible — move away from the house' },
];

