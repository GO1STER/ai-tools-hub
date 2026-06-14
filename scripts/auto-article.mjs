#!/usr/bin/env node
/**
 * Auto-article generator for AICreatorEdge.
 * Picks the next unpublished topic from article-queue.json,
 * calls Claude API to generate the full MDX article + metadata,
 * writes the content file, updates posts-data.ts, and marks the topic as published.
 *
 * Required env vars:
 *   ANTHROPIC_API_KEY
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── 1. Pick next topic ────────────────────────────────────────────────────────
const queuePath = path.join(__dirname, "article-queue.json");
const queue = JSON.parse(fs.readFileSync(queuePath, "utf-8"));
const topic = queue.find((t) => !t.published);

if (!topic) {
  console.log("✅ Queue is empty — no article to generate.");
  process.exit(0);
}

console.log(`📝 Generating article: "${topic.title}"`);

// ── 2. Call Claude ─────────────────────────────────────────────────────────
const today = new Date().toISOString().split("T")[0];

const systemPrompt = `You are the lead content writer for AICreatorEdge.com, a site that publishes honest, hands-on reviews and guides about AI tools for YouTube creators and faceless channel operators.

Your writing style:
- Expert but accessible — assumes the reader knows YouTube but not necessarily AI tools
- Specific and concrete — real numbers, real pricing, real workflow times
- Honest — includes genuine pros AND cons, never purely promotional
- Informational — teaches the reader something they can immediately apply

Always write in English. Use British spelling for some terms (e.g. "monetise") since the audience is global.`;

const userPrompt = `Write a complete, detailed article for AICreatorEdge.com.

Topic: ${topic.title}
Primary keyword: ${topic.keyword}
Category: ${topic.category}
Today's date: ${today}

OUTPUT FORMAT — respond ONLY with this exact structure, nothing before or after:

===METADATA===
{
  "title": "...",
  "description": "...(max 160 chars, includes primary keyword)...",
  "slug": "${topic.slug}",
  "category": "${topic.category}",
  "categorySlug": "${topic.categorySlug}",
  "date": "${today}",
  "updated": "${today}",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "affiliateDisclosure": true,
  "rating": 4.3
}
===MDX===
[Full MDX article content here]
===END===

MDX RULES (follow exactly):
1. Start with <AffiliateDisclosure /> on the first line
2. Write an engaging 2-3 sentence intro paragraph (no heading)
3. Add <RatingStars rating={X.X} label="Our rating" /> after the intro (only for single-tool reviews; omit for comparison/guide articles, and remove "rating" from metadata JSON too)
4. Use ## for main sections, ### for subsections
5. Add a <ComparisonTable> for pricing tiers with this exact syntax:
   <ComparisonTable
     features={["Feature1", "Feature2", "Feature3", "Feature4", "Feature5"]}
     tools={[
       { name: "Free", price: "$0", rating: 3.0, Feature1: "value", Feature2: false, Feature3: "value", Feature4: "value", Feature5: false },
       { name: "Pro", price: "$X/mo", rating: 4.0, Feature1: "value", Feature2: true, Feature3: "value", Feature4: "value", Feature5: true }
     ]}
   />
6. Add a <ProsCons> section with this exact syntax:
   <ProsCons
     pros={["Pro point 1", "Pro point 2", "Pro point 3", "Pro point 4", "Pro point 5"]}
     cons={["Con point 1", "Con point 2", "Con point 3", "Con point 4"]}
   />
7. End with a ## Verdict section (2-3 paragraphs, include a bold rating line like **Rating: 4.3/5 — [summary].**)
8. Add *Pricing as of ${today.slice(0,7).replace('-',' ').replace('-',' 20').slice(0,8) + today.slice(0,4)}.* at the very end
9. Minimum 1,500 words. No frontmatter. No markdown fences around the MDX.
10. Do NOT use JSX expressions like {new Date()} — use literal text only.`;

const response = await client.messages.create({
  model: "claude-opus-4-8",
  max_tokens: 8000,
  system: systemPrompt,
  messages: [{ role: "user", content: userPrompt }],
});

const raw = response.content[0].type === "text" ? response.content[0].text : "";

// ── 3. Parse response ─────────────────────────────────────────────────────────
const metaMatch = raw.match(/===METADATA===\s*([\s\S]*?)\s*===MDX===/);
const mdxMatch = raw.match(/===MDX===\s*([\s\S]*?)\s*===END===/);

if (!metaMatch || !mdxMatch) {
  console.error("❌ Failed to parse Claude response. Raw output:\n", raw.slice(0, 500));
  process.exit(1);
}

let metadata;
try {
  metadata = JSON.parse(metaMatch[1].trim());
} catch (e) {
  console.error("❌ Failed to parse metadata JSON:", metaMatch[1].trim().slice(0, 300));
  process.exit(1);
}

const mdxContent = mdxMatch[1].trim();

// ── 4. Write MDX file ────────────────────────────────────────────────────────
const contentDir = path.join(ROOT, "content");
const mdxPath = path.join(contentDir, `${metadata.slug}.mdx`);
fs.writeFileSync(mdxPath, mdxContent + "\n");
console.log(`✅ Wrote ${mdxPath}`);

// ── 5. Update posts-data.ts ───────────────────────────────────────────────────
const postsDataPath = path.join(ROOT, "lib", "posts-data.ts");
let postsData = fs.readFileSync(postsDataPath, "utf-8");

const keywordsStr = JSON.stringify(metadata.keywords);
const ratingLine = metadata.rating != null ? `\n    rating: ${metadata.rating},` : "";
const disclosureLine = metadata.affiliateDisclosure ? "true" : "false";

const newEntry = `  {
    title: ${JSON.stringify(metadata.title)},
    description: ${JSON.stringify(metadata.description)},
    slug: ${JSON.stringify(metadata.slug)},
    category: ${JSON.stringify(metadata.category)},
    categorySlug: ${JSON.stringify(metadata.categorySlug)},
    date: ${JSON.stringify(metadata.date)},
    updated: ${JSON.stringify(metadata.updated)},
    keywords: ${keywordsStr},
    affiliateDisclosure: ${disclosureLine},${ratingLine}
  },`;

// Insert before the closing ];
postsData = postsData.replace(/\n\];\n\nexport default posts;$/, `\n${newEntry}\n];\n\nexport default posts;`);
fs.writeFileSync(postsDataPath, postsData);
console.log(`✅ Updated lib/posts-data.ts`);

// ── 6. Mark as published ──────────────────────────────────────────────────────
topic.published = true;
topic.publishedDate = today;
fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
console.log(`✅ Marked "${topic.title}" as published in queue`);

// ── 7. Output metadata for GitHub Action ─────────────────────────────────────
// Write to a temp file so the Action can read it for the notify step
fs.writeFileSync(
  path.join(__dirname, "last-published.json"),
  JSON.stringify({ title: metadata.title, slug: metadata.slug, description: metadata.description })
);

console.log(`\n🚀 Done! Article "${metadata.title}" is ready.`);
