import Link from "next/link";
import { Icon } from "@/components/Icon";
import { seededGradient } from "@/lib/art";
import {
  BASKET_BUDGET,
  BASKET_FIT,
  basketTotal,
  getBasket,
} from "@/lib/basket";

export default function BasketPage() {
  const basket = getBasket();
  const total = basketTotal(basket);
  const remaining = BASKET_BUDGET - total;
  const spentPct = Math.round((total / BASKET_BUDGET) * 100);
  const fitPct = Math.round(BASKET_FIT * 100);

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
            <p className="eyebrow">basket · march 18</p>
            <h1 className="h-display mt-4 text-[40px] lg:text-[64px]">
              your ${BASKET_BUDGET},
              <br />
              <em className="h-it">considered</em>.
            </h1>
            <p className="h-display mt-5 text-[17px] leading-snug text-ink-2 lg:mt-6 lg:text-[21px]">
              Of the 18 things on your wishlist, four maximize what your gut
              picked most. Two trade-offs we&apos;re saving for later.
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
              <span>
                ${remaining} unspent · {fitPct}% fit
              </span>
            </div>
            <button type="button" className="btn mt-6 w-full py-4">
              <Icon name="basket" size={17} />
              Open all four sources
            </button>
          </div>
        </div>

        {/* ─── The four items ─── */}
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

          <div className="panel p-5">
            <p className="eyebrow mb-2">what we cut</p>
            <p className="h-display text-[16px] leading-snug text-ink-2">
              The Issey Miyake tote ($360) and Lemaire trench ($640) — both
              scored high, but together they push you $500 over. We&apos;ll
              resurface them next month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
