# Living Village review and QA

This update is on `codex/animated-sundarpur`, based on main `9b48a5c0d674b0c10eccb36b2a7c449036629d2c`. It is not deployed. The current live release remains the Eldrin release from `96f14c9`.

## Preview

```sh
npm ci
npm test
npm run build
npm run preview -- --host 127.0.0.1
```

Open the printed local address, then Play Disaster Dash. Start round uses the animated Classic village. Calm Mode → Begin with Eldrin uses still scene steps alongside the journal. Visual Challenges retains the existing scene and Rapid Pick renderers.

For reproducible production browser checks:

```sh
# Google Chrome must be installed, or set CHROME_PATH to its executable.
npm run test:browser
```

The browser suite hosts the production output at `/aspire_vibeathon/`, tests Classic timed, plain Calm, guided Calm, Visual Challenges and Rapid Pick, and checks scene controls, mid-round mode changes, timeout/practice, keyboard, phone width, reduced motion, WebGL context loss and initial WebGL failure. It also checks for uncaught errors and external runtime requests. The test uses an available local port and does not contact the live site.

## Review evidence

The original static Classic illustration is visible in [the deployed-release screenshots](qa.md#fresh-screenshots-from-the-live-build).

Fresh frame sequences from the local production build:

| Scene | Onset | Escalation | Aftermath | Answer feedback |
| --- | --- | --- | --- | --- |
| Earthquake | [1](screenshots/living-village/earthquake-0.png) | [2](screenshots/living-village/earthquake-1.png) | [3](screenshots/living-village/earthquake-2.png) | [Feedback](screenshots/living-village/earthquake-feedback.png) |
| Flood | [1](screenshots/living-village/flood-0.png) | [2](screenshots/living-village/flood-1.png) | [3](screenshots/living-village/flood-2.png) | [Feedback](screenshots/living-village/flood-feedback.png) |
| Fire | [1](screenshots/living-village/fire-0.png) | [2](screenshots/living-village/fire-1.png) | [3](screenshots/living-village/fire-2.png) | [Feedback](screenshots/living-village/fire-feedback.png) |

[Phone layout](screenshots/living-village/mobile.png).

The still sequence is the default in Calm Mode and with reduced motion. The optional gentle preview was omitted: these modes never animate automatically. Captured local scene images provide distinct environmental steps when WebGL is unavailable; the existing village image remains the immediate loading poster. In fallback, safe-response character animation is omitted and the existing factual feedback remains authoritative.

## Review findings fixed

- A resize callback could clear a still canvas after drawing; resize now redraws only when its dimensions change.
- Fire escape originally crossed a building footprint; its path now follows the clear east/south lane.
- One flood onlooker stood within a building footprint; all now start and retreat on dry ground.
- Initialization failure now disposes allocated GPU resources before fallback.
- Earthquake emergence waits until feedback and a distinct post-shaking beat; no character leaves the damaged building.
- Question-to-feedback preserves environmental progress instead of repeating onset automatically.

The helper agent reviewed hazard paths and supplied deterministic pose/path/disposal tests. External Antigravity QA is not claimed. To independently retest, check out the PR head, follow the preview steps above, and review all three hazards in timed and still mode, including feedback transitions. Do not deploy until the user approves.

## Verification result

`npm test`, `npm run build`, and `npm run test:browser` passed on the integrated tree. All checks listed above passed. The dependency installation audit reported zero vulnerabilities. The application engine, scenario content, Visual Challenges and Rapid Pick files are byte-identical to baseline `9b48a5c`.
