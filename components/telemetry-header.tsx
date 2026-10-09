'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ModalTrigger } from './modal-trigger';
import { siteCopy } from '@/content/site-copy';

export function TelemetryHeader() {
  const [scrollProgress, setScrollProgress] = useState(0);

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
    <header className="bg-black/60 fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left: Official IIIP Black Jewel Crest Insignia & Brand Cluster */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Image
            src="/brand/black-jewel-mt-media-logo.webp"
            alt={siteCopy.header.brandMonogramAlt}
            width={76}
            height={38}
            className="object-contain filter drop-shadow-[0_0_12px_rgba(212,175,55,0.3)] select-none pointer-events-none"
            priority
          />
          <span
            className="block w-px h-8 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent shadow-[0_0_8px_rgba(212,175,55,0.45)] flex-shrink-0"
            aria-hidden="true"
          />
          <div className="flex flex-col justify-center">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] uppercase text-[#D4AF37] font-bold">
              THE INVISIBLE ELITE
            </span>
            <span className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-white font-sans drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]">
              {siteCopy.header.brandName}
            </span>
          </div>
        </div>

        {/* Right: Navigation & Action */}
        <div className="flex items-center gap-4 sm:gap-6">
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-5 text-xs text-[var(--color-chrome)]"
          >
            <a
              href={siteCopy.header.nav.palace.url}
              className="hover:text-[var(--color-gold)] transition-colors"
            >
              {siteCopy.header.nav.palace.label}
            </a>
            <a
              href={siteCopy.header.nav.founder.url}
              target="_blank"
              rel="noopener noreferrer"
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
