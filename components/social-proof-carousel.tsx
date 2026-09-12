'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { siteCopy } from '@/content/site-copy';

export function SocialProofCarousel() {
  const items = siteCopy.proofCarousel;
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
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

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
      aria-roledescription="carousel"
      aria-label="Verified Market Evidence and AI Visibility Analysis"
      className="w-full max-w-3xl mt-6 rounded-xl border border-white/15 bg-[var(--color-surface)]/70 backdrop-blur-md p-5 sm:p-6 relative overflow-hidden transition-all duration-300 hover:border-[var(--color-gold)]/40 shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient background glow accent */}
      <div
        className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-[var(--color-gold)]/10 blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Header bar: Badge and Pagination status */}
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
              aria-label="Previous slide"
              className="p-1 rounded text-[var(--color-chrome)] hover:text-[var(--color-gold)] hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
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
              aria-label="Next slide"
              className="p-1 rounded text-[var(--color-chrome)] hover:text-[var(--color-gold)] hover:bg-white/5 transition-colors focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)]"
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

      {/* Main Slide Content */}
      <div
        key={currentItem.id}
        role="status"
        aria-atomic="true"
        className="space-y-3 min-h-[110px] sm:min-h-[96px] flex flex-col justify-center transition-all duration-300"
      >
        <div className="text-lg sm:text-2xl font-bold font-serif text-[var(--color-rim)] tracking-tight">
          {currentItem.headline}
        </div>
        <p className="text-xs sm:text-sm text-[var(--color-chrome)] leading-relaxed">
          {currentItem.description}
        </p>
      </div>

      {/* Footer bar: Citation and Dot indicators */}
      <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="text-[10px] sm:text-[11px] font-mono text-white/50 flex items-center gap-1.5">
          <span className="text-[var(--color-gold)] font-bold">SOURCE:</span>
          <span>{currentItem.source}</span>
        </div>
        <div className="flex items-center gap-1.5 self-center sm:self-auto">
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}: ${item.badge}`}
              className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold)] ${
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
