import { ILLUSTRATIONS } from '../../../assets/illustrations.js';
import { THEMES } from '../themes/theme.js';

export class QuestionScreen {
  constructor({ store, onSubmitAnswer, onHome }) {
    this.store = store;
    this.onSubmitAnswer = onSubmitAnswer;
    this.onHome = onHome;
    this.container = null;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  mount(container) {
    this.container = container;
    document.addEventListener('keydown', this.handleKeyDown);
    this.render();
  }

  unmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    const state = this.store.getState();
    if (state.stage !== 'QUESTION' || state.answered) return;

    const scenario = state.currentScenario;
    if (!scenario) return;

    if (e.key === '1' && scenario.choices[0]) {
      this.onSubmitAnswer(scenario.choices[0].id);
    } else if (e.key === '2' && scenario.choices[1]) {
      this.onSubmitAnswer(scenario.choices[1].id);
    } else if (e.key === '3' && scenario.choices[2]) {
      this.onSubmitAnswer(scenario.choices[2].id);
    }
  }

  render() {
    if (!this.container) return;
    const state = this.store.getState();
    const scenario = state.currentScenario;
    if (!scenario) return;

    const isCalm = state.isCalmMode;
    const theme = THEMES[scenario.hazard] || THEMES.earthquake;
    const remainingSec = state.timer.remainingSec;
    const progressPercent = state.timer.progressPercent;
    const isUrgent = remainingSec <= 5 && !isCalm;

    let sceneSvg = ILLUSTRATIONS.schoolEarthquake;
    if (scenario.hazard === 'flood') sceneSvg = ILLUSTRATIONS.riverFlood;
    if (scenario.hazard === 'fire') sceneSvg = ILLUSTRATIONS.homeFire;

    const promptText = isCalm ? scenario.calmPrompt : scenario.prompt;

    this.container.innerHTML = `
      <div class="game-screen-wrapper ${isCalm ? 'calm-theme' : `theme-${scenario.hazard}`}">
        <!-- Top Game Bar -->
        <header class="game-header">
          <div class="header-left">
            <button type="button" class="btn btn-ghost btn-sm" id="questionBackHome">
              ← Exit Run
            </button>
            <span class="round-tracker-badge">
              Round ${state.currentRound} of ${state.totalRounds}
            </span>
            <span class="hazard-badge-pill" style="background: ${theme.badgeBg}; color: ${theme.badgeText};">
              ${theme.name.toUpperCase()}
            </span>
          </div>

          <div class="header-right">
            <!-- Calm Mode Toggle -->
            <div class="calm-toggle-container">
              <label class="calm-switch" for="calmToggleQuestion">
                <input type="checkbox" id="calmToggleQuestion" ${isCalm ? 'checked' : ''} aria-label="Toggle Calm Mode">
                <span class="slider round"></span>
              </label>
              <span class="calm-label">
                ${isCalm ? '<strong>Calm Mode: ON</strong>' : 'Calm Mode: OFF'}
              </span>
            </div>
          </div>
        </header>

        <!-- Timer Bar (Only in Normal Mode) -->
        ${!isCalm ? `
          <div class="timer-container ${isUrgent ? 'urgent' : ''}" role="timer" aria-live="polite" aria-label="Time remaining: ${remainingSec} seconds">
            <div class="timer-header">
              <span class="timer-label">DECISION DEADLINE:</span>
              <span class="timer-countdown ${isUrgent ? 'pulse-text' : ''}">
                ⏱ ${remainingSec}s
              </span>
            </div>
            <div class="timer-progress-track">
              <div class="timer-progress-fill ${isUrgent ? 'urgent-fill' : ''}" style="width: ${progressPercent}%;"></div>
            </div>
          </div>
        ` : `
          <div class="calm-mode-banner">
            <span class="calm-mode-badge">CALM MODE ACTIVE</span>
            <span>Untimed round. Take your time to assess the situation and choose safely.</span>
          </div>
        `}

        <!-- Question Main Area -->
        <main class="question-main-card">
          <!-- Scene SVG Illustration -->
          <div class="scenario-scene-wrapper">
            ${sceneSvg}
          </div>

          <!-- Scenario Details -->
          <div class="scenario-details">
            <div class="location-tag">LOCATION: ${scenario.location.toUpperCase()}</div>
            <h1 class="scenario-title">${scenario.title}</h1>
            <p class="scenario-prompt">${promptText}</p>
          </div>

          <!-- Choices Grid -->
          <div class="choices-container" role="group" aria-label="Choices for ${scenario.title}">
            ${scenario.choices.map((choice, idx) => `
              <button 
                type="button" 
                class="choice-btn" 
                data-choice-id="${choice.id}"
                aria-label="Option ${idx + 1}: ${choice.label}"
              >
                <span class="choice-num-key" aria-hidden="true">${idx + 1}</span>
                <span class="choice-text">${choice.label}</span>
              </button>
            `).join('')}
          </div>

          <!-- Simulation Note -->
          <div class="sim-banner-subtle">
            Educational simulation, not live emergency advice.
          </div>
        </main>
      </div>
    `;

    // Event listeners
    this.container.querySelector('#questionBackHome')?.addEventListener('click', () => this.onHome());
    
    this.container.querySelector('#calmToggleQuestion')?.addEventListener('change', () => {
      this.store.toggleCalmMode();
      this.render();
    });

    const choiceBtns = this.container.querySelectorAll('.choice-btn');
    choiceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const choiceId = btn.getAttribute('data-choice-id');
        this.onSubmitAnswer(choiceId);
      });
    });
  }

  updateTimer() {
    // Lightweight partial DOM update for timer bar without full re-render
    const state = this.store.getState();
    if (state.isCalmMode || state.stage !== 'QUESTION' || !this.container) return;

    const remainingSec = state.timer.remainingSec;
    const progressPercent = state.timer.progressPercent;
    const isUrgent = remainingSec <= 5;

    const timerCountdown = this.container.querySelector('.timer-countdown');
    const timerFill = this.container.querySelector('.timer-progress-fill');
    const timerContainer = this.container.querySelector('.timer-container');

    if (timerCountdown) {
      timerCountdown.textContent = `⏱ ${remainingSec}s`;
      if (isUrgent) {
        timerCountdown.classList.add('pulse-text');
      } else {
        timerCountdown.classList.remove('pulse-text');
      }
    }

    if (timerFill) {
      timerFill.style.width = `${progressPercent}%`;
      if (isUrgent) {
        timerFill.classList.add('urgent-fill');
      } else {
        timerFill.classList.remove('urgent-fill');
      }
    }

    if (timerContainer) {
      if (isUrgent) {
        timerContainer.classList.add('urgent');
      } else {
        timerContainer.classList.remove('urgent');
      }
    }
  }
}
