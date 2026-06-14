import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the AICreatorTools team. Questions, tool suggestions, corrections, and collaboration inquiries welcome.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-10">
        We read every message and reply within 48 hours on business days.
      </p>

      <div className="space-y-6">
        {[
          { label: "General inquiries", email: "hello@aicreatortools.com", desc: "Questions about the site, tool suggestions, or corrections." },
          { label: "Partnerships & sponsorships", email: "partners@aicreatortools.com", desc: "Brand deals, sponsored content, and advertising inquiries." },
          { label: "Press", email: "press@aicreatortools.com", desc: "Media kit requests and press coverage." },
        ].map((item) => (
          <div key={item.label} className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-bold text-gray-900 mb-1">{item.label}</h2>
            <p className="text-sm text-gray-500 mb-2">{item.desc}</p>
            <a
              href={`mailto:${item.email}`}
              className="text-indigo-600 font-medium hover:text-indigo-700 underline"
            >
              {item.email}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-indigo-50 rounded-2xl p-6">
        <h2 className="font-bold text-gray-900 mb-2">Submit a Tool for Review</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Are you a tool founder or representative and want your product reviewed?
          Email us at{" "}
          <a href="mailto:reviews@aicreatortools.com" className="text-indigo-600 underline font-medium">
            reviews@aicreatortools.com
          </a>{" "}
          with a brief description, access credentials for testing, and any relevant context.
          We review on our own timeline and cannot guarantee coverage or a positive review.
        </p>
      </div>
    </div>
  );
}
