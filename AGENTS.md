# Disaster Dash agent instructions

Read PRD.md, ARCHITECTURE.md, DECISIONS.md, TASKS.md, CONTEXT.md, and SUBMISSION.md before editing. Check the latest peer handoff and confirm your branch and file ownership.

## Event requirements

- Deliver a browser-first prototype with bundled fictional scenarios, assets, and local calculations. The normal preview must require no external or authority API, paid service, login provider, database setup, secret key, or .env. Keep runtime fonts, art, and effects local. Keep credentials and personal data out of code, prompts, screenshots, and the submission.
- Build a real start-to-result journey first. Ship at least three short scenarios covering earthquake, flood, and fire. Normal mode uses timed choices. Each answer or timeout gets a readable explanation. Results show score and safety learning points.
- The revealed twist is **Calm Mode**. Provide a visible, reversible toggle with no countdown pressure, low stimulation, and short instructions. The same game and scoring must work untimed. Show the note **“Educational simulation, not live emergency advice.”** Use prewritten conservative tips tied to the exact situations.
- Use the submission checklist and complete the selected documentation card. If a shareable working preview is unavailable, provide a short screen recording and the two screenshots with the source.

## Working rules

- Keep feature code together and give each file one responsibility. Separate UI, state transitions, scenario content, and theme tokens. Follow existing repo conventions when compatible. Keep scope focused and make every visible control work.
- Use separate worktrees or clones. Verify the remote, current branch, baseline SHA, and working tree. Preserve existing user changes. Stage only owned files. Commit each completed task after focused verification and push the assigned branch when access permits. Keep a local commit and report its SHA if pushing fails.
- Codex owns application code, root coordination files, and integration. Antigravity owns scenario fixtures, their source notes, README, and submission documentation. Each agent writes progress to its own file under docs/. Use relay messages for contract changes and integration requests. The lead updates TASKS.md, CONTEXT.md, and DECISIONS.md at integration checkpoints.
- Verify the actual browser flow. Report results and any unverified items clearly. Keep an integrated commit SHA with the evidence. Maintain a clean user interface and preserve readable text during every theme change.
