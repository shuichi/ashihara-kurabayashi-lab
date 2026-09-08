import { legacyHref, type Language } from "../../lib/navigation";
const language = document.documentElement.lang as Language;
const base = document.documentElement.dataset.siteBase || "/";
function redirectLegacyUrl() {
  const destination = legacyHref(location.hash, language, base);
  if (destination) location.replace(destination);
}
redirectLegacyUrl();
window.addEventListener("hashchange", redirectLegacyUrl);

const theme = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
if (theme) {
  const sync = () =>
    theme.setAttribute("aria-pressed", String(document.documentElement.classList.contains("dark")));
  sync();
  theme.hidden = false;
  theme.addEventListener("click", () => {
    const dark = document.documentElement.classList.toggle("dark");
    sync();
    try {
      localStorage.setItem("ak-theme", dark ? "dark" : "light");
    } catch {
      /* The current page still works. */
    }
  });
}

const menu = document.querySelector<HTMLDetailsElement>("[data-mobile-menu]");
if (menu) {
  const summary = menu.querySelector("summary");
  menu.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      menu.open = false;
      summary?.focus();
    }
  });
  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      menu.open = false;
    }),
  );
  document.addEventListener("click", (event) => {
    if (event.target instanceof Node && !menu.contains(event.target)) menu.open = false;
  });
}

function updateLanguageLinks() {
  document.querySelectorAll<HTMLAnchorElement>("[data-language-link]").forEach((link) => {
    const url = new URL(link.href);
    url.hash = location.hash.startsWith("#/") ? "" : location.hash;
    link.href = url.href;
  });
}
updateLanguageLinks();
window.addEventListener("hashchange", updateLanguageLinks);

// Native fragment links still work without JavaScript; focus is an enhancement.
function focusAnchor() {
  if (!location.hash || location.hash.startsWith("#/")) return;
  let id: string;
  try {
    id = decodeURIComponent(location.hash.slice(1));
  } catch {
    return;
  }
  const target = document.getElementById(id);
  if (!target) return;
  // Native focus already handles targets such as the skip link's main element.
  // A later hashchange must not steal focus from the next keyboard action.
  if (target.hasAttribute("tabindex")) return;
  target.tabIndex = -1;
  target.focus({ preventScroll: true });
}
window.addEventListener("hashchange", focusAnchor);
focusAnchor();

// External services are loaded only after an explicit click, with a native link fallback.
document.querySelectorAll<HTMLButtonElement>("[data-embed-src]").forEach((button) => {
  button.hidden = false;
  button.addEventListener("click", () => {
    const container = button.closest<HTMLElement>("[data-embed]");
    if (!container || !button.dataset.embedSrc) return;
    const frame = document.createElement("iframe");
    frame.src = button.dataset.embedSrc;
    frame.title = button.dataset.embedTitle || "";
    frame.width = "800";
    frame.height = button.dataset.embedHeight || "540";
    frame.referrerPolicy = "strict-origin-when-cross-origin";
    const close = document.createElement("button");
    close.type = "button";
    close.className = "text-link";
    close.textContent = language === "ja" ? "埋め込みを閉じる" : "Close embedded content";
    const placeholder = container.querySelector<HTMLElement>("[data-embed-placeholder]")!;
    placeholder.hidden = true;
    container.append(close, frame);
    close.addEventListener("click", () => {
      frame.remove();
      close.remove();
      placeholder.hidden = false;
      button.focus();
    });
    close.focus();
  });
});
