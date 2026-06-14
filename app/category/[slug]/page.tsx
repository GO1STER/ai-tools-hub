import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategoryName, getPostsByCategory } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import Breadcrumb from "@/components/Breadcrumb";
import AdSlot from "@/components/AdSlot";
import NewsletterForm from "@/components/NewsletterForm";

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
    title: `${name} – Reviews & Guides`,
    description: `Honest, hands-on reviews and tutorials about ${name} for YouTube creators and faceless channel operators.`,
    alternates: { canonical: `/category/${slug}` },
  };
}

const CATEGORY_CONFIG: Record<string, { gradient: string; icon: string; description: string }> = {
  "ai-video-tools": {
    gradient: "from-violet-600 to-purple-700",
    icon: "🎬",
    description: "AI video generators, avatar tools, and editors. We test output quality, credit systems, and real production workflows.",
  },
  "ai-voice-tts": {
    gradient: "from-blue-600 to-cyan-700",
    icon: "🎙️",
    description: "Text-to-speech engines and voice cloning tools for YouTube voiceovers. Ranked by naturalness, language support, and price.",
  },
  "ai-images-thumbnails": {
    gradient: "from-pink-600 to-rose-700",
    icon: "🖼️",
    description: "AI image generators and thumbnail tools built for click-through. We measure CTR impact, not just aesthetic quality.",
  },
  "ai-scriptwriting-text": {
    gradient: "from-amber-500 to-orange-600",
    icon: "✍️",
    description: "AI script writers and copywriting tools tested on real YouTube formats — hooks, B-roll scripts, descriptions, and titles.",
  },
  "ai-workflows-automation": {
    gradient: "from-emerald-600 to-teal-700",
    icon: "⚡",
    description: "SEO tools, automation workflows, and channel management software that save creators 10+ hours per week.",
  },
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const posts = getPostsByCategory(slug);
  const config = CATEGORY_CONFIG[slug] ?? {
    gradient: "from-indigo-600 to-violet-700",
    icon: "📄",
    description: "Honest reviews and tutorials for content creators.",
  };
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aicreatoredge.com";

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

      {/* Colored category hero */}
      <div className={`bg-gradient-to-br ${config.gradient} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <Breadcrumb
            crumbs={[{ label: category.name }]}
            light
          />
          <div className="flex items-center gap-4 mt-4 mb-3">
            <span className="text-4xl">{config.icon}</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">{category.name}</h1>
          </div>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mb-5">{config.description}</p>
          <div className="flex items-center gap-3 text-sm text-white/70">
            <span className="bg-white/20 px-3 py-1 rounded-full font-medium">
              {posts.length} article{posts.length !== 1 ? "s" : ""}
            </span>
            <span>Updated regularly · Affiliate links disclosed</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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

        <div className="mt-16">
          <NewsletterForm />
        </div>
      </div>
    </>
  );
}
