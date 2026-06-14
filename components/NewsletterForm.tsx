"use client";
import { useState } from "react";

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("You're in! Check your inbox for a confirmation.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  if (compact) {
    return (
      <div className="mt-4">
        {status === "success" ? (
          <p className="text-sm text-green-400 font-medium">✓ {message}</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors disabled:opacity-60 shrink-0"
            >
              {status === "loading" ? "..." : "Join"}
            </button>
          </form>
        )}
        {status === "error" && <p className="text-xs text-red-400 mt-1">{message}</p>}
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 sm:p-10 text-white text-center">
      <div className="max-w-lg mx-auto">
        <p className="text-3xl mb-2">📬</p>
        <h2 className="text-xl font-extrabold mb-2">Get New Reviews in Your Inbox</h2>
        <p className="text-indigo-100 text-sm mb-6">
          New AI tool reviews and guides every week. No fluff, no spam — just the tools that actually matter.
        </p>

        {status === "success" ? (
          <div className="bg-white/20 rounded-2xl px-6 py-4">
            <p className="font-bold text-lg">🎉 You&apos;re subscribed!</p>
            <p className="text-indigo-100 text-sm mt-1">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-white/15 border border-white/30 text-white placeholder-indigo-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white focus:bg-white/20 transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-white text-indigo-700 font-bold text-sm px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors disabled:opacity-60 shrink-0"
            >
              {status === "loading" ? "Subscribing…" : "Subscribe Free →"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-red-200 text-sm mt-3">{message}</p>
        )}

        <p className="text-indigo-200 text-xs mt-4">
          Free forever · Unsubscribe anytime · No spam
        </p>
      </div>
    </section>
  );
}
