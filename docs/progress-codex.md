# Codex checkpoints

Append the task, branch, commit SHA, verified behavior, blockers, and Antigravity's next action after each meaningful checkpoint.

## Baseline and playable round · 2026-11-13

- Verified the planning-only baseline at `e4552a7f8d72714f822596cef09bc117657f3857`. Created and pushed `codex/disaster-dash-app`.
- This checkpoint adds the static Vite app, home and tour, and a complete earthquake round using a temporary fixture. The production content contract is unchanged.
- Vite build passed. The browser accepted a keyboard answer and showed the single-round debrief. The engine check advanced the clock past the original deadline in Calm Mode and forced a stale callback. The question stayed open and scoring accepted only the first answer.
- Next peer action is to share the scenario branch and independently check the switch from a timed question to Calm Mode.

## Three-round integration · 2026-11-13

- Integrated the scenario module and validator from Antigravity's Desktop working copy. Removed the temporary fixture.
- Kept the scenario export and shape. Shortened prompts, choices, and explanations, varied safe answer positions, and aligned the home fire scenario with the brief's clear-exit premise. The local Desktop working copy remained available to Antigravity.
- The production build and all three fixture validations passed. Browser verification covered keyboard play, wrong-answer feedback, enabling Calm Mode in feedback, all three rounds, and missed-round practice preserving the original score.

## Production check and handoff · 2026-11-13

- The three-round integration checkpoint was pushed as `64fbe9ed17a43ef84cc8c81e64ed79749abbb875`.
- Verified real timeout, practice and replay, 3 / 3 debrief, mobile layout after correcting overflow, and a clean browser console. Saved the Calm Mode and debrief screenshots.
- Reconciled the judge runbook and submission checklist to the integrated branch. The assigned documentation card and independent QA of this branch remain pending.

## Peer branch reconciliation · 2026-11-13

- Antigravity published `ec3bbbf1ac04fa53e469bd94d57a3542339a8f5a`, which also became the head of `main`. That commit includes a parallel application, scenario content, documentation, and evidence.
- Reconciled the histories on `codex/disaster-dash-app` with the verified Codex application as the integrated implementation. Preserved the peer progress record, its scenario contribution, and the engine test coverage adapted to this implementation. Peer screenshots and browser verification cover the separate Antigravity app.

## Visual Challenges

- Baseline: `27754ea9893710c1646f73cacd2c6640bd2ea89b` on `main`. The published classic judge path passed before expansion.
- Scene and integration checkpoint: `76fbac8c38beef345de113e47fe59c1100465a53`. Integrated Antigravity's Rapid Pick branch at `7775af04d6801d48bf2ebe5ec301ad838355e0aa` and retired the temporary renderer.
- For the integrated judge path, run `npm ci`, `npm test`, `npm run build`, and `npm run preview`. Choose **Play Disaster Dash**, then **Visual Challenges**. Play one scene and one Rapid Pick, check both answers and the two-round debrief, then replay to confirm a different pair. Miss a round to check that practice keeps its exact scenario.
- Tested the original tour and 3 / 3 classic run, scene targets, keyboard selection, the 360 px layout, the 2 / 2 visual result, missed-round practice, and a missing Rapid Pick bundle falling back to text. Also switched to Calm Mode as Rapid Pick entered and verified that no countdown remained. The engine tests cover all four pairings, readiness, stale timeouts, duplicate scoring, and exact missed IDs.
- Screenshots: [Scene](screenshots/visual-scene.jpg), [Rapid Pick](screenshots/visual-rapid-pick.jpg), and [Debrief](screenshots/visual-debrief.jpg).
- Independent integrated QA is pending. The published baseline is still the classic release.

## The Oracle’s Journey

- Base on `codex/oracle-journey` is `7f52f7d`. Classic Calm Mode now offers **Begin with Eldrin**, with a separate guide switch during play and on the debrief.
- Codex supplied the local fictional dialogue in `src/features/game/content/oracle-dialogue.js` because an Antigravity Oracle branch was unavailable. The stable IDs and sidecar contract are in ARCHITECTURE.md.
- `npm test` and `npm run build` passed. Browser verification at the Pages subpath covered plain Calm Mode, a guided 2 / 3 run with a missed answer, timing and guide switches during questions and feedback, keyboard, replay, 360 px layout, and a 2 / 2 Visual Challenges run.
- Independent review can run `npm ci`, `npm test`, `npm run build`, and `npm run preview`, then enable Calm Mode in briefing and choose **Begin with Eldrin**. Check all chapters and Visual Challenges.

- Merged Antigravity’s dialogue and validator from `01b891c`. Edited the journal copy to fit the existing scenarios and keep safety procedures in the factual feedback. The Ashen Adversary appears once as a metaphor for fear. The dialogue validator now runs with `npm test`.
- Retested the integrated production build at the Pages subpath. Guided Classic finished 2 / 3 with the closing line after restoring Eldrin on incorrect feedback. Visual Challenges finished 2 / 2 with a clean console.
