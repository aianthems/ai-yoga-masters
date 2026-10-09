import { ImageResponse } from "next/og";

// Generated once at build time: no external images, fonts, or user input.
export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#101827", color: "#f6f7f5", padding: "64px 72px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "780px", zIndex: 1 }}>
        <div style={{ display: "flex", color: "#d4aa62", fontSize: 24, letterSpacing: 4 }}>ATTENTION · JUDGMENT · AGENCY</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 100, lineHeight: 1.05, fontWeight: 700 }}>AI Yoga Masters</div>
          <div style={{ display: "flex", fontSize: 34, lineHeight: 1.4, marginTop: 28, maxWidth: 660 }}>Ancient practice for intelligent tools.</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#76c7bf" }}>aiyogamasters.com</div>
      </div>
      <div style={{ position: "absolute", right: -110, top: 90, width: 480, height: 480, display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #6557a7", borderRadius: "50%" }}>
        <div style={{ display: "flex", width: 330, height: 330, alignItems: "center", justifyContent: "center", border: "3px solid #d4aa62", borderRadius: "50%" }}>
          <div style={{ display: "flex", width: 180, height: 180, alignItems: "center", justifyContent: "center", border: "3px solid #76c7bf", borderRadius: "50%" }}>
            <div style={{ width: 60, height: 60, background: "#d4aa62", borderRadius: "50%" }} />
          </div>
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
