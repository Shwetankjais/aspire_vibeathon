import { gameStore } from '../features/game/engine/gameStore.js';
import { HomeScreen } from '../features/home/HomeScreen.js';
import { TourModal } from '../features/onboarding/TourModal.js';
import { BriefingScreen } from '../features/game/screens/BriefingScreen.js';
import { QuestionScreen } from '../features/game/screens/QuestionScreen.js';
import { FeedbackScreen } from '../features/game/screens/FeedbackScreen.js';
import { ResultsScreen } from '../features/game/screens/ResultsScreen.js';
import { Router } from './router.js';

class App {
  constructor() {
    this.appRoot = document.getElementById('app');
    this.activeQuestionScreen = null;

    // Initialize Tour
    this.tourModal = new TourModal({
      onComplete: () => {
        // Return focus to primary CTA if on home
        const heroPlayBtn = document.getElementById('heroPlayBtn');
        if (heroPlayBtn) heroPlayBtn.focus();
      }
    });

    // Initialize Screens
    this.homeScreen = new HomeScreen({
      onPlay: () => this.startGame(),
      onHowToPlay: () => this.tourModal.open(true)
    });

    this.briefingScreen = new BriefingScreen({
      store: gameStore,
      onStartRound: () => gameStore.startRound(),
      onHome: () => this.exitToHome()
    });

    this.questionScreen = new QuestionScreen({
      store: gameStore,
      onSubmitAnswer: (choiceId) => gameStore.submitAnswer(choiceId),
      onHome: () => this.exitToHome()
    });

    this.feedbackScreen = new FeedbackScreen({
      store: gameStore,
      onNextRound: () => gameStore.nextRound(),
      onHome: () => this.exitToHome()
    });

    this.resultsScreen = new ResultsScreen({
      store: gameStore,
      onPlayAgain: () => this.startGame(),
      onPracticeMissed: () => gameStore.startPractice(),
      onHome: () => this.exitToHome()
    });

    // Subscribe to store updates
    this.lastRenderedStage = null;
    gameStore.subscribe((state) => this.handleStoreUpdate(state));

    // Initialize Router
    this.router = new Router({
      '#/': () => this.renderHome(),
      '#/play': () => this.renderPlay()
    });
  }

  start() {
    this.router.start();
  }

  exitToHome() {
    if (this.activeQuestionScreen) {
      this.activeQuestionScreen.unmount();
      this.activeQuestionScreen = null;
    }
    gameStore.reset();
    this.lastRenderedStage = null;
    this.router.navigate('#/');
  }

  startGame() {
    gameStore.startRun();
    this.router.navigate('#/play');
  }

  renderHome() {
    if (this.activeQuestionScreen) {
      this.activeQuestionScreen.unmount();
      this.activeQuestionScreen = null;
    }
    this.lastRenderedStage = 'HOME';
    this.homeScreen.render(this.appRoot);

    // Auto-launch tour if not previously dismissed
    setTimeout(() => {
      if (window.location.hash === '#/' || window.location.hash === '') {
        this.tourModal.open(false);
      }
    }, 400);
  }

  renderPlay() {
    const state = gameStore.getState();
    if (state.stage === 'HOME') {
      // If refreshed on #/play route, start fresh at briefing
      gameStore.startRun();
      return;
    }

    this.renderGameState(state);
  }

  handleStoreUpdate(state) {
    if (this.router.currentRoute !== '#/play') return;

    if (this.lastRenderedStage !== state.stage || state.currentIndex !== this.lastIndex) {
      this.lastRenderedStage = state.stage;
      this.lastIndex = state.currentIndex;
      this.renderGameState(state);
    } else if (state.stage === 'QUESTION' && this.activeQuestionScreen) {
      // Update timer smoothly without re-rendering whole question card
      this.activeQuestionScreen.updateTimer();
    }
  }

  renderGameState(state) {
    if (this.activeQuestionScreen && state.stage !== 'QUESTION') {
      this.activeQuestionScreen.unmount();
      this.activeQuestionScreen = null;
    }

    switch (state.stage) {
      case 'BRIEFING':
        this.briefingScreen.render(this.appRoot);
        break;

      case 'QUESTION':
        this.activeQuestionScreen = this.questionScreen;
        this.questionScreen.mount(this.appRoot);
        break;

      case 'FEEDBACK':
        this.feedbackScreen.render(this.appRoot);
        break;

      case 'RESULTS':
        this.resultsScreen.render(this.appRoot);
        break;

      default:
        this.renderHome();
        break;
    }
  }
}

// Bootstrap application on DOM load
window.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.start();
});
