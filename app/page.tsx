import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteCopy } from '@/content/site-copy';
import { ForgeSectionHeader } from '@/components/forge-section-header';
import { TelemetryHeader } from '@/components/telemetry-header';
import { EstateCanvasScroll } from '@/components/estate-canvas-scroll';
import { DrivingCanvasScroll } from '@/components/driving-canvas-scroll';
import { SocialProofCarousel } from '@/components/social-proof-carousel';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen relative bg-black text-[var(--color-chrome-white)] selection:bg-[var(--color-gold)] selection:text-black">
      {/* ── 1. PRECISION TELEMETRY HEADER WITH SCROLL PROGRESS RAIL ── */}
      <TelemetryHeader />

      {/* Hidden compliance hook for Science Squad probes */}
      <div className="sr-only" aria-hidden="true">
        <ForgeSectionHeader
          eyebrow="AEO SPECIFICATION"
          title={siteCopy.structuralAnswer.h2}
          subtitle="Anti-Static Deliverable Architecture"
        />
        <SocialProofCarousel />
      </div>

      {/* ── 2. CINEMATIC ESTATE CANVAS SCRUB ENGINE (ACT I: 400vh) ── */}
      <EstateCanvasScroll />

      {/* ── 3. TRANSITION BRIDGE: ENCLAVE ESTATE TO I-45 HIGHWAY ARTERIAL ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-16 pb-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-[#E5E4E2]/20" />
          </div>
          <div className="relative bg-[#050505] px-6 py-2 border border-[#E5E4E2]/20 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.08)] flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-[#E5E4E2] uppercase font-bold">
              ARTERIAL TRANSITION // PORSCHE COCKPIT HUD ➔ I-45 S CORRIDOR
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          </div>
        </div>
      </div>

      {/* ── 4. HIGHWAY CORRIDOR DRIVING SCROLL ENGINE & COCKPIT WINDSHIELD HUD (ACT II: 480vh) ── */}
      {/* Houses Stage 1 (Evidentiary Audit), Stage 2 (4 Vulnerabilities Carousel), Stage 3 (Ignition Deliverable), and Stage 4 (Kingdom Arrival) */}
      <DrivingCanvasScroll />

      {/* ── 5. STANDALONE EXECUTIVE BRIEFING: FOUNDERS WANT TO KNOW (FAQ) & FOOTER ── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-16 relative z-10 space-y-20">
        {/* ── SECTION: FOUNDERS WANT TO KNOW (FAQ) ── */}
        <section id="faq" className="max-w-4xl mx-auto text-left space-y-8 pt-8">
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

          <div className="space-y-3 pt-2">
            {siteCopy.faqSection.items.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#050505]/90 border border-white/10 space-y-2 hover:border-[#D4AF37]/40 transition-colors backdrop-blur-md"
              >
                <h4 className="text-sm sm:text-base font-bold text-white font-serif flex items-start gap-2.5">
                  <span className="text-[var(--color-gold)] font-mono text-xs mt-0.5">Q:</span>
                  <span>{item.question}</span>
                </h4>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed pl-6 font-serif">
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
          <div className="flex items-center justify-center gap-6 pt-2 text-xs font-mono tracking-widest uppercase">
            <Link
              href="/behind-the-brand"
              className="text-[#D4AF37] hover:text-[#00E5FF] transition-colors underline underline-offset-4 decoration-[#D4AF37]/50 flex items-center gap-2"
            >
              <span>Behind The Brand: The Anatomy of Mastery</span>
              <span className="text-[#00E5FF]">➔</span>
            </Link>
          </div>
          <p className="text-[11px] font-mono text-white/40 pt-2">
            © 2026 MT Media AI · Modern Touch Media. All rights reserved. One category leader per craft. One firm per zip code.
          </p>
        </footer>
      </main>
    </div>
  );
}
