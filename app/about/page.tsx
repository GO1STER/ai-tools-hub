import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "We test AI tools so you don't have to. Learn who we are and how we review tools for content creators and YouTubers.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">About AICreatorTools</h1>
      <div className="prose max-w-none text-gray-700">
        <p>
          AICreatorTools was built by content creators, for content creators. We got tired of reading
          shallow AI tool roundups written by people who had clearly never opened the products they
          reviewed. So we built a site where every single review comes from real hands-on usage.
        </p>
        <h2>What We Do</h2>
        <p>
          We test, compare, and write about AI tools for YouTube creators, faceless channel operators,
          video marketers, and anyone building an online audience with video. Our categories cover
          the full production stack: video generation, voiceover, thumbnail creation, scriptwriting,
          and workflow automation.
        </p>
        <h2>Our Review Process</h2>
        <p>
          Before publishing any review, we spend a minimum of two weeks with the tool using it on
          real projects. We evaluate:
        </p>
        <ul>
          <li>Output quality at different price tiers</li>
          <li>Speed and reliability under real workloads</li>
          <li>Value for money vs. alternatives</li>
          <li>Support and documentation quality</li>
          <li>Frequency and quality of updates</li>
        </ul>
        <p>
          We publish both pros and cons for every tool — if something is overpriced or has serious
          limitations, we say so clearly, even if they have an affiliate program.
        </p>
        <h2>Affiliate Transparency</h2>
        <p>
          Some links on this site are affiliate links. This means we may earn a small commission if
          you purchase through our link, at no extra cost to you. Affiliate relationships never
          influence our scores or editorial opinions. Tools are rated on merit alone. See our{" "}
          <a href="/privacy-policy">Privacy Policy</a> for full disclosure.
        </p>
        <h2>Contact Us</h2>
        <p>
          Have a question, a tool suggestion, or a correction? Head to our{" "}
          <a href="/contact">Contact page</a> and we will get back to you within 48 hours.
        </p>
      </div>
    </div>
  );
}
