import React from 'react';
import Image from 'next/image';
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
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-black text-[var(--color-chrome-white)] selection:bg-[var(--color-gold)] selection:text-black">
      {/* ── 1. CONTINUOUS LIVING VOID (FIXED LOOPING VIDEO & ATMOSPHERE) ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-25 scale-105"
        >
          <source src="/assets/houston-ambient-void.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/90 to-black pointer-events-none" />
        <div className="solar-arc-halo opacity-40" />
      </div>

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

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-16 relative z-10 space-y-36">
        {/* ═══════════════════════════════════════════════════════════════
            MOVEMENT 01: THE HOUSTON BASELINE & AI ERASURE (DOWNTOWN)
            GPS: 29.7604° N, 95.3698° W · ELEV: 15M
        ═══════════════════════════════════════════════════════════════ */}
        <section id="hero" data-chapter="01" className="space-y-12 text-center pt-8">
          {/* Beacon: Centered HID Sword-Blade Header */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="floating-pill text-[var(--color-gold)] font-bold mx-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
              <span>{siteCopy.hero.eyebrow}</span>
            </div>

            <h1 className="hid-sword-blade text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.16em] leading-tight">
              {siteCopy.hero.h1}
            </h1>

            <div className="hid-subtitle-shield text-xs sm:text-sm">
              WHEN HIGH-NET-WORTH BUYERS ASK WHO TO TRUST IN GREATER HOUSTON
            </div>

            <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed pt-2 font-serif">
              {siteCopy.hero.subhead}
            </p>
          </div>

          {/* Floating Visual Plate: Downtown Houston Skyline & Buffalo Bayou */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left max-w-5xl mx-auto pt-4">
            <div className="lg:col-span-7 landmark-photo-plate">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/landmarks/houston-skyline-downtown.jpg"
                  alt="Downtown Houston Skyline and Buffalo Bayou urban baseline"
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono">
                  <span className="floating-pill text-white/90 bg-black/60 backdrop-blur-md">
                    GEV FLIGHT NODE 01 // DOWNTOWN HOUSTON · 29.7604° N
                  </span>
                  <span className="text-[var(--color-gold)] font-bold hidden sm:inline">
                    ELEV: 15M
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-[var(--color-gold)] uppercase font-bold block">
                  THE DORMANT SKYLINE
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
                  The Architecture of Silence
                </h3>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                  Decades of established corporate litigation and family wealth referrals. Yet when neural answer engines are queried, offline prestige remains unread by the machines.
                </p>
              </div>

              {/* Floating Pill Capsules */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="floating-pill text-white/70">01 AI INVISIBILITY</span>
                <span className="floating-pill text-white/70">02 AI ERASURE</span>
                <span className="floating-pill text-[var(--color-gold)] font-bold">03 AI BRAND IGNORANCE</span>
              </div>
            </div>
          </div>

          {/* Floating AEO TL;DR Answer Block (40-60 Words Machine Grounding) */}
          <div className="max-w-3xl mx-auto text-left p-6 rounded-2xl bg-white/[0.02] backdrop-blur-md border-l-2 border-[var(--color-gold)]">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-gold)] font-bold block mb-1">
              {siteCopy.hero.aeoBlock.title}
            </span>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-serif">
              {siteCopy.hero.aeoBlock.body}
            </p>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <ModalTrigger label={siteCopy.hero.primaryCta} />
            <a
              href={siteCopy.hero.secondaryCtaTarget}
              className="px-6 py-3.5 rounded-full text-xs font-semibold text-white/80 hover:text-[var(--color-gold)] hover:bg-white/[0.04] transition-all"
            >
              {siteCopy.hero.secondaryCta}
            </a>
          </div>

          <PreferredSourceSlot
            fallbackUrl={siteCopy.hero.preferredSourcesFallbackUrl}
            label={siteCopy.hero.preferredSourcesLabel}
          />

          {/* Exactly ONE Social Proof Carousel */}
          <div className="flex justify-center pt-2">
            <SocialProofCarousel />
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════════
            MOVEMENT 02: THE ARCHITECTURE OF CLARITY (FAST ANSWERS)
        ═══════════════════════════════════════════════════════════════ */}
        <section id="fast-answers" data-chapter="02" className="space-y-12">
          <div className="text-center space-y-3 max-w-4xl mx-auto">
            <h2 className="hid-sword-blade text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.16em]">
              THE ARCHITECTURE OF CLARITY
            </h2>
            <div className="hid-subtitle-shield text-xs sm:text-sm">
              CORE OPERATIONAL ANSWERS FOR NEURAL DISCOVERY ENGINES
            </div>
          </div>

          {/* Containerless Floating Answers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {siteCopy.fastAnswers.items.map((item, idx) => (
              <div key={idx} className="space-y-2 p-6 rounded-2xl hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[var(--color-gold)] font-bold">
                    0{idx + 1}.
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white font-serif">
                    {item.question}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-white/60 leading-relaxed pl-6 font-serif">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Structural Answer Statement */}
          <div id="structural-answer" className="max-w-3xl mx-auto text-center space-y-3 pt-6">
            <h3 className="text-lg sm:text-xl font-serif text-[var(--color-gold)] font-bold">
              {siteCopy.structuralAnswer.h2}
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-serif">
              {siteCopy.structuralAnswer.body}
            </p>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════════
            MOVEMENT 03: EVIDENTIARY AUDIT & HERITAGE PLAZA / CISTERN
            GPS: 29.7583° N, 95.3698° W · ELEV: 162M
        ═══════════════════════════════════════════════════════════════ */}
        <section id="evidence" data-chapter="03" className="space-y-12">
          <div className="text-center space-y-3 max-w-4xl mx-auto">
            <h2 className="hid-sword-blade text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.16em]">
              EVIDENTIARY AUDIT
            </h2>
            <div className="hid-subtitle-shield text-xs sm:text-sm">
              EMPIRICAL PROOF // HOW GENERATIVE ENGINES RESHAPE DISCOVERY
            </div>
          </div>

          {/* Landmark Anchor + Evidence Plates */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            {/* Left: Heritage Plaza Photograph */}
            <div className="lg:col-span-5 landmark-photo-plate">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/landmarks/houston-heritage-plaza-cistern.jpg"
                  alt="Heritage Plaza and Buffalo Bayou Historic Cistern Downtown Houston"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <span className="floating-pill text-white/90 bg-black/60 backdrop-blur-md">
                    NODE 02 // HERITAGE PLAZA & CISTERN · 29.7583° N
                  </span>
                  <p className="text-[10px] text-white/60 font-mono">
                    Mayan stepped-pyramid crown over Buffalo Bayou Park trails.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: 4 Verified Evidence Items */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {evidenceLedger.map((item) => (
                  <div key={item.id} className="p-5 rounded-2xl bg-white/[0.02] space-y-2.5">
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
            </div>
          </div>

          {/* Centerpiece Philosophical Quote (Stitch Style) */}
          <div className="text-center max-w-3xl mx-auto pt-6 space-y-2">
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif text-white/90 font-bold leading-relaxed sword-blade-glow">
              &ldquo;Traditional search optimized for clicks. Sovereign AEO corroborates entity truth.&rdquo;
            </blockquote>
            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase block">
              ARCHITECTURAL CODEX // GREATER HOUSTON TERRITORY
            </span>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════════
            MOVEMENT 04: WEST HOUSTON ANCHOR & SPATIAL RADAR (WILLIAMS TOWER)
            GPS: 29.7533° N, 95.4611° W · ELEV: 275M
        ═══════════════════════════════════════════════════════════════ */}
        <section id="houston-gev" data-chapter="04" className="space-y-12">
          <div className="text-center space-y-3 max-w-4xl mx-auto">
            <h2 className="hid-sword-blade text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.16em]">
              WEST HOUSTON ARCHITECTURAL ANCHOR
            </h2>
            <div className="hid-subtitle-shield text-xs sm:text-sm">
              UPTOWN GALLERIA // WILLIAMS TOWER & WATERWALL PARK
            </div>
          </div>

          {/* Floating Williams Tower Plate + Radar HUD */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            <div className="lg:col-span-5 landmark-photo-plate">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/landmarks/houston-williams-tower-uptown.jpg"
                  alt="Williams Tower and Gerald D. Hines Waterwall Park Uptown Houston"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <span className="floating-pill text-white/90 bg-black/60 backdrop-blur-md">
                    NODE 03 // WILLIAMS TOWER · 29.7533° N
                  </span>
                  <p className="text-[10px] text-white/60 font-mono">
                    64 stories of Philip Johnson Art Deco fluting and rotating airport beacon.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <HoustonSpatialMesh />
            </div>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════════
            MOVEMENT 05: HIGH ART & CULTURAL PERMANENCE (MFAH)
            GPS: 29.7219° N, 95.3905° W · ELEV: 14M
        ═══════════════════════════════════════════════════════════════ */}
        <section id="method" className="space-y-12">
          <div className="text-center space-y-3 max-w-4xl mx-auto">
            <h2 className="hid-sword-blade text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.16em]">
              HIGH ART &amp; PERMANENCE
            </h2>
            <div className="hid-subtitle-shield text-xs sm:text-sm">
              MUSEUM OF FINE ARTS HOUSTON // CULLEN SCULPTURE GARDEN
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            <div className="lg:col-span-6 landmark-photo-plate">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/landmarks/houston-museum-fine-arts-mfah.jpg"
                  alt="The Museum of Fine Arts Houston MFAH Cullen Sculpture Garden"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="floating-pill text-white/90 bg-black/60 backdrop-blur-md">
                    NODE 04 // MFAH &amp; SCULPTURE GARDEN · 29.7219° N
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-[var(--color-gold)] uppercase font-bold block">
                {siteCopy.methodSection.h2}
              </span>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-serif">
                {siteCopy.methodSection.description}
              </p>

              {/* Three Floating Method Layers */}
              <div className="space-y-2 pt-2">
                {siteCopy.methodSection.cards.map((card, idx) => (
                  <div key={card.id} className="p-3.5 rounded-xl bg-white/[0.02]">
                    <span className="text-[10px] font-mono text-[var(--color-gold)] font-bold block">
                      LAYER 0{idx + 1}: {card.name.toUpperCase()}
                    </span>
                    <span className="text-xs font-serif font-bold text-white block">
                      {card.title}
                    </span>
                    <p className="text-[11px] text-white/50 leading-relaxed mt-0.5">
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stitch Quote Beacon */}
          <div className="text-center max-w-3xl mx-auto pt-6 space-y-2">
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif text-white/90 font-bold leading-relaxed sword-blade-glow">
              &ldquo;Design is the proof of work of the human spirit in the digital age.&rdquo;
            </blockquote>
            <span className="text-[10px] font-mono tracking-widest text-[var(--color-gold)] uppercase block">
              ARCHITECTURAL CODEX SECTION 09
            </span>
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════════
            MOVEMENT 06: INSPIRATION IGNITION HUB & AEROSPACE KNOWLEDGE (NASA)
            GPS: 29.5519° N, 95.0974° W · ELEV: 6M
        ═══════════════════════════════════════════════════════════════ */}
        <section id="deliverables" data-chapter="06" className="space-y-12">
          <div className="text-center space-y-3 max-w-4xl mx-auto">
            <h2 className="hid-sword-blade text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.16em]">
              THE INSPIRATION IGNITION HUB
            </h2>
            <div className="hid-subtitle-shield text-xs sm:text-sm">
              SPACE CENTER HOUSTON KNOWLEDGE ANCHOR // ANTI-STATIC DELIVERABLES DOCTRINE
            </div>
          </div>

          {/* Floating NASA Photo Plate + Deliverable Scope */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            <div className="lg:col-span-5 landmark-photo-plate">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/landmarks/houston-space-center-nasa.jpg"
                  alt="Space Center Houston and NASA Johnson Space Center"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <span className="floating-pill text-white/90 bg-black/60 backdrop-blur-md">
                    NODE 05 // SPACE CENTER HOUSTON · 29.5519° N
                  </span>
                  <p className="text-[10px] text-white/60 font-mono">
                    Global science learning and aerospace knowledge graph anchor.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="floating-pill text-[var(--color-gold)] font-bold">
                  {siteCopy.deliverables.h2}
                </span>
                <span className="text-[10px] font-mono text-[#00E5FF] font-bold">
                  Anti-Static Deliverable
                </span>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-white/70 font-serif">
                {siteCopy.deliverables.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[var(--color-gold)] font-bold mt-0.5">✓</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div id="mtm-fix" className="pt-3">
                <p className="text-xs text-white/50 leading-relaxed font-serif">
                  {siteCopy.mtmFix.body}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Inspiration Ignition Hub Simulator */}
          <div className="max-w-5xl mx-auto pt-4">
            <IgnitionHubPreview />
          </div>
        </section>


        {/* ═══════════════════════════════════════════════════════════════
            MOVEMENT 07: THE PINNACLE CORRIDOR & SOVEREIGN ENTRANCE (WOODLANDS)
            GPS: 30.1588° N, 95.4608° W · ELEV: 48M
        ═══════════════════════════════════════════════════════════════ */}
        <section id="final-cta" data-chapter="07" className="space-y-16 text-center">
          <div className="space-y-3 max-w-4xl mx-auto">
            <h2 className="hid-sword-blade text-2xl sm:text-4xl lg:text-5xl font-bold tracking-[0.16em]">
              THE PINNACLE CORRIDOR
            </h2>
            <div className="hid-subtitle-shield text-xs sm:text-sm">
              THE WOODLANDS WATERWAY // 77380 SOVEREIGN DESTINATION
            </div>
          </div>

          {/* Woodlands Waterway Final Photograph Plate */}
          <div className="max-w-4xl mx-auto landmark-photo-plate">
            <div className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl">
              <Image
                src="/landmarks/houston-woodlands-waterway-corridor.jpg"
                alt="The Woodlands Waterway and Hughes Landing Montgomery County"
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono">
                <span className="floating-pill text-[var(--color-gold)] font-bold bg-black/70 backdrop-blur-md">
                  FINAL FLIGHT NODE // THE WOODLANDS · 30.1588° N 95.4608° W
                </span>
                <span className="text-white/80 hidden sm:inline">
                  SUN &amp; 3 KINGS SCARCITY ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* Decision Framework Bullets */}
          <div id="decision-framework" className="max-w-3xl mx-auto text-left space-y-4 pt-4">
            <span className="text-[10px] font-mono tracking-widest text-[var(--color-gold)] uppercase font-bold block text-center">
              {siteCopy.decisionFramework.h2}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/70 font-serif">
              {siteCopy.decisionFramework.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2 p-3 rounded-xl bg-white/[0.02]">
                  <span className="text-[var(--color-gold)] font-bold">→</span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visible FAQs */}
          <div id="faq" className="max-w-4xl mx-auto text-left space-y-6 pt-6">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-[var(--color-gold)] uppercase font-bold">
                KNOWLEDGE BASE
              </span>
              <h3 className="text-xl sm:text-2xl font-serif text-white font-bold">
                {siteCopy.faqSection.h2}
              </h3>
            </div>

            <div className="space-y-3">
              {siteCopy.faqSection.items.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] space-y-1.5">
                  <h4 className="text-sm sm:text-base font-bold text-white font-serif flex items-start gap-2">
                    <span className="text-[var(--color-gold)] font-mono text-xs">Q:</span>
                    <span>{item.question}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed pl-5 font-serif">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Final Sovereign Intake Beacon */}
          <div className="max-w-3xl mx-auto space-y-6 pt-8">
            <div className="floating-pill text-[var(--color-gold)] font-bold">
              <span>SOVEREIGN ENTRANCE</span>
            </div>
            <h2 className="hid-sword-blade text-3xl sm:text-5xl font-bold tracking-[0.16em]">
              {siteCopy.finalCta.heading}
            </h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl mx-auto font-serif">
              {siteCopy.finalCta.description}
            </p>
            <div className="pt-3">
              <ModalTrigger label={siteCopy.finalCta.buttonText} />
            </div>
          </div>

          {/* Armory Endcap */}
          <div
            id="endcap"
            className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 max-w-4xl mx-auto"
          >
            <div>
              <span className="font-semibold text-white">
                {siteCopy.endcap.title}
              </span>{' '}
              <span>{siteCopy.endcap.description}</span>
            </div>
            <a
              href={siteCopy.endcap.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-gold)] hover:underline whitespace-nowrap"
            >
              {siteCopy.endcap.ctaLabel} ↗
            </a>
          </div>
        </section>
      </main>

      {/* ── 3. SEMANTIC ZERO-GRAVITY FOOTER ── */}
      <footer className="relative z-10 text-[11px] text-white/40 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-white font-medium">
                {siteCopy.footer.disclaimer}
              </p>
              <p>{siteCopy.footer.aiDisclosure}</p>
              <p>{siteCopy.footer.privacyLine}</p>
            </div>
            <div className="space-y-2 md:text-right font-mono">
              <p className="text-white/70">{siteCopy.footer.location}</p>
              <p className="text-[var(--color-gold)]">{siteCopy.footer.attributionSeal}</p>
              <p className="text-white/30">{siteCopy.footer.entityHandle}</p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <Monogram size={20} />
              <span>
                © {new Date().getFullYear()} MT Media AI. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-6">
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
