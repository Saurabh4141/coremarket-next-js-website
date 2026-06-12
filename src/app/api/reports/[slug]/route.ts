import { getReportBySlug } from "@/lib/services/reports";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const data = await getReportBySlug(slug);
    if (!data) {
      return Response.json({ success: false, message: "Report not found" }, { status: 404 });
    }
    return Response.json({ success: true, data });
  } catch (e) {
    console.error("GET /api/reports/[slug] failed", e);
    return Response.json({ success: false, message: "Failed to fetch report" }, { status: 500 });
  }
}
