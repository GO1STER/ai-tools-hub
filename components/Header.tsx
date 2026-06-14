"use client";
import Link from "next/link";
import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600 shrink-0">
            <span className="text-2xl">🤖</span>
            <span>AICreatorTools</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md hover:bg-indigo-50 transition-colors whitespace-nowrap"
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md hover:bg-indigo-50 transition-colors">
              About
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="lg:hidden pb-4 border-t border-gray-100 pt-3 flex flex-col gap-1">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md hover:bg-indigo-50"
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/about" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md hover:bg-indigo-50">
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
