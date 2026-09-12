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
    aeoBlock: {
      title: string;
      body: string;
    };
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
      'Invisible Infrastructure Intelligence (I³ System): AI Visibility Audit | MT Media AI',
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
    h1: 'Is AI Erasing Your Business When High-Net-Worth Buyers Ask Who To Trust?',
    subhead:
      "MT Media AI's I³ System, Invisible Infrastructure Intelligence, translates your real-world prestige and referral trust into machine-readable data across Google AI Overviews, Google AI Mode, ChatGPT, Gemini, and Perplexity. You receive a practical AI visibility diagnosis before deciding what to repair.",
    aeoBlock: {
      title: 'What is the I³ AI Visibility Diagnosis?',
      body:
        'The Invisible Infrastructure Intelligence (I³ System) diagnoses AI Brand Ignorance by mapping buyer conversational queries, analyzing large language model retrieval sources, and auditing first-party entity evidence. It identifies where AI engines erase established referral businesses and delivers a structured diagnostic roadmap to restore machine legibility and citation authority.',
    },
    primaryCta: 'Request Your I³ Visibility Snapshot',
    secondaryCta: 'See What AI Search Changed',
    secondaryCtaTarget: '#evidence',
    preferredSourcesLabel: 'Follow MT Media AI as a preferred source on Google.',
    preferredSourcesFallbackUrl:
      'https://www.google.com/preferences/source?q=mtmediaai.com',
  },
  fastAnswers: {
    eyebrow: 'Fast Answers',
    heading: 'What Is Invisible Infrastructure Intelligence (I³)?',
    items: [
      {
        question: 'What is the I³ System?',
        answer:
          'Invisible Infrastructure Intelligence (I³) is an AI visibility audit framework that evaluates the questions, evidence, and public signals determining how your business is described in AI-assisted search.',
      },
      {
        question: 'What does an AI visibility audit examine?',
        answer:
          'It audits your commercial category questions, website evidence, business identity mesh, and the external sources that search engines and language models use to verify your claims.',
      },
      {
        question: 'What do I receive in the snapshot?',
        answer:
          'You receive an interactive knowledge hub: the Inspiration Ignition Hub (a private Gemini Notebook / NotebookLM environment) containing a timestamped snapshot of your AI visibility according to Perplexity AI, prioritized evidence gaps, and an AI Brand Ignorance diagnosis. In accordance with our Anti-Static Deliverables Doctrine, we deliver living, queryable intelligence rather than static PDFs that get discarded. It is yours to keep, query, and explore without cost.',
      },
      {
        question: 'What happens after I submit?',
        answer:
          'Your intake enters the secure MTM queue. An operations lead evaluates your public entity mesh and routes your diagnostic report without automated third-party model cost.',
      },
    ],
  },
  structuralAnswer: {
    h2: 'What an AI Visibility Audit Examines When Machines Describe Your Business',
    body:
      'Traditional search asks whether a webpage can rank for keywords. Generative discovery engines ask a different question: whether verified public evidence allows an answer engine to describe your business accurately, confidently, and in the correct commercial context. The I³ System examines the structural fault lines between your real-world authority, your published entity mesh, and what conversational models can actually retrieve.',
  },
  evidenceSection: {
    h2: 'Search Behavior Changed: Zero-Click Search and AI Brand Erasure',
    description:
      'Independent clickstream studies and industry analyses confirm that commercial discovery has shifted from ten blue links to synthesized answers. The verified metrics below demonstrate why unindexed referral businesses face systemic AI erasure.',
  },
  methodSection: {
    h2: 'How the I³ System Reads the Field: Question Map, Evidence Map, Representation Map',
    description:
      'Rather than relying on outdated keyword stuffing, the I³ protocol inspects the three foundational layers that determine how AI concierges and information agents parse your enterprise.',
    cards: [
      {
        id: 'method-question-map',
        name: 'Question Map',
        title: 'Commercial Intent & Category Questions',
        description:
          'We identify the commercial questions that shape your category, buyer decisions, and local or vertical relevance across Houston Metro and national sectors.',
      },
      {
        id: 'method-evidence-map',
        name: 'Evidence Map',
        title: 'Verifiable Claims & Identity Mesh',
        description:
          'We review whether your website and supporting sources make your claims easy to verify, attribute, and understand for neural discovery engines.',
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
    h2: 'The Repair for AI Erasure Is Not More Noise: It Is Structured Brand Evidence',
    body:
      'The resolution is to construct a connected system of clear pages, verified claims, structured entities, credible sources, and measurable feedback. That gives buyers and machines durable proof to work with.',
  },
  deliverables: {
    h2: 'Your I³ Visibility Snapshot Includes',
    bullets: [
      'An interactive Inspiration Ignition Hub (Gemini Notebook / NotebookLM shared workspace)',
      'A timestamped AI visibility benchmark based on Perplexity AI retrieval data',
      'An AI Brand Ignorance and representation-risk gap diagnosis across public citation sources',
      'A prioritized remediation roadmap for machine legibility (Anti-Static Deliverables Doctrine)',
    ],
  },
  limitations: {
    h2: 'What an AI Visibility Audit Does Not Promise',
    body:
      'The I³ System does not guarantee search rankings, AI citations, traffic, leads, or revenue. It identifies where your available brand evidence is thin, inconsistent, unclear, or disconnected so you can make an informed repair decision.',
  },
  decisionFramework: {
    h2: 'Is an I³ Visibility Snapshot the Right Next Move for Your Practice?',
    bullets: [
      'You rely on reputation, expertise, or category authority to win high-value business',
      'High-net-worth buyers research your practice before making contact',
      'Your website does not clearly present machine-readable proof behind your claims',
      'You want an objective diagnostic baseline before committing to a larger visibility build',
    ],
  },
  faqSection: {
    h2: 'Questions Business Owners Ask About AI Visibility and AI Erasure',
    items: [
      {
        question: 'What is an AI visibility audit?',
        answer:
          'An AI visibility audit reviews the public evidence that helps search systems and buyers understand, verify, and describe a business. It focuses on clarity, consistency, source support, and commercial relevance.',
      },
      {
        question: 'How is AI search visibility different from traditional SEO?',
        answer:
          'Traditional SEO focuses on rankings for specific web pages. AI search visibility focuses on entity clarity: ensuring large language models and answer engines can connect reliable facts, credentials, and citations to accurately describe your business.',
      },
      {
        question:
          "Why isn't my referral business showing up in Google AI Overviews, Google AI Mode, ChatGPT, Gemini, or Perplexity?",
        answer:
          'Language models and search generative systems cannot read offline reputation or private handshakes. If your business lacks structured entity proof, canonical citations, and verifiable web evidence, generative systems omit your business when buyers ask for recommendations.',
      },
      {
        question:
          'What is AI Brand Ignorance and how does the I³ System resolve it?',
        answer:
          'AI Brand Ignorance occurs when AI Invisibility combines with AI Erasure: search models synthesize competitor answers while remaining completely unaware of your practice. The I³ System maps this gap and outlines the structured evidence needed for machine recall.',
      },
      {
        question:
          'Will an I³ Visibility Snapshot guarantee AI search citations or rankings?',
        answer:
          'No. Algorithmic outputs change across platforms and queries. The snapshot provides an objective audit of your evidence gaps and recommended repairs; it does not promise a specific citation, ranking, or financial outcome.',
      },
      {
        question: 'What happens after I request an I³ Visibility Snapshot?',
        answer:
          'Your request enters the MTM intake queue. An operations lead reviews your public footprint and configures your interactive Inspiration Ignition Hub (Gemini Notebook / NotebookLM) with your timestamped Perplexity AI diagnosis within 24 to 48 hours.',
      },
    ],
  },
  finalCta: {
    heading: 'Start With the Evidence Your Business Already Gives the Market',
    description:
      'Request your zero-cost I³ Visibility Snapshot to discover how generative search engines currently describe your enterprise and where citation gaps exist.',
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
