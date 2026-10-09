'use client';

import React, { useEffect, useRef, useState } from 'react';

export function AmbientVoidVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ticking = false;

    const evaluateVideoPlayback = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // The 400vh canvas track ends when scroll passes approximately 3.5x innerHeight
          // Only play video when visible below the opaque canvas
          const threshold = window.innerHeight * 3.5;
          const scrolledPastCanvas = window.scrollY >= threshold;
          const isDocVisible = !document.hidden;

          const shouldPlay = scrolledPastCanvas && isDocVisible;

          if (shouldPlay !== isActive) {
            setIsActive(shouldPlay);
          }

          if (videoRef.current) {
            if (shouldPlay) {
              if (videoRef.current.paused) {
                videoRef.current.play().catch(() => {});
              }
            } else {
              if (!videoRef.current.paused) {
                videoRef.current.pause();
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleVisibilityChange = () => {
      evaluateVideoPlayback();
    };

    window.addEventListener('scroll', evaluateVideoPlayback, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial check
    evaluateVideoPlayback();

    return () => {
      window.removeEventListener('scroll', evaluateVideoPlayback);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isActive]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover opacity-25 scale-105 transition-opacity duration-1000"
      >
        <source src="/assets/houston-ambient-void.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/90 to-black pointer-events-none" />
      <div className="solar-arc-halo opacity-40" />
    </div>
  );
}
