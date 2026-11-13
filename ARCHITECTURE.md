# Application structure and shared contract

Use an existing browser-compatible stack if the verified checkout already contains one. For an empty repo, use a static app with Vite and native JavaScript modules. Build to static assets. Use hash routing for a simple static-host fallback (`#/` and `#/play`) unless the existing router handles direct game links. No server is required for gameplay. Do not use a hosted AI service for explanations.

```text
src/
  app/                             # Codex: entry, routing, global shell
  features/
    home/                          # Codex: landing page
    onboarding/                    # Codex: tour steps and dialog logic
    game/
      content/scenarios.js         # Antigravity: sole scenario data module
      engine/                      # Codex: game state, score, clock
      screens/                     # Codex: briefing, round, feedback, results
      themes/                      # Codex: hazard tokens and scene transitions
  assets/                          # Codex: local artwork, fonts if available
docs/                              # Split ownership per TASKS.md
```

If the existing stack needs different paths, Codex and Antigravity agree on them via handoff before changing the shared module contract. The JavaScript module can be imported from a TypeScript app where the existing setup permits it.

## Content interface

`src/features/game/content/scenarios.js` exports the named array `scenarios`, ordered by earthquake, flood, fire. Treat fixtures as immutable. IDs are unique and stable. Each scenario has exactly three choices and exactly one referenced correct choice. The engine owns all scores and timers.

```js
{
  id: "school-earthquake",
  hazard: "earthquake",           // earthquake | flood | fire
  location: "Village school",
  title: "The classroom shakes",
  prompt: "You are indoors and a sturdy desk is beside you. What do you do?",
  calmPrompt: "The room is shaking. A sturdy desk is nearby.",
  choices: [
    { id: "take-cover", label: "Drop, cover, and hold on under the desk.",
      explanation: "The desk gives you cover from falling objects." }
    // Two more choices. Explain each choice in its own scenario context.
  ],
  correctChoiceId: "take-cover",
  takeaway: "Indoors during shaking, drop, cover, and hold on.",
  sourceUrl: "https://www.ready.gov/sites/default/files/2024-03/ready-gov_full-suite_hazard-info-sheets.pdf"
}
```

Keep `explanation` short enough to reuse in both modes. On a wrong answer show the chosen action's explanation and the safest action. On timeout show “Time ran out,” the safest action, and its explanation. Validate the fixture IDs before integration and keep scenario sources documented for review. Source links are attribution only. The app loads all content locally.

## Gameplay state

Use a small explicit flow: briefing → question → feedback → results. Store current scenario ID, mode, pending timer deadline, and an outcome per round. Resolve a question once by answer or timeout. Use a deadline for remaining time and cancel pending work on answer, enabling Calm Mode, replay, and leaving the route. Ignore stale callbacks. Starting the next round creates its own timer only in timed mode. Calculate score from resolved outcomes and never from clicks. A full refresh clears the run and reopens the welcome on the homepage. A refreshed play route starts at its briefing. Practice uses a new queue of missed scenario IDs and does not rewrite the prior score.

The default round duration is 20 seconds. Do not deduct points for time spent in feedback or give speed bonuses. You may keep Calm Mode in session memory between runs. Separate tour state from game state and start a timer only when the question is visible and usable.
