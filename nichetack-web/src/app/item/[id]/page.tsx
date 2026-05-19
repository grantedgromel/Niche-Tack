import { notFound } from "next/navigation";
import { getItem, ITEMS } from "@/lib/data";
import { ItemDetail } from "./ItemDetail";

export function generateStaticParams() {
  return ITEMS.map((item) => ({ id: item.id }));
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
