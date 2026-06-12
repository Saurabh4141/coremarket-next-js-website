import Index from "@/modules/Home";
import { getBlogPosts } from "@/lib/services/blogs";

export default async function Page() {
  const blogPosts = await getBlogPosts();
  return <Index blogPosts={blogPosts} />;
}
