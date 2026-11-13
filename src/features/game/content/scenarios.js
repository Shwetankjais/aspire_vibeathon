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
    prompt: "A sudden rumble turns into violent ground shaking in your second-floor classroom. Heavy ceiling fixtures swing and desks rattle. What do you do?",
    calmPrompt: "The classroom is shaking. A sturdy wooden desk is right next to you.",
    choices: [
      {
        id: "drop-cover-hold",
        label: "Drop to your hands and knees, take cover under the sturdy desk, and hold on firmly.",
        explanation: "Dropping down shields your vital organs and prevents you from being thrown off balance, while the desk protects against falling lights, plaster, and ceiling debris."
      },
      {
        id: "run-stairwell",
        label: "Rush out immediately toward the hallway and stairwell to get outside.",
        explanation: "Running during severe ground shaking is a leading cause of fractures and head trauma from collapsing architectural fixtures, falling glass, and tripping on stairs."
      },
      {
        id: "stand-doorway",
        label: "Stand upright braced inside the classroom doorframe until the shaking stops.",
        explanation: "Modern building doorways are not structurally reinforced compared to surrounding walls and leave your head and body completely exposed to flying debris."
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
    prompt: "Monsoon runoff has swollen Sundarpur creek across the main low-lying village road. Brown water is moving swiftly over the asphalt at an unknown depth. What do you do?",
    calmPrompt: "Swift brown water is flowing across the road ahead. You can see higher ground on the hillside behind you.",
    choices: [
      {
        id: "turn-around-high-ground",
        label: "Turn around immediately and head to higher ground along the elevated village ridge.",
        explanation: "Moving away from floodwaters and staying on elevated roads is the only reliable way to prevent being swept into deep ditches or culverts."
      },
      {
        id: "wade-quickly",
        label: "Step into the current carefully with a stick to test the depth and wade across.",
        explanation: "Just six inches of fast-moving water can knock a full-grown adult off their feet, and submerged sinkholes or downed lines are invisible beneath muddy water."
      },
      {
        id: "drive-scooter",
        label: "Accelerate your scooter quickly across the bridge before the water level rises further.",
        explanation: "Moving water can stall engines instantly and buoyant force will sweep vehicles and two-wheelers off roadways in under twelve inches of water."
      }
    ],
    correctChoiceId: "turn-around-high-ground",
    takeaway: "Turn Around Don't Drown! Never walk, wade, or drive through moving water of unknown depth.",
    sourceUrl: "https://www.ready.gov/sites/default/files/2019.CERT_.HazardAnnexes.PM_.FINAL_.508c.pdf"
  },
  {
    id: "home-fire",
    hazard: "fire",
    location: "Village home",
    title: "Smoke in the bedroom corridor",
    prompt: "The smoke alarm blares at night. Dark, acrid smoke is seeping under your closed bedroom door. You need to escape the house safely. What do you do?",
    calmPrompt: "The smoke alarm is sounding and grey haze is rising. You need to reach the front door exit.",
    choices: [
      {
        id: "crawl-low-feel-door",
        label: "Crawl low beneath the smoke layer, test the door handle with the back of your hand, and exit through the primary clear pathway.",
        explanation: "Cooler, breathable air stays within 12 to 24 inches of the floor. Checking the door with the back of your hand prevents palm burns and warns if fire is on the other side."
      },
      {
        id: "grab-valuables-run",
        label: "Stand upright, grab your phone, laptop, and school bag, and run swiftly through the hall.",
        explanation: "Inhaling superheated toxic gases can cause unconsciousness within seconds; searching for belongings wastes the few crucial minutes needed to escape safely."
      },
      {
        id: "hide-in-closet",
        label: "Retreat into the bedroom closet, close the door, and cover yourself in thick blankets.",
        explanation: "Hiding in enclosed spaces traps you inside the structure, makes it difficult for firefighters to locate you, and smoke will still penetrate closed closet doors."
      }
    ],
    correctChoiceId: "crawl-low-feel-door",
    takeaway: "In a home fire: Get low, check doors for heat before opening, and get out fast without stopping for belongings.",
    sourceUrl: "https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/home-fire-escape-plans/"
  }
];
