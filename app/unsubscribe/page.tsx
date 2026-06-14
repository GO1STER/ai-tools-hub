import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

export default function UnsubscribePage() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <p className="text-4xl mb-4">👋</p>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-3">You&apos;ve been unsubscribed</h1>
      <p className="text-gray-500 mb-8">
        You won&apos;t receive any more emails from AICreatorEdge. If this was a mistake,
        you can re-subscribe any time from the homepage.
      </p>
      <Link href="/" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
        Back to homepage
      </Link>
    </div>
  );
}
