import { cn } from "@/lib/cn";
import { STATE_LABEL, type ItemState } from "@/lib/data";

interface LifecycleMarkerProps {
  state: ItemState;
  /** static = sits inline inside a control rather than over an image */
  inline?: boolean;
  size?: number;
  className?: string;
}

/* The small corner dot that signals an item's lifecycle stage —
   a quiet marker, never a loud badge. */
export function LifecycleMarker({
  state,
  inline = false,
  size,
  className,
}: LifecycleMarkerProps) {
  return (
    <span
      className={cn("lc-marker", state, inline && "is-static", className)}
      title={STATE_LABEL[state]}
      style={size ? { width: size, height: size } : undefined}
    />
  );
}
