import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AICreatorTools – Best AI Tools for YouTube Creators";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #4c1d95 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          padding: "60px",
        }}
      >
        {/* Logo block */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "36px",
          }}
        >
          <div
            style={{
              background: "#4f46e5",
              borderRadius: "16px",
              width: "64px",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              fontWeight: 900,
              color: "white",
              border: "2px solid rgba(255,255,255,0.2)",
            }}
          >
            AI
          </div>
          <span style={{ fontSize: "40px", fontWeight: 800, color: "white" }}>
            Creator<span style={{ color: "#a5b4fc" }}>Tools</span>
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "52px",
            fontWeight: 900,
            color: "white",
            textAlign: "center",
            lineHeight: 1.15,
            marginBottom: "24px",
            maxWidth: "900px",
          }}
        >
          The Best AI Tools for YouTube Creators
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: "26px",
            color: "#c7d2fe",
            textAlign: "center",
            marginBottom: "48px",
          }}
        >
          Honest reviews · Hands-on testing · No sponsored rankings
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["🎬 AI Video", "🎙️ AI Voice", "🖼️ Thumbnails", "✍️ Scripts", "⚡ Automation"].map((label) => (
            <div
              key={label}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "100px",
                padding: "10px 22px",
                fontSize: "18px",
                color: "white",
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
