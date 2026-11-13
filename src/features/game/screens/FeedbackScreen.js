import { THEMES } from '../themes/theme.js';

export class FeedbackScreen {
  constructor({ store, onNextRound, onHome }) {
    this.store = store;
    this.onNextRound = onNextRound;
    this.onHome = onHome;
  }

  render(container) {
    const state = this.store.getState();
    const scenario = state.currentScenario;
    if (!scenario) return;

    const outcome = state.currentOutcome;
    const isCalm = state.isCalmMode;
    const theme = THEMES[scenario.hazard] || THEMES.earthquake;
    const isLastRound = state.currentIndex + 1 >= state.totalRounds;

    const isCorrect = outcome ? outcome.isCorrect : false;
    const isTimeout = outcome ? outcome.isTimeout : false;

    const userChoice = outcome && outcome.userChoiceId 
      ? scenario.choices.find(c => c.id === outcome.userChoiceId)
      : null;

    const correctChoice = scenario.choices.find(c => c.id === scenario.correctChoiceId);

    container.innerHTML = `
      <div class="game-screen-wrapper ${isCalm ? 'calm-theme' : `theme-${scenario.hazard}`}">
        <!-- Top Game Bar -->
        <header class="game-header">
          <div class="header-left">
            <button type="button" class="btn btn-ghost btn-sm" id="feedbackBackHome">
              ← Exit Run
            </button>
            <span class="round-tracker-badge">
              Feedback: Round ${state.currentRound} of ${state.totalRounds}
            </span>
            <span class="hazard-badge-pill" style="background: ${theme.badgeBg}; color: ${theme.badgeText};">
              ${theme.name.toUpperCase()}
            </span>
          </div>

          <div class="header-right">
            <!-- Calm Mode Toggle -->
            <div class="calm-toggle-container">
              <label class="calm-switch" for="calmToggleFeedback">
                <input type="checkbox" id="calmToggleFeedback" ${isCalm ? 'checked' : ''} aria-label="Toggle Calm Mode">
                <span class="slider round"></span>
              </label>
              <span class="calm-label">
                ${isCalm ? '<strong>Calm Mode: ON</strong>' : 'Calm Mode: OFF'}
              </span>
            </div>
          </div>
        </header>

        <!-- Main Feedback Card -->
        <main class="feedback-card">
          <!-- Outcome Banner -->
          <div class="outcome-header ${isCorrect ? 'outcome-safe' : 'outcome-danger'}">
            <div class="outcome-icon" aria-hidden="true">
              ${isCorrect ? '🛡️' : (isTimeout ? '⏱️' : '⚠️')}
            </div>
            <div class="outcome-text">
              <h1 class="outcome-title">
                ${isCorrect 
                  ? 'Safe Call! Location Protected' 
                  : (isTimeout ? 'Time Ran Out!' : 'Unsafe Decision!')
                }
              </h1>
              <p class="outcome-subtitle">
                ${isCorrect
                  ? `Your quick thinking secured the ${scenario.location}.`
                  : (isTimeout 
                      ? `Hesitation under emergency conditions leaves you exposed.` 
                      : `This action increased injury risk in the ${scenario.location}.`
                    )
                }
              </p>
            </div>
          </div>

          <!-- Explanations Container -->
          <div class="feedback-explanations">
            <!-- What player chose -->
            ${!isCorrect ? `
              <div class="explanation-box your-choice-box">
                <div class="box-tag danger">WHAT HAPPENED</div>
                ${userChoice ? `
                  <h4>Your Choice: "${userChoice.label}"</h4>
                  <p class="explanation-text">${userChoice.explanation}</p>
                ` : `
                  <h4>No Action Taken in Time</h4>
                  <p class="explanation-text">The 20-second deadline elapsed without a choice. In a sudden hazard, delay increases exposure to falling debris, swift currents, or toxic smoke inhalation.</p>
                `}
              </div>
            ` : ''}

            <!-- The Safest Action (Always Shown) -->
            <div class="explanation-box safest-choice-box">
              <div class="box-tag success">SAFEST EMERGENCY ACTION</div>
              <h4>${correctChoice ? correctChoice.label : 'Recommended Procedure'}</h4>
              <p class="explanation-text">${correctChoice ? correctChoice.explanation : ''}</p>
              
              <div class="takeaway-callout">
                <strong>Key Takeaway:</strong> ${scenario.takeaway}
              </div>

              <div class="source-attribution">
                Source Guidance: <a href="${scenario.sourceUrl}" target="_blank" rel="noopener noreferrer">${scenario.sourceUrl}</a>
              </div>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="feedback-actions">
            <button type="button" class="btn btn-hero" id="nextRoundBtn" autofocus>
              ${isLastRound ? 'See Village Security Debrief ➔' : `Continue to Round ${state.currentRound + 1} ➔`}
            </button>
          </div>

          <!-- Simulation Note -->
          <div class="sim-banner-subtle">
            Educational simulation, not live emergency advice.
          </div>
        </main>
      </div>
    `;

    // Event listeners
    container.querySelector('#feedbackBackHome')?.addEventListener('click', () => this.onHome());
    container.querySelector('#nextRoundBtn')?.addEventListener('click', () => this.onNextRound());
    container.querySelector('#calmToggleFeedback')?.addEventListener('change', () => {
      this.store.toggleCalmMode();
      this.render(container);
    });
  }
}
