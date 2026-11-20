'use client';

import React from 'react';

export function NeuralCircuitBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#020202]">
      {/* L1 Void Base Texture */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #E5E4E2 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Atmospheric Emitters */}
      {/* Top Hero Gold Radiance */}
      <div 
        className="absolute -top-32 left-1/2 h-[700px] w-[1000px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.03) 50%, transparent 75%)',
        }}
      />
      
      {/* Mid Right Cyan Telemetry Radiance */}
      <div 
        className="absolute top-[35%] right-[-15%] h-[600px] w-[600px] rounded-full blur-[150px]"
        style={{
          background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Lower Left Sovereign Radiance */}
      <div 
        className="absolute top-[65%] left-[-15%] h-[700px] w-[700px] rounded-full blur-[160px]"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Subtle Vector Neural Circuit Lattice */}
      <svg 
        className="absolute inset-0 h-full w-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="circuit-grid" width="160" height="160" patternUnits="userSpaceOnUse">
            <path 
              d="M 160 0 L 160 160 M 0 160 L 160 160 M 0 80 L 40 80 L 60 100 L 120 100 L 140 80 L 160 80 M 80 0 L 80 40 L 100 60 L 100 120 L 80 140 L 80 160" 
              fill="none" 
              stroke="#D4AF37" 
              strokeWidth="0.75" 
            />
            <circle cx="60" cy="100" r="2" fill="#D4AF37" />
            <circle cx="120" cy="100" r="2" fill="#00E5FF" />
            <circle cx="100" cy="60" r="2" fill="#00E5FF" />
            <circle cx="100" cy="120" r="2" fill="#D4AF37" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-grid)" />
      </svg>
    </div>
  );
}
