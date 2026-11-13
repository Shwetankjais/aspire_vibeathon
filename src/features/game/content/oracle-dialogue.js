/**
 * The Oracle's Journey - Eldrin Mentor Dialogue Sidecar
 *
 * Fictional travel-journal guidance for Disaster Dash Calm Mode.
 * Factual safety guidance remains sourced from FEMA, NWS, and USFA fixtures.
 */

export const oracleJourney = {
  welcome: "I am Eldrin, Keeper of the Beacon. The Ashen Adversary is what our village stories call fear. Let’s walk Sundarpur together.",
  closing: "The lantern burns steady over Sundarpur tonight. Keep these lessons close, traveller.",
  byScenarioId: {
    "school-earthquake": {
      intro: "The timbers of the village school groan as the classroom floor shakes.",
      correct: "Well steadied. You kept your focus as the room shook.",
      incorrect: "A shaking room can be disorienting. Take a breath and read what happened."
    },
    "river-flood": {
      intro: "The road on my map disappears beneath the floodwater, but the way back uphill is clear.",
      correct: "You saw a way forward by knowing when to turn back.",
      incorrect: "It’s easy to focus on the road ahead. Let’s look at the other route together."
    },
    "home-fire": {
      intro: "The alarm breaks the quiet at a village home. The way to the outside door is clear.",
      correct: "You kept your attention on getting outside.",
      incorrect: "An alarm can make it hard to think. Let’s go over this choice together."
    }
  }
};
