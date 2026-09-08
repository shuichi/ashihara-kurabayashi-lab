import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const pages = ["", "research/", "people/", "publications/", "students/", "access/", "contact/"];
for (const language of ["", "en/"])
  for (const path of pages) {
    test(`static page ${language}${path || "home"}`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      const response = await page.goto(language + path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", language ? "en" : "ja");
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main")).toBeVisible();
      expect((await page.locator("main").innerText()).length).toBeGreaterThan(200);
      const reload = await page.reload();
      expect(reload?.status()).toBe(200);
      for (const image of await page.locator("img").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            image.evaluate(
              (element: HTMLImageElement) => element.complete && element.naturalWidth > 0,
            ),
          )
          .toBe(true);
      }
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(axe.violations).toEqual([]);
      expect(errors).toEqual([]);
    });
  }

test("all content, mobile navigation, and FAQ work without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  for (const language of ["", "en/"])
    for (const path of pages) {
      expect((await page.goto(baseURL! + language + path))?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      expect((await page.locator("main").innerText()).length).toBeGreaterThan(200);
    }
  await page.goto(baseURL! + "students/");
  const second = page.locator(".faq-item").nth(1);
  await second.locator("summary").click();
  await expect(second.locator(".faq-answer")).toBeVisible();
  await page.locator(".mobile-navigation summary").click();
  await expect(page.locator(".mobile-nav-panel")).toBeVisible();
  await page.locator(".mobile-nav-panel a").filter({ hasText: "教員紹介" }).click();
  await expect(page).toHaveURL(/\/people\/$/);
  await page.locator('[data-language-link="en"]').click();
  await expect(page).toHaveURL(/\/en\/people\/$/);
  await context.close();
});

test("news links and the early visit enquiry work in both languages without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  for (const language of ["", "en/"]) {
    await page.goto(baseURL! + language);
    await expect(page.locator("#news .news-list > li")).toHaveCount(3);
    await expect(
      page.locator('#news a[href="https://www.cygames.co.jp/news/id-24983/"]'),
    ).toBeVisible();
    await expect(
      page.locator('#news a[href="https://doi.org/10.11517/jjsai.41.5_582"]'),
    ).toBeVisible();
    const dates = await page
      .locator("#news time")
      .evaluateAll((elements) => elements.map((element) => element.getAttribute("datetime")));
    expect(dates).toEqual(["2026-09-04", "2026-09-01", "2026-04-01"]);
    await page.goto(baseURL! + language + "students/");
    const enquiry = page.locator(".visit-callout .primary-link");
    await expect(enquiry).toBeInViewport();
    await enquiry.click();
    await expect(page).toHaveURL(baseURL! + language + "contact/");
  }
  await context.close();
});

test("old URLs, anchors, language links, history, and real 404 responses", async ({
  page,
  baseURL,
}) => {
  await page.goto("#/publications#year-2026");
  await expect(page).toHaveURL(baseURL! + "publications/#year-2026");
  await expect(page.locator("#year-2026")).toBeFocused();
  await page.locator('[data-language-link="en"]').click();
  await expect(page).toHaveURL(baseURL! + "en/publications/#year-2026");
  await page.goBack();
  await expect(page).toHaveURL(baseURL! + "publications/#year-2026");
  const missing = await page.goto("missing-page/");
  expect(missing?.status()).toBe(404);
  await expect(page.locator("h1")).toContainText("ページが見つかりません");
  await page.goto("#/missing-page");
  await expect(page).toHaveURL(baseURL! + "not-found/");
});

test("keyboard menu, skip link, theme persistence, and dark contrast", async ({
  page,
  browserName,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("");
  // WebKit on macOS uses Option-Tab to include links in keyboard navigation.
  await page.keyboard.press(
    browserName === "webkit" && process.platform === "darwin" ? "Alt+Tab" : "Tab",
  );
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  const menu = page.locator(".mobile-navigation");
  await menu.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(menu).toHaveAttribute("open", "");
  await page.keyboard.press(
    browserName === "webkit" && process.platform === "darwin" ? "Alt+Tab" : "Tab",
  );
  await page.keyboard.press("Escape");
  await expect(menu).not.toHaveAttribute("open", "");
  await expect(menu.locator("summary")).toBeFocused();
  await page.locator("[data-theme-toggle]").click();
  await page.reload();
  await expect(page.locator("[data-theme-toggle]")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("html")).toHaveClass("dark");
  for (const path of pages) {
    await page.goto(path);
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(axe.violations).toEqual([]);
  }
});

test("a delayed fragment event does not steal focus from the mobile menu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("");
  await page.evaluate(async () => {
    const changed = new Promise<void>((resolve) =>
      window.addEventListener("hashchange", () => resolve(), { once: true }),
    );
    location.hash = "main";
    document.querySelector<HTMLElement>(".mobile-navigation summary")!.focus();
    await changed;
  });
  await expect(page.locator(".mobile-navigation summary")).toBeFocused();
});

test("motion can pause and respects reduced motion and offscreen visibility", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("");
  await expect(page.locator("[data-motion-toggle]")).toBeHidden();
  expect(await page.locator("svg animate").count()).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator(".hero").scrollIntoViewIfNeeded();
  const button = page.locator("[data-motion-toggle]");
  await expect(button).toBeVisible();
  await button.click();
  await expect(button).toHaveAttribute("aria-pressed", "true");
  expect(
    await page
      .locator("[data-knowledge-field]")
      .evaluate((svg: SVGSVGElement) => svg.animationsPaused()),
  ).toBe(true);
  await button.click();
  await page.locator(".site-footer").scrollIntoViewIfNeeded();
  await expect(page.locator(".hero")).toHaveClass(/is-paused/);
});

test("embeds make no third-party requests until requested and can be closed", async ({ page }) => {
  const external: string[] = [];
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:4322")) external.push(request.url());
  });
  // Test the integration without contacting or submitting to Google.
  await page.route("https://**/*", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<html lang="en"><title>External service test</title><body>External service</body></html>',
    }),
  );
  for (const path of ["access/", "contact/"]) {
    external.length = 0;
    await page.goto(path);
    expect(external).toEqual([]);
    await expect(page.locator("iframe")).toHaveCount(0);
    await page.locator("[data-embed-src]").click();
    await expect(page.locator("iframe")).toHaveCount(1);
    await expect.poll(() => external.length).toBeGreaterThan(0);
    await page.getByRole("button", { name: "埋め込みを閉じる" }).click();
    await expect(page.locator("iframe")).toHaveCount(0);
    await expect(page.locator("[data-embed-src]")).toBeFocused();
  }
});

test("small widths and enlarged text do not create horizontal overflow", async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const language of ["", "en/"])
      for (const path of pages) {
        await page.goto(language + path);
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
          `${language}${path} at ${width}`,
        ).toBe(true);
      }
  }
  await page.setViewportSize({ width: 640, height: 900 });
  for (const language of ["", "en/"])
    for (const path of pages) {
      await page.goto(language + path);
      await page.addStyleTag({ content: "html { font-size: 200% !important; }" });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
        path,
      ).toBe(true);
    }
});
