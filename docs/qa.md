# Disaster Dash QA & Judge Runbook

This document provides the independent QA verification, the 60-Second Judge Runbook (DOC-02), and the Five-Test Checklist (DOC-03) for **Disaster Dash** (VibeSprint Problem Card 08).

---

## DOC-02 · Judge Runbook (60-Second Evaluation Flow)

| Step | Action | Expected Output | Notes |
|:---:|:---|:---|:---|
| **1** | Open `http://localhost:4173/#/` (or run `npm run preview`). | Cream homepage renders with "Disaster Dash", village hero artwork, and "Play Disaster Dash" yellow CTA. Tour dialog appears automatically on fresh session. | Tour can be dismissed with **Skip** or **✕** (returns focus to CTA). |
| **2** | Click **Play Disaster Dash** (or press Enter). | Route navigates to `#/play`. Mission Briefing displays the Disaster Devil threat, three hazard hubs, the simulation notice, and the Calm Mode switch. | Ready to test Round 1. |
| **3** | Click **Start Round 1: Village School**. | Round 1 renders with classroom earthquake illustration, 20-second active countdown timer bar, and 3 numbered choices. | Keyboard shortcuts `1`, `2`, `3` active. |
| **4** | **THE TWIST:** Flip the **Calm Mode switch** in the upper right. | Timer bar disappears immediately, timeout is cancelled, and shorter calm prompt appears. | Confirms mid-round twist handling with zero countdown panic. |
| **5** | Click Choice 1: *"Drop to your hands and knees..."* | Immediate feedback appears with green shield, detailed explanation of falling debris protection, and the authoritative FEMA Ready.gov source link. | Feedback is completely untimed. |
| **6** | Click **Continue to Round 2**. | Round 2 (River Crossing Flood) loads untimed in Calm Mode with teal theme. | Untimed state persists across rounds. |
| **7** | Click Choice 1: *"Turn around immediately..."* then advance to Round 3 and select Choice 1: *"Crawl low beneath smoke..."*. | Advances through Flood and Fire scenarios to the final **Mission Report**. | Full start-to-finish core journey. |
| **8** | Review the **Mission Report** Debrief. | Score displays **3 / 3**, night celebration illustration displays with lit lanterns, all 3 village hubs marked SECURE, and 3 critical safety takeaways listed. | Perfect run celebration. |

---

## DOC-03 · Five-Test Checklist

### Test 1: Invalid Action / Timeout Handling
- **Action:** In Round 1 (Normal Mode), wait for the 20-second countdown timer to reach 0 without selecting an answer.
- **Expected Result:** Timer reaches `⏱ 0s`. Engine automatically records timeout (`isTimeout: true, isCorrect: false`), transitions to Feedback screen with purple/red banner *"Time Ran Out!"*, and explains the danger of hesitation while displaying the safest action.
- **Result:** **PASS** (Verified by automated unit test `test-engine.js` and browser verification).

### Test 2: Happy Path (Perfect Run)
- **Action:** Complete all three rounds selecting the correct safe actions:
  - Round 1: `drop-cover-hold`
  - Round 2: `turn-around-high-ground`
  - Round 3: `crawl-low-feel-door`
- **Expected Result:** Score calculates to 3/3. Results screen lights up with warm village celebration art, all 3 location cards (School, River Road, Home) display green `🛡️ SECURE` badges, and no practice button is needed.
- **Result:** **PASS** (Verified via automated Puppeteer flow and screenshot capture).

### Test 3: The Event Twist (Calm Mode Reversibility & Mid-Round Cancellation)
- **Action 3A:** Start Round 1 in Normal Mode. Let timer count down to 12s. Toggle Calm Mode **ON**.
- **Expected Result 3A:** Countdown bar and numeric timer hide immediately. Timeout deadline is cancelled. Waiting beyond the original 20s mark does NOT trigger timeout. Choice can still be submitted for full credit.
- **Action 3B:** In an unanswered round with Calm Mode active, toggle Calm Mode **OFF**.
- **Expected Result 3B:** Normal Mode resumes with a **fresh full 20-second timer**, preventing unfair timeouts caused by remaining fractional seconds.
- **Result:** **PASS** (Verified in engine tests and interactive testing).

### Test 4: Reset & Refresh Behavior
- **Action 4A:** Mid-game on route `#/play`, refresh the browser page.
- **Expected Result 4A:** Refreshed play route restarts at the Mission Briefing with fresh state (no corrupted partial timers).
- **Action 4B:** On results screen, click **Return Home**.
- **Expected Result 4B:** State resets completely, navigating to `#/` with clean landing page. Re-clicking "Play" starts fresh Round 1.
- **Result:** **PASS** (Verified in router lifecycle tests).

### Test 5: Boundary & Single Scoring Guarantee
- **Action 5A:** Repeatedly click / double-click a choice button rapidly.
- **Expected Result 5A:** The first click resolves the round and sets `answered = true`. Subsequent clicks are ignored; score is incremented at most once.
- **Action 5B:** Deliberately miss 1 or 2 rounds. Click **Practice Missed Rounds**.
- **Expected Result 5B:** A practice queue is launched containing *only* the missed scenario IDs (e.g. 1 or 2 rounds). The original run score is preserved and not overwritten.
- **Result:** **PASS** (Verified in `scripts/test-engine.js`).

---

## Offline & Zero-Secret Verification
- Zero network requests to third-party CDNs or external APIs during gameplay.
- All SVG illustrations, fonts, and scenario fixtures are bundled locally.
- Requires no `.env` file, database, or API keys.
