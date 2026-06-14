import Link from "next/link";
import { PostMeta, getCategoryName } from "@/lib/posts";

interface RelatedPostsProps {
  currentSlug: string;
  categorySlug: string;
  allPosts: PostMeta[];
}

export default function RelatedPosts({ currentSlug, categorySlug, allPosts }: RelatedPostsProps) {
  const related = allPosts
    .filter((p) => p.slug !== currentSlug && p.categorySlug === categorySlug)
    .slice(0, 3);

  const others = related.length < 3
    ? allPosts.filter((p) => p.slug !== currentSlug && p.categorySlug !== categorySlug).slice(0, 3 - related.length)
    : [];

  const posts = [...related, ...others];
  if (!posts.length) return null;

  return (
    <section className="mt-14 border-t border-gray-200 pt-10">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Keep Reading</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${post.slug}`}
            className="group block bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-md rounded-2xl p-5 transition-all"
          >
            <span className="text-xs font-semibold text-indigo-600 mb-2 block">
              {getCategoryName(post.categorySlug)}
            </span>
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug">
              {post.title}
            </h3>
            {post.rating && (
              <p className="text-xs text-amber-500 mt-2">{"★".repeat(Math.round(post.rating))} {post.rating}/5</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
