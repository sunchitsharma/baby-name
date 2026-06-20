"use client";

export default function Background({ tint = "cyan" }: { tint?: "cyan" | "pink" }) {
  const blobs =
    tint === "pink"
      ? [
          { w: 720, h: 720, top: -180, left: -200, bg: "rgba(255,94,156,0.13)" },
          { w: 540, h: 540, bottom: 20, right: -120, bg: "rgba(192,97,255,0.10)" },
          { w: 360, h: 360, top: "42%", left: "52%", bg: "rgba(52,245,255,0.05)" },
        ]
      : [
          { w: 720, h: 720, top: -180, left: -220, bg: "rgba(192,97,255,0.11)" },
          { w: 540, h: 540, bottom: 20, right: -120, bg: "rgba(52,245,255,0.09)" },
          { w: 360, h: 360, top: "45%", left: "55%", bg: "rgba(255,94,156,0.05)" },
        ];

  return (
    <>
      <div className="stars" />
      {blobs.map((b, i) => (
        <div
          key={i}
          className="nebula"
          style={{
            width: b.w,
            height: b.h,
            top: b.top,
            left: b.left,
            right: b.right,
            bottom: b.bottom,
            background: b.bg,
            transform: b.left === "52%" || b.left === "55%" ? "translate(-50%,-50%)" : undefined,
          }}
        />
      ))}
      <div className="vignette" />
      <div className="grain" />
    </>
  );
}
