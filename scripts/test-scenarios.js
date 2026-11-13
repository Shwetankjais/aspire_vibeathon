import { scenarios } from '../src/features/game/content/scenarios.js';

console.log('Testing scenarios.js contract...');

if (!Array.isArray(scenarios)) {
  console.error('FAIL: scenarios is not an array');
  process.exit(1);
}

if (scenarios.length !== 3) {
  console.error(`FAIL: expected 3 scenarios, found ${scenarios.length}`);
  process.exit(1);
}

const expectedHazards = ['earthquake', 'flood', 'fire'];
const ids = new Set();

scenarios.forEach((sc, idx) => {
  if (ids.has(sc.id)) {
    console.error(`FAIL: duplicate scenario id "${sc.id}"`);
    process.exit(1);
  }
  ids.add(sc.id);

  if (sc.hazard !== expectedHazards[idx]) {
    console.error(`FAIL: scenario ${idx} hazard "${sc.hazard}" != expected "${expectedHazards[idx]}"`);
    process.exit(1);
  }

  if (!sc.location || typeof sc.location !== 'string') {
    console.error(`FAIL: invalid location in scenario ${sc.id}`);
    process.exit(1);
  }

  if (!sc.title || typeof sc.title !== 'string') {
    console.error(`FAIL: invalid title in scenario ${sc.id}`);
    process.exit(1);
  }

  if (!sc.prompt || typeof sc.prompt !== 'string') {
    console.error(`FAIL: invalid prompt in scenario ${sc.id}`);
    process.exit(1);
  }

  if (!sc.calmPrompt || typeof sc.calmPrompt !== 'string') {
    console.error(`FAIL: invalid calmPrompt in scenario ${sc.id}`);
    process.exit(1);
  }

  if (!Array.isArray(sc.choices) || sc.choices.length !== 3) {
    console.error(`FAIL: scenario ${sc.id} must have exactly 3 choices`);
    process.exit(1);
  }

  const choiceIds = new Set();
  sc.choices.forEach(c => {
    if (!c.id || choiceIds.has(c.id)) {
      console.error(`FAIL: invalid or duplicate choice id "${c.id}" in scenario ${sc.id}`);
      process.exit(1);
    }
    choiceIds.add(c.id);

    if (!c.label || typeof c.label !== 'string') {
      console.error(`FAIL: choice "${c.id}" missing label in scenario ${sc.id}`);
      process.exit(1);
    }

    if (!c.explanation || typeof c.explanation !== 'string') {
      console.error(`FAIL: choice "${c.id}" missing explanation in scenario ${sc.id}`);
      process.exit(1);
    }
  });

  if (!choiceIds.has(sc.correctChoiceId)) {
    console.error(`FAIL: correctChoiceId "${sc.correctChoiceId}" not in choices for scenario ${sc.id}`);
    process.exit(1);
  }

  if (!sc.takeaway || typeof sc.takeaway !== 'string') {
    console.error(`FAIL: missing takeaway in scenario ${sc.id}`);
    process.exit(1);
  }

  if (!sc.sourceUrl || !sc.sourceUrl.startsWith('http')) {
    console.error(`FAIL: invalid sourceUrl in scenario ${sc.id}`);
    process.exit(1);
  }
});

console.log('✓ All 3 scenarios verified successfully against contract schema!');
