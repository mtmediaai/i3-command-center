import React from 'react';
import { siteCopy } from '@/content/site-copy';
import { evidenceLedger } from '@/content/evidence-ledger';
import { Monogram } from '@/components/monogram';
import { PreferredSourceSlot } from '@/components/preferred-sources';
import { ModalTrigger } from '@/components/modal-trigger';
import { SocialProofCarousel } from '@/components/social-proof-carousel';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-[var(--color-void)] text-[var(--color-rim)]">
      {/* 1. Semantic Header */}
      <header className="border-b border-white/10 bg-[var(--color-void)]/95 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Monogram size={34} />
            <span className="text-sm font-semibold tracking-wider text-[var(--color-rim)] uppercase">
              {siteCopy.header.brandName}
            </span>
          </div>
          <nav
            aria-label="Primary Navigation"
            className="flex items-center gap-5 sm:gap-7 text-xs text-[var(--color-chrome)]"
          >
            <a
              href={siteCopy.header.nav.palace.url}
              className="hover:text-[var(--color-gold)] transition-colors"
            >
              {siteCopy.header.nav.palace.label}
            </a>
            <a
              href={siteCopy.header.nav.founder.url}
              className="hover:text-[var(--color-gold)] transition-colors"
            >
              {siteCopy.header.nav.founder.label}
            </a>
            <a
              href={siteCopy.header.nav.network.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--color-gold)] transition-colors"
            >
              {siteCopy.header.nav.network.label}
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 space-y-24 relative z-10">
        {/* 2. Hero Section */}
        <section
          id="hero"
          className="space-y-6 pt-4 pb-10 border-b border-white/10 relative"
        >
          <div className="lenz-ambient-glow" aria-hidden="true" />

          <div className="inline-block text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
            {siteCopy.hero.eyebrow}
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--color-rim)] tracking-tight leading-tight max-w-4xl font-serif">
            {siteCopy.hero.h1}
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-chrome)] max-w-3xl leading-relaxed">
            {siteCopy.hero.subhead}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <ModalTrigger label={siteCopy.hero.primaryCta} />
            <a
              href={siteCopy.hero.secondaryCtaTarget}
              className="px-6 py-3 rounded border border-white/20 text-xs font-semibold text-[var(--color-rim)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
            >
              {siteCopy.hero.secondaryCta}
            </a>
          </div>

          <PreferredSourceSlot
            fallbackUrl={siteCopy.hero.preferredSourcesFallbackUrl}
            label={siteCopy.hero.preferredSourcesLabel}
          />

          {/* 3. Exactly ONE Social Proof Carousel (Directly beneath hero CTAs, above fold) */}
          <SocialProofCarousel />
        </section>

        {/* 4. Fast Answer Table (First 300px of content beneath hero) */}
        <section
          id="fast-answers"
          className="space-y-6 border-b border-white/10 pb-16"
        >
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--color-gold)]">
              {siteCopy.fastAnswers.eyebrow}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-rim)] font-serif">
              {siteCopy.fastAnswers.heading}
            </h2>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/15 bg-[var(--color-surface)]/50 backdrop-blur-md shadow-xl">
            <div className="divide-y divide-white/10">
              {siteCopy.fastAnswers.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="text-sm sm:text-base font-bold text-[var(--color-gold)] font-serif md:col-span-1 flex items-start gap-2">
                    <span className="text-xs font-mono opacity-60 mt-0.5">
                      0{idx + 1}.
                    </span>
                    <span>{item.question}</span>
                  </div>
                  <div className="text-xs sm:text-sm text-[var(--color-chrome)] leading-relaxed md:col-span-2">
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Structural Answer Section */}
        <section
          id="structural-answer"
          className="space-y-6 border-b border-white/10 pb-16"
        >
          <div className="glass-panel p-6 sm:p-8 space-y-4 max-w-4xl">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--color-gold)]">
              STRUCTURAL ANALYSIS
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-rim)] font-serif">
              {siteCopy.structuralAnswer.h2}
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-chrome)] leading-relaxed">
              {siteCopy.structuralAnswer.body}
            </p>
          </div>
        </section>

        {/* 6. Evidence Matrix Section */}
        <section
          id="evidence"
          className="space-y-8 border-b border-white/10 pb-20"
        >
          <div className="space-y-3">
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
              EVIDENTIARY AUDIT
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--color-rim)] font-serif">
              {siteCopy.evidenceSection.h2}
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-chrome)] max-w-3xl leading-relaxed">
              {siteCopy.evidenceSection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {evidenceLedger.map((item) => (
              <div
                key={item.id}
                className="glass-panel p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="inline-block text-[10px] font-mono font-bold tracking-wider text-[var(--color-gold)] uppercase bg-[var(--color-gold)]/10 px-2 py-0.5 rounded border border-[var(--color-gold)]/20">
                    {item.badge}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--color-rim)] font-serif">
                    {item.approvedClaim}
                  </h3>
                  <p className="text-xs text-[var(--color-chrome)] leading-relaxed">
                    {item.methodologyNote}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-white/50 gap-2">
                  <span>
                    {item.sourceOrganization} ({item.publicationDate})
                  </span>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-gold)] hover:underline inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-gold)] rounded px-1"
                    aria-label={`Verify primary source: ${item.sourceTitle}`}
                  >
                    <span>Audit source</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. I³ Method Section */}
        <section id="method" className="space-y-8 border-b border-white/10 pb-20">
          <div className="space-y-3">
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
              DIAGNOSTIC FRAMEWORK
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--color-rim)] font-serif">
              {siteCopy.methodSection.h2}
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-chrome)] max-w-3xl leading-relaxed">
              {siteCopy.methodSection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteCopy.methodSection.cards.map((card, idx) => (
              <div key={card.id} className="glass-panel p-7 space-y-4">
                <div className="text-xs font-mono font-bold text-[var(--color-gold)] tracking-wider">
                  LAYER 0{idx + 1}: {card.name.toUpperCase()}
                </div>
                <h3 className="text-lg font-bold text-[var(--color-rim)] font-serif">
                  {card.title}
                </h3>
                <p className="text-xs leading-relaxed text-[var(--color-chrome)]">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. MTM Fix Section */}
        <section
          id="mtm-fix"
          className="space-y-6 border-b border-white/10 pb-16"
        >
          <div className="glass-panel p-6 sm:p-8 space-y-4 max-w-4xl border-l-4 border-l-[var(--color-gold)]">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--color-gold)]">
              THE RESOLUTION
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-rim)] font-serif">
              {siteCopy.mtmFix.h2}
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-chrome)] leading-relaxed">
              {siteCopy.mtmFix.body}
            </p>
          </div>
        </section>

        {/* 9. Deliverables & Limitations Section */}
        <section
          id="deliverables"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/10 pb-20"
        >
          <div className="glass-panel p-7 space-y-5">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--color-gold)]">
              SCOPE
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-rim)] font-serif">
              {siteCopy.deliverables.h2}
            </h2>
            <ul className="space-y-3 text-xs sm:text-sm text-[var(--color-chrome)]">
              {siteCopy.deliverables.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[var(--color-gold)] font-bold">✓</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel p-7 space-y-5">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-white/50">
              TRUTH BOUNDARY
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-rim)] font-serif">
              {siteCopy.limitations.h2}
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-chrome)] leading-relaxed">
              {siteCopy.limitations.body}
            </p>
          </div>
        </section>

        {/* 10. Decision Framework Section */}
        <section
          id="decision-framework"
          className="space-y-6 border-b border-white/10 pb-20"
        >
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--color-gold)]">
              EVALUATION
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-rim)] font-serif">
              {siteCopy.decisionFramework.h2}
            </h2>
          </div>

          <div className="glass-panel p-6 sm:p-8">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[var(--color-chrome)]">
              {siteCopy.decisionFramework.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[var(--color-gold)] font-bold mt-0.5">
                    →
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 11. Visible FAQs Section (Server-Rendered HTML) */}
        <section id="faq" className="space-y-8 border-b border-white/10 pb-20">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-[var(--color-gold)]">
              FAQ
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-rim)] font-serif">
              {siteCopy.faqSection.h2}
            </h2>
          </div>

          <div className="space-y-4">
            {siteCopy.faqSection.items.map((item, idx) => (
              <div key={idx} className="glass-panel p-6 space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-[var(--color-rim)] font-serif flex items-start gap-2">
                  <span className="text-[var(--color-gold)] font-mono text-sm">
                    Q:
                  </span>
                  <span>{item.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-chrome)] leading-relaxed pl-6">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 12. Final CTA Section */}
        <section
          id="final-cta"
          className="space-y-6 pt-4 pb-12 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-[var(--color-rim)] font-serif">
            {siteCopy.finalCta.heading}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-chrome)] leading-relaxed">
            {siteCopy.finalCta.description}
          </p>
          <div className="pt-3">
            <ModalTrigger label={siteCopy.finalCta.buttonText} />
          </div>
        </section>

        {/* 13. Armory Endcap */}
        <section
          id="endcap"
          className="border-t border-white/10 pt-10 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-chrome)]"
        >
          <div>
            <span className="font-semibold text-[var(--color-rim)]">
              {siteCopy.endcap.title}
            </span>{' '}
            <span>{siteCopy.endcap.description}</span>
          </div>
          <a
            href={siteCopy.endcap.ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-gold)] hover:underline whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-gold)] rounded px-1"
          >
            {siteCopy.endcap.ctaLabel} ↗
          </a>
        </section>
      </main>

      {/* 14. Semantic Footer */}
      <footer className="border-t border-white/10 bg-[var(--color-surface)]/40 text-[11px] text-white/50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-[var(--color-rim)] font-medium">
                {siteCopy.footer.disclaimer}
              </p>
              <p>{siteCopy.footer.aiDisclosure}</p>
              <p>{siteCopy.footer.privacyLine}</p>
            </div>
            <div className="space-y-2 md:text-right">
              <p className="font-mono text-white/70">
                {siteCopy.footer.location}
              </p>
              <p className="font-mono text-[var(--color-gold)]">
                {siteCopy.footer.attributionSeal}
              </p>
              <p className="font-mono text-white/40">
                {siteCopy.footer.entityHandle}
              </p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Monogram size={20} />
              <span>
                © {new Date().getFullYear()} MT Media AI. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-5">
              <a
                href={siteCopy.footer.links.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-gold)] transition-colors"
              >
                {siteCopy.footer.links.github.label}
              </a>
              <a
                href={siteCopy.footer.links.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--color-gold)] transition-colors"
              >
                {siteCopy.footer.links.linkedin.label}
              </a>
              <a
                href={siteCopy.footer.links.palace.url}
                className="hover:text-[var(--color-gold)] transition-colors"
              >
                {siteCopy.footer.links.palace.label}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
