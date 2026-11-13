import './scene.css';

const diningHall = `
  <div class="dining-floor"></div>
  <div class="dining-wall rear"><div class="room-window"><i></i></div><div class="room-door"></div><div class="wall-trim"></div></div>
  <div class="dining-wall side"><div class="wall-trim"></div></div>
  <div class="dining-rug"></div>
  <div class="character"><i class="head"></i><i class="body"></i><i class="legs"></i><i class="arm cover"></i><i class="arm grip"></i></div>
  <div class="dining-table"><i class="table-top"></i><i class="table-front"></i><i class="table-side"></i><i class="leg rear-left"></i><i class="leg rear-right"></i><i class="leg front-left"></i><i class="leg front-right"></i></div>`;

const junction = `
  <div class="junction-base"></div>
  <div class="junction-river"></div>
  <div class="junction-road"></div>
  <div class="junction-hill"></div>
  <div class="junction-path"></div>
  <div class="junction-bridge"></div>
  <div class="trees"><i></i><i></i><i></i><i></i><i></i></div>
  <div class="route-walker"></div>`;

const scenes = {
  'dining-hall': {
    artwork: diningHall,
    labels: ['Sturdy table', 'Window', 'Doorway'],
    response: 'Get low, cover your head and neck, and hold the table leg.',
  },
  'flood-junction': {
    artwork: junction,
    labels: ['Flooded road', 'Dry uphill path', 'Bridge approach'],
    response: 'Follow the dry path uphill without entering the water.',
  },
};

export function mountChallenge(container, {
  scenario, calmMode, reducedMotion, feedback = false, onReady, onChoose,
}) {
  const scene = scenes[scenario.sceneId];
  if (!scene) throw new Error('Unknown scene: ' + scenario.sceneId);
  const stable = calmMode || reducedMotion;
  container.innerHTML = `
    <div class="spatial-view ${scenario.sceneId} ${stable ? 'stable' : ''} ${feedback ? 'demonstration' : ''}">
      <div class="scene-world" aria-hidden="true">${scene.artwork}</div>
      ${feedback ? '' : scenario.choices.map((choice, index) => `
        <button type="button" class="scene-target target-${index}" data-target="${choice.id}" aria-label="${scene.labels[index]}: ${choice.label}">
          <span aria-hidden="true">${String.fromCharCode(65 + index)}</span>${scene.labels[index]}
        </button>`).join('')}
    </div>
    <p class="scene-instruction">${feedback ? scene.response : 'Select a marked spot or use the action list.'}</p>`;

  function choose(event) {
    const target = event.target.closest('[data-target]');
    if (target) onChoose(target.dataset.target);
  }

  if (!feedback) container.addEventListener('click', choose);
  onReady();
  return {
    destroy() {
      container.removeEventListener('click', choose);
      container.replaceChildren();
    },
  };
}
