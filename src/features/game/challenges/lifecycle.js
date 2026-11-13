const load = {
  scene: () => import('./scene/scene.js'),
  rapid: () => import('./rapid/rapid.js'),
};

// A stalled module must never trap the player or start the clock early.
const LOAD_LIMIT_MS = 1400;

export function createChallengeHost(game, root, motion) {
  let dispose = () => {};

  function clear() {
    dispose();
    dispose = () => {};
  }

  function mount() {
    const container = root.querySelector('[data-challenge]');
    if (!container) return;

    const scenario = game.scenario;
    const feedback = game.run.phase === 'feedback';
    let active = true;
    let view;
    let loading;
    let settled = false;

    const ready = () => {
      if (!active || settled) return;
      settled = true;
      clearTimeout(loading);
      if (feedback) return;
      root.querySelector('[data-choice-list]').inert = false;
      root.querySelector('[data-reveal-status]')?.remove();
      root.querySelectorAll('[data-challenge-timer]').forEach(element => {
        element.hidden = false;
      });
      game.ready();
    };

    const fallback = () => {
      if (!active || settled) return;
      view?.destroy();
      container.closest('.challenge-board').hidden = true;
      ready();
    };

    dispose = () => {
      active = false;
      clearTimeout(loading);
      view?.destroy();
    };

    loading = setTimeout(fallback, LOAD_LIMIT_MS);
    load[scenario.format]().then(module => {
      if (!active || settled) return;
      view = module.mountChallenge(container, {
        scenario,
        calmMode: game.calm,
        reducedMotion: motion.matches,
        feedback,
        onReady: ready,
        onChoose: id => {
          if (active && settled && !feedback) game.answer(id);
        },
      });
    }).catch(fallback);
  }

  return { clear, mount };
}
