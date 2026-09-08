import assert from "node:assert/strict";
import test from "node:test";
import { languages, pagePaths, pageHref, legacyHref } from "../lib/navigation.ts";
test("every page and language works at repository and origin roots", () => {
  for (const base of ["/", "/lab/", "/lab"])
    for (const language of languages)
      for (const page of pagePaths) {
        const href = pageHref(page, language, base);
        const prefix = base === "/" ? "/" : "/lab/";
        assert.equal(
          href,
          prefix + (language === "en" ? "en/" : "") + (page === "/" ? "" : page.slice(1) + "/"),
        );
        assert.equal(pageHref(`${page}#main`, language, base), `${href}#main`);
      }
});
test("old bookmarks preserve destinations, encoded anchors, and safe failures", () => {
  assert.equal(legacyHref("#/research#projects", "ja", "/lab"), "/lab/research/#projects");
  assert.equal(legacyHref("#/publications#year-2026", "en", "/"), "/en/publications/#year-2026");
  assert.equal(legacyHref("#/%23about", "ja", "/lab/"), "/lab/#about");
  assert.equal(legacyHref("#/people#%E6%95%99%E5%93%A1", "ja", "/"), "/people/#%E6%95%99%E5%93%A1");
  assert.equal(legacyHref("#/people#%invalid", "ja", "/"), "/people/#%25invalid");
  assert.equal(legacyHref("#/missing", "ja", "/lab"), "/lab/not-found/");
  assert.equal(legacyHref("#//example.com", "ja", "/lab"), "/lab/not-found/");
  assert.equal(legacyHref("#about", "ja", "/lab"), null);
});
test("native fragments and external resources are left intact", () => {
  for (const href of [
    "#main",
    "https://doi.org/example",
    "mailto:lab@example.com",
    "//example.com/file",
    "./file.pdf",
  ])
    assert.equal(pageHref(href, "en", "/lab"), href);
});
