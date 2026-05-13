import { notFound } from "next/navigation";
import { requireActiveMember } from "@/lib/content/paywall";
import { ARTICLES, findArticle } from "@/lib/content/articles";
import ArticleLayout from "@/components/member/ArticleLayout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = findArticle(slug);
  return {
    title: a ? `${a.title} | MAMULAB Member` : "บทความ | MAMULAB",
    description: a?.excerpt,
  };
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await requireActiveMember();

  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const Content = article.Content;
  return (
    <ArticleLayout
      category={article.category}
      title={article.title}
      excerpt={article.excerpt}
      readMinutes={article.readMinutes}
      publishedAt={article.publishedAt}
    >
      <Content />
    </ArticleLayout>
  );
}
