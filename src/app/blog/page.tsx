import type { Metadata } from "next";
import Blog from "@/modules/Blog";
import { getBlogPosts } from "@/lib/services/blogs";

export const metadata: Metadata = {
  title: "Blog | CoreMarket Research",
  description: "Latest market research insights, industry analysis, and research methodology guides.",
};

export default async function Page() {
  const posts = await getBlogPosts();
  return <Blog posts={posts} />;
}
