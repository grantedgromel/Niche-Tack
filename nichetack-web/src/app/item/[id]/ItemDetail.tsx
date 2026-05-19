"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { LifecycleMarker } from "@/components/LifecycleMarker";
import { PriceSpark } from "@/components/PriceSpark";
import { seededGradient } from "@/lib/art";
import { cn } from "@/lib/cn";
import { STATE_LABEL_SHORT, type Item, type ItemState } from "@/lib/data";

const STATE_OPTIONS: { key: ItemState; label: string }[] = [
  { key: "wishlist", label: "Wishlist" },
  { key: "active", label: "Considering" },
  { key: "purchased", label: "Purchased" },
  { key: "archived", label: "Archived" },
];

interface ItemDetailProps {
  item: Item;
  note?: string;
}

export function ItemDetail({ item, note }: ItemDetailProps) {
  const [state, setState] = useState<ItemState>(item.state);

  const history = item.priceHistory;
  const lastChange =
    history && history.length >= 2
      ? history[history.length - 1] - history[0]
      : 0;
  const sourceName = item.source.split("·")[0].trim();
  const tags = item.tags ?? ["unsorted"];

  return (
    <div className="mx-auto max-w-[1180px] px-5 pb-28 pt-6 lg:px-8 lg:pt-8">
      <Link
        href="/gallery"
        className="link-quiet mono inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em]"
      >
        <Icon name="back" size={14} />
        Gallery
      </Link>

      <div className="mt-5 grid grid-cols-1 gap-8 lg:mt-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        {/* ─── Image ─── */}
        <div>
          <div className="lg:sticky lg:top-[88px]">
            <div
              className="relative w-full overflow-hidden rounded-2xl bg-bg-tile"
              style={{ aspectRatio: item.ar, maxHeight: "78vh" }}
            >
              <div
                className="h-full w-full"
                style={{ background: seededGradient(item.seed) }}
              />
              <LifecycleMarker state={state} />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="eyebrow">{item.kind}</span>
              <span className="eyebrow">{STATE_LABEL_SHORT[state]}</span>
            </div>
          </div>
        </div>

        {/* ─── Content ─── */}
        <div className="lg:max-w-[470px]">
          <p className="eyebrow mb-2.5">{item.source} · saved 3 weeks ago</p>
          <h1 className="h-display mb-5 text-[32px] lg:mb-6 lg:text-[42px]">
            {item.title}
          </h1>

          {item.price != null ? (
            <div className="mb-7 flex items-end justify-between gap-5">
              <div>
                <p className="eyebrow mb-1.5">current price</p>
                <div className="h-display text-[32px] leading-none lg:text-[38px]">
                  ${item.price.toLocaleString()}
                </div>
                {lastChange !== 0 && (
                  <p
                    className="mono mt-2 text-[11px]"
                    style={{
                      color:
                        lastChange < 0 ? "var(--positive)" : "var(--ink-3)",
                    }}
                  >
                    {lastChange < 0 ? "▼" : "▲"} ${Math.abs(lastChange)} in 8
                    weeks
                  </p>
                )}
              </div>
              {history && <PriceSpark data={history} />}
            </div>
          ) : item.readTime ? (
            <div className="mb-7">
              <p className="eyebrow mb-1.5">{item.kind}</p>
              <div className="h-display text-[26px] leading-none lg:text-[30px]">
                {item.readTime} min read
              </div>
            </div>
          ) : null}

          {/* Lifecycle */}
          <p className="eyebrow mb-2.5">state</p>
          <div className="grid grid-cols-2 gap-1.5">
            {STATE_OPTIONS.map((option) => {
              const on = state === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setState(option.key)}
                  aria-pressed={on}
                  className={cn(
                    "flex items-center gap-2.5 rounded-[10px] border px-3.5 py-3 text-[13px] font-medium transition-colors",
                    on
                      ? "border-ink bg-ink text-bg"
                      : "border-line bg-bg-elev text-ink hover:border-ink-3",
                  )}
                >
                  <LifecycleMarker state={option.key} inline size={12} />
                  {option.label}
                </button>
              );
            })}
          </div>

          {/* Tags */}
          <p className="eyebrow mb-2.5 mt-7">your tags</p>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="pill">
                {tag}
              </span>
            ))}
            <button type="button" className="pill border-dashed text-ink-3">
              + add
            </button>
          </div>

          {/* Note */}
          <p className="eyebrow mb-2.5 mt-7">note</p>
          {note ? (
            <div className="panel h-display p-4 text-[16px] italic leading-snug text-ink-2">
              &ldquo;{note}&rdquo;
            </div>
          ) : (
            <button
              type="button"
              className="panel flex w-full items-center gap-2 border-dashed p-4 text-left text-[13px] text-ink-3 transition-colors hover:text-ink-2"
            >
              <Icon name="plus" size={14} />
              Add a private note…
            </button>
          )}

          {/* Source */}
          <button type="button" className="btn ghost mt-5 w-full">
            <Icon name="link" size={16} />
            Open at {sourceName}
          </button>

          {/* Pairwise prompt */}
          <div
            className="mt-6 flex items-center gap-4 rounded-xl border border-line p-4"
            style={{ background: "var(--accent-soft)" }}
          >
            <div className="flex-1">
              <p className="eyebrow mb-1">seen 0 times</p>
              <p className="h-display text-[17px] leading-tight">
                Compare against your other saves.
              </p>
            </div>
            <Link
              href="/pairwise"
              className="btn accent"
              aria-label="Play the comparison game"
            >
              <Icon name="swap" size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
