import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { seededGradient } from "@/lib/art";
import {
  BASKET_BUDGET,
  basketCutItems,
  basketTotal,
  selectBasket,
} from "@/lib/basket";
import { getItems } from "@/lib/items";

export const metadata: Metadata = {
  title: "Basket",
  description:
    "Your budget, considered — the items to buy and the ones to wait on.",
};

export default async function BasketPage() {
  const items = await getItems();
  const basket = selectBasket(items);
  const total = basketTotal(basket);
  const remaining = BASKET_BUDGET - total;
  const spentPct = Math.min(100, Math.round((total / BASKET_BUDGET) * 100));
  const wishlistCount = items.filter((i) => i.state === "wishlist").length;
  const cut = basketCutItems(items, basket);

  if (basket.length === 0) {
    return (
      <div className="mx-auto max-w-[680px] px-5 py-24 text-center lg:py-32">
        <p className="eyebrow">basket</p>
        <h1 className="h-display mt-3 text-[40px] lg:text-[52px]">
          nothing to <em className="h-it">basket</em> yet.
        </h1>
        <p className="h-display mt-3 text-[17px] leading-snug text-ink-2">
          Add a few priced things to your wishlist and Nichetack will work out
          what fits inside ${BASKET_BUDGET}.
        </p>
        <Link href="/gallery" className="btn mt-7">
          Back to the gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-5 pb-28 pt-6 lg:px-8 lg:py-10">
      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-line bg-bg-elev lg:grid-cols-[440px_1fr]">
        {/* ─── Manifesto ─── */}
        <div
          className="flex flex-col justify-between border-b border-line p-7 lg:border-b-0 lg:border-r lg:p-12"
          style={{
            background:
              "linear-gradient(180deg, var(--accent-soft) 0%, transparent 62%)",
          }}
        >
          <div>
            <p className="eyebrow">your basket</p>
            <h1 className="h-display mt-4 text-[40px] lg:text-[64px]">
              your ${BASKET_BUDGET},
              <br />
              <em className="h-it">considered</em>.
            </h1>
            <p className="h-display mt-5 text-[17px] leading-snug text-ink-2 lg:mt-6 lg:text-[21px]">
              Of the {wishlistCount}{" "}
              {wishlistCount === 1 ? "thing" : "things"} on your wishlist,{" "}
              {basket.length} fit inside the budget — cheapest first, nothing
              over ${BASKET_BUDGET}.
            </p>
          </div>

          <div className="mt-8 lg:mt-10">
            <div className="flex items-baseline justify-between">
              <span className="mono text-[11px] text-ink-3">total</span>
              <span className="h-display text-[36px] leading-none lg:text-[46px]">
                ${total.toLocaleString()}
              </span>
            </div>
            <div className="mt-3 h-[5px] overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-ink"
                style={{ width: `${spentPct}%` }}
              />
            </div>
            <div className="mono mt-2 flex justify-between text-[11px] text-ink-3">
              <span>of ${BASKET_BUDGET} budget</span>
              <span>${remaining.toLocaleString()} unspent</span>
            </div>
            <button type="button" className="btn mt-6 w-full py-4">
              <Icon name="basket" size={17} />
              Open all {basket.length} sources
            </button>
          </div>
        </div>

        {/* ─── The items ─── */}
        <div className="flex flex-col gap-6 p-6 lg:gap-7 lg:p-11">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-7">
            {basket.map((item, idx) => (
              <Link
                key={item.id}
                href={`/item/${item.id}`}
                className="group flex flex-col"
              >
                <div className="relative">
                  <div
                    className="w-full rounded-[10px] transition-transform duration-300 group-hover:-translate-y-1"
                    style={{
                      aspectRatio: "5/6",
                      background: seededGradient(item.seed),
                    }}
                  />
                  <span className="mono absolute left-3 top-3 flex size-7 items-center justify-center rounded-full bg-ink text-[13px] text-bg">
                    {idx + 1}
                  </span>
                </div>
                <p className="eyebrow mt-3">{item.source}</p>
                <div className="mt-1 flex items-baseline justify-between gap-3">
                  <span className="h-display text-[20px] leading-tight">
                    {item.title}
                  </span>
                  <span className="h-display flex-shrink-0 text-[17px]">
                    ${item.displayPrice}
                  </span>
                </div>
                <p className="mono mt-1.5 text-[11px] text-accent">
                  → {item.reason}
                </p>
              </Link>
            ))}
          </div>

          {cut.length > 0 && (
            <div className="panel p-5">
              <p className="eyebrow mb-2">what we cut</p>
              <p className="h-display text-[16px] leading-snug text-ink-2">
                {cut.length} priced {cut.length === 1 ? "item" : "items"}{" "}
                didn&apos;t fit this round: {cut.map((c) => c.title).join(", ")}.
                They&apos;ll resurface as the budget frees up.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
