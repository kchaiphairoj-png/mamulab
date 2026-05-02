import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MAMULAB – ห้องทดลองสายมูสำหรับแม่ค้าออนไลน์";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#06071a",
          backgroundImage:
            "radial-gradient(ellipse at 30% 30%, rgba(91,63,163,0.45), transparent 60%), radial-gradient(ellipse at 75% 75%, rgba(201,168,76,0.30), transparent 60%)",
          color: "white",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 8,
            color: "#c9a84c",
            textTransform: "uppercase",
          }}
        >
          Muketing Lab · Est. 2025
        </div>

        <div
          style={{
            fontSize: 144,
            fontWeight: 700,
            marginTop: 24,
            backgroundImage:
              "linear-gradient(135deg, #f5e27d 0%, #c9a84c 50%, #f5e27d 100%)",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: 4,
            display: "flex",
          }}
        >
          MAMULAB
        </div>

        <div
          style={{
            fontSize: 44,
            marginTop: 24,
            color: "rgba(255,255,255,0.92)",
            display: "flex",
          }}
        >
          ห้องทดลองสายมูสำหรับแม่ค้าออนไลน์
        </div>

        <div
          style={{
            fontSize: 28,
            marginTop: 16,
            color: "rgba(245,226,125,0.75)",
            display: "flex",
          }}
        >
          ศาสตร์ตัวเลข × มูเก็ตติ้ง × ระบบคอนเทนต์
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 24,
            color: "rgba(255,255,255,0.5)",
            letterSpacing: 4,
          }}
        >
          mamulab.com
        </div>
      </div>
    ),
    { ...size }
  );
}
