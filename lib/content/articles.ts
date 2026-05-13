import type { ComponentType } from "react";
import Pricing, { meta as pricingMeta } from "./articles/pricing";
import Mantra, { meta as mantraMeta } from "./articles/mantra";

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

/** Master registry of premium articles. Add new entries here as you write them. */
export const ARTICLES: ArticleEntry[] = [
  { ...pricingMeta, Content: Pricing },
  { ...mantraMeta, Content: Mantra },
];

export function findArticle(slug: string): ArticleEntry | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
