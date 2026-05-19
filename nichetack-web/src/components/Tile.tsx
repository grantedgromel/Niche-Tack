import Link from "next/link";
import { seededGradient } from "@/lib/art";
import { cn } from "@/lib/cn";
import { KIND_GLYPH, type Item } from "@/lib/data";
import { LifecycleMarker } from "./LifecycleMarker";

interface TileProps {
  item: Item;
  /** show the title + price row beneath the image */
  showMeta?: boolean;
}

/* A single saved item in the gallery masonry. Lifecycle is a corner
   marker; media type is a corner glyph. The whole tile links to detail. */
export function Tile({ item, showMeta = true }: TileProps) {
  const glyph = KIND_GLYPH[item.kind];

  return (
    <Link href={`/item/${item.id}`} className="tile" data-state={item.state}>
      <LifecycleMarker state={item.state} />
      <div
        className="tile-img"
        style={{
          aspectRatio: item.ar,
          background: seededGradient(item.seed),
        }}
      />
      {glyph && <span className="media-glyph">{glyph}</span>}
      {showMeta && (
        <div className="tile-meta">
          <span className="tile-title">{item.title}</span>
          {item.price != null && (
            <span className={cn("tile-price", "mono")}>${item.price}</span>
          )}
        </div>
      )}
    </Link>
  );
}
