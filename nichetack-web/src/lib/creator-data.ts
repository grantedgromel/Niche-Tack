/* The public creator board is a static showcase — it never touches the
   signed-in user's data — so its content lives here as its own seed set. */

export interface Creator {
  name: string;
  handle: string;
  bio: string;
  followers: number;
  boardName: string;
}

export const CREATOR: Creator = {
  name: "Mira Onishi",
  handle: "@miraonishi",
  bio: "Slow living research lab. Tokyo + Mendocino. Affiliate links support the work.",
  followers: 12400,
  boardName: "Things for the kitchen, 2026",
};

export interface CreatorItem {
  id: string;
  title: string;
  source: string;
  seed: string;
  price: number | null;
}

export const CREATOR_ITEMS: CreatorItem[] = [
  { id: "c1", title: "Hario V60 02 Ceramic", source: "kinto-usa.com", seed: "coffee2", price: 38 },
  { id: "c2", title: "Marcella's Tomato Sauce", source: "nytimes/cooking", seed: "pasta1", price: null },
  { id: "c3", title: "Linen sheet set, sand", source: "morrowsoft.com", seed: "linen1", price: 280 },
  { id: "c4", title: "Snow Peak titanium mug", source: "snowpeak.com", seed: "mug2", price: 55 },
  { id: "c5", title: "Caraway loaf, no-knead", source: "kingarthur.com", seed: "bread1", price: null },
  { id: "c6", title: "Brutalist concrete planter", source: "etsy.com · OBJ_studio", seed: "planter1", price: 95 },
  { id: "c7", title: "Aesop Hwyl candle", source: "aesop.com", seed: "candle1", price: 80 },
];
