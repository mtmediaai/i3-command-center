import React from 'react';

interface MonogramProps {
  className?: string;
  size?: number;
}

export function Monogram({ className = 'w-9 h-9', size = 36 }: MonogramProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="MT Media AI Monogram"
    >
      {/* Outer shield outline */}
      <polygon
        points="50,6 90,26 90,70 50,94 10,70 10,26"
        stroke="#D4AF37"
        strokeWidth="4"
        fill="#050505"
      />
      {/* Inner geometric MTM emblem */}
      <path
        d="M26 68 V32 L50 56 L74 32 V68"
        stroke="#FFFFFF"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="24" r="5" fill="#D4AF37" />
    </svg>
  );
}
