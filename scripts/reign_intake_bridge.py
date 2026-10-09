#!/usr/bin/env python3
"""
MT Media AI - Reign Intake Bridge for i3 Command Center
Universal Orchestrator: Axiom | IDE Maestro: Circuit 10.0
Department: Reign (Chief Revenue Architect / CRA)
Protocols: MTM-HAAS-V1.0 / SEAL 3.5

Safely ingests verified i3 territory intake submissions directly into
Reign's Sovereign Vault (reign_sales.db) and logs telemetry sync events.
"""

import sys
import json
import sqlite3
from pathlib import Path
from datetime import datetime, timezone, timedelta

CST = timezone(timedelta(hours=-5))
BASE_DIR = Path(r"C:\MOS")
DB_PATH = BASE_DIR / "command" / "reign_sales.db"

def ingest_lead(data: dict) -> dict:
    if not DB_PATH.exists():
        return {"ok": False, "error": f"Database not found at {DB_PATH}"}
    
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    now_iso = datetime.now(CST).isoformat()
    
    company_name = data.get("companyName", "Anonymous Firm")
    work_email = data.get("workEmail", "")
    zip_code = data.get("zipCode", "")
    craft_vector = data.get("craftVector", "OTHER")
    craft_other = data.get("craftOtherSpecification", "")
    craft_label = data.get("craftLabel", craft_vector)
    tif_score = float(data.get("score", 75.0))
    tier = data.get("tier", "WAITING_LIST")
    is_draft_pick = bool(data.get("isDraftPick", False))
    hubspot_contact_id = data.get("hubspotContactId")
    hubspot_deal_id = data.get("hubspotDealId")
    
    mtm_tier = "Draft Pick" if is_draft_pick else ("Lux" if tier == "WAITING_LIST" else "Hold")
    lead_status = "HOLD" if tier == "HOLD" else "WAITING_LIST"
    notes = f"TIF v1.0 Score: {tif_score}/100. Craft: {craft_label} ({craft_vector}). Other: {craft_other or 'N/A'}. Tier: {tier}."
    
    try:
        # Check existing contact by email
        c.execute("SELECT id FROM contacts WHERE email = ?", (work_email,))
        existing = c.fetchone()
        
        if existing:
            contact_id = existing["id"]
            c.execute("""
            UPDATE contacts
            SET company_name = ?, territory_zip = ?, icp_category = ?, mtm_tier = ?, dvi_score = ?, lead_status = ?, notes = ?, updated_at = ?, hubspot_id = COALESCE(?, hubspot_id)
            WHERE id = ?
            """, (
                company_name, zip_code, craft_label, mtm_tier, tif_score, lead_status, notes, now_iso, hubspot_contact_id, contact_id
            ))
        else:
            c.execute("""
            INSERT INTO contacts
            (hubspot_id, first_name, last_name, email, company_name, territory_zip, icp_category, mtm_tier, dvi_score, lead_status, notes, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                hubspot_contact_id,
                "Principal",
                company_name,
                work_email,
                company_name,
                zip_code,
                craft_label,
                mtm_tier,
                tif_score,
                lead_status,
                notes,
                now_iso,
                now_iso
            ))
            contact_id = c.lastrowid
        
        deal_id = None
        if tier != "HOLD":
            deal_name = f"{company_name} - Territory Snapshot ({zip_code})"
            probability = 0.85 if is_draft_pick else 0.70
            
            c.execute("SELECT id FROM deals WHERE contact_id = ?", (contact_id,))
            existing_deal = c.fetchone()
            
            if existing_deal:
                deal_id = existing_deal["id"]
                c.execute("""
                UPDATE deals
                SET deal_name = ?, probability = ?, updated_at = ?, hubspot_id = COALESCE(?, hubspot_id)
                WHERE id = ?
                """, (deal_name, probability, now_iso, hubspot_deal_id, deal_id))
            else:
                c.execute("""
                INSERT INTO deals
                (hubspot_id, deal_name, contact_id, pipeline_stage, amount, probability, close_date, abcde_status, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """, (
                    hubspot_deal_id,
                    deal_name,
                    contact_id,
                    "lux_snapshot",
                    0.0,
                    probability,
                    (datetime.now(CST) + timedelta(days=30)).isoformat(),
                    "CLEAN",
                    now_iso,
                    now_iso
                ))
                deal_id = c.lastrowid
        
        # Log sync event in Sovereign Vault
        c.execute("""
        INSERT INTO sync_events (sync_type, status, records_affected, details, timestamp)
        VALUES (?, ?, ?, ?, ?)
        """, (
            "I3_TERRITORY_INTAKE",
            "SUCCESS",
            1,
            f"Ingested {company_name} ({zip_code}) into Sovereign Vault. Tier: {tier}. Draft Pick: {is_draft_pick}.",
            now_iso
        ))
        
        conn.commit()
        conn.close()
        
        return {
            "ok": True,
            "contact_id": contact_id,
            "deal_id": deal_id,
            "tier": tier,
            "is_draft_pick": is_draft_pick
        }
    except Exception as e:
        conn.close()
        return {"ok": False, "error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) > 1:
        raw_payload = sys.argv[1]
    else:
        raw_payload = sys.stdin.read()
    
    try:
        payload = json.loads(raw_payload)
        result = ingest_lead(payload)
        print(json.dumps(result))
    except Exception as ex:
        print(json.dumps({"ok": False, "error": str(ex)}))
