import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getCategoryName } from "@/lib/posts";
import Breadcrumb from "@/components/Breadcrumb";
import AdSlot from "@/components/AdSlot";
import RatingStars from "@/components/RatingStars";
import TableOfContents from "@/components/TableOfContents";
import RelatedPosts from "@/components/RelatedPosts";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicreatortools.com";
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicreatortools.com";

  // Dynamic import of the MDX file
  let MdxContent: React.ComponentType;
  try {
    const mdxModule = await import(`../../content/${slug}.mdx`);
    MdxContent = mdxModule.default;
  } catch {
    notFound();
  }

  const allPosts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Organization", name: "AICreatorTools" },
    publisher: { "@type": "Organization", name: "AICreatorTools", url: SITE_URL },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${post.slug}` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: getCategoryName(post.categorySlug), item: `${SITE_URL}/category/${post.categorySlug}` },
        { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/${post.slug}` },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-10">
          {/* Main content */}
          <div className="flex-1 min-w-0 max-w-3xl">
            <Breadcrumb
              crumbs={[
                { label: getCategoryName(post.categorySlug), href: `/category/${post.categorySlug}` },
                { label: post.title },
              ]}
            />

            <header className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full">
                  {getCategoryName(post.categorySlug)}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{post.title}</h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">{post.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-b border-gray-100 py-3">
                <span>Published: <time dateTime={post.date}>{formatDate(post.date)}</time></span>
                {post.updated && (
                  <span>Updated: <time dateTime={post.updated}>{formatDate(post.updated)}</time></span>
                )}
              </div>
            </header>

            <TableOfContents />

            {/* First ad */}
            <AdSlot slot="article-top" format="rectangle" className="mb-8" />

            {/* MDX content */}
            <div className="prose max-w-none">
              <MdxContent />
            </div>

            {/* Bottom ad */}
            <AdSlot slot="article-bottom" format="rectangle" className="mt-10" />

            <RelatedPosts
              currentSlug={post.slug}
              categorySlug={post.categorySlug}
              allPosts={allPosts}
            />
          </div>

          {/* Sidebar */}
          <aside className="hidden xl:block w-72 shrink-0">
            <div className="sticky top-24 space-y-6">
              <AdSlot slot="sidebar-1" format="skyscraper" />
              <div className="bg-indigo-50 rounded-2xl p-5">
                <h3 className="font-bold text-gray-900 mb-3">Quick Summary</h3>
                {post.rating && <RatingStars rating={post.rating} label="Overall score" />}
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{post.description}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
