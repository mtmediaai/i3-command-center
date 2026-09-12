import React from 'react';
import { siteCopy } from '@/content/site-copy';
import { Monogram } from '@/components/monogram';
import { PreferredSourceSlot } from '@/components/preferred-sources';
import { ModalTrigger } from '@/components/modal-trigger';
import { SocialProofCarousel } from '@/components/social-proof-carousel';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-[var(--color-void)] text-[var(--color-rim)]">
      {/* Semantic Header */}
      <header className="border-b border-white/10 bg-[var(--color-void)]/95 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Monogram size={34} />
            <span className="text-sm font-semibold tracking-wider text-[var(--color-rim)] uppercase">
              {siteCopy.header.brandName}
            </span>
          </div>
          <nav aria-label="Primary Navigation" className="flex items-center gap-5 sm:gap-7 text-xs text-[var(--color-chrome)]">
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

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 space-y-28 relative z-10">
        {/* Section 1: Hero */}
        <section id="hero" className="space-y-6 pt-6 pb-12 border-b border-white/10 relative">
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

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <ModalTrigger label={siteCopy.hero.primaryCta} />
            <a
              href={siteCopy.hero.ghostCta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded border border-white/20 text-xs font-semibold text-[var(--color-rim)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
            >
              {siteCopy.hero.ghostCta.label}
            </a>
          </div>

          <PreferredSourceSlot
            fallbackUrl={siteCopy.hero.preferredSourcesFallbackUrl}
            label={siteCopy.hero.preferredSourcesLabel}
          />

          <SocialProofCarousel />
        </section>

        {/* Section 2: Old Way */}
        <section id="old-way" className="space-y-10 border-b border-white/10 pb-20">
          <div className="space-y-3">
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
              {siteCopy.oldWay.eyebrow}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--color-rim)] font-serif">
              {siteCopy.oldWay.heading}
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-chrome)] max-w-3xl leading-relaxed">
              {siteCopy.oldWay.description}
            </p>
          </div>

          {/* Phase B Stat Pack */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Object.entries(siteCopy.oldWay.stats).map(([statKey, stat]) => (
              <div
                key={statKey}
                className="glass-panel p-6 min-h-[160px] flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[var(--color-gold)] tracking-tight font-serif">
                    {stat.value || ''}
                  </div>
                  <p className="text-xs text-[var(--color-rim)]/90 mt-3 leading-relaxed">
                    {stat.label}
                  </p>
                </div>
                {stat.source && (
                  <div className="text-[10px] text-white/40 mt-4 pt-2 border-t border-white/5 font-mono">
                    {stat.source}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: New Way */}
        <section id="new-way" className="space-y-10 border-b border-white/10 pb-20">
          <div className="space-y-3">
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
              {siteCopy.newWay.eyebrow}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--color-rim)] font-serif">
              {siteCopy.newWay.heading}
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-chrome)] max-w-3xl leading-relaxed">
              {siteCopy.newWay.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteCopy.newWay.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="glass-panel p-7 space-y-4"
              >
                <div className="text-xs font-mono font-bold text-[var(--color-gold)] tracking-wider">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-[var(--color-rim)] font-serif">
                  {pillar.title}
                </h3>
                <p className="text-xs leading-relaxed text-[var(--color-chrome)]">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Evidence */}
        <section id="evidence" className="space-y-10 border-b border-white/10 pb-20">
          <div className="space-y-3">
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
              {siteCopy.evidence.eyebrow}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[var(--color-rim)] font-serif">
              {siteCopy.evidence.heading}
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-chrome)] max-w-3xl leading-relaxed">
              {siteCopy.evidence.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteCopy.evidence.figures.map((fig) => (
              <figure
                key={fig.id}
                className="glass-panel p-6 space-y-4"
              >
                <div className="h-44 rounded border border-dashed border-white/20 bg-black/60 flex items-center justify-center p-6 text-center">
                  <span className="text-xs text-[var(--color-chrome)] font-mono leading-relaxed">
                    {fig.description}
                  </span>
                </div>
                <figcaption className="text-xs text-[var(--color-gold)] font-mono">
                  {fig.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Section 5: Endcap Cross-Merchandising */}
        <section id="endcap" className="glass-panel p-8 sm:p-10 space-y-5 border-l-4 border-l-[var(--color-gold)]">
          <div className="text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
            {siteCopy.endcap.eyebrow}
          </div>
          <h2 className="text-xl sm:text-3xl font-bold text-[var(--color-rim)] font-serif">
            {siteCopy.endcap.title}
          </h2>
          <p className="text-sm text-[var(--color-chrome)] max-w-2xl leading-relaxed">
            {siteCopy.endcap.description}
          </p>
          <div className="pt-2">
            <a
              href={siteCopy.endcap.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded border border-white/30 text-xs font-semibold text-white hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
            >
              <span>{siteCopy.endcap.ctaLabel}</span>
              <span>→</span>
            </a>
          </div>
        </section>

        {/* Section 6: CTA */}
        <section id="cta" className="p-10 sm:p-16 rounded-xl border border-[var(--color-gold)]/40 lenz-cta-glow space-y-7 text-center shadow-[0_0_40px_rgba(212,175,55,0.08)]">
          <div className="text-xs font-bold tracking-widest uppercase text-[var(--color-gold)]">
            {siteCopy.cta.eyebrow}
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-[var(--color-rim)] max-w-2xl mx-auto font-serif">
            {siteCopy.cta.heading}
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-chrome)] max-w-xl mx-auto leading-relaxed">
            {siteCopy.cta.description}
          </p>
          <div className="pt-2">
            <ModalTrigger label={siteCopy.cta.buttonText} />
          </div>
          <div className="pt-4 flex justify-center">
            <PreferredSourceSlot
              fallbackUrl={siteCopy.cta.preferredSourcesFallbackUrl}
              label={siteCopy.hero.preferredSourcesLabel}
            />
          </div>
        </section>
      </main>

      {/* Semantic Footer with Recursive Attribution Seal */}
      <footer className="border-t border-white/10 bg-[var(--color-void)] py-14 mt-20 text-xs text-[var(--color-chrome)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="footer-disclaimer space-y-2 border-b border-white/10 pb-6 text-white/70">
            <p>{siteCopy.footer.disclaimer}</p>
            <p>{siteCopy.footer.aiDisclosure}</p>
          </div>

          <div className="attribution-seal-box space-y-2 text-center sm:text-left">
            <div className="font-semibold text-[var(--color-gold)] text-xs tracking-wide">
              {siteCopy.footer.attributionSeal}
            </div>
            <div className="text-[11px] text-[var(--color-chrome)] font-mono">
              Authored by Kareem Daniel, Founder of MT Media AI | Enhanced by Circuit, MT Media AI | Published by MT Media AI · Modern Touch Media
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
            <div className="space-y-1">
              <div className="font-semibold text-[var(--color-rim)]">
                {siteCopy.footer.location}
              </div>
              <div className="text-[11px] text-white/50">{siteCopy.footer.entityHandle}</div>
            </div>

            <div className="flex flex-wrap items-center gap-5 sm:gap-7">
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

          <div className="pt-4 border-t border-white/5 text-[11px] text-white/40">
            {siteCopy.footer.privacyLine}
          </div>
        </div>
      </footer>
    </div>
  );
}
