import { rapidScenarios, mountChallenge } from '../src/features/game/challenges/rapid/index.js';

console.log('Testing Rapid Pick scenarios contract...');

if (!Array.isArray(rapidScenarios) || rapidScenarios.length !== 2) {
  console.error(`FAIL: Expected rapidScenarios array with 2 items, got ${rapidScenarios?.length}`);
  process.exit(1);
}

const expectedHazards = ['fire', 'flood'];
rapidScenarios.forEach((sc, idx) => {
  if (sc.format !== 'rapid') {
    console.error(`FAIL: Scenario ${sc.id} format must be 'rapid', got ${sc.format}`);
    process.exit(1);
  }

  if (sc.hazard !== expectedHazards[idx]) {
    console.error(`FAIL: Scenario ${sc.id} hazard must be ${expectedHazards[idx]}, got ${sc.hazard}`);
    process.exit(1);
  }

  if (!Array.isArray(sc.choices) || sc.choices.length !== 3) {
    console.error(`FAIL: Scenario ${sc.id} must have exactly 3 choices`);
    process.exit(1);
  }

  const choiceIds = new Set(sc.choices.map(c => c.id));
  if (choiceIds.size !== 3) {
    console.error(`FAIL: Scenario ${sc.id} has duplicate choice IDs`);
    process.exit(1);
  }

  if (!choiceIds.has(sc.correctChoiceId)) {
    console.error(`FAIL: Scenario ${sc.id} correctChoiceId '${sc.correctChoiceId}' not in choices`);
    process.exit(1);
  }

  if (!sc.prompt || !sc.calmPrompt || !sc.takeaway || !sc.sourceUrl) {
    console.error(`FAIL: Scenario ${sc.id} missing required text fields`);
    process.exit(1);
  }
});

console.log('✓ rapidScenarios contract verified successfully!');

console.log('Testing mountChallenge interface...');
if (typeof mountChallenge !== 'function') {
  console.error('FAIL: mountChallenge is not a function');
  process.exit(1);
}

console.log('✓ All Rapid Pick unit checks passed successfully!');
