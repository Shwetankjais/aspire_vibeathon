/**
 * Vector illustrations for Rapid Pick Arcade Target Cards
 */

export const RAPID_ICONS = {
  // Fire Scene Icons
  'leave-for-meeting-place': `
    <svg viewBox="0 0 80 80" class="rapid-card-svg" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="80" height="80" rx="12" fill="#ECFDF5"/>
      <path d="M48 18H28C25.79 18 24 19.79 24 22V58C24 60.21 25.79 62 28 62H48" stroke="#059669" stroke-width="4" stroke-linecap="round"/>
      <path d="M38 40H60M60 40L50 30M60 40L50 50" stroke="#10B981" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="56" cy="24" r="4" fill="#047857"/>
    </svg>
  `,
  'collect-belongings': `
    <svg viewBox="0 0 80 80" class="rapid-card-svg" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="80" height="80" rx="12" fill="#FEF2F2"/>
      <!-- Laptop -->
      <rect x="20" y="24" width="34" height="22" rx="3" stroke="#DC2626" stroke-width="3" fill="#FFFFFF"/>
      <path d="M14 49H60" stroke="#DC2626" stroke-width="4" stroke-linecap="round"/>
      <!-- Phone -->
      <rect x="44" y="32" width="18" height="26" rx="3" stroke="#B91C1C" stroke-width="3" fill="#FEE2E2"/>
      <circle cx="53" cy="52" r="2" fill="#B91C1C"/>
      <!-- Warning Alert -->
      <circle cx="60" cy="20" r="8" fill="#EF4444"/>
      <path d="M60 16V21M60 23.5V24.5" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
  'hide-indoors': `
    <svg viewBox="0 0 80 80" class="rapid-card-svg" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="80" height="80" rx="12" fill="#FFFBEB"/>
      <!-- Closet Door -->
      <rect x="22" y="16" width="36" height="48" rx="2" stroke="#D97706" stroke-width="3.5" fill="#FEF3C7"/>
      <line x1="40" y1="16" x2="40" y2="64" stroke="#D97706" stroke-width="2.5"/>
      <circle cx="36" cy="40" r="2.5" fill="#78350F"/>
      <circle cx="44" cy="40" r="2.5" fill="#78350F"/>
      <!-- Trapped Hazard Symbol -->
      <path d="M58 20L66 32H50L58 20Z" fill="#F59E0B" stroke="#B45309" stroke-width="1.5"/>
      <text x="58" y="30" font-size="9" font-weight="900" fill="#78350F" text-anchor="middle">!</text>
    </svg>
  `,

  // Flood Scene Icons
  'turn-around-safely': `
    <svg viewBox="0 0 80 80" class="rapid-card-svg" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="80" height="80" rx="12" fill="#ECFDF5"/>
      <!-- U-Turn Arrow -->
      <path d="M52 54V34C52 25.16 44.84 18 36 18C27.16 18 20 25.16 20 34V52" stroke="#059669" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M12 44L20 54L28 44" stroke="#059669" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Safe High Ground Mountain -->
      <path d="M52 46L60 34L68 46H52Z" fill="#10B981" stroke="#047857" stroke-width="2"/>
    </svg>
  `,
  'drive-through-slowly': `
    <svg viewBox="0 0 80 80" class="rapid-card-svg" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="80" height="80" rx="12" fill="#FEF2F2"/>
      <!-- Water Waves -->
      <path d="M14 52C20 48 26 56 32 52C38 48 44 56 50 52C56 48 62 56 68 52" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/>
      <path d="M14 62C20 58 26 66 32 62C38 58 44 66 50 62C56 58 62 66 68 62" stroke="#0369A1" stroke-width="3" stroke-linecap="round"/>
      <!-- Sinking Car Silhouette -->
      <path d="M22 46L28 34H48L56 46H22Z" fill="#EF4444" stroke="#991B1B" stroke-width="2"/>
      <circle cx="30" cy="48" r="4" fill="#1F2937"/>
      <circle cx="48" cy="48" r="4" fill="#1F2937"/>
    </svg>
  `,
  'follow-vehicle-water': `
    <svg viewBox="0 0 80 80" class="rapid-card-svg" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="80" height="80" rx="12" fill="#FFFBEB"/>
      <!-- Lead Vehicle -->
      <rect x="42" y="24" width="22" height="18" rx="2" fill="#94A3B8" stroke="#475569" stroke-width="2"/>
      <!-- Trailing Vehicle following into water -->
      <rect x="18" y="34" width="20" height="16" rx="2" fill="#F59E0B" stroke="#B45309" stroke-width="2"/>
      <!-- Rising Flood Current -->
      <path d="M12 56C24 50 36 62 48 56C60 50 70 60 76 56" stroke="#0284C7" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M12 66C24 60 36 72 48 66C60 60 70 70 76 66" stroke="#0369A1" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `,

  default: `
    <svg viewBox="0 0 80 80" class="rapid-card-svg" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="80" height="80" rx="12" fill="#F1F5F9"/>
      <circle cx="40" cy="40" r="18" stroke="#64748B" stroke-width="4"/>
      <path d="M40 30V40L46 46" stroke="#64748B" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `
};
