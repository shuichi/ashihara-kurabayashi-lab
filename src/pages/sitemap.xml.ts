import type { APIRoute } from "astro";
import { languages, pagePaths, pageHref } from "../../lib/navigation";
export const GET: APIRoute = ({ site }) => {
  const url = (path: string, language: "ja" | "en") =>
    new URL(pageHref(path, language, import.meta.env.BASE_URL), site).href;
  const entries = languages.flatMap((language) =>
    pagePaths.map(
      (path) =>
        `<url><loc>${url(path, language)}</loc>${languages.map((lang) => `<xhtml:link rel="alternate" hreflang="${lang}" href="${url(path, lang)}"/>`).join("")}<xhtml:link rel="alternate" hreflang="x-default" href="${url(path, "ja")}"/></url>`,
    ),
  );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
