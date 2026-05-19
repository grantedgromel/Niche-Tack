import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getItem, ITEMS } from "@/lib/data";
import { ItemDetail } from "./ItemDetail";

export function generateStaticParams() {
  return ITEMS.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = getItem(id);
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
  const item = getItem(id);
  if (!item) notFound();

  return <ItemDetail item={item} />;
}
