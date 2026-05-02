export const SITE_URL = "https://mamulab.com";

export const SOCIAL = {
  line:
    process.env.NEXT_PUBLIC_LINE_OA_URL || "https://lin.ee/your-line-id",
  facebook:
    process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/mamulab",
  tiktok:
    process.env.NEXT_PUBLIC_TIKTOK_URL ||
    "https://www.tiktok.com/@mamulab",
  instagram:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
    "https://instagram.com/mamulab",
};

export const ANALYTICS = {
  gaId: process.env.NEXT_PUBLIC_GA_ID,
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
};
