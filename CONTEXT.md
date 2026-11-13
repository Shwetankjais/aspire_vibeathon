# Current project context

Disaster Dash is VibeSprint Problem Card 08. The app uses Vite, native JavaScript modules, and local assets. The application branch is `codex/disaster-dash-app`. It started at `e4552a7f8d72714f822596cef09bc117657f3857`.

Codex integrated Antigravity's scenario module and validator from the Desktop working copy. The production module exports the agreed three scenarios. The integrated branch includes a verified local run, a judge runbook, and two screenshots. See [the README](README.md) for launch steps and [QA](docs/qa.md) for checked behavior. Independent QA of the integrated app and the assigned documentation card remain pending.

Antigravity's branch and GitHub `main` reached `ec3bbbf1ac04fa53e469bd94d57a3542339a8f5a` during final verification. That commit contains a parallel app. The integration branch preserves both histories, uses the verified Codex implementation, and incorporates the peer fixture, validation, and engine test coverage.

## Visual Challenges review

The expansion lives on `codex/visual-challenges`, forked from `27754ea9893710c1646f73cacd2c6640bd2ea89b`. It integrates Antigravity's `7775af04d6801d48bf2ebe5ec301ad838355e0aa` and shares the original game's timer, score, and results engine. [Integration checks](docs/progress-codex.md#visual-challenges)

## Living Village review

`codex/animated-sundarpur` starts at `9b48a5c0d674b0c10eccb36b2a7c449036629d2c`. Adds Classic-only earthquake, flood and fire village sequences. Contract: [Living Village handoff](docs/living-village-contract.md). This PR is for review only; current main and gh-pages must remain unchanged until deployment approval.
