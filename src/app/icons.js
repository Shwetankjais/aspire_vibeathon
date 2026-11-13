const paths = {
  logo: '<path d="M13 2 4 14h7l-1 8 10-12h-7l1-8Z"/>',
  play: '<path d="m9 5 12 7-12 7z"/>',
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  back: '<path d="M20 12H5m6 6-6-6 6-6"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4 2c-1 .7-1.5 1.3-1.5 2.5m0 3h.01"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/>',
  calm: '<path d="M20 4c0 10-5 14-11 12-2-1-3-4-1-7 2-3 7-4 12-5ZM4 20l10-10"/>',
  earthquake: '<path d="M2 14h5l3-8 4 13 3-7h5"/>',
  flood: '<path d="M2 8c3-4 7 4 10 0s7 4 10 0M2 15c3-4 7 4 10 0s7 4 10 0"/>',
  fire: '<path d="M12 3c1 5 6 6 6 12a6 6 0 1 1-12 0c0-3 1-5 3-7 0 3 2 4 2 4 1-3 2-6 1-9Z"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
  map: '<path d="M20 10c0 5-8 10-8 10s-8-5-8-10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
};

export function icon(name) {
  return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name]}</svg>`;
}
