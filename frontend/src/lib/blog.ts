import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
  readingTime: number;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
}

const contentDir = (() => {
  const candidates = [
    path.join(process.cwd(), "content", "blog"),
    path.join(process.cwd(), "..", "content", "blog"),
    path.resolve(fileURLToPath(import.meta.url), "..", "..", "..", "..", "content", "blog"),
  ];
  for (const dir of candidates) {
    if (fs.existsSync(path.join(dir, "es")) || fs.existsSync(path.join(dir, "en"))) {
      return dir;
    }
  }
  return candidates[0];
})();

export function getPostSlugs(locale: string): string[] {
  const dir = path.join(contentDir, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(".md", ""));
}

function calcReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function getPostBySlug(
  locale: string,
  slug: string
): Promise<BlogPost | null> {
  const filePath = path.join(contentDir, locale, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark().use(html, { sanitize: false }).process(content);

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    tags: data.tags ?? [],
    content: processed.toString(),
    readingTime: calcReadingTime(content),
  };
}

export async function getAllPosts(locale: string): Promise<BlogPostMeta[]> {
  const slugs = getPostSlugs(locale);
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(locale, slug);
      if (!post) return null;
      const { content: _, ...meta } = post;
      return meta;
    })
  );
  return (posts.filter(Boolean) as BlogPostMeta[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export const POSTS_PER_PAGE = 9;

export async function getPostsPaginated(
  locale: string,
  page: number = 1
): Promise<{ posts: BlogPostMeta[]; total: number; totalPages: number }> {
  const all = await getAllPosts(locale);
  const total = all.length;
  const totalPages = Math.ceil(total / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  return {
    posts: all.slice(start, start + POSTS_PER_PAGE),
    total,
    totalPages,
  };
}

export async function getPostsByTag(
  locale: string,
  tag: string
): Promise<BlogPostMeta[]> {
  const all = await getAllPosts(locale);
  return all.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export async function getAllTags(locale: string): Promise<string[]> {
  const all = await getAllPosts(locale);
  const tags = new Set<string>();
  for (const post of all) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

export async function getRelatedPosts(
  locale: string,
  currentSlug: string,
  tags: string[],
  maxCount: number = 3
): Promise<BlogPostMeta[]> {
  const all = await getAllPosts(locale);
  const others = all.filter((p) => p.slug !== currentSlug);

  const scored = others.map((post) => {
    const sharedTags = post.tags.filter((t) => tags.includes(t)).length;
    return { post, score: sharedTags };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
  });

  return scored.slice(0, maxCount).map((s) => s.post);
}

export async function getAdjacentPosts(
  locale: string,
  currentSlug: string
): Promise<{ prev: BlogPostMeta | null; next: BlogPostMeta | null }> {
  const all = await getAllPosts(locale);
  const idx = all.findIndex((p) => p.slug === currentSlug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx < all.length - 1 ? all[idx + 1] : null,
    next: idx > 0 ? all[idx - 1] : null,
  };
}
