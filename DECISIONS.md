# Decisions

- The homepage has a single Play entry into the story. The three hazards are rounds of the same game, with the same interaction pattern and a different scene.
- Calm Mode is the revealed event twist. It changes timing, stimulation, and copy length while preserving decisions and scoring.
- Use bundled fictional fixtures and an in-browser engine. Keep scenario content separate from the engine so both agents can proceed independently.
- Retain the existing compatible stack. Use Vite with native modules if the repository is empty.
- Use one point per safe answer and no speed bonus. Give every player a debrief and a route to practice their misses.
- Codex owns integration. Two working copies and two progress logs keep simultaneous edits isolated.

Record any agreed changes here with the date, reason, and affected contract.

## 2026-11-13 integration

- The verified baseline contained planning files. Use Vite with native modules and bundle the fonts and illustrations with the game.
- Preserve the scenario module interface. Integrate the peer fixtures and validator from the Desktop working copy. Use shorter explanations in both modes and specify a clear exit in both fire prompts.
- Place the question above the illustration on narrow screens so players can reach the choices while the timer runs.

- Draw one scene and one Rapid Pick prompt for each new visual run, excluding the previous pair. Practice reuses the exact missed scenarios.
- Load each renderer when its question opens. The text choices become the fallback if loading fails or times out. Calm Mode makes text choices immediately usable.
