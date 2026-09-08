// Build-time settings only; no runtime server or credentials.
export const site = process.env.SITE_URL || "https://shuichi.github.io";
export const base = `/${(process.env.SITE_BASE ?? "ashihara-kurabayashi-lab").replace(/^\/+|\/+$/g, "")}`;
export const indexable = process.env.SITE_INDEXABLE !== "false";
const origin = new URL(site);
if (
  !["https:", "http:"].includes(origin.protocol) ||
  origin.username ||
  origin.password ||
  origin.pathname !== "/" ||
  origin.search ||
  origin.hash
) {
  throw new Error(
    "SITE_URL must be an origin, e.g. https://shuichi.github.io. Use SITE_BASE for its path.",
  );
}
if (!/^\/(?:[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*)?$/.test(base))
  throw new Error("Invalid SITE_BASE path");
