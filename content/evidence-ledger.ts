// Typed Evidence Ledger: Phase B Verified Evidence Architecture
// Governed by MTM Zero-COGS and Evidentiary Truth Doctrine

export interface EvidenceLedgerItem {
  id: string;
  title: string;
  badge: string;
  approvedClaim: string;
  sourceOrganization: string;
  sourceTitle: string;
  sourceUrl: string;
  publicationDate: string;
  studyDate?: string;
  methodologyNote: string;
  lastVerified: string;
  pageUsage: string;
}

export const evidenceLedger: EvidenceLedgerItem[] = [
  {
    id: 'sparktoro-zero-click-2024',
    title: 'SparkToro and Datos 2024 Zero-Click Search Study',
    badge: 'ZERO-CLICK STUDY',
    approvedClaim:
      "In SparkToro and Datos' 2024 U.S. study, 58.5% of Google searches ended without a click.",
    sourceOrganization: 'SparkToro and Datos',
    sourceTitle:
      '2024 Zero-Click Search Study: For Every 1,000 U.S. Google Searches, Only 374 Clicks Go to the Open Web',
    sourceUrl:
      'https://sparktoro.com/blog/2024-zero-click-search-study-for-every-1000-us-google-searches-only-374-clicks-go-to-the-open-web-in-the-eu-its-360/',
    publicationDate: '2024-06-20',
    studyDate: 'May 2024',
    methodologyNote:
      'Aggregated clickstream analysis across desktop and mobile consumer panels in the United States and European Union.',
    lastVerified: '2026-09-12',
    pageUsage: 'Hero evidence carousel and lower-page evidence matrix',
  },
  {
    id: 'hubspot-traffic-decline-2024',
    title: 'Third-Party Semrush Estimates on HubSpot Organic Search Traffic',
    badge: 'ESTIMATED TRAFFIC SHIFT',
    approvedClaim:
      'Third-party Semrush estimates reported HubSpot organic visits declining from 13.5M in November 2024 to 8.6M in December 2024.',
    sourceOrganization: 'Search Engine Land / Semrush',
    sourceTitle: "Did HubSpot's Organic Search Traffic Really Drop by 36%?",
    sourceUrl: 'https://searchengineland.com/hubspot-seo-organic-traffic-drop-451096',
    publicationDate: '2025-01-08',
    studyDate: 'Nov 2024 – Dec 2024',
    methodologyNote:
      'Third-party estimated domain traffic from Semrush organic search database; not first-party audited internal telemetry.',
    lastVerified: '2026-09-12',
    pageUsage: 'Hero evidence carousel and lower-page evidence matrix',
  },
  {
    id: 'housefresh-algorithm-impact-2024',
    title: 'HouseFresh Independent Publisher Search Traffic Impact',
    badge: 'INDEX WIPEOUT REPORT',
    approvedClaim:
      'Independent product review publisher HouseFresh reported a loss of roughly 91% of its Google search traffic, falling from ~4,000 daily visits to ~200.',
    sourceOrganization: 'HouseFresh / The Verge',
    sourceTitle: 'How Google is Killing Independent Sites Like HouseFresh',
    sourceUrl: 'https://housefresh.com/david-vs-digital-goliaths/',
    publicationDate: '2024-02-20',
    studyDate: 'Sep 2023 – Feb 2024',
    methodologyNote:
      'First-party Google Search Console performance data verified and reported by technology journal The Verge in May 2024.',
    lastVerified: '2026-09-12',
    pageUsage: 'Hero evidence carousel and lower-page evidence matrix',
  },
  {
    id: 'mtm-master-equation-framework',
    title: 'MTM AI Brand Ignorance Working Model',
    badge: 'MTM WORKING MODEL',
    approvedClaim:
      'MTM working model: AI Invisibility + AI Erasure can produce AI Brand Ignorance.',
    sourceOrganization: 'MT Media AI Research',
    sourceTitle: 'I³ System: Invisible Infrastructure Intelligence Framework',
    sourceUrl:
      'https://github.com/mtmediaai/mtm-ai/blob/main/i3-system/README.md',
    publicationDate: '2026-09-09',
    studyDate: '2026 Operational Architecture',
    methodologyNote:
      'MTM conceptual model defining how unindexed or machine-illegible brand authority leads to answer-engine exclusion.',
    lastVerified: '2026-09-12',
    pageUsage: 'Hero evidence carousel and conceptual framework',
  },
];
