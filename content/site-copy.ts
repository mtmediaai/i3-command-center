// STAGED COPY — Phase B (Moolah) replaces values only.

export interface SiteCopy {
  header: {
    brandName: string;
    brandMonogramAlt: string;
    nav: {
      palace: { label: string; url: string };
      founder: { label: string; url: string };
      network: { label: string; url: string };
    };
  };
  hero: {
    eyebrow: string;
    h1: string;
    subhead: string;
    primaryCta: string;
    ghostCta: { label: string; url: string };
    preferredSourcesLabel: string;
    preferredSourcesFallbackUrl: string;
  };
  oldWay: {
    eyebrow: string;
    heading: string;
    description: string;
    // Stat slots exist as EMPTY keyed placeholders (Phase B fills from Appendix C)
    stats: {
      stat1: { value: string; label: string; source: string; date: string };
      stat2: { value: string; label: string; source: string; date: string };
      stat3: { value: string; label: string; source: string; date: string };
      stat4: { value: string; label: string; source: string; date: string };
    };
  };
  newWay: {
    eyebrow: string;
    heading: string;
    description: string;
    pillars: Array<{
      title: string;
      body: string;
    }>;
  };
  evidence: {
    eyebrow: string;
    heading: string;
    description: string;
    figures: Array<{
      id: string;
      caption: string;
      description: string;
    }>;
  };
  endcap: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaUrl: string;
  };
  cta: {
    eyebrow: string;
    heading: string;
    description: string;
    buttonText: string;
    preferredSourcesFallbackUrl: string;
  };
  footer: {
    disclaimer: string;
    aiDisclosure: string;
    location: string;
    attributionSeal: string;
    entityHandle: string;
    links: {
      github: { label: string; url: string };
      linkedin: { label: string; url: string };
      palace: { label: string; url: string };
    };
    privacyLine: string;
  };
  modal: {
    title: string;
    description: string;
    fields: {
      fullName: { label: string; placeholder: string };
      businessName: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      website: { label: string; placeholder: string };
      category: {
        label: string;
        options: Record<string, string>;
      };
      linkedinUrl: { label: string; placeholder: string };
      consent: { label: string };
    };
    submitButton: string;
    submittingButton: string;
    successMessage: string;
    errorMessage: string;
    closeButton: string;
  };
}

