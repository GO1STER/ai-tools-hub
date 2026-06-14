"use client";
import Link from "next/link";
import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";

const CATEGORY_ICONS: Record<string, string> = {
  "ai-video-tools": "🎬",
  "ai-voice-tts": "🎙️",
  "ai-images-thumbnails": "🖼️",
  "ai-scriptwriting-text": "✍️",
  "ai-workflows-automation": "⚡",
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-lg text-white text-sm font-black">AI</span>
            <span className="font-bold text-lg text-gray-900">
              Creator<span className="text-indigo-600">Tools</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors whitespace-nowrap flex items-center gap-1.5"
              >
                <span className="text-base">{CATEGORY_ICONS[cat.slug]}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/about" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              About
            </Link>
            <Link
              href="/category/ai-video-tools"
              className="text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Start Here →
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-100 pt-3 flex flex-col gap-0.5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600 px-3 py-2.5 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <span>{CATEGORY_ICONS[cat.slug]}</span>
                {cat.name}
              </Link>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-2">
              <Link href="/about" onClick={() => setMenuOpen(false)} className="flex items-center text-sm font-medium text-gray-500 px-3 py-2.5 rounded-lg hover:bg-gray-50">
                About
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
