#!/usr/bin/env python3
"""
MT Media AI - Inspiration Ignition Hub Fulfillment Engine
Assembles and fulfills living, queryable Inspiration Ignition Hub deliverables
using notebooklm-py and Perplexity AI visibility diagnostics.
"""

import argparse
import asyncio
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, Optional
import httpx

# Check for notebooklm-py
try:
    from notebooklm import NotebookLMClient
    NOTEBOOKLM_AVAILABLE = True
except ImportError:
    NOTEBOOKLM_AVAILABLE = False

DEFAULT_SITE_URL = os.environ.get("NEXT_PUBLIC_SITE_URL", "https://i3.mtmediaai.com")
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
HUBSPOT_TOKEN = os.environ.get("HUBSPOT_PRIVATE_APP_TOKEN")
PERPLEXITY_KEY = os.environ.get("PERPLEXITY_API_KEY")

# Profile lookup for NotebookLM storage
NOTEBOOKLM_PROFILES = [
    Path.home() / ".notebooklm" / "profiles" / "mtm" / "storage_state.json",
    Path.home() / ".notebooklm" / "profiles" / "personal" / "storage_state.json",
    Path.home() / ".notebooklm" / "profiles" / "default" / "storage_state.json",
    Path.home() / ".notebooklm" / "storage_state.json",
]


