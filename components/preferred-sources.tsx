import React from 'react';

interface PreferredSourceButtonProps {
  fallbackUrl: string;
  label: string;
}

export function PreferredSourceSlot({ fallbackUrl, label }: PreferredSourceButtonProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
      {/* Official Google Preferred Sources Web Component Container */}
      <div
        google-add-preferred-source-btn=""
        data-theme="dark"
        className="min-h-[36px]"
      />
      {/* Fallback destination anchor */}
      <a
        href={fallbackUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-[var(--color-chrome)] hover:text-[var(--color-gold)] transition-colors underline underline-offset-4"
      >
        {label}
      </a>
    </div>
  );
}
