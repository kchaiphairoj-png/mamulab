import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 30% 30%, #1a1340 0%, #06071a 100%)",
          borderRadius: "16px",
          fontFamily: "serif",
          fontSize: 38,
          fontWeight: 700,
          color: "#f5e27d",
          backgroundImage:
            "linear-gradient(135deg, #f5e27d 0%, #c9a84c 50%, #f5e27d 100%)",
          backgroundClip: "text",
        }}
      >
        M
      </div>
    ),
    { ...size }
  );
}
