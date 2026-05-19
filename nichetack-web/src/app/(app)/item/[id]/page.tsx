import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getItem } from "@/lib/items";
import { ItemDetail } from "./ItemDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) return { title: "Not found" };
  return {
    title: item.title,
    description: `${item.title} — saved from ${item.source}.`,
  };
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) notFound();

  return <ItemDetail item={item} />;
}
