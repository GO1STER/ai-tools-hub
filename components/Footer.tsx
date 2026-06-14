import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <span className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-lg text-white text-sm font-black shrink-0">AI</span>
              <span>Creator<span className="text-indigo-400">Edge</span></span>
            </Link>
            <p className="text-sm leading-relaxed mb-2">
              Honest reviews and tutorials of AI tools for YouTube creators, faceless channels, and video marketers.
            </p>
            <p className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wider">Newsletter</p>
            <p className="text-xs text-gray-500 mb-1">New reviews weekly — no spam.</p>
            <NewsletterForm compact />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-sm hover:text-white transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Site</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-sm hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link href="/cookie-policy" className="text-sm hover:text-white transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-xs">© {new Date().getFullYear()} AICreatorEdge. All rights reserved.</p>
          <p className="text-xs">
            This site contains affiliate links. We may earn a commission at no extra cost to you.{" "}
            <Link href="/privacy-policy" className="underline hover:text-white">Learn more</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
