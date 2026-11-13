// Temporary contract fixture while the production Rapid Pick renderer is built.
export function mountChallenge(container, { onReady }) {
  container.closest('.challenge-board').hidden = true;
  onReady();
  return { destroy() {} };
}
