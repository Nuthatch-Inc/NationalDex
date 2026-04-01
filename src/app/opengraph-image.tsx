import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "NationalDex — The Pokedex App";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontData = await fetch(
    "https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8L6tjPQ.ttf",
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        background: "#09090b",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "JetBrains Mono",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          display: "flex",
        }}
      />

      {/* Accent glow */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          right: "-100px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(239,68,68,0.12) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Title */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          color: "#e0e0e0",
          letterSpacing: "-2px",
          display: "flex",
        }}
      >
        NationalDex
      </div>

      {/* Subtitle */}
      <div
        style={{
          fontSize: 22,
          color: "#888888",
          marginTop: 16,
          display: "flex",
        }}
      >
        The Pokedex App
      </div>

      {/* Feature pills */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: 40,
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "800px",
        }}
      >
        {["Stats", "Moves", "Abilities", "Items", "Types", "Team Builder"].map(
          (label) => (
            <div
              key={label}
              style={{
                background: "#1a1a1a",
                color: "#888888",
                fontSize: 16,
                padding: "8px 20px",
                borderRadius: "9999px",
                border: "1px solid #2a2a2a",
                display: "flex",
              }}
            >
              {label}
            </div>
          ),
        )}
      </div>

      {/* URL */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          fontSize: 16,
          color: "#555555",
          display: "flex",
        }}
      >
        nationaldex.app
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "JetBrains Mono",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
