import { icon } from '../../../app/icons.js';
import { score } from '../engine/game.js';

const note = `<p class="simulation-note">${icon('info')} Educational simulation, not live emergency advice.</p>`;

function action(label, id, kind = 'primary') {
  return `<button type="button" class="button ${kind}" data-action="${id}">${label}</button>`;
}

export function choiceMarkup(choice, index, state = '') {
  return `<button type="button" class="choice ${state}" data-action="answer" data-choice="${choice.id ?? ''}" ${state ? 'disabled' : ''}>
    <span class="choice-letter">${String.fromCharCode(65 + index)}</span><span>${choice.label}</span>${icon(state === 'safe' ? 'check' : 'arrow')}
  </button>`;
}

export function feedbackMarkup(title, message, kind) {
  return `<div class="feedback ${kind}"><div class="feedback-icon">${icon(kind === 'success' ? 'check' : 'info')}</div>
    <div><h3>${title}</h3><div class="feedback-copy">${message}</div></div></div>`;
}

function calmControl(calm) {
  return `<button type="button" class="mode-control" role="switch" aria-checked="${calm}" aria-label="Calm Mode" data-action="mode">
    ${icon('calm')} <span>Calm Mode</span> <i class="switch" aria-hidden="true"></i>
  </button>`;
}

function scene(scenario, calm, restored) {
  const hazard = scenario?.hazard;
  return `<aside class="scene ${hazard ?? 'village'} ${calm ? 'quiet' : ''} ${restored ? 'restored' : ''}" aria-label="Illustration of Sundarpur">
    <div class="scene-image"></div><div class="hazard-effect" aria-hidden="true"></div>
    <div class="scene-label">${icon('map')} <span><strong>Sundarpur</strong><small>${scenario?.location ?? (restored ? 'Village secured' : 'Village overview')}</small></span></div>
  </aside>`;
}

function briefing(run) {
  return `<p class="eyebrow"><span class="accent-dot"></span> ${run.original ? 'PRACTICE BRIEFING' : 'MISSION BRIEFING'}</p>
    <h1 tabindex="-1">${run.original ? 'Practice missed rounds' : 'Welcome to Sundarpur.'}</h1>
    <p class="game-prompt">${run.original ? 'Take another look at the situations you missed. Your original score is saved for this session.' : 'The Disaster Devil is taking different forms across Sundarpur. As a village resident, choose the safest action in each emergency.'}</p>
    <ul class="hazard-list">${run.queue.map(scenario => `<li>${icon(scenario.hazard)} ${scenario.hazard}</li>`).join('')}</ul>
    <div class="panel-actions">${action(`Start round ${icon('arrow')}`, 'start')}
      ${run.original ? '' : action(`${icon('grid')} Visual Challenges`, 'visual', 'secondary')}</div>
    ${run.original ? '' : '<p class="visual-description">Explore one interactive scene and one Rapid Pick round.</p>'}`;
}

function question(run, scenario, calm) {
  const outcome = run.phase === 'feedback' ? run.outcomes.at(-1) : null;
  const safe = scenario.choices.find(choice => choice.id === scenario.correctChoiceId);
  const selected = scenario.choices.find(choice => choice.id === outcome?.choiceId);
  let feedback = '';
  if (outcome) {
    const title = outcome.correct ? 'Safe choice' : selected ? 'A safer choice was available' : 'Time ran out';
    const message = outcome.correct
      ? `<p><strong>Your choice:</strong> ${safe.label}</p><p>${safe.explanation}</p>`
      : `${selected ? `<p><strong>Your choice:</strong> ${selected.label} ${selected.explanation}</p>` : ''}<p><strong>Safest action:</strong> ${safe.label}</p><p>${safe.explanation}</p>`;
    feedback = `<section tabindex="-1" data-feedback aria-label="Round feedback">${feedbackMarkup(title, message, outcome.correct ? 'success' : 'miss')}</section>
      <div class="panel-actions">${action(`${run.index + 1 === run.queue.length ? 'See results' : 'Next round'} ${icon('arrow')}`, 'advance')}</div>`;
  }

  const countdown = !outcome && !calm;
  const waiting = Boolean(scenario.format && !outcome && !run.ready);
  const pendingTimer = waiting ? 'data-challenge-timer hidden' : '';
  const format = scenario.format === 'scene' ? 'Find the safe choice' : 'Rapid Pick';
  return `<div class="round-meta">
      <span class="hazard-label">${icon(scenario.hazard)} ${scenario.hazard}</span>
      ${scenario.format ? `<span class="format-label">${format}</span>` : ''}
      ${countdown ? `<span class="timer" ${pendingTimer} aria-label="Round countdown">${icon('clock')} <span data-seconds aria-hidden="true">20s</span><span class="sr-only">20 seconds to choose</span></span>` : ''}
    </div>
    ${countdown ? `<div class="timer-track" ${pendingTimer} aria-hidden="true"><div data-timer-bar></div></div>` : ''}
    <h1 tabindex="-1">${scenario.title}</h1>
    <p class="game-prompt">${calm ? scenario.calmPrompt : scenario.prompt}</p>
    ${waiting ? '<p class="visual-description" data-reveal-status role="status">Preparing choices…</p>' : ''}
    <div class="choices" data-choice-list ${waiting ? 'inert' : ''} role="group" aria-label="Available actions">
      ${scenario.choices.map((choice, index) => choiceMarkup(choice, index, outcome ? choice.id === safe.id ? 'safe' : choice.id === selected?.id ? 'selected' : 'inactive' : '')).join('')}
    </div>${feedback}`;
}

