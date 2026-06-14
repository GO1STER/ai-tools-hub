export { CATEGORIES, getCategoryName } from "./categories";
import postsData from "./posts-data";

export interface PostMeta {
  title: string;
  description: string;
  slug: string;
  category: string;
  categorySlug: string;
  date: string;
  updated?: string;
  keywords: string[];
  coverImage?: string;
  affiliateDisclosure?: boolean;
  rating?: number;
}

export function getAllPosts(): PostMeta[] {
  return postsData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): PostMeta | undefined {
  return postsData.find((p) => p.slug === slug);
}

export function getPostsByCategory(categorySlug: string): PostMeta[] {
  return postsData
    .filter((p) => p.categorySlug === categorySlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
