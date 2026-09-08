import type { ComponentPropsWithoutRef } from 'react';
import { pageHref } from '@/lib/spa-navigation';
import { scrollToPage, usePageLocation } from './spa-router';

/** Native hash links retain history, keyboard, and open-in-new-tab behavior. */
export function PageLink({
  href,
  onClick,
  children,
  ...props
}: ComponentPropsWithoutRef<'a'>) {
  const { pathname } = usePageLocation();
  const resolvedHref =
    href === undefined ? undefined : pageHref(href, pathname);
  return (
    <a
      {...props}
      href={resolvedHref}
      onClick={(event) => {
        onClick?.(event);
        // A repeated hash does not emit hashchange; still scroll to its target.
        if (
          !event.defaultPrevented &&
          event.button === 0 &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey &&
          !event.altKey &&
          (!props.target || props.target === '_self') &&
          props.download === undefined &&
          resolvedHref?.startsWith('#') &&
          resolvedHref === window.location.hash
        ) {
          event.preventDefault();
          scrollToPage(resolvedHref);
        }
      }}
    >
      {children}
    </a>
  );
}
