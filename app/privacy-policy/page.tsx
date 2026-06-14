import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for AICreatorTools, including information about cookies, Google AdSense, affiliate links, and your GDPR rights.",
  alternates: { canonical: "/privacy-policy" },
};

const LAST_UPDATED = "June 14, 2025";
const SITE_NAME = "AICreatorTools";
const CONTACT_EMAIL = "privacy@aicreatortools.com";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: {LAST_UPDATED}</p>

      <div className="prose max-w-none text-gray-700">
        <p>
          This Privacy Policy describes how {SITE_NAME} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) collects,
          uses, and shares information about you when you visit our website. We are based in the
          European Union and comply with the General Data Protection Regulation (GDPR).
        </p>

        <h2>1. Data We Collect</h2>
        <p>We may collect the following categories of data:</p>
        <ul>
          <li><strong>Usage data:</strong> Pages visited, time spent, referral source, browser type, device type, and IP address — collected via Google Analytics.</li>
          <li><strong>Contact data:</strong> Name and email address, only when you contact us voluntarily.</li>
          <li><strong>Advertising data:</strong> Google AdSense and its partners may collect data about your browsing behaviour to serve personalised advertisements (see Section 4).</li>
        </ul>

        <h2>2. Legal Basis for Processing (GDPR)</h2>
        <p>We process your data on the following legal bases:</p>
        <ul>
          <li><strong>Consent (Art. 6(1)(a) GDPR):</strong> For analytics cookies and advertising cookies. You can withdraw consent at any time via our cookie banner.</li>
          <li><strong>Legitimate interests (Art. 6(1)(f) GDPR):</strong> For essential site functionality (e.g. remembering your cookie preference).</li>
        </ul>

        <h2>3. Affiliate Links</h2>
        <p>
          Some links on this site are affiliate links. If you click an affiliate link and make a
          purchase, we may earn a commission at no additional cost to you. Affiliate relationships
          do not influence our editorial content or ratings. We disclose affiliate links at the top
          of relevant articles in compliance with FTC guidelines.
        </p>

        <h2>4. Google AdSense &amp; Third-Party Advertising</h2>
        <p>
          We use Google AdSense to display advertisements. Google AdSense uses cookies, web beacons,
          and similar technologies to serve ads based on your prior visits to this website and other
          websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads
          based on your visit to our site and/or other sites on the Internet.
        </p>
        <p>
          You may opt out of personalised advertising by visiting{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>{" "}
          or{" "}
          <a href="https://www.aboutads.info/" target="_blank" rel="noopener noreferrer">
            www.aboutads.info
          </a>
          . Google&apos;s Privacy Policy is available at{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            policies.google.com/privacy
          </a>
          .
        </p>

        <h2>5. Cookies</h2>
        <p>
          We use cookies and similar tracking technologies. See our full{" "}
          <a href="/cookie-policy">Cookie Policy</a> for details. You can manage your preferences
          at any time using the cookie banner on our site.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          Analytics data is retained for 26 months. Contact form data is retained for up to 12
          months after your last communication with us, unless required by law to retain it longer.
        </p>

        <h2>7. Your Rights (GDPR)</h2>
        <p>If you are located in the European Economic Area (EEA), you have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request erasure of your data (&quot;right to be forgotten&quot;)</li>
          <li>Object to or restrict processing</li>
          <li>Data portability</li>
          <li>Lodge a complaint with your national data protection authority</li>
        </ul>
        <p>To exercise any of these rights, contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>

        <h2>8. Third-Party Links</h2>
        <p>
          Our site contains links to third-party websites. We are not responsible for the privacy
          practices of those sites and encourage you to read their privacy policies.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page
          with a revised &quot;last updated&quot; date.
        </p>

        <h2>10. Contact</h2>
        <p>
          For privacy-related enquiries: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </div>
    </div>
  );
}