export const siteCopy: SiteCopy = {
  header: {
    brandName: 'I³ Command Center',
    brandMonogramAlt: 'MT Media AI Monogram',
    nav: {
      palace: {
        label: 'Palace Hub',
        url: 'https://mtmediaai.com',
      },
      founder: {
        label: 'Architect Office',
        url: 'https://kareem.mtmediaai.com',
      },
      network: {
        label: 'LinkedIn Presence',
        url: 'https://www.linkedin.com/company/mtmediaai',
      },
    },
  },
  hero: {
    eyebrow: 'Sovereign Intelligence Diagnostic',
    h1: 'Rescuing Legacy From AI Erasure.',
    subhead: 'Bridging established offline authority with modern generative discovery. We identify where synthesis engines miss your enterprise infrastructure.',
    primaryCta: 'Request Lux Snapshot',
    ghostCta: {
      label: 'Consultation Record',
      url: 'https://www.linkedin.com/company/mtmediaai',
    },
    preferredSourcesLabel: 'Add to Google Preferred Sources',
    preferredSourcesFallbackUrl: 'https://www.google.com/preferences/source?q=mtmediaai.com',
  },
  oldWay: {
    eyebrow: 'Structural Disconnect',
    heading: 'Offline Authority Facing Unread Infrastructure',
    description: 'Decades of craftsmanship and market standing remain unindexed by generative engines that query synthetic data indexes rather than historical standing.',
    stats: {
      stat1: {
        value: '',
        label: '',
        source: '',
        date: '',
      },
      stat2: {
        value: '',
        label: '',
        source: '',
        date: '',
      },
      stat3: {
        value: '',
        label: '',
        source: '',
        date: '',
      },
      stat4: {
        value: '',
        label: '',
        source: '',
        date: '',
      },
    },
  },
  newWay: {
    eyebrow: 'Invisible Infrastructure Intelligence',
    heading: 'The Architecture of Digital Sovereignty',
    description: 'A machine-readable knowledge layer structured to establish explicit provenance, client-controlled data boundaries, and verifiable attribution across generative discovery platforms.',
    pillars: [
      {
        title: 'Sovereign Data Governance',
        body: 'Client-controlled data schemas ensure that proprietary methodologies and domain mastery remain private, never exposed to unpermissioned model ingestion.',
      },
      {
        title: 'Citations & Provenance',
        body: 'Structured canonical entities and cryptographically verifiable attribution anchors ensure your record is cited accurately by answer engines.',
      },
      {
        title: 'Protected Core Logic',
        body: 'Zero raw backend exposure. Operational logic remains safely cordoned while discovery engines index authoritative identity mesh records.',
      },
    ],
  },
  evidence: {
    eyebrow: 'Verification Artifacts',
    heading: 'Diagnostic Structure and Validation Methodology',
    description: 'Every diagnostic follows a rigorous process-proof evaluation protocol examining machine perception across generative systems.',
    figures: [
      {
        id: 'fig-01',
        caption: 'Sample diagnostic artifact — Phase B.',
        description: 'Entity mesh audit verifying canonical provenance and citation fidelity across generative discovery models.',
      },
      {
        id: 'fig-02',
        caption: 'Sample diagnostic artifact — Phase B.',
        description: 'Query synthesis diagnostic assessing coverage, retrieval depth, and structured identity boundaries.',
      },
    ],
  },
  endcap: {
    eyebrow: 'Armory Cross-Merchandising',
    title: 'Autonomous Armory Infrastructure',
    description: 'Inspect sovereign deployment modules and operational tooling engineered for established enterprises.',
    ctaLabel: 'Explore Armory Suite',
    ctaUrl: 'https://armory.mtmediaai.com',
  },
  cta: {
    eyebrow: 'Diagnostic Intake',
    heading: 'Examine Your Generative Surface',
    description: 'Begin with a comprehensive assessment of how generative engines interpret and source your enterprise infrastructure.',
    buttonText: 'Request Lux Snapshot',
    preferredSourcesFallbackUrl: 'https://www.google.com/preferences/source?q=mtmediaai.com',
  },
  footer: {
    disclaimer: 'Strategic advisory and architectural analysis. All enterprise assets governed under sovereign compliance protocols.',
    aiDisclosure: 'Constructed with AI-assisted research and validated through strict human oversight.',
    location: 'The Woodlands · Houston Metro · 77380',
    attributionSeal: 'MT Media AI Sovereign Mesh',
    entityHandle: '@mtmediaai',
    links: {
      github: {
        label: 'GitHub',
        url: 'https://github.com/mtmediaai',
      },
      linkedin: {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/company/mtmediaai',
      },
      palace: {
        label: 'Palace Hub',
        url: 'https://mtmediaai.com',
      },
    },
    privacyLine: 'Direct ingestion with zero third-party tracking pixels or client telemetry brokers.',
  },
  modal: {
    title: 'Request Lux Snapshot',
    description: 'Submit your details for a tailored assessment of your generative search discovery posture.',
    fields: {
      fullName: {
        label: 'Full Name',
        placeholder: 'Enter your full name',
      },
      businessName: {
        label: 'Business Name',
        placeholder: 'Enter your business name',
      },
      email: {
        label: 'Business Email',
        placeholder: 'name@business.com',
      },
      website: {
        label: 'Website URL',
        placeholder: 'https://yourbusiness.com',
      },
      category: {
        label: 'Practice Area',
        options: {
          private_residential_advisor: 'Private Residential Advisor',
          outdoor_estate_architect: 'Outdoor Estate Architect',
          estate_technology_curator: 'Estate Technology Curator',
          automotive_estate_advisor: 'Automotive Estate Advisor',
          other_estate_service: 'Other Estate Service',
          unspecified: 'Unspecified Estate Discipline',
        },
      },
      linkedinUrl: {
        label: 'LinkedIn URL',
        placeholder: 'https://linkedin.com/in/...',
      },
      consent: {
        label: 'I consent to receiving the Lux Snapshot diagnostic and strategic evaluation.',
      },
    },
    submitButton: 'Submit Diagnostic Request',
    submittingButton: 'Processing Request...',
    successMessage: 'Request received. Your Lux Snapshot is assembled and delivered to your inbox.',
    errorMessage: 'Diagnostic intake is temporarily unavailable. Please retry shortly.',
    closeButton: 'Close',
  },
};
