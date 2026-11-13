export const ROUND_MS = 20_000;

export function createGame(scenarios, render, updateTime, drawVisual) {
  let calm = false;
  let run;
  let interval;
  let clockToken;

  function cancelClock() {
    clockToken = undefined;
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

  function tick(token, deadline) {
    if (clockToken !== token) return;
    const remaining = deadline - performance.now();
    if (remaining <= 0) resolve(null);
    else updateTime(remaining);
  }

  function startClock() {
    if (calm || run.phase !== 'question' || !run.ready || clockToken) return;
    const token = Symbol();
    clockToken = token;
    const deadline = performance.now() + ROUND_MS;
    run.deadline = deadline;
    updateTime(ROUND_MS);
    interval = setInterval(() => tick(token, deadline), 100);
  }

  function brief(queue = scenarios, original = null, kind = 'classic', guide = false) {
    cancelClock();
    run = { phase: 'briefing', queue, index: 0, outcomes: [], original, kind, guide, ready: false, deadline: null };
    render('briefing');
  }

  function showQuestion() {
    run.phase = 'question';
    run.ready = !currentScenario().format;
    render('question');
    startClock();
  }

  return {
    get run() { return run; },
    get calm() { return calm; },
    get scenario() { return currentScenario(); },
    brief,
    startVisual() {
      if (run.phase !== 'briefing' || run.original) return;
      brief(drawVisual(), null, 'visual');
      showQuestion();
    },
    replay() {
      if (run.kind === 'visual') {
        brief(drawVisual(), null, 'visual');
        showQuestion();
      } else {
        brief();
      }
    },
    ready() {
      if (run?.phase !== 'question' || run.ready) return;
      run.ready = true;
      startClock();
    },
    leave() {
      cancelClock();
      run = undefined;
    },
    start(withGuide = false) {
      if (run.phase !== 'briefing') return;
      if (!run.original) run.guide = withGuide && calm && run.kind === 'classic';
      showQuestion();
    },
    toggleGuide() {
      if (!calm || run?.kind !== 'classic' || run.phase === 'briefing') return;
      run.guide = !run.guide;
      render('guide');
    },
    answer(choiceId) {
      if (run?.phase !== 'question' || !run.ready) return;
      if (!currentScenario().choices.some(choice => choice.id === choiceId)) return;
      const expired = run.deadline !== null && performance.now() >= run.deadline;
      resolve(expired ? null : choiceId);
    },
    toggleCalm() {
      calm = !calm;
      cancelClock();
      if (run.phase === 'question') run.ready = !currentScenario().format;
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
      if (missed.length) brief(missed.map(outcome => outcome.scenario), run.original ?? run.outcomes, run.kind, run.guide);
    },
  };
}

export function score(outcomes) {
  return outcomes.filter(outcome => outcome.correct).length;
}
