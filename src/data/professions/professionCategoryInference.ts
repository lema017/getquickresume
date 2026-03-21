import type { ProfessionCategoryId } from './types';

const CATEGORY_RULES: Array<{ id: ProfessionCategoryId; re: RegExp }> = [
  { id: 'education', re: /teacher|educat|professor|principal|tutor|instructional|curriculum|academic|school|kindergarten/i },
  { id: 'healthcare', re: /nurse|medical|clinical|physician|surgeon|dental|pharmacy|therapist|patient|hospital|caregiver|paramedic|radiology|icu\b|rn\b|lpn\b/i },
  { id: 'legal', re: /attorney|lawyer|paralegal|counsel|litigation|compliance\s+officer|legal\s+assistant/i },
  {
    id: 'engineering',
    re: /software|developer|engineer|devops|\bsre\b|programmer|frontend|back-?end|full-?stack|cloud|data\s+scientist|machine\s+learning|\bml\b|qa\b|quality\s+assurance|embedded|electrical\s+engineer|mechanical\s+engineer|civil\s+engineer|network\s+admin/i,
  },
  {
    id: 'finance',
    re: /account|audit|tax|bookkeep|payroll|cfo|controller|ledger|treasur|fp&a|reconcil|gaap|\bcpa\b|financial|bank|credit|mortgage|underwrit|investment|equity\s+research/i,
  },
  { id: 'sales', re: /sales|\bsdr\b|\bbdr\b|business\s+development|account\s+executive/i },
  { id: 'design', re: /designer|\bux\b|\bui\b|graphic|creative\s+director|illustrator|motion/i },
  { id: 'operations', re: /operations|logistics|supply\s+chain|warehouse|procurement|fulfillment/i },
  { id: 'hospitality', re: /hotel|chef|restaurant|culinary|banquet|bartender|hospitality|concierge|housekeep/i },
  { id: 'trades', re: /electrician|plumber|hvac|carpenter|welder|mason|roofer|technician|construction|landscap/i },
];

export function inferProfessionCategory(profession: {
  slug: string;
  title: string;
  categoryId?: ProfessionCategoryId;
}): ProfessionCategoryId {
  if (profession.categoryId) return profession.categoryId;
  const blob = `${profession.slug} ${profession.title}`.toLowerCase();
  for (const { id, re } of CATEGORY_RULES) {
    if (re.test(blob)) return id;
  }
  return 'general';
}
