import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
      <p className="text-7xl font-black text-indigo-100 mb-2 select-none">404</p>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Page not found</h1>
      <p className="text-gray-500 mb-10 text-lg">
        That URL doesn&apos;t exist — maybe it was moved or you followed an old link.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
        <Link
          href="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          ← Go to homepage
        </Link>
        <Link
          href="/category/ai-video-tools"
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-6 py-3 rounded-xl transition-colors"
        >
          Browse reviews
        </Link>
      </div>

      {posts.length > 0 && (
        <div className="text-left">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Popular articles</p>
          <ul className="space-y-3">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${p.slug}`}
                  className="group flex items-start gap-3 bg-white border border-gray-200 hover:border-indigo-300 rounded-xl p-4 transition-all hover:shadow-sm"
                >
                  <span className="text-2xl shrink-0">
                    {p.categorySlug === "ai-video-tools" ? "🎬" :
                     p.categorySlug === "ai-voice-tts" ? "🎙️" :
                     p.categorySlug === "ai-images-thumbnails" ? "🖼️" :
                     p.categorySlug === "ai-scriptwriting-text" ? "✍️" : "⚡"}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors leading-snug">
                      {p.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{p.category}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
