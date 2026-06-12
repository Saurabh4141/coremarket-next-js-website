import { db, Row, bitToBool, parseJsonSafe, monthDayYear } from "@/lib/db";

/** Card shape used by the Blog index page and home BlogSection. */
export interface BlogPostDTO {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

export interface BlogSection {
  title: string;
  content: string;
  bullets?: string[];
  keyPoints?: string[];
  image?: string;
}

/** Full article shape for the blog detail page. */
export interface BlogArticleDTO extends BlogPostDTO {
  authorRole: string;
  authorAvatar: string;
  authorBio: string;
  introduction: string;
  sections: BlogSection[];
  keyTakeaways: string[];
  quote: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
}

interface BlogRow extends Row {
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  author_name: string;
  author_role: string | null;
  author_avatar: string | null;
  author_bio: string | null;
  publish_date: Date;
  read_time: string | null;
  is_featured: Buffer | number | null;
  featured_image: string | null;
  introduction: string;
  sections: unknown;
  key_takeaways: unknown;
  quote: string | null;
  tags: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

const mapCard = (r: BlogRow): BlogPostDTO => ({
  title: r.title,
  slug: r.slug,
  excerpt: r.excerpt ?? "",
  category: r.category,
  author: r.author_name,
  date: monthDayYear(r.publish_date),
  readTime: r.read_time ?? "",
  image: r.featured_image ?? "",
  featured: bitToBool(r.is_featured),
});

export async function getBlogPosts(): Promise<BlogPostDTO[]> {
  const [rows] = await db.query<BlogRow[]>(
    `SELECT title, slug, excerpt, category, author_name, publish_date,
            read_time, is_featured, featured_image
       FROM blog_master
      WHERE status = 'published'
      ORDER BY is_featured DESC, publish_date DESC`
  );
  return rows.map(mapCard);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogArticleDTO | null> {
  const [rows] = await db.query<BlogRow[]>(
    `SELECT * FROM blog_master WHERE status = 'published' AND slug = :slug LIMIT 1`,
    { slug }
  );
  if (!rows.length) return null;
  const r = rows[0];
  return {
    ...mapCard(r),
    authorRole: r.author_role ?? "",
    authorAvatar: r.author_avatar ?? "",
    authorBio: r.author_bio ?? "",
    introduction: r.introduction ?? "",
    sections: parseJsonSafe(r.sections, []),
    keyTakeaways: parseJsonSafe(r.key_takeaways, []),
    quote: parseJsonSafe<string>(r.quote, typeof r.quote === "string" ? r.quote : ""),
    tags: r.tags ? r.tags.split(",").map((t) => t.trim()) : [],
    metaTitle: r.meta_title ?? r.title,
    metaDescription: r.meta_description ?? r.excerpt ?? "",
  };
}
