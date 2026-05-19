/* Nichetack theme system — three OKLCH variable sets, switched via the
   `data-theme` attribute on <html>. Pure constants only, so this module
   is safe to import from both server and client components. */

export type Theme = "linen" | "atelier" | "olive";

export const THEMES: Theme[] = ["linen", "atelier", "olive"];

export const DEFAULT_THEME: Theme = "linen";

export const THEME_STORAGE_KEY = "nichetack-theme";

export interface ThemeInfo {
  label: string;
  tagline: string;
  /** representative surface + accent swatch for the toggle */
  bg: string;
  accent: string;
}

export const THEME_META: Record<Theme, ThemeInfo> = {
  linen: {
    label: "Linen",
    tagline: "Warm cream + terracotta",
    bg: "oklch(0.965 0.012 75)",
    accent: "oklch(0.62 0.12 38)",
  },
  atelier: {
    label: "Atelier",
    tagline: "Graphite + faded coral",
    bg: "oklch(0.235 0.008 250)",
    accent: "oklch(0.72 0.11 35)",
  },
  olive: {
    label: "Olive",
    tagline: "Sage + plum",
    bg: "oklch(0.94 0.018 110)",
    accent: "oklch(0.5 0.12 310)",
  },
};

export function isTheme(value: unknown): value is Theme {
  return value === "linen" || value === "atelier" || value === "olive";
}

/* Runs before first paint so the stored theme is applied with no flash of
   the default. Kept tiny and dependency-free — it is inlined into the page. */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="linen"||t==="atelier"||t==="olive"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`;
