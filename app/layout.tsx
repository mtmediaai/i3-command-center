import type { Metadata } from 'next';
import Script from 'next/script';
import { Playfair_Display_SC, Merriweather } from 'next/font/google';
import './globals.css';
import { siteCopy } from '@/content/site-copy';

const playfair = Playfair_Display_SC({
  weight: ['900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const merriweather = Merriweather({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://i3.mtmediaai.com'),
  title: siteCopy.meta.pageTitle,
  description: siteCopy.meta.metaDescription,
  alternates: {
    canonical: 'https://i3.mtmediaai.com',
  },
  openGraph: {
    title: siteCopy.meta.pageTitle,
    description: siteCopy.meta.metaDescription,
    url: 'https://i3.mtmediaai.com',
    siteName: 'I³ Command Center | MT Media AI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteCopy.meta.pageTitle,
    description: siteCopy.meta.metaDescription,
  },
};

const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://i3.mtmediaai.com/#website',
      url: 'https://i3.mtmediaai.com',
      name: 'I³ Command Center | MT Media AI',
      publisher: {
        '@id': 'https://mtmediaai.com/#organization',
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://i3.mtmediaai.com/#webpage',
      url: 'https://i3.mtmediaai.com',
      isPartOf: {
        '@id': 'https://i3.mtmediaai.com/#website',
      },
      about: {
        '@id': 'https://i3.mtmediaai.com/#service',
      },
      name: siteCopy.meta.pageTitle,
      description: siteCopy.meta.metaDescription,
      datePublished: '2026-09-09',
      inLanguage: 'en-US',
    },
    {
      '@type': 'Organization',
      '@id': 'https://mtmediaai.com/#organization',
      name: 'MT Media AI',
      url: 'https://mtmediaai.com',
    },
    {
      '@type': 'Person',
      '@id': 'https://mtmediaai.com/#person',
      name: 'Kareem Daniel',
    },
    {
      '@type': 'Service',
      '@id': 'https://i3.mtmediaai.com/#service',
      name: 'Invisible Infrastructure Intelligence (I³ System)',
      provider: {
        '@id': 'https://mtmediaai.com/#organization',
      },
      areaServed: ['The Woodlands', 'Houston Metro', 'United States'],
      serviceType: [
        'AI Visibility Audit',
        'Generative Engine Optimization',
        'AI Search Visibility',
        'Local Business AI Erasure Remediation',
      ],
      description: siteCopy.hero.aeoBlock.body,
    },
    {
      '@type': 'Offer',
      '@id': 'https://i3.mtmediaai.com/#offer',
      itemOffered: {
        '@id': 'https://i3.mtmediaai.com/#service',
      },
      name: 'I³ Visibility Snapshot: AI Visibility Diagnostic',
      price: '0.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'DefinedTerm',
      '@id': 'https://i3.mtmediaai.com/#term-ai-brand-ignorance',
      name: 'AI Brand Ignorance',
      description:
        'The condition where AI Invisibility and AI Erasure combine, leaving conversational engines and answer models unaware of an established commercial practice.',
      inDefinedTermSet: 'https://i3.mtmediaai.com/#service',
    },
    {
      '@type': 'DefinedTerm',
      '@id': 'https://i3.mtmediaai.com/#term-invisible-elite',
      name: 'The Invisible Elite',
      description:
        'Established high-net-worth service providers and private estate advisors whose prestige and referral authority remain unreadable to generative AI search engines.',
      inDefinedTermSet: 'https://i3.mtmediaai.com/#service',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://i3.mtmediaai.com/#faq',
      isPartOf: {
        '@id': 'https://i3.mtmediaai.com/#webpage',
      },
      mainEntity: siteCopy.faqSection.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${merriweather.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
        <Script
          src="https://news.google.com/swg/js/v1/publisher.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-[var(--color-void)] text-[var(--color-rim)] min-h-screen antialiased flex flex-col selection:bg-[var(--color-gold)] selection:text-black">
        {/* Machine-meta entity verification block */}
        <div className="machine-meta-block" aria-hidden="true">
          <span>MT Media AI · Sovereign Intelligence Layer · I3 System</span>
        </div>
        {children}
      </body>
    </html>
  );
}
