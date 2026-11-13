import { GameStore } from '../src/features/game/engine/gameStore.js';
import { scenarios } from '../src/features/game/content/scenarios.js';

console.log('Testing GameStore engine logic...');

// Test 1: Initial state & startRun
const store = new GameStore();
let state = store.getState();
if (state.stage !== 'HOME' || state.score !== 0) {
  console.error('FAIL: Initial state invalid', state);
  process.exit(1);
}

store.startRun();
state = store.getState();
if (state.stage !== 'BRIEFING' || state.totalRounds !== 3) {
  console.error('FAIL: startRun did not transition to BRIEFING', state);
  process.exit(1);
}

// Test 2: Start Round 1 (Normal Mode)
store.startRound();
state = store.getState();
if (state.stage !== 'QUESTION' || state.currentRound !== 1 || !state.timer.isActive) {
  console.error('FAIL: startRound did not activate timer', state);
  process.exit(1);
}

// Test 3: Calm Mode Mid-Countdown cancels timeout
store.toggleCalmMode();
state = store.getState();
if (state.mode !== 'CALM' || !state.isCalmMode || state.timer.isActive) {
  console.error('FAIL: Calm mode toggle did not suppress timer', state);
  process.exit(1);
}

// Test 4: Calm Mode toggled OFF mid-question restarts fresh timer
store.toggleCalmMode();
state = store.getState();
if (state.mode !== 'NORMAL' || !state.timer.isActive || state.timer.remainingSec < 19) {
  console.error('FAIL: Toggling back to Normal did not start fresh timer', state);
  process.exit(1);
}

// Test 5: Single scoring & Answer submission
const correctChoice = state.currentScenario.correctChoiceId;
store.submitAnswer(correctChoice);
state = store.getState();
if (state.stage !== 'FEEDBACK' || state.score !== 1 || !state.answered) {
  console.error('FAIL: Correct answer submission failed', state);
  process.exit(1);
}

// Repeated click should do nothing
store.submitAnswer(correctChoice);
if (store.getState().score !== 1) {
  console.error('FAIL: Double scoring occurred on repeated submission');
  process.exit(1);
}

// Test 6: Advance to Round 2 & Timeout
store.nextRound();
state = store.getState();
if (state.currentRound !== 2 || state.stage !== 'QUESTION') {
  console.error('FAIL: nextRound did not advance to Round 2', state);
  process.exit(1);
}

// Trigger timeout directly
store.handleTimeout();
state = store.getState();
if (state.stage !== 'FEEDBACK' || state.score !== 1 || !state.currentOutcome.isTimeout) {
  console.error('FAIL: Timeout handling failed', state);
  process.exit(1);
}

// Test 7: Round 3 (Incorrect choice)
store.nextRound();
state = store.getState();
const wrongChoice = state.currentScenario.choices.find(c => c.id !== state.currentScenario.correctChoiceId).id;
store.submitAnswer(wrongChoice);
state = store.getState();
if (state.score !== 1 || state.currentOutcome.isCorrect) {
  console.error('FAIL: Incorrect answer incorrectly scored', state);
  process.exit(1);
}

// Test 8: Advance to Results
store.nextRound();
state = store.getState();
if (state.stage !== 'RESULTS' || state.score !== 1 || state.missedScenarios.length !== 2) {
  console.error('FAIL: Final results state invalid', state);
  process.exit(1);
}

// Test 9: Practice Missed Rounds
store.startPractice();
state = store.getState();
if (!state.isPractice || state.totalRounds !== 2 || state.currentRound !== 1) {
  console.error('FAIL: Practice missed rounds queue invalid', state);
  process.exit(1);
}
// Original score remains untouched
if (state.score !== 1) {
  console.error('FAIL: Original score was altered during practice', state);
  process.exit(1);
}

store.clearTimer();
console.log('✓ All GameStore engine logic tests passed successfully!');
