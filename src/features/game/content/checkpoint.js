export const scenarios = [{
  id: 'school-earthquake',
  hazard: 'earthquake',
  location: 'Village school',
  title: 'The classroom shakes',
  prompt: 'You are inside the classroom when it starts shaking. A sturdy desk is within reach. What do you do?',
  calmPrompt: 'The room is shaking. A sturdy desk is nearby.',
  choices: [
    { id: 'door', label: 'Run outside through the school doors.', explanation: 'Falling objects could hit you on the way out.' },
    { id: 'cover', label: 'Drop, cover, and hold on under the desk.', explanation: 'The desk shields you from falling objects.' },
    { id: 'window', label: 'Stand beside the window and look out.', explanation: 'Glass can break and injure you.' },
  ],
  correctChoiceId: 'cover',
  takeaway: 'Indoors during shaking, drop, cover, and hold on.',
  sourceUrl: 'https://www.ready.gov/sites/default/files/2024-03/ready-gov_full-suite_hazard-info-sheets.pdf',
}];
