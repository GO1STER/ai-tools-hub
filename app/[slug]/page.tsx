import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, getCategoryName } from "@/lib/posts";
import Breadcrumb from "@/components/Breadcrumb";
import AdSlot from "@/components/AdSlot";
import RatingStars from "@/components/RatingStars";
import TableOfContents from "@/components/TableOfContents";
import RelatedPosts from "@/components/RelatedPosts";
import ReadingProgress from "@/components/ReadingProgress";
import ShareButtons from "@/components/ShareButtons";
import BackToTop from "@/components/BackToTop";
import NewsletterForm from "@/components/NewsletterForm";

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
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aicreatoredge.com";
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

function readingTime(description: string): number {
  const words = description.split(" ").length * 20;
  return Math.max(5, Math.round(words / 200));
}

const CATEGORY_COLORS: Record<string, string> = {
  "ai-video-tools":          "bg-violet-100 text-violet-700",
  "ai-voice-tts":            "bg-blue-100 text-blue-700",
  "ai-images-thumbnails":    "bg-pink-100 text-pink-700",
  "ai-scriptwriting-text":   "bg-amber-100 text-amber-700",
  "ai-workflows-automation": "bg-emerald-100 text-emerald-700",
};

const CATEGORY_ICONS: Record<string, string> = {
  "ai-video-tools": "🎬",
  "ai-voice-tts": "🎙️",
  "ai-images-thumbnails": "🖼️",
  "ai-scriptwriting-text": "✍️",
  "ai-workflows-automation": "⚡",
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aicreatoredge.com";
  const colorClass = CATEGORY_COLORS[post.categorySlug] ?? "bg-gray-100 text-gray-700";
  const icon = CATEGORY_ICONS[post.categorySlug] ?? "📄";
  const mins = readingTime(post.description);

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
    author: { "@type": "Organization", name: "AICreatorEdge" },
    publisher: { "@type": "Organization", name: "AICreatorEdge", url: SITE_URL },
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
      <ReadingProgress />
      <BackToTop />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex gap-12">

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0 max-w-3xl">
            <Breadcrumb
              crumbs={[
                { label: getCategoryName(post.categorySlug), href: `/category/${post.categorySlug}` },
                { label: post.title },
              ]}
            />

            {/* Article header */}
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${colorClass}`}>
                  {icon} {getCategoryName(post.categorySlug)}
                </span>
                {post.rating && (
                  <span className="text-xs font-semibold bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full border border-amber-200">
                    ★ {post.rating}/5
                  </span>
                )}
                <span className="text-xs text-gray-400 font-medium">{mins} min read</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight tracking-tight">
                {post.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-5">{post.description}</p>

              {/* Meta bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-b border-gray-100">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </span>
                  {post.updated && post.updated !== post.date && (
                    <span className="flex items-center gap-1 text-indigo-600 font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Updated {formatDate(post.updated)}
                    </span>
                  )}
                </div>
                <ShareButtons title={post.title} slug={post.slug} />
              </div>
            </header>

            <TableOfContents />

            <AdSlot slot="article-top" format="rectangle" className="mb-8" />

            {/* MDX content */}
            <div className="prose prose-lg max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-code:text-sm prose-code:font-mono">
              <MdxContent />
            </div>

            {/* Share after reading */}
            <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-200">
              <p className="font-bold text-gray-900 mb-1">Found this useful?</p>
              <p className="text-sm text-gray-500 mb-4">Share it with other creators who might need it.</p>
              <ShareButtons title={post.title} slug={post.slug} />
            </div>

            <AdSlot slot="article-bottom" format="rectangle" className="mt-10 mb-10" />

            {/* Newsletter inline */}
            <div className="mb-12">
              <NewsletterForm />
            </div>

            <RelatedPosts
              currentSlug={post.slug}
              categorySlug={post.categorySlug}
              allPosts={allPosts}
            />
          </div>

          {/* ── Sidebar ── */}
          <aside className="hidden xl:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              {post.rating && (
                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Our Verdict</p>
                  <RatingStars rating={post.rating} label="Overall score" />
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>Quality</span>
                      <span className="font-semibold text-gray-700">{Math.min(5, post.rating + 0.1).toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                      <span>Value</span>
                      <span className="font-semibold text-gray-700">{Math.max(3.5, post.rating - 0.3).toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Ease of use</span>
                      <span className="font-semibold text-gray-700">{Math.max(3.8, post.rating - 0.1).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              )}

              <AdSlot slot="sidebar-1" format="skyscraper" />

              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Newsletter</p>
                <p className="text-sm text-gray-700 font-medium mb-1">New reviews weekly</p>
                <p className="text-xs text-gray-500 mb-3">No spam. Unsubscribe anytime.</p>
                <NewsletterForm compact />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
