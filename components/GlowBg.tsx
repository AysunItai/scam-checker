export function GlowBg({ variant = "warm" }: { variant?: "warm" | "cool" }) {
  const a = variant === "warm" ? "#fbd9a9" : "#cfd8ff";
  const b = variant === "warm" ? "#f4b8a3" : "#ffd2e7";
  const c = variant === "warm" ? "#e7e3d4" : "#c7e6e1";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="glow-orb animate-drift-slow"
        style={{
          background: a,
          width: 520,
          height: 520,
          top: -180,
          left: -120,
        }}
      />
      <div
        className="glow-orb animate-drift"
        style={{
          background: b,
          width: 420,
          height: 420,
          top: -60,
          right: -120,
          opacity: 0.45,
        }}
      />
      <div
        className="glow-orb animate-drift-slow"
        style={{
          background: c,
          width: 460,
          height: 460,
          bottom: -240,
          left: "30%",
          opacity: 0.35,
        }}
      />
    </div>
  );
}
