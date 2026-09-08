export const pagePaths = [
  '/',
  '/research',
  '/people',
  '/publications',
  '/students',
  '/access',
  '/contact',
] as const;

export type PagePath = (typeof pagePaths)[number];
export type PageLocation = { pathname: PagePath; anchor: string };

function decodeAnchor(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function parsePageHash(hash: string): PageLocation {
  const value = hash.replace(/^#/, '');
  // Keep old home-section bookmarks such as #about usable.
  if (!value.startsWith('/')) {
    return { pathname: '/', anchor: decodeAnchor(value) };
  }

  const separator = value.indexOf('#');
  const path = separator < 0 ? value : value.slice(0, separator);
  const pathname = path.replace(/\/+$/, '') || '/';
  if (!pagePaths.includes(pathname as PagePath)) {
    return { pathname: '/', anchor: '' };
  }
  return {
    pathname: pathname as PagePath,
    anchor: separator < 0 ? '' : decodeAnchor(value.slice(separator + 1)),
  };
}

export function pageHref(href: string, pathname: PagePath): string {
  if (href.startsWith('#/')) return href;
  if (href.startsWith('#')) return `#${pathname}${href}`;
  if (href.startsWith('/') && !href.startsWith('//')) return `#${href}`;
  return href;
}
