import type { Metadata } from "next";
import { FollowButton } from "@/components/FollowButton";
import { Icon } from "@/components/Icon";
import { seededGradient } from "@/lib/art";
import { CREATOR, CREATOR_ITEMS } from "@/lib/creator-data";

export const metadata: Metadata = {
  title: "Creator",
  description: `${CREATOR.boardName} — a curated, affiliate-linked board by ${CREATOR.name}.`,
};

/* Mira's note on each curated item, index-matched to CREATOR_ITEMS. */
const CURATOR_NOTES = [
  "I use it every morning.",
  "Worth every penny.",
  "If you only buy one thing.",
  "Small, but it matters.",
  "The unsung hero of the shelf.",
  "Subtle. Perfect.",
  "The one I always gift.",
];

export default function CreatorPage() {
  const total = CREATOR_ITEMS.reduce((sum, item) => sum + (item.price ?? 0), 0);
  const buyable = CREATOR_ITEMS.filter((item) => item.price != null).length;
  const earns = Math.round(total * 0.09);

  return (
    <div className="mx-auto max-w-[1060px] px-5 pb-28 pt-10 lg:px-8 lg:pb-24 lg:pt-12">
      {/* ─── Creator header ─── */}
      <header className="flex flex-col items-center border-b border-line pb-9 text-center lg:pb-11">
        <div
          className="flex size-[72px] items-center justify-center rounded-full"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.13 30), oklch(0.4 0.1 280))",
          }}
        >
          <span
            className="font-display text-[30px] italic"
            style={{ color: "oklch(1 0 0)" }}
          >
            M
          </span>
        </div>
        <h1 className="h-display mt-4 text-[28px] lg:text-[32px]">
          {CREATOR.name}
        </h1>
        <p className="mono mt-1 text-[11px] text-ink-3">
          {CREATOR.handle} · {(CREATOR.followers / 1000).toFixed(1)}k followers
        </p>
        <p className="h-display mt-4 max-w-[440px] text-[16px] italic leading-snug text-ink-2">
          &ldquo;{CREATOR.bio}&rdquo;
        </p>
        <div className="mt-5 flex items-center gap-2">
          <FollowButton />
          <button type="button" className="icon-btn" aria-label="Share board">
            <Icon name="share" size={16} />
          </button>
        </div>
      </header>

      {/* ─── Board intro ─── */}
      <div className="mx-auto mt-9 max-w-[620px] text-center lg:mt-11">
        <p className="eyebrow">
          a curated board · {CREATOR_ITEMS.length} items
        </p>
        <h2 className="h-display mt-2.5 text-[32px] lg:text-[44px]">
          things for the <em className="h-it">kitchen</em>, 2026.
        </h2>
        <p className="h-display mt-3 text-[16px] leading-snug text-ink-2">
          What I&apos;m using daily. Affiliate links support the lab; nothing
          here is sponsored.
        </p>
      </div>

      {/* ─── Affiliate disclosure ─── */}
      <div
        className="mx-auto mt-7 flex max-w-[520px] flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-lg px-4 py-2.5"
        style={{ background: "var(--accent-soft)" }}
      >
        <span
          className="mono rounded px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em]"
          style={{
            color: "var(--accent)",
            border: "1px solid var(--accent)",
          }}
        >
          affiliate
        </span>
        <span className="mono text-[10px] text-ink-2">
          Mira earns when you buy. You pay the same price.
        </span>
      </div>

      {/* ─── Curated grid (display-only showcase) ─── */}
      <div className="mt-9 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-3 lg:gap-7">
        {CREATOR_ITEMS.map((item, idx) => {
          const isBuyable = item.price != null;
          return (
            <div key={item.id} className="flex flex-col">
              <div
                className="w-full rounded-xl"
                style={{
                  aspectRatio: "4/5",
                  background: seededGradient(item.seed),
                }}
              />
              <p className="eyebrow mt-3">{item.source.split("·")[0].trim()}</p>
              <h3 className="h-display mt-1 text-[16px] leading-tight lg:text-[19px]">
                {item.title}
              </h3>
              <p className="mono mt-1.5 text-[10px] italic leading-snug text-ink-2">
                &ldquo;{CURATOR_NOTES[idx]}&rdquo;
              </p>
              <div className="mt-auto flex items-center justify-between pt-3">
                {isBuyable ? (
                  <span className="h-display text-[16px]">${item.price}</span>
                ) : (
                  <span className="mono text-[11px] text-ink-3">recipe</span>
                )}
                <button
                  type="button"
                  className="btn px-3.5 py-2 text-[12px]"
                >
                  {isBuyable ? "Buy" : "View"}
                  <Icon name="arrowR" size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Whole-basket CTA ─── */}
      <div className="mx-auto mt-10 max-w-[420px] text-center lg:mt-11">
        <button type="button" className="btn accent w-full py-4">
          <Icon name="basket" size={17} />
          Buy whole basket · ${total.toLocaleString()}
        </button>
        <p className="mono mt-3.5 text-[10px] uppercase tracking-[0.14em] text-ink-3">
          opens {buyable} source tabs · mira earns ~${earns}
        </p>
      </div>
    </div>
  );
}
