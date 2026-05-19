/* Nichetack — shared item types and display maps.

   Item records are per-user database rows now; see src/lib/items.ts for
   reads/writes and supabase/migrations/ for the schema and demo seed. */

export type ItemKind =
  | "product"
  | "article"
  | "video"
  | "screenshot"
  | "recipe";

export type ItemState = "wishlist" | "active" | "purchased" | "archived";

export interface Item {
  id: string;
  kind: ItemKind;
  title: string;
  source: string;
  price: number | null;
  state: ItemState;
  /** aspect ratio, "w/h" — drives masonry tile height */
  ar: string;
  /** gradient seed (see src/lib/art.ts) */
  seed: string;
  tags?: string[];
  priceHistory?: number[];
  readTime?: number;
  note?: string;
}

/* Lifecycle labels */
export const STATE_LABEL: Record<ItemState, string> = {
  wishlist: "Wishlist",
  active: "In consideration",
  purchased: "Purchased",
  archived: "Archived",
};

/* Shorter lifecycle labels used in chips / controls */
export const STATE_LABEL_SHORT: Record<ItemState, string> = {
  wishlist: "Wishlist",
  active: "Considering",
  purchased: "Purchased",
  archived: "Archived",
};

/* media-type corner glyph (products have none) */
export const KIND_GLYPH: Record<ItemKind, string | null> = {
  video: "▶",
  article: "¶",
  screenshot: "◰",
  recipe: "✦",
  product: null,
};
