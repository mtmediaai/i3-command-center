'use client';

import React, { useState } from 'react';

interface TabData {
  id: string;
  label: string;
  badge: string;
  headline: string;
  description: string;
  details: { label: string; value: string }[];
  outputSnippet: string;
}

const TABS: TabData[] = [
  {
    id: 'audit',
    label: 'Living Diagnostic Notebook',
    badge: 'NOTEBOOKLM REPOSITORY',
    headline: 'Interactive AI Brand Ignorance Diagnostic',
    description:
      'Unlike static PDF reports that are archived and forgotten, your Inspiration Ignition Hub is delivered as a living, queryable knowledge repository in Gemini Notebook / NotebookLM. You and your leadership team can interrogate the findings, verify citations, and explore strategic remediation paths in natural language.',
    details: [
      { label: 'DELIVERABLE FORMAT', value: 'Living Gemini Notebook / NotebookLM' },
      { label: 'COGNITIVE ARCHITECTURE', value: 'Multi-Source Grounded RAG' },
      { label: 'RETENTION STANDARD', value: 'Anti-Static Deliverables Doctrine' },
      { label: 'ACCESS PROTOCOL', value: 'Private Workspace Link (Yours To Keep)' },
    ],
    outputSnippet:
      '> Query: "Summarize our three greatest machine-readability vulnerabilities in Houston executive search."\n\n[Notebook Synthesis]: Analysis reveals that while your practice holds 22+ years of verified referral authority in Memorial and River Oaks, AI engines (ChatGPT, Gemini, Perplexity) fail to cite your partners because corporate entity credentials and press archives lack structured schema corroboration.',
  },
  {
    id: 'perplexity',
    label: 'Perplexity Grounding Audit',
    badge: 'PERPLEXITY BENCHMARK',
    headline: 'Multi-Engine Citation Corroboration',
    description:
      'A timestamped audit evaluating exactly how Perplexity AI, Google AI Overviews, Google AI Mode, and ChatGPT synthesize your practice when high-net-worth buyers inquire about premier representation in your metropolitan sector.',
    details: [
      { label: 'AUDIT ENGINES', value: 'ChatGPT, Gemini, Perplexity, AI Overviews' },
      { label: 'CITATION STATUS', value: 'Timestamped Benchmark Log' },
      { label: 'CONFIDENCE METRIC', value: 'Corroboration Velocity Index' },
      { label: 'EVIDENCE THRESHOLD', value: 'Primary Document Grounding' },
    ],
    outputSnippet:
      '> Search Trace: "Top estate planning and private wealth advisory firms The Woodlands TX"\n\nPerplexity Synthesis: Citing 4 sources. The leading entities mentioned are established directory profiles. Your firm does not appear in top answer synthesis despite 30-year operational history, due to missing entity corroboration on verified public nodes.',
  },
  {
    id: 'queries',
    label: 'Natural Language Exploration',
    badge: 'QUERY CAPABILITY',
    headline: 'Interrogate Your Visibility Gaps On Demand',
    description:
      'Test strategic scenarios and draft authority-backed content directly from your hub. The living deliverable enables your marketing and legal teams to understand exactly what evidence neural discovery models need to index your practice accurately.',
    details: [
      { label: 'EXPLORATION MODE', value: 'Continuous Querying' },
      { label: 'SOURCE ATTRIBUTION', value: 'Inline Citation Footnotes' },
      { label: 'DELIVERY WINDOW', value: 'Up to 48 Hours Post-Intake' },
      { label: 'COMMERCIAL POSTURE', value: 'Zero-Cost Diagnostic ($0)' },
    ],
    outputSnippet:
      '> Query: "What specific schema types should we publish to resolve our Google AI Overviews absence?"\n\n[Recommended Schema]: Deploy LegalService / FinancialService schema with @id apex anchoring to your primary domain, with explicit sameAs links to state bar registrations, verified corporate registries, and published legal opinions.',
  },
];

export function IgnitionHubPreview() {
  const [activeTab, setActiveTab] = useState<string>('audit');
  const current = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" aria-hidden="true" />
          <span className="text-[var(--color-rim)] font-bold tracking-widest uppercase">
            DELIVERABLE SPECIFICATION : INSPIRATION IGNITION HUB™
          </span>
        </div>
        <div className="text-[var(--color-gold)] tracking-wider font-bold">
          DELIVERY STANDARD: ANTI-STATIC DELIVERABLES DOCTRINE
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 rounded-lg border text-left transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-gold)] ${
                isActive
                  ? 'bg-white/[0.08] border-[var(--color-gold)] text-white shadow-lg'
                  : 'bg-white/[0.02] border-white/10 text-white/60 hover:bg-white/[0.04] hover:text-white/80'
              }`}
            >
              <div className="text-[10px] font-mono text-[var(--color-gold)] font-bold mb-1">
                {tab.badge}
              </div>
              <div className="text-xs sm:text-sm font-serif font-bold text-[var(--color-rim)]">
                {tab.label}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Display Chamber */}
      <div className="glass-onyx p-6 sm:p-8 rounded-xl border border-white/15 clinical-rim space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="forge-echo-containment">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[var(--color-gold)]">
              {current.badge}
            </span>
          </div>
          <span className="text-[10px] font-mono text-white/50">
            DELIVERY: NOTEBOOKLM / SHARED KNOWLEDGE ASSET
          </span>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[var(--color-rim)] sword-blade-glow">
            {current.headline}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-chrome)] leading-relaxed mt-2 max-w-3xl">
            {current.description}
          </p>
        </div>

        {/* Technical specs grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 rounded-lg border border-white/10 bg-black/40 text-[11px] font-mono">
          {current.details.map((d, i) => (
            <div key={i} className="space-y-1">
              <span className="text-white/40 block text-[9px] uppercase tracking-wider">
                {d.label}
              </span>
              <span className="text-[var(--color-chrome-white)] font-bold block">
                {d.value}
              </span>
            </div>
          ))}
        </div>

        {/* Notebook interactive session simulation snippet */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
            <span>QUERY TERMINAL // GEMINI NOTEBOOKLM GROUNDING</span>
            <span className="text-[var(--color-gold)]">READY FOR INTERACTION</span>
          </div>
          <div className="p-4 rounded-lg border border-white/10 bg-[#050505] font-mono text-xs text-white/80 leading-relaxed whitespace-pre-wrap border-l-2 border-l-[var(--color-gold)] shadow-inner">
            {current.outputSnippet}
          </div>
        </div>

        {/* Deliverable Footer Assurance */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-white/50 gap-2">
          <span>STATUS: SHARED ASSET (YOURS TO KEEP & QUERY)</span>
          <span className="text-[var(--color-gold)]">
            TURNAROUND: UP TO 48 HOURS POST-INTAKE
          </span>
        </div>
      </div>
    </div>
  );
}
