export default function AffiliateDisclosure() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-6 flex gap-3">
      <span className="text-amber-500 text-lg shrink-0">⚠️</span>
      <p className="text-sm text-amber-800 leading-relaxed">
        <strong>Affiliate Disclosure:</strong> This article contains affiliate links. If you click
        through and make a purchase, we may earn a commission at no additional cost to you. We only
        recommend tools we have personally tested and believe provide genuine value. Our editorial
        opinions are never influenced by affiliate relationships. See our{" "}
        <a href="/privacy-policy" className="underline font-medium">Privacy Policy</a> for full details.
      </p>
    </div>
  );
}
