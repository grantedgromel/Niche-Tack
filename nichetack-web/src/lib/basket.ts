import type { Item } from "./data";

export const BASKET_BUDGET = 500;

export interface BasketItem extends Item {
  displayPrice: number;
  reason: string;
}

function reasonFor(item: Item & { price: number }): string {
  const history = item.priceHistory;
  if (history && history.length >= 2) {
    const drop = history[0] - item.price;
    if (drop > 0) return `now $${drop} below its saved price`;
  }
  if (item.price <= 60) return "high-utility, low-cost";
  return "fits comfortably under budget";
}

/* A budget-aware basket: priced wishlist items, cheapest first, greedily
   filling up to BASKET_BUDGET. */
export function selectBasket(items: Item[]): BasketItem[] {
  const priced = items
    .filter(
      (i): i is Item & { price: number } =>
        i.state === "wishlist" && i.price != null,
    )
    .sort((a, b) => a.price - b.price);

  const basket: BasketItem[] = [];
  let total = 0;
  for (const item of priced) {
    if (total + item.price > BASKET_BUDGET) continue;
    total += item.price;
    basket.push({
      ...item,
      displayPrice: item.price,
      reason: reasonFor(item),
    });
  }
  return basket;
}

export function basketTotal(items: BasketItem[]): number {
  return items.reduce((sum, item) => sum + item.displayPrice, 0);
}

/* Priced wishlist items the budget couldn't fit. */
export function basketCutItems(items: Item[], basket: BasketItem[]): Item[] {
  const chosen = new Set(basket.map((b) => b.id));
  return items.filter(
    (i) => i.state === "wishlist" && i.price != null && !chosen.has(i.id),
  );
}
