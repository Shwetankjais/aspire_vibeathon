import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createGame, ROUND_MS, score } from '../src/features/game/engine/game.js';
import { createVisualDraw } from '../src/features/game/challenges/draw.js';
import { sceneScenarios } from '../src/features/game/challenges/scene/fixtures.js';
import { rapidScenarios } from '../src/features/game/challenges/rapid/rapid-scenarios.js';
import { scenarios } from '../src/features/game/content/scenarios.js';

const pool = [...sceneScenarios, ...rapidScenarios];
const ids = queue => queue.map(scenario => scenario.id);

test('visual pool has four valid fixtures, reproducible draws, and no immediate repeat', () => {
  assert.equal(new Set(ids([...scenarios, ...pool])).size, 7);
  const seen = new Set();
  for (const seed of [0, .25, .5, .75]) {
    const draw = createVisualDraw(pool, () => seed);
    const first = draw();
    assert.deepEqual(first.map(scenario => scenario.format), ['scene', 'rapid']);
    assert.deepEqual(ids(first), ids(createVisualDraw(pool, () => seed)()));
    seen.add(ids(first).join());
    assert.notDeepEqual(ids(draw()), ids(first));
  }
  assert.equal(seen.size, 4);
  for (const scenario of pool) {
    assert.equal(new Set(ids(scenario.choices)).size, 3);
    assert.equal(scenario.choices.filter(choice => choice.id === scenario.correctChoiceId).length, 1);
  }
});

test('visual clock waits for readiness, rejects duplicate input, and practice keeps the missed ID', t => {
  let now = 0;
  let tick;
  t.mock.method(performance, 'now', () => now);
  t.mock.method(globalThis, 'setInterval', callback => { tick = callback; });
  t.mock.method(globalThis, 'clearInterval', () => {});
  const game = createGame(scenarios, () => {}, () => {}, createVisualDraw(pool, () => 0));
  game.brief();
  game.startVisual();
  const initial = ids(game.run.queue);
  game.answer(game.scenario.correctChoiceId);
  assert.equal(game.run.outcomes.length, 0);
  assert.equal(game.run.deadline, null);

  now = 19000;
  game.ready();
  assert.equal(game.run.deadline, now + ROUND_MS);
  const stale = tick;
  game.toggleCalm();
  game.toggleCalm();
  game.ready();
  now += ROUND_MS;
  stale();
  assert.equal(game.run.phase, 'question');
  tick();
  assert.equal(game.run.outcomes[0].choiceId, null);
  game.advance();
  game.ready();
  game.answer(game.scenario.correctChoiceId);
  game.answer(game.scenario.correctChoiceId);
  assert.equal(game.run.outcomes.length, 2);
  game.advance();
  assert.equal(score(game.run.outcomes), 1);
  game.practice();
  assert.deepEqual(ids(game.run.queue), initial.slice(0, 1));
  assert.equal(game.run.original.length, 2);
  game.replay();
  assert.notDeepEqual(ids(game.run.queue), initial);
});
