// src/lib/tif.ts
// Invisible Infrastructure Qualification System (TIF v1.0)
// Evaluates inbound prospects against MTM's institutional qualification standards.

export interface TifBreakdown {
  retainerAffordability: number;
  localAiDependency: number;
  competitiveDefensibility: number;
  lowLegalLiability: number;
}

export type TifTier = 'HOLD' | 'WAITING_LIST' | 'DRAFT_PICK';

export interface TifEvaluation {
  score: number;
  tier: TifTier;
  isDraftPick: boolean;
  disqualified: boolean;
  disqualificationReason?: string;
  breakdown: TifBreakdown;
  craftLabel: string;
  territoryNotes: string;
}

const DISQUALIFIER_REGEXES: { pattern: RegExp; reason: string }[] = [
  {
    pattern: /\b(medical|doctor|physician|dental|dentist|orthodont|medspa|med-spa|clinic|surgery|pediatric|chiropract|optometr|healthcare|wellness clinic|dermatolog)\b/i,
    reason: 'Medical, dental, and medspa practices are strictly excluded under MTM risk policy.',
  },
  {
    pattern: /\b(lawyer|attorney|law firm|legal|litigation|paralegal|counsel|juris)\b/i,
    reason: 'Regulated legal practice is strictly excluded under MTM compliance rules.',
  },
  {
    pattern: /\b(financial advisor|wealth advisor|financial planning|wealth management|stockbroker|retail finance|crypto|brokerage|insurance agent|mortgage broker)\b/i,
    reason: 'Retail financial and investment advice is excluded under MTM compliance rules.',
  },
];

const CRAFT_METADATA: Record<
  string,
  { label: string; breakdown: TifBreakdown }
> = {
  BUILDER: {
    label: 'Custom Luxury Home Builder',
    breakdown: {
      retainerAffordability: 25,
      localAiDependency: 25,
      competitiveDefensibility: 25,
      lowLegalLiability: 20,
    },
  },
  REALTOR: {
    label: 'Luxury Real Estate Advisor',
    breakdown: {
      retainerAffordability: 23,
      localAiDependency: 25,
      competitiveDefensibility: 22,
      lowLegalLiability: 20,
    },
  },
  POOL_OUTDOOR: {
    label: 'Custom Pool & Outdoor Living Architect',
    breakdown: {
      retainerAffordability: 23,
      localAiDependency: 23,
      competitiveDefensibility: 22,
      lowLegalLiability: 20,
    },
  },
  SMART_HOME_AV: {
    label: 'Smart Home Automation & Estate Audio/Video',
    breakdown: {
      retainerAffordability: 22,
      localAiDependency: 22,
      competitiveDefensibility: 22,
      lowLegalLiability: 20,
    },
  },
  EURO_AUTO: {
    label: 'European Automotive & Performance Specialist',
    breakdown: {
      retainerAffordability: 20,
      localAiDependency: 22,
      competitiveDefensibility: 20,
      lowLegalLiability: 20,
    },
  },
  REMODEL_LANDSCAPE: {
    label: 'Bespoke Architectural Remodeling & Landscape',
    breakdown: {
      retainerAffordability: 20,
      localAiDependency: 20,
      competitiveDefensibility: 20,
      lowLegalLiability: 20,
    },
  },
};

const ARTISANAL_CRAFT_INDICATORS = [
  'cabinet',
  'millwork',
  'woodwork',
  'stone',
  'marble',
  'masonry',
  'interior',
  'architect',
  'equestrian',
  'aviation',
  'yacht',
  'concierge',
  'artisan',
  'iron',
  'metalwork',
  'roofing',
];

export function evaluateTif(params: {
  companyName: string;
  craftVector: string;
  craftOtherSpecification?: string;
  zipCode: string;
}): TifEvaluation {
  const { companyName, craftVector, craftOtherSpecification, zipCode } = params;
  const combinedText = `${companyName} ${craftOtherSpecification || ''}`.trim();

  // 1. Check Automatic Disqualifiers
  for (const dq of DISQUALIFIER_REGEXES) {
    if (dq.pattern.test(combinedText)) {
      return {
        score: 25,
        tier: 'HOLD',
        isDraftPick: false,
        disqualified: true,
        disqualificationReason: dq.reason,
        breakdown: {
          retainerAffordability: 5,
          localAiDependency: 10,
          competitiveDefensibility: 10,
          lowLegalLiability: 0,
        },
        craftLabel: craftOtherSpecification || 'Excluded Category',
        territoryNotes: `Disqualified inquiry logged to research vault for market telemetry (${zipCode}).`,
      };
    }
  }

  // 2. Score standard or custom craft
  let breakdown: TifBreakdown;
  let craftLabel = 'Custom Specialist';

  if (CRAFT_METADATA[craftVector]) {
    breakdown = CRAFT_METADATA[craftVector].breakdown;
    craftLabel = CRAFT_METADATA[craftVector].label;
  } else {
    craftLabel = craftOtherSpecification || 'Other Craft Specialty';
    const lowerSpec = (craftOtherSpecification || '').toLowerCase();
    const isArtisanal = ARTISANAL_CRAFT_INDICATORS.some((w) => lowerSpec.includes(w));

    if (isArtisanal) {
      breakdown = {
        retainerAffordability: 20,
        localAiDependency: 20,
        competitiveDefensibility: 19,
        lowLegalLiability: 19,
      };
    } else {
      breakdown = {
        retainerAffordability: 15,
        localAiDependency: 15,
        competitiveDefensibility: 15,
        lowLegalLiability: 15,
      };
    }
  }

  const score =
    breakdown.retainerAffordability +
    breakdown.localAiDependency +
    breakdown.competitiveDefensibility +
    breakdown.lowLegalLiability;

  let tier: TifTier = 'HOLD';
  let isDraftPick = false;

  if (score >= 85) {
    tier = 'DRAFT_PICK';
    isDraftPick = true;
  } else if (score >= 70) {
    tier = 'WAITING_LIST';
    isDraftPick = false;
  } else {
    tier = 'HOLD';
    isDraftPick = false;
  }

  const territoryNotes =
    tier === 'DRAFT_PICK'
      ? `First-round candidate. Territory seat open for dispatch in zip ${zipCode}.`
      : tier === 'WAITING_LIST'
      ? `Territory seat held on waiting list under Sun & 3 Kings scarcity in zip ${zipCode}.`
      : `Inquiry held for manual review in zip ${zipCode}.`;

  return {
    score,
    tier,
    isDraftPick,
    disqualified: false,
    breakdown,
    craftLabel,
    territoryNotes,
  };
}
