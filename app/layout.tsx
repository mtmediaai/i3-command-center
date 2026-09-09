import type { Metadata } from 'next';
import Script from 'next/script';
import { Playfair_Display_SC, Merriweather } from 'next/font/google';
import './globals.css';

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
  title: 'I³ Command Center | Rescuing Legacy From AI Erasure',
  description: 'Invisible Infrastructure Intelligence (I³ System) — AI Visibility & Generative Engine Optimization by MT Media AI.',
  alternates: {
    canonical: 'https://i3.mtmediaai.com',
  },
  openGraph: {
    title: 'I³ Command Center | Rescuing Legacy From AI Erasure',
    description: 'Invisible Infrastructure Intelligence (I³ System) — AI Visibility & Generative Engine Optimization by MT Media AI.',
    url: 'https://i3.mtmediaai.com',
    siteName: 'I³ Command Center | MT Media AI',
    locale: 'en_US',
    type: 'website',
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
      name: 'I³ Command Center — Rescuing Legacy From AI Erasure',
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
      areaServed: 'United States',
      serviceType: 'AI Visibility & Generative Engine Optimization',
    },
    {
      '@type': 'Offer',
      '@id': 'https://i3.mtmediaai.com/#offer',
      itemOffered: {
        '@id': 'https://i3.mtmediaai.com/#service',
      },
      name: 'Lux Snapshot — AI Visibility Diagnostic',
      price: '0.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
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
          <span>MT Media AI — Sovereign Intelligence Layer — I3 System</span>
        </div>
        {children}
      </body>
    </html>
  );
}
