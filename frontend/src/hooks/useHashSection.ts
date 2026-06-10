import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/** Fixed marketing navbar (h-16) + breathing room */
export const HASH_SCROLL_OFFSET = 88;

type ScrollToSectionOptions = {
  force?: boolean;
  behavior?: ScrollBehavior;
};

export function scrollToSectionId(
  id: string,
  offset = HASH_SCROLL_OFFSET,
  options: ScrollToSectionOptions = {},
) {
  const { force = false, behavior = 'smooth' } = options;

  const attempt = (tries: number) => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const targetTop = rect.top + window.scrollY - offset;
      const alreadyVisible =
        rect.top >= offset - 16 &&
        rect.top <= offset + 32 &&
        rect.bottom <= window.innerHeight + 24;

      if (!force && alreadyVisible) return;

      window.scrollTo({ top: Math.max(0, targetTop), behavior });
      return;
    }
    if (tries < 20) {
      window.setTimeout(() => attempt(tries + 1), 50);
    }
  };

  requestAnimationFrame(() => requestAnimationFrame(() => attempt(0)));
}

type UseHashSectionOptions = {
  /** Only react to hash when pathname matches (e.g. `/services`) */
  pagePath?: string;
  scrollOffset?: number;
  /** Scroll when the user picks a tab in-page. Default true. */
  scrollOnSelect?: boolean;
};

/**
 * Syncs tab/section state with URL hash and scrolls the target into view.
 * Works for mega-menu links like `/services#ai-agents` on first visit and re-clicks.
 */
export function useHashSection(
  validIds: readonly string[],
  defaultId: string,
  options: UseHashSectionOptions = {},
) {
  const { pagePath, scrollOffset = HASH_SCROLL_OFFSET, scrollOnSelect = true } = options;
  const location = useLocation();

  const resolveHash = useCallback(
    (hash: string) => {
      const id = hash.replace(/^#/, '');
      return validIds.includes(id) ? id : null;
    },
    [validIds],
  );

  const [activeId, setActiveId] = useState(() => {
    if (pagePath && location.pathname !== pagePath) return defaultId;
    return resolveHash(location.hash) ?? defaultId;
  });

  useEffect(() => {
    if (pagePath && location.pathname !== pagePath) return;

    const id = resolveHash(location.hash);
    if (!id) return;

    setActiveId(id);
    scrollToSectionId(id, scrollOffset);
  }, [location.pathname, location.hash, pagePath, resolveHash, scrollOffset]);

  const selectSection = useCallback(
    (id: string, hashPath: string) => {
      setActiveId(id);
      window.history.replaceState(null, '', `${hashPath}#${id}`);
      if (scrollOnSelect) {
        scrollToSectionId(id, scrollOffset);
      }
    },
    [scrollOffset, scrollOnSelect],
  );

  return { activeId, setActiveId, selectSection };
}
