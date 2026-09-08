import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { parsePageHash, type PageLocation } from '@/lib/spa-navigation';

const PageLocationContext = createContext<PageLocation | null>(null);

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
}

function getSnapshot() {
  return window.location.hash;
}

export function scrollToPage(hash: string) {
  const { anchor } = parsePageHash(hash);
  const target =
    (anchor ? document.getElementById(anchor) : null) ??
    document.getElementById('main');
  if (!target) return;
  // Make the updated content reachable immediately for keyboard users.
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  if (anchor && target.id === anchor) {
    target.scrollIntoView();
  } else {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

export function SpaRouter({ children }: { children: ReactNode }) {
  const hash = useSyncExternalStore(subscribe, getSnapshot, () => '');

  useEffect(() => {
    // The destination view must be mounted before resolving its section ID.
    const frame = requestAnimationFrame(() => scrollToPage(hash));
    return () => cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <PageLocationContext.Provider value={parsePageHash(hash)}>
      {children}
    </PageLocationContext.Provider>
  );
}

export function usePageLocation() {
  const location = useContext(PageLocationContext);
  if (!location)
    throw new Error('usePageLocation must be used inside SpaRouter');
  return location;
}
