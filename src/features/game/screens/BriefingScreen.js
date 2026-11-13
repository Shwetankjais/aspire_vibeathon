import { ILLUSTRATIONS } from '../../../assets/illustrations.js';

export class BriefingScreen {
  constructor({ store, onStartRound, onHome }) {
    this.store = store;
    this.onStartRound = onStartRound;
    this.onHome = onHome;
  }

  render(container) {
    const state = this.store.getState();
    const isCalm = state.isCalmMode;

    container.innerHTML = `
      <div class="game-screen-wrapper ${isCalm ? 'calm-theme' : ''}">
        <!-- Game Header -->
        <header class="game-header">
          <div class="header-left">
            <button type="button" class="btn btn-ghost btn-sm" id="briefingBackHome">
              ← Return Home
            </button>
            <span class="game-brand-pill">⚡ SUNDARPUR DEFENSE</span>
          </div>

          <div class="header-right">
            <!-- Calm Mode Toggle -->
            <div class="calm-toggle-container">
              <label class="calm-switch" for="calmToggleBriefing">
                <input type="checkbox" id="calmToggleBriefing" ${isCalm ? 'checked' : ''} aria-label="Toggle Calm Mode">
                <span class="slider round"></span>
              </label>
              <span class="calm-label">
                ${isCalm ? '<strong>Calm Mode: ON</strong>' : 'Calm Mode: OFF'}
              </span>
            </div>
          </div>
        </header>

        <!-- Briefing Body -->
        <main class="briefing-card">
          <div class="briefing-banner">
            <span class="briefing-tag">MISSION BRIEFING</span>
            <h1 class="briefing-title">The Disaster Devil Threatens Sundarpur</h1>
          </div>

          <div class="briefing-grid">
            <div class="briefing-visual">
              ${ILLUSTRATIONS.disasterDevil}
              <div class="devil-subtext">The shape-shifting menace strikes in 3 waves</div>
            </div>

            <div class="briefing-text-col">
              <p class="lead-text">
                You are a village resident in <strong>Sundarpur</strong>. The Disaster Devil is attacking across three vital community hubs:
              </p>
              
              <ul class="briefing-hazards-list">
                <li>
                  <span class="hazard-badge-inline eq">1. Village School</span>
                  <span>Sudden earthquake shaking during morning class.</span>
                </li>
                <li>
                  <span class="hazard-badge-inline fl">2. River Crossing Road</span>
                  <span>Flash flood surging across the main access route.</span>
                </li>
                <li>
                  <span class="hazard-badge-inline fr">3. Village Home</span>
                  <span>Late-night smoke alarm with dark smoke in the hallway.</span>
                </li>
              </ul>

              <div class="briefing-rules">
                <div class="rule-item">
                  <strong>Normal Mode:</strong> 20 seconds per decision. Stay alert and act quickly.
                </div>
                <div class="rule-item">
                  <strong>Calm Mode:</strong> Untimed, reduced stimulation, and concise reading. Toggle anytime.
                </div>
              </div>
            </div>
          </div>

          <!-- Simulation Note -->
          <div class="sim-banner">
            <span class="sim-badge">NOTICE</span>
            <span class="sim-text">Educational simulation, not live emergency advice. In a real disaster, call emergency services and follow local authorities.</span>
          </div>

          <!-- Start Action -->
          <div class="briefing-actions">
            <button type="button" class="btn btn-hero" id="startRoundBtn" autofocus>
              Start Round 1: Village School ➔
            </button>
          </div>
        </main>
      </div>
    `;

    // Event listeners
    container.querySelector('#briefingBackHome')?.addEventListener('click', () => this.onHome());
    container.querySelector('#startRoundBtn')?.addEventListener('click', () => this.onStartRound());
    container.querySelector('#calmToggleBriefing')?.addEventListener('change', () => {
      this.store.toggleCalmMode();
      this.render(container);
    });
  }
}
