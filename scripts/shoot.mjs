// Headless screenshots of the running dev server using the system Chrome.
import puppeteer from "puppeteer-core";

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const URL = "http://localhost:5173/";

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--hide-scrollbars"],
});

const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (m) => {
  if (m.type() === "error") errors.push("console: " + m.text());
});

// Desktop full-page
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1200)); // let entrance anims settle
await page.screenshot({ path: "scripts/shot-desktop-top.png" });
await page.screenshot({ path: "scripts/shot-desktop-full.png", fullPage: true });

// Mobile
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.goto(URL, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 1000));
await page.screenshot({ path: "scripts/shot-mobile-full.png", fullPage: true });

await browser.close();
console.log("PAGE ERRORS:", errors.length ? errors.join("\n") : "none");
console.log("screenshots written to scripts/");
