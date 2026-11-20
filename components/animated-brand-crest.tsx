'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

export function AnimatedBrandCrest() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const [lightningActive, setLightningActive] = useState(true);

  // Mouse move handler for 3D tilt and specular reflection
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smooth subtle tilt (-7deg to +7deg)
    const rotX = -((y - centerY) / centerY) * 7;
    const rotY = ((x - centerX) / centerX) * 7;
    
    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.25,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  // Intermittent lightning pulse effect for Roman's strike
  useEffect(() => {
    const interval = setInterval(() => {
      setLightningActive(false);
      const timer = setTimeout(() => {
        setLightningActive(true);
      }, 150);
      return () => clearTimeout(timer);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-8">
      {/* Outer Atmospheric Radiant Halos */}
      <div 
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] sm:h-[640px] sm:w-[640px] rounded-full blur-3xl transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(0,229,255,0.08) 45%, transparent 70%)',
          animation: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        }}
      />

      {/* Orbiting Infinite Rings representing Beat 4: Compounding Equity */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[340px] w-[340px] sm:h-[500px] sm:w-[500px]">
        <div 
          className="h-full w-full rounded-full border border-[#D4AF37]/20"
          style={{
            animation: 'spin 30s linear infinite',
            boxShadow: '0 0 25px rgba(212,175,55,0.15)',
          }}
        />
        <div 
          className="absolute inset-4 rounded-full border border-dashed border-[#00E5FF]/25"
          style={{
            animation: 'spin 45s linear infinite reverse',
          }}
        />
        {/* Orbiting light particles */}
        <div 
          className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#00E5FF] shadow-[0_0_12px_#00E5FF]"
          style={{ animation: 'spin 30s linear infinite', transformOrigin: '50% 250px' }}
        />
        <div 
          className="absolute left-1/2 bottom-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#D4AF37] shadow-[0_0_15px_#D4AF37]"
          style={{ animation: 'spin 30s linear infinite', transformOrigin: '50% -250px' }}
        />
      </div>

      {/* 3D Interactive Crest Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative z-10 mx-auto aspect-[16/9] w-full max-w-4xl cursor-pointer select-none rounded-2xl p-1 transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`,
        }}
      >
        {/* Beveled Edge Highlight */}
        <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/20 bg-black/80 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.2)] backdrop-blur-2xl transition-all duration-500 group-hover:border-[#D4AF37]/60 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_60px_rgba(212,175,55,0.35)]">
          
          {/* Base Crest Image */}
          <Image
            src="/brand/mtm-crest-lightning-strike.jpg"
            alt="MT Media AI Sovereign Crest with Roman Kinetic Lightning Strike"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* Liquid Glass Specular Reflection Sheen */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 350px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.22), transparent 70%)`,
              opacity: glarePosition.opacity,
            }}
          />

          {/* Roman's Kinetic Electric Strike Overlay & High-Voltage Arcing */}
          <div
            className={`pointer-events-none absolute inset-0 transition-opacity duration-150 ${
              lightningActive ? 'opacity-100' : 'opacity-40'
            }`}
          >
            {/* Horizontal Cyan High-Voltage Core Beam */}
            <div 
              className="absolute left-0 right-0 top-[52%] h-[3px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_20px_#00E5FF,0_0_35px_#00E5FF]"
              style={{
                animation: 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
            {/* Surgical HID White Core Wire */}
            <div 
              className="absolute left-[15%] right-[15%] top-[52%] h-[1.5px] -translate-y-1/2 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_12px_#ffffff]"
            />
            {/* Radiating Atmospheric Ionization Field */}
            <div 
              className="absolute left-1/2 top-[52%] h-24 w-3/4 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,229,255,0.18)_0%,transparent_75%)] blur-md"
            />
          </div>

          {/* Subtle Vignette & Frame Shadow */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>
      </div>
    </div>
  );
}
