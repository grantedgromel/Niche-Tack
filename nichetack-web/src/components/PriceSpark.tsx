interface PriceSparkProps {
  data: number[];
  width?: number;
  height?: number;
}

/* Tiny price-history sparkline — accent line with a marked latest point. */
export function PriceSpark({ data, width = 120, height = 32 }: PriceSparkProps) {
  if (!data || data.length < 2) return null;

  const pad = 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const point = (value: number, i: number) => {
    const x = pad + (i / (data.length - 1)) * (width - pad * 2);
    const y = height - pad - ((value - min) / range) * (height - pad * 2);
    return { x, y };
  };

  const polyline = data.map((v, i) => {
    const { x, y } = point(v, i);
    return `${x},${y}`;
  });

  return (
    <svg width={width} height={height} style={{ display: "block" }} aria-hidden="true">
      <polyline
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        points={polyline.join(" ")}
      />
      {data.map((v, i) => {
        const { x, y } = point(v, i);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i === data.length - 1 ? 2.5 : 1.5}
            fill="var(--accent)"
          />
        );
      })}
    </svg>
  );
}
