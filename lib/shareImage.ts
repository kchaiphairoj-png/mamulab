/**
 * shareImage — generate a downloadable shareable image of the shop name
 * result, client-side via Canvas. Supports Story (9:16) and Feed (1:1).
 *
 * Design tokens match the site:
 *   - Background : deep midnight + violet/gold radial accents
 *   - Accent     : gold gradient
 *   - Font       : whatever body font is loaded (Prompt + Cinzel via next/font)
 *
 * Everything is rendered with the 2D Canvas API — no external deps.
 */

import type { ShopNameAnalysis } from "./nameAnalyzer";
import {
  NAME_MEANINGS,
  MASTER_MEANINGS,
  colorHex,
} from "./nameMeanings";

export type ShareFormat = "story" | "feed";

type Size = { w: number; h: number };

const SIZES: Record<ShareFormat, Size> = {
  story: { w: 1080, h: 1920 },
  feed: { w: 1080, h: 1080 },
};

// Read the resolved font family from <body> so Canvas uses the same Thai-capable
// font that the site already loads. Fallbacks keep it working on SSR/edge.
function getBodyFonts(): { sans: string; display: string } {
  if (typeof window === "undefined") {
    return {
      sans: "system-ui, sans-serif",
      display: "Georgia, serif",
    };
  }
  const sans = getComputedStyle(document.body).fontFamily || "sans-serif";
  // Display font is on heading elements — sample an h1 if available
  let display = sans;
  const h = document.querySelector(".font-display") as HTMLElement | null;
  if (h) display = getComputedStyle(h).fontFamily || sans;
  return { sans, display };
}

