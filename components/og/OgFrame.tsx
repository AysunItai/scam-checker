/* eslint-disable @next/next/no-img-element */
import { SITE_NAME } from "@/lib/seo";

interface OgFrameProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  accent?: "warm" | "cool" | "red";
}

export function OgFrame({
  eyebrow,
  title,
  subtitle,
  accent = "warm",
}: OgFrameProps) {
  const orb = {
    warm: "#f4b8a3",
    cool: "#cfd8ff",
    red: "#fca5a5",
  }[accent];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(160deg, #0b1220 0%, #11182b 55%, #0b1220 100%)",
        color: "#fafaf7",
        display: "flex",
        flexDirection: "column",
        padding: 72,
        position: "relative",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -180,
          left: -160,
          width: 620,
          height: 620,
          borderRadius: 9999,
          background: orb,
          opacity: 0.35,
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -260,
          right: -120,
          width: 540,
          height: 540,
          borderRadius: 9999,
          background: "#3b3a55",
          opacity: 0.5,
          filter: "blur(90px)",
        }}
      />

      {/* Brand row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 44,
            height: 44,
            borderRadius: 999,
            border: "2px solid rgba(255,255,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#fb923c",
              boxShadow: "0 0 22px 6px rgba(251, 146, 60, 0.6)",
            }}
          />
        </div>
        <div
          style={{
            fontSize: 24,
            letterSpacing: "-0.02em",
            color: "rgba(255,255,255,0.85)",
            display: "flex",
            alignItems: "baseline",
            gap: 6,
          }}
        >
          is this a{" "}
          <span style={{ fontFamily: "serif", fontStyle: "italic" }}>
            scam
          </span>
          ?
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 18,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#fb923c",
            }}
          />
          {eyebrow}
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 92,
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            fontWeight: 500,
            maxWidth: 1000,
            display: "flex",
          }}
        >
          {title}
        </div>

        {subtitle && (
          <div
            style={{
              marginTop: 28,
              fontSize: 28,
              lineHeight: 1.4,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 920,
              display: "flex",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 20,
          color: "rgba(255,255,255,0.55)",
        }}
      >
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <span>Free</span>
          <span>·</span>
          <span>No account</span>
          <span>·</span>
          <span>Nothing leaves your browser</span>
        </div>
        <div>{SITE_NAME.toLowerCase()}</div>
      </div>
    </div>
  );
}
