import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategoryName, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Breadcrumb from "@/components/Breadcrumb";
import AdSlot from "@/components/AdSlot";

export const revalidate = 3600;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const name = getCategoryName(slug);
  if (!name) return {};
  return {
    title: `${name} – AI Tools Reviews`,
    description: `Browse all reviews, comparisons, and tutorials about ${name} for content creators and YouTubers.`,
    alternates: { canonical: `/category/${slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const posts = getPostsByCategory(slug);
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicreatortools.com";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: category.name, item: `${SITE_URL}/category/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb crumbs={[{ label: category.name }]} />

        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">{category.name}</h1>
          <p className="text-lg text-gray-600">
            {posts.length} article{posts.length !== 1 ? "s" : ""} · Honest, hands-on reviews for content creators.
          </p>
        </header>

        <AdSlot slot="category-top" format="leaderboard" className="mb-10" />

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No articles yet in this category. Check back soon!</p>
          </div>
        )}
      </div>
    </>
  );
}
