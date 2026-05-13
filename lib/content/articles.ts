import type { ComponentType } from "react";
import Pricing, { meta as pricingMeta } from "./articles/pricing";
import Mantra, { meta as mantraMeta } from "./articles/mantra";
import Colors, { meta as colorsMeta } from "./articles/colors";
import Bio, { meta as bioMeta } from "./articles/bio";
import LiveScripts, { meta as liveScriptsMeta } from "./articles/liveScripts";

export type ArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  publishedAt: string;
};

export type ArticleEntry = ArticleMeta & {
  Content: ComponentType;
};

/** Master registry of premium articles. Newest first. */
export const ARTICLES: ArticleEntry[] = [
  { ...colorsMeta, Content: Colors },
  { ...bioMeta, Content: Bio },
  { ...liveScriptsMeta, Content: LiveScripts },
  { ...pricingMeta, Content: Pricing },
  { ...mantraMeta, Content: Mantra },
];

export function findArticle(slug: string): ArticleEntry | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
