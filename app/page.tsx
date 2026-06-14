import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, CATEGORIES } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import AdSlot from "@/components/AdSlot";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "AICreatorTools – Best AI Tools for YouTube & Video Creators",
  description:
    "Honest, hands-on reviews and comparisons of AI tools for content creators, YouTubers, and faceless video channels. Find the best tools for video, voice, thumbnails, scripts, and more.",
  alternates: { canonical: "/" },
};

const CATEGORY_ICONS: Record<string, string> = {
  "ai-video-tools": "🎬",
  "ai-voice-tts": "🎙️",
  "ai-images-thumbnails": "🖼️",
  "ai-scriptwriting-text": "✍️",
  "ai-workflows-automation": "⚡",
};

export default function HomePage() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AICreatorTools",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicreatortools.com",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Tested by real creators. No fluff.
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            The Best <span className="text-indigo-600">AI Tools</span> for<br />
            Content Creators
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Hands-on reviews, side-by-side comparisons, and step-by-step tutorials for YouTubers,
            faceless channel creators, and video marketers.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="bg-white border border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm"
              >
                {CATEGORY_ICONS[cat.slug]} {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AdSlot slot="homepage-top" format="leaderboard" className="mb-12" />

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-md rounded-2xl p-6 flex items-start gap-4 transition-all"
              >
                <span className="text-3xl">{CATEGORY_ICONS[cat.slug]}</span>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {posts.filter((p) => p.categorySlug === cat.slug).length} articles
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest posts */}
        {latestPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Reviews &amp; Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {latestPosts.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">Articles coming soon. Check back shortly!</p>
          </div>
        )}

        <AdSlot slot="homepage-bottom" format="leaderboard" className="mt-16" />
      </div>
    </>
  );
}
