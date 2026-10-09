import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div style={{ width: 180, height: 180, display: "flex", alignItems: "center", justifyContent: "center", background: "#101827" }}>
      <div style={{ width: 130, height: 130, display: "flex", alignItems: "center", justifyContent: "center", border: "8px solid #d4aa62", borderRadius: "50%" }}>
        <div style={{ width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center", border: "8px solid #76c7bf", borderRadius: "50%" }}>
          <div style={{ width: 32, height: 32, background: "#d4aa62", borderRadius: "50%" }} />
        </div>
      </div>
    </div>,
    { width: 180, height: 180 },
  );
}
