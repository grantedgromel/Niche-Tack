import { getItem, type Item } from "./data";

export const BASKET_BUDGET = 500;

/** Match against the most recent comparison round, 0–1. */
export const BASKET_FIT = 0.94;

export interface BasketItem extends Item {
  /** the price the optimizer used for this basket */
  displayPrice: number;
  /** why the optimizer kept it */
  reason: string;
}

/* The four items that maximise accumulated pairwise preference while
   staying under budget. Display prices are what the optimizer solved on. */
const SELECTION: { id: string; displayPrice: number; reason: string }[] = [
  { id: "i05", displayPrice: 215, reason: "picked 8/8 rounds" },
  { id: "i07", displayPrice: 168, reason: "now $112 below saved price" },
  { id: "i01", displayPrice: 38, reason: "high-utility, low-cost" },
  { id: "i11", displayPrice: 55, reason: "pairs with #1 ritual" },
];

export function getBasket(): BasketItem[] {
  return SELECTION.map(({ id, displayPrice, reason }) => {
    const item = getItem(id);
    if (!item) throw new Error(`Unknown basket item: ${id}`);
    return { ...item, displayPrice, reason };
  });
}

export function basketTotal(items: BasketItem[]): number {
  return items.reduce((sum, item) => sum + item.displayPrice, 0);
}
