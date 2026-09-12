'use client';

import React, { useEffect, useState } from 'react';
import { Monogram } from './monogram';
import { ModalTrigger } from './modal-trigger';
import { siteCopy } from '@/content/site-copy';

const CHAPTERS = [
  { id: 'hero', code: '01', title: 'THE AI ERASURE' },
  { id: 'fast-answers', code: '02', title: 'FAST ANSWERS' },
  { id: 'evidence', code: '03', title: 'EVIDENCE AUDIT' },
  { id: 'houston-gev', code: '04', title: 'SPATIAL RADAR' },
  { id: 'houston-landmarks', code: '05', title: 'ARCHITECTURAL DOSSIER' },
  { id: 'deliverables', code: '06', title: 'LIVING DELIVERABLE' },
  { id: 'final-cta', code: '07', title: 'SOVEREIGN INTAKE' },
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

  // Frame calculation for precision editorial motion capture (0001 to 0120)
  const currentFrame = String(Math.min(120, Math.max(1, Math.round((scrollProgress / 100) * 119) + 1))).padStart(4, '0');
  const formattedProgress = String(Math.round(scrollProgress)).padStart(3, '0');

  return (
    <header className="bg-black/50 sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Brand Monogram & Entity Badge */}
        <div className="flex items-center gap-3">
          <Monogram size={32} />
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-[var(--color-rim)] uppercase font-sans">
              {siteCopy.header.brandName}
            </span>
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" aria-hidden="true" />
              <span className="tracking-widest uppercase">HOUSTON SPATIAL GRID : 29°45&apos;N 95°22&apos;W</span>
            </div>
          </div>
        </div>

        {/* Center: Dynamic Chapter & Telemetry Readout */}
        <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md">
          <span className="text-[10px] font-mono font-bold text-[var(--color-gold)]">
            CH {activeChapter.code} / 07
          </span>
          <span className="text-white/30 text-xs">|</span>
          <span className="text-[10px] font-mono tracking-wider text-white/80 uppercase">
            {activeChapter.title}
          </span>
          <span className="text-white/30 text-xs">|</span>
          <span className="text-[10px] font-mono text-[var(--color-lightning-blue)] font-bold">
            F {currentFrame} / 0120
          </span>
          <span className="text-white/30 text-xs">|</span>
          <span className="text-[10px] font-mono text-white/60">
            {formattedProgress}%
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

      {/* Persistent Precision Telemetry Scroll Progress Rail */}
      <div className="telemetry-rail" role="progressbar" aria-valuenow={Math.round(scrollProgress)} aria-valuemin={0} aria-valuemax={100} aria-label="Reading progress">
        <div className="telemetry-fill" style={{ width: `${scrollProgress}%` }} />
      </div>
    </header>
  );
}
