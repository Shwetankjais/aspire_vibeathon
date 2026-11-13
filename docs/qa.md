# Judge runbook and verification

## DOC-02 · Confirmed official documentation card

**Play the deployed game:** [Disaster Dash](https://shwetankjais.github.io/aspire_vibeathon/)

This submission packages the deployed application from main commit `96f14c98675e44c4511a31b5d40a522641c3ae61`. Sundarpur and its scenarios are fictional. The game uses bundled content and local scoring.

### Classic judge path · about 60 seconds

1. Open the live link and skip or finish the welcome tour. Select **Play Disaster Dash**, then **Start round**.
2. Observe the 20-second countdown. Choose **Drop, cover, and hold on under the desk**. Read the explanation.
3. Enable **Calm Mode** in feedback and select **Next round**. Confirm the flood round has a short prompt and no countdown.
4. Choose **Turn around and head to higher ground**. Advance and choose **Leave by the clear exit and go to the outside meeting place**.
5. Select **See results**. Expect **3 / 3**, three secured locations, and safety takeaways.

### Guided Classic judge path · The Oracle’s Journey

1. In the briefing, turn on **Calm Mode** and choose **Begin with Eldrin**. The school round opens with Eldrin’s journal and no countdown.
2. Use the **Eldrin guide** switch to hide and restore the journal. Turn Calm Mode off to start the timer, then turn it back on. The same question remains and Eldrin returns.
3. Choose **Drop, cover, and hold on under the desk**. Read the safety explanation and Eldrin’s response. For the missed-answer check, choose **Run for the stairs and head outside** instead. Switching Calm Mode off and back on during feedback restores Eldrin’s response and preserves the submitted answer.
4. In the flood round, choose **Turn around and head to higher ground**. In the fire round, choose **Leave by the clear exit and go to the outside meeting place**.
5. Select **See results**. Confirm Eldrin’s closing line and the safety takeaways. Expect **3 / 3** with all safe choices or **2 / 3** with the intentional miss.
6. Select **Play again**, leave Calm Mode on, and choose **Start round** to verify plain Calm Mode. The question has no countdown and Eldrin’s journal is hidden. The guide switch remains available.

### Visual Challenges judge path · about 60 seconds

1. From the classic result choose **Play again** to return to briefing, then select **Visual Challenges**. Calm Mode carries over between runs. Eldrin’s guide is available in Classic.
2. A run draws one scene and one Rapid Pick from four fixtures. In the dining hall, select the **Sturdy table**. At the flood junction, select the **Dry uphill path**. The matching labeled action button submits the same answer.
3. Read the explanation and safe-action demonstration. Select **Next round**.
4. For the Rapid Pick home fire, choose **Leave by the clear exit for the outside meeting place**. For the flooded road, choose **Turn around safely before reaching the water**. Cards support click, touch, Enter, and the displayed 1/2/3 order.
5. Select **See results**. Expect **2 / 2**, the two locations, and their takeaways. **Play again** draws a different pair. **Choose game mode** returns to briefing.

### Twist and recovery checks

- In timed mode, Rapid Pick reveals all three cards before starting its 20-second clock.
- Enable Calm Mode during a question. The same question remains answerable after the original deadline.
- Deliberately miss a visual answer and finish the run. **Practice missed rounds** replays its exact scenario and retains the original score separately.
- Refresh on the play route to restart at briefing.

### Fresh screenshots from the live build

- [Briefing with Begin with Eldrin](screenshots/eldrin-briefing.jpg)
- [Guided Classic question](screenshots/eldrin-classic-round.jpg)
- [Guided Classic result and closing line](screenshots/eldrin-classic-result.jpg)
- [Plain Calm Mode question](screenshots/eldrin-plain-calm.jpg)
- [Interactive visual scene](screenshots/eldrin-visual-scene.jpg)
- [Rapid Pick](screenshots/eldrin-rapid-pick.jpg)
- [Visual Challenges 2 / 2 result](screenshots/eldrin-visual-result.jpg)

The release passed the scenario and dialogue validators, engine tests, and production build. Live browser checks covered guided Classic, plain Calm Mode, and Visual Challenges. The ZIP’s production files match those served by GitHub Pages.

## DOC-03 · Five-test checklist

| Test | Action | Expected result |
| --- | --- | --- |
| Timeout | Leave the first question unanswered for 20 seconds. | **Time ran out** displays the safest action and reason. The choices are disabled. |
| Perfect run | Complete the classic judge path above. | The debrief shows 3 / 3 and the illuminated village. |
| Calm Mode | Enable Calm Mode in an unanswered timed round and wait past the original deadline. Then turn Calm Mode off. | The same question remains answerable. Turning the mode off starts a fresh 20-second countdown. |
| Refresh | Go home from a round, reload home, then reload the play route. | Navigation home preserves the tour dismissal. A home reload shows the welcome. A play reload opens briefing with a fresh run. |
| Scoring and practice | Submit a wrong answer, then finish with 2 / 3 and practice the miss. | Only the missed location reappears. Practice results show the original 2 / 3 separately. An answer can resolve each round only once. |

Codex checked both score paths, timeout, the tour with keyboard and Escape, the Calm Mode timer cancellation beyond its original deadline, timer restart, refresh, and missed-round practice in the browser. Codex also checked the 360-pixel layout after fixing overflow in the village scene and inspected the reduced-motion stylesheet rule. The scenario validator is available as `npm test`. These results refer to the integrated app. Independent verification of this version remains pending.