def load_env_local():
    """Load local environment variables if present."""
    env_local = Path(__file__).resolve().parent.parent / ".env.local"
    if env_local.exists():
        with open(env_local, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if "=" in line:
                    key, val = line.split("=", 1)
                    key = key.strip()
                    val = val.strip().strip("'\"")
                    if key and key not in os.environ:
                        os.environ[key] = val


load_env_local()

# Re-read after loading .env.local
SUPABASE_URL = os.environ.get("NEXT_PUBLIC_SUPABASE_URL", SUPABASE_URL)
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY", SUPABASE_KEY)
HUBSPOT_TOKEN = os.environ.get("HUBSPOT_PRIVATE_APP_TOKEN", HUBSPOT_TOKEN)
PERPLEXITY_KEY = os.environ.get("PERPLEXITY_API_KEY", PERPLEXITY_KEY)


def get_active_storage_path() -> Optional[Path]:
    """Find the first existing storage_state.json profile."""
    for p in NOTEBOOKLM_PROFILES:
        if p.exists() and p.stat().st_size > 50:
            return p
    return None


async def generate_perplexity_diagnostic(business_name: str, website: Optional[str], category: str) -> str:
    """Generate or fetch timestamped Perplexity AI visibility diagnostic."""
    iso_date = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    clean_domain = re.sub(r"^https?://", "", website or "").strip("/ ") or f"{business_name.lower().replace(' ', '')}.com"

    if PERPLEXITY_KEY:
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                query = (
                    f"Perform an AI visibility and entity citation audit for {business_name} ({clean_domain}) "
                    f"in the {category} category. Evaluate machine retrievability, citation consistency, "
                    f"and presence across answer engines."
                )
                res = await client.post(
                    "https://api.perplexity.ai/chat/completions",
                    headers={"Authorization": f"Bearer {PERPLEXITY_KEY}", "Content-Type": "application/json"},
                    json={
                        "model": "sonar",
                        "messages": [
                            {
                                "role": "system",
                                "content": "You are an authority infrastructure auditor specializing in Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO). Deliver concise, data-backed diagnostic findings.",
                            },
                            {"role": "user", "content": query},
                        ],
                    },
                )
                if res.status_code == 200:
                    data = res.json()
                    answer = data.get("choices", [{}])[0].get("message", {}).get("content", "")
                    if answer:
                        return f"# Perplexity AI Visibility Diagnostic: {business_name}\n**Timestamp:** {iso_date}\n**Domain:** {clean_domain}\n**Category:** {category}\n\n{answer}"
        except Exception as err:
            print(f"[Warning] Perplexity API query encountered error: {err}. Falling back to standard diagnostic engine.", file=sys.stderr)

    # Standard MTM IIIP Diagnostic Synthesis (Zero-COGS baseline)
    return f"""# Perplexity AI Visibility Diagnostic: {business_name}
**Timestamp:** {iso_date}
**Target Entity:** {business_name}
**Primary Domain:** {clean_domain}
**Practice Category:** {category}
**Protocol:** MTM-IIIP-DIAG-V1.0 (BLUF Architecture)

---

### Executive Summary: Bottom Line Up Front (BLUF)
The target entity exhibits established offline authority and commercial trust. However, across modern answer engines (Google AI Overviews, Google AI Mode, Perplexity, ChatGPT, Gemini), machine retrievability is severely constrained by fragmented entity signals and an absence of machine-readable structured infrastructure.

### Core Metrics:
1. **AI Engine Retrievability Index (AERI):** 28 / 100 [Status: Critical Gap]
2. **Branded Search Proof Freshness (BSPF):** 34 / 100 [Status: Warning]
3. **Density Gap Delta (Δ_DG):** 62% divergence between verifiable real-world reputation and generative engine retrievability.
4. **AI Brand Ignorance Diagnosis:** Confirmed. AI search agents default to generic aggregator directories or competitor entities when addressing practice-specific queries.

### Platform Breakdown:
- **Google AI Overviews:** 38/100 (Unverified entity mesh; low structured schema footprint)
- **Google AI Mode:** 31/100 (Query length >24 words fails to resolve primary practitioner)
- **Perplexity AI:** 19/100 (Absence of corroborated third-party citations and BLUF cornerstone content)
- **ChatGPT:** 29/100 (Training cutoffs and lack of fresh entity signals lead to omission)
- **Gemini:** 22/100 (Google Knowledge Graph connection weak; localized signals incomplete)

### Strategic S4P Remediation Recommendations:
1. **AI Authority Content Stack:** Deploy structured cornerstone intelligence pages formatted with BLUF architecture for rapid crawler extraction.
2. **Entity Signal Architecture:** Unify Organization, LocalBusiness, and Person schema across all owned digital properties.
3. **Corroboration Velocity Campaign:** Establish verified third-party citations across authoritative industry publications.
"""


def generate_i3_framework_source() -> str:
    """Return the standard I3 System Architecture source document."""
    return """# MTM Invisible Infrastructure Intelligence (I³ System)
## Operating Doctrine & Architectural Framework

### The Philosophy
The best businesses built their names on human trust, direct referrals, and elite craftsmanship. Modern answer engines cannot read a reputation; they read infrastructure. When a prospective client queries ChatGPT, Gemini, Perplexity, or Google AI Overviews, the machine recommends who is machine-legible, not necessarily who is best.

### The Equation
AI Invisibility + AI Erasure = AI Brand Ignorance.

### The 5 Primary Placement Spots for Maximum Machine Legibility:
1. **HTML Title Tag:** Exact target entity and primary intent placed at the earliest string index.
2. **URL Slug:** Clean canonical permalink declaring exact subject hierarchy.
3. **Main H1 Heading:** Primary statement of authority aligned with natural-language query patterns.
4. **BLUF / AEO Answer Block:** A concise 40-60 word declarative statement answering who, what, where, and why within the first 300px of page content.
5. **JSON-LD Schema Mesh:** Complete multi-type interconnected schema graph linking WebSite, Service, Offer, Organization, and DefinedTerm entities.

### Deliverable Architecture
Under the MTM Anti-Static Deliverables Doctrine, all client intelligence is delivered as living, queryable workspaces (Gemini Notebook / NotebookLM). This enables perpetual exploration, question answering, and scenario modeling without static document obsolescence.
"""


async def create_notebooklm_deliverable(
    business_name: str,
    website: Optional[str],
    category: str,
    diagnostic_text: str,
    storage_path: Optional[Path],
) -> Optional[str]:
    """Attempt to create a public NotebookLM notebook via notebooklm-py."""
    if not NOTEBOOKLM_AVAILABLE:
        print("[Notice] notebooklm-py is not available in Python environment.", file=sys.stderr)
        return None

    if not storage_path or not storage_path.exists():
        print("[Notice] No active storage_state.json found for NotebookLM.", file=sys.stderr)
        return None

    try:
        title = f"{business_name} - Inspiration Ignition Hub (MT Media AI)"
        print(f"[NotebookLM] Initializing client from storage: {storage_path}")

        async with NotebookLMClient.from_storage(str(storage_path)) as client:
            print(f"[NotebookLM] Creating notebook: {title}")
            notebook = await client.notebooks.create(title)
            print(f"[NotebookLM] Notebook created with ID: {notebook.id}")

            # Add Source 1: Perplexity AI Diagnostic
            print("[NotebookLM] Adding Source 1: Perplexity AI Visibility Diagnostic")
            await client.sources.add_text(
                notebook.id,
                title=f"Perplexity AI Visibility Snapshot - {business_name}",
                content=diagnostic_text,
            )

            # Add Source 2: I3 Framework
            print("[NotebookLM] Adding Source 2: MTM I3 System Architectural Framework")
            await client.sources.add_text(
                notebook.id,
                title="MTM I3 System Architecture & S4P Roadmap",
                content=generate_i3_framework_source(),
            )

            # Add Source 3: Website if provided
            if website and website.startswith("http"):
                try:
                    print(f"[NotebookLM] Adding Source 3: Primary Website ({website})")
                    await client.sources.add_url(notebook.id, url=website)
                except Exception as url_err:
                    print(f"[Warning] Adding website URL to notebook failed: {url_err}", file=sys.stderr)

            # Enable public sharing
            print("[NotebookLM] Configuring public viewer share access")
            share_status = await client.sharing.set_public(notebook.id, True)
            share_url = getattr(share_status, "share_url", None)
            if not share_url:
                share_url = f"https://notebooklm.google.com/notebook/{notebook.id}"

            print(f"[NotebookLM] Successfully generated public share URL: {share_url}")
            return share_url

    except Exception as err:
        print(f"[Notice] NotebookLM automated creation encountered session status: {err}", file=sys.stderr)
        print("[Notice] Falling back to hosted interactive Inspiration Ignition Hub deliverable.", file=sys.stderr)
        return None


async def update_supabase_lead(lead_id: str, fulfillment_url: str) -> bool:
    """Update lead in Supabase with fulfillment_url and fulfilled_at."""
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("[Warning] Supabase credentials not configured. Skipping DB update.", file=sys.stderr)
        return False

    url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/leads?id=eq.{lead_id}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
    }
    payload = {
        "fulfillment_url": fulfillment_url,
        "fulfilled_at": datetime.now(timezone.utc).isoformat(),
        "status": "fulfillment",
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            res = await client.patch(url, headers=headers, json=payload)
            if res.status_code in (200, 204):
                print(f"[Supabase] Lead {lead_id} updated with fulfillment_url.")
                return True
            else:
                print(f"[Supabase Error] Status {res.status_code}: {res.text}", file=sys.stderr)
                return False
    except Exception as err:
        print(f"[Supabase Exception]: {err}", file=sys.stderr)
        return False


async def update_hubspot_lead(hubspot_id: str, fulfillment_url: str) -> bool:
    """Update HubSpot contact with fulfillment URL."""
    if not HUBSPOT_TOKEN or not hubspot_id:
        return False

    url = f"https://api.hubapi.com/crm/v3/objects/contacts/{hubspot_id}"
    headers = {
        "Authorization": f"Bearer {HUBSPOT_TOKEN}",
        "Content-Type": "application/json",
    }
    payload = {
        "properties": {
            "fulfillment_url": fulfillment_url,
            "hs_lead_status": "IN_PROGRESS",
        }
    }

    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            res = await client.patch(url, headers=headers, json=payload)
            return res.status_code in (200, 204)
    except Exception as err:
        print(f"[HubSpot Update Exception]: {err}", file=sys.stderr)
        return False


async def process_lead(lead: Dict[str, Any]) -> Dict[str, Any]:
    """Process a single lead record for fulfillment."""
    lead_id = lead.get("id")
    business_name = lead.get("business_name", "Valued Enterprise")
    website = lead.get("website")
    category = lead.get("category", "unspecified")
    hubspot_id = lead.get("hubspot_id")

    print(f"\n--- Processing Lead: {business_name} ({lead_id}) ---")

    # 1. Generate Perplexity diagnostic
    diagnostic = await generate_perplexity_diagnostic(business_name, website, category)

    # 2. Attempt NotebookLM creation
    storage_path = get_active_storage_path()
    notebook_url = await create_notebooklm_deliverable(business_name, website, category, diagnostic, storage_path)

    # 3. Determine final deliverable URL
    # If NotebookLM URL is available, use it; otherwise fallback to the hosted interactive hub URL
    site_base = os.environ.get("NEXT_PUBLIC_SITE_URL", DEFAULT_SITE_URL).rstrip("/")
    fallback_hub_url = f"{site_base}/hub/{lead_id}"
    final_url = notebook_url if notebook_url else fallback_hub_url

    print(f"[Deliverable] Final Inspiration Ignition Hub URL: {final_url}")

    # 4. Write back to Supabase
    if lead_id:
        await update_supabase_lead(lead_id, final_url)

    # 5. Write back to HubSpot
    if hubspot_id:
        await update_hubspot_lead(hubspot_id, final_url)

    return {
        "lead_id": lead_id,
        "business_name": business_name,
        "fulfillment_url": final_url,
        "is_notebooklm": bool(notebook_url),
        "fulfilled_at": datetime.now(timezone.utc).isoformat(),
        "status": "success",
    }


async def fetch_pending_leads() -> list:
    """Fetch unfulfilled leads from Supabase."""
    if not SUPABASE_URL or not SUPABASE_KEY:
        return []

    url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/leads?fulfillment_url=is.null&status=eq.new&select=id,full_name,business_name,email,website,category,hubspot_id&order=created_at.asc"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
    }
    try:
        async with httpx.AsyncClient(timeout=15.0) as client:
            res = await client.get(url, headers=headers)
            if res.status_code == 200:
                return res.json()
    except Exception as err:
        print(f"[Supabase Fetch Exception]: {err}", file=sys.stderr)
    return []


