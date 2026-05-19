"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/(auth)/actions";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";

interface NavItem {
  href: string;
  label: string;
  isActive: (pathname: string) => boolean;
}

const NAV: NavItem[] = [
  {
    href: "/gallery",
    label: "Gallery",
    isActive: (p) => p === "/gallery" || p.startsWith("/item"),
  },
  {
    href: "/pairwise",
    label: "Compare",
    isActive: (p) => p.startsWith("/pairwise"),
  },
  { href: "/basket", label: "Basket", isActive: (p) => p.startsWith("/basket") },
  {
    href: "/creator",
    label: "Creator",
    isActive: (p) => p.startsWith("/creator"),
  },
];

export function TopBar() {
  const pathname = usePathname() ?? "/gallery";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg-elev">
      <div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between gap-8 px-5 lg:px-8">
        <div className="flex items-center gap-9">
          <Link
            href="/gallery"
            className="h-display h-it text-[22px] leading-none text-ink lg:text-[26px]"
          >
            Nichetack
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => {
              const active = item.isActive(pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-16 items-center border-b-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
                    active
                      ? "border-accent text-ink"
                      : "border-transparent text-ink-3 hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link
            href="/capture"
            className="btn hidden gap-1.5 px-4 py-2.5 text-[13px] lg:inline-flex"
          >
            <Icon name="plus" size={15} sw={2} />
            Capture
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="icon-btn"
              aria-label="Sign out"
              title="Sign out"
            >
              <Icon name="signout" size={16} />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
