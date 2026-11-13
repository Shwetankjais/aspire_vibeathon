/**
 * The Oracle's Journey - Eldrin Mentor Dialogue Sidecar
 * 
 * Fictional travel-journal guidance for Disaster Dash Calm Mode.
 * Factual safety guidance remains sourced from FEMA, NWS, and USFA fixtures.
 */

export const oracleJourney = {
  welcome: "I am Eldrin, Keeper of the Beacon. When panic clouds the mind like the Ashen Adversary of village lore, steady your breathing—let us walk Sundarpur's trails and review each crisis together.",
  closing: "The lantern burns steady over Sundarpur tonight. Keep these lessons in memory, traveller, for calm judgment in the first moments preserves life.",
  byScenarioId: {
    "school-earthquake": {
      intro: "The timbers of the primary school groan as the earth shudders beneath the classroom floor.",
      correct: "Well steadied—taking cover under the sturdy desk shields you from falling overhead fixtures while the ground settles.",
      incorrect: "Sudden tremors test the bravest heart; rushing into hallways or standing upright in open doorways leaves you vulnerable to falling debris."
    },
    "river-flood": {
      intro: "Monsoon runoff surges across the low roadway, while the dry ridge path stands clear behind you.",
      correct: "A prudent retreat—turning around and ascending to higher ground keeps you clear of unpredictable rushing currents.",
      incorrect: "Moving water conceals hidden washouts and easily carries away vehicles; stepping into swift water invites needless danger."
    },
    "home-fire": {
      intro: "Smoke gathers across the ceiling corridor, while the outside doorway remains unobstructed ahead.",
      correct: "Decisive and clear—moving immediately through the clear exit to the outside meeting place protects your lungs and saves lives.",
      incorrect: "No heirloom or belonging is worth precious seconds; when smoke begins to bank down, escaping outside immediately is the only safe choice."
    }
  }
};
