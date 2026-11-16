import { ImageResponse } from "next/og";

import { home } from "@/content/home.ts";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** 1200×630 Open Graph image, rendered at build time (no stock photos, no external fonts). */
export function renderOgImage(title: string) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        color: "#e9eef8",
        backgroundColor: "#060c1f",
        backgroundImage:
          "radial-gradient(circle at 85% 0%, rgba(34,211,238,0.35), transparent 55%), radial-gradient(circle at 0% 100%, rgba(45,212,191,0.25), transparent 50%)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "72px",
            height: "72px",
            borderRadius: "18px",
            fontSize: "30px",
            fontWeight: 700,
            color: "#03141c",
            backgroundImage: "linear-gradient(100deg, #22d3ee, #2dd4bf)",
          }}
        >
          NG
        </div>
        <div style={{ fontSize: "34px", fontWeight: 700 }}>Nayab Gull</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ fontSize: "68px", fontWeight: 700, lineHeight: 1.08, maxWidth: "980px" }}>
          {title}
        </div>
        <div style={{ fontSize: "30px", color: "#a7b3cc" }}>
          Websites · GoHighLevel CRM · AI automation
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "26px" }}>
        <div
          style={{ width: "14px", height: "14px", borderRadius: "999px", background: "#a3e635" }}
        />
        <div style={{ color: "#bef264" }}>{home.hero.primaryCta.label}</div>
      </div>
    </div>,
    OG_SIZE,
  );
}