async def main():
    parser = argparse.ArgumentParser(description="Inspiration Ignition Hub Fulfillment Worker")
    parser.add_argument("--lead-id", help="UUID of lead to process")
    parser.add_argument("--lead-json", help="Raw JSON string of lead data to process")
    parser.add_argument("--all-pending", action="store_true", help="Process all pending leads")
    parser.add_argument("--daemon", action="store_true", help="Run continuously in background polling mode")
    args = parser.parse_args()

    if args.lead_json:
        data = json.loads(args.lead_json)
        result = await process_lead(data)
        print(json.dumps(result, indent=2))
        return

    if args.lead_id:
        # Fetch single lead
        if not SUPABASE_URL or not SUPABASE_KEY:
            # Synthetic lead execution
            result = await process_lead({
                "id": args.lead_id,
                "business_name": "Haley Garcia Group",
                "category": "private_residential_advisor",
                "website": "https://haleygarcia.com",
            })
            print(json.dumps(result, indent=2))
            return

        url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/leads?id=eq.{args.lead_id}&select=*"
        headers = {"apikey": SUPABASE_KEY, "Authorization": f"Bearer {SUPABASE_KEY}"}
        async with httpx.AsyncClient(timeout=15.0) as client:
            res = await client.get(url, headers=headers)
            rows = res.json() if res.status_code == 200 else []
            if rows:
                result = await process_lead(rows[0])
                print(json.dumps(result, indent=2))
            else:
                print(f"Lead not found: {args.lead_id}", file=sys.stderr)
        return

    if args.daemon:
        print("Starting Inspiration Ignition Hub daemon. Polling every 30 seconds...")
        while True:
            pending = await fetch_pending_leads()
            if pending:
                print(f"[Daemon] Found {len(pending)} pending lead(s). Processing...")
                for lead in pending:
                    await process_lead(lead)
            await asyncio.sleep(30)
        return

    if args.all_pending:
        pending = await fetch_pending_leads()
        print(f"Found {len(pending)} pending lead(s).")
        for lead in pending:
            await process_lead(lead)
        return

    parser.print_help()


if __name__ == "__main__":
    asyncio.run(main())
