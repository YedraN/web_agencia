import fs from "fs";
import path from "path";
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

const contentDir = path.join(process.cwd(), "content", "blog");

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
