import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetail, { type BlogDetailView } from "@/modules/Blog/BlogDetail";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/services/blogs";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article not found | CoreMarket Research" };
  return {
    title: `${post.metaTitle} | CoreMarket Research`,
    description: post.metaDescription,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = (await getBlogPosts())
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)
    .map((p) => ({
      title: p.title,
      slug: p.slug,
      category: p.category,
      image: p.image,
      excerpt: p.excerpt,
    }));

  const data: BlogDetailView = {
    title: post.title,
    category: post.category,
    author: {
      name: post.author,
      role: post.authorRole,
      avatar: post.authorAvatar,
      bio: post.authorBio,
    },
    publishDate: post.date,
    readTime: post.readTime,
    image: post.image,
    content: {
      introduction: post.introduction,
      sections: post.sections,
      keyTakeaways: post.keyTakeaways,
      quote: {
        text: post.quote,
        author: post.author,
        role: post.authorRole,
      },
    },
    relatedPosts: related,
  };

  return <BlogDetail data={data} />;
}
