# MTM I³ Command Center: Phase 0.5 Implementation Audit
**Document ID:** MTM-AUDIT-I3-2026-001
**Auditor:** MTM I3 Build & Implementation Auditor
**Reviewer:** Moolah, CFO
**Date:** 2026-09-12
**Base SHA Inspected:** ffbf3751208504fdd0155a634d38a6dd46fa9879
**Tracked Files:** 29

---

## 1. Truth Boundary Verification Ledger

| Item / Claim | Reported Status | Inspected Code / Path | Verification Result | Evidence / Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Commit SHA** | ffbf3751208504fdd0155a634d38a6dd46fa9879 | Git HEAD | **PASS** | `git rev-parse HEAD` outputs exact SHA. |
| **Tracked Files Count** | Exactly 29 files | `git ls-files` | **PASS** | Count is exactly 29 tracked files. |
| **Carousel Deduplication** | 1 carousel claimed | `app/page.tsx` | **FAIL** | Hero contains `<SocialProofCarousel />`, but Section 2 (`#old-way`) renders a duplicate 4-card static stat pack. Requires complete deduplication and replacement with Method section. |
| **Preferred Sources Gated** | Gated off (`false`) | `config/site.config.ts`, `components/preferred-sources.tsx` | **PASS** | `preferredSourcesEnabled: false`. Component returns `null`. No UI or destination emitted. |
| **Rate Limiting (IP)** | 5 req / 10 min / IP | `app/api/leads/route.ts` | **PASS** | In-memory sliding window limiter configured for 5 requests per 600,000ms window. |
| **Rate Limit Response** | 429 + Retry-After 600 | `app/api/leads/route.ts` | **PASS** | Returns HTTP 429 with `Retry-After: 600` and `{ error: 'RATE_LIMITED' }`. |
| **Payload Size Cap** | Under 16KB | `app/api/leads/route.ts` | **PASS** | Evaluates `content-length` > 16,384 and checks actual parsed string length; returns 413. |
| **Honeypot & Speed Trap** | Bots trapped (<3s) | `lib/validation.ts` | **PASS** | Traps hidden `hp_confirm` field and rejects submissions where `now - rendered_at < 3000`. |
| **CVE-2026-72587 Headers** | Private, no-store | `app/api/leads/route.ts` | **PASS** | Emits `Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate` on all lead responses. |
| **gate:instatic** | Clean (0 references) | `scripts/gate-instatic.mjs` | **PASS** | Scans app, components, lib, config, content, scripts, package.json. 0 occurrences. |
| **no-slop gate** | Clean (0 jargon) | `scripts/no-slop-check.mjs` | **PASS** | Scans all TS/TSX files. 0 banned terms. |
| **TypeScript Strict** | No errors | `npm run typecheck` | **PASS** | `tsc --noEmit` exits with code 0. |
| **Science Squad Probes** | All pass | `scripts/test-probes.mjs` | **PASS** | 12/12 probes pass cleanly. |
| **Production Build** | Successful | `npm run build` | **PASS** | Next.js 15.5.25 generates 7 static routes and dynamic API route in 6.2s. |

---

## 2. Identified Deficiencies for Phase B Remediation

1. **Carousel / Stat Duplication**:
   - Hero renders `<SocialProofCarousel />` with 5 items.
   - Section 2 renders duplicate stat pack with 4 cards.
   - Remedy: Retain exactly one carousel under hero CTAs. Replace lower stat pack with static method and evidence matrix.
2. **Evidence Auditing**:
   - The 58% AI Overview stat lacks verified primary publisher URL and methodology. Must be removed from carousel.
   - Master Equation was framed alongside empirical studies. Must be explicitly demarcated as an MTM working model.
   - HubSpot traffic decline must explicitly note third-party Semrush estimates via Search Engine Land.
3. **Copy Alignment with AGO Dominator**:
   - Current copy is Phase B staged copy but lacks the AGO Dominator question-led H1, visible fast answer table in the first 300px, explicit I3 method breakdown, decision framework, and visible FAQs.
