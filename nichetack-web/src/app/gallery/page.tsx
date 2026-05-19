"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Tile } from "@/components/Tile";
import { cn } from "@/lib/cn";
import { type ItemState } from "@/lib/data";
import { useItems } from "@/lib/store";

type Filter = "all" | ItemState;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "wishlist", label: "Wishlist" },
  { key: "active", label: "Considering" },
  { key: "purchased", label: "Purchased" },
  { key: "archived", label: "Archived" },
];

export default function GalleryPage() {
  const items = useItems();
  const [filter, setFilter] = useState<Filter>("all");

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

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.state === filter)),
    [items, filter],
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

      <div className="flex items-center gap-2 overflow-x-auto py-5 lg:py-6">
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
        <span className="mono ml-auto hidden shrink-0 text-[11px] text-ink-3 lg:inline">
          {filtered.length} shown · sorted by recency
        </span>
      </div>

      <div className="masonry pb-28 lg:pb-24">
        {filtered.map((item) => (
          <Tile key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
