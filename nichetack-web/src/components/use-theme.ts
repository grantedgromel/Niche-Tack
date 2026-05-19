"use client";

import { useCallback, useSyncExternalStore } from "react";
import {
  DEFAULT_THEME,
  isTheme,
  THEME_STORAGE_KEY,
  type Theme,
} from "@/lib/theme";

/* The `data-theme` attribute on <html> is the single source of truth.
   useSyncExternalStore reads it directly — no provider, no mount-time
   setState, and no hydration mismatch (the server snapshot is the
   default, the client re-reads whatever the init script applied). */

const listeners = new Set<() => void>();

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot(): Theme {
  const applied = document.documentElement.getAttribute("data-theme");
  return isTheme(applied) ? applied : DEFAULT_THEME;
}

function getServerSnapshot(): Theme {
  return DEFAULT_THEME;
}

export interface UseThemeResult {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export function useTheme(): UseThemeResult {
  const theme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setTheme = useCallback((next: Theme) => {
    // Apply synchronously so the switch lands on every surface instantly.
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage disabled — theme still applies for the session */
    }
    for (const listener of listeners) listener();
  }, []);

  return { theme, setTheme };
}
