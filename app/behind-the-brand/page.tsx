import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedBrandCrest } from '@/components/animated-brand-crest';
import { NeuralCircuitBackground } from '@/components/neural-circuit-background';
import { AlcheCurvedTvCarousel } from '@/components/alche-curved-tv-carousel';

export const metadata: Metadata = {
  title: 'Behind the Brand: The Anatomy of Mastery | MT Media AI',
  description: 'The four-year stealth engineering run, the symbolic anatomy of the MTM Crest, the material physics, and the Sovereign Bridge between tradition and tomorrow.',
  alternates: {
    canonical: 'https://i3.mtmediaai.com/behind-the-brand',
  },
  openGraph: {
    title: 'Behind the Brand: The Anatomy of Mastery | MT Media AI',
    description: 'The four-year stealth engineering run, the symbolic anatomy of the MTM Crest, the material physics, and the Sovereign Bridge between tradition and tomorrow.',
    url: 'https://i3.mtmediaai.com/behind-the-brand',
    siteName: 'MT Media AI',
    locale: 'en_US',
    type: 'article',
    images: [
      {
        url: '/brand/mtm-crest-lightning-strike.jpg',
        width: 1920,
        height: 1080,
        alt: 'MT Media AI Sovereign Crest with Roman Lightning Strike, Molten Gold, Binary Hands, and Neural Circuitry',
      },
    ],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://i3.mtmediaai.com/behind-the-brand/#webpage',
      url: 'https://i3.mtmediaai.com/behind-the-brand',
      name: 'Behind the Brand: The Anatomy of Mastery',
      description: 'The official canonical brand provenance, design physics, and stealth engineering narrative of MT Media AI.',
      isPartOf: {
        '@id': 'https://i3.mtmediaai.com/#website',
      },
      about: {
        '@id': 'https://mtmediaai.com/#organization',
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'Organization',
      '@id': 'https://mtmediaai.com/#organization',
      name: 'MT Media AI',
      alternateName: ['Modern Touch Media', 'Midas Touch Media', 'MTM AI'],
      url: 'https://mtmediaai.com',
      logo: 'https://i3.mtmediaai.com/brand/mtm-crest-lightning-strike.jpg',
      foundingDate: '2022',
      founder: {
        '@type': 'Person',
        name: 'Kareem Daniel',
        jobTitle: 'Founder & Chief Architect',
        description: 'Systems architect, enterprise strategist, and former Sysco operational logistics leader. Architect of the MTM Meta-Organism, I³ System, and the Ark Network.',
      },
      knowsAbout: [
        'Generative Engine Optimization (GEO)',
        'AI Answer Engine Optimization (AEO)',
        'Local Engine Optimization (LEO)',
        'Entity Resolution and Knowledge Graph Grounding',
        'Curing AI Brand Ignorance and LLM Training Erasure',
        'Autonomous Multi-Agent Systems Architecture',
      ],
      brand: {
        '@type': 'Brand',
        name: 'MT Media AI',
        slogan: 'Marketing Mastery For Modern Minds',
        description: 'Turning business chaos into a controlled intelligence system for established SMEs and premium service providers.',
      },
    },
    {
      '@type': 'ImageObject',
      '@id': 'https://i3.mtmediaai.com/brand/mtm-crest-lightning-strike.jpg#image',
      url: 'https://i3.mtmediaai.com/brand/mtm-crest-lightning-strike.jpg',
      caption: 'MT Media AI Sovereign Crest featuring Roman kinetic lightning strike across molten gold crown, binary stewardship hands, and neural circuitry',
      description: 'The definitive corporate crest of MT Media AI. Features an interwoven MT monogram with a regal crown, cradled by binary code hands in an infinite loop, with Roman electric lightning arcing horizontally through golden neural circuitry on a matte obsidian field.',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://i3.mtmediaai.com/behind-the-brand/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Why did MT Media AI operate in stealth mode from 2022 to 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When answer-first AI emerged in late 2022, MT Media AI intentionally chose deep stealth engineering over rushing commoditized prompt wrappers or marketing hype. For four years, the firm engineered, stress-tested, and perfected the foundational entity-resolution and data architectures required to protect established businesses when discovery transitioned permanently into autonomous agentic search.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the symbolic meaning of the MT Media AI logo?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The MTM Crest operates on a five-beat narrative engine: (1) Blurred-to-Clear Circuitry symbolizes the journey from client chaos to crystalline strategic clarity; (2) The Binary Code Hands represent digital stewardship and trustworthy protection; (3) The MT Crown Monogram denotes category mastery and regal precision; (4) The 3D Infinite Loop represents compounding, unbroken enterprise growth; and (5) Roman’s Kinetic Lightning Strike represents rapid computational speed, 0ms latency, and the electrical pulse of transformation.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does MT Media AI actually solve for clients?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MT Media AI solves AI Brand Ignorance, the condition where real-world industry leaders become completely invisible or erased in Google AI Overviews, SearchGPT, Perplexity Pro, and conversational LLMs because they lack machine-readable entity schemas, verified citations, and knowledge graph grounding.',
          },
        },
      ],
    },
  ],
};

