# Current project context

Disaster Dash (VibeSprint Problem Card 08) is fully built, tested, and documented.

## Implementation Summary
- **Content:** Three fully validated emergency scenarios for Earthquake (School), Flood (River Crossing), and Fire (Home) in `src/features/game/content/scenarios.js` based on FEMA, NOAA/CERT, and USFA guidelines.
- **Engine:** Pure state machine in `src/features/game/engine/gameStore.js` with single-scoring guarantee, 20s countdown timer, Calm Mode cancellation, and practice mode for missed rounds.
- **UI & Art:** OWASP NIE-inspired design (cream `#FAF7F0`, dark ink `#151515`, yellow pill `#FFCE4A`, pink underline `#FF6B8B`), custom vector illustrations for village, devil, and 3 hazard scenes, responsive layout, full keyboard navigation (`1`, `2`, `3` keys), and accessible focus rings.
- **Twist:** Calm Mode toggle implemented across Briefing, Question, and Feedback with instant timer cancellation, low-stimulation neutral palette, and fresh timer restart on reversal.
- **Verification:** Unit and contract tests passing (`npm test`), static build verified (`npm run build`), and high-resolution screenshots generated (`docs/screenshots/`).
