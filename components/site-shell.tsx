'use client';

import { PageLink } from '@/components/page-link';
import { createContext, useContext, useEffect, useState } from 'react';
import { usePageLocation } from './spa-router';
import { ArrowRight, ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { copy, type Language } from '@/app/content';
import { navigation } from '@/app/navigation';

const SiteContext = createContext<{ language: Language } | null>(null);

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used inside SiteShell');
  return context;
}

function readPreference(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() =>
    readPreference('ak-language') === 'en' ? 'en' : 'ja',
  );
  const [dark, setDark] = useState(() => readPreference('ak-theme') === 'dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, anchor } = usePageLocation();
  const menuLocation = `${language}:${pathname}#${anchor}`;
  const [previousMenuLocation, setPreviousMenuLocation] =
    useState(menuLocation);
  const t = copy[language];
  const links = navigation[language];

  if (previousMenuLocation !== menuLocation) {
    setPreviousMenuLocation(menuLocation);
    setMenuOpen(false);
  }

  useEffect(() => {
    document.documentElement.lang = language;
    const prefix =
      pathname === '/'
        ? ''
        : navigation[language].find((link) => link.href === pathname)?.label;
    const title =
      language === 'ja'
        ? '芦原・倉林研究室 | 東京理科大学'
        : 'Ashihara-Kurabayashi Lab. | Tokyo University of Science';
    document.title = prefix ? `${prefix} | ${title}` : title;
    const description = document.querySelector('meta[name="description"]');
    const page = navigation[language].find((link) => link.href === pathname);
    if (description && page) {
      description.setAttribute('content', page.description);
    }
  }, [language, pathname]);

  function changeLanguage(values: unknown[]) {
    const next = values[0];
    if (next !== 'ja' && next !== 'en') return;
    setLanguage(next);
    try {
      localStorage.setItem('ak-language', next);
    } catch {
      /* Keep the session choice. */
    }
  }

  function changeTheme(checked: boolean) {
    setDark(checked);
    document.documentElement.classList.toggle('dark', checked);
    try {
      localStorage.setItem('ak-theme', checked ? 'dark' : 'light');
    } catch {
      /* Keep the session choice. */
    }
  }

  return (
    <SiteContext.Provider value={{ language }}>
      <div className={`lab-site ${language === 'en' ? 'is-english' : ''}`}>
        <PageLink href="#main" className="skip-link">
          {t.skip}
        </PageLink>
        <header className="site-header">
          <Collapsible open={menuOpen} onOpenChange={setMenuOpen}>
            <div className="header-inner">
              <PageLink
                href="/"
                className="wordmark"
                aria-label={
                  language === 'ja'
                    ? '芦原・倉林研究室 ホーム'
                    : 'Ashihara-Kurabayashi Lab. home'
                }
              >
                <span lang="ja">芦原・倉林研究室</span>
                <span lang="en">Ashihara-Kurabayashi Lab.</span>
              </PageLink>
              <div className="header-controls">
                <ToggleGroup
                  value={[language]}
                  onValueChange={changeLanguage}
                  multiple={false}
                  spacing={0}
                  className="language-control"
                  aria-label="Language / 言語"
                >
                  <ToggleGroupItem value="ja" aria-label="日本語" lang="ja">
                    JP
                  </ToggleGroupItem>
                  <ToggleGroupItem value="en" aria-label="English" lang="en">
                    EN
                  </ToggleGroupItem>
                </ToggleGroup>
                <span className="control-divider" />
                <div className="theme-control">
                  {dark ? (
                    <Moon size={16} aria-hidden="true" />
                  ) : (
                    <Sun size={16} aria-hidden="true" />
                  )}
                  <Switch
                    checked={dark}
                    onCheckedChange={changeTheme}
                    aria-label={t.theme}
                    size="sm"
                  />
                </div>
                <CollapsibleTrigger className="mobile-menu-button">
                  {menuOpen ? (
                    <X size={20} aria-hidden="true" />
                  ) : (
                    <Menu size={20} aria-hidden="true" />
                  )}
                  <span>{t.menu}</span>
                </CollapsibleTrigger>
              </div>
            </div>
            <nav
              className="desktop-nav container"
              aria-label={
                language === 'ja' ? 'メインナビゲーション' : 'Main navigation'
              }
            >
              {links.map((link) => (
                <PageLink
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </PageLink>
              ))}
            </nav>
            <CollapsibleContent className="mobile-nav-panel">
              <nav
                aria-label={
                  language === 'ja'
                    ? 'モバイルナビゲーション'
                    : 'Mobile navigation'
                }
              >
                {links.map((link) => (
                  <PageLink
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    {link.label}
                    <ArrowRight size={18} />
                  </PageLink>
                ))}
              </nav>
            </CollapsibleContent>
          </Collapsible>
        </header>
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <footer className="site-footer">
          <div className="container footer-inner">
            <PageLink href="/" className="wordmark">
              <span lang="ja">芦原・倉林研究室</span>
              <span lang="en">Ashihara-Kurabayashi Lab.</span>
            </PageLink>
            <nav
              className="footer-nav"
              aria-label={
                language === 'ja'
                  ? 'フッターナビゲーション'
                  : 'Footer navigation'
              }
            >
              {links.map((link) => (
                <PageLink
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </PageLink>
              ))}
            </nav>
            <span className="copyright">
              © {new Date().getFullYear()} Ashihara-Kurabayashi Lab.
            </span>
            <PageLink href="#main" className="back-top" aria-label={t.top}>
              <ArrowUpRight size={20} />
            </PageLink>
          </div>
        </footer>
      </div>
    </SiteContext.Provider>
  );
}
