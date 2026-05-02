// Lightweight analytics wrapper. No-ops when GA/FB Pixel are not loaded.
// Call this from any component — safe on SSR.

export type TrackEventName =
  | "birth_widget_opened"
  | "birth_date_submitted"
  | "birth_result_shown"
  | "birth_cta_clicked"
  | "birth_share_clicked";

type Params = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: TrackEventName, params: Params = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };
  try {
    w.gtag?.("event", name, params);
    w.fbq?.("trackCustom", name, params);
  } catch {
    // swallow — analytics should never break UI
  }
}
