import { ILLUSTRATIONS } from '../../../assets/illustrations.js';
import { scenarios } from '../content/scenarios.js';

export class ResultsScreen {
  constructor({ store, onPlayAgain, onPracticeMissed, onHome }) {
    this.store = store;
    this.onPlayAgain = onPlayAgain;
    this.onPracticeMissed = onPracticeMissed;
    this.onHome = onHome;
  }

  render(container) {
    const state = this.store.getState();
    const score = state.score;
    const total = state.totalPossible;
    const isPerfect = score === total;
    const missedScenarios = state.missedScenarios;
    const isPracticeRun = state.isPractice;

    // Map outcomes to locations
    const locationStatus = scenarios.map(sc => {
      const outcome = state.outcomes.find(o => o.scenarioId === sc.id);
      const isSecured = outcome ? outcome.isCorrect : false;
      const wasTimeout = outcome ? outcome.isTimeout : false;
      return {
        scenario: sc,
        isSecured,
        wasTimeout
      };
    });

    container.innerHTML = `
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
            <span class="mode-tag">${state.isCalmMode ? 'Calm Mode Run' : 'Timed Mode Run'}</span>
          </div>
        </header>

        <!-- Main Debrief Card -->
        <main class="results-card">
          <!-- Top Celebration / Village Scene -->
          <div class="results-hero-scene">
            ${isPerfect ? ILLUSTRATIONS.villageSaved : ILLUSTRATIONS.sundarpurVillage}
          </div>

          <!-- Score Banner -->
          <div class="score-banner ${isPerfect ? 'perfect' : ''}">
            <div class="score-num-box">
              <span class="score-big">${score}</span>
              <span class="score-divider">/</span>
              <span class="score-total">${total}</span>
            </div>
            <div class="score-copy">
              <h1 class="score-title">
                ${isPerfect 
                  ? '🌟 Outstanding! Sundarpur is Safe!' 
                  : (score >= 1 ? 'Village Defended with Vulnerabilities' : 'Severe Breaches Across the Village')
                }
              </h1>
              <p class="score-subtitle">
                ${isPerfect
                  ? 'You made all 3 safe calls. The Disaster Devil was repelled and all 3 hubs held strong!'
                  : `You secured ${score} out of ${total} locations. Review the lessons below to protect every resident.`
                }
              </p>
            </div>
          </div>

          <!-- Locations Status Grid -->
          <section class="locations-section">
            <h2 class="sub-heading">Village Hub Status</h2>
            <div class="locations-grid">
              ${locationStatus.map(loc => `
                <div class="location-card ${loc.isSecured ? 'secured' : 'breached'}">
                  <div class="loc-status-icon">
                    ${loc.isSecured ? '🛡️ SECURE' : (loc.wasTimeout ? '⏱️ TIMEOUT' : '⚠️ BREACHED')}
                  </div>
                  <h3>${loc.scenario.location}</h3>
                  <div class="loc-hazard-tag">${loc.scenario.hazard.toUpperCase()}</div>
                  <p class="loc-takeaway">${loc.scenario.takeaway}</p>
                </div>
              `).join('')}
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
            ${missedScenarios.length > 0 ? `
              <button type="button" class="btn btn-secondary" id="practiceMissedBtn">
                🔄 Practice Missed Rounds (${missedScenarios.length})
              </button>
            ` : ''}

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
    `;

    // Event listeners
    container.querySelector('#resultsHomeBtn')?.addEventListener('click', () => this.onHome());
    container.querySelector('#backToHomeBtn')?.addEventListener('click', () => this.onHome());
    container.querySelector('#playAgainBtn')?.addEventListener('click', () => this.onPlayAgain());
    container.querySelector('#practiceMissedBtn')?.addEventListener('click', () => this.onPracticeMissed());
  }
}
