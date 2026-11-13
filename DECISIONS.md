# Decisions

- The homepage has a single Play entry into the story. The three hazards are rounds of the same game, with the same interaction pattern and a different scene.
- Calm Mode is the revealed event twist. It changes timing, stimulation, and copy length while preserving decisions and scoring.
- Use bundled fictional fixtures and an in-browser engine. Keep scenario content separate from the engine so both agents can proceed independently.
- Stack: Lightweight Vite + native ES Modules, vanilla JavaScript, and modern CSS with custom SVG vectors. Zero runtime external dependencies, zero secret keys.
- Use one point per safe answer and no speed bonus. Give every player a debrief and a route to practice their misses.
- Toggling Calm Mode mid-countdown cancels the deadline and suppresses urgency cues. Toggling Calm Mode back to Normal mid-question grants a fresh full 20s countdown to ensure fair decision-making.
- Hash routing (`#/` and `#/play`) guarantees static hosting compatibility across any web server, GitHub Pages, or local file viewer.
