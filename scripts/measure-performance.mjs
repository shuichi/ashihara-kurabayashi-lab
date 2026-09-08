// Repeatable local lab measurement. This does not estimate field INP or guarantee Core Web Vitals.
import fs from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";
import { chromium } from "@playwright/test";
import { createStaticServer } from "./serve-static.mjs";
import { base } from "../config/site.mjs";
const runs = Number(process.env.PERFORMANCE_RUNS || 3);
if (!Number.isInteger(runs) || runs < 1 || runs > 10)
  throw new Error("PERFORMANCE_RUNS must be 1–10");
const targets = [{ name: "current", directory: "dist" }];
if (process.env.BASELINE_DIST)
  targets.unshift({ name: "baseline", directory: process.env.BASELINE_DIST });
const browser = await chromium.launch();
const report = {
  measuredAt: new Date().toISOString(),
  browser: browser.version(),
  conditions: {
    viewport: "390×844",
    deviceScaleFactor: 3,
    cpuSlowdown: 4,
    downloadMbps: 1.6,
    uploadMbps: 0.75,
    latencyMs: 150,
    cache: "cold context per run",
    observation: "2 seconds after load",
    runs,
  },
  note: "Local Chromium lab measurements; not field Core Web Vitals, INP, or a Lighthouse score.",
  results: [],
};
try {
  for (const target of targets) {
    const server = createStaticServer({ directory: target.directory });
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const url = `http://127.0.0.1:${server.address().port}${base === "/" ? "/" : base + "/"}`;
    const samples = [];
    try {
      for (let run = 0; run < runs; run++) {
        const context = await browser.newContext({
          viewport: { width: 390, height: 844 },
          deviceScaleFactor: 3,
          isMobile: true,
          hasTouch: true,
          reducedMotion: "no-preference",
        });
        try {
          const page = await context.newPage();
          const cdp = await context.newCDPSession(page);
          await cdp.send("Network.enable");
          await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
          await cdp.send("Network.emulateNetworkConditions", {
            offline: false,
            latency: 150,
            downloadThroughput: (1.6 * 1024 * 1024) / 8,
            uploadThroughput: (0.75 * 1024 * 1024) / 8,
          });
          await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
          await page.addInitScript(() => {
            const metrics = (window.__labMetrics = { lcpMs: 0, cls: 0, longTaskMs: 0 });
            let session = { start: 0, last: 0, value: 0 };
            new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) metrics.lcpMs = entry.startTime;
            }).observe({ type: "largest-contentful-paint", buffered: true });
            new PerformanceObserver((list) => {
              for (const entry of list.getEntries())
                if (!entry.hadRecentInput) {
                  if (
                    entry.startTime - session.last > 1000 ||
                    entry.startTime - session.start > 5000
                  )
                    session = { start: entry.startTime, last: entry.startTime, value: 0 };
                  session.last = entry.startTime;
                  session.value += entry.value;
                  metrics.cls = Math.max(metrics.cls, session.value);
                }
            }).observe({ type: "layout-shift", buffered: true });
            new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) metrics.longTaskMs += entry.duration;
            }).observe({ type: "longtask", buffered: true });
          });
          await page.goto(url, { waitUntil: "load" });
          await page.locator("main h1").waitFor();
          await page.waitForTimeout(2000);
          const sample = await page.evaluate(() => ({
            ...window.__labMetrics,
            fcpMs: performance.getEntriesByName("first-contentful-paint")[0]?.startTime || 0,
            resources: performance.getEntriesByType("resource").map((entry) => ({
              name: new URL(entry.name).pathname,
              type: entry.initiatorType,
              encodedBytes: entry.encodedBodySize,
            })),
            inlineScripts: [
              ...document.querySelectorAll('script:not([src]):not([type="application/ld+json"])'),
            ].map((script) => script.textContent),
          }));
          sample.inlineJavaScriptGzipBytes = sample.inlineScripts.reduce(
            (sum, script) => sum + gzipSync(script).byteLength,
            0,
          );
          delete sample.inlineScripts;
          for (const key of ["lcpMs", "fcpMs", "longTaskMs"]) sample[key] = Math.round(sample[key]);
          sample.cls = Number(sample.cls.toFixed(4));
          samples.push(sample);
          console.log(
            `${target.name} ${run + 1}/${runs}: LCP ${sample.lcpMs} ms, CLS ${sample.cls}, long tasks ${sample.longTaskMs} ms`,
          );
        } finally {
          await context.close();
        }
      }
    } finally {
      await new Promise((resolve) => server.close(resolve));
    }
    const median = (key) =>
      [...samples].sort((a, b) => a[key] - b[key])[Math.floor(samples.length / 2)][key];
    report.results.push({
      target: target.name,
      median: Object.fromEntries(
        ["lcpMs", "fcpMs", "cls", "longTaskMs", "inlineJavaScriptGzipBytes"].map((key) => [
          key,
          median(key),
        ]),
      ),
      samples,
    });
  }
} finally {
  await browser.close();
}
const output = process.env.PERFORMANCE_REPORT || "test-results/performance.json";
await fs.mkdir(path.dirname(output), { recursive: true });
await fs.writeFile(output, JSON.stringify(report, null, 2) + "\n");
console.log(`Performance report: ${output}`);
