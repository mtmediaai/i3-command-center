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
        className={className || "px-6 py-3 rounded border border-[var(--color-gold)] bg-[var(--color-gold)] text-black font-semibold text-sm hover:bg-[var(--color-gold)]/90 transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.25)]"}
      >
        {label}
      </button>
      <LeadModal open={open} onOpenChange={setOpen} />
    </>
  );
}
