import portrait from './eldrin.svg';
import './journal.css';

export function journalEntry(line, heading = 'Eldrin · Keeper of the Beacon') {
  if (!line) return '';
  return `<aside class="oracle-journal" aria-label="Eldrin’s story">
    <img src="${portrait}" width="50" height="56" alt="">
    <div><strong>${heading}</strong><p>${line}</p></div>
  </aside>`;
}

export function guideControl(enabled) {
  return `<button type="button" class="mode-control" role="switch" aria-checked="${enabled}" data-action="guide">
    Eldrin guide <i class="switch" aria-hidden="true"></i>
  </button>`;
}
