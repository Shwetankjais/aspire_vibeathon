import '@fontsource-variable/bricolage-grotesque/wght.css';
import '@fontsource-variable/dm-sans/wght.css';
import './styles.css';
import '../features/game/challenges/challenges.css';
import '../features/game/themes/hazards.css';
import { icon } from './icons.js';
import { home } from '../features/home/home.js';
import { openTour } from '../features/onboarding/tour.js';
import { scenarios } from '../features/game/content/scenarios.js';
import { createGame, ROUND_MS } from '../features/game/engine/game.js';
import { gameScreen } from '../features/game/screens/game-screen.js';

import { sceneScenarios } from '../features/game/challenges/scene/fixtures.js';
import { rapidScenarios } from '../features/game/challenges/rapid/rapid-scenarios.js';
import { createVisualDraw } from '../features/game/challenges/draw.js';
import { createChallengeHost } from '../features/game/challenges/lifecycle.js';

import { createVillageHost } from '../features/game/village/host.js';

const app = document.querySelector('#app');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
let currentRoute;
let tourDismissed = false;

const game = createGame(scenarios, render, remaining => {
  const seconds = app.querySelector('[data-seconds]');
  const bar = app.querySelector('[data-timer-bar]');
  if (!seconds || !bar) return;
  seconds.textContent = `${Math.ceil(remaining / 1000)}s`;
  bar.style.transform = `scaleX(${remaining / ROUND_MS})`;
  seconds.closest('.timer').classList.toggle('urgent', remaining <= 5000);
}, createVisualDraw([...sceneScenarios, ...rapidScenarios]));
const challenge = createChallengeHost(game, app, motion);
const village = createVillageHost(app, motion);

function showTour() {
  openTour(() => {
    tourDismissed = true;
    app.querySelector('#play-link')?.focus();
  });
}

function render(reason) {
  challenge.clear();
  village.clear();
  const playing = currentRoute === '#/play';
  const focused = reason === 'guide' ? '[data-action="guide"]' : reason === 'mode' ? '[data-action="mode"]' : reason === 'feedback' ? '[data-feedback]' : '#main h1';
  app.innerHTML = `
    <header class="site-header">
      <div class="wrap header-inner">
        <a class="brand" href="#/" aria-label="Disaster Dash home"><span>${icon('logo')}</span> Disaster Dash</a>
        ${playing ? '' : `<button type="button" class="text-button help-button" data-action="tour">${icon('help')} How to play</button>`}
      </div>
    </header>
    ${playing ? gameScreen(game) : home()}
    <footer class="site-footer wrap"><span>Disaster Dash</span><span>Educational simulation</span></footer>`;

  if (playing) { challenge.mount(); village.mount(game); }
  if (reason === 'route' && !playing) return;
  app.querySelector(focused)?.focus({ preventScroll: reason === 'mode' || reason === 'guide' });
  if (reason !== 'mode' && reason !== 'guide' && reason !== 'feedback') window.scrollTo(0, 0);
}

function route() {
  const next = location.hash === '#/play' ? '#/play' : '#/';
  if (next === currentRoute) return;
  currentRoute = next;
  if (next === '#/play') game.brief();
  else {
    game.leave();
    render('route');
    window.scrollTo(0, 0);
    if (!tourDismissed) showTour();
    else app.querySelector('#play-link').focus({ preventScroll: true });
  }
}

app.addEventListener('click', event => {
  const button = event.target.closest('[data-action]');
  switch (button?.dataset.action) {
    case 'tour': showTour(); break;
    case 'start': game.start(); break;
    case 'start-guide': game.start(true); break;
    case 'guide': game.toggleGuide(); break;
    case 'view-challenge': {
      app.querySelector('.challenge-board')?.focus();
      break;
    }
    case 'visual': game.startVisual(); break;
    case 'briefing': game.brief(); break;
    case 'answer': game.answer(button.dataset.choice); break;
    case 'mode': game.toggleCalm(); break;
    case 'advance': game.advance(); break;
    case 'practice': game.practice(); break;
    case 'replay': game.replay(); break;
  }
});

window.addEventListener('hashchange', route);
route();
