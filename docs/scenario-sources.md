# Scenario sources

The characters, places, and situations in Disaster Dash are fictional. The app bundles its text locally.

## Original scenarios

- **Earthquake at the village school.** The player is indoors during shaking and a sturdy desk is within reach. FEMA recommends dropping down, taking cover under sturdy furniture, and holding on. [FEMA Earthquake Hazard Information Sheet](https://www.ready.gov/sites/default/files/2024-03/ready-gov_full-suite_hazard-info-sheets.pdf)
- **Flood at the river crossing.** Fast-moving water covers the road and there is a clear route back to higher ground. The National Weather Service recommends turning around at a flooded road and getting to higher ground. [National Weather Service flood guidance](https://www.weather.gov/safety/flood-turn-around-dont-drown)
- **Fire at the village home.** A fire is elsewhere in the house and there is a clear route to an exterior door. The U.S. Fire Administration recommends leaving immediately and going to an outdoor meeting place. [U.S. Fire Administration escape planning](https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/home-fire-escape-plans/)

## Rapid Pick expansion scenarios

- **Rapid Pick 1: Fire (`rapid-home-fire`).** Smoke is filling the corridor, but an outside exit door is immediately clear.
  - *Source Guidance:* [U.S. Fire Administration escape planning](https://www.usfa.fema.gov/prevention/home-fires/prepare-for-fire/home-fire-escape-plans/)
  - *Safe Choice (`leave-for-meeting-place`):* Leave immediately through the clear exit for the designated outside meeting place. Escaping without delay prevents smoke inhalation, which is the leading cause of fire casualties.
  - *Unsafe Choices:* Searching for laptops, phones, or valuables (`collect-belongings`) delays evacuation during rapid flashover; hiding indoors in a closet (`hide-indoors`) traps occupants as smoke infiltrates and delays discovery by rescue teams.
- **Rapid Pick 2: Flood (`rapid-flood-road`).** A driver approaches a water-covered road section with swift current while the shoulder/turnaround path is clear.
  - *Source Guidance:* [FEMA CERT flood guidance](https://www.ready.gov/sites/default/files/2019.CERT_.HazardAnnexes.PM_.FINAL_.508c.pdf) and NOAA / NWS "Turn Around Don't Drown".
  - *Safe Choice (`turn-around-safely`):* Turn around safely and seek an elevated detour. Keeping vehicles off flooded roads avoids swift water and hidden roadbed washouts.
  - *Unsafe Choices:* Driving through slowly (`drive-through-slowly`) risks stalling and vehicle float in as little as 12 inches of water; following another vehicle into the water (`follow-vehicle-water`) exposes the car to turbulent wakes and offers zero protection against buoyant sweep.
