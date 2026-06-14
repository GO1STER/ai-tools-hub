import Link from "next/link";
import { PostMeta, getCategoryName } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
  featured?: boolean;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function readingTime(description: string): number {
  // Approximate: description word count × article multiplier
  const words = description.split(" ").length * 20;
  return Math.max(5, Math.round(words / 200));
}

const CATEGORY_COLORS: Record<string, string> = {
  "ai-video-tools":         "bg-violet-100 text-violet-700",
  "ai-voice-tts":           "bg-blue-100 text-blue-700",
  "ai-images-thumbnails":   "bg-pink-100 text-pink-700",
  "ai-scriptwriting-text":  "bg-amber-100 text-amber-700",
  "ai-workflows-automation":"bg-emerald-100 text-emerald-700",
};

const CATEGORY_ICONS: Record<string, string> = {
  "ai-video-tools": "🎬",
  "ai-voice-tts": "🎙️",
  "ai-images-thumbnails": "🖼️",
  "ai-scriptwriting-text": "✍️",
  "ai-workflows-automation": "⚡",
};

function isNew(dateStr: string): boolean {
  const diff = Date.now() - new Date(dateStr).getTime();
  return diff < 1000 * 60 * 60 * 24 * 30; // 30 days
}

export default function PostCard({ post }: PostCardProps) {
  const colorClass = CATEGORY_COLORS[post.categorySlug] ?? "bg-gray-100 text-gray-700";
  const icon = CATEGORY_ICONS[post.categorySlug] ?? "📄";
  const mins = readingTime(post.description);
  const fresh = isNew(post.updated ?? post.date);

  return (
    <article className="group bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden">
      {/* Category colour strip */}
      <div className={`h-1 w-full ${colorClass.split(" ")[0]}`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Meta row */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Link
            href={`/category/${post.categorySlug}`}
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${colorClass}`}
          >
            {icon} {getCategoryName(post.categorySlug)}
          </Link>
          {fresh && (
            <span className="text-xs font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">New</span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-base font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-3">
          <Link href={`/${post.slug}`}>{post.title}</Link>
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-5 line-clamp-2">{post.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            {post.rating && (
              <span className="text-xs font-semibold text-amber-500">
                ★ {post.rating}
              </span>
            )}
            <span className="text-xs text-gray-400">{mins} min read</span>
          </div>
          <Link
            href={`/${post.slug}`}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group-hover:gap-2 transition-all"
          >
            Read <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
