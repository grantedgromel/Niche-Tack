/* Nichetack — mock saved items.
   Moodboard imagery is served from picsum.photos with stable seeds;
   aspect ratios vary so the masonry stays editorial. */

export type ItemKind = "product" | "article" | "video" | "screenshot" | "recipe";
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
  /** picsum seed */
  seed: string;
  tags?: string[];
  priceHistory?: number[];
  readTime?: number;
}

export const ITEMS: Item[] = [
  {
    id: "i01",
    kind: "product",
    title: "Hario V60 02 Ceramic",
    source: "kinto-usa.com",
    price: 38,
    state: "active",
    ar: "4/5",
    seed: "coffee2",
    tags: ["coffee", "ritual", "gift to self"],
    priceHistory: [42, 40, 38, 38, 36],
  },
  {
    id: "i02",
    kind: "article",
    title: "On Slowness",
    source: "the-paris-review.org",
    price: null,
    state: "wishlist",
    ar: "1/1",
    seed: "essay7",
    readTime: 12,
  },
  {
    id: "i03",
    kind: "video",
    title: "How to Choose Curtains You'll Actually Love",
    source: "youtube.com · 8 min",
    price: null,
    state: "wishlist",
    ar: "16/10",
    seed: "curtain1",
  },
  {
    id: "i04",
    kind: "screenshot",
    title: "Bouclé sofa, oat",
    source: "instagram · @studio.oma",
    price: 2400,
    state: "wishlist",
    ar: "4/5",
    seed: "sofa3",
  },
  {
    id: "i05",
    kind: "product",
    title: "A.P.C. Standard Jean",
    source: "apc-us.com",
    price: 215,
    state: "wishlist",
    ar: "3/4",
    seed: "denim1",
    tags: ["wardrobe", "forever"],
    priceHistory: [230, 225, 225, 215, 215],
  },
  {
    id: "i06",
    kind: "recipe",
    title: "Marcella's Tomato Sauce",
    source: "nytimes/cooking",
    price: null,
    state: "active",
    ar: "1/1",
    seed: "pasta1",
  },
  {
    id: "i07",
    kind: "product",
    title: "Linen sheet set, sand",
    source: "morrowsoft.com",
    price: 280,
    state: "wishlist",
    ar: "4/3",
    seed: "linen1",
    priceHistory: [320, 300, 290, 285, 280],
  },
  {
    id: "i08",
    kind: "screenshot",
    title: "kitchen reno, ref",
    source: "tiktok · @apartmenttour",
    price: null,
    state: "wishlist",
    ar: "9/16",
    seed: "kitch2",
  },
  {
    id: "i09",
    kind: "product",
    title: "Aesop Hwyl candle",
    source: "aesop.com",
    price: 80,
    state: "purchased",
    ar: "1/1",
    seed: "candle1",
    tags: ["gift"],
    priceHistory: [80, 80, 80],
  },
  {
    id: "i10",
    kind: "article",
    title: "The end of the cluttered home",
    source: "kinfolk.com",
    price: null,
    state: "wishlist",
    ar: "3/4",
    seed: "interior9",
    readTime: 7,
  },
  {
    id: "i11",
    kind: "product",
    title: "Snow Peak titanium mug",
    source: "snowpeak.com",
    price: 55,
    state: "wishlist",
    ar: "1/1",
    seed: "mug2",
    tags: ["camp", "kitchen"],
  },
  {
    id: "i12",
    kind: "video",
    title: "Tatami room walkthrough",
    source: "youtube.com · 14 min",
    price: null,
    state: "active",
    ar: "16/9",
    seed: "tatami1",
  },
  {
    id: "i13",
    kind: "product",
    title: "Issey Miyake pleats tote",
    source: "isseymiyake.com",
    price: 360,
    state: "wishlist",
    ar: "3/4",
    seed: "tote1",
    priceHistory: [380, 360, 360, 360],
  },
  {
    id: "i14",
    kind: "recipe",
    title: "Caraway loaf, no-knead",
    source: "kingarthur.com",
    price: null,
    state: "wishlist",
    ar: "4/5",
    seed: "bread1",
  },
  {
    id: "i15",
    kind: "screenshot",
    title: "ceramic vase, ref",
    source: "pinterest · saved",
    price: null,
    state: "archived",
    ar: "3/4",
    seed: "vase2",
  },
  {
    id: "i16",
    kind: "product",
    title: "Vintage Lemaire trench, M",
    source: "thereal.com",
    price: 640,
    state: "active",
    ar: "4/5",
    seed: "trench1",
    priceHistory: [780, 720, 680, 650, 640],
  },
  {
    id: "i17",
    kind: "article",
    title: "Why I gave up my reading list",
    source: "literary-review.com",
    price: null,
    state: "wishlist",
    ar: "1/1",
    seed: "letters1",
    readTime: 5,
  },
  {
    id: "i18",
    kind: "product",
    title: "Brutalist concrete planter",
    source: "etsy.com · OBJ_studio",
    price: 95,
    state: "wishlist",
    ar: "4/5",
    seed: "planter1",
  },
];

/* Lifecycle labels */
export const STATE_LABEL: Record<ItemState, string> = {
  wishlist: "Wishlist",
  active: "In consideration",
  purchased: "Purchased",
  archived: "Archived",
};

/* Shorter lifecycle labels used in chips / filters */
export const STATE_LABEL_SHORT: Record<ItemState, string> = {
  wishlist: "Wishlist",
  active: "Considering",
  purchased: "Purchased",
  archived: "Archived",
};

export function getItem(id: string): Item | undefined {
  return ITEMS.find((i) => i.id === id);
}

/* media-type corner glyph (products have none) */
export const KIND_GLYPH: Record<ItemKind, string | null> = {
  video: "▶",
  article: "¶",
  screenshot: "◰",
  recipe: "✦",
  product: null,
};

/* Public creator board */
export interface Creator {
  name: string;
  handle: string;
  bio: string;
  followers: number;
  boardName: string;
  curated: string[];
}

export const CREATOR: Creator = {
  name: "Mira Onishi",
  handle: "@miraonishi",
  bio: "Slow living research lab. Tokyo + Mendocino. Affiliate links support the work.",
  followers: 12400,
  boardName: "Things for the kitchen, 2026",
  curated: ["i01", "i06", "i07", "i11", "i14", "i18", "i09"],
};

/* Private notes — the quiet margin scribble on a saved item. */
export const ITEM_NOTES: Record<string, string> = {
  i01: "The 02 size, not the 01 — I already have the 01 somewhere.",
  i02: "Saved for a slow Sunday. Pairs well with the tatami walkthrough.",
  i05: "Standard fit, raw indigo. Size up one — they shrink.",
  i07: "Bring this back up when the linen sale rolls around in September.",
  i13: "Only buy if it scores top-three in the next comparison round.",
  i16: "The price keeps sliding — wait for the spring resale drop.",
};

export function getNote(id: string): string | undefined {
  return ITEM_NOTES[id];
}
