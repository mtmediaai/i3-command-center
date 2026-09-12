'use client';

import React, { useEffect, useState } from 'react';
import { Monogram } from './monogram';
import { ModalTrigger } from './modal-trigger';
import { siteCopy } from '@/content/site-copy';

const CHAPTERS = [
  { id: 'hero', code: '01', title: 'AI ERASURE' },
  { id: 'fast-answers', code: '02', title: 'FAST ANSWERS' },
  { id: 'evidence', code: '03', title: 'EVIDENCE AUDIT' },
  { id: 'houston-gev', code: '04', title: 'SPATIAL ARCHITECTURE' },
  { id: 'deliverables', code: '05', title: 'LIVING DELIVERABLE' },
  { id: 'final-cta', code: '06', title: 'SOVEREIGN INTAKE' },
];

export function TelemetryHeader() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(CHAPTERS[0]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const progress = totalHeight > 0 ? Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100)) : 0;
          setScrollProgress(progress);
          document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);

          // Identify active chapter based on scroll offset
          const scrollMiddle = currentScroll + window.innerHeight * 0.35;
          for (let i = CHAPTERS.length - 1; i >= 0; i--) {
            const el = document.getElementById(CHAPTERS[i].id);
            if (el && el.offsetTop <= scrollMiddle) {
              setActiveChapter(CHAPTERS[i]);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="border-b border-white/10 bg-[var(--color-obsidian)]/95 sticky top-0 z-50 backdrop-blur-md clinical-rim">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left: Brand Monogram & Entity Badge */}
        <div className="flex items-center gap-3">
          <Monogram size={32} />
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-[var(--color-rim)] uppercase font-sans">
              {siteCopy.header.brandName}
            </span>
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" aria-hidden="true" />
              <span className="tracking-widest uppercase">HOUSTON SPATIAL GRID : 29°45'N 95°22'W</span>
            </div>
          </div>
        </div>

        {/* Center: Dynamic Chapter Indicator (Hidden on smallest screens) */}
        <div className="hidden md:flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-white/10 bg-white/[0.02]">
          <span className="text-[10px] font-mono font-bold text-[var(--color-gold)]">
            CHAPTER {activeChapter.code} / 06
          </span>
          <span className="text-white/30 text-xs">|</span>
          <span className="text-[10px] font-mono tracking-wider text-white/70 uppercase">
            {activeChapter.title}
          </span>
        </div>

        {/* Right: Navigation & Action */}
        <div className="flex items-center gap-4 sm:gap-6">
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-5 text-xs text-[var(--color-chrome)]"
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

          <div className="scale-90 sm:scale-100 origin-right">
            <ModalTrigger label="Claim Lux Snapshot" />
          </div>
        </div>
      </div>

      {/* Persistent 1px Telemetry Scroll Progress Rail */}
      <div className="telemetry-rail" role="progressbar" aria-valuenow={Math.round(scrollProgress)} aria-valuemin={0} aria-valuemax={100} aria-label="Reading progress">
        <div className="telemetry-fill" style={{ width: `${scrollProgress}%` }} />
      </div>
    </header>
  );
}
