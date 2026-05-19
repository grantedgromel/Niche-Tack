"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Tile } from "@/components/Tile";
import { cn } from "@/lib/cn";
import { type Item, type ItemState } from "@/lib/data";

type Filter = "all" | ItemState;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "wishlist", label: "Wishlist" },
  { key: "active", label: "Considering" },
  { key: "purchased", label: "Purchased" },
  { key: "archived", label: "Archived" },
];

function matchesQuery(item: Item, q: string): boolean {
  if (!q) return true;
  const needle = q.toLowerCase();
  return (
    item.title.toLowerCase().includes(needle) ||
    item.source.toLowerCase().includes(needle) ||
    (item.tags ?? []).some((tag) => tag.toLowerCase().includes(needle))
  );
}

export function GalleryClient({ items }: { items: Item[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo<Record<Filter, number>>(() => {
    const c: Record<Filter, number> = {
      all: items.length,
      wishlist: 0,
      active: 0,
      purchased: 0,
      archived: 0,
    };
    for (const item of items) c[item.state] += 1;
    return c;
  }, [items]);

  const wishlistTotal = useMemo(
    () =>
      items
        .filter((i) => i.state === "wishlist")
        .reduce((sum, i) => sum + (i.price ?? 0), 0),
    [items],
  );

  const trimmed = query.trim();
  const filtered = useMemo(
    () =>
      items.filter(
        (i) =>
          (filter === "all" || i.state === filter) &&
          matchesQuery(i, trimmed),
      ),
    [items, filter, trimmed],
  );

  return (
    <div className="mx-auto max-w-[1480px] px-5 lg:px-8">
      <header className="border-b border-line py-7 lg:flex lg:items-end lg:justify-between lg:gap-10 lg:py-9">
        <div>
          <p className="eyebrow mb-2.5 lg:mb-3">
            nichetack — everything you&apos;ve saved
          </p>
          <h1 className="h-display text-[34px] lg:text-[58px]">
            things i&apos;m <em className="h-it">considering</em>.
          </h1>
        </div>
        <div className="mt-4 flex items-center gap-3 lg:mt-0 lg:flex-shrink-0 lg:pb-1">
          <span className="pill">
            {items.length} items · ${wishlistTotal.toLocaleString()} in wishlist
          </span>
          <Link
            href="/pairwise"
            className="btn hidden gap-2 px-5 py-3 text-[13px] lg:inline-flex"
          >
            <Icon name="swap" size={16} />
            Play comparison
          </Link>
        </div>
      </header>

      {/* Filters + search */}
      <div className="flex flex-col-reverse gap-3 py-5 lg:flex-row lg:items-center lg:gap-4 lg:py-6">
        <div className="flex items-center gap-2 overflow-x-auto lg:flex-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={cn("pill shrink-0", filter === f.key && "on")}
            >
              {f.label} · {counts[f.key]}
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-72 lg:flex-shrink-0">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3">
            <Icon name="search" size={16} />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your stash…"
            aria-label="Search saved items"
            className="w-full rounded-full border border-line bg-bg-elev py-2.5 pl-10 pr-9 text-[13px] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-ink-3"
          />
          {trimmed && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-ink-3 transition-colors hover:text-ink"
            >
              <Icon name="close" size={14} />
            </button>
          )}
        </div>
      </div>

      {trimmed && (
        <p className="mono mb-4 text-[11px] text-ink-3">
          {filtered.length === 1
            ? "1 match for "
            : `${filtered.length} matches for `}
          &ldquo;{trimmed}&rdquo;
        </p>
      )}

      {filtered.length > 0 ? (
        <div className="masonry pb-28 lg:pb-24">
          {filtered.map((item) => (
            <Tile key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-24 text-center">
          <p className="h-display text-[24px]">
            {trimmed ? (
              <>
                Nothing matches{" "}
                <em className="h-it">&ldquo;{trimmed}&rdquo;</em>.
              </>
            ) : (
              <>Nothing saved here yet.</>
            )}
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setFilter("all");
            }}
            className="btn ghost"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
