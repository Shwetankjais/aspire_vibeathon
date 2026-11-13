import { scenarios } from '../content/scenarios.js';

const ROUND_DURATION_MS = 20000; // 20 seconds standard duration

export class GameStore {
  constructor() {
    this.subscribers = new Set();
    this.timerInterval = null;
    this.reset();
  }

  reset() {
    this.timer = {
      deadline: null,
      remainingMs: ROUND_DURATION_MS,
      totalDurationMs: ROUND_DURATION_MS
    };
    this.clearTimer();
    this.mode = 'NORMAL'; // 'NORMAL' | 'CALM'
    this.stage = 'HOME'; // 'HOME' | 'BRIEFING' | 'QUESTION' | 'FEEDBACK' | 'RESULTS'
    this.scenariosQueue = [...scenarios];
    this.currentIndex = 0;
    this.isPractice = false;
    this.answered = false;
    this.outcomes = []; // { scenarioId, userChoiceId, isCorrect, isTimeout, modeAtAnswer, timeSpent }
    this.practiceOutcomes = [];
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    for (const callback of this.subscribers) {
      try {
        callback(this.getState());
      } catch (err) {
        console.error('Subscriber notification error:', err);
      }
    }
  }

  getState() {
    const queue = this.isPractice ? this.scenariosQueue : scenarios;
    const currentScenario = this.scenariosQueue[this.currentIndex] || null;
    const activeOutcomes = this.isPractice ? this.practiceOutcomes : this.outcomes;
    const score = this.outcomes.filter(o => o.isCorrect).length;
    const practiceScore = this.practiceOutcomes.filter(o => o.isCorrect).length;

    return {
      mode: this.mode,
      isCalmMode: this.mode === 'CALM',
      stage: this.stage,
      currentIndex: this.currentIndex,
      currentRound: this.currentIndex + 1,
      totalRounds: this.scenariosQueue.length,
      currentScenario,
      isPractice: this.isPractice,
      answered: this.answered,
      outcomes: [...this.outcomes],
      practiceOutcomes: [...this.practiceOutcomes],
      currentOutcome: activeOutcomes[this.currentIndex] || null,
      score,
      totalPossible: scenarios.length,
      practiceScore,
      missedScenarios: this.getMissedScenarios(),
      timer: {
        remainingMs: this.timer.remainingMs,
        remainingSec: Math.max(0, Math.ceil(this.timer.remainingMs / 1000)),
        progressPercent: Math.max(0, Math.min(100, (this.timer.remainingMs / this.timer.totalDurationMs) * 100)),
        isActive: this.mode === 'NORMAL' && this.stage === 'QUESTION' && !this.answered
      }
    };
  }

  getMissedScenarios() {
    const missedIds = new Set(
      this.outcomes.filter(o => !o.isCorrect).map(o => o.scenarioId)
    );
    return scenarios.filter(s => missedIds.has(s.id));
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.timer.deadline = null;
  }

  startRun({ calmMode = null } = {}) {
    this.clearTimer();
    if (calmMode !== null) {
      this.mode = calmMode ? 'CALM' : 'NORMAL';
    }
    this.stage = 'BRIEFING';
    this.scenariosQueue = [...scenarios];
    this.currentIndex = 0;
    this.isPractice = false;
    this.answered = false;
    this.outcomes = [];
    this.practiceOutcomes = [];
    this.notify();
  }

  startRound() {
    this.stage = 'QUESTION';
    this.answered = false;

    if (this.mode === 'NORMAL') {
      this.startCountdown(ROUND_DURATION_MS);
    } else {
      this.clearTimer();
      this.timer.remainingMs = ROUND_DURATION_MS;
    }
    this.notify();
  }

  startCountdown(durationMs) {
    this.clearTimer();
    this.timer.totalDurationMs = durationMs;
    this.timer.remainingMs = durationMs;
    this.timer.deadline = Date.now() + durationMs;

    this.timerInterval = setInterval(() => {
      const remaining = Math.max(0, this.timer.deadline - Date.now());
      this.timer.remainingMs = remaining;

      if (remaining <= 0) {
        this.clearTimer();
        this.handleTimeout();
      } else {
        this.notify();
      }
    }, 100);
  }

  toggleCalmMode() {
    const nextMode = this.mode === 'NORMAL' ? 'CALM' : 'NORMAL';
    this.mode = nextMode;

    if (this.stage === 'QUESTION' && !this.answered) {
      if (nextMode === 'CALM') {
        // Cancel timeout, suppress countdown
        this.clearTimer();
        this.timer.remainingMs = ROUND_DURATION_MS;
      } else {
        // Toggled back to Normal mid-question: restart fresh full timer
        this.startCountdown(ROUND_DURATION_MS);
      }
    }
    this.notify();
  }

  submitAnswer(choiceId) {
    if (this.answered || this.stage !== 'QUESTION') {
      return; // Single scoring guarantee
    }

    this.answered = true;
    const timeSpent = this.mode === 'NORMAL' && this.timer.deadline
      ? Math.max(0, this.timer.totalDurationMs - (this.timer.deadline - Date.now()))
      : 0;

    this.clearTimer();

    const currentScenario = this.scenariosQueue[this.currentIndex];
    const isCorrect = currentScenario ? choiceId === currentScenario.correctChoiceId : false;

    const outcome = {
      scenarioId: currentScenario.id,
      userChoiceId: choiceId,
      isCorrect,
      isTimeout: false,
      modeAtAnswer: this.mode,
      timeSpent
    };

    if (this.isPractice) {
      this.practiceOutcomes.push(outcome);
    } else {
      this.outcomes.push(outcome);
    }

    this.stage = 'FEEDBACK';
    this.notify();
  }

  handleTimeout() {
    if (this.answered || this.stage !== 'QUESTION') {
      return;
    }

    this.answered = true;
    this.clearTimer();
    const currentScenario = this.scenariosQueue[this.currentIndex];

    const outcome = {
      scenarioId: currentScenario.id,
      userChoiceId: null,
      isCorrect: false,
      isTimeout: true,
      modeAtAnswer: this.mode,
      timeSpent: ROUND_DURATION_MS
    };

    if (this.isPractice) {
      this.practiceOutcomes.push(outcome);
    } else {
      this.outcomes.push(outcome);
    }

    this.stage = 'FEEDBACK';
    this.notify();
  }

  nextRound() {
    this.clearTimer();
    if (this.currentIndex + 1 < this.scenariosQueue.length) {
      this.currentIndex += 1;
      this.startRound();
    } else {
      this.stage = 'RESULTS';
      this.notify();
    }
  }

  startPractice() {
    const missed = this.getMissedScenarios();
    if (missed.length === 0) return;

    this.clearTimer();
    this.isPractice = true;
    this.scenariosQueue = [...missed];
    this.currentIndex = 0;
    this.answered = false;
    this.practiceOutcomes = [];
    this.startRound();
  }
}

export const gameStore = new GameStore();
