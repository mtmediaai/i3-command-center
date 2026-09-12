// Typed Human-Visible Copy Module: Phase B AGO Dominator Copy Architecture
// Governed by MTM Zero-COGS, Strict Evidentiary Standards, and No-Slop Doctrine

export interface FastAnswerItem {
  question: string;
  answer: string;
}

export interface MethodItem {
  id: string;
  name: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SiteCopy {
  meta: {
    pageTitle: string;
    metaDescription: string;
  };
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
    secondaryCta: string;
    secondaryCtaTarget: string;
    preferredSourcesLabel: string;
    preferredSourcesFallbackUrl: string;
  };
  fastAnswers: {
    eyebrow: string;
    heading: string;
    items: FastAnswerItem[];
  };
  structuralAnswer: {
    h2: string;
    body: string;
  };
  evidenceSection: {
    h2: string;
    description: string;
  };
  methodSection: {
    h2: string;
    description: string;
    cards: MethodItem[];
  };
  mtmFix: {
    h2: string;
    body: string;
  };
  deliverables: {
    h2: string;
    bullets: string[];
  };
  limitations: {
    h2: string;
    body: string;
  };
  decisionFramework: {
    h2: string;
    bullets: string[];
  };
  faqSection: {
    h2: string;
    items: FaqItem[];
  };
  finalCta: {
    heading: string;
    description: string;
    buttonText: string;
  };
  endcap: {
    eyebrow: string;
    title: string;
    description: string;
    ctaLabel: string;
    ctaUrl: string;
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
  meta: {
    pageTitle:
      'AI Visibility Audit: See How AI Search Describes Your Business | I³',
    metaDescription:
      'Map the questions buyers ask, the evidence AI systems can verify, and how your business is represented across AI search. Request an I³ Visibility Snapshot.',
  },
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
    h1: 'Is AI describing your business correctly when buyers ask who to trust?',
    subhead:
      'I³ maps the questions buyers ask, the sources AI systems rely on, and the evidence your business gives them to work with. You receive a practical AI visibility diagnosis before deciding what to repair.',
    primaryCta: 'Request Your I³ Visibility Snapshot',
    secondaryCta: 'See What AI Search Changed',
    secondaryCtaTarget: '#evidence',
    preferredSourcesLabel: 'Follow MT Media AI as a preferred source on Google.',
    preferredSourcesFallbackUrl:
      'https://www.google.com/preferences/source?q=mtmediaai.com',
  },
  fastAnswers: {
    eyebrow: 'Fast Answers',
    heading: 'Core Architecture at a Glance',
    items: [
      {
        question: 'What is I³?',
        answer:
          'A structured AI visibility audit that reviews the questions, evidence, and public signals shaping how your business may be represented in AI-assisted search.',
      },
      {
        question: 'What does it examine?',
        answer:
          'Your category questions, website evidence, business identity signals, and the external sources buyers and machines can use to verify your claims.',
      },
      {
        question: 'What do I receive?',
        answer:
          'A practical visibility snapshot with prioritized findings and a recommended next step. It is a diagnosis, not a guarantee of rankings, citations, traffic, or revenue.',
      },
      {
        question: 'What happens after I submit?',
        answer:
          'Your request enters the MTM intake queue. A team member reviews the information and routes the appropriate next step.',
      },
    ],
  },
  structuralAnswer: {
    h2: 'What an AI visibility audit examines',
    body: 'Traditional search asks whether a page can rank. AI-assisted discovery adds a second question: whether the available evidence lets a system describe the business accurately, confidently, and in the right commercial context. I³ examines the gaps between your real authority, the proof published about your business, and the information a buyer or model can actually retrieve.',
  },
  evidenceSection: {
    h2: 'Search behavior changed. Brand evidence matters more.',
    description:
      'Independent studies and industry measurements document the transition from click-based search to synthesis-driven discovery. The metrics below establish why machine-readable verification is required.',
  },
  methodSection: {
    h2: 'How I³ reads the field',
    description:
      'Rather than chasing superficial keywords, the I³ protocol audits the three foundational layers that determine how generative discovery engines interpret your commercial authority.',
    cards: [
      {
        id: 'method-question-map',
        name: 'Question Map',
        title: 'Commercial Intent & Category Questions',
        description:
          'We identify the commercial questions that shape your category, buyer decisions, and local or vertical relevance.',
      },
      {
        id: 'method-evidence-map',
        name: 'Evidence Map',
        title: 'Verifiable Claims & Identity Mesh',
        description:
          'We review whether your website and supporting sources make your claims easy to verify, attribute, and understand.',
      },
      {
        id: 'method-representation-map',
        name: 'Representation Map',
        title: 'Model Synthesis & Discovery Coverage',
        description:
          'We compare the available evidence with the way a business may be summarized, recommended, or omitted in AI-assisted discovery.',
      },
    ],
  },
  mtmFix: {
    h2: 'The repair is not more noise. It is better evidence.',
    body: 'The goal is to create a connected system of clear pages, verified claims, structured entities, credible sources, and measurable feedback. That gives people and machines something durable to work with.',
  },
  deliverables: {
    h2: 'Your I³ Visibility Snapshot includes',
    bullets: [
      'A category-question map',
      'An evidence and entity review',
      'A representation-risk summary',
      'A prioritized next-step recommendation',
    ],
  },
  limitations: {
    h2: 'What I³ does not promise',
    body: 'I³ does not guarantee rankings, AI citations, traffic, leads, or revenue. It identifies where the available evidence is thin, inconsistent, unclear, or disconnected so you can make an informed repair decision.',
  },
  decisionFramework: {
    h2: 'Is an I³ Visibility Snapshot the right next move?',
    bullets: [
      'You rely on reputation, expertise, or category authority to win business',
      'Buyers research before they contact you',
      'Your website does not clearly show the evidence behind your claims',
      'You want a structured starting point before committing to a larger visibility build',
    ],
  },
  faqSection: {
    h2: 'Questions business owners ask about AI visibility',
    items: [
      {
        question: 'What is an AI visibility audit?',
        answer:
          'An AI visibility audit reviews the public evidence that helps search systems and buyers understand, verify, and describe a business. It focuses on clarity, consistency, source support, and commercial relevance.',
      },
      {
        question: 'How is AI search visibility different from SEO?',
        answer:
          'SEO remains important because websites need to be discoverable and useful. AI search visibility adds focus on whether a system can connect reliable information, entities, claims, and sources into an accurate answer about the business.',
      },
      {
        question: 'What does I³ examine?',
        answer:
          'I³ examines commercial questions, website evidence, business identity signals, and supporting source material. The output is a prioritized visibility snapshot.',
      },
      {
        question:
          'Will an I³ Visibility Snapshot guarantee rankings or AI citations?',
        answer:
          'No. Search results and AI-generated answers change across platforms and time. The snapshot identifies evidence gaps and practical next steps; it does not promise a specific placement, citation, traffic level, or revenue outcome.',
      },
      {
        question: 'What happens after I request a snapshot?',
        answer:
          'Your submission is recorded in the MTM intake system. The team reviews the business context and routes the appropriate fulfillment or next step.',
      },
    ],
  },
  finalCta: {
    heading: 'Start with the evidence your business already gives the market.',
    description:
      'Request your zero-cost I³ Visibility Snapshot to see where your public evidence is clear, where it is disconnected, and how generative engines interpret your authority.',
    buttonText: 'Request Your I³ Visibility Snapshot',
  },
  endcap: {
    eyebrow: 'The MTM Armory',
    title: 'Sharpen the instruments.',
    description:
      'The MTM Armory holds the working tools, protocols, and architectural specifications open for inspection.',
    ctaLabel: 'Visit the Armory',
    ctaUrl: 'https://armory.mtmediaai.com',
  },
  footer: {
    disclaimer:
      'Educational content. Results vary; no specific outcome is promised. Nothing here is legal, financial, or professional advice.',
    aiDisclosure:
      'AI-assisted content | MT Media AI. AI can make mistakes; verify independently.',
    location: 'The Woodlands · Houston Metro · 77380',
    attributionSeal:
      'Authored by Kareem Daniel, Founder of MT Media AI | Enhanced by Circuit, MT Media AI | Published by MT Media AI · Modern Touch Media',
    entityHandle: '@mtmediaai · GitHub · LinkedIn',
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
    title: 'Request Your I³ Visibility Snapshot',
    description:
      'Five fields. One diagnostic. Assembled for your business and delivered to your inbox.',
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
    successMessage:
      'Request received. Your I³ Visibility Snapshot is assembled and delivered to your inbox.',
    errorMessage: 'One or more fields need attention. Review and resubmit.',
    closeButton: 'Close',
  },
};
