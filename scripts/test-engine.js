import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createGame, ROUND_MS, score } from '../src/features/game/engine/game.js';
import { scenarios } from '../src/features/game/content/scenarios.js';

test('Calm Mode cancels stale timeouts and replay preserves the original score', t => {
  let now = 0;
  let tick;
  t.mock.method(performance, 'now', () => now);
  t.mock.method(globalThis, 'setInterval', callback => { tick = callback; });
  t.mock.method(globalThis, 'clearInterval', () => {});

  const game = createGame(scenarios, () => {}, () => {});
  game.brief();
  assert.equal(game.run.phase, 'briefing');
  game.start();
  assert.equal(game.run.deadline, ROUND_MS);

  now = 8000;
  const staleTick = tick;
  game.toggleCalm();
  assert.equal(game.run.deadline, null);
  now = ROUND_MS + 1000;
  staleTick();
  assert.equal(game.run.phase, 'question');
  assert.equal(game.scenario, scenarios[0]);

  game.toggleCalm();
  assert.equal(game.run.deadline, now + ROUND_MS);
  game.answer('unknown');
  assert.equal(game.run.phase, 'question');
  game.answer(scenarios[0].correctChoiceId);
  assert.equal(game.run.phase, 'feedback');
  game.answer(scenarios[0].correctChoiceId);
  assert.equal(game.run.outcomes.length, 1);
  assert.equal(score(game.run.outcomes), 1);

  game.advance();
  now += ROUND_MS;
  tick();
  assert.equal(game.run.outcomes[1].choiceId, null);
  game.advance();
  const wrongChoice = scenarios[2].choices.find(choice => choice.id !== scenarios[2].correctChoiceId);
  game.answer(wrongChoice.id);
  game.advance();
  assert.equal(game.run.phase, 'results');
  assert.equal(score(game.run.outcomes), 1);

  game.practice();
  assert.deepEqual(game.run.queue, scenarios.slice(1));
  assert.equal(score(game.run.original), 1);
  assert.equal(game.run.original.length, 3);
  assert.deepEqual(game.run.outcomes, []);
  game.start();
  const abandonedTick = tick;
  game.leave();
  abandonedTick();
  assert.equal(game.run, undefined);
});
