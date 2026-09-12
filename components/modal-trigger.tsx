'use client';

import React, { useState } from 'react';
import { LeadModal } from './lead-modal';

interface ModalTriggerProps {
  label: string;
  className?: string;
}

export function ModalTrigger({ label, className }: ModalTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className || "px-7 py-3.5 rounded-lg border border-[var(--color-gold)] midas-glow-button text-black font-semibold text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] active:scale-[0.98]"}
      >
        {label}
      </button>
      <LeadModal open={open} onOpenChange={setOpen} />
    </>
  );
}
