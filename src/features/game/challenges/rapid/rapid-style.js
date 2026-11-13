/**
 * Embedded styles for Rapid Pick Challenge
 * Injected automatically on mount to ensure zero bundler dependency
 */

export const RAPID_STYLES = `
.rapid-help { padding: 0 16px 14px; margin: 0; color: #51445b; font-size: .88rem; }
.challenge-board .rapid-cards-grid { padding: 16px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
@media (max-width: 960px) { .challenge-board .rapid-cards-grid { grid-template-columns: 1fr; } }
.rapid-pick-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  perspective: 1200px;
}

.rapid-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.rapid-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #18181B;
  color: #FEF08A;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.3rem 0.75rem;
  border-radius: 9999px;
  border: 1.5px solid #F59E0B;
}

.rapid-hazard-tag {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
}

.rapid-hazard-tag.fire {
  background: #FFE4E6;
  color: #991B1B;
}

.rapid-hazard-tag.flood {
  background: #CCFBF1;
  color: #0F766E;
}

.rapid-cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 100%;
}

@media (max-width: 720px) {
  .rapid-cards-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
}

.rapid-card-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  gap: 0.85rem;
  background: #FFFFFF;
  border: 3px solid #18181B;
  border-radius: 14px;
  padding: 1.25rem 1rem;
  cursor: pointer;
  box-shadow: 4px 4px 0px #18181B;
  user-select: none;
  font-family: inherit;
  transition: transform 0.15s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.15s ease, background-color 0.15s ease;
  min-height: 180px;
  position: relative;
  will-change: transform, opacity;
}

@media (max-width: 720px) {
  .rapid-card-btn {
    flex-direction: row;
    text-align: left;
    min-height: 80px;
    padding: 0.85rem 1rem;
    gap: 1rem;
  }
}

.rapid-card-btn:hover:not(:disabled) {
  background-color: #FEF9C3;
  transform: translate(-3px, -3px);
  box-shadow: 7px 7px 0px #18181B;
}

.rapid-card-btn:active:not(:disabled) {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px #18181B;
}

.rapid-card-btn:focus-visible {
  outline: 3.5px solid #F59E0B;
  outline-offset: 3px;
}

.rapid-card-btn:disabled {
  cursor: not-allowed;
  opacity: 0.9;
}

.rapid-card-btn.selected {
  background: #FEF08A;
  border-color: #047857;
  box-shadow: 4px 4px 0px #047857;
}

.rapid-key-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background: #18181B;
  color: #FFFFFF;
  font-size: 0.85rem;
  font-weight: 900;
  flex-shrink: 0;
  box-shadow: 1px 1px 0px rgba(0, 0, 0, 0.2);
}

.rapid-card-illustration {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

@media (max-width: 720px) {
  .rapid-card-illustration {
    width: 48px;
    height: 48px;
  }
}

.rapid-card-svg {
  width: 100%;
  height: 100%;
}

.rapid-card-label {
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.35;
  color: #18181B;
  flex-grow: 1;
}

@media (max-width: 720px) {
  .rapid-card-label {
    font-size: 0.9rem;
  }
}

@keyframes rapidSlotEnter {
  0% {
    opacity: 0;
    transform: translateY(28px) scale(0.94) rotateX(12deg);
  }
  70% {
    transform: translateY(-3px) scale(1.01) rotateX(0deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1) rotateX(0deg);
  }
}

.rapid-animating .rapid-card-slot-0 {
  animation: rapidSlotEnter 280ms cubic-bezier(0.16, 1, 0.3, 1) 0ms forwards;
}

.rapid-animating .rapid-card-slot-1 {
  animation: rapidSlotEnter 280ms cubic-bezier(0.16, 1, 0.3, 1) 140ms forwards;
}

.rapid-animating .rapid-card-slot-2 {
  animation: rapidSlotEnter 280ms cubic-bezier(0.16, 1, 0.3, 1) 280ms forwards;
}

.rapid-pick-container.calm-mode .rapid-card-btn,
.rapid-pick-container.reduced-motion .rapid-card-btn {
  animation: none !important;
  opacity: 1 !important;
  transform: none !important;
  border-color: #64748B;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  background: #FFFFFF;
}

.rapid-pick-container.calm-mode .rapid-card-btn:hover:not(:disabled),
.rapid-pick-container.reduced-motion .rapid-card-btn:hover:not(:disabled) {
  background-color: #F1F5F9;
  transform: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  border-color: #0D9488;
}

.rapid-pick-container.calm-mode .rapid-key-badge,
.rapid-pick-container.reduced-motion .rapid-key-badge {
  background: #475569;
}

.rapid-pick-container.calm-mode .rapid-badge {
  background: #F0FDF4;
  color: #065F46;
  border-color: #10B981;
}

@media (prefers-reduced-motion: reduce) {
  .rapid-card-btn {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
`;

export function ensureRapidStyles() {
  if (typeof document === 'undefined') return;
  const STYLE_ID = 'disaster-dash-rapid-styles';
  if (!document.getElementById(STYLE_ID)) {
    const styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    styleEl.textContent = RAPID_STYLES;
    document.head.appendChild(styleEl);
  }
}
