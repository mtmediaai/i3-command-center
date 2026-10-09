import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const points = [
    { name: '00_hero', scrollY: 100 },
    { name: '01_grand_entryway', scrollY: 600 },
    { name: '02_outdoor_oasis', scrollY: 1100 },
    { name: '03_motor_court', scrollY: 1500 },
    { name: '04_foyer_hero_shot', scrollY: 1900 },
    { name: '05_intake_console', scrollY: 2300 },
    { name: '06_evidentiary_audit', scrollY: 3300 },
    { name: '07_pain_points_carousel', scrollY: 3950 },
    { name: '08_deliverables_hub', scrollY: 4600 },
    { name: '09_founders_want_to_know', scrollY: 5200 },
    { name: '10_footer', scrollY: 5800 },
  ];

  for (const pt of points) {
    await page.evaluate((y) => window.scrollTo(0, y), pt.scrollY);
    await page.waitForTimeout(400);
    const info = await page.evaluate(() => {
      const c = document.querySelector('canvas');
      const r = c ? c.getBoundingClientRect() : null;
      // Get visible texts
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, p'))
        .filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top >= 0 && rect.bottom <= window.innerHeight;
        })
        .map((el) => el.textContent?.trim().slice(0, 50));
      return { canvasTop: r?.top, scrollY: window.scrollY, visibleHeadings: headings };
    });
    console.log(`Point ${pt.name} (scrollY: ${pt.scrollY}):`, info);
    await page.screenshot({ path: `scratch/screen_${pt.name}.png` });
  }

  await browser.close();
}

run().catch(console.error);
