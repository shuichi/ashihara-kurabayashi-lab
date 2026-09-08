import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
import { load } from "cheerio";
import { site, base, indexable } from "../config/site.mjs";
import { languages, pagePaths, pageHref } from "../lib/navigation.ts";
const directory = process.env.BUILD_DIR || "dist";
const prefix = base === "/" ? "" : base;
const bibliography = JSON.parse(fs.readFileSync("content/publications.json", "utf8"));
const documents = new Map();
const read = (file) => fs.readFileSync(path.join(directory, file));
function localFile(url) {
  assert.ok(url.pathname.startsWith(prefix + "/"), `URL escapes SITE_BASE: ${url}`);
  const relative = decodeURIComponent(url.pathname.slice(prefix.length + 1));
  assert.ok(!relative.split("/").includes(".."), "Invalid relative path");
  return relative.endsWith("/") || !relative ? relative + "index.html" : relative;
}
function document(file) {
  if (!documents.has(file)) documents.set(file, load(read(file).toString()));
  return documents.get(file);
}
const budgets = { maxJavaScriptGzip: 0, maxCssGzip: 0 };
for (const language of languages)
  for (const pathname of pagePaths) {
    const url = new URL(pageHref(pathname, language, base), site);
    const relative = localFile(url);
    const $ = document(relative);
    assert.equal($("html").attr("lang"), language, relative);
    assert.equal($("h1").length, 1, relative);
    assert.ok($("main").text().length > 200, `Missing static content: ${relative}`);
    assert.equal($('link[rel="canonical"]').attr("href"), url.href);
    assert.equal(
      $('meta[name="robots"]').attr("content"),
      indexable ? "index, follow" : "noindex, follow",
    );
    for (const alternate of [...languages, "x-default"]) {
      assert.equal(
        $(`link[hreflang="${alternate}"]`).attr("href"),
        new URL(pageHref(pathname, alternate === "en" ? "en" : "ja", base), site).href,
      );
    }
    assert.equal($('meta[property="og:url"]').attr("content"), url.href);
    assert.equal($('meta[property="og:title"]').attr("content"), $("title").text());
    assert.ok($('meta[name="description"]').attr("content")?.length > 10);
    assert.equal(
      $('meta[property="og:image"]').attr("content"),
      new URL(`${prefix}/social.png`, site).href,
    );
    assert.equal($("astro-island, iframe").length, 0, "No hydration or unsolicited embeds");
    assert.ok(JSON.parse($('script[type="application/ld+json"]').text()).name);
    if (pathname === "/publications") {
      assert.equal($(".publication-entry").length, bibliography.length);
      for (const paper of bibliography) {
        const entry = $(`[id="${paper.id}"]`);
        assert.ok(entry.text().includes(paper.title), `Missing publication: ${paper.id}`);
        assert.ok(entry.text().includes(paper.authors));
        assert.ok(entry.text().includes(paper.venue));
        if (paper.url) assert.equal(entry.find("h3 a").attr("href"), paper.url);
      }
    }
    const ids = $("[id]")
      .map((_, element) => $(element).attr("id"))
      .get();
    assert.equal(ids.length, new Set(ids).size, `Duplicate IDs in ${relative}`);
    for (const element of $("[href], [src], [srcset]").toArray()) {
      const tag = $(element);
      const values = [
        tag.attr("href"),
        tag.attr("src"),
        ...(tag
          .attr("srcset")
          ?.split(",")
          .map((value) => value.trim().split(/\s+/)[0]) || []),
      ].filter(Boolean);
      for (const value of values) {
        const target = new URL(value, url);
        if (target.origin !== new URL(site).origin) continue;
        const file = localFile(target);
        assert.ok(
          fs.existsSync(path.join(directory, file)),
          `Broken local URL: ${relative} -> ${value}`,
        );
        if (target.hash && file.endsWith(".html"))
          assert.ok(
            document(file)(`[id="${decodeURIComponent(target.hash.slice(1))}"]`).length,
            `Missing anchor: ${value}`,
          );
      }
    }
    let jsGzip = 0;
    for (const element of $('script:not([type="application/ld+json"])').toArray()) {
      const script = $(element);
      const data = script.attr("src")
        ? read(localFile(new URL(script.attr("src"), url)))
        : Buffer.from(script.html() || "");
      jsGzip += gzipSync(data).byteLength;
    }
    const cssGzip = $('link[rel="stylesheet"]')
      .toArray()
      .reduce(
        (sum, element) =>
          sum + gzipSync(read(localFile(new URL($(element).attr("href"), url)))).byteLength,
        0,
      );
    budgets.maxJavaScriptGzip = Math.max(budgets.maxJavaScriptGzip, jsGzip);
    budgets.maxCssGzip = Math.max(budgets.maxCssGzip, cssGzip);
    assert.ok(jsGzip <= 8 * 1024, `JavaScript exceeds 8 KiB gzip: ${relative}`);
    assert.ok(cssGzip <= 12 * 1024, `CSS exceeds 12 KiB gzip: ${relative}`);
  }
const sitemap = load(read("sitemap.xml").toString(), { xml: true });
assert.equal(sitemap("url").length, 14);
for (const language of languages)
  for (const pathname of pagePaths)
    assert.ok(
      sitemap("loc")
        .toArray()
        .some(
          (element) =>
            sitemap(element).text() === new URL(pageHref(pathname, language, base), site).href,
        ),
    );
const notFound = document("404.html");
assert.ok(notFound('meta[name="robots"]').attr("content").startsWith("noindex"));
assert.equal(notFound('link[rel="canonical"]').length, 0);
assert.ok(read("social.png").byteLength > 1000);
assert.ok(fs.existsSync(path.join(directory, ".nojekyll")));
console.log(
  "Verified 14 static pages, all local links and anchors, bibliography, SEO, 404, and asset budgets:",
  budgets,
);
