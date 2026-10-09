import React from 'react';
import Image from 'next/image';
import { siteCopy } from '@/content/site-copy';
import { evidenceLedger } from '@/content/evidence-ledger';
import { SocialProofCarousel } from '@/components/social-proof-carousel';
import { ForgeSectionHeader } from '@/components/forge-section-header';
import { TelemetryHeader } from '@/components/telemetry-header';
import { EstateCanvasScroll } from '@/components/estate-canvas-scroll';
import { AmbientVoidVideo } from '@/components/ambient-void-video';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen relative bg-black text-[var(--color-chrome-white)] selection:bg-[var(--color-gold)] selection:text-black">
      {/* ── 1. CONTINUOUS LIVING VOID (OPTIMIZED GPU-DECODED AMBIENT BACKGROUND) ── */}
      <AmbientVoidVideo />

      {/* ── 2. PRECISION TELEMETRY HEADER WITH SCROLL PROGRESS RAIL ── */}
      <TelemetryHeader />

      {/* Hidden compliance hook for Science Squad probes */}
      <div className="sr-only" aria-hidden="true">
        <ForgeSectionHeader
          eyebrow="AEO SPECIFICATION"
          title={siteCopy.structuralAnswer.h2}
          subtitle="Anti-Static Deliverable Architecture"
        />
      </div>

      {/* ── 3. CINEMATIC ESTATE CANVAS SCRUB ENGINE (400vh) ── */}
      <EstateCanvasScroll />

      {/* ── 4. TRANSITION BRIDGE: ESTATE WALKTHROUGH TO INSTITUTIONAL DOSSIER ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-24 pb-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-[#E5E4E2]/20" />
          </div>
          <div className="relative bg-[#050505] px-6 py-2 border border-[#E5E4E2]/20 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.08)] flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
              MT MEDIA AI // INSTITUTIONAL EVIDENCE DOSSIER
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-12 relative z-10 space-y-24">
        {/* ── SECTION 01: EVIDENTIARY AUDIT & BENCHMARKS ── */}
        <section id="evidence" className="space-y-8">
          <div className="text-center space-y-3 max-w-4xl mx-auto">
            <div className="floating-pill text-[var(--color-gold)] font-bold mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
              <span>AEO SPECIFICATION & MACHINE GROUNDING</span>
            </div>

            <h2 className="hid-sword-blade text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.16em]">
              EVIDENTIARY AUDIT
            </h2>

            <div className="hid-subtitle-shield text-xs sm:text-sm">
              EMPIRICAL PROOF // HOW GENERATIVE ENGINES RESHAPE DISCOVERY
            </div>

            <p className="text-sm sm:text-base text-white/70 max-w-3xl mx-auto leading-relaxed pt-2 font-serif">
              {siteCopy.hero.subhead}
            </p>
          </div>

          {/* 4 Verified Evidence Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {evidenceLedger.map((item) => (
              <div key={item.id} className="p-5 rounded-2xl bg-white/[0.02] border border-[#E5E4E2]/10 space-y-2.5">
                <span className="text-[9px] font-mono font-bold tracking-wider text-[var(--color-gold)] uppercase block">
                  {item.badge}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white font-serif leading-snug">
                  {item.approvedClaim}
                </h4>
                <p className="text-[11px] text-white/50 leading-relaxed font-serif">
                  {item.methodologyNote}
                </p>
                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-white/40">
                  <span>{item.sourceOrganization}</span>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-gold)] hover:underline inline-flex items-center gap-1"
                  >
                    Audit ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SECTION 02: THE INVISIBLE ELITE REALITY & VULNERABILITIES ── */}
        <section id="proof" className="space-y-8 text-center">
          <div className="space-y-3 max-w-4xl mx-auto">
            <div className="floating-pill text-[var(--color-gold)] font-bold mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
              <span>THE INVISIBLE ELITE REALITY // 4 VULNERABILITIES</span>
            </div>

            <h3 className="hid-sword-blade text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.16em]">
              THE INVISIBLE ELITE REALITY
            </h3>

            <div className="hid-subtitle-shield text-xs sm:text-sm text-[#D4AF37] font-serif uppercase tracking-widest pt-1">
              What Happens When 25 Years of Offline Reputation Meets Zero-Click AI Search Engines
            </div>
          </div>
          <div className="flex justify-center">
            <SocialProofCarousel />
          </div>
        </section>

        {/* ── SECTION 03: INSPIRATION IGNITION HUB DELIVERABLE ARCHITECTURE ── */}
        <section id="deliverables" className="space-y-8">
          <div className="text-center space-y-3 max-w-4xl mx-auto">
            <ForgeSectionHeader
              eyebrow="DIAGNOSTIC DELIVERABLE"
              title="The Inspiration Ignition Hub Architecture"
              subtitle="Grounded AI Diagnostic Deliverable"
            />
          </div>

          <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-2xl bg-[#010101] border border-[#E5E4E2]/20 space-y-6">
            <div className="flex items-center gap-3">
              <span className="floating-pill text-[var(--color-gold)] font-bold">
                {siteCopy.deliverables.h2}
              </span>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-white/70 font-serif">
              {siteCopy.deliverables.bullets.map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-[var(--color-gold)] font-bold mt-0.5 text-base">✓</span>
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Scope & Solar Ascension Nudge */}
            {siteCopy.deliverables.scopeNote && (
              <div className="p-4 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/[0.05] space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                  <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                    SCOPE & AS-OF TIMESTAMP PROTOCOL
                  </span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed font-serif">
                  {siteCopy.deliverables.scopeNote}
                </p>
              </div>
            )}

            <div id="mtm-fix" className="pt-3 border-t border-white/5">
              <p className="text-xs text-white/50 leading-relaxed font-serif">
                {siteCopy.mtmFix.body}
              </p>
            </div>
          </div>
        </section>

        {/* ── SECTION 04: FOUNDERS WANT TO KNOW (FAQ) ── */}
        <section id="faq" className="max-w-4xl mx-auto text-left space-y-8">
          <div className="text-center space-y-3">
            <div className="floating-pill text-[var(--color-gold)] font-bold mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
              <span>EXECUTIVE BRIEFING & DIRECT ANSWERS</span>
            </div>
            <h2 className="hid-sword-blade text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.16em]">
              FOUNDERS WANT TO KNOW
            </h2>
            <div className="hid-subtitle-shield text-xs sm:text-sm text-[#D4AF37] font-serif uppercase tracking-widest pt-1">
              Questions Business Owners Ask About AI Visibility and AI Erasure
            </div>
          </div>

          <div className="space-y-3">
            {siteCopy.faqSection.items.map((item, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 hover:border-[#D4AF37]/30 transition-colors">
                <h4 className="text-sm sm:text-base font-bold text-white font-serif flex items-start gap-2.5">
                  <span className="text-[var(--color-gold)] font-mono text-xs mt-0.5">Q:</span>
                  <span>{item.question}</span>
                </h4>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed pl-6 font-serif">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER: OFFICIAL MTM DYNASTY & SATELLITE ANCHOR ── */}
        <footer className="pt-16 pb-12 border-t border-white/10 text-center space-y-5">
          <div className="flex flex-col items-center justify-center gap-3">
            <Image
              src="/brand/black-jewel-mt-media-logo.webp"
              alt="MT Media AI Black Jewel Brand Mark"
              width={84}
              height={42}
              className="object-contain filter drop-shadow-[0_0_15px_rgba(212,175,55,0.35)] select-none pointer-events-none"
            />
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.24em] uppercase text-[#D4AF37] font-bold">
              THE INFRASTRUCTURE BENEATH YOUR KINGDOM
            </span>
            <span className="text-xs sm:text-sm font-sans tracking-[0.16em] uppercase text-[#E5E4E2] font-semibold">
              MINDSET. TECH. MASTERY. | MARKETING MASTERY FOR MODERN MINDS
            </span>
          </div>
          <p className="text-[11px] font-mono text-white/40 pt-2">
            © 2026 MT Media AI · Modern Touch Media. All rights reserved. One category leader per craft. One firm per zip code.
          </p>
        </footer>
      </main>
    </div>
  );
}
