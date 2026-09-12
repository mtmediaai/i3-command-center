'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { evidenceLedger } from '@/content/evidence-ledger';

export function SocialProofCarousel() {
  const items = evidenceLedger;
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
    }, 6500);
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
      aria-label="Verified Market Evidence and AI Visibility Analysis"
      className="w-full max-w-3xl mt-6 rounded-xl border border-white/15 bg-[var(--color-surface)]/70 backdrop-blur-md p-5 sm:p-6 relative overflow-hidden transition-all duration-300 hover:border-[var(--color-gold)]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient gold glow highlight */}
      <div
        className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-[var(--color-gold)]/10 blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Top row: Badge and pagination controls */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="inline-flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-gold)] animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-[var(--color-gold)] uppercase bg-[var(--color-gold)]/10 px-2.5 py-0.5 rounded border border-[var(--color-gold)]/20">
            {currentItem.badge}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-[var(--color-chrome)]">
            {currentIndex + 1} / {items.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous evidence card"
              className="p-1 rounded text-[var(--color-chrome)] hover:text-[var(--color-gold)] hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-gold)]"
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
              aria-label="Next evidence card"
              className="p-1 rounded text-[var(--color-chrome)] hover:text-[var(--color-gold)] hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-gold)]"
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

      {/* Main card claim */}
      <div
        key={currentItem.id}
        role="status"
        aria-atomic="true"
        className="space-y-3 min-h-[110px] sm:min-h-[96px] flex flex-col justify-center transition-all duration-300"
      >
        <div className="text-base sm:text-xl font-bold font-serif text-[var(--color-rim)] tracking-tight">
          {currentItem.approvedClaim}
        </div>
        <p className="text-xs sm:text-sm text-[var(--color-chrome)] leading-relaxed">
          {currentItem.methodologyNote}
        </p>
      </div>

      {/* Footer bar: Source attribution, link, and dot navigation */}
      <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="text-[10px] sm:text-[11px] font-mono text-white/50 flex flex-wrap items-center gap-1.5">
          <span className="text-[var(--color-gold)] font-bold">SOURCE:</span>
          <span>{currentItem.sourceOrganization}</span>
          <span className="text-white/30">·</span>
          <span>{currentItem.publicationDate}</span>
          <a
            href={currentItem.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-gold)] hover:underline ml-1 inline-flex items-center gap-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-gold)] rounded px-1"
            aria-label={`Verify source: ${currentItem.sourceTitle}`}
          >
            <span>Verify source</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="flex items-center gap-1.5 self-center sm:self-auto">
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}: ${item.badge}`}
              className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-gold)] ${
                idx === currentIndex
                  ? 'w-6 bg-[var(--color-gold)]'
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
