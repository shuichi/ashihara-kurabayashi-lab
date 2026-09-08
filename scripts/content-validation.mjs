import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pagePaths } from "../lib/navigation.ts";
export const collections = [
  "home",
  "research",
  "people",
  "publications",
  "students",
  "common",
  "pages",
  "navigation",
];
export function readContent(root = "content") {
  const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
  return {
    about: Object.fromEntries(
      ["ja", "en"].map((language) => [
        language,
        fs.readFileSync(path.join(root, `about/${language}.md`), "utf8"),
      ]),
    ),
    bibliography: read("publications.json"),
    localized: Object.fromEntries(
      collections.map((name) => [
        name,
        { ja: read(`${name}/ja.json`), en: read(`${name}/en.json`) },
      ]),
    ),
  };
}
export function validateContent({ bibliography, localized, about }) {
  const errors = [];
  for (const language of ["ja", "en"]) {
    const markdown = about?.[language] || "";
    const sections = markdown.split(/^---\s*$/m);
    if (
      sections.length !== 3 ||
      !sections[1].includes(`language: ${language}`) ||
      !sections[2].trim()
    )
      errors.push(`Missing or invalid Markdown translation: ${language}`);
  }
  const ids = new Set();
  for (const paper of bibliography) {
    if (ids.has(paper.id)) errors.push(`Duplicate publication ID: ${paper.id}`);
    ids.add(paper.id);
  }
  function compare(a, b, at) {
    if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
      errors.push(`Translation shape mismatch: ${at}`);
      return;
    }
    if (Array.isArray(a)) {
      if (a.length !== b.length) errors.push(`Translation count mismatch: ${at}`);
      a.forEach((value, index) => compare(value, b[index], `${at}[${index}]`));
    } else if (a && typeof a === "object") {
      if (JSON.stringify(Object.keys(a).sort()) !== JSON.stringify(Object.keys(b).sort()))
        errors.push(`Translation keys mismatch: ${at}`);
      Object.keys(a).forEach((key) => compare(a[key], b[key], `${at}.${key}`));
    } else if (typeof a === "string" && (!a.trim() || !b.trim()))
      errors.push(`Empty translated text: ${at}`);
  }
  for (const [name, values] of Object.entries(localized)) compare(values.ja, values.en, name);
  for (const language of ["ja", "en"]) {
    const routes = localized.navigation[language].links.map((link) => link.href);
    if (routes.length !== pagePaths.length || pagePaths.some((route) => !routes.includes(route)))
      errors.push(`Navigation must list each page once: ${language}`);
    for (const project of localized.research[language].projects)
      for (const id of project.publications)
        if (!ids.has(id)) errors.push(`Missing publication reference: ${project.name} -> ${id}`);
    const people = localized.people[language].people.map((person) => person.email);
    if (new Set(people).size !== people.length) errors.push(`Duplicate faculty email: ${language}`);
  }
  const references = (lang) =>
    localized.research[lang].projects.map((project) => [project.name, project.publications]);
  if (JSON.stringify(references("ja")) !== JSON.stringify(references("en")))
    errors.push("Project references differ between languages");
  if (errors.length) throw new Error(errors.join("\n"));
  return { publications: bibliography.length, collections: Object.keys(localized).length };
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log("Content validated:", validateContent(readContent()));
}