/** Build the result image and trigger a download. */
export async function downloadShareImage(
  analysis: ShopNameAnalysis,
  format: ShareFormat
): Promise<void> {
  // Wait for fonts before drawing so Thai renders properly
  if (typeof document !== "undefined" && "fonts" in document) {
    try {
      await document.fonts.ready;
    } catch {
      // ignore — fall back to default fonts
    }
  }

  const size = SIZES[format];
  const canvas = document.createElement("canvas");
  canvas.width = size.w;
  canvas.height = size.h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas-not-supported");

  draw(ctx, analysis, format, size);

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/png", 0.95)
  );
  if (!blob) throw new Error("toBlob-failed");

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `mamulab-shopname-${format}.png`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Free memory after a tick
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function draw(
  ctx: CanvasRenderingContext2D,
  analysis: ShopNameAnalysis,
  format: ShareFormat,
  size: Size
) {
  const { w, h } = size;
  const fonts = getBodyFonts();
  const isStory = format === "story";

  // ---------- Background ----------
  // Deep gradient base
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#06071a");
  bg.addColorStop(0.5, "#0a0b1e");
  bg.addColorStop(1, "#13152e");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Violet glow top-right
  const violet = ctx.createRadialGradient(
    w * 0.75,
    h * 0.18,
    0,
    w * 0.75,
    h * 0.18,
    w * 0.7
  );
  violet.addColorStop(0, "rgba(91,63,163,0.4)");
  violet.addColorStop(1, "transparent");
  ctx.fillStyle = violet;
  ctx.fillRect(0, 0, w, h);

  // Gold glow bottom-left
  const gold = ctx.createRadialGradient(
    w * 0.25,
    h * 0.82,
    0,
    w * 0.25,
    h * 0.82,
    w * 0.7
  );
  gold.addColorStop(0, "rgba(201,168,76,0.28)");
  gold.addColorStop(1, "transparent");
  ctx.fillStyle = gold;
  ctx.fillRect(0, 0, w, h);

  // Outer border
  ctx.strokeStyle = "rgba(201,168,76,0.4)";
  ctx.lineWidth = 4;
  const inset = isStory ? 40 : 32;
  roundRect(ctx, inset, inset, w - inset * 2, h - inset * 2, 28);
  ctx.stroke();

  // ---------- Watermark (top-left) ----------
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillStyle = "rgba(201,168,76,0.8)";
  ctx.font = `600 ${isStory ? 30 : 26}px ${fonts.display}`;
  ctx.fillText("MAMULAB", isStory ? 80 : 64, isStory ? 80 : 64);

  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.font = `400 ${isStory ? 18 : 16}px ${fonts.sans}`;
  ctx.fillText(
    "MUKETING LAB",
    isStory ? 80 : 64,
    (isStory ? 80 : 64) + (isStory ? 38 : 32)
  );

  // ---------- Shop name section ----------
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = `400 ${isStory ? 22 : 20}px ${fonts.sans}`;
  ctx.fillText("ชื่อร้าน", w / 2, isStory ? 230 : 180);

  // Divider
  ctx.strokeStyle = "rgba(201,168,76,0.4)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  const dividerY = isStory ? 270 : 215;
  ctx.moveTo(w / 2 - 60, dividerY);
  ctx.lineTo(w / 2 + 60, dividerY);
  ctx.stroke();

  // Shop name — fit-to-width
  const shopFontSize = isStory ? 64 : 56;
  ctx.fillStyle = "#ffffff";
  drawFittedText(ctx, analysis.shopName, {
    x: w / 2,
    y: isStory ? 340 : 270,
    maxWidth: w - (isStory ? 200 : 160),
    fontSize: shopFontSize,
    fontFamily: fonts.display,
    weight: 600,
  });

  // ---------- Big number ----------
  const numberY = isStory ? 700 : 520;
  drawGoldNumber(
    ctx,
    formatNumberLabel(analysis),
    w / 2,
    numberY,
    isStory ? 360 : 280,
    fonts.display
  );

  // ---------- Title + Subtitle ----------
  const meaning = NAME_MEANINGS[
    analysis.primaryReducedTo ?? analysis.primaryValue
  ];
  const master = MASTER_MEANINGS[analysis.primaryValue];

  const titleY = isStory ? 1090 : 770;
  ctx.fillStyle = "#f5e27d";
  ctx.font = `600 ${isStory ? 56 : 44}px ${fonts.display}`;
  ctx.fillText(master ? master.title : meaning.title, w / 2, titleY);

  ctx.fillStyle = "rgba(255,255,255,0.78)";
  ctx.font = `400 ${isStory ? 30 : 26}px ${fonts.sans}`;
  const subtitleText = master ? master.subtitle : meaning.subtitle;
  drawWrappedText(ctx, subtitleText, {
    x: w / 2,
    y: titleY + (isStory ? 70 : 60),
    maxWidth: w - (isStory ? 220 : 180),
    lineHeight: isStory ? 42 : 36,
    maxLines: 2,
  });

  // ---------- Color swatches ----------
  const colorY = isStory ? 1340 : 940;
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = `400 ${isStory ? 22 : 20}px ${fonts.sans}`;
  ctx.fillText("สีเสริมพลัง", w / 2, colorY);

  const palette = meaning.colors.primary.slice(0, 3);
  const swatchSize = isStory ? 48 : 40;
  const gap = isStory ? 24 : 20;
  const labelFontSize = isStory ? 28 : 24;
  ctx.font = `500 ${labelFontSize}px ${fonts.sans}`;
  const namesWidth = palette.reduce(
    (acc, n) => acc + ctx.measureText(n).width,
    0
  );
  const totalWidth =
    palette.length * swatchSize +
    palette.length * 12 + // gap between dot and label
    namesWidth +
    (palette.length - 1) * gap;
  let cx = w / 2 - totalWidth / 2;
  const swatchY = colorY + (isStory ? 56 : 48);
  palette.forEach((name, idx) => {
    // dot
    ctx.fillStyle = colorHex(name);
    ctx.beginPath();
    ctx.arc(cx + swatchSize / 2, swatchY + swatchSize / 2, swatchSize / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.lineWidth = 2;
    ctx.stroke();
    // label
    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(name, cx + swatchSize + 12, swatchY + swatchSize / 2 + 2);
    cx += swatchSize + 12 + ctx.measureText(name).width + gap;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
  });

  // ---------- Tip (one line) ----------
  const tip = shortenTip(meaning.contentTip);
  const tipY = isStory ? 1500 : 1070;
  ctx.fillStyle = "rgba(245,226,125,0.75)";
  ctx.font = `400 ${isStory ? 22 : 20}px ${fonts.sans}`;
  ctx.fillText("เคล็ดมูเก็ตติ้ง", w / 2, tipY);

  ctx.fillStyle = "rgba(255,255,255,0.85)";
  ctx.font = `400 italic ${isStory ? 30 : 26}px ${fonts.sans}`;
  drawWrappedText(ctx, `"${tip}"`, {
    x: w / 2,
    y: tipY + (isStory ? 56 : 48),
    maxWidth: w - (isStory ? 220 : 180),
    lineHeight: isStory ? 44 : 38,
    maxLines: 3,
  });

  // ---------- Bottom CTA ----------
  const ctaY = h - (isStory ? 180 : 140);
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = `400 ${isStory ? 26 : 22}px ${fonts.sans}`;
  ctx.fillText("วิเคราะห์ชื่อร้านของคุณฟรี", w / 2, ctaY);

  ctx.fillStyle = "#f5e27d";
  ctx.font = `600 ${isStory ? 38 : 32}px ${fonts.display}`;
  ctx.fillText("mamulab.com", w / 2, ctaY + (isStory ? 44 : 36));
}

// ---------- Helpers ----------

function formatNumberLabel(a: ShopNameAnalysis): string {
  if (a.primaryReducedTo) {
    return `${a.primaryValue}/${a.primaryReducedTo}`;
  }
  return String(a.primaryValue);
}

function shortenTip(tip: string): string {
  // Take first sentence-ish; cap at ~90 chars
  const firstStop = tip.search(/[—\-\n]/);
  let s = firstStop > 0 ? tip.slice(0, firstStop) : tip;
  s = s.trim();
  if (s.length > 90) s = s.slice(0, 88).trimEnd() + "…";
  return s;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawFittedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  opts: {
    x: number;
    y: number;
    maxWidth: number;
    fontSize: number;
    fontFamily: string;
    weight?: number;
  }
) {
  let fontSize = opts.fontSize;
  while (fontSize > 18) {
    ctx.font = `${opts.weight ?? 400} ${fontSize}px ${opts.fontFamily}`;
    if (ctx.measureText(text).width <= opts.maxWidth) break;
    fontSize -= 4;
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(text, opts.x, opts.y);
}

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  opts: {
    x: number;
    y: number;
    maxWidth: number;
    lineHeight: number;
    maxLines: number;
  }
) {
  const words = text.split(/(\s+)/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const next = current + word;
    if (ctx.measureText(next).width > opts.maxWidth && current.trim()) {
      lines.push(current.trim());
      current = word.trimStart();
      if (lines.length === opts.maxLines - 1) break;
    } else {
      current = next;
    }
  }
  if (current.trim() && lines.length < opts.maxLines) {
    lines.push(current.trim());
  }
  // If text was longer, append ellipsis to last line
  const used = lines.join(" ");
  if (used.length < text.replace(/\s+/g, " ").length) {
    const last = lines[lines.length - 1];
    if (last && !last.endsWith("…")) {
      lines[lines.length - 1] = last.replace(/[.,…]+$/, "") + "…";
    }
  }
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  lines.forEach((line, i) => {
    ctx.fillText(line, opts.x, opts.y + i * opts.lineHeight);
  });
}

function drawGoldNumber(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  size: number,
  fontFamily: string
) {
  // Drop-shadow halo behind the number
  ctx.save();
  const halo = ctx.createRadialGradient(cx, cy, size * 0.1, cx, cy, size);
  halo.addColorStop(0, "rgba(245,226,125,0.35)");
  halo.addColorStop(1, "transparent");
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(cx, cy, size, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Gold gradient text
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `700 ${size}px ${fontFamily}`;
  const grad = ctx.createLinearGradient(
    cx - size * 0.5,
    cy - size * 0.5,
    cx + size * 0.5,
    cy + size * 0.5
  );
  grad.addColorStop(0, "#f5e27d");
  grad.addColorStop(0.5, "#c9a84c");
  grad.addColorStop(1, "#f5e27d");
  ctx.fillStyle = grad;
  ctx.fillText(text, cx, cy);
  ctx.restore();
}
