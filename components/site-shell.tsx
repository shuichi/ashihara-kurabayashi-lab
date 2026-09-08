import { createContext, useContext, type ReactNode } from "react";
import { ArrowUpRight, Menu, Moon, Sun } from "lucide-react";
import { copy } from "@/app/content";
import { navigation } from "@/app/navigation";
import { pageHref, type Language, type PagePath } from "@/lib/navigation";
import type { PhotoAsset, PhotoId } from "@/app/photography";

export type Portrait = { src: string; webp: string; avif: string; width: number; height: number };
export type SiteProps = {
  language: Language;
  pathname: PagePath;
  base: string;
  portraits: Record<string, Portrait>;
  photos: Partial<Record<PhotoId, PhotoAsset>>;
  about?: ReactNode;
};
const SiteContext = createContext<SiteProps | null>(null);

/** This context only runs while Astro generates HTML; no React is hydrated. */
export function useSite() {
  const site = useContext(SiteContext);
  if (!site) throw new Error("Site content must be rendered inside SiteShell");
  return site;
}

export function SiteShell({ children, ...site }: SiteProps & { children: ReactNode }) {
  const { language, pathname, base } = site;
  const t = copy[language];
  const home = pageHref("/", language, base);
  const navLabel = language === "ja" ? "メインナビゲーション" : "Main navigation";
  const items = navigation[language].map((link) => (
    <a
      key={link.href}
      href={pageHref(link.href, language, base)}
      aria-current={pathname === link.href ? "page" : undefined}
    >
      {link.label}
    </a>
  ));
  return (
    <SiteContext.Provider value={site}>
      <div className={`lab-site ${language === "en" ? "is-english" : ""}`}>
        <a href="#main" className="skip-link">
          {t.skip}
        </a>
        <header className="site-header">
          <div className="header-inner">
            <a
              href={home}
              className="wordmark wordmark-with-symbol"
              aria-label={
                language === "ja" ? "芦原・倉林研究室 ホーム" : "Ashihara-Kurabayashi Lab. home"
              }
            >
              <img
                src={`${base.replace(/\/$/, "")}/favicon.svg`}
                className="wordmark-symbol"
                width={40}
                height={40}
                alt=""
              />
              <span className="wordmark-copy">
                <span className="wordmark-name" lang="ja">
                  芦原・倉林研究室
                </span>
                <span className="wordmark-translation" lang="en">
                  Ashihara-Kurabayashi Lab.
                </span>
              </span>
            </a>
            <div className="header-controls">
              <nav className="language-control" aria-label="Language / 言語">
                <a
                  href={pageHref(pathname, "ja", base)}
                  lang="ja"
                  hrefLang="ja"
                  data-language-link="ja"
                  aria-current={language === "ja" ? "true" : undefined}
                >
                  日本語
                </a>
                <a
                  href={pageHref(pathname, "en", base)}
                  lang="en"
                  hrefLang="en"
                  data-language-link="en"
                  aria-current={language === "en" ? "true" : undefined}
                >
                  EN
                </a>
              </nav>
              <button
                type="button"
                className="theme-control"
                data-theme-toggle=""
                aria-label={t.theme}
                aria-pressed="false"
                hidden
              >
                <Moon className="theme-moon" size={19} aria-hidden="true" />
                <Sun className="theme-sun" size={19} aria-hidden="true" />
              </button>
            </div>
          </div>
          <nav className="desktop-nav container" aria-label={navLabel}>
            {items}
          </nav>
          <details className="mobile-navigation" data-mobile-menu="">
            <summary>
              <Menu size={20} aria-hidden="true" />
              <span>{t.menu}</span>
            </summary>
            <nav className="mobile-nav-panel" aria-label={navLabel}>
              {items}
            </nav>
          </details>
        </header>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <footer className="site-footer">
          <div className="container footer-inner">
            <a href={home} className="wordmark">
              <span className="wordmark-name" lang="ja">
                芦原・倉林研究室
              </span>
              <span className="wordmark-translation" lang="en">
                Ashihara-Kurabayashi Lab.
              </span>
            </a>
            <nav
              className="footer-nav"
              aria-label={language === "ja" ? "フッターナビゲーション" : "Footer navigation"}
            >
              {items}
            </nav>
            <span className="copyright">
              © {new Date().getFullYear()} Ashihara-Kurabayashi Lab.
            </span>
            <a href="#main" className="back-top" aria-label={t.top}>
              <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </div>
        </footer>
      </div>
    </SiteContext.Provider>
  );
}
