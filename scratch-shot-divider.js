const { chromium } = require("@playwright/test");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 500, height: 900 } });

  await page.addInitScript(() => {
    window.localStorage.setItem("wedding-access-granted", "true");
  });

  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

  await page.locator("#ubicacion").scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await page.screenshot({ path: "divider-location-dresscode.png" });

  await page.locator("#vestimenta").scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await page.screenshot({ path: "divider-dresscode-gallery.png" });

  await browser.close();
})();
