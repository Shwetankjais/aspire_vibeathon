# Disaster Dash product brief

Students and first-time players practice making a safe choice in a short disaster scenario and learn why the choice matters.

## Player journey

- **Home.** Show “Disaster Dash,” a brief promise such as “Make the call. Keep your village safe.” and one primary **Play Disaster Dash** button. A discreet **How to play** link reopens onboarding. Keep the story, villain, village, and gameplay inside the Play feature.
- **Tour.** Offer a skippable welcome on homepage startup and refresh. Three spotlight steps show where to start, how to choose, and what the feedback looks like. Use isolated sample UI from the real components, no active timer, and about 20 seconds of reading and clicking. Back, Next, Finish, Skip, and Escape work. Finish and Skip return focus to the homepage Play button. Returning home during ordinary navigation should preserve the tour dismissal until a full homepage reload or a manual replay.
- **Briefing.** The Disaster Devil threatens fictional Sundarpur by changing forms. The player is a village resident helping guide the response. Brief the player in one or two sentences. Provide **Start round**, the simulation note, and the Calm Mode toggle.
- **Three rounds.** Earthquake at the school, flood on a water-covered route, and home fire with a clear exit. Present three distinct choices per scene. An answer or timeout leads to inline feedback with the selected action, the safest action, and a brief reason. Wait for **Next round** or **See results**.
- **Debrief.** Show the original run score out of three, which locations were secured, and three safety takeaways. A perfect run lights up the village. On a missed answer or timeout, offer **Practice missed rounds** as a separate practice run with its own result. **Play again** starts a fresh three-round run. **Back to home** returns to the landing page.

## Visual direction

Draw from the OWASP NIE Upcoming Events section at https://owasp-website.onrender.com/ using a cream canvas, oversized dark typography, a pink underline, and a yellow pill CTA. Suggested home colors are cream #FAF7F0, ink #151515, and yellow #FFCE4A. Inside the game, reuse one village composition and give each hazard its own backdrop, accent, and illustration layer. Earthquake uses plum and amber, flood uses deep teal and aqua, and fire uses burgundy and ember. Keep choice positions and text contrast stable across scenes. Pair each theme with a text hazard label. Aim for a short crossfade and a small visual response to a safe choice. Use lightweight depth and layered motion if the core journey is verified. Respect reduced motion and keep keyboard focus visible.

## Calm Mode

The toggle is available in briefing, choice, and feedback. Turning it on immediately hides the countdown, cancels the timeout, suppresses hazard motion and urgency cues, and uses shorter scenario and explanation copy. It retains the current round, submitted answer if any, and scoring. Turning it off during an unanswered round starts a fresh full timer. Feedback stays untimed in either mode. Use a readable neutral surface with subtle hazard accents and a plain “Calm Mode on” status. Keep the simulation note visible in the briefing and game.

## Acceptance

The judge can finish the first scenario, read its explanation, enable Calm Mode from feedback, and advance into an untimed readable round. In a separate check, enable Calm Mode midway through a timed question, wait beyond its original deadline, and still submit. Complete all three scenarios, verify score and takeaways, and run the app without internet access. Check correct, incorrect, timeout, restart, missed-round practice, homepage refresh, keyboard, mobile, and reduced motion. Confirm no score can be awarded twice.
