# Judge runbook and verification

## DOC-02 · 60-second judge demo

1. Open the local production preview. Skip the welcome, then choose **Play Disaster Dash** and **Start round**. The classroom question starts with a 20-second timer.
2. Choose **Drop, cover, and hold on under the desk**. Read the feedback, turn on **Calm Mode**, then choose **Next round**. The flood question has a short prompt and an untimed layout.
3. Choose **Turn around and head to higher ground**. Advance, then choose **Leave by the clear exit and go to the outside meeting place**. Select **See results**. Expect 3 / 3, three secured locations, and links to the safety sources.

Sundarpur and its hazards are fictional. Choices, scoring, and feedback run locally.

## DOC-03 · Five-test checklist

| Test | Action | Expected result |
| --- | --- | --- |
| Timeout | Leave the first question unanswered for 20 seconds. | **Time ran out** displays the safest action and reason. The choices are disabled. |
| Perfect run | Complete the judge demo above. | The debrief shows 3 / 3 and the illuminated village. |
| Calm Mode | Enable Calm Mode in an unanswered timed round and wait past the original deadline. Then turn Calm Mode off. | The same question remains answerable. Turning the mode off starts a fresh 20-second countdown. |
| Refresh | Go home from a round, reload home, then reload the play route. | Navigation home preserves the tour dismissal. A home reload shows the welcome. A play reload opens briefing with a fresh run. |
| Scoring and practice | Submit a wrong answer, then finish with 2 / 3 and practice the miss. | Only the missed location reappears. Practice results show the original 2 / 3 separately. An answer can resolve each round only once. |

Codex checked both score paths, timeout, the tour with keyboard and Escape, the Calm Mode timer cancellation beyond its original deadline, timer restart, refresh, and missed-round practice in the browser. Codex also checked the 360-pixel layout after fixing overflow in the village scene and inspected the reduced-motion stylesheet rule. The scenario validator is available as `npm test`. These results refer to the integrated app. Independent verification of this version remains pending.
