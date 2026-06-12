import { getBlogPosts } from "@/lib/services/blogs";

export async function GET() {
  try {
    const data = await getBlogPosts();
    return Response.json({ success: true, data });
  } catch (e) {
    console.error("GET /api/blogs failed", e);
    return Response.json({ success: false, message: "Failed to fetch blogs" }, { status: 500 });
  }
}
