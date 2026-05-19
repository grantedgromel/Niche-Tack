"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

interface Tab {
  href: string;
  label: string;
  icon: IconName;
  isActive: (pathname: string) => boolean;
}

const TABS: Tab[] = [
  {
    href: "/gallery",
    label: "Gallery",
    icon: "layers",
    isActive: (p) => p === "/gallery" || p.startsWith("/item"),
  },
  {
    href: "/pairwise",
    label: "Compare",
    icon: "swap",
    isActive: (p) => p.startsWith("/pairwise"),
  },
  {
    href: "/capture",
    label: "Capture",
    icon: "plus",
    isActive: (p) => p.startsWith("/capture"),
  },
  {
    href: "/basket",
    label: "Basket",
    icon: "basket",
    isActive: (p) => p.startsWith("/basket"),
  },
  {
    href: "/creator",
    label: "Creator",
    icon: "bookmark",
    isActive: (p) => p.startsWith("/creator"),
  },
];

/* Floating mobile tab bar. Hidden on desktop (the top bar carries nav
   there) and during the focused detail / capture flows. */
export function BottomNav() {
  const pathname = usePathname() ?? "/gallery";

  if (pathname.startsWith("/item") || pathname.startsWith("/capture")) {
    return null;
  }

  return (
    <nav className="fixed inset-x-4 bottom-4 z-40 lg:hidden" aria-label="Primary">
      <div
        className="flex items-center justify-between rounded-full border border-line px-2 py-2"
        style={{
          background: "color-mix(in oklch, var(--bg-elev) 92%, transparent)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow: "var(--shadow-lift)",
        }}
      >
        {TABS.map((tab) => {
          const active = tab.isActive(pathname);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-label={tab.label}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex size-11 items-center justify-center rounded-full transition-colors",
                active ? "bg-ink text-bg" : "text-ink-3",
              )}
            >
              <Icon name={tab.icon} size={20} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
