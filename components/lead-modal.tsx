'use client';

import React, { useState, useEffect, useId } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { siteCopy } from '@/content/site-copy';
import { siteConfig, Category } from '@/config/site.config';

interface LeadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadModal({ open, onOpenChange }: LeadModalProps) {
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [category, setCategory] = useState<Category>('unspecified');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [renderedAt, setRenderedAt] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const fullNameId = useId();
  const businessNameId = useId();
  const emailId = useId();
  const websiteId = useId();
  const categoryId = useId();
  const linkedinUrlId = useId();
  const consentId = useId();
  const hpId = useId();

  useEffect(() => {
    if (open) {
      setRenderedAt(Date.now());
      setStatus('idle');
      setErrorMsg('');
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;

    setLoading(true);
    setStatus('idle');
    setErrorMsg('');

    // Extract query parameters for UTM passing
    const searchParams = new URLSearchParams(window.location.search);
    const utm = {
      utm_source: searchParams.get('utm_source') || siteConfig.utmDefaults.source,
      utm_medium: searchParams.get('utm_medium') || siteConfig.utmDefaults.medium,
      utm_campaign: searchParams.get('utm_campaign') || siteConfig.utmDefaults.campaign,
      utm_term: searchParams.get('utm_term') || undefined,
      utm_content: searchParams.get('utm_content') || undefined,
    };

    const payload = {
      full_name: fullName,
      business_name: businessName,
      email,
      website: website || undefined,
      category,
      linkedin_url: linkedinUrl || undefined,
      consent,
      hp_confirm: honeypot,
      rendered_at: renderedAt,
      utm,
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setErrorMsg(data.error || siteCopy.modal.errorMessage);
      }
    } catch {
      setStatus('error');
      setErrorMsg(siteCopy.modal.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs transition-opacity" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[94vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/20 bg-[#0A0A0A] p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.2)] text-[var(--color-chrome-white)] max-h-[90vh] overflow-y-auto focus:outline-none clinical-rim">
          <div className="flex items-start justify-between mb-4 border-b border-white/10 pb-3">
            <div>
              <Dialog.Title className="text-xl font-bold tracking-tight text-[var(--color-rim)] font-serif">
                {siteCopy.modal.title}
              </Dialog.Title>
              <Dialog.Description className="text-xs text-[var(--color-chrome)] mt-1">
                {siteCopy.modal.description}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded p-1 text-[var(--color-chrome)] hover:text-white hover:bg-white/10 focus:outline-none"
                aria-label={siteCopy.modal.closeButton}
              >
                ✕
              </button>
            </Dialog.Close>
          </div>

          {status === 'success' ? (
            <div className="py-8 text-center space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-gold)] bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-xl">
                ✓
              </div>
              <p className="text-sm text-[var(--color-rim)] font-serif leading-relaxed">
                {siteCopy.modal.successMessage}
              </p>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="mt-4 px-6 py-2 rounded border border-[var(--color-gold)] bg-[var(--color-gold)] text-black text-sm font-semibold hover:bg-[var(--color-gold)]/90 transition-colors"
              >
                {siteCopy.modal.closeButton}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Honeypot anti-spam trap */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor={hpId}>Confirmation</label>
                <input
                  id={hpId}
                  type="text"
                  name="hp_confirm"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor={fullNameId} className="block text-xs font-medium text-[var(--color-chrome)] mb-1">
                  {siteCopy.modal.fields.fullName.label} *
                </label>
                <input
                  id={fullNameId}
                  type="text"
                  required
                  minLength={2}
                  maxLength={120}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={siteCopy.modal.fields.fullName.placeholder}
                  className="w-full rounded border border-white/20 bg-black/60 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-[var(--color-gold)] focus:outline-none"
                />
              </div>

              {/* Business Name */}
              <div>
                <label htmlFor={businessNameId} className="block text-xs font-medium text-[var(--color-chrome)] mb-1">
                  {siteCopy.modal.fields.businessName.label} *
                </label>
                <input
                  id={businessNameId}
                  type="text"
                  required
                  minLength={2}
                  maxLength={160}
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder={siteCopy.modal.fields.businessName.placeholder}
                  className="w-full rounded border border-white/20 bg-black/60 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-[var(--color-gold)] focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor={emailId} className="block text-xs font-medium text-[var(--color-chrome)] mb-1">
                  {siteCopy.modal.fields.email.label} *
                </label>
                <input
                  id={emailId}
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={siteCopy.modal.fields.email.placeholder}
                  className="w-full rounded border border-white/20 bg-black/60 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-[var(--color-gold)] focus:outline-none"
                />
              </div>

              {/* Website */}
              <div>
                <label htmlFor={websiteId} className="block text-xs font-medium text-[var(--color-chrome)] mb-1">
                  {siteCopy.modal.fields.website.label}
                </label>
                <input
                  id={websiteId}
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder={siteCopy.modal.fields.website.placeholder}
                  className="w-full rounded border border-white/20 bg-black/60 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-[var(--color-gold)] focus:outline-none"
                />
              </div>

              {/* Practice Area / Category */}
              <div>
                <label htmlFor={categoryId} className="block text-xs font-medium text-[var(--color-chrome)] mb-1">
                  {siteCopy.modal.fields.category.label}
                </label>
                <select
                  id={categoryId}
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category)}
                  className="w-full rounded border border-white/20 bg-black/80 px-3 py-2 text-sm text-white focus:border-[var(--color-gold)] focus:outline-none"
                >
                  {siteConfig.categories.map((catKey) => (
                    <option key={catKey} value={catKey} className="bg-black text-white">
                      {siteCopy.modal.fields.category.options[catKey] || catKey}
                    </option>
                  ))}
                </select>
              </div>

              {/* LinkedIn URL */}
              <div>
                <label htmlFor={linkedinUrlId} className="block text-xs font-medium text-[var(--color-chrome)] mb-1">
                  {siteCopy.modal.fields.linkedinUrl.label}
                </label>
                <input
                  id={linkedinUrlId}
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder={siteCopy.modal.fields.linkedinUrl.placeholder}
                  className="w-full rounded border border-white/20 bg-black/60 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-[var(--color-gold)] focus:outline-none"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  id={consentId}
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-white/30 bg-black text-[var(--color-gold)] focus:ring-[var(--color-gold)] cursor-pointer"
                />
                <label htmlFor={consentId} className="text-xs text-[var(--color-chrome)] leading-snug cursor-pointer">
                  {siteCopy.modal.fields.consent.label}
                </label>
              </div>

              {status === 'error' && (
                <div className="p-3 rounded border border-red-500/50 bg-red-950/30 text-xs text-red-200">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !consent}
                className="w-full py-3.5 rounded-lg font-semibold text-sm transition-all duration-150 border border-[var(--color-gold)] midas-glow-button text-black disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold)]"
              >
                {loading ? siteCopy.modal.submittingButton : siteCopy.modal.submitButton}
              </button>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
