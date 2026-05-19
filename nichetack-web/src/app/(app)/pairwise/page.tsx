import { getItems } from "@/lib/items";
import { PairwiseClient } from "./PairwiseClient";

export default async function PairwisePage() {
  const items = await getItems();
  const pool = items.filter(
    (i) => i.state === "wishlist" || i.state === "active",
  );
  return <PairwiseClient pool={pool} />;
}
