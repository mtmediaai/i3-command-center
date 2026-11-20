"""
verify_driving_hud_experience.py
Verifies the end-to-end scrollytelling experience on http://localhost:3000 via Playwright:
- Hero section with large H2 & HID H1
- Estate canvas smooth transitions
- Cockpit HUD Stage 1 (Evidentiary Audit)
- Cockpit HUD Stage 2 (4 Vulnerabilities Carousel)
- Cockpit HUD Stage 3 (Ignition Deliverables)
- Cockpit HUD Stage 4 (The Kingdom Arrival Lower-Left Lockup)
- Standalone FAQ & Dynasty Footer
"""

import time
from pathlib import Path
from playwright.sync_api import sync_playwright

ARTIFACTS_DIR = Path(r"C:\Users\kcjd6\.gemini\antigravity\brain\63ce5366-7861-4eb6-88dc-acc746b249e0")

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1920, "height": 1080})
        
        print("[1/6] Navigating to http://localhost:3000...")
        page.goto("http://localhost:3000", wait_until="networkidle")
        time.sleep(1.5)
        
        # 1. Capture Hero Section (Movement 0)
        hero_shot = ARTIFACTS_DIR / "audit_01_hero_estate.png"
        page.screenshot(path=str(hero_shot))
        print(f"Captured: {hero_shot.name}")

        driving_top = page.evaluate("""() => {
            const el = document.querySelectorAll('div[style*="480vh"]')[0];
            return el ? el.offsetTop : 4435;
        }""")
        print(f"Driving canvas offsetTop: {driving_top}px")

        # Scroll to Stage 1: ~16% into driving canvas (Evidentiary Audit)
        page.evaluate(f"window.scrollTo(0, {driving_top} + window.innerHeight * 0.65)")
        time.sleep(1.2)
        stage1_shot = ARTIFACTS_DIR / "audit_02_driving_hud_stage1_evidence.png"
        page.screenshot(path=str(stage1_shot))
        print(f"Captured: {stage1_shot.name}")

        # Scroll to Stage 2: ~40% into driving canvas (Carousel)
        page.evaluate(f"window.scrollTo(0, {driving_top} + window.innerHeight * 1.55)")
        time.sleep(1.2)
        stage2_shot = ARTIFACTS_DIR / "audit_03_driving_hud_stage2_carousel.png"
        page.screenshot(path=str(stage2_shot))
        print(f"Captured: {stage2_shot.name}")

        # Scroll to Stage 3: ~68% into driving canvas (Ignition Deliverables)
        page.evaluate(f"window.scrollTo(0, {driving_top} + window.innerHeight * 2.55)")
        time.sleep(1.2)
        stage3_shot = ARTIFACTS_DIR / "audit_04_driving_hud_stage3_deliverables.png"
        page.screenshot(path=str(stage3_shot))
        print(f"Captured: {stage3_shot.name}")

        # Scroll to Stage 4: ~92% into driving canvas (The Kingdom Arrival Lockup)
        page.evaluate(f"window.scrollTo(0, {driving_top} + window.innerHeight * 3.50)")
        time.sleep(1.2)
        stage4_shot = ARTIFACTS_DIR / "audit_05_driving_hud_stage4_kingdom_arrival.png"
        page.screenshot(path=str(stage4_shot))
        print(f"Captured: {stage4_shot.name}")

        # Scroll to FAQ Header
        page.evaluate("document.getElementById('faq').scrollIntoView()")
        time.sleep(1.2)
        faq_shot = ARTIFACTS_DIR / "audit_06_faq_section.png"
        page.screenshot(path=str(faq_shot))
        print(f"Captured: {faq_shot.name}")

        # Scroll to Footer
        page.evaluate("window.scrollTo(0, document.documentElement.scrollHeight - window.innerHeight)")
        time.sleep(1.2)
        footer_shot = ARTIFACTS_DIR / "audit_07_footer.png"
        page.screenshot(path=str(footer_shot))
        print(f"Captured: {footer_shot.name}")

        browser.close()
        print("Playwright audit complete!")

if __name__ == "__main__":
    run()
