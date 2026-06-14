# AICreatorTools

Honest reviews, comparisons, and tutorials of AI tools for YouTube creators, faceless channel operators, and video marketers. Built with Next.js App Router, Tailwind CSS, and MDX.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

---

## How to Add a New Article

1. Create a new `.mdx` file in the `/content` directory.
2. Add the required frontmatter at the top:

```mdx
---
title: "Your Article Title Here"
description: "A 150–160 character description for SEO meta tags and card previews."
slug: "your-url-slug-here"
category: "AI Video Tools"
categorySlug: "ai-video-tools"
date: "2025-06-15"
updated: "2025-06-15"
keywords: ["keyword one", "keyword two", "keyword three"]
affiliateDisclosure: true
rating: 4.2
---
```

**Available `categorySlug` values:**
- `ai-video-tools`
- `ai-voice-tts`
- `ai-images-thumbnails`
- `ai-scriptwriting-text`
- `ai-workflows-automation`

3. Write your content in MDX. You can use these built-in components anywhere in the body:

```mdx
<AffiliateDisclosure />

<RatingStars rating={4.5} label="Overall score" />

<ProsCons
  pros={["Fast generation", "Good API"]}
  cons={["Expensive", "No mobile app"]}
/>

<ComparisonTable
  features={["API", "Free Tier", "Languages"]}
  tools={[
    { name: "Tool A", price: "$10/mo", rating: 4.5, "API": "✓", "Free Tier": "✗", "Languages": "10" },
    { name: "Tool B", price: "$20/mo", rating: 4.0, "API": "✗", "Free Tier": "✓", "Languages": "50" }
  ]}
/>

<AdSlot slot="mid-article" format="rectangle" />
```

4. The article will appear automatically at `yourdomain.com/your-url-slug-here`.

---

## How to Activate Google AdSense

1. **Apply for AdSense** at [google.com/adsense](https://www.google.com/adsense).
2. While waiting for approval, add your site URL and ensure the legal pages are live (`/privacy-policy`, `/terms`, `/cookie-policy`).
3. After approval, fill in `/public/ads.txt` with your publisher line:
   ```
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
4. In each `<AdSlot>` component, replace the placeholder div with real AdSense code:
   ```tsx
   // components/AdSlot.tsx — replace the placeholder div with:
   <ins
     className="adsbygoogle"
     style={{ display: "block" }}
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot={slot}
     data-ad-format={format}
     data-full-width-responsive="true"
   />
   ```
5. Add the AdSense script to `app/layout.tsx` inside `<head>` (use `next/script` with `strategy="afterInteractive"`).
6. Set `NEXT_PUBLIC_SITE_URL` in your Vercel environment variables to your real domain.

---

## How to Deploy on Vercel

1. Push the project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Set the following environment variable in the Vercel project settings:
   - `NEXT_PUBLIC_SITE_URL` → `https://yourdomain.com`
4. Click **Deploy**. Vercel detects Next.js automatically.
5. After deployment, connect your custom domain in the Vercel dashboard under **Domains**.
6. Redeploys happen automatically on every `git push` to the main branch.

**ISR:** Article pages revalidate every 3600 seconds (1 hour) automatically. No manual redeploy needed when you add new content.

---

## Project Structure

```
ai-tools-hub/
├── app/
│   ├── layout.tsx          # Root layout with Header, Footer, CookieBanner
│   ├── page.tsx            # Homepage
│   ├── [slug]/page.tsx     # Individual article pages
│   ├── category/[slug]/    # Category listing pages
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── privacy-policy/     # Privacy Policy (required for AdSense)
│   ├── terms/              # Terms of Use (required for AdSense)
│   ├── cookie-policy/      # Cookie Policy (required for GDPR + AdSense)
│   ├── sitemap.ts          # Dynamic XML sitemap
│   └── robots.ts           # robots.txt
├── components/
│   ├── Header.tsx          # Navigation with categories
│   ├── Footer.tsx          # Footer with links
│   ├── CookieBanner.tsx    # GDPR cookie consent (blocking)
│   ├── AdSlot.tsx          # AdSense placeholder (reusable)
│   ├── AffiliateDisclosure.tsx
│   ├── ComparisonTable.tsx
│   ├── ProsCons.tsx
│   ├── RatingStars.tsx
│   ├── PostCard.tsx
│   └── Breadcrumb.tsx
├── content/                # MDX articles (one file per article)
├── lib/
│   └── posts.ts            # Content reading utilities
└── public/
    └── ads.txt             # Fill in after AdSense approval
```
