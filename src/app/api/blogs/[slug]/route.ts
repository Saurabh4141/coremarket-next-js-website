import { getBlogPostBySlug } from "@/lib/services/blogs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await getBlogPostBySlug(slug);
    if (!data) {
      return Response.json({ success: false, message: "Post not found" }, { status: 404 });
    }
    return Response.json({ success: true, data });
  } catch (e) {
    console.error("GET /api/blogs/[slug] failed", e);
    return Response.json({ success: false, message: "Failed to fetch post" }, { status: 500 });
  }
}
