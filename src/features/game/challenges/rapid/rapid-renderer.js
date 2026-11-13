/**
 * Reusable Rapid Pick Renderer for Disaster Dash Visual Challenges
 *
 * Implements the shared challenge interface:
 * mountChallenge(container, { scenario, calmMode, reducedMotion, onReady, onChoose })
 * Returns: { destroy() }
 */

import { RAPID_ICONS } from './rapid-icons.js';
import { ensureRapidStyles } from './rapid-style.js';

export function mountChallenge(container, {
  scenario,
  calmMode = false,
  reducedMotion = false,
  onReady = () => {},
  onChoose = () => {}
} = {}) {
  if (!container || !scenario || !Array.isArray(scenario.choices)) {
    console.warn('RapidPick: Invalid container or scenario provided');
    return { destroy: () => {} };
  }

  ensureRapidStyles();

  // Detect system reduced motion if not explicitly passed
  const prefersReduced = reducedMotion || 
    (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  
  const isStatic = calmMode || prefersReduced;

  let destroyed = false;
  let readyCalled = false;
  let readyTimer = null;
  let chosen = false;

  // Root challenge container
  const challengeEl = document.createElement('div');
  challengeEl.className = `rapid-pick-container ${isStatic ? 'calm-mode' : 'rapid-animating'} ${prefersReduced ? 'reduced-motion' : ''}`;
  challengeEl.setAttribute('role', 'region');
  challengeEl.setAttribute('aria-label', `Rapid Pick Challenge: ${scenario.title}`);

  const hazardKey = scenario.hazard || 'fire';

  // Build target cards HTML
  const cardsHtml = scenario.choices.map((choice, index) => {
    const keyLetter = String.fromCharCode(65 + index); // A, B, C
    const keyNumber = index + 1; // 1, 2, 3
    const iconSvg = RAPID_ICONS[choice.id] || RAPID_ICONS.default;

    return `
      <button 
        type="button" 
        class="rapid-card-btn rapid-card-slot-${index}" 
        data-choice-id="${choice.id}"
        data-index="${index}"
        aria-label="Action ${keyLetter}: ${choice.label}"
        tabindex="0"
        ${!isStatic ? 'disabled' : ''}
      >
        <span class="rapid-key-badge" aria-hidden="true">${keyLetter}</span>
        <div class="rapid-card-illustration" aria-hidden="true">
          ${iconSvg}
        </div>
        <span class="rapid-card-label">${choice.label}</span>
      </button>
    `;
  }).join('');

  challengeEl.innerHTML = `
    <div class="rapid-header">
      <span class="rapid-badge">⚡ RAPID PICK · QUICK DECISION</span>
      <span class="rapid-hazard-tag ${hazardKey}">${hazardKey.toUpperCase()}</span>
    </div>
    <div class="rapid-cards-grid" role="group" aria-label="Choices for ${scenario.title}">
      ${cardsHtml}
    </div>
  `;

  container.replaceChildren(challengeEl);

  const buttons = challengeEl.querySelectorAll('.rapid-card-btn');

  function handleChoiceSelection(choiceId) {
    if (destroyed || chosen) return;
    chosen = true;

    // Visual selection indicator
    buttons.forEach(btn => {
      if (btn.getAttribute('data-choice-id') === choiceId) {
        btn.classList.add('selected');
      } else {
        btn.disabled = true;
      }
    });

    onChoose(choiceId);
  }

  // Click & Touch handlers
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const choiceId = btn.getAttribute('data-choice-id');
      handleChoiceSelection(choiceId);
    });
  });

  // Keyboard navigation handler (A/B/C or 1/2/3)
  function handleKeyDown(e) {
    if (destroyed || chosen || !readyCalled) return;

    // Prevent handling when typing in input/textarea (if any)
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
      return;
    }

    const key = e.key.toUpperCase();
    let selectedIndex = -1;

    if (key === '1' || key === 'A') selectedIndex = 0;
    else if (key === '2' || key === 'B') selectedIndex = 1;
    else if (key === '3' || key === 'C') selectedIndex = 2;

    if (selectedIndex >= 0 && scenario.choices[selectedIndex]) {
      e.preventDefault();
      const choiceId = scenario.choices[selectedIndex].id;
      const targetBtn = challengeEl.querySelector(`[data-choice-id="${choiceId}"]`);
      if (targetBtn) targetBtn.focus();
      handleChoiceSelection(choiceId);
    }
  }

  window.addEventListener('keydown', handleKeyDown);

  // Ready signal dispatch
  function setReady() {
    if (destroyed || readyCalled) return;
    readyCalled = true;
    challengeEl.classList.remove('rapid-animating');
    buttons.forEach(btn => { btn.disabled = false; });
    onReady();
  }

  if (isStatic) {
    // Immediate activation for Calm Mode or reduced motion
    setReady();
  } else {
    // Wait until staggered entry finishes (280ms stagger + 280ms animation = 560ms)
    readyTimer = setTimeout(() => {
      setReady();
    }, 560);
  }

  return {
    destroy() {
      destroyed = true;
      if (readyTimer) {
        clearTimeout(readyTimer);
        readyTimer = null;
      }
      window.removeEventListener('keydown', handleKeyDown);
      challengeEl.remove();
    }
  };
}
