import React from 'react';

export interface ForgeSectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function ForgeSectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className = '',
}: ForgeSectionHeaderProps) {
  return (
    <div className={`space-y-3 ${centered ? 'text-center' : ''} ${className}`}>
      {/* Echo: Structural Containment Field */}
      <div>
        <div className="forge-echo-containment">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" aria-hidden="true" />
          <span className="text-[11px] font-mono font-bold tracking-widest uppercase text-[var(--color-gold)]">
            {eyebrow}
          </span>
        </div>
      </div>

      {/* Nina: Hyper-Bright HID Glow Title */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif forge-nina-glow tracking-tight leading-tight">
        {title}
      </h2>

      {/* Goldie: Strategic Explanatory Subtitle */}
      {subtitle && (
        <p className="text-xs sm:text-sm forge-goldie-subtitle tracking-wider opacity-90 max-w-3xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
