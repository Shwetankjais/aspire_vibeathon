/**
 * 3-Step Spotlight Onboarding Tour Modal
 */

const TOUR_STORAGE_KEY = 'disaster_dash_tour_dismissed';

export class TourModal {
  constructor({ onComplete }) {
    this.onComplete = onComplete;
    this.currentStep = 0;
    this.isOpen = false;
    this.container = null;
    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.steps = [
      {
        title: "1. The Threat to Sundarpur",
        subtitle: "The Disaster Devil is shapeshifting across the village",
        content: `
          <p>The peaceful fictional village of <strong>Sundarpur</strong> is suddenly under threat. The mythical <strong>Disaster Devil</strong> strikes three vulnerable locations in rapid succession: the School, the River Crossing, and a Village Home.</p>
          <div class="tour-sample-badge">Village Alert: School • River • Home</div>
        `,
        sampleUi: `
          <div class="tour-preview-card">
            <span class="preview-tag">Scenario Preview</span>
            <h4>Village School: Classroom Tremors</h4>
            <p>Ground shaking hits. Desks rattle. What is your immediate call?</p>
          </div>
        `
      },
      {
        title: "2. Fast Calls or Calm Mode",
        subtitle: "20 seconds to decide — or play untimed",
        content: `
          <p>In <strong>Normal Mode</strong>, each crisis gives you a <strong>20-second countdown</strong> to evaluate safety and make your choice under pressure.</p>
          <p><strong>The Calm Mode Twist:</strong> Need low stimulation or zero pressure? Flip the <em>Calm Mode</em> switch at any time — even mid-countdown — to stop the timer, cancel timeouts, and read simplified prompts.</p>
        `,
        sampleUi: `
          <div class="tour-preview-toggle">
            <div class="toggle-pill active">
              <span class="toggle-dot"></span>
              <span class="toggle-text">Calm Mode ON: Untimed & Low Stimulation</span>
            </div>
          </div>
        `
      },
      {
        title: "3. Clear Feedback & Real Safety",
        subtitle: "Understand why safe actions save lives",
        content: `
          <p>Every answer — correct, incorrect, or timeout — is followed by an <strong>instant safety explanation</strong> grounded in FEMA, CERT, and US Fire Administration guidelines.</p>
          <p>Complete all three rounds to earn your village security report, review life-saving takeaways, and practice any missed situations.</p>
        `,
        sampleUi: `
          <div class="tour-preview-feedback">
            <div class="feedback-badge success">✓ Safe Choice Explained</div>
            <p>Dropping down shields your vital organs and prevents you from being thrown off balance.</p>
          </div>
        `
      }
    ];
  }

  isDismissed() {
    return sessionStorage.getItem(TOUR_STORAGE_KEY) === 'true';
  }

  markDismissed() {
    sessionStorage.setItem(TOUR_STORAGE_KEY, 'true');
  }

  open(force = false) {
    if (!force && this.isDismissed()) {
      return;
    }
    this.isOpen = true;
    this.currentStep = 0;
    this.render();
    document.addEventListener('keydown', this.handleKeyDown);
  }

  close() {
    this.isOpen = false;
    this.markDismissed();
    document.removeEventListener('keydown', this.handleKeyDown);
    if (this.container) {
      this.container.remove();
      this.container = null;
    }
    if (this.onComplete) {
      this.onComplete();
    }
  }

  handleKeyDown(e) {
    if (!this.isOpen) return;
    if (e.key === 'Escape') {
      this.close();
    } else if (e.key === 'ArrowRight' && this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.render();
    } else if (e.key === 'ArrowLeft' && this.currentStep > 0) {
      this.currentStep--;
      this.render();
    }
  }

  render() {
    if (!this.isOpen) return;

    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'tour-backdrop';
      this.container.setAttribute('role', 'dialog');
      this.container.setAttribute('aria-modal', 'true');
      this.container.setAttribute('aria-label', 'How to Play Disaster Dash Tour');
      document.body.appendChild(this.container);
    }

    const step = this.steps[this.currentStep];
    const isFirst = this.currentStep === 0;
    const isLast = this.currentStep === this.steps.length - 1;

    this.container.innerHTML = `
      <div class="tour-modal">
        <div class="tour-header">
          <div class="tour-indicators">
            ${this.steps.map((_, i) => `
              <span class="tour-dot ${i === this.currentStep ? 'active' : ''} ${i < this.currentStep ? 'completed' : ''}"></span>
            `).join('')}
          </div>
          <button type="button" class="tour-close-btn" id="tourSkipBtn" aria-label="Skip tour">✕</button>
        </div>

        <div class="tour-body">
          <div class="tour-step-tag">Step ${this.currentStep + 1} of ${this.steps.length}</div>
          <h2 class="tour-title">${step.title}</h2>
          <h3 class="tour-subtitle">${step.subtitle}</h3>
          
          <div class="tour-text">
            ${step.content}
          </div>

          <div class="tour-sample-container">
            ${step.sampleUi}
          </div>
        </div>

        <div class="tour-footer">
          <div class="tour-left-actions">
            ${!isFirst ? `<button type="button" class="btn btn-secondary btn-sm" id="tourBackBtn">← Back</button>` : ''}
            <button type="button" class="btn btn-ghost btn-sm" id="tourSkipTextBtn">Skip tour</button>
          </div>
          <div class="tour-right-actions">
            ${isLast
              ? `<button type="button" class="btn btn-primary" id="tourFinishBtn">Finish & Start Game</button>`
              : `<button type="button" class="btn btn-primary" id="tourNextBtn">Next step →</button>`
            }
          </div>
        </div>
      </div>
    `;

    // Attach event listeners
    this.container.querySelector('#tourSkipBtn')?.addEventListener('click', () => this.close());
    this.container.querySelector('#tourSkipTextBtn')?.addEventListener('click', () => this.close());
    this.container.querySelector('#tourBackBtn')?.addEventListener('click', () => {
      if (this.currentStep > 0) {
        this.currentStep--;
        this.render();
      }
    });
    this.container.querySelector('#tourNextBtn')?.addEventListener('click', () => {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
        this.render();
      }
    });
    this.container.querySelector('#tourFinishBtn')?.addEventListener('click', () => this.close());
  }
}
