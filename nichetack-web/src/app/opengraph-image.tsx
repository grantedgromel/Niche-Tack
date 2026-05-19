import { ImageResponse } from "next/og";

export const alt = "Nichetack — a calm home for everything you've saved";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Static share card, generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3f0ea",
          color: "#29251f",
          padding: "78px 88px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 8,
            color: "#9a8f80",
          }}
        >
          PERSONAL COMMERCE CRM
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 150,
              fontStyle: "italic",
              lineHeight: 1,
            }}
          >
            Nichetack
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 42,
              lineHeight: 1.3,
              color: "#6b6256",
              marginTop: 30,
              maxWidth: 900,
            }}
          >
            A calm home for everything you&apos;ve saved across the web — weigh
            it, rank it, decide.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {["#bd6a4c", "#d98e76", "#8a5d9c"].map((color) => (
            <div
              key={color}
              style={{
                width: 26,
                height: 26,
                borderRadius: 26,
                background: color,
              }}
            />
          ))}
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#9a8f80",
              marginLeft: 10,
            }}
          >
            Linen · Atelier · Olive
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
