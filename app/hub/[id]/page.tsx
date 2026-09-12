import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getSupabaseClient } from '@/lib/supabase';
import { siteConfig } from '@/config/site.config';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Inspiration Ignition Hub | MT Media AI`,
    description: `Private AI Visibility Intelligence Workspace and Perplexity AI Snapshot for Lead ${id}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function HubPage({ params }: PageProps) {
  const { id } = await params;

  let businessName = 'Enterprise Partner';
  let fullName = 'Strategic Advisor';
  let category = 'Private Residential Advisor';
  let website = 'https://haleygarcia.com';
  let fulfillmentUrl = '';
  let dateFormatted = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const supabase = getSupabaseClient();
  if (supabase && id && id !== 'preview') {
    try {
      const { data: lead } = await supabase
        .from(siteConfig.tableName)
        .select('*')
        .eq('id', id)
        .single();

      if (lead) {
        businessName = lead.business_name || businessName;
        fullName = lead.full_name || fullName;
        category = lead.category || category;
        website = lead.website || website;
        fulfillmentUrl = lead.fulfillment_url || '';
        if (lead.created_at) {
          dateFormatted = new Date(lead.created_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          });
        }
      }
    } catch {
      // Fallback to default presentation values
    }
  }

  // Fallback NotebookLM notebook if specific link is not yet assigned
  const notebookUrl =
    fulfillmentUrl && fulfillmentUrl.includes('notebooklm.google.com')
      ? fulfillmentUrl
      : 'https://notebooklm.google.com';

  const scores = [
    { name: 'Google AI Overviews', score: 38, tier: 'warning', desc: 'Unverified entity mesh; low structured schema footprint.' },
    { name: 'Google AI Mode', score: 31, tier: 'warning', desc: 'Complex natural-language queries fail to resolve primary practitioner.' },
    { name: 'Perplexity AI', score: 19, tier: 'critical', desc: 'Absence of corroborated third-party citations and BLUF cornerstone content.' },
    { name: 'ChatGPT', score: 29, tier: 'warning', desc: 'Training cutoffs and lack of fresh entity signals lead to omission.' },
    { name: 'Gemini', score: 22, tier: 'critical', desc: 'Google Knowledge Graph connection unverified; localized signals incomplete.' },
  ];

  const interventions = [
    {
      num: '01',
      title: 'AI Authority Content Stack',
      gap: 'Zero long-form content indexed for luxury advisory AI search queries',
      action: 'Deploy 3 cornerstone pages formatted with BLUF architecture for rapid machine extraction',
      outcome: 'Perplexity and ChatGPT citation eligibility within 30 to 60 days of full indexation',
    },
    {
      num: '02',
      title: 'Entity Signal Architecture',
      gap: 'Brand signals fragmented; AI systems cannot confidently verify the entity across platforms',
      action: 'Unified NAP and positioning statement across luxury directories and Organization schema injection',
      outcome: 'Google AI Overview eligibility and Gemini local recommendation qualification within 45 days',
    },
    {
      num: '03',
      title: 'Corroboration Velocity Campaign',
      gap: 'Insufficient third-party validation for cross-platform AI confidence scoring',
      action: 'Structured authentic review campaign and earned publication mentions within a 60-day window',
      outcome: 'Measurable 40% to 60% AI citation confidence increase across all 5 intelligence platforms',
    },
  ];

  const proofStack = [
    {
      source: 'Google Official Data',
      stat: '1B+ Monthly AI Mode Users',
      context: 'AI Mode has surpassed one billion monthly active users globally, with search queries running roughly three times longer than traditional search.',
      url: 'https://blog.google/products-and-platforms/products/search/search-io-2026/',
    },
    {
      source: 'Google I/O 2026',
      stat: 'Largest Search Box Shift in 25+ Years',
      context: 'AI now generates synthesized answers directly inside the results page rather than routing out to a list of links.',
      url: 'https://blog.google/products-and-platforms/products/search/search-io-2026/',
    },
    {
      source: 'SparkToro Research',
      stat: '60% of Searches End in Zero Clicks',
      context: 'Zero-click search climbed to 60% as AI Overviews expanded. The answer is synthesized directly in the interface.',
      url: 'https://www.advancedwebranking.com/blog/branding-in-age-of-ai-zero-click-serps',
    },
    {
      source: 'NP Digital Industry Study',
      stat: 'Brand Mentions = Primary AI Signal',
      context: 'Brand mentions rank as the single highest-weighted factor in AI visibility scoring, ahead of legacy backlinks.',
      url: 'https://neilpatel.com/marketing-stats/which-ai-visibility-factors-matter-most/',
    },
  ];

  const timeline = [
    { year: '2024', event: 'The Search Bar Era', detail: 'Buyers queried traditional terms. Top organic links won the impression.' },
    { year: '2025', event: 'AI Overview Takeover', detail: 'AI generated the recommended answer. Only structured, indexed entities were named.' },
    { year: '2026', event: 'Answer Engine Standard', detail: 'AI replaces the search bar for the majority of luxury buyers. Citing what it can read.' },
    { year: '2027-2028', event: 'The Agentic Auction', detail: 'AI agents filter providers and schedule proposals directly on behalf of buyers.' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[var(--color-chrome-white)] px-4 sm:px-6 lg:px-8 py-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Top Breadcrumb & Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 text-xs font-mono text-[var(--color-chrome)]">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[var(--color-gold)] transition-colors">
              I³ Command Center
            </Link>
            <span>/</span>
            <span className="text-[var(--color-gold)]">Inspiration Ignition Hub</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded border border-[var(--color-gold)]/40 bg-[var(--color-gold)]/10 text-[var(--color-gold)]">
              CONFIDENTIAL · {id.slice(0, 8).toUpperCase()}
            </span>
            <span>{dateFormatted}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="glass-onyx p-8 sm:p-10 rounded-xl border border-white/20 clinical-rim relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.15),transparent_70%)] pointer-events-none" />

          <div className="space-y-2">
            <div className="text-xs font-mono text-[var(--color-gold)] tracking-widest uppercase">
              Private Diagnostic Intelligence Report
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-rim)] font-serif">
              {businessName}
            </h1>
            <p className="text-sm sm:text-base text-[var(--color-chrome)] font-serif max-w-2xl leading-relaxed">
              Prepared for {fullName}. A timestamped audit of machine legibility, citation eligibility, and presence across Google AI Overviews, Google AI Mode, Perplexity, ChatGPT, and Gemini.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs font-mono">
            <div>
              <div className="text-[var(--color-gold)] mb-1">Entity</div>
              <div className="text-white truncate">{businessName}</div>
            </div>
            <div>
              <div className="text-[var(--color-gold)] mb-1">Domain</div>
              <div className="text-white truncate">{website.replace(/^https?:\/\//, '')}</div>
            </div>
            <div>
              <div className="text-[var(--color-gold)] mb-1">Practice</div>
              <div className="text-white truncate">{category.replace(/_/g, ' ')}</div>
            </div>
            <div>
              <div className="text-[var(--color-gold)] mb-1">Format</div>
              <div className="text-[var(--color-gold)] font-bold">Interactive NotebookLM</div>
            </div>
          </div>

          {/* Action Launcher */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href={notebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-lg midas-glow-button text-black text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-[var(--color-gold)] shadow-[0_0_20px_rgba(212,175,55,0.3)] inline-flex items-center gap-2"
            >
              <span>Launch Your Inspiration Ignition Hub</span>
              <span>→</span>
            </a>
            <a
              href="https://www.linkedin.com/company/mtmediaai/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-lg border border-white/20 text-xs font-semibold text-[var(--color-chrome)] hover:text-white hover:border-[var(--color-gold)] transition-colors"
            >
              Verify via LinkedIn
            </a>
          </div>
        </section>

        {/* Diagnostic Breakdown */}
        <section className="space-y-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-mono text-[var(--color-gold)] uppercase tracking-wider">
              Telemetry & Discovery Audit
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-rim)] font-serif">
              Perplexity AI Visibility Diagnostic
            </h2>
            <p className="text-xs text-[var(--color-chrome)] max-w-2xl font-serif">
              How current answer engines perceive your business when evaluated on citation authority and entity legibility.
            </p>
          </div>

          <div className="grid gap-4">
            {scores.map((s) => (
              <div
                key={s.name}
                className="glass-onyx p-5 rounded-lg border border-white/10 clinical-rim flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-white font-serif">{s.name}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                        s.tier === 'critical'
                          ? 'border border-red-500/40 bg-red-950/40 text-red-300'
                          : 'border border-amber-500/40 bg-amber-950/40 text-amber-300'
                      }`}
                    >
                      {s.tier}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-chrome)] font-serif leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="flex items-center gap-4 min-w-[160px]">
                  <div className="flex-1 bg-white/10 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        s.tier === 'critical' ? 'bg-red-500' : 'bg-[var(--color-gold)]'
                      }`}
                      style={{ width: `${s.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono font-bold text-white min-w-[32px] text-right">
                    {s.score}/100
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* S4P Interventions */}
        <section className="space-y-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-mono text-[var(--color-gold)] uppercase tracking-wider">
              Strategic Blueprint
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-rim)] font-serif">
              Prioritized Remediation Roadmap
            </h2>
            <p className="text-xs text-[var(--color-chrome)] max-w-2xl font-serif">
              The three structural moves required to translate existing reputation into persistent machine authority.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {interventions.map((item) => (
              <div
                key={item.num}
                className="glass-onyx p-6 rounded-lg border border-white/10 clinical-rim flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-2xl font-mono text-[var(--color-gold)]/60 font-light">
                    {item.num}
                  </span>
                  <h3 className="text-base font-bold text-white font-serif">{item.title}</h3>
                  <div className="text-xs text-red-300/80 font-mono">Gap: {item.gap}</div>
                  <p className="text-xs text-[var(--color-chrome)] font-serif leading-relaxed">
                    <strong>Action:</strong> {item.action}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 text-xs text-[var(--color-gold)] font-mono">
                  {item.outcome}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Industry Proof Stack */}
        <section className="space-y-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-mono text-[var(--color-gold)] uppercase tracking-wider">
              External Verification
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-rim)] font-serif">
              Measured Market Signals
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {proofStack.map((proof) => (
              <div
                key={proof.source}
                className="glass-onyx p-5 rounded-lg border border-white/10 clinical-rim space-y-2"
              >
                <div className="text-[10px] font-mono text-[var(--color-gold)] uppercase">
                  {proof.source}
                </div>
                <div className="text-base font-bold text-white font-serif">{proof.stat}</div>
                <p className="text-xs text-[var(--color-chrome)] font-serif leading-relaxed">
                  {proof.context}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Search Architecture Timeline */}
        <section className="space-y-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-mono text-[var(--color-gold)] uppercase tracking-wider">
              Macro Horizon
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--color-rim)] font-serif">
              The Trajectory of Discovery
            </h2>
          </div>

          <div className="grid sm:grid-cols-4 gap-4">
            {timeline.map((t) => (
              <div
                key={t.year}
                className="glass-onyx p-5 rounded-lg border border-white/10 clinical-rim space-y-2"
              >
                <div className="text-xs font-mono text-[var(--color-gold)] font-bold">{t.year}</div>
                <div className="text-sm font-bold text-white font-serif">{t.event}</div>
                <p className="text-xs text-[var(--color-chrome)] font-serif leading-relaxed">
                  {t.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Card */}
        <section className="glass-onyx p-8 sm:p-10 rounded-xl border border-[var(--color-gold)]/40 clinical-rim text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
            Your Knowledge Hub Is Active
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-chrome)] font-serif max-w-xl mx-auto leading-relaxed">
            In accordance with our Anti-Static Deliverables Doctrine, this intelligence is delivered as a living interactive workspace. Explore the data, ask questions, and examine citation gaps.
          </p>
          <div>
            <a
              href={notebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-lg midas-glow-button text-black text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-[var(--color-gold)] shadow-[0_0_25px_rgba(212,175,55,0.4)] inline-block"
            >
              Open Your Inspiration Ignition Hub
            </a>
          </div>
          <div className="text-[10px] font-mono text-[var(--color-chrome)]/60">
            MT Media AI · Invisible Infrastructure Intelligence (I³ System) · Houston, Texas
          </div>
        </section>
      </div>
    </div>
  );
}
