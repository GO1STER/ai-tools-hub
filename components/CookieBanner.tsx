"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

type Consent = "accepted" | "rejected" | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [showManage, setShowManage] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("cookie-consent") as Consent;
    setConsent(stored);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setConsent("accepted");
  }

  function reject() {
    localStorage.setItem("cookie-consent", "rejected");
    setConsent("rejected");
  }

  if (!mounted || consent !== null) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative w-full sm:max-w-lg mx-4 sm:mx-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 mb-2">We use cookies 🍪</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          We use cookies and similar technologies (including Google AdSense) to personalise content,
          show relevant ads, and analyse traffic. Third-party partners like Google may set cookies on
          your device. You can accept all cookies, reject non-essential ones, or customise your
          preferences. See our{" "}
          <Link href="/cookie-policy" className="text-indigo-600 underline">Cookie Policy</Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="text-indigo-600 underline">Privacy Policy</Link>{" "}
          for details.
        </p>

        {showManage && (
          <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">Essential cookies</span>
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">Always on</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-800">Analytics & Advertising</span>
              <span className="text-xs text-gray-500">(Google AdSense, Analytics)</span>
            </div>
            <p className="text-xs text-gray-500">
              Google may use these cookies to personalise ads based on your browsing activity, in
              accordance with <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">Google&apos;s Privacy Policy</a>.
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={accept}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-colors text-sm"
          >
            Accept All
          </button>
          <button
            onClick={reject}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2.5 px-4 rounded-xl transition-colors text-sm"
          >
            Reject Non-Essential
          </button>
          <button
            onClick={() => setShowManage(!showManage)}
            className="sm:w-auto text-sm text-gray-500 hover:text-gray-700 underline px-2"
          >
            Manage
          </button>
        </div>
      </div>
    </div>
  );
}
