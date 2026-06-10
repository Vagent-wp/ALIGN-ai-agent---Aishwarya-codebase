import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/** Fixed marketing navbar (h-16) + breathing room */
export const HASH_SCROLL_OFFSET = 88;

export function scrollToSectionId(id: string, offset = HASH_SCROLL_OFFSET) {
  const attempt = (tries: number) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
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
  const { pagePath, scrollOffset = HASH_SCROLL_OFFSET } = options;
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
      scrollToSectionId(id, scrollOffset);
    },
    [scrollOffset],
  );

  return { activeId, setActiveId, selectSection };
}
