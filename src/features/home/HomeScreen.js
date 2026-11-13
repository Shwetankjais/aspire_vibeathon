import { ILLUSTRATIONS } from '../../assets/illustrations.js';

export class HomeScreen {
  constructor({ onPlay, onHowToPlay }) {
    this.onPlay = onPlay;
    this.onHowToPlay = onHowToPlay;
  }

  render(container) {
    container.innerHTML = `
      <div class="home-wrapper">
        <!-- Top Navigation -->
        <header class="home-nav">
          <div class="brand">
            <span class="brand-pill">⚡ DISASTER DASH</span>
            <span class="brand-sub">Sundarpur Village Defense</span>
          </div>
          <div class="nav-actions">
            <button type="button" class="btn btn-ghost" id="navHowToPlay">
              📖 How to play
            </button>
            <button type="button" class="btn btn-primary btn-sm" id="navPlayTop">
              Play Disaster Dash →
            </button>
          </div>
        </header>

        <!-- Hero Section -->
        <main class="home-hero">
          <div class="hero-content">
            <div class="hero-tag">VIBESPRINT PROBLEM CARD 08 · CALM MODE UNLOCKED</div>
            <h1 class="hero-title">
              DISASTER <span class="highlight-underline">DASH</span>
            </h1>
            <p class="hero-promise">
              Make the call. Keep your village safe.
            </p>
            <p class="hero-desc">
              When disaster strikes the fictional village of Sundarpur, seconds count. Guide students and villagers through earthquake, flash flood, and house fire scenarios. Test your instincts under a 20-second timer, or switch to <strong>Calm Mode</strong> for a peaceful, untimed experience.
            </p>

            <div class="hero-actions">
              <button type="button" class="btn btn-hero" id="heroPlayBtn" autofocus>
                Play Disaster Dash ➔
              </button>
              <button type="button" class="btn btn-secondary" id="heroTourBtn">
                Take the 20-sec Tour
              </button>
            </div>

            <!-- Simulation Disclaimer -->
            <div class="sim-banner">
              <span class="sim-badge">NOTICE</span>
              <span class="sim-text">Educational simulation, not live emergency advice. In a real emergency, call local emergency services immediately.</span>
            </div>
          </div>

          <!-- Hero Graphic -->
          <div class="hero-graphic-card">
            <div class="hero-scene-container">
              ${ILLUSTRATIONS.sundarpurVillage}
              <div class="devil-float">
                ${ILLUSTRATIONS.disasterDevil}
                <div class="devil-speech-bubble">“Sundarpur will fall to my 3 disasters!”</div>
              </div>
            </div>
          </div>
        </main>

        <!-- Feature Cards Grid -->
        <section class="features-section">
          <div class="section-header">
            <h2 class="section-title">Three Real Hazards. One Village to Protect.</h2>
            <p class="section-subtitle">Every scenario is grounded in official FEMA, CERT, and US Fire Administration guidelines.</p>
          </div>

          <div class="hazard-cards-grid">
            <!-- Earthquake Card -->
            <div class="hazard-card card-earthquake">
              <div class="card-badge">ROUND 1 · SCHOOL</div>
              <h3>Earthquake Tremors</h3>
              <p>Desks rattle and ceiling fixtures swing in the second-floor classroom. Do you run, stand in a doorway, or drop and cover?</p>
              <div class="card-footer">
                <span class="hazard-color-chip plum">Plum & Amber</span>
                <span class="source-tag">FEMA Ready.gov</span>
              </div>
            </div>

            <!-- Flood Card -->
            <div class="hazard-card card-flood">
              <div class="card-badge">ROUND 2 · RIVER ROAD</div>
              <h3>Flash Flood Surge</h3>
              <p>Brown water sweeps across the low-lying crossing. Can you wade through 6 inches or ride across before the bridge is swallowed?</p>
              <div class="card-footer">
                <span class="hazard-color-chip teal">Deep Teal & Aqua</span>
                <span class="source-tag">CERT & NOAA NWS</span>
              </div>
            </div>

            <!-- Fire Card -->
            <div class="hazard-card card-fire">
              <div class="card-badge">ROUND 3 · HOME</div>
              <h3>Corridor House Fire</h3>
              <p>Smoke detector alarms in the night. Toxic gases bank down from the ceiling. How do you check doors and escape safely?</p>
              <div class="card-footer">
                <span class="hazard-color-chip burgundy">Burgundy & Ember</span>
                <span class="source-tag">USFA Escape Plan</span>
              </div>
            </div>
          </div>
        </section>

        <!-- The Calm Mode Twist Showcase -->
        <section class="twist-section">
          <div class="twist-card">
            <div class="twist-tag">THE EVENT TWIST REVEALED</div>
            <h2>Calm Mode: Accessible, Untimed Gameplay</h2>
            <p>
              Emergency drills shouldn’t trigger panic. Switch to Calm Mode at any moment — even mid-countdown — to freeze the clock, cancel timeouts, soften visuals, and read bite-sized safety copy. The exact same scoring and lessons, zero pressure.
            </p>
            <div class="twist-features">
              <div class="twist-pill">✓ No countdown timer</div>
              <div class="twist-pill">✓ Mid-round timeout cancellation</div>
              <div class="twist-pill">✓ Low-stimulation neutral styling</div>
              <div class="twist-pill">✓ Shortened accessible copy</div>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="home-footer">
          <div class="footer-left">
            <span>Disaster Dash © 2026 · VibeSprint Problem Card 08</span>
          </div>
          <div class="footer-right">
            <span>Offline browser-first prototype · Zero API keys required</span>
          </div>
        </footer>
      </div>
    `;

    // Event listeners
    container.querySelector('#heroPlayBtn')?.addEventListener('click', () => this.onPlay());
    container.querySelector('#navPlayTop')?.addEventListener('click', () => this.onPlay());
    container.querySelector('#heroTourBtn')?.addEventListener('click', () => this.onHowToPlay());
    container.querySelector('#navHowToPlay')?.addEventListener('click', () => this.onHowToPlay());
  }
}
