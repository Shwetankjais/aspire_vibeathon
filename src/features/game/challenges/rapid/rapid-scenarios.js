/**
 * Rapid Pick Fictional Scenario Fixtures
 *
 * Sourced according to Disaster Dash Expansion Guidelines:
 * - Rapid Pick 1 (Fire): U.S. Fire Administration home fire escape planning
 * - Rapid Pick 2 (Flood): FEMA CERT flood guidance / NOAA Turn Around Don't Drown
 */

export const rapidScenarios = [
  {
    id: "rapid-home-fire",
    hazard: "fire",
    format: "rapid",
    location: "Village home",
    title: "Smoke spreads toward the exit",
    prompt: "Smoke is coming from another room. The path to the outside door beside you is clear. What is your immediate call?",
    calmPrompt: "Smoke is spreading. The way outside is clear.",
    choices: [
      {
        id: "collect-belongings",
        label: "Collect your belongings before leaving.",
        explanation: "Searching for items wastes critical seconds as toxic smoke thickens rapidly and reduces visibility."
      },
      {
        id: "leave-for-meeting-place",
        label: "Leave by the clear exit for the outside meeting place.",
        explanation: "Leaving immediately gets you out safely before toxic smoke or flames cut off your exit."
      },
      {
        id: "hide-indoors",
        label: "Hide indoors and wait for help.",
        explanation: "Hiding traps you inside the burning structure and cuts off accessible escape routes."
      }
    ],
    correctChoiceId: "leave-for-meeting-place",
    takeaway: "In a home fire, leave immediately by the clear exit for your outside meeting place without stopping for belongings.",
    sourceUrl: "https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/home-fire-escape-plans/"
  },
  {
    id: "rapid-flood-road",
    hazard: "flood",
    format: "rapid",
    location: "Village access road",
    title: "Water across the roadway",
    prompt: "You are driving toward a flooded road section with moving water, and you can still safely turn around. What do you do?",
    calmPrompt: "Floodwater covers the road ahead. You have plenty of room to turn around safely.",
    choices: [
      {
        id: "drive-through-slowly",
        label: "Drive forward slowly through the water to gauge the depth.",
        explanation: "Floodwater can hide a washed-out road or sweep a vehicle away."
      },
      {
        id: "follow-vehicle-water",
        label: "Follow closely behind another vehicle entering the water.",
        explanation: "Another vehicle crossing cannot show you whether the water or road is safe."
      },
      {
        id: "turn-around-safely",
        label: "Turn around safely before reaching the water.",
        explanation: "Turning back keeps you and your vehicle completely out of dangerous moving floodwaters."
      }
    ],
    correctChoiceId: "turn-around-safely",
    takeaway: "Turn Around Don't Drown! Never drive into floodwater covering a road when you can safely turn around.",
    sourceUrl: "https://www.ready.gov/sites/default/files/2019.CERT_.HazardAnnexes.PM_.FINAL_.508c.pdf"
  }
];
