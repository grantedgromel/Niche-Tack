import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Item } from "@/lib/data";
import type { Database } from "@/lib/supabase/database.types";

type ItemRow = Database["public"]["Tables"]["items"]["Row"];
type ItemInsert = Database["public"]["Tables"]["items"]["Insert"];
type ItemUpdate = Database["public"]["Tables"]["items"]["Update"];

/* The one DB-row ↔ Item mapping point (snake_case → camelCase). */
function rowToItem(row: ItemRow): Item {
  return {
    id: row.id,
    kind: row.kind,
    title: row.title,
    source: row.source,
    price: row.price,
    state: row.state,
    ar: row.ar,
    seed: row.seed,
    tags: row.tags,
    priceHistory: row.price_history,
    readTime: row.read_time ?? undefined,
    note: row.note,
  };
}

/* The auth guard — memoized per request, so a page and its actions share
   one lookup. Redirects to /login when there is no session. */
export const getUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return user;
});

export const getItems = cache(async (): Promise<Item[]> => {
  await getUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data.map(rowToItem);
});

export const getItem = cache(async (id: string): Promise<Item | null> => {
  await getUser();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("items")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToItem(data) : null;
});

export interface NewItem {
  kind: Item["kind"];
  title: string;
  source: string;
  price: number | null;
  state: Item["state"];
  ar: string;
  seed: string;
  tags: string[];
  note: string;
}

export async function createItem(input: NewItem): Promise<Item> {
  const user = await getUser();
  const supabase = await createClient();
  const insert: ItemInsert = { user_id: user.id, ...input };
  const { data, error } = await supabase
    .from("items")
    .insert(insert)
    .select()
    .single();
  if (error) throw error;
  return rowToItem(data);
}

export interface ItemPatch {
  state?: Item["state"];
  tags?: string[];
  note?: string;
}

export async function updateItem(id: string, patch: ItemPatch): Promise<void> {
  await getUser();
  const supabase = await createClient();
  // RLS scopes the row to the signed-in user — no explicit user_id filter.
  const update: ItemUpdate = patch;
  const { error } = await supabase.from("items").update(update).eq("id", id);
  if (error) throw error;
}

export async function deleteItem(id: string): Promise<void> {
  await getUser();
  const supabase = await createClient();
  const { error } = await supabase.from("items").delete().eq("id", id);
  if (error) throw error;
}
