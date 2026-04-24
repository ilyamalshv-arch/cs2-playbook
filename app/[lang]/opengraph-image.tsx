import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CS2 Playbook — technique · tactics · callouts · mental";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          background: "#0a0a0a",
          color: "#e8e8e8",
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(245,166,35,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* radial vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)",
          }}
        />

        {/* top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, zIndex: 10 }}>
          <svg width="36" height="36" viewBox="0 0 36 36">
            <line x1="18" y1="4" x2="18" y2="14" stroke="#F5A623" strokeWidth="2" />
            <line x1="18" y1="22" x2="18" y2="32" stroke="#F5A623" strokeWidth="2" />
            <line x1="4" y1="18" x2="14" y2="18" stroke="#F5A623" strokeWidth="2" />
            <line x1="22" y1="18" x2="32" y2="18" stroke="#F5A623" strokeWidth="2" />
            <circle cx="18" cy="18" r="2" fill="#F5A623" />
          </svg>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              color: "#888",
              display: "flex",
            }}
          >
            CS2.PLAYBOOK · v0.1
          </div>
        </div>

        {/* main title */}
        <div style={{ display: "flex", flexDirection: "column", zIndex: 10 }}>
          <div
            style={{
              fontSize: 28,
              letterSpacing: 8,
              color: "#F5A623",
              marginBottom: 20,
              display: "flex",
            }}
          >
            // RADAR BRIEFING
          </div>
          <div
            style={{
              fontSize: 180,
              lineHeight: 0.85,
              fontWeight: 900,
              color: "#fff",
              letterSpacing: -2,
              display: "flex",
            }}
          >
            THE
          </div>
          <div
            style={{
              fontSize: 180,
              lineHeight: 0.85,
              fontWeight: 900,
              color: "#F5A623",
              letterSpacing: -2,
              display: "flex",
            }}
          >
            PLAYBOOK
          </div>
          <div
            style={{
              fontSize: 28,
              letterSpacing: 6,
              color: "#888",
              marginTop: 24,
              display: "flex",
            }}
          >
            technique · tactics · callouts · mental
          </div>
        </div>

        {/* bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#555",
            letterSpacing: 3,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ color: "#2ECC71" }}>● LIVE</span>
            <span>EN / RU / ES</span>
          </div>
          <div style={{ color: "#F5A623" }}>cs2playbook ▸</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
