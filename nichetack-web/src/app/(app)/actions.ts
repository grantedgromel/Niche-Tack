"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  createItem,
  deleteItem,
  type NewItem,
  updateItem,
} from "@/lib/items";

const stateSchema = z.enum(["wishlist", "active", "purchased", "archived"]);
const tagsSchema = z.array(z.string().trim().min(1).max(40)).max(50);

const newItemSchema = z.object({
  kind: z.enum(["product", "article", "video", "screenshot", "recipe"]),
  title: z.string().trim().min(1).max(200),
  source: z.string().max(200),
  price: z.number().nonnegative().nullable(),
  state: stateSchema,
  ar: z.string().max(12),
  seed: z.string().min(1).max(64),
  tags: tagsSchema,
  note: z.string().max(2000),
});

export async function setItemStateAction(id: string, state: string) {
  await updateItem(id, { state: stateSchema.parse(state) });
  revalidatePath("/gallery");
  revalidatePath(`/item/${id}`);
  revalidatePath("/basket");
}

export async function setItemTagsAction(id: string, tags: string[]) {
  await updateItem(id, { tags: tagsSchema.parse(tags) });
  revalidatePath("/gallery");
  revalidatePath(`/item/${id}`);
}

export async function setItemNoteAction(id: string, note: string) {
  await updateItem(id, { note: z.string().max(2000).parse(note) });
  revalidatePath(`/item/${id}`);
}

export async function createItemAction(input: NewItem): Promise<{ id: string }> {
  const item = await createItem(newItemSchema.parse(input));
  revalidatePath("/gallery");
  revalidatePath("/basket");
  return { id: item.id };
}

export async function deleteItemAction(id: string) {
  await deleteItem(id);
  revalidatePath("/gallery");
  revalidatePath("/basket");
}
