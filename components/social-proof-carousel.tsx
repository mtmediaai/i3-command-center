'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

export interface PainPointSlide {
  id: string;
  ambassador: string;
  personaTitle: string;
  badge: string;
  metric: string;
  headline: string;
  operationalTruth: string;
  accentColor: string;
  glowColor: string;
}

export const INVISIBLE_ELITE_PAIN_POINTS: PainPointSlide[] = [
  {
    id: 'referral-paradox',
    ambassador: 'ROMAN',
    personaTitle: 'Structural Business Spine',
    badge: 'THE REFERRAL TRAP // 01 OF 04',
    metric: '97% Offline Trust vs. 0% Machine Recognition',
    headline:
      'You spent 25 years building peerless word-of-mouth. But when your best client’s successor asks AI who to hire, your name does not exist.',
    operationalTruth:
      'Conversational answer engines cannot attend charity galas, shake hands at private clubs, or inspect completed estates. If your practice lacks structured JSON-LD entity graphs, autonomous algorithms evaluate a quarter-century of mastery as if you opened yesterday.',
    accentColor: '#E5E4E2', // Lightning Platinum
    glowColor: 'rgba(229, 228, 226, 0.25)',
  },
  {
    id: 'digital-counterfeit',
    ambassador: 'NEGATIVE NINA',
    personaTitle: 'Adversarial Logic Gate',
    badge: 'THE ALGORITHMIC THREAT // 02 OF 04',
    metric: 'Data Coherence Trumps Real-World Mastery',
    headline:
      'A competitor with 18 months in business and mediocre craftsmanship ranks above you simply because an agency flooded their site with schema.',
    operationalTruth:
      'Search generative models do not evaluate stone masonry, timber joinery, or operational ethics. They evaluate mathematical data density. The loudest, most structured entity wins the multi-agent recommendation loop every single time.',
    accentColor: '#F5F5F5', // Clinical HID White
    glowColor: 'rgba(245, 245, 245, 0.3)',
  },
  {
    id: 'generational-shift',
    ambassador: 'ECHO',
    personaTitle: 'Customer Experience Sentinel',
    badge: 'THE DISCOVERY SHIFT // 03 OF 04',
    metric: '69%+ Zero-Click Answer Dominance',
    headline:
      'Next-generation family office trustees and estate principals do not browse ten blue links or click ads. They query private AI agents.',
    operationalTruth:
      'Zero-click searches now dominate high-net-worth commercial intent. When wealth transfers to the next generation, their discovery gatekeeper is an LLM answer engine. Being omitted from that direct answer block is systemic commercial erasure.',
    accentColor: '#00E5FF', // Lightning Blue
    glowColor: 'rgba(0, 229, 255, 0.25)',
  },
  {
    id: 'quiet-bleed',
    ambassador: 'GOLDIE',
    personaTitle: 'Visionary Catalyst & ROI Engine',
    badge: 'THE MONETARY REALITY // 04 OF 04',
    metric: '$250k–$1M+ Lost Per Missed Inquiry',
    headline:
      'You never hear the phone call you did not receive. High-ticket estate contracts vanish before you even know the buyer was looking.',
    operationalTruth:
      'AI answers intercept the buyer at the exact moment of decision. When an answer engine recommends a competitor, the buyer never visits your website, never requests your portfolio, and never knows you exist.',
    accentColor: '#D4AF37', // Molten Midas Gold
    glowColor: 'rgba(212, 175, 55, 0.3)',
  },
];

export function SocialProofCarousel() {
  const items = INVISIBLE_ELITE_PAIN_POINTS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        return;
      }
    }

    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(items.length - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const currentItem = items[currentIndex];

  return (
    <div
      role="region"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-roledescription="carousel"
      aria-label="The Invisible Elite Daily Reality and Emotional Pain Points"
      className="w-full max-w-4xl mt-6 rounded-2xl border border-white/15 bg-[#050505]/90 backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:border-[#D4AF37]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic ambient persona aura */}
      <div
        className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-all duration-700"
        style={{ backgroundColor: currentItem.glowColor }}
        aria-hidden="true"
      />

      {/* Top Header Row: Ambassador badge, slide indicator, and controls */}
      <div className="flex items-center justify-between gap-4 mb-6 relative z-10 border-b border-white/10 pb-4">
        {/* Ambassador Persona Cluster */}
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full animate-pulse shadow-md"
            style={{ backgroundColor: currentItem.accentColor }}
            aria-hidden="true"
          />
          <div className="flex flex-col text-left">
            <span
              className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase"
              style={{ color: currentItem.accentColor }}
            >
              {currentItem.ambassador} // {currentItem.personaTitle}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
              {currentItem.badge}
            </span>
          </div>
        </div>

        {/* Counter and manual navigation */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono tracking-widest text-[#E5E4E2]">
            {currentIndex + 1} / {items.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous vulnerability insight"
              className="p-1.5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next vulnerability insight"
              className="p-1.5 rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Content: Metric, Emotional Hook, and Operational Reality */}
      <div
        key={currentItem.id}
        role="status"
        aria-atomic="true"
        className="space-y-4 min-h-[160px] flex flex-col justify-center text-left relative z-10 transition-all duration-300"
      >
        {/* Metric Pill */}
        <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full border border-white/15 bg-white/[0.04]">
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-bold text-[#D4AF37]">
            DIAGNOSTIC REALITY:
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono text-[#E5E4E2] font-semibold">
            {currentItem.metric}
          </span>
        </div>

        {/* Visceral Headline */}
        <h4 className="text-lg sm:text-2xl font-serif font-bold text-white leading-snug drop-shadow-md">
          {currentItem.headline}
        </h4>

        {/* The Operational Truth */}
        <p className="text-xs sm:text-sm text-white/70 font-serif leading-relaxed">
          {currentItem.operationalTruth}
        </p>
      </div>

      {/* Footer Navigation Bar: Progress Dots and Open-Loop Swipe Cue */}
      <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div className="text-[10px] sm:text-[11px] font-mono text-white/50 flex items-center gap-2">
          <span className="text-[#D4AF37] font-bold">INSIGHT:</span>
          <span>The Sovereign Truth Behind AI Invisibility</span>
        </div>

        {/* Slide navigation dots */}
        <div className="flex items-center gap-2 self-center sm:self-auto">
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Go to insight ${idx + 1}: ${item.ambassador}`}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37] ${
                idx === currentIndex
                  ? 'w-8 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
