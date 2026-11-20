'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { siteCopy } from '@/content/site-copy';
import { evidenceLedger } from '@/content/evidence-ledger';
import { SocialProofCarousel } from '@/components/social-proof-carousel';

const TOTAL_DRIVING_FRAMES = 120;

function formatFrameNumber(num: number): string {
  return String(num).padStart(4, '0');
}

export function DrivingCanvasScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  // Frame Cache & Drawing Refs
  const loadedFramesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_DRIVING_FRAMES).fill(null));
  const isMobileRef = useRef<boolean>(false);
  const tickingRef = useRef<boolean>(false);
  const isDocumentVisibleRef = useRef<boolean>(true);
  const lastRenderedIndexRef = useRef<number>(-1);

  // Helper to draw image with object-fit: cover
  const drawCover = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    const hRatio = w / img.width;
    const vRatio = h / img.height;
    const ratio = Math.max(hRatio, vRatio);

    const centerShiftX = (w - img.width * ratio) / 2;
    const centerShiftY = (h - img.height * ratio) / 2;

    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShiftX,
      centerShiftY,
      img.width * ratio,
      img.height * ratio
    );
  }, []);

  // Nearest frame fallback lookup
  const getNearestAvailableFrame = useCallback((targetIndex: number): HTMLImageElement | null => {
    const frames = loadedFramesRef.current;
    if (frames[targetIndex]) return frames[targetIndex];

    let distance = 1;
    while (targetIndex - distance >= 0 || targetIndex + distance < TOTAL_DRIVING_FRAMES) {
      const lower = targetIndex - distance;
      if (lower >= 0 && frames[lower]) return frames[lower];
      const upper = targetIndex + distance;
      if (upper < TOTAL_DRIVING_FRAMES && frames[upper]) return frames[upper];
      distance++;
    }
    return null;
  }, []);

  // Render specific frame
  const renderFrame = useCallback((index: number) => {
    if (!isDocumentVisibleRef.current) return;
    const img = getNearestAvailableFrame(index);
    if (img) {
      drawCover(img);
      lastRenderedIndexRef.current = index;
    }
  }, [getNearestAvailableFrame, drawCover]);

  // Viewport resize handling
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    isMobileRef.current = displayWidth < 768;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    const currentIdx = lastRenderedIndexRef.current >= 0 ? lastRenderedIndexRef.current : 0;
    renderFrame(currentIdx);
  }, [renderFrame]);

  // Initialize Canvas and Progressive Loading Engine
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const motionListener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener('change', motionListener);

    handleResize();
    window.addEventListener('resize', handleResize);

    const isMobile = window.innerWidth < 768;
    isMobileRef.current = isMobile;
    const folder = isMobile ? 'driving-mobile' : 'driving-desktop';

    // 1. Immediate paint of frame-0001
    const firstImg = new Image();
    firstImg.src = `/frames/${folder}/frame-0001.webp`;
    firstImg.onload = () => {
      loadedFramesRef.current[0] = firstImg;
      setLoadedCount((prev) => prev + 1);
      renderFrame(0);
    };
    if (firstImg.complete && firstImg.naturalWidth > 0) {
      loadedFramesRef.current[0] = firstImg;
      renderFrame(0);
    }

    // 2. Keyframe pre-fetch: Every 10th frame (12 keyframes)
    const keyframeIndices = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99, 109, 119];
    keyframeIndices.forEach((idx) => {
      const img = new Image();
      img.src = `/frames/${folder}/frame-${formatFrameNumber(idx + 1)}.webp`;
      img.onload = () => {
        loadedFramesRef.current[idx] = img;
        setLoadedCount((prev) => prev + 1);
      };
    });

    // 3. Background stream: load remaining frames in idle batches
    let cancelStream = false;
    const remainingIndices = Array.from({ length: TOTAL_DRIVING_FRAMES }, (_, i) => i).filter(
      (i) => i !== 0 && !keyframeIndices.includes(i)
    );

    let batchPointer = 0;
    const batchSize = 6;

    function streamNextBatch() {
      if (cancelStream || batchPointer >= remainingIndices.length) return;

      const batch = remainingIndices.slice(batchPointer, batchPointer + batchSize);
      batchPointer += batchSize;

      batch.forEach((idx) => {
        const img = new Image();
        img.src = `/frames/${folder}/frame-${formatFrameNumber(idx + 1)}.webp`;
        img.onload = () => {
          if (!cancelStream) {
            loadedFramesRef.current[idx] = img;
            setLoadedCount((prev) => prev + 1);
          }
        };
      });

      if (batchPointer < remainingIndices.length) {
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(streamNextBatch, { timeout: 250 });
        } else {
          setTimeout(streamNextBatch, 80);
        }
      }
    }

    const streamTimeout = setTimeout(streamNextBatch, 200);

    // 4. Tab visibility listener (Battery & CPU Governance)
    const handleVisibility = () => {
      isDocumentVisibleRef.current = !document.hidden;
      if (!document.hidden && lastRenderedIndexRef.current >= 0) {
        renderFrame(lastRenderedIndexRef.current);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelStream = true;
      clearTimeout(streamTimeout);
      motionQuery.removeEventListener('change', motionListener);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [handleResize, renderFrame]);

  // Scroll listener with RAF ticking flag (0% Idle CPU)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const container = containerRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            const totalScrollable = rect.height - window.innerHeight;
            if (totalScrollable > 0) {
              const currentScroll = -rect.top;
              const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
              setScrollProgress(progress);

              const targetFrame = Math.min(
                TOTAL_DRIVING_FRAMES - 1,
                Math.max(0, Math.floor(progress * TOTAL_DRIVING_FRAMES))
              );
              setActiveFrameIndex(targetFrame);
              renderFrame(targetFrame);
            }
          }
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [renderFrame]);

  // Transitions: Interpolator for Smooth Hermite HUD Transitions between sections
  const getStageTransition = (start: number, end: number, fadeDistance = 0.05) => {
    if (scrollProgress < start - fadeDistance || scrollProgress > end + fadeDistance) {
      return { opacity: 0, pointerEvents: 'none' as const, transform: 'scale(0.96) translateY(24px)', filter: 'blur(8px)', display: 'none' };
    }
    let opacity = 1;
    let translateY = 0;
    let scale = 1;
    let blur = 0;

    if (scrollProgress < start) {
      const t = (scrollProgress - (start - fadeDistance)) / fadeDistance;
      opacity = Math.max(0, Math.min(1, t));
      translateY = (1 - t) * 20;
      scale = 0.96 + t * 0.04;
      blur = (1 - t) * 6;
    } else if (scrollProgress > end) {
      const t = (scrollProgress - end) / fadeDistance;
      opacity = Math.max(0, Math.min(1, 1 - t));
      translateY = -t * 20;
      scale = 1.0 - t * 0.04;
      blur = t * 6;
    }

    return {
      opacity,
      transform: `translateY(${translateY}px) scale(${scale})`,
      filter: `blur(${blur}px)`,
      pointerEvents: (opacity > 0.4 ? 'auto' : 'none') as 'auto' | 'none',
      transition: 'opacity 0.2s ease-out, transform 0.2s ease-out, filter 0.2s ease-out',
      display: 'block',
    };
  };

  // Section Visibility Gates (Calibrated for Sequential Pacing across 480vh)
  const isStage1Active = scrollProgress >= 0.05 && scrollProgress < 0.30; // Section 1: Evidentiary Audit
  const isStage2Active = scrollProgress >= 0.30 && scrollProgress < 0.58; // Section 2: 4 Vulnerabilities Carousel
  const isStage3Active = scrollProgress >= 0.58 && scrollProgress < 0.82; // Section 3: Deliverables Architecture
  const isKingdomActive = scrollProgress >= 0.82; // Movement 5: Kingdom Arrival Skyline Lockup

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: '480vh' }}
    >
      {/* Sticky Canvas Viewport (100vh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
        {/* Living Driving Video Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ display: prefersReducedMotion ? 'none' : 'block' }}
        />

        {/* Reduced motion static fallback image */}
        {prefersReducedMotion && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/frames/driving-desktop/frame-0001.webp"
            alt="The Woodlands to Houston Highway Corridor"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Chiaroscuro Atmospheric Vignette Overlays (Brand Bible v3.0) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-[#010101]/30 to-[#050505]/60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050505]/75 via-transparent to-[#050505]/75" />

        {/* ── COCKPIT WINDSHIELD DIGITAL HUD DISPLAY (THE 3 SECTIONS ON GLASS) ── */}
        <div
          style={getStageTransition(0.04, 0.80, 0.04)}
          className="absolute inset-0 z-20 w-full h-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col justify-center items-center pointer-events-none pt-12 pb-16"
        >
          {/* Top Windshield AR Telemetry Header */}
          <div className="w-full max-w-4xl mx-auto flex items-center justify-between px-4 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-white/70 mb-4 select-none flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="text-[#00E5FF] font-bold">COCKPIT HUD ONLINE</span>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="text-white/60 hidden sm:inline">I-45 SOUTH ARTERIAL</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#D4AF37] font-semibold">THE WOODLANDS ➔ HOUSTON METRO</span>
              <span className="text-white/30 hidden md:inline">|</span>
              <span className="text-white/60 font-mono hidden md:inline">LAT 29.7604° N · LON 95.3698° W</span>
            </div>
          </div>

          {/* Central Windshield HUD Projection Matrix (All 3 Stages share exact center via Grid) */}
          <div className="relative w-full flex-1 grid grid-cols-1 grid-rows-1 place-items-center items-center justify-items-center my-auto">
            {/* ── HUD STAGE 01: EVIDENTIARY AUDIT & BENCHMARKS ── */}
            <div
              style={getStageTransition(0.05, 0.28, 0.04)}
              className="col-start-1 row-start-1 w-full max-w-5xl mx-auto pointer-events-auto"
            >
              <div className="p-5 sm:p-7 rounded-3xl bg-[#050505]/85 border border-[#E5E4E2]/20 backdrop-blur-2xl shadow-[0_12px_45px_rgba(0,0,0,0.85)] space-y-4 sm:space-y-5">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-gold)]/40 bg-black/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[var(--color-gold)]">
                      HUD READOUT 01 // AEO SPECIFICATION & MACHINE GROUNDING
                    </span>
                  </div>

                  <h2 className="hid-sword-blade text-xl sm:text-3xl md:text-4xl font-bold tracking-[0.14em] uppercase">
                    EVIDENTIARY AUDIT
                  </h2>

                  <div className="text-xs sm:text-sm font-serif text-[#D4AF37] uppercase tracking-widest">
                    EMPIRICAL PROOF // HOW GENERATIVE ENGINES RESHAPE DISCOVERY
                  </div>

                  <p className="text-xs sm:text-sm text-white/75 max-w-2xl mx-auto leading-relaxed font-serif pt-0.5">
                    {siteCopy.hero.subhead}
                  </p>
                </div>

                {/* 4 Verified Evidence Items Projected onto Windshield */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
                  {evidenceLedger.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-[#D4AF37]/50 transition-colors space-y-1.5 backdrop-blur-sm shadow-md"
                    >
                      <span className="text-[9px] font-mono font-bold tracking-wider text-[var(--color-gold)] uppercase block">
                        {item.badge}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-serif leading-snug">
                        {item.approvedClaim}
                      </h4>
                      <p className="text-[11px] text-white/60 leading-relaxed font-serif">
                        {item.methodologyNote}
                      </p>
                      <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-white/40">
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

            {/* ── HUD STAGE 02: THE INVISIBLE ELITE REALITY (4 VULNERABILITIES CAROUSEL) ── */}
            <div
              style={getStageTransition(0.28, 0.55, 0.04)}
              className="col-start-1 row-start-1 w-full max-w-4xl mx-auto pointer-events-auto"
            >
              <div className="p-5 sm:p-7 rounded-3xl bg-[#050505]/85 border border-[#E5E4E2]/20 backdrop-blur-2xl shadow-[0_12px_45px_rgba(0,0,0,0.85)] space-y-4 text-center">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-gold)]/40 bg-black/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[var(--color-gold)]">
                      HUD READOUT 02 // 4 SYSTEMIC VULNERABILITIES
                    </span>
                  </div>

                  <h3 className="hid-sword-blade text-xl sm:text-3xl md:text-4xl font-bold tracking-[0.14em] uppercase">
                    THE INVISIBLE ELITE REALITY
                  </h3>

                  <div className="text-xs sm:text-sm font-serif text-[#D4AF37] uppercase tracking-widest">
                    What Happens When 25 Years of Offline Reputation Meets Zero-Click AI Search
                  </div>
                </div>

                <div className="flex justify-center pt-1">
                  <SocialProofCarousel embedded={true} />
                </div>
              </div>
            </div>

            {/* ── HUD STAGE 03: INSPIRATION IGNITION HUB DELIVERABLE ARCHITECTURE ── */}
            <div
              style={getStageTransition(0.55, 0.80, 0.04)}
              className="col-start-1 row-start-1 w-full max-w-4xl mx-auto pointer-events-auto"
            >
              <div className="p-5 sm:p-7 rounded-3xl bg-[#050505]/85 border border-[#E5E4E2]/20 backdrop-blur-2xl shadow-[0_12px_45px_rgba(0,0,0,0.85)] space-y-4">
                <div className="text-center space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-gold)]/40 bg-black/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[var(--color-gold)]">
                      HUD READOUT 03 // DIAGNOSTIC DELIVERABLE ARCHITECTURE
                    </span>
                  </div>

                  <h2 className="hid-sword-blade text-xl sm:text-3xl md:text-4xl font-bold tracking-[0.14em] uppercase">
                    THE INSPIRATION IGNITION HUB
                  </h2>

                  <div className="text-xs sm:text-sm font-serif text-[#D4AF37] uppercase tracking-widest">
                    Grounded AI Diagnostic Deliverable
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono tracking-widest uppercase text-[#D4AF37] font-bold">
                      {siteCopy.deliverables.h2}
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-serif">
                    {siteCopy.deliverables.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[var(--color-gold)] font-bold mt-0.5 text-base">✓</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Scope & Solar Ascension Nudge */}
                  {siteCopy.deliverables.scopeNote && (
                    <div className="p-3 rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/[0.06] space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                        <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                          SCOPE & AS-OF TIMESTAMP PROTOCOL
                        </span>
                      </div>
                      <p className="text-xs text-white/80 leading-relaxed font-serif">
                        {siteCopy.deliverables.scopeNote}
                      </p>
                    </div>
                  )}

                  <div className="pt-2 border-t border-white/10">
                    <p className="text-xs text-white/60 leading-relaxed font-serif">
                      {siteCopy.mtmFix.body}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── STAGE 04: THE KINGDOM ARRIVAL (LOWER-LEFT FORGE SECTION HEADER LOCKUP) ── */}
        <div
          style={getStageTransition(0.80, 1.0, 0.04)}
          className="absolute bottom-10 sm:bottom-16 left-6 sm:left-12 md:left-16 z-30 pointer-events-none max-w-2xl"
        >
            <div className="space-y-3 w-full text-left pointer-events-auto p-6 sm:p-8 rounded-2xl bg-[#050505]/95 border border-[#E5E4E2]/20 backdrop-blur-2xl shadow-[0_12px_45px_rgba(0,0,0,0.95)]">
              {/* Echo Containment Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-black/80 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" aria-hidden="true" />
                <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-[#E5E4E2] font-semibold">
                  SOVEREIGN AUTHORITY // CATEGORY MONOPOLY
                </span>
              </div>

              {/* Nina Header H1: High-Intensity Surgical HID White Glow */}
              <h1
                className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-white uppercase leading-tight tracking-[0.04em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
                style={{
                  textShadow: '0 0 16px rgba(255,255,255,0.95), 0 0 32px rgba(255,255,255,0.6), 0 0 50px rgba(212,175,55,0.3)',
                }}
              >
                THE KINGDOM ARRIVAL
              </h1>

              {/* Goldie Subtitle H2: Molten Midas Gold Prominent Subtitle */}
              <h2 className="text-sm sm:text-base md:text-lg font-serif font-bold text-[#D4AF37] tracking-[0.14em] uppercase leading-snug drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] pt-1">
                THE INITIAL DIAGNOSTIC ENDS HERE. YOUR ENTRY INTO THE KINGDOM BEGINS.
              </h2>

              {/* Foundation Subtext & Dual Brand Taglines */}
              <div className="pt-2 border-t border-white/10 space-y-1">
                <span className="text-xs sm:text-sm font-sans tracking-[0.16em] uppercase text-[#E5E4E2] font-semibold block">
                  MINDSET. TECH. MASTERY. | MARKETING MASTERY FOR MODERN MINDS
                </span>
                <span className="text-[10px] sm:text-xs font-mono tracking-[0.24em] uppercase text-[#D4AF37] font-bold block">
                  THE INFRASTRUCTURE BENEATH YOUR KINGDOM
                </span>
              </div>

              {/* Solarium Handoff Portal Trigger */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href="https://mtmediaai.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#E5E4E2] text-black font-mono text-xs uppercase tracking-[0.16em] font-bold shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] hover:scale-105 transition-all duration-300"
                >
                  <span>ENTER THE PALACE SOLARIUM</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
