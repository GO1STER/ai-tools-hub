export const CATEGORIES = [
  { name: "AI Video Tools", slug: "ai-video-tools" },
  { name: "AI Voice & Text-to-Speech", slug: "ai-voice-tts" },
  { name: "AI Images & Thumbnails", slug: "ai-images-thumbnails" },
  { name: "AI Scriptwriting & Text", slug: "ai-scriptwriting-text" },
  { name: "AI Workflows & Automation", slug: "ai-workflows-automation" },
] as const;

export function getCategoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}
