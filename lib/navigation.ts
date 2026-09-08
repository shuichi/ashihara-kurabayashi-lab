export const languages = ["ja", "en"] as const;
export type Language = (typeof languages)[number];
export const pagePaths = [
  "/",
  "/research",
  "/people",
  "/publications",
  "/students",
  "/access",
  "/contact",
] as const;
export type PagePath = (typeof pagePaths)[number];

export function basePath(base: string) {
  const segment = base.replace(/^\/+|\/+$/g, "");
  return segment ? `/${segment}/` : "/";
}

/** Ordinary links include the Pages repository base and the language prefix. */
export function pageHref(href: string, language: Language, base: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const [path, ...anchors] = href.split("#");
  const segment = path.replace(/^\/+|\/+$/g, "");
  return `${basePath(base)}${language === "en" ? "en/" : ""}${segment ? `${segment}/` : ""}${anchors.length ? `#${anchors.join("#")}` : ""}`;
}

export function legacyHref(hash: string, language: Language, base: string): string | null {
  if (!hash.startsWith("#/")) return null;
  // Some old links percent-encoded the second # as %23.
  const value = hash.slice(1).replace(/%23/i, "#");
  const separator = value.indexOf("#");
  const path = (separator < 0 ? value : value.slice(0, separator)).replace(/\/+$/, "") || "/";
  if (!pagePaths.includes(path as PagePath)) return `${basePath(base)}not-found/`;
  const rawAnchor = separator < 0 ? "" : value.slice(separator + 1);
  let anchor = rawAnchor;
  try {
    anchor = decodeURIComponent(rawAnchor);
  } catch {
    /* Preserve malformed bookmarks safely. */
  }
  return pageHref(path, language, base) + (anchor ? `#${encodeURIComponent(anchor)}` : "");
}
