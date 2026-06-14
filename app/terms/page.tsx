import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for AICreatorTools. Read our rules for using this website and its content.",
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "June 14, 2025";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Terms of Use</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: {LAST_UPDATED}</p>

      <div className="prose max-w-none text-gray-700">
        <p>
          By accessing AICreatorTools (the &quot;Site&quot;), you agree to be bound by these Terms of Use.
          If you do not agree, please do not use the Site.
        </p>

        <h2>1. Content and Accuracy</h2>
        <p>
          We strive to keep all reviews, comparisons, and tutorials accurate and up to date. However,
          AI tools change rapidly. Prices, features, and availability may change without notice.
          Always verify current details on the tool&apos;s official website before making a purchase
          decision. We accept no liability for decisions made based on information on this Site.
        </p>

        <h2>2. Intellectual Property</h2>
        <p>
          All original content on this Site — including text, graphics, and code — is the property
          of AICreatorTools or its contributors and is protected by copyright law. You may quote
          short excerpts (up to 100 words) with clear attribution and a link back to the original
          article. Reproduction of full articles without written permission is prohibited.
        </p>

        <h2>3. Affiliate Links & Commercial Relationships</h2>
        <p>
          Some links are affiliate links and we may earn a commission if you purchase through them.
          This does not affect our editorial integrity. We disclose affiliate relationships at the
          top of relevant articles.
        </p>

        <h2>4. Third-Party Tools & Services</h2>
        <p>
          We review and link to third-party tools and services. We are not affiliated with, endorsed
          by, or responsible for those third parties unless explicitly stated. Use third-party services
          at your own risk and review their respective terms and privacy policies.
        </p>

        <h2>5. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, AICreatorTools and its contributors shall not be
          liable for any indirect, incidental, special, or consequential damages arising from your
          use of the Site or reliance on its content.
        </p>

        <h2>6. No Warranties</h2>
        <p>
          The Site and its content are provided &quot;as is&quot; without any warranty of any kind, express
          or implied, including warranties of merchantability, fitness for a particular purpose, or
          non-infringement.
        </p>

        <h2>7. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the European Union. Any disputes shall be subject
          to the exclusive jurisdiction of the competent courts of the EU member state in which the
          operator is established.
        </p>

        <h2>8. Changes to These Terms</h2>
        <p>
          We may update these Terms at any time. Continued use of the Site after changes constitutes
          acceptance of the new Terms.
        </p>

        <h2>9. Contact</h2>
        <p>
          For legal enquiries: <a href="mailto:legal@aicreatortools.com">legal@aicreatortools.com</a>
        </p>
      </div>
    </div>
  );
}
