import Link from "next/link";
import { PostMeta, getCategoryName } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group bg-white rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col">
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Link
            href={`/category/${post.categorySlug}`}
            className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full hover:bg-indigo-200 transition-colors"
          >
            {getCategoryName(post.categorySlug)}
          </Link>
          {post.rating && (
            <span className="text-xs text-amber-600 font-medium">
              {"★".repeat(Math.round(post.rating))} {post.rating}/5
            </span>
          )}
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors leading-snug">
          <Link href={`/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">{post.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <time className="text-xs text-gray-400">{formatDate(post.date)}</time>
          <Link
            href={`/${post.slug}`}
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            Read more <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
