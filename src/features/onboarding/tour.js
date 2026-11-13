import { icon } from '../../app/icons.js';
import { choiceMarkup, feedbackMarkup } from '../game/screens/game-screen.js';

const examples = [
  { title: 'Start with Play', description: 'Open the game to meet Sundarpur and read your briefing.', sample: `<span class="button primary">${icon('play')} Play Disaster Dash ${icon('arrow')}</span>` },
  { title: 'Make a choice', description: 'Read the situation and pick one action. Turn on Calm Mode any time to play at your own pace.', sample: choiceMarkup({ label: 'Take cover under the desk.' }, 0) },
  { title: 'Read what happened', description: 'Every round explains the safest choice. Move on whenever you’re ready.', sample: feedbackMarkup('Safe choice', 'The desk shields you from falling objects.', 'success') },
];

export function openTour(onDismiss) {
  const dialog = document.createElement('dialog');
  dialog.className = 'tour';
  dialog.setAttribute('aria-labelledby', 'tour-title');
  let step = -1;

  function render() {
    const example = examples[step];
    dialog.innerHTML = `
      <div class="tour-top"><p class="eyebrow"><span class="accent-dot"></span> ${example ? `HOW TO PLAY · ${step + 1} / ${examples.length}` : 'QUICK TOUR'}</p><button class="icon-button" type="button" data-tour="skip" aria-label="Skip tour">${icon('close')}</button></div>
      <h2 id="tour-title" tabindex="-1">${example?.title ?? 'Welcome to Disaster Dash.'}</h2>
      <p>${example?.description ?? 'Take a short tour to see how to start, make a decision, and learn from each round.'}</p>
      ${example ? `<div class="tour-example" aria-hidden="true" inert>${example.sample}</div>` : ''}
      <div class="tour-actions">
        ${step > 0 ? '<button class="text-button" data-tour="back">Back</button>' : ''}
        <button class="text-button" data-tour="skip">Skip</button>
        <button class="button primary" data-tour="next">${step < 0 ? 'Take the tour' : step === examples.length - 1 ? 'Finish' : 'Next'} ${icon('arrow')}</button>
      </div>`;
    dialog.querySelector('h2').focus();
  }

  dialog.addEventListener('click', event => {
    const action = event.target.closest('[data-tour]')?.dataset.tour;
    if (action === 'skip' || (action === 'next' && step === examples.length - 1)) dialog.close();
    else if (action) {
      step += action === 'back' ? -1 : 1;
      render();
    }
  });
  dialog.addEventListener('close', () => {
    dialog.remove();
    onDismiss();
  }, { once: true });
  document.body.append(dialog);
  dialog.showModal();
  render();
}
