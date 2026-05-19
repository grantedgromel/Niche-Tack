"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Tile } from "@/components/Tile";
import { cn } from "@/lib/cn";
import { ITEMS, type ItemState } from "@/lib/data";

type Filter = "all" | ItemState;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "wishlist", label: "Wishlist" },
  { key: "active", label: "Considering" },
  { key: "purchased", label: "Purchased" },
  { key: "archived", label: "Archived" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo<Record<Filter, number>>(() => {
    const c: Record<Filter, number> = {
      all: ITEMS.length,
      wishlist: 0,
      active: 0,
      purchased: 0,
      archived: 0,
    };
    for (const item of ITEMS) c[item.state] += 1;
    return c;
  }, []);

  const wishlistTotal = useMemo(
    () =>
      ITEMS.filter((i) => i.state === "wishlist").reduce(
        (sum, i) => sum + (i.price ?? 0),
        0,
      ),
    [],
  );

  const filtered = useMemo(
    () => (filter === "all" ? ITEMS : ITEMS.filter((i) => i.state === filter)),
    [filter],
  );

  return (
    <div className="mx-auto max-w-[1480px] px-8">
      <header className="flex items-end justify-between gap-10 border-b border-line py-9">
        <div>
          <p className="eyebrow mb-3">nichetack — everything you&apos;ve saved</p>
          <h1 className="h-display text-[58px]">
            things i&apos;m <em className="h-it">considering</em>.
          </h1>
        </div>
        <div className="flex flex-shrink-0 items-center gap-3 pb-1">
          <span className="pill">
            {ITEMS.length} items · ${wishlistTotal.toLocaleString()} in wishlist
          </span>
          <Link href="/pairwise" className="btn gap-2 px-5 py-3 text-[13px]">
            <Icon name="swap" size={16} />
            Play comparison
          </Link>
        </div>
      </header>

      <div className="flex items-center gap-2 py-6">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={cn("pill", filter === f.key && "on")}
          >
            {f.label} · {counts[f.key]}
          </button>
        ))}
        <span className="mono ml-auto text-[11px] text-ink-3">
          {filtered.length} shown · sorted by recency
        </span>
      </div>

      <div className="masonry pb-24">
        {filtered.map((item) => (
          <Tile key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