function results(run) {
  const total = score(run.outcomes);
  const perfect = total === run.queue.length;
  const visual = run.kind === 'visual';
  return `<p class="eyebrow"><span class="accent-dot"></span> ${run.original ? 'PRACTICE COMPLETE' : visual ? 'VISUAL CHALLENGES DEBRIEF' : 'VILLAGE DEBRIEF'}</p>
    <h1 tabindex="-1">${run.original ? 'Practice complete.' : visual ? 'Visual Challenges complete.' : perfect ? 'Sundarpur is safe.' : 'Mission complete.'}</h1>
    <div class="result-score"><strong>${total}<span> / ${run.queue.length}</span></strong><span>Safe choices</span></div>
    ${run.original ? `<p class="original-score">Original run: ${score(run.original)} / ${run.original.length}</p>` : ''}
    <ul class="takeaways">${run.outcomes.map(({ scenario, correct }) => `<li>
      <span class="takeaway-icon ${correct ? 'secured' : ''}">${icon(correct ? 'check' : scenario.hazard)}</span>
      <div><strong>${scenario.location}</strong><span class="location-status"> · ${correct ? 'Secured' : 'Needs practice'}</span>
      <p>${scenario.takeaway}</p><a href="${scenario.sourceUrl}" target="_blank" rel="noreferrer">Safety source ↗</a></div>
    </li>`).join('')}</ul>
    <div class="panel-actions">${!perfect ? action(`Practice missed rounds ${icon('arrow')}`, 'practice') : ''}
    ${action(perfect ? `Play again ${icon('arrow')}` : 'Play again', 'replay', perfect ? 'primary' : 'secondary')}
    ${visual ? action('Choose game mode', 'briefing', 'secondary') : ''}
    <a href="#/" class="text-button">Back to home</a></div>`;
}

export function gameScreen(game) {
  const { run, calm } = game;
  const active = run.phase === 'question' || run.phase === 'feedback';
  const visualBoard = active && (game.scenario.format === 'scene' || (game.scenario.format === 'rapid' && run.phase === 'question'));
  const restored = run.phase === 'results' && !run.original && score(run.outcomes) === run.queue.length;
  return `<main class="game wrap ${calm ? 'calm' : ''}" id="main">
    <div class="game-top">
      <a class="text-button back-home" href="#/">${icon('back')} Home</a>
      ${active ? `<span class="round-progress">${run.original ? 'Practice · ' : run.kind === 'visual' ? 'Visual · ' : ''}Round ${run.index + 1} of ${run.queue.length}<span aria-hidden="true">${run.queue.map((_, index) => `<i class="${index <= run.index ? 'active' : ''}"></i>`).join('')}</span></span>` : ''}
      ${run.phase !== 'results' ? calmControl(calm) : ''}
    </div>
    ${calm && run.phase !== 'results' ? '<p class="calm-status" role="status">Calm Mode on · Take your time</p>' : ''}
    <div class="game-grid ${active ? 'active-round' : ''} ${visualBoard ? 'visual-round' : ''}">
      ${visualBoard ? `<aside class="challenge-board" aria-label="Visual challenge">
        <header class="challenge-heading">${icon(game.scenario.hazard)} <strong>${game.scenario.location}</strong><span>${game.scenario.hazard}</span></header>
        <div data-challenge></div>
      </aside>` : scene(active ? game.scenario : null, calm, restored)}
      <section class="game-panel ${active ? game.scenario.hazard : ''}">${active ? question(run, game.scenario, calm) : run.phase === 'briefing' ? briefing(run) : results(run)}
      ${note}</section>
    </div>
  </main>`;
}
