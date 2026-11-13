/**
 * Disaster Dash - Authoritative Fictional Scenario Content
 * 
 * Fictional Village of Sundarpur facing three hazards:
 * 1. Earthquake at the Village School
 * 2. Flash flood at the River Crossing Road
 * 3. Fire at the Village Home
 *
 * Designed in compliance with primary safety guidance:
 * - FEMA Earthquake Safety / Ready.gov
 * - FEMA CERT Flood Guidance / NWS "Turn Around Don't Drown"
 * - U.S. Fire Administration (USFA) Home Fire Escape Guidelines
 */

export const scenarios = [
  {
    id: "school-earthquake",
    hazard: "earthquake",
    location: "Village school",
    title: "The classroom shakes",
    prompt: "The second-floor classroom starts shaking. The lights swing, and a sturdy desk is within reach. What do you do?",
    calmPrompt: "The room is shaking. A sturdy desk is nearby.",
    choices: [
      {
        id: "run-stairwell",
        label: "Run for the stairs and head outside.",
        explanation: "Shaking makes it easy to fall, and debris can fall along the way."
      },
      {
        id: "drop-cover-hold",
        label: "Drop, cover, and hold on under the desk.",
        explanation: "Getting low helps you keep your balance. The desk provides cover from falling objects."
      },
      {
        id: "stand-doorway",
        label: "Stand in the classroom doorway.",
        explanation: "The doorway leaves you exposed to falling objects."
      }
    ],
    correctChoiceId: "drop-cover-hold",
    takeaway: "During an earthquake indoors: Drop, Cover, and Hold On under a sturdy desk or table until shaking stops.",
    sourceUrl: "https://www.ready.gov/sites/default/files/2024-03/ready-gov_full-suite_hazard-info-sheets.pdf"
  },
  {
    id: "river-flood",
    hazard: "flood",
    location: "River crossing road",
    title: "Rising brown water on the road",
    prompt: "Fast-moving floodwater covers the road ahead. You can return to higher ground by the route you came from. What do you do?",
    calmPrompt: "Floodwater covers the road. The way back to higher ground is clear.",
    choices: [
      {
        id: "wade-quickly",
        label: "Test the depth with a stick and wade across.",
        explanation: "Moving water can knock you down and hide damage to the road."
      },
      {
        id: "drive-scooter",
        label: "Ride a scooter quickly through the water.",
        explanation: "The current can sweep vehicles off the road."
      },
      {
        id: "turn-around-high-ground",
        label: "Turn around and head to higher ground.",
        explanation: "Turning back keeps you out of the current."
      }
    ],
    correctChoiceId: "turn-around-high-ground",
    takeaway: "When floodwater covers a road, turn back and head to higher ground.",
    sourceUrl: "https://www.weather.gov/safety/flood-turn-around-dont-drown"
  },
  {
    id: "home-fire",
    hazard: "fire",
    location: "Village home",
    title: "The smoke alarm sounds",
    prompt: "Smoke is coming from a room across the house. The path to the outside door beside you is clear. What do you do?",
    calmPrompt: "The alarm is sounding. The way outside is clear.",
    choices: [
      {
        id: "use-clear-exit",
        label: "Leave by the clear exit and go to the outside meeting place.",
        explanation: "Leaving immediately gets you out before smoke or fire can block the exit."
      },
      {
        id: "grab-valuables-run",
        label: "Gather your belongings before leaving.",
        explanation: "Gathering belongings delays your escape."
      },
      {
        id: "hide-in-closet",
        label: "Hide in a closet and wait.",
        explanation: "Hiding keeps you inside while smoke can spread."
      }
    ],
    correctChoiceId: "use-clear-exit",
    takeaway: "When the way out is clear, leave immediately and stay outside.",
    sourceUrl: "https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/home-fire-escape-plans/"
  }
];
