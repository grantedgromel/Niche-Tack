import { getItems } from "@/lib/items";
import { GalleryClient } from "./GalleryClient";

export default async function GalleryPage() {
  const items = await getItems();
  return <GalleryClient items={items} />;
}
