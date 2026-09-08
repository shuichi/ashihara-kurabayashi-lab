import assert from "node:assert/strict";
import test from "node:test";
import { readContent, validateContent } from "../scripts/content-validation.mjs";
test("localized content and bibliography remain internally consistent", () =>
  assert.ok(validateContent(readContent()).publications > 0));
test("duplicate IDs fail before the collection loader can overwrite a record", () => {
  const data = readContent();
  data.bibliography.push(structuredClone(data.bibliography[0]));
  assert.throws(() => validateContent(data), /Duplicate publication ID/);
});
test("dangling publication references fail the build", () => {
  const data = readContent();
  data.localized.research.ja.projects[0].publications = ["publication-missing"];
  assert.throws(() => validateContent(data), /Missing publication reference/);
});
test("missing translations and empty strings are detected", () => {
  const data = readContent();
  delete data.localized.home.en.intro;
  assert.throws(() => validateContent(data), /Translation/);
  const empty = readContent();
  empty.localized.home.en.intro = "";
  assert.throws(() => validateContent(empty), /Empty translated text/);
});

test("both Markdown introductions must be present and nonempty", () => {
  const data = readContent();
  data.about.en = "";
  assert.throws(() => validateContent(data), /Markdown translation/);
});
