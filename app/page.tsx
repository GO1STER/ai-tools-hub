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

const CATEGORY_META: Record<string, { icon: string; desc: string; color: string }> = {
  "ai-video-tools":        { icon: "🎬", desc: "Generate & edit video with AI", color: "bg-violet-50 border-violet-200 text-violet-700" },
  "ai-voice-tts":          { icon: "🎙️", desc: "Voiceover, cloning & TTS",      color: "bg-blue-50 border-blue-200 text-blue-700" },
  "ai-images-thumbnails":  { icon: "🖼️", desc: "Thumbnails & AI image tools",   color: "bg-pink-50 border-pink-200 text-pink-700" },
  "ai-scriptwriting-text": { icon: "✍️", desc: "Scripts, hooks & copywriting",  color: "bg-amber-50 border-amber-200 text-amber-700" },
  "ai-workflows-automation":{ icon: "⚡", desc: "Automate & scale your channel", color: "bg-emerald-50 border-emerald-200 text-emerald-700" },
};

const STATS = [
  { value: "12+", label: "Tools reviewed" },
  { value: "5", label: "Categories covered" },
  { value: "100%", label: "Hands-on tested" },
  { value: "0", label: "Sponsored reviews" },
];

export default function HomePage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const latestPosts = posts.slice(1, 7);

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicreatortools.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AICreatorTools",
    url: SITE_URL,
    description: "Honest AI tool reviews for YouTube creators and faceless channel operators.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-800 to-violet-900 text-white py-24 px-4">
        {/* decorative blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-indigo-100 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Tested by real creators · Updated June 2025
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
            The Best <span className="text-indigo-300">AI Tools</span> for<br />
            YouTube Creators
          </h1>
          <p className="text-lg sm:text-xl text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Hands-on reviews, honest comparisons, and step-by-step tutorials.
            We test every tool so you spend money on what actually works.
          </p>

          <div className="flex flex-wrap gap-2.5 justify-center">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="bg-white/10 border border-white/20 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm"
              >
                {CATEGORY_META[cat.slug]?.icon} {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-extrabold text-indigo-600">{s.value}</p>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* ── Featured article ── */}
        {featured && (
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Editor&apos;s Pick</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <Link
              href={`/${featured.slug}`}
              className="group block bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 hover:border-indigo-300 rounded-3xl p-8 sm:p-10 transition-all hover:shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <span className="inline-block text-xs font-bold bg-indigo-600 text-white px-3 py-1 rounded-full w-fit">
                  {featured.category}
                </span>
                {featured.rating && (
                  <span className="text-sm text-amber-500 font-semibold">
                    {"★".repeat(Math.round(featured.rating))} {featured.rating}/5
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 group-hover:text-indigo-700 transition-colors mb-3 leading-snug">
                {featured.title}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-2xl">{featured.description}</p>
              <span className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm group-hover:gap-3 transition-all">
                Read full review <span>→</span>
              </span>
            </Link>
          </section>
        )}

        <AdSlot slot="homepage-top" format="leaderboard" className="mb-14" />

        {/* ── Categories ── */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-xl font-bold text-gray-900">Browse by Category</h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {CATEGORIES.map((cat) => {
              const meta = CATEGORY_META[cat.slug];
              const count = posts.filter((p) => p.categorySlug === cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`group border rounded-2xl p-5 flex flex-col gap-2 transition-all hover:shadow-md hover:-translate-y-0.5 ${meta.color}`}
                >
                  <span className="text-2xl">{meta.icon}</span>
                  <h3 className="font-bold text-sm leading-snug group-hover:underline">{cat.name}</h3>
                  <p className="text-xs opacity-70">{meta.desc}</p>
                  <p className="text-xs font-semibold opacity-60 mt-auto">{count} articles</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Latest articles ── */}
        {latestPosts.length > 0 && (
          <section className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold text-gray-900">Latest Reviews &amp; Guides</h2>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        <AdSlot slot="homepage-bottom" format="leaderboard" className="mb-14" />

        {/* ── Trust section ── */}
        <section className="bg-gray-50 border border-gray-200 rounded-3xl p-8 sm:p-10 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-3">How We Review AI Tools</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed mb-8">
            Every tool on this site is tested hands-on for a minimum of two weeks on real content projects.
            We evaluate output quality, pricing transparency, API reliability, and long-term value.
            Affiliate relationships never influence our scores.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: "🔬", title: "Real-world testing", desc: "Minimum 2 weeks per tool on actual content workflows" },
              { icon: "💰", title: "Honest pricing", desc: "We expose hidden costs and credit system gotchas" },
              { icon: "📊", title: "Data-backed", desc: "CTR results, output quality scores, and time savings measured" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-2">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 text-center leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
