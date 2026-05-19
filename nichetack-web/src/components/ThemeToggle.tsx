"use client";

import { cn } from "@/lib/cn";
import { THEME_META, THEMES } from "@/lib/theme";
import { useTheme } from "./use-theme";

/* Persistent three-way theme switch. Lives in the top bar, applies
   instantly to every surface, and persists via localStorage. */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className="flex items-center gap-0.5 rounded-full border border-line bg-bg p-[3px]"
    >
      {THEMES.map((value) => {
        const meta = THEME_META[value];
        const on = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={on}
            title={meta.tagline}
            onClick={() => setTheme(value)}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2 py-1.5 transition-colors lg:px-2.5",
              on ? "bg-ink text-bg" : "text-ink-3 hover:text-ink",
            )}
          >
            <span
              aria-hidden
              className="size-2 rounded-full ring-1 ring-black/10"
              style={{ background: meta.accent }}
            />
            <span className="hidden font-mono text-[10px] font-medium uppercase tracking-[0.1em] lg:inline">
              {meta.label}
            </span>
            <span className="sr-only">{meta.label}</span>
          </button>
        );
      })}
    </div>
  );
}
