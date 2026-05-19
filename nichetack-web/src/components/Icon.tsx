/* Nichetack — stroked icon set, drawn on a 24×24 grid. */

const ICON_PATHS = {
  search: "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM21 21l-4.35-4.35",
  filter: "M4 7h16M7 12h10M10 17h4",
  plus: "M12 5v14M5 12h14",
  back: "M15 6l-6 6 6 6",
  more: "M5 12h.01M12 12h.01M19 12h.01",
  heart:
    "M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.65-9.5 9-9.5 9z",
  sparkle: [
    "M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7z",
    "M19 4l.5 1.5L21 6l-1.5.5L19 8l-.5-1.5L17 6l1.5-.5z",
  ],
  basket: "M5 8h14l-1.5 11a2 2 0 0 1-2 1.7H8.5a2 2 0 0 1-2-1.7L5 8zM8 8V5a4 4 0 0 1 8 0v3",
  share: "M12 16V4M8 8l4-4 4 4M5 20h14",
  play: "M8 5l12 7-12 7V5z",
  article: "M5 4h11l3 3v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM8 10h8M8 14h8M8 18h5",
  cam: "M3 7h4l2-3h6l2 3h4v12H3V7zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 14l9 5 9-5",
  link: "M10 14a4 4 0 0 1 0-6l3-3a4 4 0 0 1 6 6l-2 2M14 10a4 4 0 0 1 0 6l-3 3a4 4 0 0 1-6-6l2-2",
  bookmark: "M6 4h12v17l-6-4-6 4V4z",
  check: "M5 12l5 5L20 7",
  arrowR: "M5 12h14M13 5l7 7-7 7",
  arrowD: "M12 5v14M5 13l7 7 7-7",
  arrowUp: "M12 19V5M5 11l7-7 7 7",
  close: "M6 6l12 12M18 6L6 18",
  swap: "M7 4l-4 4 4 4M21 8H3M17 12l4 4-4 4M3 16h18",
  notes: "M5 4h14v16H5zM9 9h6M9 13h6M9 17h3",
} as const;

export type IconName = keyof typeof ICON_PATHS;

interface IconProps {
  name: IconName;
  size?: number;
  /** stroke width */
  sw?: number;
  /** render filled instead of stroked (used by `play`) */
  filled?: boolean;
  className?: string;
}

export function Icon({
  name,
  size = 18,
  sw = 1.6,
  filled = false,
  className,
}: IconProps) {
  const d = ICON_PATHS[name];
  const paths = Array.isArray(d) ? d : [d];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths.map((p) => (
        <path key={p} d={p} />
      ))}
    </svg>
  );
}
