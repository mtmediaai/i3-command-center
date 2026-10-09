'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { I3_CONTENT } from '@/src/config/content';

const TOTAL_FRAMES = 120;

function formatFrameNumber(num: number): string {
  return String(num).padStart(4, '0');
}

export function EstateCanvasScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFrameIndex, setActiveFrameIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);

  // Form State
  const [zipCode, setZipCode] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [craftVector, setCraftVector] = useState(I3_CONTENT.craftOptions[0].id);
  const [craftOtherSpecification, setCraftOtherSpecification] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [diagnosticResult, setDiagnosticResult] = useState<any>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [submissionHash, setSubmissionHash] = useState<string>('');

  // Frame Cache & Drawing Refs
  const loadedFramesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const isMobileRef = useRef<boolean>(false);
  const tickingRef = useRef<boolean>(false);
  const isDocumentVisibleRef = useRef<boolean>(true);
  const lastRenderedIndexRef = useRef<number>(-1);

  // Helper to draw an image to canvas with object-fit: cover math
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
    while (targetIndex - distance >= 0 || targetIndex + distance < TOTAL_FRAMES) {
      const lower = targetIndex - distance;
      if (lower >= 0 && frames[lower]) {
        return frames[lower];
      }
      const upper = targetIndex + distance;
      if (upper < TOTAL_FRAMES && frames[upper]) {
        return frames[upper];
      }
      distance++;
    }
    return null;
  }, []);

  // Render specific frame index
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
    const folder = isMobile ? 'mobile' : 'desktop';

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
    const remainingIndices = Array.from({ length: TOTAL_FRAMES }, (_, i) => i).filter(
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

              const targetFrame = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(progress * TOTAL_FRAMES)));
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

  // Form submission handler
  const handleIntakeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);

    try {
      const payload = {
        zipCode: zipCode.trim(),
        companyName: companyName.trim(),
        workEmail: workEmail.trim(),
        craftVector,
        craftOtherSpecification: craftVector === 'OTHER' ? craftOtherSpecification.trim() : undefined,
      };

      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        if (res.status === 429) {
          throw new Error('Rate limit active: Maximum 5 inquiries per 10-minute window. Please retry in 10 minutes.');
        }
        throw new Error(data.message || data.error || 'Submission verification failed. Please check inputs.');
      }

      const generatedHash = `MTM-TX-${zipCode.trim()}-${Date.now().toString(36).toUpperCase()}`;
      setSubmissionHash(generatedHash);
      setDiagnosticResult(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setFormError(message);
    } finally {
      setFormSubmitting(false);
    }
  };

  const resetForm = () => {
    setDiagnosticResult(null);
    setFormError(null);
  };

  // Scene overlay visibility calculation
  const isHeroActive = scrollProgress < 0.18;
  const isScene1Active = scrollProgress >= 0.18 && scrollProgress < 0.36;
  const isScene2Active = scrollProgress >= 0.36 && scrollProgress < 0.54;
  const isScene3Active = scrollProgress >= 0.54 && scrollProgress < 0.72;
  const isScene4Active = scrollProgress >= 0.72 && scrollProgress < 0.88;
  const isIntakeActive = scrollProgress >= 0.88;

  // Selected craft label lookup
  const activeCraftOption = I3_CONTENT.craftOptions.find((c) => c.id === craftVector);
  const displayedCraftLabel =
    craftVector === 'OTHER' && craftOtherSpecification
      ? craftOtherSpecification
      : activeCraftOption?.label || craftVector;

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: '400vh' }}
    >
      {/* Sticky Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
        {/* Living Video Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ display: prefersReducedMotion ? 'none' : 'block' }}
        />

        {/* Reduced motion static fallback image */}
        {prefersReducedMotion && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/frames/desktop/frame-0001.webp"
            alt="The Woodlands modern estate exterior"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {/* Chiaroscuro Shadow Gradient Plates (Material Physics: High Gloss Onyx into Matte Obsidian) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-[#010101]/40 to-[#050505]/70" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/60 to-transparent" />

        {/* ── LOWER LEFT SCENE OVERLAYS (THE FORGE PROTOCOL: NINA HID GLOW + GOLDIE STRATEGIC SUBTITLE) ── */}
        {!isIntakeActive && (
          <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex flex-col justify-end pb-12 sm:pb-16 md:pb-20 pointer-events-none">
            {/* Movement 0: Hero Title & Lead */}
            {isHeroActive && (
              <section className="space-y-3 max-w-2xl text-left pointer-events-auto">
                {/* Product Name Badge / Eyebrow (Echo Container) */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-black/60 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" aria-hidden="true" />
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-[#E5E4E2] font-semibold">
                    INVISIBLE INFRASTRUCTURE INTELLIGENCE (I³ SYSTEM)
                  </span>
                </div>

                {/* H1 Hero Message (Sized to mirror subsequent scroll sections) */}
                <h1
                  className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-snug drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]"
                  style={{
                    textShadow: '0 0 14px rgba(255,255,255,0.85), 0 0 28px rgba(255,255,255,0.5)',
                  }}
                >
                  {I3_CONTENT.hero.statement}
                </h1>

                {/* H2 Gold Subtitle at the bottom on one line */}
                <h2 className="text-sm sm:text-base md:text-lg font-serif font-bold text-[#D4AF37] tracking-[0.14em] uppercase whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] pt-1">
                  {I3_CONTENT.hero.superTitle}
                </h2>
              </section>
            )}

            {/* Movement 1: The Grand Entryway (Entering the interior of the home) */}
            {isScene1Active && (
              <section className="space-y-2.5 max-w-2xl text-left pointer-events-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#D4AF37] tracking-[0.14em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  THE GRAND ENTRYWAY
                </h2>
                <p
                  className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-snug drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]"
                  style={{
                    textShadow: '0 0 14px rgba(255,255,255,0.85), 0 0 28px rgba(255,255,255,0.5)',
                  }}
                >
                  {I3_CONTENT.scenes.scene1_curbAppeal}
                </p>
              </section>
            )}

            {/* Movement 2: Outdoor Oasis (Moving to the outside pool & resort loggia) */}
            {isScene2Active && (
              <section className="space-y-2.5 max-w-2xl text-left pointer-events-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#D4AF37] tracking-[0.14em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  OUTDOOR OASIS
                </h2>
                <p
                  className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-snug drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]"
                  style={{
                    textShadow: '0 0 14px rgba(255,255,255,0.85), 0 0 28px rgba(255,255,255,0.5)',
                  }}
                >
                  {I3_CONTENT.scenes.scene2_interiorAudio}
                </p>
              </section>
            )}

            {/* Movement 3: The Motor Court (The collector's garage with Porsche & Pagani) */}
            {isScene3Active && (
              <section className="space-y-2.5 max-w-2xl text-left pointer-events-auto">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#D4AF37] tracking-[0.14em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                  THE MOTOR COURT
                </h2>
                <p
                  className="text-xl sm:text-3xl md:text-4xl font-serif font-bold text-white leading-snug drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]"
                  style={{
                    textShadow: '0 0 14px rgba(255,255,255,0.85), 0 0 28px rgba(255,255,255,0.5)',
                  }}
                >
                  {I3_CONTENT.scenes.scene3_outdoorOasis}
                </p>
              </section>
            )}

            {/* Movement 4: Standalone Hero Shot (The Black Jewel MTM Emblem Inlaid Floor) */}
            {isScene4Active && (
              <section className="space-y-3 max-w-3xl text-left pointer-events-auto">
                <span className="text-xs sm:text-sm font-mono tracking-[0.22em] text-[#D4AF37] uppercase font-bold block drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  SOVEREIGN FOUNDATION // ZERO-CLICK INFRASTRUCTURE
                </span>
                <h2
                  className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-white leading-tight uppercase tracking-[0.03em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]"
                  style={{
                    textShadow:
                      '0 0 15px rgba(255,255,255,0.95), 0 0 30px rgba(255,255,255,0.65), 0 0 50px rgba(212,175,55,0.4)',
                  }}
                >
                  MT Media AI: The Infrastructure Beneath YOUR Kingdom
                </h2>
                <p
                  className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-white/90 leading-snug drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
                  style={{
                    textShadow: '0 0 12px rgba(255,255,255,0.75), 0 0 24px rgba(255,255,255,0.4)',
                  }}
                >
                  {I3_CONTENT.scenes.scene4_motorCourt}
                </p>
              </section>
            )}
          </div>
        )}

        {/* Movement 5: The Foundation Medallion & Interactive Diagnostic State Machine */}
        {isIntakeActive && (
          <div className="relative z-10 h-full w-full max-w-2xl mx-auto px-4 sm:px-6 flex flex-col justify-center items-center pointer-events-none">
            <section className="space-y-6 w-full text-center pointer-events-auto bg-[#050505]/95 border border-[#E5E4E2]/20 p-5 sm:p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
              <div className="space-y-2">
                <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase font-bold block">
                  {I3_CONTENT.intakeConsole.tagline}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#F5F5F5] font-bold">
                  {I3_CONTENT.intakeConsole.header}
                </h2>
                <p className="text-xs sm:text-sm text-[#F5F5F5]/70 max-w-lg mx-auto">
                  {I3_CONTENT.intakeConsole.subtext}
                </p>
                <p className="text-[11px] font-mono text-[#D4AF37]">
                  {I3_CONTENT.intakeConsole.constraint}
                </p>
              </div>

              {/* State A: Interactive Input Form */}
              {!diagnosticResult ? (
                <form onSubmit={handleIntakeSubmit} className="space-y-4 text-left pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono uppercase text-[#F5F5F5]/60 block mb-1">
                        Zip Code (5 digits)
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        pattern="^\d{5}$"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="77380"
                        className="w-full bg-[#010101] border border-[#E5E4E2]/20 rounded px-3 py-2 text-sm text-[#F5F5F5] placeholder-[#F5F5F5]/30 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase text-[#F5F5F5]/60 block mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Firm Name"
                        className="w-full bg-[#010101] border border-[#E5E4E2]/20 rounded px-3 py-2 text-sm text-[#F5F5F5] placeholder-[#F5F5F5]/30 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-mono uppercase text-[#F5F5F5]/60 block mb-1">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        placeholder="principal@firm.com"
                        className="w-full bg-[#010101] border border-[#E5E4E2]/20 rounded px-3 py-2 text-sm text-[#F5F5F5] placeholder-[#F5F5F5]/30 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase text-[#F5F5F5]/60 block mb-1">
                        Craft Vector
                      </label>
                      <select
                        value={craftVector}
                        onChange={(e) => setCraftVector(e.target.value)}
                        className="w-full bg-[#010101] border border-[#E5E4E2]/20 rounded px-3 py-2 text-sm text-[#F5F5F5] focus:outline-none focus:border-[#D4AF37]"
                      >
                        {I3_CONTENT.craftOptions.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {craftVector === 'OTHER' && (
                    <div>
                      <label className="text-[11px] font-mono uppercase text-[#F5F5F5]/60 block mb-1">
                        Specify Your Craft Specialty
                      </label>
                      <input
                        type="text"
                        required
                        value={craftOtherSpecification}
                        onChange={(e) => setCraftOtherSpecification(e.target.value)}
                        placeholder="e.g. Bespoke Architectural Millwork"
                        className="w-full bg-[#010101] border border-[#E5E4E2]/20 rounded px-3 py-2 text-sm text-[#F5F5F5] placeholder-[#F5F5F5]/30 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  )}

                  {formError && (
                    <div className="p-3 rounded bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
                      {formError}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full bg-[#D4AF37] hover:bg-[#b89528] text-black font-bold uppercase tracking-wider py-3.5 rounded text-xs transition-colors disabled:opacity-50"
                    >
                      {formSubmitting ? 'Evaluating Seat Availability...' : I3_CONTENT.intakeConsole.submitButton}
                    </button>
                  </div>
                </form>
              ) : (
                /* State B: High-Status Territory Status Cards (State Machine) */
                <div className="space-y-5 text-left pt-2">
                  {/* Branch 1: FIRST-ROUND DRAFT PICK (Score >= 85) */}
                  {diagnosticResult.tier === 'DRAFT_PICK' && (
                    <div className="p-5 rounded-xl bg-[#010101] border border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.25)] space-y-3">
                      <div className="flex justify-between items-center border-b border-[#D4AF37]/30 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]" />
                          </span>
                          <span className="text-xs font-mono font-bold text-[#D4AF37] tracking-wider">
                            FIRST-ROUND DRAFT PICK
                          </span>
                        </div>
                        <span className="text-xs font-mono text-[#00E5FF] font-medium">
                          ZIP {zipCode}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif text-[#F5F5F5] font-bold">
                        TERRITORY VERIFIED: CATEGORY SEAT OPEN
                      </h3>

                      <p className="text-xs text-[#F5F5F5]/85 leading-relaxed font-serif">
                        Zip Code {zipCode} is currently unheld for {displayedCraftLabel}. Your credentials have been escalated to Reign for immediate reservation review. Your custom Inspiration Ignition Hub is compiling.
                      </p>

                      <div className="pt-2 border-t border-[#E5E4E2]/10 flex flex-wrap justify-between items-center text-[10px] font-mono text-[#F5F5F5]/60 gap-2">
                        <span>REF: {submissionHash}</span>
                        <span className="text-[#00E5FF]">STATUS: LOCKED (PENDING ORCHESTRATION)</span>
                      </div>
                    </div>
                  )}

                  {/* Branch 2: QUALIFIED WAITING LIST (Score 70-84) */}
                  {diagnosticResult.tier === 'WAITING_LIST' && (
                    <div className="p-5 rounded-xl bg-[#010101] border border-[#E5E4E2] shadow-[0_0_20px_rgba(229,228,226,0.15)] space-y-3">
                      <div className="flex justify-between items-center border-b border-[#E5E4E2]/20 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex rounded-full h-2.5 w-2.5 bg-[#E5E4E2]" />
                          <span className="text-xs font-mono font-bold text-[#E5E4E2] tracking-wider">
                            MTM TERRITORIAL RESERVE
                          </span>
                        </div>
                        <span className="text-xs font-mono text-white/50">
                          ZIP {zipCode}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif text-[#F5F5F5] font-bold">
                        TERRITORIAL RESERVE: PRIORITY QUEUE
                      </h3>

                      <p className="text-xs text-[#F5F5F5]/85 leading-relaxed font-serif">
                        Category interest is high in Zip Code {zipCode}. Your application has been logged to the MTM Territorial Reserve. You will be notified if the incumbent seat becomes available.
                      </p>

                      <div className="pt-2 border-t border-[#E5E4E2]/10 flex flex-wrap justify-between items-center text-[10px] font-mono text-[#F5F5F5]/60 gap-2">
                        <span>REF: {submissionHash}</span>
                        <span className="text-[#D4AF37]">QUEUE: PRIORITY SEAT HOLD</span>
                      </div>
                    </div>
                  )}

                  {/* Branch 3: DISQUALIFIED / HOLD (Score < 70) */}
                  {diagnosticResult.tier === 'HOLD' && (
                    <div className="p-5 rounded-xl bg-[#010101] border border-[#F5F5F5]/30 space-y-3">
                      <div className="flex justify-between items-center border-b border-[#F5F5F5]/15 pb-3">
                        <span className="text-xs font-mono font-bold text-[#F5F5F5]/70 tracking-wider">
                          MTM RESEARCH REGISTRY
                        </span>
                        <span className="text-xs font-mono text-[#F5F5F5]/40">
                          ZIP {zipCode}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif text-[#F5F5F5] font-bold">
                        TERRITORY STATUS LOGGED
                      </h3>

                      <p className="text-xs text-[#F5F5F5]/80 leading-relaxed font-serif">
                        Thank you for your submission. Our current deployment window in Zip Code {zipCode} is strictly restricted to sovereign luxury category leaders.
                      </p>

                      <div className="pt-2 border-t border-[#F5F5F5]/10 text-[10px] font-mono text-[#F5F5F5]/50">
                        REF: {submissionHash} // Market telemetry recorded.
                      </div>
                    </div>
                  )}

                  {/* Diagnostic Query Simulations (for Qualified Inbound and Draft Picks) */}
                  {diagnosticResult.ignitionHub?.querySimulations && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block font-bold">
                        Simulated Conversational AI Invisibility Vulnerabilities:
                      </span>
                      {diagnosticResult.ignitionHub.querySimulations.map((sim: any, idx: number) => (
                        <div key={idx} className="p-3 rounded-lg bg-[#010101] border border-[#E5E4E2]/15 text-xs space-y-1">
                          <p className="text-[#F5F5F5] font-mono font-medium">{sim.query}</p>
                          <p className="text-red-400 font-mono text-[11px]">{sim.status}: {sim.engineRecommendation}</p>
                          <p className="text-[#F5F5F5]/70 text-[11px]">Sovereign Action: {sim.remedy}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reset action to check another territory */}
                  <div className="pt-3 text-center">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-xs font-mono text-[#D4AF37] hover:underline uppercase tracking-wider"
                    >
                      Verify Another Postal Code
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
