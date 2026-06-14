import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for AICreatorTools. Details on how we use cookies, including Google AdSense and analytics cookies, and how to manage your preferences.",
  alternates: { canonical: "/cookie-policy" },
};

const LAST_UPDATED = "June 14, 2025";

export default function CookiePolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Cookie Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: {LAST_UPDATED}</p>

      <div className="prose max-w-none text-gray-700">
        <p>
          This Cookie Policy explains what cookies are, how AICreatorTools uses them, and how you can
          control them. We are based in the European Union and comply with GDPR and the ePrivacy
          Directive. We only place non-essential cookies with your prior consent.
        </p>

        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files placed on your device by websites you visit. They allow sites
          to remember your preferences, understand how you use them, and serve relevant advertising.
        </p>

        <h2>Categories of Cookies We Use</h2>

        <h3>1. Strictly Necessary Cookies</h3>
        <p>
          These cookies are required for the site to function correctly. They include cookies that
          store your cookie consent preference. These are set without your consent because they are
          essential to the operation of the site.
        </p>
        <table>
          <thead>
            <tr><th>Cookie Name</th><th>Purpose</th><th>Duration</th></tr>
          </thead>
          <tbody>
            <tr><td>cookie-consent</td><td>Stores your cookie consent choice</td><td>1 year</td></tr>
          </tbody>
        </table>

        <h3>2. Analytics Cookies</h3>
        <p>
          We use Google Analytics to understand how visitors interact with our site. These cookies
          collect information in aggregate and anonymised form.
        </p>
        <table>
          <thead>
            <tr><th>Cookie</th><th>Provider</th><th>Purpose</th><th>Duration</th></tr>
          </thead>
          <tbody>
            <tr><td>_ga</td><td>Google</td><td>Distinguishes users for analytics</td><td>2 years</td></tr>
            <tr><td>_ga_*</td><td>Google</td><td>Session and user tracking</td><td>2 years</td></tr>
          </tbody>
        </table>

        <h3>3. Advertising Cookies (Google AdSense)</h3>
        <p>
          We use Google AdSense to display advertisements. Google and its partners use cookies to
          serve ads based on your prior visits to this site and other websites on the internet.
          These cookies enable Google to build a profile of your interests and show you relevant
          ads on our site and across the web.
        </p>
        <p>
          Google AdSense and its third-party partners may set the following types of cookies:
        </p>
        <ul>
          <li><strong>__gads / __gpi:</strong> Used by Google AdSense for advertising frequency control and ad measurement.</li>
          <li><strong>IDE:</strong> Used by DoubleClick (Google) for targeting and remarketing.</li>
          <li><strong>DSID / FLC / AID / TAID / exchange_uid:</strong> Used for ad targeting by Google partners.</li>
        </ul>
        <p>
          These third-party cookies are governed by Google&apos;s Privacy Policy:{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
            policies.google.com/privacy
          </a>
          .
        </p>

        <h2>Managing Your Preferences</h2>
        <p>You can control cookies in the following ways:</p>
        <ul>
          <li><strong>Cookie banner:</strong> Use the &quot;Accept&quot;, &quot;Reject&quot;, or &quot;Manage&quot; options in our consent banner when you first visit the site, or clear your <code>cookie-consent</code> localStorage item to see it again.</li>
          <li><strong>Browser settings:</strong> Most browsers allow you to block or delete cookies. See your browser&apos;s help documentation for instructions.</li>
          <li><strong>Google Ads Settings:</strong> Opt out of personalised ads at{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              www.google.com/settings/ads
            </a>.</li>
          <li><strong>Your Online Choices:</strong> EU residents can manage ad preferences at{" "}
            <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer">
              www.youronlinechoices.com
            </a>.</li>
        </ul>
        <p>
          Note: Rejecting non-essential cookies may affect the functionality of some site features
          and may mean you see non-personalised ads instead of personalised ones.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about our cookie practices:{" "}
          <a href="mailto:privacy@aicreatortools.com">privacy@aicreatortools.com</a>
        </p>
      </div>
    </div>
  );
}
