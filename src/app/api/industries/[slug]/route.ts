import { getIndustryBySlug } from "@/lib/services/industries";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await getIndustryBySlug(slug);
    if (!data) {
      return Response.json({ success: false, message: "Industry not found" }, { status: 404 });
    }
    return Response.json({ success: true, data });
  } catch (e) {
    console.error("GET /api/industries/[slug] failed", e);
    return Response.json({ success: false, message: "Failed to fetch industry" }, { status: 500 });
  }
}
