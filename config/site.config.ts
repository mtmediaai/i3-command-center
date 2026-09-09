export const CATEGORIES = [
  'private_residential_advisor',
  'outdoor_estate_architect',
  'estate_technology_curator',
  'automotive_estate_advisor',
  'other_estate_service',
  'unspecified',
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface SiteConfig {
  subdomain: string;
  pageUrl: string;
  repo: string;
  pageTitle: string;
  owner: string;
  serviceName: string;
  serviceType: string;
  offerName: string;
  offerPrice: string;
  entryValue: string;
  utmDefaults: {
    source: string;
    medium: string;
    campaign: string;
  };
  categories: readonly Category[];
  endcapTarget: string;
  stagedH1: string;
  publishDate: string;
  fulfillmentSLA: string;
  tableName: string;
}

export const siteConfig: SiteConfig = {
  subdomain: 'i3',
  pageUrl: 'https://i3.mtmediaai.com',
  repo: 'i3-command-center',
  pageTitle: 'I³ Command Center',
  owner: 'Reign Ω (sales door) · Moolah oversight',
  serviceName: 'Invisible Infrastructure Intelligence (I³ System)',
  serviceType: 'AI Visibility & Generative Engine Optimization',
  offerName: 'Lux Snapshot — AI Visibility Diagnostic',
  offerPrice: '0.00',
  entryValue: 'i3',
  utmDefaults: {
    source: 'i3',
    medium: 'landing',
    campaign: 'i3-lux',
  },
  categories: CATEGORIES,
  endcapTarget: 'https://armory.mtmediaai.com',
  stagedH1: 'Rescuing Legacy From AI Erasure.',
  publishDate: '2026-09-09',
  fulfillmentSLA: '24–48h',
  tableName: 'leads',
};
