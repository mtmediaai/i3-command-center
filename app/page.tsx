import React from 'react';
import { siteCopy } from '@/content/site-copy';
import { evidenceLedger } from '@/content/evidence-ledger';
import { PreferredSourceSlot } from '@/components/preferred-sources';
import { ModalTrigger } from '@/components/modal-trigger';
import { SocialProofCarousel } from '@/components/social-proof-carousel';
import { ForgeSectionHeader } from '@/components/forge-section-header';
import { TelemetryHeader } from '@/components/telemetry-header';
import { HoustonSpatialMesh } from '@/components/houston-spatial-mesh';
import { IgnitionHubPreview } from '@/components/ignition-hub-preview';
import { Monogram } from '@/components/monogram';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-[var(--color-obsidian)] text-[var(--color-chrome-white)]">
      {/* Precision Telemetry Header with Dynamic Scroll Progress Rail */}
      <TelemetryHeader />

      {/* Atmospheric Chiaroscuro Studio Light Canopy & Radiant Solar Arc Halo */}
      <div className="studio-light-canopy" aria-hidden="true" />
      <div className="solar-arc-halo" aria-hidden="true" />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 space-y-24 relative z-10">
        {/* 1. Hero Section */}
        <section
          id="hero"
          className="space-y-6 pt-4 pb-10 border-b border-white/10 relative"
        >
          <div className="lenz-ambient-glow" aria-hidden="true" />

          {/* Echo Containment Eyebrow */}
          <div>
            <div className="forge-echo-containment">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
              <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[var(--color-gold)]">
                {siteCopy.hero.eyebrow}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--color-rim)] tracking-tight leading-tight max-w-4xl font-serif sword-blade-glow">
            {siteCopy.hero.h1}
          </h1>

          <p className="text-base sm:text-lg text-[var(--color-chrome)] max-w-3xl leading-relaxed">
            {siteCopy.hero.subhead}
          </p>

          {/* AEO TL;DR Answer Block (40-60 Words for Direct AI Extraction) */}
          <div className="glass-onyx border-l-4 border-l-[var(--color-gold)] p-5 sm:p-6 rounded-r-xl max-w-3xl shadow-2xl clinical-rim">
            <p className="text-xs sm:text-sm text-[var(--color-chrome-white)]/90 leading-relaxed font-serif">
              <strong className="text-[var(--color-gold)] font-sans uppercase tracking-wider text-xs block mb-1">
                {siteCopy.hero.aeoBlock.title}
              </strong>
              {siteCopy.hero.aeoBlock.body}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <ModalTrigger label={siteCopy.hero.primaryCta} />
            <a
              href={siteCopy.hero.secondaryCtaTarget}
              className="px-6 py-3.5 rounded-lg border border-white/20 text-xs font-semibold text-[var(--color-chrome-white)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] hover:bg-white/[0.03] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] clinical-rim"
            >
              {siteCopy.hero.secondaryCta}
            </a>
          </div>

          <PreferredSourceSlot
            fallbackUrl={siteCopy.hero.preferredSourcesFallbackUrl}
            label={siteCopy.hero.preferredSourcesLabel}
          />

          {/* Exactly ONE Social Proof Carousel (Directly beneath hero CTAs, above fold) */}
          <SocialProofCarousel />
        </section>

        {/* 2. Fast Answer Table (First 300px of content beneath hero) */}
        <section
          id="fast-answers"
          className="space-y-6 border-b border-white/10 pb-16"
        >
          <ForgeSectionHeader
            eyebrow={siteCopy.fastAnswers.eyebrow}
            title={siteCopy.fastAnswers.heading}
            subtitle="Core operational answers and deliverable standards for neural discovery engines"
          />

          <div className="overflow-hidden rounded-xl border border-white/15 glass-onyx shadow-2xl clinical-rim">
            <div className="divide-y divide-white/10">
              {siteCopy.fastAnswers.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 hover:bg-white/[0.03] transition-colors"
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

        {/* 3. Structural Answer Section */}
        <section
          id="structural-answer"
          className="space-y-6 border-b border-white/10 pb-16"
        >
          <div className="glass-onyx p-6 sm:p-8 space-y-4 max-w-4xl clinical-rim">
            <ForgeSectionHeader
              eyebrow="STRUCTURAL ANALYSIS"
              title={siteCopy.structuralAnswer.h2}
              subtitle="Generative search engines evaluate verified entity claims rather than counting backlinks"
            />
            <p className="text-sm sm:text-base text-[var(--color-chrome)] leading-relaxed pt-2">
              {siteCopy.structuralAnswer.body}
            </p>
          </div>
        </section>

        {/* 4. Evidence Matrix Section */}
        <section
          id="evidence"
          className="space-y-8 border-b border-white/10 pb-20"
        >
          <ForgeSectionHeader
            eyebrow="EVIDENTIARY AUDIT"
            title={siteCopy.evidenceSection.h2}
            subtitle={siteCopy.evidenceSection.description}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {evidenceLedger.map((item) => (
              <div
                key={item.id}
                className="glass-onyx p-6 flex flex-col justify-between space-y-4 clinical-rim hover:border-[var(--color-gold)]/50 transition-all"
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

        {/* 5. Houston Metropolitan Spatial Architecture (God's Eye View & Local SEO Grounding) */}
        <section id="houston-gev" className="space-y-8 border-b border-white/10 pb-20">
          <ForgeSectionHeader
            eyebrow="GEOGRAPHIC GROUNDING"
            title="Metropolitan Entity Architecture: Grounding Prestige in Physical Space"
            subtitle="Neural search models evaluate local geographic corroboration before citing high-value service firms in Greater Houston"
          />
          <HoustonSpatialMesh />
        </section>

        {/* 6. I³ Method Section */}
        <section id="method" className="space-y-8 border-b border-white/10 pb-20">
          <ForgeSectionHeader
            eyebrow="DIAGNOSTIC FRAMEWORK"
            title={siteCopy.methodSection.h2}
            subtitle={siteCopy.methodSection.description}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteCopy.methodSection.cards.map((card, idx) => (
              <div key={card.id} className="glass-onyx p-7 space-y-4 clinical-rim hover:border-[var(--color-gold)]/50 transition-all">
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

        {/* 7. MTM Fix Section */}
        <section
          id="mtm-fix"
          className="space-y-6 border-b border-white/10 pb-16"
        >
          <div className="glass-onyx p-6 sm:p-8 space-y-4 max-w-4xl border-l-4 border-l-[var(--color-gold)] clinical-rim">
            <ForgeSectionHeader
              eyebrow="THE RESOLUTION"
              title={siteCopy.mtmFix.h2}
              subtitle="Structured entity evidence provides neural models with verifiable proof"
            />
            <p className="text-sm sm:text-base text-[var(--color-chrome)] leading-relaxed pt-2">
              {siteCopy.mtmFix.body}
            </p>
          </div>
        </section>

        {/* 8. Deliverables & Limitations Section with Living Inspiration Ignition Hub */}
        <section
          id="deliverables"
          className="space-y-12 border-b border-white/10 pb-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-onyx p-7 space-y-5 clinical-rim flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="forge-echo-containment">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
                    <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[var(--color-gold)]">
                      SCOPE OF DELIVERABLE
                    </span>
                  </div>
                  <div className="data-pulse-badge px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" aria-hidden="true" />
                    <span>Anti-Static Deliverable</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-rim)] font-serif">
                  {siteCopy.deliverables.h2}
                </h2>

                <ul className="space-y-3.5 text-xs sm:text-sm text-[var(--color-chrome)]">
                  {siteCopy.deliverables.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-[var(--color-gold)] font-bold mt-0.5">✓</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 text-[11px] text-[var(--color-gold)] font-mono">
                Delivered as a living interactive knowledge hub (Gemini Notebook / NotebookLM). Never a static PDF.
              </div>
            </div>

            <div className="glass-onyx p-7 space-y-5 clinical-rim">
              <div className="forge-echo-containment">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40" aria-hidden="true" />
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-white/60">
                  TRUTH BOUNDARY
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-rim)] font-serif">
                {siteCopy.limitations.h2}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-chrome)] leading-relaxed">
                {siteCopy.limitations.body}
              </p>
            </div>
          </div>

          {/* Interactive Inspiration Ignition Hub Showcase */}
          <IgnitionHubPreview />
        </section>

        {/* 9. Decision Framework Section */}
        <section
          id="decision-framework"
          className="space-y-6 border-b border-white/10 pb-20"
        >
          <ForgeSectionHeader
            eyebrow="EVALUATION CRITERIA"
            title={siteCopy.decisionFramework.h2}
            subtitle="Determine whether your practice qualifies for the zero-cost I³ visibility diagnostic"
          />

          <div className="glass-onyx p-6 sm:p-8 clinical-rim">
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

        {/* 10. Visible FAQs Section (Server-Rendered HTML) */}
        <section id="faq" className="space-y-8 border-b border-white/10 pb-20">
          <ForgeSectionHeader
            eyebrow="KNOWLEDGE BASE"
            title={siteCopy.faqSection.h2}
            subtitle="Authoritative answers on generative AI search visibility, entity mesh proof, and delivery protocols"
          />

          <div className="space-y-4">
            {siteCopy.faqSection.items.map((item, idx) => (
              <div key={idx} className="glass-onyx p-6 space-y-2 clinical-rim hover:border-[var(--color-gold)]/40 transition-all">
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

        {/* 11. Final CTA Section */}
        <section
          id="final-cta"
          className="space-y-6 pt-4 pb-12 text-center max-w-3xl mx-auto relative"
        >
          <div className="lenz-cta-glow glass-onyx p-8 sm:p-12 rounded-2xl border border-white/15 clinical-rim space-y-6 shadow-2xl">
            <div className="inline-block text-[11px] font-mono font-bold tracking-widest uppercase text-[var(--color-gold)]">
              SOVEREIGN ENTRANCE
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--color-rim)] font-serif sword-blade-glow">
              {siteCopy.finalCta.heading}
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-chrome)] leading-relaxed max-w-2xl mx-auto">
              {siteCopy.finalCta.description}
            </p>
            <div className="pt-2">
              <ModalTrigger label={siteCopy.finalCta.buttonText} />
            </div>
          </div>
        </section>

        {/* 12. Armory Endcap */}
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

      {/* Semantic Footer */}
      <footer className="border-t border-white/10 bg-[var(--color-obsidian)] text-[11px] text-white/50 py-12">
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
