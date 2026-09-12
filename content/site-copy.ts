// STAGED COPY — Phase B (Moolah) replaced values.

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
        label: 'The Palace',
        url: 'https://mtmediaai.com',
      },
      founder: {
        label: 'The Architect',
        url: 'https://kareem.mtmediaai.com',
      },
      network: {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/company/mtmediaai',
      },
    },
  },
  hero: {
    eyebrow: 'I³ Command Center · MT Media AI',
    h1: 'Rescuing Legacy From AI Erasure.',
    subhead:
      'The best in the business built their names on human trust. The machines that now make the introduction cannot read a reputation — only infrastructure. Here is where yours becomes legible.',
    primaryCta: 'Claim Your Lux Snapshot',
    ghostCta: {
      label: 'Verify via LinkedIn',
      url: 'https://www.linkedin.com/company/mtmediaai',
    },
    preferredSourcesLabel: 'Follow MT Media AI as a preferred source on Google.',
    preferredSourcesFallbackUrl: 'https://www.google.com/preferences/source?q=mtmediaai.com',
  },
  oldWay: {
    eyebrow: 'The Front Door Moved.',
    heading: 'The Front Door Moved.',
    description:
      'For decades, reputation traveled by referral and a strong position on a results page. Both still matter. But the first introduction increasingly happens inside an AI answer — and that answer cites what it can read, not who is best. If it can happen to them, the question is not whether your category is exempt. It is whether your infrastructure is legible.',
    stats: {
      stat1: {
        value: '58.5% → <1 in 3',
        label:
          '58.5% of U.S. Google searches ended without a click in 2024. By 2026, fewer than one in three searches sent a click to the open web at all.',
        source: 'SparkToro × Datos, 2024 · SparkToro, 2026',
        date: '',
      },
      stat2: {
        value: '−91%',
        label:
          'HouseFresh — an independent publisher that did everything right — lost roughly 91% of its Google search traffic: about 4,000 daily visits, down to about 200.',
        source: 'HouseFresh open letter, Feb 2024 · The Verge, May 2024',
        date: '',
      },
      stat3: {
        value: '13.5M → 8.6M',
        label:
          'HubSpot — the company that wrote the inbound playbook — saw monthly organic visits fall from roughly 13.5 million to 8.6 million in a single month.',
        source: 'Public traffic estimates, Nov–Dec 2024',
        date: '',
      },
      stat4: {
        value: '−58%',
        label:
          'When an AI Overview appears, the page ranked first loses an average of 58% of its clicks.',
        source: 'HubSpot, Dec 2025 data',
        date: '',
      },
    },
  },
  newWay: {
    eyebrow: 'Invisible Infrastructure Intelligence',
    heading: 'Invisible Infrastructure Intelligence',
    description:
      'I³ is the layer between your name and the machines. Machine-readable identity. Entity graphs that state who you are in the vocabulary answer engines parse. Citation infrastructure that lets AI systems reference your business with the same confidence your clients do. This does not replace what built your name. It makes what built your name readable.',
    pillars: [
      {
        title: 'Client-controlled data.',
        body: 'Client-controlled data schemas ensure that proprietary methodologies and domain mastery remain private, never exposed to unpermissioned model ingestion.',
      },
      {
        title: 'Citations and provenance on everything.',
        body: 'Structured canonical entities and cryptographically verifiable attribution anchors ensure your record is cited accurately by answer engines.',
      },
      {
        title: 'No raw backend exposure — ever.',
        body: 'Zero raw backend exposure. Operational logic remains safely cordoned while discovery engines index authoritative identity mesh records.',
      },
    ],
  },
  evidence: {
    eyebrow: 'Proof of Process',
    heading: 'Proof of Process',
    description:
      'No testimonials. No borrowed logos. The instrument is the evidence. Samples shown for structure only. Every engagement begins with your own diagnostic.',
    figures: [
      {
        id: 'fig-01',
        caption: 'Sample diagnostic artifact — AI Exposure Index readout.',
        description: 'Entity mesh audit verifying canonical provenance and citation fidelity across generative discovery models.',
      },
      {
        id: 'fig-02',
        caption: 'Sample diagnostic artifact — three-tier visibility roadmap.',
        description: 'Query synthesis diagnostic assessing coverage, retrieval depth, and structured identity boundaries.',
      },
    ],
  },
  endcap: {
    eyebrow: 'The MTM Armory',
    title: 'Sharpen the instruments.',
    description: 'The MTM Armory holds the working tools — open for inspection.',
    ctaLabel: 'Visit the Armory',
    ctaUrl: 'https://armory.mtmediaai.com',
  },
  cta: {
    eyebrow: 'Prefer our briefings in your results? Add MT Media AI as a preferred source.',
    heading: 'The Machines Are Already Deciding.',
    description:
      'Every month, more of your next clients ask an engine instead of a neighbor. The Lux Snapshot shows what those engines can see — and what they cannot.',
    buttonText: 'Claim Your Lux Snapshot',
    preferredSourcesFallbackUrl: 'https://www.google.com/preferences/source?q=mtmediaai.com',
  },
  footer: {
    disclaimer:
      'Educational content. Results vary; no specific outcome is promised. Nothing here is legal, financial, or professional advice.',
    aiDisclosure: 'AI-assisted content | MT Media AI. AI can make mistakes — verify independently.',
    location: 'The Woodlands · Houston Metro · 77380',
    attributionSeal: 'Authored by MTM · AI-Enhanced · Published 09-09-2026',
    entityHandle: '@mtmediaai — GitHub · LinkedIn',
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
        label: 'mtmediaai.com',
        url: 'https://mtmediaai.com',
      },
    },
    privacyLine:
      'This page hosts a secure intake form. No third-party trackers. What you share stays within your engagement.',
  },
  modal: {
    title: 'Claim Your Lux Snapshot',
    description: 'Five fields. One diagnostic. Assembled for your business and delivered to your inbox.',
    fields: {
      fullName: {
        label: 'Full name',
        placeholder: 'Enter your full name',
      },
      businessName: {
        label: 'Business name',
        placeholder: 'Enter your business name',
      },
      email: {
        label: 'Email',
        placeholder: 'name@business.com',
      },
      website: {
        label: 'Website (optional)',
        placeholder: 'https://yourbusiness.com',
      },
      category: {
        label: 'What best describes your practice?',
        options: {
          private_residential_advisor: 'Private Residential Advisor',
          outdoor_estate_architect: 'Outdoor Estate Architect',
          estate_technology_curator: 'Estate Technology Curator',
          automotive_estate_advisor: 'Automotive Estate Advisor',
          other_estate_service: 'Other estate-level service',
          unspecified: 'Prefer not to say',
        },
      },
      linkedinUrl: {
        label: 'LinkedIn URL (optional)',
        placeholder: 'https://linkedin.com/in/...',
      },
      consent: {
        label: 'I consent to MT Media AI contacting me about my diagnostic.',
      },
    },
    submitButton: 'Request My Snapshot',
    submittingButton: 'Processing Request...',
    successMessage: 'Request received. Your Lux Snapshot is assembled and delivered to your inbox.',
    errorMessage: 'One or more fields need attention. Review and resubmit.',
    closeButton: 'Close',
  },
};
