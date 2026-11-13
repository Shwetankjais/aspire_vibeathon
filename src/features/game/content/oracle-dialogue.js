// Fictional dialogue only. Safety guidance comes from the classic scenarios.
export const oracleJourney = {
  welcome: 'I’m Eldrin, Keeper of the Beacon. I’ll walk with you through Sundarpur and mark what you learn on my map.',
  closing: 'Our walk ends here. Keep what you learned close, and return whenever you want more practice.',
  byScenarioId: {
    'school-earthquake': {
      intro: 'Our first page opens in the village school, where the desks are rattling.',
      correct: 'You made a clear choice even as the room shook.',
      incorrect: 'Take a breath. We can turn this moment into something worth remembering.',
    },
    'river-flood': {
      intro: 'At the river crossing, the road on my map has disappeared beneath the water.',
      correct: 'You found a way forward by knowing when to turn back.',
      incorrect: 'It’s easy to fix on the road ahead. Let’s look at the other route together.',
    },
    'home-fire': {
      intro: 'Our last page opens at a village home, where the alarm breaks the quiet.',
      correct: 'You kept your attention on getting outside.',
      incorrect: 'There’s a lot to think about when an alarm sounds. Let’s go over this choice together.',
    },
  },
};
