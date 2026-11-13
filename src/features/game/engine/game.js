export const ROUND_MS = 20_000;

export function createGame(scenarios, render, updateTime) {
  let calm = false;
  let run;
  let interval;

  function cancelClock() {
    clearInterval(interval);
    interval = undefined;
    if (run) run.deadline = null;
  }

  function currentScenario() {
    return run.queue[run.index];
  }

  function resolve(choiceId) {
    cancelClock();
    const scenario = currentScenario();
    run.outcomes.push({
      scenario,
      choiceId,
      correct: choiceId === scenario.correctChoiceId,
    });
    run.phase = 'feedback';
    render('feedback');
  }

  function tick(deadline) {
    if (run?.deadline !== deadline) return;
    const remaining = deadline - performance.now();
    if (remaining <= 0) resolve(null);
    else updateTime(remaining);
  }

  function startClock() {
    if (calm || run.phase !== 'question') return;
    const deadline = performance.now() + ROUND_MS;
    run.deadline = deadline;
    updateTime(ROUND_MS);
    interval = setInterval(() => tick(deadline), 100);
  }

  function brief(queue = scenarios, original = null) {
    cancelClock();
    run = { phase: 'briefing', queue, index: 0, outcomes: [], original, deadline: null };
    render('briefing');
  }

  function showQuestion() {
    run.phase = 'question';
    render('question');
    startClock();
  }

  return {
    get run() { return run; },
    get calm() { return calm; },
    get scenario() { return currentScenario(); },
    brief,
    leave() {
      cancelClock();
      run = undefined;
    },
    start() {
      if (run.phase === 'briefing') showQuestion();
    },
    answer(choiceId) {
      if (run.phase !== 'question') return;
      if (!currentScenario().choices.some(choice => choice.id === choiceId)) return;
      const expired = run.deadline !== null && performance.now() >= run.deadline;
      resolve(expired ? null : choiceId);
    },
    toggleCalm() {
      calm = !calm;
      cancelClock();
      render('mode');
      startClock();
    },
    advance() {
      if (run.phase !== 'feedback') return;
      if (run.index + 1 < run.queue.length) {
        run.index += 1;
        showQuestion();
      } else {
        run.phase = 'results';
        render('results');
      }
    },
    practice() {
      if (run.phase !== 'results') return;
      const missed = run.outcomes.filter(outcome => !outcome.correct);
      if (missed.length) brief(missed.map(outcome => outcome.scenario), run.original ?? run.outcomes);
    },
  };
}

export function score(outcomes) {
  return outcomes.filter(outcome => outcome.correct).length;
}
