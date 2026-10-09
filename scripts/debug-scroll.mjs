import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const points = [
    { name: '00_hero', scrollY: 0 },
    { name: '01_curb_appeal', scrollY: 600 },
    { name: '02_interior_sanctuary', scrollY: 1200 },
    { name: '03_outdoor_oasis', scrollY: 1800 },
    { name: '04_motor_court', scrollY: 2400 },
    { name: '05_intake_console', scrollY: 3000 },
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
