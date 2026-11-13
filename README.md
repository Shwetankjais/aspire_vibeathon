# Disaster Dash

Students and first-time players practice making safe choices during earthquake, flood, and fire scenarios in the fictional village of Sundarpur.

**Educational simulation, not live emergency advice.**

## What you can play

- Three scenarios with a 20-second decision timer and feedback after every answer or timeout.
- Calm Mode turns off the timer, softens the visuals, and shortens the prompts. It is available before and during each round and in feedback.
- A debrief scores the run, marks secured locations, and links to safety sources. Missed rounds can be practiced separately.
- A short welcome tour, keyboard controls, and responsive layouts.

## Run locally

Use Node.js 20.19+ or 22.12+ and npm. From the project folder:

```sh
npm ci
npm test
npm run build
npm run preview -- --host 127.0.0.1
```

Open the URL printed by Vite. Use `npm run dev` while editing. After the build, any local static HTTP server can serve `dist/`. For example, run `python3 -m http.server 4173 --bind 127.0.0.1 --directory dist` and open `http://127.0.0.1:4173/`.

The initial dependency installation uses npm. Gameplay uses local files and browser memory and requires no account, API, or environment file. Refreshing clears the current run.

## Three-step judge demo

1. Skip or finish the tour. Click **Play Disaster Dash**, then **Start round**. Choose **Drop, cover, and hold on under the desk**.
2. Read the feedback. Turn on **Calm Mode**, select **Next round**, and confirm the countdown is gone.
3. In the flood round, turn around and head to higher ground. In the fire round, take the clear exit. Select **See results** to view the 3 / 3 score and the safety takeaways.

[Calm Mode round](docs/screenshots/calm-round.jpg) · [Perfect-run debrief](docs/screenshots/debrief.jpg) · [Judge runbook and verification](docs/qa.md)

## Scope and AI use

The game covers three fictional decisions with fixed explanations. Scores last for the current browser session and reset on refresh. The debrief’s safety source links require an internet connection.

Codex built and tested the app. Antigravity supplied the original scenario module and validator. During integration, Codex revised the fire scenario so both modes explicitly provide a clear exit. Built-in ImageGen produced the [warning-sign poster](src/assets/disaster-poster.jpg) from a brief for a retro screen-printed warning sign framed by lightning, floodwater, and flame. It also produced the [Sundarpur illustration](src/assets/sundarpur.jpg) from a brief for a South Asian hillside village with terracotta roofs, a winding road, and a creek at dusk.
