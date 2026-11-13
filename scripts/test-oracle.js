import { oracleJourney } from '../src/features/game/content/oracle-dialogue.js';
import { scenarios } from '../src/features/game/content/scenarios.js';

console.log("Testing Oracle's Journey dialogue contract...");

if (!oracleJourney || typeof oracleJourney !== 'object') {
  console.error('FAIL: oracleJourney is not exported as an object');
  process.exit(1);
}

if (!oracleJourney.welcome || typeof oracleJourney.welcome !== 'string') {
  console.error('FAIL: oracleJourney.welcome must be a non-empty string');
  process.exit(1);
}

if (!oracleJourney.closing || typeof oracleJourney.closing !== 'string') {
  console.error('FAIL: oracleJourney.closing must be a non-empty string');
  process.exit(1);
}

if (!oracleJourney.byScenarioId || typeof oracleJourney.byScenarioId !== 'object') {
  console.error('FAIL: oracleJourney.byScenarioId must be an object');
  process.exit(1);
}

// Verify that all classic scenarios have matching dialogue entries
scenarios.forEach(sc => {
  const entry = oracleJourney.byScenarioId[sc.id];
  if (!entry) {
    console.error(`FAIL: Missing oracleJourney dialogue for classic scenario id '${sc.id}'`);
    process.exit(1);
  }

  if (!entry.intro || typeof entry.intro !== 'string') {
    console.error(`FAIL: Missing or invalid intro for scenario '${sc.id}'`);
    process.exit(1);
  }

  if (!entry.correct || typeof entry.correct !== 'string') {
    console.error(`FAIL: Missing or invalid correct response for scenario '${sc.id}'`);
    process.exit(1);
  }

  if (!entry.incorrect || typeof entry.incorrect !== 'string') {
    console.error(`FAIL: Missing or invalid incorrect response for scenario '${sc.id}'`);
    process.exit(1);
  }
});

console.log("✓ All classic scenario IDs (school-earthquake, river-flood, home-fire) resolved in oracleJourney!");
console.log("✓ Welcome, closing, intro, correct, and incorrect dialogue fields validated.");
