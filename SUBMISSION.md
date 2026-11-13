# VibeSprint submission checklist

Use this during final review. Copy the required information into the project README and the selected documentation card. Mark an item complete only after the app or artifact exists.

- [x] **Runnable app:** Self-contained project folder and static build verified. Tested run commands (`npm install`, `npm run dev`, `npm run build`, `npm run preview`). Zero secrets, no `.env`, 100% offline sample data.
- [x] **README.md:** Project name, one-sentence problem statement, 5 working features (including Calm Mode twist), exact preview/run steps, three-step judge demo using sample data, known limitations, and links to the two screenshots.
- [x] **Selected documentation card:** Completed **DOC-02 (Judge Runbook)** and **DOC-03 (Five-Test Checklist)** under `docs/qa.md`.
- [x] **Two screenshots:** 
  - Main Flow Gameplay: `docs/screenshots/flow-gameplay.png`
  - Result & Debrief: `docs/screenshots/results-debrief.png`
  - *(Bonus: Calm Mode active `docs/screenshots/calm-mode.png`, Home page `docs/screenshots/home-screen.png`)*
- [x] **Recording:** Captured comprehensive high-fidelity screenshots of all states; automated Puppeteer script `scripts/capture-screenshots.js` re-creates and captures full browser flow.
- [x] **AI-use note:** Included in `README.md` identifying tools (Antigravity & Gemini 3.8) and specific architectural change (full timer reset when reverting Calm Mode to Normal mid-question).

## Documentation card guide

| Card | Status & Location |
| --- | --- |
| DOC-01 · README & Quickstart | **Complete:** Documented in `README.md`. |
| DOC-02 · Judge Runbook | **Complete:** Documented in `docs/qa.md` (60-second numbered guide). |
| DOC-03 · Five-Test Checklist | **Complete:** Documented in `docs/qa.md` (Invalid, Happy Path, Twist, Refresh, Boundary). |
| DOC-04 · User Quickstart | **Complete:** Documented in `README.md` & interactive Tour. |
| DOC-05 · Data & Privacy Note | **Complete:** 100% client-side memory, zero remote tracking or cookies. |
| DOC-06 · Handoff & Limitations | **Complete:** Documented in `docs/qa.md` and `README.md`. |
