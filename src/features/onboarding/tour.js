import { icon } from '../../app/icons.js';
import { scenarios } from '../game/content/scenarios.js';
import { choiceMarkup, roundFeedback } from '../game/screens/game-screen.js';
import './tour.css';

const scenario = scenarios.find(({ id }) => id === 'school-earthquake');
const steps = [
  {
    title: 'Play Disaster Dash',
    description: 'Select Play Disaster Dash to open the Sundarpur briefing.',
  },
  {
    title: 'Make a choice',
    description: 'Try an answer, or select Next to see feedback for the safest choice.',
  },
  {
    title: 'Read the feedback',
    description: 'Read the explanation before moving on to the next round.',
  },
];

export function openTour(onDismiss) {
  const dialog = document.createElement('dialog');
  dialog.className = 'tour';
  dialog.setAttribute('aria-labelledby', 'tour-title');
  dialog.setAttribute('aria-describedby', 'tour-description');
  let step = -1;
  let choiceId;

  function preview() {
    if (step === 0) {
      return `<div class="tour-spotlight" aria-hidden="true"><span class="button primary">${icon('play')} Play Disaster Dash ${icon('arrow')}</span></div>`;
    }
    if (step === 1) {
      return `<div class="tour-example">
        <p>${scenario.calmPrompt}</p>
        <div class="choices" role="group" aria-label="Sample answers">
          ${scenario.choices.map((choice, index) => choiceMarkup(choice, index, choice.id === choiceId ? 'selected' : '', true)).join('')}
        </div>
      </div>`;
    }
    if (step === 2) {
      return `<div class="tour-example">${roundFeedback(scenario, choiceId ?? scenario.correctChoiceId)}</div>`;
    }
    return '';
  }

  function render() {
    const current = steps[step];
    const progress = current ? `<p class="eyebrow">HOW TO PLAY · ${step + 1} / ${steps.length}</p>` : '';
    const nextLabel = step < 0 ? 'Take the tour' : step === steps.length - 1 ? 'Finish' : 'Next';
    dialog.innerHTML = `<div class="tour-page">
      ${progress}
      <h2 id="tour-title" tabindex="-1">${current?.title ?? 'Welcome to Disaster Dash.'}</h2>
      <p id="tour-description">${current?.description ?? 'Take a quick tour to learn how to play.'}</p>
      ${preview()}
      <div class="tour-actions">
        ${step > 0 ? '<button type="button" class="text-button" data-tour="back">Back</button>' : ''}
        <button type="button" class="text-button" data-tour="skip">Skip</button>
        <button type="button" class="button primary" data-tour="next">${nextLabel} ${icon('arrow')}</button>
      </div>
    </div>`;
  }

  dialog.addEventListener('click', event => {
    const sample = event.target.closest('[data-tour-choice]');
    if (sample) {
      choiceId = sample.dataset.tourChoice;
      for (const answer of dialog.querySelectorAll('[data-tour-choice]')) {
        answer.setAttribute('aria-pressed', String(answer === sample));
        answer.classList.toggle('selected', answer === sample);
      }
      return;
    }
    const action = event.target.closest('[data-tour]')?.dataset.tour;
    if (!action) return;
    if (action === 'skip' || (action === 'next' && step === steps.length - 1)) {
      dialog.close();
      return;
    }
    step += action === 'back' ? -1 : 1;
    render();
    dialog.scrollTop = 0;
    dialog.querySelector('h2').focus();
  });

  dialog.addEventListener('close', () => {
    dialog.remove();
    onDismiss();
  }, { once: true });
  render();
  document.body.append(dialog);
  dialog.showModal();
  dialog.querySelector('h2').focus();
}