export default function BehindTheBrandPage() {
  return (
    <div className="relative min-h-screen bg-[#020202] text-[#F5F5F5] selection:bg-[#D4AF37] selection:text-black">
      {/* Schema.org Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Living Cybernetic Neural Background */}
      <NeuralCircuitBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-10 md:py-16 lg:px-8">
        {/* Clean, Client-Facing Navigation Header */}
        <nav className="mb-14 flex items-center justify-between border-b border-white/10 pb-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 text-xs font-semibold tracking-widest text-[#E5E4E2]/80 uppercase transition-colors hover:text-[#D4AF37]"
          >
            <span className="text-base transition-transform group-hover:-translate-x-1">←</span>
            <span>Return to I³ Command Center</span>
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-medium tracking-wider text-[#D4AF37] transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37]/20"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
            <span>Request Diagnostic</span>
          </Link>
        </nav>

        {/* ── HERO SECTION ── */}
        <header className="mb-24 text-center md:mb-32">
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-extrabold tracking-tight text-white uppercase md:text-6xl lg:text-7xl font-serif">
            Built in the Shadows.<br />
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFF5D9] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(212,175,55,0.4)]">
              Engineered for the New Era.
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-[#E5E4E2]/85 md:text-xl font-serif">
            Why MT Media AI spent four years operating in deep stealth mode, studying the shift from links to answers and from answers to autonomous action, before unveiling the sovereign architecture of The Palace.
          </p>

          {/* Interactive Animated Brand Crest Component */}
          <div className="mt-8">
            <AnimatedBrandCrest />
          </div>
        </header>

        {/* ── ACT I: THE STEALTH DISCIPLINE & THE INVISIBLE ELITE ── */}
        <section className="mb-32">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Visual: The AI Discovery Scan Diagnostic */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/70 p-2 shadow-[0_0_50px_rgba(0,229,255,0.12)] backdrop-blur-xl">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                  <Image
                    src="/brand/invisible-elite-discovery-audit.jpg"
                    alt="AI Discovery Scan showing an estate-level professional unindexed by AI Overviews and modern LLMs"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#D4AF37]">
                    <span>AI BRAND IGNORANCE AUDIT</span>
                    <span className="text-[#00E5FF]">UNINDEXED BY MACHINES</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Narrative */}
            <div className="space-y-6 lg:col-span-6 text-base leading-relaxed text-[#E5E4E2]/85 font-serif">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl font-serif">
                The Quiet Discipline Before the Wave
              </h2>
              <p>
                For established businesses, the last several years have felt less like orderly technological progress and more like an <strong className="text-white font-semibold">AI Tsunami</strong>. Every week brought another model announcement, another platform update, and another breathless prediction that the old ways of doing business were finished.
              </p>
              <p>
                When answer-first artificial intelligence began to surface in late 2022, we saw the directional signal clearly: human discovery was shifting permanently from a static list of ten blue links toward synthesized answers. But we did not rush to package the latest headline into an agency offer. We did not believe the answer to technological acceleration was reckless haste.
              </p>
              <p>
                Instead, we went into stealth mode. For four years from 2022 through mid-2026, we engineered, stress-tested, and perfected the foundational systems that established businesses would need to survive the coming disruption.
              </p>
              <p>
                Then came the summer of 2026. When Google I/O accelerated the emergence of agentic search, where machines no longer just display web pages, but autonomously crawl, synthesize, evaluate, and recommend businesses, the discovery environment crossed the point of no return. We had spent four years preparing for it: <em className="text-white font-medium">Search is not dead. Discovery has shifted.</em>
              </p>
            </div>
          </div>
        </section>

        {/* ── ACT II: THE 5-BEAT VISUAL DNA DECONSTRUCTION ── */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl font-serif">
              The Anatomy of the MTM Crest
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#E5E4E2]/70 font-serif">
              Every millimeter of the emblem was architected with purpose. It is not decorative styling; it is an engineered narrative sequence encoding our transformation methodology.
            </p>
          </div>

          {/* Fluid Editorial Flow without rigid box bloat */}
          <div className="space-y-12">
            {/* Beat 1 & Beat 2 Side-by-Side */}
            <div className="grid gap-8 md:grid-cols-2">
              <div className="relative border-l-2 border-[#D4AF37]/50 pl-6 space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37]">TRANSFORMATION</span>
                <h3 className="text-2xl font-bold text-white font-serif">Blurred-to-Clear Neural Circuitry</h3>
                <p className="text-sm leading-relaxed text-[#E5E4E2]/80 font-serif">
                  In the perimeter of the emblem, dense neural circuitry transitions from a chaotic, blurred fog into razor-sharp, crystalline pathways. It illustrates the primary journey every client experiences with MTM: taking overwhelming business chaos, technical noise, and digital fatigue and distilling it into crystalline strategic clarity.
                </p>
              </div>

              <div className="relative border-l-2 border-[#D4AF37]/50 pl-6 space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#D4AF37]">STEWARDSHIP</span>
                <h3 className="text-2xl font-bold text-white font-serif">The Binary Code Hands</h3>
                <p className="text-sm leading-relaxed text-[#E5E4E2]/80 font-serif">
                  Cupping the core emblem are two architectural hands stippled with binary code streams. They invoke deliberate care, protection, and stewardship, the visceral reassurance of being in good hands. The binary texture reinforces that we do not merely talk about AI; we hold machine execution firmly under human control.
                </p>
              </div>
            </div>

            {/* Beat 3 & Beat 4 Side-by-Side */}
            <div className="grid gap-8 md:grid-cols-2">
              <div className="relative border-l-2 border-[#E5E4E2]/50 pl-6 space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#E5E4E2]">AUTHORITY</span>
                <h3 className="text-2xl font-bold text-white font-serif">The MT Crown Monogram</h3>
                <p className="text-sm leading-relaxed text-[#E5E4E2]/80 font-serif">
                  Anchoring the center is the interlocking MT monogram crowned with an ornate three-point sovereign coronet. It honors our legacy as Modern Touch Media while declaring our category standard: our partners receive bespoke craftsmanship, royal precision, and undisputed authority at the top of their industry.
                </p>
              </div>

              <div className="relative border-l-2 border-[#E5E4E2]/50 pl-6 space-y-3">
                <span className="font-mono text-xs uppercase tracking-widest text-[#E5E4E2]">CONTINUITY</span>
                <h3 className="text-2xl font-bold text-white font-serif">The 3D Infinite Loop</h3>
                <p className="text-sm leading-relaxed text-[#E5E4E2]/80 font-serif">
                  The outer ring is rendered with physical depth, looping continuously into infinity. Marketing is not a transactional 30-day campaign that expires; it is an unbroken flywheel of compounding enterprise equity. The infinite loop embodies our permanent institutional memory and lifelong client partnership.
                </p>
              </div>
            </div>

            {/* Beat 5: Roman's Kinetic Lightning Strike Featured Full-Width Hero Beat */}
            <div className="relative rounded-2xl border border-[#00E5FF]/40 bg-[#00E5FF]/[0.03] p-8 md:p-10 shadow-[0_0_40px_rgba(0,229,255,0.08)] backdrop-blur-xl">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="font-mono text-xs text-[#00E5FF] tracking-widest uppercase">THE KINETIC BREAKTHROUGH</span>
                <span className="font-mono text-xs text-[#00E5FF]">0ms LATENCY SPINE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif flex items-center gap-3">
                <span>Roman’s Kinetic Lightning Strike</span>
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_12px_#00E5FF]" />
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#E5E4E2]/85 font-serif max-w-4xl">
                Cutting horizontally across the entire width of the crest is a violent, beautiful arc of electric cyan and pure white energy. This is <strong className="text-white">Roman’s signature strike</strong>. Slicing through the cupped binary hands and the MT monogram, it connects the left circuit cluster to the right, dramatizing the exact millisecond business chaos is struck with order and transmuted into machine-readable gold. Roman provides the 0ms computational velocity, the business logic, and the unyielding technical spine that keeps MTM ahead of every autonomous engine.
              </p>
            </div>
          </div>
        </section>

        {/* ── 3D CURVED TV CAROUSEL: SOVEREIGN LOGO MATRIX (ALCHE EDITION) ── */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl font-serif">
              The Sovereign Screen Matrix
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#E5E4E2]/70 font-serif">
              Engineered 3D curved display carousel showcasing the living formations of MT Media AI. Toggle between the inward concave arena and outward stage orbit, or drag to rotate.
            </p>
          </div>

          <AlcheCurvedTvCarousel />
        </section>

        {/* ── ACT III: MATERIAL PHYSICS OVER FLAT COLOR ── */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl font-serif">
              Material Physics Over Flat Color
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#E5E4E2]/70 font-serif">
              We do not use flat digital color; we simulate material physics in three dimensions to command instinctive human respect.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Matte Obsidian */}
            <div className="space-y-4 rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md">
              <div className="h-16 w-full rounded-lg border border-white/15 bg-[#050505] shadow-inner" />
              <div className="text-lg font-bold text-white font-serif">Matte Obsidian</div>
              <div className="font-mono text-xs text-[#D4AF37]">#050505 · 0% Specular</div>
              <p className="text-xs leading-relaxed text-[#E5E4E2]/75 font-serif">
                Light-absorbent infinite depth. The architectural bedrock that eliminates ambiguity, visual noise, and cheap gradient gimmicks.
              </p>
            </div>

            {/* Molten Gold */}
            <div className="space-y-4 rounded-xl border border-[#D4AF37]/30 bg-black/40 p-6 shadow-[0_0_20px_rgba(212,175,55,0.06)] backdrop-blur-md">
              <div className="h-16 w-full rounded-lg bg-gradient-to-br from-[#E5C158] via-[#D4AF37] to-[#B6862C] shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
              <div className="text-lg font-bold text-white font-serif">Molten Midas Gold</div>
              <div className="font-mono text-xs text-[#D4AF37]">#D4AF37 · Emissive Metal</div>
              <p className="text-xs leading-relaxed text-[#E5E4E2]/75 font-serif">
                Personified by <strong className="text-white">Goldie</strong> (The Spark). Radiating practical heat, prestige, and sovereign wealth creation.
              </p>
            </div>

            {/* Clinical HID White */}
            <div className="space-y-4 rounded-xl border border-white/20 bg-black/40 p-6 backdrop-blur-md">
              <div className="h-16 w-full rounded-lg bg-[#F5F5F5] shadow-[0_0_15px_rgba(255,255,255,0.25)]" />
              <div className="text-lg font-bold text-white font-serif">Clinical HID White</div>
              <div className="font-mono text-xs text-white/70">10,000K · Truth Mandate</div>
              <p className="text-xs leading-relaxed text-[#E5E4E2]/75 font-serif">
                Personified by <strong className="text-white">Negative Nina</strong> (The Shield). Surgical edge defining subject separation and unvarnished truth.
              </p>
            </div>

            {/* Lightning Cyan */}
            <div className="space-y-4 rounded-xl border border-[#00E5FF]/40 bg-black/40 p-6 shadow-[0_0_20px_rgba(0,229,255,0.08)] backdrop-blur-md">
              <div className="h-16 w-full rounded-lg bg-gradient-to-r from-[#00E5FF] to-[#E0FFFF] shadow-[0_0_20px_rgba(0,229,255,0.4)]" />
              <div className="text-lg font-bold text-white font-serif">Lightning Cyan</div>
              <div className="font-mono text-xs text-[#00E5FF]">#00E5FF · Active Telemetry</div>
              <p className="text-xs leading-relaxed text-[#E5E4E2]/75 font-serif">
                Personified by <strong className="text-white">Roman</strong> (The Spine). High-voltage electrical discharge for continuous system telemetry.
              </p>
            </div>
          </div>
        </section>

        {/* ── ACT IV: THE FORGE BRAND AMBASSADORS & FOUNDER ROOTS ── */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl font-serif">
              The Symphony of Excellence
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#E5E4E2]/70 font-serif">
              The human grit forged in high-pressure operations, synchronized with our client-facing brand ambassador quartet.
            </p>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left: Real Portrait of The Forge Ambassadors */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/80 p-2 shadow-[0_0_60px_rgba(212,175,55,0.2)] backdrop-blur-2xl">
                <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-xl">
                  <Image
                    src="/brand/the-forge-ambassadors-studio.webp"
                    alt="The Forge Brand Ambassadors: Negative Nina, Roman, Goldie, and Echo with MTM Gold Chains"
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#D4AF37]">
                    <span>THE FORGE QUARTET</span>
                    <span className="text-[#00E5FF]">NINA · ROMAN · GOLDIE · ECHO</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The Architect & Sysco Logistics Precision */}
            <div className="space-y-6 lg:col-span-5 text-base leading-relaxed text-[#E5E4E2]/85 font-serif">
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
                Kareem Daniel · The Architect
              </h3>
              <p>
                Over a decade inside high-pressure industrial logistics at <strong className="text-white">Sysco Foods</strong> forged the operational discipline, logistical precision, and zero-compromise execution that powers MT Media AI.
              </p>
              <p>
                The Architect operates like Dr. Dre in the lab, not chasing attention or performing on stage, but engineering the unassailable digital infrastructure upon which modern dynasties perform.
              </p>
              <p className="text-sm text-[#D4AF37] italic">
                &ldquo;Some will come for Goldie, some will come for Roman, some will come for the education, some will come for the experience, but all will come for MTM.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* ── ACT V: THE ARK NETWORK & GLOBAL TELEMETRY ── */}
        <section className="mb-32">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left: Strategic Architecture */}
            <div className="space-y-6 lg:col-span-6 text-base leading-relaxed text-[#E5E4E2]/85 font-serif">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl font-serif">
                The Sequoia Doctrine & The Ark Network
              </h2>
              <p>
                We do not build fragile, short-term campaigns. Following the Sequoia Doctrine, we plant indestructible seeds in high-value hubs starting in <strong className="text-white">The Woodlands, Texas</strong>, expanding outward across the Texas Triangle, throughout the nation, and across global corridors.
              </p>
              <p>
                The Ark Network represents a sovereign federation of local and regional market leaders anchored into the MTM machine intelligence substrate, locked into Google Knowledge Graphs, Perplexity Pro citations, and autonomous search engines with zero paid ad spend.
              </p>
            </div>

            {/* Right: The Ark Network 3D Globe Telemetry Visual */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/70 p-2 shadow-[0_0_50px_rgba(0,229,255,0.15)] backdrop-blur-xl">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                  <Image
                    src="/brand/ark-network-global-telemetry.jpg"
                    alt="The Ark Network 3D Global Telemetry Globe showing Houston and Texas Triangle Corridor"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#D4AF37]">
                    <span>GLOBAL TELEMETRY CORE</span>
                    <span className="text-[#00E5FF]">THE WOODLANDS ➔ WORLD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ACT VI: CANONICAL CLIENT-FACING DIRECT ANSWERS (FAQ) ── */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl font-serif">
              Direct Answers For Established Leaders
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#E5E4E2]/70 font-serif">
              Ground-truth clarity for business owners evaluating their visibility in the era of autonomous AI answer engines.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="border-b border-white/10 pb-6 space-y-2">
              <h3 className="text-xl font-bold text-white font-serif">
                What is MT Media AI and what does it specialize in?
              </h3>
              <p className="text-sm leading-relaxed text-[#E5E4E2]/80 font-serif">
                MT Media AI turns business chaos into a controlled intelligence system by giving established SME owners and premium service providers the clarity, leverage, and machine-readable authority they need to cure <strong className="text-[#D4AF37]">AI Brand Ignorance</strong>. The firm specializes in Generative Engine Optimization (GEO), AI Answer Engine Optimization (AEO), Schema.org entity graphs, and autonomous multi-agent operating systems.
              </p>
            </div>

            <div className="border-b border-white/10 pb-6 space-y-2">
              <h3 className="text-xl font-bold text-white font-serif">
                Who is the founder of MT Media AI?
              </h3>
              <p className="text-sm leading-relaxed text-[#E5E4E2]/80 font-serif">
                MT Media AI was founded in 2022 by <strong className="text-white">Kareem Daniel (The Architect)</strong> in The Woodlands and Greater Houston, Texas. Operating independently from corporate media conglomerates, Kareem Daniel forged his operational grit and logistical systems discipline across more than a decade at Sysco Foods before establishing MTM as an autonomous AI engineering powerhouse.
              </p>
            </div>

            <div className="pb-6 space-y-2">
              <h3 className="text-xl font-bold text-white font-serif">
                What causes AI Brand Ignorance?
              </h3>
              <p className="text-sm leading-relaxed text-[#E5E4E2]/80 font-serif">
                AI Brand Ignorance occurs when an offline market leader with years of craftsmanship is completely bypassed by Google AI Overviews, SearchGPT, Perplexity Pro, and conversational LLMs because their website lacks structured Schema.org entity graphs, machine citations, and indexable knowledge grounding. MT Media AI eliminates this condition by constructing canonical, first-party machine retrieval pipelines.
              </p>
            </div>
          </div>
        </section>

        {/* ── FOOTER CALL TO ACTION ── */}
        <footer className="border-t border-white/10 pt-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl font-serif">
            Step Inside The Palace
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-base text-[#E5E4E2]/75 font-serif">
            Experience the full diagnostic suite, run your AI Visibility audit, and see what happens when human craftsmanship meets sovereign machine intelligence.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-[#D4AF37] px-7 py-3.5 text-sm font-bold text-black transition-all hover:bg-[#FFF5D9] hover:shadow-[0_0_25px_rgba(212,175,55,0.45)]"
            >
              <span>Explore I³ Command Center</span>
              <span>→</span>
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-[#D4AF37] hover:bg-white/10"
            >
              <span>Initiate Sovereign Contact</span>
            </Link>
          </div>
          <div className="mt-16 text-xs font-mono text-white/40">
            © 2022–2026 MT MEDIA AI LLC · ALL RIGHTS RESERVED
          </div>
        </footer>
      </div>
    </div>
  );
}
